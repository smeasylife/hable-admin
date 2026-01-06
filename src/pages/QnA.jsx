import React, { useState } from 'react';
import { mockQnA } from '../data/mockQnA';
import { mockProducts } from '../data/mockProducts';
import { ChevronLeftIcon, ChevronRightIcon, PencilIcon, ChatBubbleLeftRightIcon } from '@heroicons/react/24/outline';
import { qnaApi } from '../services/qnaApi';

const QnA = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [expandedQuestion, setExpandedQuestion] = useState(null);
  const [answerContent, setAnswerContent] = useState('');
  
  const itemsPerPage = 8;
  const totalPages = Math.ceil(mockQnA.length / itemsPerPage);
  
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentQuestions = mockQnA.slice(startIndex, endIndex);

  const getProductName = (productId) => {
    const product = mockProducts.find(p => p.id === productId);
    return product ? product.name : '알 수 없는 상품';
  };

  const getProductImage = (productId) => {
    const product = mockProducts.find(p => p.id === productId);
    return product ? product.image : 'https://via.placeholder.com/300x300?text=No+Image';
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleAnswerToggle = (questionId) => {
    if (expandedQuestion === questionId) {
      setExpandedQuestion(null);
      setAnswerContent('');
    } else {
      const question = mockQnA.find(q => q.id === questionId);
      setExpandedQuestion(questionId);
      setAnswerContent(question.adminAnswer ? question.adminAnswer.content : '');
    }
  };

  const handleAnswerSubmit = async (questionId) => {
    if (!answerContent.trim()) return;

    try {
      await qnaApi.saveAnswer(questionId, answerContent);
      alert('답변이 저장되었습니다.');
      setExpandedQuestion(null);
      setAnswerContent('');
      // TODO: Q&A 데이터를 다시 가져오거나 상태를 업데이트하는 로직 추가
    } catch (error) {
      console.error('Failed to save answer:', error);
      alert('답변 저장에 실패했습니다. 다시 시도해주세요.');
    }
  };

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 5; i++) {
          pages.push(i);
        }
      } else if (currentPage >= totalPages - 2) {
        for (let i = totalPages - 4; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        for (let i = currentPage - 2; i <= currentPage + 2; i++) {
          pages.push(i);
        }
      }
    }
    
    return pages;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="border-b border-gray-200 pb-5">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-2xl font-bold leading-6 text-gray-900">Q&A 관리</h3>
            <p className="mt-2 max-w-4xl text-sm text-gray-500">
              고객 문의사항을 확인하고 답변을 작성할 수 있습니다.
            </p>
          </div>
        </div>
      </div>

      {/* Q&A List */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="divide-y divide-gray-200">
          {currentQuestions.map((qna) => (
            <div key={qna.id} className="p-6">
              {/* Question Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start space-x-4">
                  <div className="w-16 h-16 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                    <img
                      src={getProductImage(qna.productId)}
                      alt={getProductName(qna.productId)}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/300x300?text=No+Image';
                      }}
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h4 className="text-lg font-medium text-gray-900">{getProductName(qna.productId)}</h4>
                      <span className="text-sm text-gray-500">#{qna.productId}</span>
                    </div>
                    <div className="flex items-center space-x-3 mb-2">
                      <span className="text-sm font-medium text-gray-700">{qna.customerName}</span>
                      <span className="text-sm text-gray-500">{formatDate(qna.createdAt)}</span>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <div className="flex items-start space-x-2">
                        <span className="text-sm font-medium text-purple-600 mt-0.5">Q.</span>
                        <p className="text-gray-700 leading-relaxed">{qna.question}</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleAnswerToggle(qna.id)}
                    className={`inline-flex items-center px-3 py-2 border shadow-sm text-sm font-medium rounded-md transition-colors ${
                      qna.adminAnswer
                        ? 'border-purple-300 text-purple-700 bg-purple-50 hover:bg-purple-100'
                        : 'border-gray-300 text-gray-700 bg-white hover:bg-gray-50'
                    } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500`}
                  >
                    {qna.adminAnswer ? (
                      <>
                        <PencilIcon className="h-4 w-4 mr-1" />
                        수정하기
                      </>
                    ) : (
                      <>
                        <ChatBubbleLeftRightIcon className="h-4 w-4 mr-1" />
                        답변하기
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Admin Answer Display */}
              {qna.adminAnswer && (
                <div className="ml-20 p-4 bg-purple-50 border border-purple-200 rounded-lg mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-purple-700">관리자 답변</span>
                    <span className="text-sm text-purple-600">{formatDate(qna.adminAnswer.createdAt)}</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <span className="text-sm font-medium text-purple-600 mt-0.5">A.</span>
                    <p className="text-purple-700">{qna.adminAnswer.content}</p>
                  </div>
                </div>
              )}

              {/* Answer Form */}
              {expandedQuestion === qna.id && (
                <div className="ml-20 mt-4 p-4 bg-gray-50 border border-gray-200 rounded-lg">
                  <textarea
                    value={answerContent}
                    onChange={(e) => setAnswerContent(e.target.value)}
                    placeholder="고객에게 전달할 답변을 작성해주세요..."
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500 min-h-[100px] resize-none"
                  />
                  <div className="flex items-center justify-end space-x-3 mt-3">
                    <button
                      onClick={() => handleAnswerToggle(qna.id)}
                      className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                    >
                      취소
                    </button>
                    <button
                      onClick={() => handleAnswerSubmit(qna.id)}
                      disabled={!answerContent.trim()}
                      className="px-4 py-2 text-sm font-medium text-white bg-primary-600 border border-transparent rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {qna.adminAnswer ? '수정하기' : '답변하기'}
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
        <div className="flex flex-1 justify-between sm:hidden">
          <button
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            이전
          </button>
          <button
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            다음
          </button>
        </div>
        
        <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-gray-700">
              총 <span className="font-medium">{mockQnA.length}</span>개 중{' '}
              <span className="font-medium">{startIndex + 1}</span>-
              <span className="font-medium">{Math.min(endIndex, mockQnA.length)}</span>개 표시
            </p>
          </div>
          
          <div>
            <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm">
              <button
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeftIcon className="h-5 w-5" />
              </button>
              
              {getPageNumbers().map((page) => (
                <button
                  key={page}
                  onClick={() => goToPage(page)}
                  className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ring-1 ring-inset ring-gray-300 focus:z-10 focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                    currentPage === page
                      ? 'z-10 bg-primary-600 text-white'
                      : 'text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  {page}
                </button>
              ))}
              
              <button
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronRightIcon className="h-5 w-5" />
              </button>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QnA;