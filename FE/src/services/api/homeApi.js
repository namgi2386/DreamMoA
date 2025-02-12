import api from "./axios";

export const homeApi = {
  // 유저 태그 조회
  homeCommunityItemsGetItMyBagBitch: async () => {
    const response = await api.get("/user-tag");
    return response.data.map((tag) => tag.tagName);
  },

  // 유저 태그 추가
  updateUserTags: async (tagNames) => {
    return await api.post("/user-tag", { tagNames });
  },
};
