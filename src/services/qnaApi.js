import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const qnaApi = {
  // Q&A에 관리자 답변 작성/수정
  saveAnswer: async (questionId, answer) => {
    const response = await api.post(`/answer/${questionId}`, null, {
      params: {
        answer: answer
      }
    });
    return response.data;
  },

  // 모든 문의 조회 (필요시 추가)
  getAllQuestions: async () => {
    const response = await api.get('/questions');
    return response.data;
  },

  // 특정 문의 조회 (필요시 추가)
  getQuestionById: async (questionId) => {
    const response = await api.get(`/questions/${questionId}`);
    return response.data;
  },
};
