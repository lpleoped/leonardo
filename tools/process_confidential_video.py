from pathlib import Path
import subprocess
import cv2
import imageio_ffmpeg

source = Path(r"C:\Users\lpleo\OneDrive\Escritorio\Fotos Leo\CV\Carrera\IBM-Actual\15-05-2025 - Presentación de Herramienta propia.mp4")
root = Path(__file__).resolve().parents[1]
temp = root / "confidential_video_silent.mp4"
output = root / "public" / "video" / "ibm-hoy-presentacion.mp4"
output.parent.mkdir(parents=True, exist_ok=True)

cap = cv2.VideoCapture(str(source))
if not cap.isOpened():
    raise RuntimeError(f"No se pudo abrir {source}")

width = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
height = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))
fps = cap.get(cv2.CAP_PROP_FPS) or 30.0
writer = cv2.VideoWriter(
    str(temp), cv2.VideoWriter_fourcc(*"mp4v"), fps, (width, height)
)

while True:
    ok, frame = cap.read()
    if not ok:
        break
    # Blur the shared tool area for the whole video.
    blurred = frame.copy()
    blurred[:, :895] = cv2.GaussianBlur(frame[:, :895], (0, 0), sigmaX=8, sigmaY=8)

    # Blur the participant column, except for Leonardo's tile, his name, and
    # the connected-people bubble at the bottom-right.
    right = frame[:, 895:]
    right_blurred = cv2.GaussianBlur(right, (0, 0), sigmaX=8, sigmaY=8)
    keep_y1, keep_y2 = 398, min(height, 560)
    right_blurred[keep_y1:keep_y2, :] = right[keep_y1:keep_y2, :]
    blurred[:, 895:] = right_blurred
    writer.write(blurred)

cap.release()
writer.release()

# Keep the original audio stream untouched while replacing only the video.
ffmpeg = imageio_ffmpeg.get_ffmpeg_exe()
subprocess.run(
    [
        ffmpeg,
        "-y",
        "-i", str(temp),
        "-i", str(source),
        "-map", "0:v:0",
        "-map", "1:a:0?",
        "-c:v", "libx264",
        "-preset", "medium",
        "-crf", "23",
        "-c:a", "copy",
        "-shortest",
        str(output),
    ],
    check=True,
)
temp.unlink(missing_ok=True)
print(output)
