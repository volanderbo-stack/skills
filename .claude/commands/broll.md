---
description: Motion-B-roll під відео з людиною за транскриптом (скіл motion-broll)
argument-hint: "[шлях до відео в assets/, шлях до .srt/.vtt, щільність light/medium/heavy]"
---

Зроби motion-B-roll за скілом `motion-broll`. Дані: $ARGUMENTS

- Без відео зупинись і спитай шлях — це єдине обов'язкове питання. Транскрипт: `.srt`/`.vtt` поруч із відео в `assets/`; якщо немає — `npx hyperframes transcribe <відео>` (локально, безкоштовно) або `faster-whisper` у `.venv`.
- Інтерв'ю зі скіла не проводь: щільність за замовчуванням medium, стиль — бренд з `assets/brand/brand.md` (не палітра й шрифт Geist зі скіла).
- Частота кадрів кліпів — як у вихідного відео (`ffprobe`), щоб вставки не смикались; якщо кліп іде окремо, без відео під ним, — 60 fps.
- `setup.sh` не запускай; налаштуй вручну за «Технічними нотатками» з `CLAUDE.md`. Робоча папка — `videos/<slug>/broll/`.
- План (таблиця кліпів) покажи у відповіді, але не чекай схвалення.
- Кліпи → `videos/<slug>/broll/out/`; прев'ю з вклеєними кліпами → `output/<slug>-preview.mp4`; `TIMING.md`, `viewer.html`, `compare.html` залиш у `videos/<slug>/broll/out/` і дай мені шляхи.
- Онови `ПІДСУМКИ.md`, короткий звіт.
