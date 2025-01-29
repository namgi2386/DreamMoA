import api from './axios';

const getUserApi = {
  // 회원정보 조회
  getUserInfo: () => api.post('/userInfo')
  .then(response => {
    console.log('회원정보조회');
    
    console.log('응답 데이터:', response.data);
    return response;
  })
  .catch(error => {
    console.error('에러 발생:', error);
    throw error;
  }),

  uploadProfileImage: (file, userInfo) => {
    
    const formData = new FormData();
    
    const profileData = {
      name: userInfo.name,
      nickname: userInfo.nickname,
      password: 'skarl0240!'
    };
    
    formData.append('profileData', JSON.stringify(profileData));
    formData.append('profilePicture', '');  // 직접 file 객체 사용

    console.log('Request URL:', '/update-profile');
    console.log('Profile Data:', profileData);
    console.log('FormData contents:');
    for (let pair of formData.entries()) {
      console.log(pair[0] + ':', pair[1]);
    }

    return api.put('/update-profile', formData
    , {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }
  )
      .then(response => {
        console.log('이미지 변경 성공:', response.data);
        return response;
      })
      .catch(error => {
        console.error('이미지 변경 실패:', error);
        throw error;
      });
  },
};

export default getUserApi;