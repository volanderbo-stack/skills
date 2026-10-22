---
description: Коротка motion-графіка до ~30 с у HyperFrames (титри, лічильники, лого, lower third, оверлей)
argument-hint: "[що анімувати: текст, цифри, лого; формат; прозорий фон?]"
---

Зроби коротку motion-графіку в HyperFrames. Задача: $ARGUMENTS

- Почни зі скіла `hyperframes`, далі `hyperframes-cli`; перед тим як малювати ефект вручну — пошукай готовий блок через `hyperframes-registry` (`npx hyperframes catalog --query "<англійською>" --json`).
- Проєкт: `npx hyperframes init videos/<slug> --non-interactive --resolution landscape` (9:16 → `portrait`). Не запускай команди `skills`.
- Без зупинок: не пропонуй 3 сюжети на вибір, обери один сам і коротко опиши його.
- Медіа (звуки, лого) — через `media-use`, тільки безкоштовні шляхи. HeyGen і будь-що платне — лише з мого дозволу.
- Рендер завжди `--fps 60` (якщо оверлей лягає на готове відео — fps того відео). Прозорий оверлей (для вставки в інший монтаж) → `--format mov` (ProRes 4444) у `output/<slug>.mov`; інакше `output/<slug>.mp4` з `--quality delivery`.
- `npx hyperframes check --json` до нуля помилок, `npx hyperframes snapshot` ключових моментів, перегляд кадрів, потім рендер.
- Онови `ПІДСУМКИ.md`, короткий звіт.
