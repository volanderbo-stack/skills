"""Звуковий прохід без музики: CC0-ефекти з бібліотеки скіла sound-effects, змішані ffmpeg.
Запуск: python sound/mix.py <відео без звуку> <вихідний mp4>
Пік кожного ефекту ставиться на кадр події (+1 кадр), як радить hyperframes/references/sound.md."""
import array, json, subprocess, sys
from pathlib import Path

SFX = Path(__file__).resolve().parents[3] / ".claude/skills/sound-effects/sfx"
SR = 48000
W = ["kit/whoosh.ogg", "whoosh/fs-264777-swoosh.ogg", "whoosh/fs-683101-quick-woosh.ogg"]
P = ["kit/pop.ogg", "pop/kenney-interface-drop-001.ogg"]

# (час події, файл, гучність dB). Заставка 4 с, картки по 6 с; синя заливка закриває кадр за 0,47 с до склейки.
cues = [(0.30, "kit/tick.ogg", -10)]
for k in range(7):
    cut = 4 + 6 * k
    cues.append((cut - 0.25, W[k % 3], -6))          # синя заливка-перехід
for k in range(6):
    cues.append((4 + 6 * k + 1.1, P[k % 2], -9))  # плашка «Спробуй»
cues += [
    (40.4, "kit/riser.ogg", -12),   # riser закінчується на фіналі
    (40.5, "kit/impact.ogg", -4),  # фінальний заголовок — головне розкриття
    (41.95, "kit/pop.ogg", -9),     # кнопка «Збережи»
]

def peak_offset(f):
    raw = subprocess.run(["ffmpeg", "-v", "error", "-i", str(SFX / f), "-ac", "1", "-ar", str(SR), "-f", "s16le", "-"],
                         capture_output=True, check=True).stdout
    a = array.array("h", raw)
    i = max(range(len(a)), key=lambda j: abs(a[j]))
    return i / SR, len(a) / SR

def main(src, dst):
    ins, filt = ["-i", src], []
    for n, (t, f, db) in enumerate(cues):
        pk, dur = peak_offset(f)
        start = t + 1 / 60 - (dur if "riser" in f else pk)  # riser закінчується на події
        ins += ["-i", str(SFX / f)]
        filt.append(f"[{n+1}:a]aformat=sample_rates={SR}:channel_layouts=stereo,volume={db + 4}dB,"
                    f"adelay={max(0,int(start*1000))}|{max(0,int(start*1000))}[s{n}]")
    mix = "".join(f"[s{n}]" for n in range(len(cues)))
    filt.append(f"{mix}amix=inputs={len(cues)}:normalize=0,alimiter=limit=0.55:level=false,apad[a]")
    subprocess.run(["ffmpeg", "-y", "-v", "error", *ins, "-filter_complex", ";".join(filt),
                    "-map", "0:v", "-map", "[a]", "-c:v", "copy", "-c:a", "aac", "-b:a", "192k", "-shortest", dst], check=True)
    json.dump([{"t": t, "file": f, "db": db} for t, f, db in cues], open(Path(__file__).with_name("cues.json"), "w"), indent=1)

if __name__ == "__main__":
    main(sys.argv[1], sys.argv[2])
