import React from 'react';

const Reviews = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="border-b border-gray-200 pb-5">
        <h3 className="text-2xl font-bold leading-6 text-gray-900">리뷰 관리</h3>
        <p className="mt-2 max-w-4xl text-sm text-gray-500">
          고객 리뷰를 관리하고 부적절한 리뷰를 검토할 수 있습니다.
        </p>
      </div>

      {/* Content area */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
        <div className="text-center">
          <div className="mx-auto w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-6">
            <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            리뷰 관리 기능 준비 중
          </h3>
          <p className="text-gray-500 max-w-sm mx-auto">
            리뷰 관리 기능을 준비하고 있습니다.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Reviews;