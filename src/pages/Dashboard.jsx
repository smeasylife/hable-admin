import React from 'react';

const Dashboard = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="border-b border-gray-200 pb-5">
        <h3 className="text-2xl font-bold leading-6 text-gray-900">대시보드</h3>
        <p className="mt-2 max-w-4xl text-sm text-gray-500">
          Hable 관리자 대시보드에 오신 것을 환영합니다.
        </p>
      </div>

      {/* Content area */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
        <div className="text-center">
          <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
            <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            대시보드 준비 중
          </h3>
          <p className="text-gray-500 max-w-sm mx-auto">
            현재 대시보드 컨텐츠를 준비하고 있습니다. 좌측 메뉴를 통해 다른 관리 기능들을 이용하실 수 있습니다.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;