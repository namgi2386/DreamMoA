import axios from "axios";
import api from "./axios";

const APPLICATION_SERVER_URL = "http://localhost:8080/openvidu/";

export const videoApi = {
  async getToken() {
    const sessionId = await this.createSession(this.state.mySessionId);
    return await this.createToken(sessionId);
  },

  async createSession(sessionId) {
    // 수정: 엔드포인트를 'sessions' 로 호출 (기존 'api/sessions' -> 'sessions')
    const response = await api.post(
      APPLICATION_SERVER_URL + "sessions",
      { customSessionId: sessionId },
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    return response.data; // 생성된 세션 ID
  },

  async createToken(sessionId) {
    // 수정: 엔드포인트를 'sessions/{sessionId}/connections' 로 호출
    const response = await api.post(
      APPLICATION_SERVER_URL + "sessions/" + sessionId + "/connections",
      {},
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    return response.data; // 발급된 토큰
  },
};
