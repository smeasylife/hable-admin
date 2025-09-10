import React from 'react';
import { useNavigate } from 'react-router-dom';
import ProductList from '../components/ProductList';
import { mockProducts } from '../data/mockProducts';
import { PlusIcon } from '@heroicons/react/24/outline';

const Products = () => {
  const navigate = useNavigate();
  
  const handleAddProduct = () => {
    navigate('/products/add');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="border-b border-gray-200 pb-5">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-2xl font-bold leading-6 text-gray-900">상품 관리</h3>
            <p className="mt-2 max-w-4xl text-sm text-gray-500">
              상품 등록, 수정, 삭제 및 재고 관리를 할 수 있습니다.
            </p>
          </div>
          <button
            onClick={handleAddProduct}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors"
          >
            <PlusIcon className="h-4 w-4 mr-2" />
            상품 추가
          </button>
        </div>
      </div>

      {/* Product List */}
      <ProductList products={mockProducts} />
    </div>
  );
};

export default Products;