#!/usr/bin/env python3
from __future__ import annotations

import argparse
from pathlib import Path


def iter_markdown_files(root: Path) -> list[Path]:
    return sorted(p for p in root.rglob("*.md") if p.is_file())


def collect_heading_levels(lines: list[str]) -> list[int]:
    levels: list[int] = []
    in_fence = False
    fence_marker = ""
    for line in lines:
        stripped = line.lstrip()
        if stripped.startswith("```") or stripped.startswith("~~~"):
            marker = stripped[:3]
            if not in_fence:
                in_fence = True
                fence_marker = marker
            elif marker == fence_marker:
                in_fence = False
                fence_marker = ""
            continue
        if in_fence:
            continue
        # Markdown headings: up to 3 leading spaces, then 1-6 #, then space.
        if line.startswith((" ", "\t")):
            prefix = line[:3]
            if prefix.strip() != "" and not line.startswith("   "):
                continue
        if len(line) < 2:
            continue
        if line.lstrip().startswith("#"):
            content = line.lstrip()
            if content.startswith("#"):
                hashes = 0
                for ch in content:
                    if ch == "#":
                        hashes += 1
                    else:
                        break
                if 1 <= hashes <= 6 and len(content) > hashes and content[hashes] == " ":
                    levels.append(hashes)
    return levels


def promote_headings(lines: list[str]) -> list[str]:
    out: list[str] = []
    in_fence = False
    fence_marker = ""
    for line in lines:
        stripped = line.lstrip()
        if stripped.startswith("```") or stripped.startswith("~~~"):
            marker = stripped[:3]
            if not in_fence:
                in_fence = True
                fence_marker = marker
            elif marker == fence_marker:
                in_fence = False
                fence_marker = ""
            out.append(line)
            continue
        if in_fence:
            out.append(line)
            continue
        # Allow up to 3 leading spaces
        leading = ""
        content = line
        if line.startswith((" ", "\t")):
            leading = line[:3] if line[:3].strip() == "" else ""
            content = line[len(leading) :]
        if content.startswith("##"):
            # Reduce heading level by one (## -> #, ### -> ##, etc.)
            hashes = 0
            for ch in content:
                if ch == "#":
                    hashes += 1
                else:
                    break
            if 2 <= hashes <= 6 and len(content) > hashes and content[hashes] == " ":
                content = "#" * (hashes - 1) + content[hashes:]
                out.append(leading + content)
                continue
        out.append(line)
    return out


def process_file(path: Path) -> bool:
    original = path.read_text(encoding="utf-8")
    lines = original.splitlines(keepends=True)
    levels = collect_heading_levels(lines)
    if not levels:
        return False
    if 1 in levels:
        return False
    # Highest level is 2 (no level-1 headings)
    updated = "".join(promote_headings(lines))
    if updated != original:
        path.write_text(updated, encoding="utf-8")
        return True
    return False


def main() -> None:
    parser = argparse.ArgumentParser(
        description="Promote markdown headings if highest level is ##."
    )
    parser.add_argument("root", type=Path, help="Root directory to scan")
    args = parser.parse_args()
    root = args.root
    changed: list[Path] = []
    for md in iter_markdown_files(root):
        if process_file(md):
            changed.append(md)
    print(f"Updated {len(changed)} files.")


if __name__ == "__main__":
    main()
