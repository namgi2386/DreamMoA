import api from './axios';

const COMMUNITY_URL = '/boards';

const communityApi = {
  // 글 목록 조회
  getList: () => api.get(COMMUNITY_URL)
  .then(response => {
    console.log('응답 데이터:', response.data);
    return response;
  })
  .catch(error => {
    console.error('에러 발생:', error);
    throw error;
  }),
  
  // 글 상세 조회 
  getDetail: (id) => api.get(`${COMMUNITY_URL}/${id}`)
  .then(response => {
    console.log(id);
    
    console.log('응답 데이터:', response.data);
    return response;
  })
  .catch(error => {
    console.log(id);
    
    console.error('에러 발생:', error);
    throw error;
  }),
  
  // 글 작성
  create: (data) => api.post(COMMUNITY_URL, data, {
    withCredentials: true,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`
    }
  }),
  
  // 글 수정 
  update: (id, data) => api.put(`${COMMUNITY_URL}/${id}`, data)
  .then(response => {
    console.log('응답 데이터:', response.data);
    return response;
  })
  .catch(error => {
    console.log(id);
    console.log(data);
    
    console.error('에러 발생:', error);
    throw error;
  }),
  
  // 글 삭제
  delete: (id) => api.delete(`${COMMUNITY_URL}/${id}`)
  .then(response => {
    console.log('응답 데이터:', response.data);
    return response;
  })
  .catch(error => {
    console.log(id);
    console.error('에러 발생:', error);
    throw error;
  }),

  // 댓글 작성
  createComment: (postId, data) => 
    api.post(`${COMMUNITY_URL}/${postId}/comments`, data),
    
  // 댓글 삭제
  deleteComment: (postId, commentId) => 
    api.delete(`${COMMUNITY_URL}/${postId}/comments/${commentId}`),

  /** 
   * 댓글 계층형 조회 
   * GET /api/post/{postId}/hierarchy
   */
  getCommentsHierarchy: (postId) =>
    api.get(`/api/post/${postId}/hierarchy`),

  /** 
   * 댓글(평면) 목록 조회
   * GET /api/post/{postId}/comments
   * (필요하다면 사용)
   */
  getComments: (postId) =>
    api.get(`/api/post/${postId}/comments`),

  /** 
   * 댓글 작성
   * POST /api/post/{postId}/comments
   * data 예시: { content: "댓글 내용", parentCommentId: 3 }
   */
  createComment: (postId, data) =>
    api.post(`/api/post/${postId}/comments`, data),

  /**
   * 댓글 수정
   * PUT /api/post/{postId}/{commentId}
   * data 예시: { content: "수정할 내용" }
   */
  updateComment: (postId, commentId, data) =>
    api.put(`/api/post/${postId}/${commentId}`, data),

  /**
   * 댓글 삭제
   * DELETE /api/post/{postId}/{commentId}
   */
  deleteComment: (postId, commentId) =>
    api.delete(`/api/post/${postId}/${commentId}`),

};

export default communityApi;