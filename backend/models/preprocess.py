import os
import numpy as np
import pandas as pd
import torch
import pickle
from models.config import FEATURES, DEVICE, MODEL_PATH  # ✅ 경로 유지

# ✅ StandardScaler 로드
SCALER_PATH = os.getenv("SCALER_PATH", r"C:\Users\zebra\Desktop\asfdasf\S12P11C106\backend\models\standard_scaler.pkl")

try:
    with open(SCALER_PATH, "rb") as f:
        scaler = pickle.load(f)
    print(f"✅ StandardScaler 로드 완료: {SCALER_PATH}")
except FileNotFoundError:
    raise FileNotFoundError(f"❌ StandardScaler 파일을 찾을 수 없습니다: {SCALER_PATH}")

# ✅ 데이터 전처리 함수 (테스트 데이터)
def preprocess_input(data):
    frame_data = data.get("frame_data", [])

    if not frame_data:
        return None  # 🔥 데이터가 없으면 처리 X

    df = pd.DataFrame(frame_data)

    # ✅ Feature 정렬 및 누락 값 처리
    for feature in FEATURES:
        if feature not in df.columns:
            df[feature] = 0  # 🔥 누락된 Feature를 0으로 채움

    df = df[FEATURES]  # ✅ Feature 순서 고정

    # ✅ StandardScaler 정규화 (학습한 Scaler 적용)
    df[FEATURES] = scaler.transform(df[FEATURES])  # ✅ transform()으로 학습된 Scaler 적용
    df = df.replace([np.inf, -np.inf], np.nan).fillna(0)  # 🔥 NaN, Inf 방지

    # ✅ 시퀀스 길이 맞추기 (최대 15 프레임 유지)
    seq_array = df.values
    seq_array = np.pad(seq_array, ((0, 15 - len(seq_array)), (0, 0)), mode='constant') if len(seq_array) < 15 else seq_array[:15]

    # ✅ [점검] 전처리된 데이터 확인
    print("🔥 전처리된 데이터 (입력 형태):", seq_array.shape)
    print("🔥 전처리된 데이터 (첫 번째 프레임):", seq_array[0])

    # ✅ PyTorch Tensor 변환
    input_tensor = torch.tensor([seq_array], dtype=torch.float32).to(DEVICE)
    return input_tensor
