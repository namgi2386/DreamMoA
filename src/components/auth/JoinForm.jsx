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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

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
        errorMessage = value !== formData.password 
          ? "비밀번호가 일치하지 않습니다" 
          : "";
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
      !errors.nickname;

    setIsFormValid(isValid);
  }, [formData, errors]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isFormValid) return;

    try {
      const { email, password, name, nickname } = formData;
      await authApi.join(email, password, name, nickname, null);
      alert("회원가입이 완료되었습니다")
      navigate("/login");
    } catch (error) {
      setErrors((prev) => ({
        ...prev,
        submit: error.message || "회원가입 처리 중 오류가 발생했습니다.",
      }));
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
        placeholder="8-16자로 입력해주세요"
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
      <AuthInput
        label="닉네임"
        name="nickname"
        type="text"
        value={formData.nickname}
        onChange={handleChange}
        error={errors.nickname}
        placeholder="닉네임을 입력해주세요"
      />

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