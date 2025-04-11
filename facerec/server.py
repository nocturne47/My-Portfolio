import cv2
import numpy as np
import face_recognition
import base64
from fastapi import FastAPI, WebSocket
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Mengizinkan akses dari React (CORS)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load gambar wajah yang dikenal
known_image = face_recognition.load_image_file("dataset/saya.jpg")  # Ubah sesuai gambar kamu
known_encoding = face_recognition.face_encodings(known_image)[0]
known_faces = [known_encoding]
known_names = ["Ferdinand"]  # Nama yang akan ditampilkan jika wajah dikenali

@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    print("WebSocket Connected")

    try:
        while True:
            # Menerima gambar dalam format base64 dari React
            data = await websocket.receive_text()
            image_data = base64.b64decode(data)

            # Konversi gambar base64 ke format OpenCV
            np_arr = np.frombuffer(image_data, np.uint8)
            frame = cv2.imdecode(np_arr, cv2.IMREAD_COLOR)

            # Ubah ke RGB
            rgb_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)

            # Deteksi wajah
            face_locations = face_recognition.face_locations(rgb_frame)
            face_encodings = face_recognition.face_encodings(rgb_frame, face_locations)

            faces_detected = []
            for (top, right, bottom, left), face_encoding in zip(face_locations, face_encodings):
                name = "Unknown"
                similarity = 0  # Default 0%

                # Hitung jarak wajah
                distances = face_recognition.face_distance(known_faces, face_encoding)
                best_match_index = np.argmin(distances)

                if distances[best_match_index] < 0.6:  # Ambang batas 0.6
                    name = known_names[best_match_index]
                    similarity = (1 - distances[best_match_index]) * 100  # Ubah ke persentase

                faces_detected.append({
                    "x": left,
                    "y": top,
                    "width": right - left,
                    "height": bottom - top,
                    "name": name,
                    "similarity": round(similarity, 2)  # 2 desimal
                })

            # Kirim hasil ke React
            await websocket.send_json({"faces": faces_detected})

    except Exception as e:
        print("WebSocket Error:", e)
    finally:
        print("WebSocket Disconnected")
        await websocket.close()
