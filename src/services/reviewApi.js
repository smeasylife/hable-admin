import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const reviewApi = {
  // 리뷰에 관리자 답변 작성/수정
  updateReviewComment: async (reviewId, comment) => {
    const response = await api.post(`/${reviewId}/comment`, {
      comment: comment
    });
    return response.data;
  },

  // 모든 리뷰 조회 (필요시 추가)
  getAllReviews: async () => {
    const response = await api.get('/reviews');
    return response.data;
  },

  // 특정 리뷰 조회 (필요시 추가)
  getReviewById: async (reviewId) => {
    const response = await api.get(`/reviews/${reviewId}`);
    return response.data;
  },
};
