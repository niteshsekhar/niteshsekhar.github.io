#!/usr/bin/env python3
"""Update data/publications.auto.json from Google Scholar metadata.

This script is intended for CI/server-side use only.
It never edits data/publications.json (manual curated data).
"""

from __future__ import annotations

import argparse
import json
import os
from pathlib import Path
from typing import Any

ROOT = Path(__file__).resolve().parents[1]
DATA_DIR = ROOT / "data"
MANUAL_PATH = DATA_DIR / "publications.json"
AUTO_PATH = DATA_DIR / "publications.auto.json"
MANUAL_TEMPLATE_PATH = DATA_DIR / "publications.auto.manual.template.json"

DEFAULT_USER_ID = "HzNqQNoAAAAJ"


def _normalize_title(title: str) -> str:
    return " ".join(title.lower().split())


def _safe_int(value: Any) -> int | None:
    try:
        if value is None or value == "":
            return None
        return int(value)
    except (TypeError, ValueError):
        return None


def _load_json_list(path: Path) -> list[dict[str, Any]]:
    if not path.exists():
        return []
    raw = json.loads(path.read_text(encoding="utf-8"))
    if not isinstance(raw, list):
        raise ValueError(f"Expected list JSON in {path}")
    return [item for item in raw if isinstance(item, dict)]


def _sort_publications(items: list[dict[str, Any]]) -> list[dict[str, Any]]:
    def key(item: dict[str, Any]) -> tuple[int, str]:
        year = item.get("year")
        rank_year = -year if isinstance(year, int) else 10**9
        title = str(item.get("title", "")).lower()
        return (rank_year, title)

    return sorted(items, key=key)


def _build_manual_template() -> None:
    manual = _load_json_list(MANUAL_PATH)
    template: list[dict[str, Any]] = []

    for entry in manual:
        title = str(entry.get("title", "")).strip()
        if not title:
            continue
        template.append(
            {
                "title": title,
                "authors": entry.get("authors", []),
                "venue": entry.get("venue", ""),
                "year": entry.get("year", None),
                "citationCount": None,
                "summary": "",
                "tags": [],
                "links": {
                    "scholar": "",
                    "pdf": "",
                    "arxiv": "",
                    "code": "",
                },
            }
        )

    MANUAL_TEMPLATE_PATH.write_text(
        json.dumps(_sort_publications(template), indent=2, ensure_ascii=False) + "\n",
        encoding="utf-8",
    )


def _fetch_scholar(user_id: str) -> list[dict[str, Any]]:
    from scholarly import scholarly  # type: ignore

    author = scholarly.search_author_id(user_id)
    author = scholarly.fill(author, sections=["publications"])

    publications = author.get("publications", [])
    if not isinstance(publications, list):
        return []

    results: list[dict[str, Any]] = []

    for pub in publications:
        try:
            filled = scholarly.fill(pub)
        except Exception:
            filled = pub

        bib = filled.get("bib", {}) if isinstance(filled, dict) else {}
        title = str(bib.get("title", "")).strip()
        if not title:
            continue

        author_text = str(bib.get("author", "")).strip()
        authors = [name.strip() for name in author_text.replace(" and ", ",").split(",") if name.strip()]

        venue = (
            str(bib.get("venue", "")).strip()
            or str(bib.get("journal", "")).strip()
            or str(bib.get("booktitle", "")).strip()
        )

        year = _safe_int(bib.get("pub_year") or bib.get("year"))
        citation_count = _safe_int(filled.get("num_citations") if isinstance(filled, dict) else None)

        author_pub_id = str((filled.get("author_pub_id", "") if isinstance(filled, dict) else "")).strip()
        scholar_link = ""
        if author_pub_id:
            scholar_link = (
                "https://scholar.google.com/citations?view_op=view_citation"
                f"&hl=en&user={user_id}&citation_for_view={user_id}:{author_pub_id}"
            )

        results.append(
            {
                "title": title,
                "authors": authors,
                "venue": venue,
                "year": year,
                "citationCount": citation_count,
                "summary": "",
                "tags": [],
                "links": {
                    "scholar": scholar_link,
                    "pdf": "",
                    "arxiv": "",
                    "code": "",
                },
            }
        )

    deduped: dict[str, dict[str, Any]] = {}
    for item in results:
        deduped[_normalize_title(item["title"])] = item
    return _sort_publications(list(deduped.values()))


def _merge_with_existing(existing: list[dict[str, Any]], fresh: list[dict[str, Any]]) -> list[dict[str, Any]]:
    existing_map = {
        _normalize_title(str(item.get("title", ""))): item
        for item in existing
        if str(item.get("title", "")).strip()
    }

    merged: list[dict[str, Any]] = []
    for item in fresh:
        key = _normalize_title(item["title"])
        prior = existing_map.get(key, {})

        # Preserve any existing non-metadata fields in auto file while refreshing metadata.
        carry = {k: v for k, v in prior.items() if k not in {"authors", "venue", "year", "citationCount", "links"}}

        merged_links = {
            "scholar": "",
            "pdf": "",
            "arxiv": "",
            "code": "",
        }
        prior_links = prior.get("links", {}) if isinstance(prior, dict) else {}
        if isinstance(prior_links, dict):
            for key_name in merged_links:
                value = prior_links.get(key_name)
                if isinstance(value, str):
                    merged_links[key_name] = value
        for key_name in merged_links:
            value = item.get("links", {}).get(key_name) if isinstance(item.get("links"), dict) else None
            if isinstance(value, str):
                merged_links[key_name] = value

        merged.append(
            {
                **carry,
                "title": item["title"],
                "authors": item.get("authors", []),
                "venue": item.get("venue", ""),
                "year": item.get("year", None),
                "citationCount": item.get("citationCount", None),
                "summary": carry.get("summary", ""),
                "tags": carry.get("tags", []),
                "links": merged_links,
            }
        )

    return _sort_publications(merged)


def main() -> int:
    parser = argparse.ArgumentParser(description="Update publications.auto.json from Google Scholar")
    parser.add_argument("--user-id", default=os.getenv("SCHOLAR_USER_ID", DEFAULT_USER_ID))
    parser.add_argument(
        "--manual-template",
        action="store_true",
        help="Write data/publications.auto.manual.template.json and exit.",
    )
    args = parser.parse_args()

    if args.manual_template:
        _build_manual_template()
        print(f"Wrote manual template: {MANUAL_TEMPLATE_PATH}")
        return 0

    existing = _load_json_list(AUTO_PATH)

    try:
        fresh = _fetch_scholar(args.user_id)
        merged = _merge_with_existing(existing, fresh)
    except Exception as exc:
        _build_manual_template()
        print("Scholar fetch failed; leaving data/publications.auto.json unchanged.")
        print(f"Reason: {exc}")
        print(
            "Manual fallback: fill data/publications.auto.manual.template.json and copy entries into data/publications.auto.json."
        )
        return 0

    AUTO_PATH.write_text(json.dumps(merged, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
    print(f"Updated {AUTO_PATH} with {len(merged)} publications from Scholar user {args.user_id}.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
