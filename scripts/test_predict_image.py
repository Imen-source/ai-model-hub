import requests
from pathlib import Path

url = "http://127.0.0.1:8000/predict/image/"
file_path = Path(r"C:\Users\Hp\Certificats & Projects\ai-model-hub\scripts\fashion_mnist_samples\0_Ankle_boot.png")
params = {"model_name": "fashion_mnist_cnn"}

if not file_path.exists():
    print(f"ERROR: file not found: {file_path}")
else:
    try:
        with file_path.open("rb") as f:
            files = {"file": f}
            response = requests.post(url, files=files, params=params, timeout=15)

        # Print helpful diagnostics for terminal debugging
        print(f"REQUEST URL: {response.request.url}")
        print(f"Status code: {response.status_code}")
        print("Response text:")
        print(response.text)

        try:
            print("Response JSON:")
            print(response.json())
        except ValueError:
            print("Response is not valid JSON; see raw text above.")

    except requests.exceptions.RequestException as e:
        print("Request failed:", e)
