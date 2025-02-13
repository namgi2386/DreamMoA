import api from "./axios";

const challengeApi = {
  /**
   * 챌린지 방 생성
   * @param {Object} challengeData - 챌린지 생성 데이터
   * @param {File} thumbnail - 챌린지 썸네일 이미지
   * @returns {Promise} - 챌린지 생성 결과
   */
  createChallenge: async (challengeData, thumbnail) => {
    try {
      // FormData 생성
      const formData = new FormData();

      // challengeData를 JSON 문자열로 변환하여 추가
      const apiData = {
        ...challengeData,
        isPrivate: !challengeData.isPublic, // boolean 값 반전
      };
      delete apiData.isPublic;

      // 날짜 형식을 ISO 문자열로 변환
      if (apiData.startDate) {
        apiData.startDate = new Date(apiData.startDate).toISOString();
      }
      if (apiData.expireDate) {
        apiData.expireDate = new Date(apiData.expireDate).toISOString();
      }

      // challengeData를 Blob으로 변환하여 JSON 형식으로 추가
      const challengeDataBlob = new Blob([JSON.stringify(apiData)], {
        type: "application/json",
      });
      formData.append("challengeData", challengeDataBlob);

      // 썸네일 이미지가 있는 경우에만 추가
      if (thumbnail) {
        formData.append("thumbnail", thumbnail);
        console.log('썸네일 이미지 추가됨:', thumbnail); // 디버깅용
      }

      // POST 요청 전송
      const response = await api.post("/challenges/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

    // 응답에 thumbnailUrl이 포함되어 있는지 확인
    console.log('챌린지 생성 응답:', response.data); // 디버깅용
    return response.data;
  } catch (error) {
    console.error("Challenge creation failed:", error);
    throw error;
  }
},

  /**
   * 진행 중인 챌린지 목록 조회
   * @returns {Promise} - 진행 중인 챌린지 목록
   */
  getRunningChallengeList: async () => {
    const response = await api.get("/challenges/ongoing");
    return response;
  },
  /**
   * 사용자가 참여 중인 챌린지 목록 조회 (최대 7개)
   * @returns {Promise} - 참여 중인 챌린지 목록
   */
  getMyParticipatingChallenges: async () => {
    try {
      const response = await api.get("/challenges/my-challenges");
      return response.data;
    } catch (error) {
      console.error("참여 중인 챌린지 조회 실패:", error);
      throw error;
    }
  },

  // 챌린지 리스트 최상단 나의 태그기반 챌린지 8개 받아오기
  getTagChallenges: async(tags) => {
    const response = await api.get("/challenges/tag-challenges", {
      params: {
        tags: tags // 쿼리 파라미터로 tags 전달
      }
    });
    return response
  },

  // 챌린지 디테일 정보 불러오기 
  getChallengeDetailInfo: async(challengeId) => {
    try {
      const response = await api.get(`/challenges/${challengeId}/info`);
      return response
    } catch (e){
      console.log("챌린지디테일 못가져옴",e);
    }
  }
};

export default challengeApi;
