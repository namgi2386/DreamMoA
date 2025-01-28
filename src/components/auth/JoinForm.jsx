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
    verificationCode: "",
    password: "",
    confirmpassword: "",
    name: "",
    nickname: "",
  });
  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [isEmailButtonDisabled, setIsEmailButtonDisabled] = useState(false);
  const [isNicknameVerified, setIsNicknameVerified] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // 이메일이 인증되었다면 수정 불가
    if (name === "email" && isEmailVerified) {
      return;
    }

    // 닉네임이 변경되면 인증 상태 초기화
    if (name === "nickname") {
      setIsNicknameVerified(false);
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

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

        if (formData.confirmpassword && value !== formData.confirmpassword) {
          setErrors((prev) => ({
            ...prev,
            confirmpassword: "비밀번호가 일치하지 않습니다",
          }));
        } else {
          setErrors((prev) => ({
            ...prev,
            confirmpassword: "",
          }));
        }
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

  // 이메일 인증번호 받기
  const handleGetVerification = async () => {
    try {
      // 이메일 중복 확인
      const isAvailable = await authApi.checkEmail(formData.email);

      if (!isAvailable) {
        Swal.fire({
          icon: "error",
          text: "이미 사용 중인 이메일입니다.",
        });
        return;
      }

      // 인증번호 발송
      await authApi.sendVerificationCode(formData.email);

      Swal.fire({
        icon: "success",
        text: "인증메일을 발송했습니다.",
      });

      setIsCodeSent(true);
      setIsEmailButtonDisabled(true); // 인증번호 받기 버튼 비활성화
    } catch (error) {
      Swal.fire({
        icon: "error",
        text: "인증메일 발송 중 오류가 발생했습니다.",
      });
    }
  };

  // 인증번호 확인
  const handleVerifyCode = async () => {
    try {
      await authApi.verifyEmailCode(formData.email, formData.verificationCode);

      Swal.fire({
        icon: "success",
        text: "인증번호가 일치합니다.",
      });

      setIsEmailVerified(true);
    } catch (error) {
      Swal.fire({
        icon: "error",
        text: "인증번호가 일치하지 않습니다.",
      });
    }
  };

  // 닉네임 중복 확인
  const handleCheckNickname = async () => {
    try {
      const isAvailable = await authApi.checkNickname(formData.nickname);

      if (isAvailable) {
        Swal.fire({
          icon: "success",
          text: "사용 가능한 닉네임입니다.",
        });
        setIsNicknameVerified(true);
      } else {
        Swal.fire({
          icon: "error",
          text: "이미 사용 중인 닉네임입니다.",
        });
        setIsNicknameVerified(false);
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        text: error.message,
      });
    }
  };

  useEffect(() => {
    const isValid =
      formData.email.trim() !== "" &&
      formData.password.trim() !== "" &&
      formData.confirmpassword.trim() !== "" &&
      formData.name.trim() !== "" &&
      formData.nickname.trim() !== "" &&
      isEmailVerified &&
      isNicknameVerified &&
      !errors.email &&
      !errors.password &&
      !errors.confirmpassword &&
      !errors.name &&
      !errors.nickname;

    setIsFormValid(isValid);
  }, [formData, errors, isEmailVerified, isNicknameVerified]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isFormValid) return;

    try {
      const { email, password, name, nickname } = formData;
      await authApi.join(email, password, name, nickname, isEmailVerified);

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
      <div className="space-y-2">
        <div className="flex items-center space-x-2">
          <div className="flex-1">
            <AuthInput
              label="이메일"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
              placeholder="example@email.com"
              disabled={isEmailVerified}
              className={isEmailVerified ? "bg-gray-200 text-my-blue cursor-not-allowed" : ""}
            />
          </div>
          <button
            type="button"
            onClick={handleGetVerification}
            disabled={!validateEmail(formData.email) || isEmailButtonDisabled}
            className={`h-10 px-4 rounded focus:outline-none mt-3 ${
              validateEmail(formData.email) && !isEmailButtonDisabled
                ? "bg-my-blue-1 hover:bg-hmy-blue-1 text-white"
                : "bg-gray-300 text-gray-50 cursor-not-allowed"
            }`}
          >
            인증번호 받기
          </button>
        </div>

        {isCodeSent && (
          <div className="flex items-center space-x-2">
            <div className="flex-1">
              <AuthInput
                name="verificationCode"
                type="text"
                value={formData.verificationCode}
                onChange={handleChange}
                placeholder="인증번호 6자리를 입력해주세요"
                disabled={isEmailVerified}
                className={isEmailVerified ? "bg-gray-200 text-my-blue cursor-not-allowed" : ""}
              />
            </div>
            <button
              type="button"
              onClick={handleVerifyCode}
              disabled={!formData.verificationCode || isEmailVerified}
              className={`h-10 px-4 rounded focus:outline-none mb-2 ${
                formData.verificationCode && !isEmailVerified
                  ? "bg-my-blue-1 hover:bg-hmy-blue-1 text-white"
                  : "bg-gray-300 text-gray-50 cursor-not-allowed"
              }`}
            >
              인증번호 확인
            </button>
          </div>
        )}
      </div>

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
            disabled={isNicknameVerified}
            className={isNicknameVerified ? "bg-gray-200 text-gray-50 cursor-not-allowed" : ""}
          />
        </div>
        <button
          type="button"
          onClick={handleCheckNickname}
          disabled={!formData.nickname || isNicknameVerified}
          className={`h-10 w-32 px-4 rounded focus:outline-none mt-3 ${
            formData.nickname && !isNicknameVerified
              ? "bg-my-blue-1 hover:bg-hmy-blue-1 text-white"
              : "bg-gray-300 text-gray-50 cursor-not-allowed"
          }`}
        >
          중복 확인
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
            ? "bg-my-blue-1 hover:bg-hmy-blue-1 text-white"
            : "bg-gray-300 text-gray-50 cursor-not-allowed"
        }`}
      >
        회원가입
      </button>
    </form>
  );
};

export default JoinForm;