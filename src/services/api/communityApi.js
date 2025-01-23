import api from './axios';

const COMMUNITY_URL = '/boards';

const communityApi = {
  // 글 목록 조회
  getList: () => api.get(COMMUNITY_URL),
  
  // 글 상세 조회 
  getDetail: (id) => api.get(`${COMMUNITY_URL}/${id}`),
  
  // 글 작성
  create: (data) => api.post(COMMUNITY_URL, data),
  
  // 글 수정 
  update: (id, data) => api.put(`${COMMUNITY_URL}/${id}`, data),
  
  // 글 삭제
  delete: (id) => api.delete(`${COMMUNITY_URL}/${id}`),

  // 댓글 작성
  createComment: (postId, data) => 
    api.post(`${COMMUNITY_URL}/${postId}/comments`, data),
    
  // 댓글 삭제
  deleteComment: (postId, commentId) => 
    api.delete(`${COMMUNITY_URL}/${postId}/comments/${commentId}`)
};

export default communityApi;