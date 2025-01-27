import api from "./axios";

export const authApi = {
  // 로그인
  login: async (credentials) => {
    // console.log("login inner 01");

    try {
      // console.log("로그인 test1");
      console.log(credentials); // {email: 'namgi@ssafy.com', password: '1234'} 잘들어있음

      const response = await api.post("/login", credentials);
      console.log("로그인 test2");
      console.log(response);

      if (response.data && response.data.accessToken) {
        console.log(" acc");

        localStorage.setItem("accessToken", response.data.accessToken);
        return response.data;
      }
      throw new Error("Invalid response format");
    } catch (error) {
      console.error("Login error:", error.response || error);
      throw error;
    }
  },

  // 로그아웃
  logout: async () => {
    try {
      await api.post("/logout");
      localStorage.removeItem("accessToken");
    } catch (error) {
      console.error("Logout failed:", error);
      localStorage.removeItem("accessToken"); // 에러가 나도 로컬 스토리지는 클리어
      throw error;
    }
  },

  // 회원가입
  join: async (email, password, name, nickname, profilePicture = null) => {
    try {
      const formData = new FormData();
      formData.append("email", email);
      formData.append("password", password);
      formData.append("name", name);
      formData.append("nickname", nickname);

      if (profilePicture) {
        formData.append("profilePicture", profilePicture);
      } else {
        formData.append("profilePicture", new Blob([]));
      }

      const response = await api.post("/join", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      return response.data;
    } catch (error) {
      console.error("Join error:", {
        message: error.message,
        response: error.response,
        data: error.response?.data,
      });
      throw new Error(
        error.response?.data?.message || "회원가입 처리 중 오류가 발생했습니다."
      );
    }
  },

  // 이메일 중복 확인
  checkEmail: async (email) => {
    try {
      const response = await api.post("/check-email", { email });
      return response.data; // true 또는 false 반환
    } catch (error) {
      console.error("Email check error:", error);
      throw new Error(
        error.response?.data?.message ||
          "이메일 중복 확인 중 오류가 발생했습니다."
      );
    }
  },

  // 이메일 인증번호 발송
  sendVerificationCode: async (email) => {
    try {
      const response = await api.post("/send-verification-code", { email });
      if (response.data.message !== "인증 코드가 이메일로 전송되었습니다.") {
        throw new Error("인증메일 발송에 실패했습니다.");
      }
      return response.data;
    } catch (error) {
      console.error("Verification code send error:", error);
      throw new Error(
        error.response?.data?.message || "인증메일 발송 중 오류가 발생했습니다."
      );
    }
  },

  // 이메일 인증번호 확인
  verifyEmailCode: async (email, code) => {
    try {
      const response = await api.post("/verify-email-code", {
        email,
        code,
      });
      if (response.data.message !== "인증 코드가 일치합니다.") {
        throw new Error("인증 코드가 일치하지 않습니다.");
      }
      return response.data;
    } catch (error) {
      console.error("Verification code check error:", error);
      throw new Error(
        error.response?.data?.message || "인증코드 확인 중 오류가 발생했습니다."
      );
    }
  },

  // 닉네임 중복 확인 추가
  checkNickname: async (nickname) => {
    try {
      const response = await api.post("/check-nickname", { nickname });
      return response.data.available; // true/false 반환
    } catch (error) {
      console.error("Nickname check error:", error);
      throw new Error(
        error.response?.data?.message ||
          "닉네임 중복 확인 중 오류가 발생했습니다."
      );
    }
  },
};

export const socialLogin = (provider) => {
  window.location.href = `http://localhost:8080/oauth2/authorization/${provider}`;
};
