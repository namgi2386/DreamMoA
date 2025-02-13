import api from "./axios";

const dashboardApi = {
    // 각오 조회: GET /dashboard/determination
  getDetermination: async () => {
    try {
      const response = await api.get("/dashboard/determination");
      return response.data;
    } catch (error) {
      console.error("각오 조회 실패:", error);
      throw error;
    }
  },

  // 각오 수정/작성: PUT /dashboard/determination
  updateDetermination: async (determination) => {
    try {
      const response = await api.put("/dashboard/determination", { determination });
      return response.data;
    } catch (error) {
      console.error("각오 업데이트 실패:", error);
      throw error;
    }
  },
};

export default dashboardApi;