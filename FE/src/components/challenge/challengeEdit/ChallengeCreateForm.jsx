// src/components/challenge/ChallengeCreateForm.jsx
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";
// 여기서부터는 tag 컴포넌트를 위한 import
import { useEffect } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { selectedTagsState } from "/src/recoil/atoms/tags/selectedTagsState";
import EditableTagList from "../../common/tags/EditableTagList";
// api 호출을 위한 import
import challengeApi from "../../../services/api/challengeApi";
// successModal을 위한 import
// import SuccessModal from "../../common/modal/SuccessModal";
import {
  successModalState,
  errorModalState,
} from "/src/recoil/atoms/modalState";

export default function ChallengeCreateForm() {
  // [수정사항 1] navigate와 state 선언들을 컴포넌트 최상단으로 이동
  const navigate = useNavigate();
  const [isFormDirty, setIsFormDirty] = useState(false);

  // successModal 상태도 상단으로 이동
  const setSuccessModalState = useSetRecoilState(successModalState);
  const setErrorModalState = useSetRecoilState(errorModalState);

  // selectedTags 상태
  const [selectedTags, setSelectedTags] = useRecoilState(selectedTagsState);
  // 태그 편집 모드 상태
  const [isEdittag, setIsEdittag] = useState(true); // 생성 폼에서는 항상 편집 모드

  const [formData, setFormData] = useState({
    title: "",
    maxParticipants: 6,
    description: "",
    tags: [],
    startDate: "",
    expireDate: "",
    standard: 1,
    thumbnail: null,
    isPublic: false,
  });

  // [수정사항 2] useEffect들을 state 선언 직후로 이동
  // 폼 데이터가 변경될 때마다 isFormDirty를 true로
  useEffect(() => {
    // 초기 상태가 아닌 경우에만 dirty로
    if (
      formData.title !== "" ||
      formData.description !== "" ||
      formData.maxParticipants !== 6 ||
      selectedTags.length > 0 ||
      formData.startDate !== "" ||
      formData.expireDate !== "" ||
      formData.standard !== 1 ||
      formData.image !== null
    ) {
      setIsFormDirty(true);
    }
  }, [formData, selectedTags]);

  // 브라우저 창 닫기/새로고침 시 경고
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (isFormDirty) {
        e.preventDefault();
        e.returnValue = ""; // Chrome에서 필요
        return ""; // 표준 브라우저에서 필요
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [isFormDirty]);

  // 컴포넌트 마운트/언마운트 시 태그 초기화
  useEffect(() => {
    setSelectedTags([]); // 컴포넌트 마운트 시 태그 초기화

    return () => {
      setSelectedTags([]); // 컴포넌트 언마운트 시 태그 초기화
    };
  }, [setSelectedTags]);

  // 필수 필드 검증
  const isFormValid = () => {
    return (
      // tag, 이미지지 제외하고 다 필수
      formData.title.trim() !== "" && // 제목 필수
      formData.description.trim() !== "" && // 설명 필수
      formData.maxParticipants >= 1 && // 참가자 수 필수
      formData.startDate !== "" && // 시작일 필수
      formData.expireDate !== "" && // 종료일 필수
      formData.standard >= 1 && // 목표 달성 기준 필수
      selectedTags.length > 0 // 태그 필수 - 최소 1개 이상
    );
  };

  // 입력 핸들러
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // 참가자 수 입력
  const handleParticipantsChange = (e) => {
    const value = parseInt(e.target.value);

    // 1 미만이면 1로, 12 초과면 12로 설정
    if (value < 1) {
      setFormData((prev) => ({ ...prev, maxParticipants: 1 }));
    } else if (value > 12) {
      setFormData((prev) => ({ ...prev, maxParticipants: 12 }));
    } else {
      setFormData((prev) => ({ ...prev, maxParticipants: value }));
    }
  };

  // 챌린지 기간 일수 계산 함수
  const calculateDuration = () => {
    if (!formData.startDate || !formData.expireDate) return 0;

    const start = new Date(formData.startDate);
    const end = new Date(formData.expireDate);
    const diffTime = Math.abs(end - start);
    return Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1; // 시작일과 종료일 포함
  };

  // 목표 달성 기준 입력 핸들러
  const handleStandardChange = (e) => {
    const value = parseInt(e.target.value);
    const duration = calculateDuration();

    // 입력값이 범위를 벗어나면 경계값으로 설정
    if (value < 1) {
      setFormData((prev) => ({ ...prev, standard: 1 }));
    } else if (value > duration) {
      setFormData((prev) => ({ ...prev, standard: duration }));
    } else {
      setFormData((prev) => ({ ...prev, standard: value }));
    }
  };

  // 날짜 변경 시 목표 달성 기준 조정
  const handleDateChange = (e) => {
    const { name, value } = e.target;

    if (
      name === "startDate" &&
      formData.expireDate &&
      value > formData.expireDate
    ) {
      alert("시작일은 종료일보다 빠른 날짜여야 합니다.");
      return;
    }
    if (
      name === "expireDate" &&
      formData.startDate &&
      value < formData.startDate
    ) {
      alert("종료일은 시작일보다 늦은 날짜여야 합니다.");
      return;
    }

    setFormData((prev) => {
      const updatedData = { ...prev, [name]: value };
      // 날짜가 변경되면 목표 달성 기준이 기간을 초과하지 않도록 조정
      const duration = calculateDuration();
      if (prev.standard > duration) {
        updatedData.standard = duration;
      }
      return updatedData;
    });
  };

  // 이미지 업로드 핸들러
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        image: file,
        imagePreview: URL.createObjectURL(file),
      }));
    }
  };

  // 공개 여부 토글 핸들러
  const handlePublicToggle = () => {
    setFormData((prev) => ({
      ...prev,
      isPublic: !prev.isPublic,
    }));
  };

  const handleSuccess = (myMessage) => {
    // 작업 완료 후
    setSuccessModalState({
      isOpen: true,
      message: myMessage,
      onCancel: () => {
        // 실행 취소 시 수행할 작업
        console.log("작업 취소됨");
      },
      isCancellable: false, // 실행 취소 버튼 표시 여부
    });
  };

  // 에러 처리를 위한 핸들러
  const handleError = (message) => {
    setErrorModalState({
      isOpen: true,
      message: message,
      onCancel: () => {
        console.log("에러 모달 닫힘");
      },
      isCancellable: true,
    });
  };

  // 폼 제출 핸들러
  const handleSubmit = async (e) => {
    e.preventDefault();

    // selectedTags를 formData에 포함
    const submitData = {
      ...formData,
      tags: selectedTags,
      isPrivate: !formData.isPublic,
    };

    try {
      // API 호출
      const response = await challengeApi.createChallenge(
        submitData,
        formData.image
      );

      // 응답 구조 확인을 위한 로그
      console.log("전체 응답 구조:", response);

      // Axios 응답의 경우 response.data에 실제 서버 응답이 있을 수 있음
      if (response?.data?.challengeId) {
        // 챌린지 ID가 있다면 성공으로 간주
        handleSuccess("챌린지가 생성되었습니다");
        setIsFormDirty(false); // 폼이 제출되면 dirty 상태 해제
        navigate("/mypage");
      }

      if (response.challengeId) {
        // 직접 응답 데이터를 받는 경우
        handleSuccess("챌린지가 생성되었습니다");
      }
    } catch (error) {
      if (error.response) {
        switch (error.response.status) {
          case 400:
            handleError("잘못된 요청입니다. 입력을 확인해주세요.");
            break;
          case 401:
            handleError("로그인이 필요합니다.");
            break;
          // case 403:
          //   handleError("권한이 없습니다.");
          //   break;
          default:
            handleError("챌린지 생성에 실패했습니다.");
        }
      } else if (error.request) {
        // 요청은 보냈지만 응답을 받지 못한 경우
        handleError("서버와 통신할 수 없습니다.");
      } else {
        // 요청 설정 중 오류 발생
        handleError("요청 중 오류가 발생했습니다.");
      }
      console.error("Error:", error);
    }

    console.log("Form submitted:", formData);
  };

  // exitButton 핸들러 수정
  const exitButton = () => {
    if (isFormDirty) {
      if (
        window.confirm("작성 중인 내용이 있습니다. 페이지를 나가시겠습니까?")
      ) {
        navigate(-1); // 이전 페이지로 이동
      }
    } else {
      navigate(-1);
    }
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-4xl mx-auto bg-white rounded-lg shadow-md p-8"
      >
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-4xl text-my-blue-1 font-semibold cursor-default">
            ⭐Create Your Challenge !
          </h2>
          <button
            className="text-gray-500 hover:text-gray-700"
            onClick={exitButton}
          >
            <span className="text-2xl">&times;</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* 공개 여부 토글 */}
          <div className="flex justify-between items-center">
            <span className="text-gray-700 cursor-default mr-3">공개 여부</span>
            <button
              type="button"
              onClick={handlePublicToggle}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none
                ${formData.isPublic ? "bg-my-blue-2" : "bg-gray-200"}`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform
                  ${formData.isPublic ? "translate-x-6" : "translate-x-1"}`}
              />
            </button>
          </div>

          {/* 챌린지 이름 입력 */}
          <div>
            <label className="block text-gray-700 mb-2">
              챌린지 이름<span className="text-red-500 ml-1">*</span>
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="SSAFY 알고리즘 스터디 방"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-my-blue-4"
            />
          </div>

          {/* 방 설명 입력 */}
          <div>
            <label className="block text-gray-700 mb-2">
              방 설명<span className="text-red-500 ml-1">*</span>
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="SSAFY생을 위한 방입니다. 편하게 참여해 주세요."
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-my-blue-4 h-24 resize-none"
            />
          </div>

          {/* 태그 선택 컴포넌트 불러옴 */}
          <div>
            <label className="block text-gray-700 mb-2">
              태그 선택<span className="text-red-500 ml-1">*</span>
            </label>
            <EditableTagList
              isEdittag={isEdittag}
              setIsEdittag={setIsEdittag}
              initialTags={[]}
            />
            {selectedTags.length === 0 && (
              <p className="text-sm text-my-blue-4 mt-1">
                하나 이상의 태그를 선택해주세요
              </p>
            )}
          </div>

          {/* 참가자 수 입력 */}
          <div>
            <label className="block text-gray-700 mb-2">
              참가자 수<span className="text-red-500 ml-1">*</span>
            </label>
            {/* flex container -> 입력 필드와 알림 메시지를 나란히 */}
            <div className="flex items-center gap-4">
              {/* 입력 필드 그룹 */}
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  name="maxParticipants"
                  value={formData.maxParticipants}
                  onChange={handleParticipantsChange}
                  min={1}
                  max={12}
                  className="w-24 px-4 py-2 border rounded-lg focus:outline-none focus:border-my-blue-4"
                />
                <span className="text-sm text-gray-500">명</span>
              </div>
              {/* 알림 메시지를 오른쪽으로 배치 */}
              <p className="text-sm text-gray-500">
                1 ~ 12명 사이로 입력해주세요
              </p>
            </div>
          </div>

          {/* 챌린지 기간 선택 */}
          <div className="space-y-4">
            <label className="block text-gray-700 mb-2">
              챌린지 기간<span className="text-red-500 ml-1">*</span>
            </label>
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block text-sm text-gray-600 mb-1">
                  시작일
                </label>
                <input
                  type="date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleDateChange}
                  min={new Date().toISOString().split("T")[0]} // 오늘 이후만 선택 가능
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-my-blue-4 cursor-pointer"
                />
              </div>
              <div className="flex-1">
                <label className="block text-sm text-gray-600 mb-1">
                  종료일
                </label>
                <input
                  type="date"
                  name="expireDate"
                  value={formData.expireDate}
                  onChange={handleDateChange}
                  min={
                    formData.startDate || new Date().toISOString().split("T")[0]
                  } // 시작일 이후만 선택 가능
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-my-blue-4 cursor-pointer"
                />
              </div>
            </div>
          </div>

          {/* 목표 달성 기준 입력 */}
          <div>
            <label className="block text-gray-700 mb-2">
              목표 달성 기준<span className="text-red-500 ml-1">*</span>
            </label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                name="standard"
                value={formData.standard}
                onChange={handleStandardChange}
                min={1}
                // 챌린지 기간이 0일 때는 max 속성을 설정 X
                {...(calculateDuration() > 0
                  ? { max: calculateDuration() }
                  : {})}
                className="w-24 px-4 py-2 border rounded-lg focus:outline-none focus:border-my-blue-4"
              />
              <span className="text-gray-600">
                {calculateDuration() > 0 ? `/ ${calculateDuration()}일` : "일"}
              </span>
              <span className="ml-2 text-sm text-gray-500">
                (챌린지 기간 중 목표 달성 일수)
              </span>
            </div>
            {calculateDuration() > 0 && (
              <p className="mt-1 text-sm text-gray-500">
                {Math.round((formData.standard / calculateDuration()) * 100)}%
                달성이 목표입니다.
              </p>
            )}
          </div>

          {/* 이미지 업로드 */}
          <div>
            <label className="block text-gray-700 mb-2">방 이미지</label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
              {formData.imagePreview ? (
                <div className="relative">
                  <img
                    src={formData.imagePreview}
                    alt="Preview"
                    className="max-h-48 mx-auto"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setFormData((prev) => ({
                        ...prev,
                        image: null,
                        imagePreview: null,
                      }))
                    }
                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6"
                  >
                    &times;
                  </button>
                </div>
              ) : (
                <div className="space-y-2">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="image-upload"
                  />
                  <label
                    htmlFor="image-upload"
                    className="cursor-pointer text-my-blue-2 hover:text-hmy-blue-2"
                  >
                    이미지 업로드
                  </label>
                </div>
              )}
            </div>
          </div>

          {/* 제출 버튼 */}
          <button
            type="submit"
            disabled={!isFormValid()}
            className={`w-full py-2 rounded-lg transition-colors ${
              isFormValid()
                ? "bg-my-blue-2 text-white hover:bg-hmy-blue-2"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            챌린지 시작하기
          </button>
        </form>
      </motion.div>
    </>
  );
}
