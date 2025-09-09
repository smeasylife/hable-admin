import React from 'react';

const Products = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="border-b border-gray-200 pb-5">
        <h3 className="text-2xl font-bold leading-6 text-gray-900">상품 관리</h3>
        <p className="mt-2 max-w-4xl text-sm text-gray-500">
          상품 등록, 수정, 삭제 및 재고 관리를 할 수 있습니다.
        </p>
      </div>

      {/* Content area */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
        <div className="text-center">
          <div className="mx-auto w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mb-6">
            <svg className="w-12 h-12 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            상품 관리 기능 준비 중
          </h3>
          <p className="text-gray-500 max-w-sm mx-auto">
            상품 관리 기능을 준비하고 있습니다.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Products;