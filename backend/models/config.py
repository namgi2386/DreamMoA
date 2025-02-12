import os
import pickle
from dotenv import load_dotenv
import torch

# ✅ 환경 변수 로드
load_dotenv()

# ✅ 모델 경로 설정 (Windows 환경)
MODEL_PATH = os.getenv("MODEL_PATH", r"C:\Users\zebra\Desktop\asfdasf\S12P11C106\backend\models\residual_gru_model.pth")
FEATURES_PATH = r"C:\Users\zebra\Desktop\asfdasf\S12P11C106\backend\models\features.pkl"
DEVICE = "cuda" if torch.cuda.is_available() else "cpu"

# ✅ Feature 리스트 (자동 로드)
if os.path.exists(FEATURES_PATH):
    with open(FEATURES_PATH, "rb") as f:
        FEATURES = pickle.load(f)
    print(f"✅ Features 로드 완료: {len(FEATURES)}개")
else:
    raise FileNotFoundError(f"❌ Feature 파일을 찾을 수 없습니다: {FEATURES_PATH}")

# ✅ 디버깅용 출력
print(f"✅ MODEL_PATH: {MODEL_PATH}")
print(f"✅ DEVICE: {DEVICE}")
print(f"✅ FEATURES: {FEATURES}")
