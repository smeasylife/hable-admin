import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const categoryApi = {
  // 모든 카테고리 조회 (계층 구조)
  getAllCategories: async () => {
    const response = await api.get('/categories');
    return response.data;
  },

  // 특정 카테고리 조회
  getCategoryById: async (id) => {
    const response = await api.get(`/categories/${id}`);
    return response.data;
  },

  // 카테고리 생성
  createCategory: async (data) => {
    const response = await api.post('/categories', data);
    return response.data;
  },

  // 카테고리 수정
  updateCategory: async (id, data) => {
    const response = await api.put(`/categories/${id}`, data);
    return response.data;
  },

  // 카테고리 삭제
  deleteCategory: async (id) => {
    const response = await api.delete(`/categories/${id}`);
    return response.data;
  },
};
