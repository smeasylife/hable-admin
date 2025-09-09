import React from 'react';

const QnA = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="border-b border-gray-200 pb-5">
        <h3 className="text-2xl font-bold leading-6 text-gray-900">Q&A 관리</h3>
        <p className="mt-2 max-w-4xl text-sm text-gray-500">
          고객 문의사항을 확인하고 답변을 관리할 수 있습니다.
        </p>
      </div>

      {/* Content area */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
        <div className="text-center">
          <div className="mx-auto w-24 h-24 bg-purple-100 rounded-full flex items-center justify-center mb-6">
            <svg className="w-12 h-12 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Q&A 관리 기능 준비 중
          </h3>
          <p className="text-gray-500 max-w-sm mx-auto">
            Q&A 관리 기능을 준비하고 있습니다.
          </p>
        </div>
      </div>
    </div>
  );
};

export default QnA;