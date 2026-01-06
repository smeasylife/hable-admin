import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const memberApi = {
  // 회원 목록 조회 (페이징)
  getMembers: async (page = 0, size = 10) => {
    const response = await api.get('/members', {
      params: {
        page,
        size
      }
    });
    return response.data;
  },

  // 특정 회원 조회 (필요시 추가)
  getMemberById: async (memberId) => {
    const response = await api.get(`/members/${memberId}`);
    return response.data;
  },
};
