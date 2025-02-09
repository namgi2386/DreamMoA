// src/components/challenge/ChallengeCreateForm.jsx
import { useState } from "react";
import { motion } from "framer-motion";

export default function ChallengeCreateForm() {
  // FormData 상태에 날짜 필드 추가
  const [formData, setFormData] = useState({
    title: "",
    maxParticipants: 6,
    description: "",
    image: null,
    imagePreview: null,
    isPublic: false,
    startDate: "",
    expireDate: "",
    standard: 1, // 목표 달성 기준
  });

  // 입력 핸들러
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
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

  // 폼 제출 핸들러
  const handleSubmit = (e) => {
    e.preventDefault();
    // API 호출 로직 추가

    console.log("Form submitted:", formData);
  };
  const exitButton = () => {
    console.log("종료");
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-lg mx-auto bg-white rounded-lg shadow-md p-6"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold cursor-default">
            챌린지 시작하기
          </h2>
          <button
            className="text-gray-500 hover:text-gray-700"
            onClick={exitButton}
          >
            <span className="text-2xl">&times;</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* 공개 여부 토글 */}
          <div className="flex justify-between items-center">
            <span className="text-gray-700 cursor-default">공개 여부</span>
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
            <label className="block text-gray-700 mb-2">챌린지 이름</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="SSAFY 알고리즘 스터디 방"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-my-blue-4"
            />
          </div>

          {/* 참가자 수 선택 */}
          <div>
            <label className="block text-gray-700 mb-2">참가자 수</label>
            <select
              name="maxParticipants"
              value={formData.maxParticipants}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-my-blue-4 cursor-pointer"
            >
              {[2, 3, 4, 5, 6].map((num) => (
                <option key={num} value={num}>
                  {num}
                </option>
              ))}
            </select>
          </div>

          {/* 챌린지 기간 선택 */}
          <div className="space-y-4">
            <label className="block text-gray-700 mb-2">챌린지 기간</label>
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
            <label className="block text-gray-700 mb-2">목표 달성 기준</label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                name="standard"
                value={formData.standard}
                onChange={handleStandardChange}
                min={1}
                max={calculateDuration()}
                className="w-24 px-4 py-2 border rounded-lg focus:outline-none focus:border-my-blue-4"
              />
              <span className="text-gray-600">/ {calculateDuration()}일</span>
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

          {/* 방 설명 입력 */}
          <div>
            <label className="block text-gray-700 mb-2">방 설명</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="SSAFY생을 위한 방입니다. 편하게 참여해 주세요."
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-my-blue-4 h-24 resize-none"
            />
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
            className="w-full bg-my-blue-2 text-white py-2 rounded-lg hover:bg-hmy-blue-2 transition-colors"
          >
            챌린지 시작하기
          </button>
        </form>
      </motion.div>
    </>
  );
}
