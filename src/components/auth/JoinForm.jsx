import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { authApi } from "../../services/api/authApi";
import {
  validateEmail,
  validatePassword,
  validateName,
  validateNickname,
} from "../../utils/validation";
import AuthInput from "./AuthInput.jsx";
import Swal from "sweetalert2";

const JoinForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmpassword: "",
    name: "",
    nickname: "",
  });
  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);
  const [isNicknameValid, setIsNicknameValid] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    //닉네임 변경 시 중복 확인 초기화
    if (name === "nickname") {
      setIsNicknameValid(false);
    }

    // 입력값 변경에 따른 실시간 유효성 검사
    validateField(name, value);
  };

  const validateField = (name, value) => {
    let errorMessage = "";
    switch (name) {
      case "email":
        errorMessage = !validateEmail(value)
          ? "유효한 이메일 주소를 입력해주세요"
          : "";
        break;
      case "password":
        errorMessage = validatePassword(value, formData.email);
        break;
      case "confirmpassword":
        errorMessage =
          value !== formData.password ? "비밀번호가 일치하지 않습니다" : "";
        break;
      case "name":
        errorMessage = validateName(value);
        break;
      case "nickname":
        errorMessage = validateNickname(value);
        break;
    }

    setErrors((prev) => ({
      ...prev,
      [name]: errorMessage,
    }));
  };

  const handleCheckNickname = async () => {
    // 닉네임 중복 확인 API 호출 부분
    try {
      const isAvailable = await authApi.checkNickname(formData.nickname);
      if (isAvailable) {
        Swal.fire({
          icon: "success",
          text: "사용 가능한 닉네임입니다.",
        });
        setIsNicknameValid(true);
      } else {
        Swal.fire({
          icon: "error",
          text: "이미 사용 중인 닉네임입니다.",
        });
        setIsNicknameValid(false);
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        text: "닉네임 중복 확인 중 오류가 발생했습니다.",
      });
    }
  };

  useEffect(() => {
    // 모든 필드 유효성 검사
    const isValid =
      formData.email.trim() !== "" &&
      formData.password.trim() !== "" &&
      formData.confirmpassword.trim() !== "" &&
      formData.name.trim() !== "" &&
      formData.nickname.trim() !== "" &&
      !errors.email &&
      !errors.password &&
      !errors.confirmpassword &&
      !errors.name &&
      !errors.nickname &&
      isNicknameValid;

    setIsFormValid(isValid);
  }, [formData, errors, isNicknameValid]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isFormValid) return;

    try {
      const { email, password, name, nickname } = formData;
      await authApi.join(email, password, name, nickname, null);

      await Swal.fire({
        icon: "success",
        title: "회원가입 완료",
        text: "회원가입이 정상적으로 완료되었습니다.",
        confirmButtonText: "로그인 페이지로 이동",
      });
      navigate("/login");
    } catch (error) {
      setErrors((prev) => ({
        ...prev,
        submit: error.message || "회원가입 처리 중 오류가 발생했습니다.",
      }));

      Swal.fire({
        icon: "error",
        title: "오류",
        text: error.message || "회원가입 처리 중 오류가 발생했습니다.",
        confirmButtonText: "확인",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <AuthInput
        label="이메일"
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        error={errors.email}
        placeholder="example@email.com"
      />
      <AuthInput
        label="비밀번호"
        name="password"
        type="password"
        value={formData.password}
        onChange={handleChange}
        error={errors.password}
        placeholder="8~16자로 입력해주세요"
      />
      <AuthInput
        label="비밀번호 확인"
        name="confirmpassword"
        type="password"
        value={formData.confirmpassword}
        onChange={handleChange}
        error={errors.confirmpassword}
        placeholder="비밀번호를 다시 입력해주세요"
      />
      <AuthInput
        label="이름"
        name="name"
        type="text"
        value={formData.name}
        onChange={handleChange}
        error={errors.name}
        placeholder="이름을 입력해주세요"
      />
      <div className="flex items-center space-x-2">
        <div className="flex-1">
          <AuthInput
            label="닉네임"
            name="nickname"
            type="text"
            value={formData.nickname}
            onChange={handleChange}
            error={errors.nickname}
            placeholder="닉네임을 입력해주세요"
          />
        </div>
        <button
          type="button"
          onClick={handleCheckNickname}
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded focus:outline-none"
        >
          닉네임 중복 확인
        </button>
      </div>

      {errors.submit && (
        <div className="text-red-500 text-sm text-center">{errors.submit}</div>
      )}

      <button
        type="submit"
        disabled={!isFormValid}
        className={`w-full font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
          isFormValid
            ? "bg-indigo-600 hover:bg-indigo-700 text-white"
            : "bg-gray-400 text-gray-200 cursor-not-allowed"
        }`}
      >
        회원가입
      </button>
    </form>
  );
};

export default JoinForm;
