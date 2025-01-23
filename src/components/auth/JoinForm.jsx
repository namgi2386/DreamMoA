// components/auth/JoinForm.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authApi } from "../../services/api/authApi";
import { validateEmail, validatePassword } from "../../utils/validation";
import AuthInput from "./AuthInput.jsx";

const JoinForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    nickname: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // 실시간 에러 초기화
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!validateEmail(formData.email)) {
      newErrors.email = "유효한 이메일 주소를 입력해주세요";
    }
    if (!validatePassword(formData.password)) {
      newErrors.password = "비밀번호는 8자 이상이어야 합니다";
    }
    if (!formData.name.trim()) {
      newErrors.name = "이름을 입력해주세요";
    }
    if (!formData.nickname.trim()) {
      newErrors.nickname = "닉네임을 입력해주세요";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      const { email, password, name, nickname } = formData;
      await authApi.join(email, password, name, nickname);
      // navigate("/login");
    } catch (error) {
      setErrors((prev) => ({
        ...prev,
        submit: error.message,
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
        placeholder="8자 이상 입력해주세요"
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
        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        회원가입
      </button>
    </form>
  );
};

export default JoinForm;