from pathlib import Path
import subprocess
import cv2
import imageio_ffmpeg

root = Path(__file__).resolve().parents[1]
source = root / "public" / "video" / "ibm-hoy-presentacion.mp4"
silent = root / "woman_blur_silent.mp4"
output = root / "public" / "video" / "ibm-hoy-presentacion-final.mp4"

cap = cv2.VideoCapture(str(source))
width = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
height = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))
fps = cap.get(cv2.CAP_PROP_FPS) or 30.0
writer = cv2.VideoWriter(str(silent), cv2.VideoWriter_fourcc(*"mp4v"), fps, (width, height))

while True:
    ok, frame = cap.read()
    if not ok:
        break
    # Woman's participant tile only; leave the +118 bubble untouched.
    x1, x2 = 895, min(width, 966)
    y1, y2 = 500, min(height, 560)
    patch = frame[y1:y2, x1:x2]
    frame[y1:y2, x1:x2] = cv2.GaussianBlur(patch, (0, 0), sigmaX=6, sigmaY=6)
    writer.write(frame)

cap.release()
writer.release()

ffmpeg = imageio_ffmpeg.get_ffmpeg_exe()
subprocess.run([
    ffmpeg, "-y", "-i", str(silent), "-i", str(source),
    "-map", "0:v:0", "-map", "1:a:0?", "-c:v", "libx264",
    "-preset", "medium", "-crf", "23", "-c:a", "copy", "-shortest",
    str(output),
], check=True, stdout=subprocess.DEVNULL)
silent.unlink(missing_ok=True)
source.unlink()
output.replace(source)
print(source)
