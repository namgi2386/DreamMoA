import json
import logging
from fastapi import APIRouter, WebSocket, WebSocketDisconnect  # WebSocketDisconnect 추가
from models.predict import predict_focus

# ✅ Logger 설정
logger = logging.getLogger(__name__)

router = APIRouter()

@router.websocket("/focus")
async def focus_websocket(websocket: WebSocket):
    await websocket.accept()
    logger.info("✅ WebSocket 연결됨")

    try:
        while True:
            # ✅ JSON 데이터 수신
            data = await websocket.receive_json()
            logger.info(f"📡 받은 데이터: {data}")

            # ✅ 모델 예측 수행 (클래스, 확률값 반환)
            prediction, confidence = predict_focus(data)
            if prediction is None:
                error_msg = {"error": "Invalid data received"}
                await websocket.send_json(error_msg)
                logger.warning(f"❌ 유효하지 않은 데이터: {data}")
                continue

            # ✅ 예측 결과 전송
            result = {
                "focus_prediction": prediction,
                "confidence": round(confidence, 4)
            }
            await websocket.send_json(result)
            logger.info(f"📡 보낸 결과: {result}")

    except WebSocketDisconnect:
        logger.info("🔴 클라이언트가 연결을 종료함")
    except Exception as e:
        logger.error(f"❌ WebSocket 에러: {e}")
    finally:
        try:
            await websocket.close()
        except RuntimeError:
            pass  # 이미 닫힌 연결은 무시
        logger.info("🔴 WebSocket 연결 종료")