// recoil/atoms/tags/selectedTagsState.js
import { atom } from "recoil";
import { tagApi } from "../../../services/api/tagApi";

export const selectedTagsState = atom({
  key: "selectedTagsState",
  default: [], // 초기값은 빈 배열로 설정
  effects: [
    ({ setSelf, onSet }) => {
      // 초기 로드
      const loadTags = async () => {
        try {
          const localTags = localStorage.getItem("selectedTags");
          if (localTags) {
            setSelf(JSON.parse(localTags));
            return;
          }

          const apiTags = await tagApi.getUserTags();
          setSelf(apiTags);
          localStorage.setItem("selectedTags", JSON.stringify(apiTags));
        } catch (error) {
          console.error("태그 로드 실패:", error);
        }
      };

      loadTags();

      // 변경사항 저장
      onSet((newTags) => {
        localStorage.setItem("selectedTags", JSON.stringify(newTags));
        tagApi.updateUserTags(newTags).catch(console.error);
      });
    },
  ],
});
