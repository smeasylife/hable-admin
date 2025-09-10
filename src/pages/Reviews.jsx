import React, { useState } from 'react';
import { mockReviews } from '../data/mockReviews';
import { mockProducts } from '../data/mockProducts';
import { StarIcon, ChevronLeftIcon, ChevronRightIcon, PencilIcon, ChatBubbleLeftRightIcon } from '@heroicons/react/24/outline';
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid';

const Reviews = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [expandedReview, setExpandedReview] = useState(null);
  const [replyContent, setReplyContent] = useState('');
  
  const itemsPerPage = 8;
  const totalPages = Math.ceil(mockReviews.length / itemsPerPage);
  
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentReviews = mockReviews.slice(startIndex, endIndex);

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

  const handleReplyToggle = (reviewId) => {
    if (expandedReview === reviewId) {
      setExpandedReview(null);
      setReplyContent('');
    } else {
      const review = mockReviews.find(r => r.id === reviewId);
      setExpandedReview(reviewId);
      setReplyContent(review.adminReply ? review.adminReply.content : '');
    }
  };

  const handleReplySubmit = async (reviewId) => {
    if (!replyContent.trim()) return;
    
    try {
      // TODO: 실제 API 호출로 교체
      const response = await fetch('/api/reviews/reply', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          reviewId,
          content: replyContent
        })
      });
      
      if (response.ok) {
        console.log('Reply saved successfully');
        // TODO: 상태 업데이트 로직 추가
        setExpandedReview(null);
        setReplyContent('');
      }
    } catch (error) {
      console.error('Failed to save reply:', error);
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

  const renderStars = (rating) => {
    return (
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <StarIcon
            key={star}
            className={`h-4 w-4 ${star <= rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="border-b border-gray-200 pb-5">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-2xl font-bold leading-6 text-gray-900">리뷰 관리</h3>
            <p className="mt-2 max-w-4xl text-sm text-gray-500">
              고객 리뷰를 확인하고 답변을 작성할 수 있습니다.
            </p>
          </div>
        </div>
      </div>

      {/* Reviews List */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="divide-y divide-gray-200">
          {currentReviews.map((review) => (
            <div key={review.id} className="p-6">
              {/* Review Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start space-x-4">
                  <div className="w-16 h-16 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                    <img
                      src={getProductImage(review.productId)}
                      alt={getProductName(review.productId)}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/300x300?text=No+Image';
                      }}
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h4 className="text-lg font-medium text-gray-900">{getProductName(review.productId)}</h4>
                      <span className="text-sm text-gray-500">#{review.productId}</span>
                    </div>
                    <div className="flex items-center space-x-3 mb-2">
                      <span className="text-sm font-medium text-gray-700">{review.customerName}</span>
                      {renderStars(review.rating)}
                      <span className="text-sm text-gray-500">{formatDate(review.createdAt)}</span>
                    </div>
                    <p className="text-gray-600 leading-relaxed">{review.content}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleReplyToggle(review.id)}
                    className={`inline-flex items-center px-3 py-2 border shadow-sm text-sm font-medium rounded-md transition-colors ${
                      review.adminReply
                        ? 'border-blue-300 text-blue-700 bg-blue-50 hover:bg-blue-100'
                        : 'border-gray-300 text-gray-700 bg-white hover:bg-gray-50'
                    } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500`}
                  >
                    {review.adminReply ? (
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

              {/* Admin Reply Display */}
              {review.adminReply && (
                <div className="ml-20 p-4 bg-blue-50 border border-blue-200 rounded-lg mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-blue-700">관리자 답변</span>
                    <span className="text-sm text-blue-600">{formatDate(review.adminReply.createdAt)}</span>
                  </div>
                  <p className="text-blue-700">{review.adminReply.content}</p>
                </div>
              )}

              {/* Reply Form */}
              {expandedReview === review.id && (
                <div className="ml-20 mt-4 p-4 bg-gray-50 border border-gray-200 rounded-lg">
                  <textarea
                    value={replyContent}
                    onChange={(e) => setReplyContent(e.target.value)}
                    placeholder="고객에게 전달할 답변을 작성해주세요..."
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500 min-h-[100px] resize-none"
                  />
                  <div className="flex items-center justify-end space-x-3 mt-3">
                    <button
                      onClick={() => handleReplyToggle(review.id)}
                      className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                    >
                      취소
                    </button>
                    <button
                      onClick={() => handleReplySubmit(review.id)}
                      disabled={!replyContent.trim()}
                      className="px-4 py-2 text-sm font-medium text-white bg-primary-600 border border-transparent rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {review.adminReply ? '수정하기' : '답변하기'}
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
              총 <span className="font-medium">{mockReviews.length}</span>개 중{' '}
              <span className="font-medium">{startIndex + 1}</span>-
              <span className="font-medium">{Math.min(endIndex, mockReviews.length)}</span>개 표시
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

export default Reviews;