import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeftIcon, ChevronDownIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import ImageUpload from '../components/ImageUpload';
import * as Form from '@radix-ui/react-form';

// 더미 카테고리 데이터
const dummyCategories = [
  {
    id: 1,
    name: '겨울',
    parentId: null,
    subCategories: [
      {
        id: 11,
        name: '이불',
        parentId: 1,
        subCategories: []
      },
      {
        id: 12,
        name: '배게',
        parentId: 1,
        subCategories: []
      },
      {
        id: 13,
        name: '발매트',
        parentId: 1,
        subCategories: []
      }
    ]
  },
  {
    id: 2,
    name: '봄/가을',
    parentId: null,
    subCategories: [
      {
        id: 21,
        name: '이불',
        parentId: 2,
        subCategories: []
      },
      {
        id: 22,
        name: '배게',
        parentId: 2,
        subCategories: []
      }
    ]
  },
  {
    id: 3,
    name: '여름',
    parentId: null,
    subCategories: [
      {
        id: 31,
        name: '시원한 이불',
        parentId: 3,
        subCategories: []
      },
      {
        id: 32,
        name: '냉감 배게',
        parentId: 3,
        subCategories: []
      }
    ]
  }
];

const AddProduct = () => {
  const navigate = useNavigate();
  const [images, setImages] = useState([]);
  const [categories, setCategories] = useState(dummyCategories);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [expandedCategories, setExpandedCategories] = useState({});
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    shippingFee: '',
    shippingInfo: '',
    originalPrice: '',
  });
  const [options, setOptions] = useState([
    { id: 1, size: '', color: '', customColor: '', price: '', stock: '' }
  ]);

  const sizes = [
    { value: 'single', label: 'Single (싱글)' },
    { value: 'queen', label: 'Queen (퀸)' },
    { value: 'king', label: 'King (킹)' },
    { value: 'super-king', label: 'Super King (수퍼킹)' },
    { value: 'free', label: 'Free (자유)' },
  ];

  const colors = [
    { value: 'white', label: '화이트' },
    { value: 'ivory', label: '아이보리' },
    { value: 'gray', label: '그레이' },
    { value: 'beige', label: '베이지' },
    { value: 'pink', label: '핑크' },
    { value: 'blue', label: '블루' },
    { value: 'navy', label: '네이비' },
    { value: 'green', label: '그린' },
    { value: 'custom', label: '직접 입력' },
  ];

  const toggleCategoryExpand = (categoryId) => {
    setExpandedCategories(prev => ({
      ...prev,
      [categoryId]: !prev[categoryId]
    }));
  };

  const handleCategoryToggle = (categoryId) => {
    setSelectedCategories(prev =>
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const renderCategoryTree = (categoryList, level = 0) => {
    if (!categoryList || categoryList.length === 0) return null;

    return categoryList.map((category) => (
      <div key={category.id} className={`${level > 0 ? 'ml-6' : ''}`}>
        <div className="flex items-center gap-2 py-1.5">
          {category.subCategories && category.subCategories.length > 0 && (
            <button
              type="button"
              onClick={() => toggleCategoryExpand(category.id)}
              className="p-0.5 hover:bg-gray-100 rounded transition-colors"
            >
              {expandedCategories[category.id] ? (
                <ChevronDownIcon className="h-4 w-4 text-gray-500" />
              ) : (
                <ChevronRightIcon className="h-4 w-4 text-gray-500" />
              )}
            </button>
          )}
          <label className="flex items-center gap-2 cursor-pointer flex-1">
            <input
              type="checkbox"
              checked={selectedCategories.includes(category.id)}
              onChange={() => handleCategoryToggle(category.id)}
              className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
            />
            <span className="text-sm text-gray-700">{category.name}</span>
          </label>
        </div>
        {expandedCategories[category.id] && category.subCategories && category.subCategories.length > 0 && (
          <div className="ml-4">
            {renderCategoryTree(category.subCategories, level + 1)}
          </div>
        )}
      </div>
    ));
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleOptionChange = (id, field, value) => {
    setOptions(prev => prev.map(option =>
      option.id === id ? { ...option, [field]: value } : option
    ));
  };

  const handleAddOption = () => {
    const newId = Math.max(...options.map(o => o.id), 0) + 1;
    setOptions(prev => [...prev, { id: newId, size: '', color: '', customColor: '', price: '', stock: '' }]);
  };

  const handleRemoveOption = (id) => {
    if (options.length === 1) {
      alert('최소 하나의 옵션이 필요합니다.');
      return;
    }
    setOptions(prev => prev.filter(option => option.id !== id));
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Product data:', { ...formData, images, options });
    // TODO: API 호출 로직 구현
    alert('상품이 등록되었습니다!');
    navigate('/products');
  };

  const handleCancel = () => {
    navigate('/products');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <button
          onClick={handleCancel}
          className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <ArrowLeftIcon className="h-6 w-6" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">상품 등록</h1>
          <p className="text-sm text-gray-500 mt-1">새로운 상품을 등록합니다.</p>
        </div>
      </div>

      <Form.Root onSubmit={handleSubmit} className="space-y-8">
        {/* Image Upload Section */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">상품 이미지</h2>
          <p className="text-sm text-gray-500 mb-4">
            이미지는 업로드한 순서대로 사용자에게 보여집니다.
          </p>
          <ImageUpload
            images={images}
            onImagesChange={setImages}
            maxImages={10}
          />
        </div>

        {/* Common Information */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 space-y-6">
          <h2 className="text-lg font-semibold text-gray-900">공통 정보</h2>

          {/* Product Name */}
          <Form.Field name="productName">
            <Form.Label className="block text-sm font-medium text-gray-700 mb-2">
              상품명 *
            </Form.Label>
            <Form.Control asChild>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 transition-colors"
                placeholder="상품명을 입력하세요"
                required
              />
            </Form.Control>
            <Form.Message match="valueMissing" className="text-sm text-red-600 mt-1">
              상품명을 입력해주세요.
            </Form.Message>
          </Form.Field>

          {/* Product Description */}
          <Form.Field name="description">
            <Form.Label className="block text-sm font-medium text-gray-700 mb-2">
              상품 설명 *
            </Form.Label>
            <Form.Control asChild>
              <textarea
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 transition-colors"
                placeholder="상품 설명을 입력하세요"
                required
              />
            </Form.Control>
            <Form.Message match="valueMissing" className="text-sm text-red-600 mt-1">
              상품 설명을 입력해주세요.
            </Form.Message>
          </Form.Field>

          {/* Shipping Fee */}
          <Form.Field name="shippingFee">
            <Form.Label className="block text-sm font-medium text-gray-700 mb-2">
              배송비 *
            </Form.Label>
            <div className="relative">
              <Form.Control asChild>
                <input
                  type="number"
                  value={formData.shippingFee}
                  onChange={(e) => handleInputChange('shippingFee', e.target.value)}
                  className="w-full px-3 py-2 pr-8 border border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 transition-colors"
                  placeholder="0"
                  min="0"
                  required
                />
              </Form.Control>
              <span className="absolute right-3 top-2 text-gray-500">원</span>
            </div>
            <Form.Message match="valueMissing" className="text-sm text-red-600 mt-1">
              배송비를 입력해주세요.
            </Form.Message>
          </Form.Field>

          {/* Shipping Info */}
          <Form.Field name="shippingInfo">
            <Form.Label className="block text-sm font-medium text-gray-700 mb-2">
              배송 정보 *
            </Form.Label>
            <Form.Control asChild>
              <textarea
                value={formData.shippingInfo}
                onChange={(e) => handleInputChange('shippingInfo', e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 transition-colors"
                placeholder="배송 정보를 입력하세요 (예: 도서산간 지역 배송비 추가 등)"
                required
              />
            </Form.Control>
            <Form.Message match="valueMissing" className="text-sm text-red-600 mt-1">
              배송 정보를 입력해주세요.
            </Form.Message>
          </Form.Field>

          {/* Original Price */}
          <Form.Field name="originalPrice">
            <Form.Label className="block text-sm font-medium text-gray-700 mb-2">
              기존 가격 *
            </Form.Label>
            <div className="relative">
              <Form.Control asChild>
                <input
                  type="number"
                  value={formData.originalPrice}
                  onChange={(e) => handleInputChange('originalPrice', e.target.value)}
                  className="w-full px-3 py-2 pr-8 border border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 transition-colors"
                  placeholder="0"
                  min="0"
                  required
                />
              </Form.Control>
              <span className="absolute right-3 top-2 text-gray-500">원</span>
            </div>
            <Form.Message match="valueMissing" className="text-sm text-red-600 mt-1">
              기존 가격을 입력해주세요.
            </Form.Message>
          </Form.Field>
        </div>

        {/* Categories Section */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 space-y-6">
          <h2 className="text-lg font-semibold text-gray-900">카테고리</h2>
          <div className="max-h-64 overflow-y-auto border border-gray-200 rounded-lg p-4">
            {categories.length === 0 ? (
              <p className="text-sm text-gray-500 text-center py-4">
                등록된 카테고리가 없습니다.
                <button
                  type="button"
                  onClick={() => navigate('/categories')}
                  className="ml-2 text-primary-600 hover:text-primary-700 font-medium"
                >
                  카테고리 관리 →
                </button>
              </p>
            ) : (
              renderCategoryTree(categories)
            )}
          </div>
          {selectedCategories.length > 0 && (
            <p className="text-sm text-gray-600">
              <span className="font-medium">{selectedCategories.length}</span>개의 카테고리가 선택되었습니다.
            </p>
          )}
        </div>

        {/* Options Section */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">옵션 관리</h2>
            <button
              type="button"
              onClick={handleAddOption}
              className="px-4 py-2 bg-primary-600 text-white text-sm rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors"
            >
              + 옵션 추가
            </button>
          </div>

          <div className="space-y-4">
            {options.map((option, index) => (
              <div key={option.id} className="p-4 border border-gray-200 rounded-lg space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-gray-900">옵션 {index + 1}</h3>
                  {options.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveOption(option.id)}
                      className="text-sm text-red-600 hover:text-red-800 transition-colors"
                    >
                      삭제
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Size */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      사이즈 *
                    </label>
                    <select
                      value={option.size}
                      onChange={(e) => handleOptionChange(option.id, 'size', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 transition-colors"
                      required
                    >
                      <option value="">사이즈를 선택하세요</option>
                      {sizes.map((size) => (
                        <option key={size.value} value={size.value}>
                          {size.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Color */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      컬러 *
                    </label>
                    <select
                      value={option.color}
                      onChange={(e) => handleOptionChange(option.id, 'color', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 transition-colors"
                      required
                    >
                      <option value="">컬러를 선택하세요</option>
                      {colors.map((color) => (
                        <option key={color.value} value={color.value}>
                          {color.label}
                        </option>
                      ))}
                    </select>
                    {option.color === 'custom' && (
                      <input
                        type="text"
                        value={option.customColor}
                        onChange={(e) => handleOptionChange(option.id, 'customColor', e.target.value)}
                        className="mt-2 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 transition-colors"
                        placeholder="컬러를 직접 입력하세요"
                        required={option.color === 'custom'}
                      />
                    )}
                  </div>

                  {/* Price */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      가격 *
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        value={option.price}
                        onChange={(e) => handleOptionChange(option.id, 'price', e.target.value)}
                        className="w-full px-3 py-2 pr-8 border border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 transition-colors"
                        placeholder="0"
                        min="0"
                        required
                      />
                      <span className="absolute right-3 top-2 text-gray-500">원</span>
                    </div>
                  </div>

                  {/* Stock */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      재고 *
                    </label>
                    <input
                      type="number"
                      value={option.stock}
                      onChange={(e) => handleOptionChange(option.id, 'stock', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 transition-colors"
                      placeholder="0"
                      min="0"
                      required
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-4 pt-6">
          <button
            type="button"
            onClick={handleCancel}
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors"
          >
            취소
          </button>
          <Form.Submit asChild>
            <button
              type="submit"
              className="px-6 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors"
            >
              상품 등록
            </button>
          </Form.Submit>
        </div>
      </Form.Root>
    </div>
  );
};

export default AddProduct;