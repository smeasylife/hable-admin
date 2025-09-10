import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import ImageUpload from '../components/ImageUpload';
import * as Form from '@radix-ui/react-form';

const AddProduct = () => {
  const navigate = useNavigate();
  const [images, setImages] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    descriptions: ['', '', '', ''],
    size: '',
    fabric: '',
    information: '두께: 적당함 / 촉감: 부드러움 / 안감: 있음 / 신축성: 없음 / 세탁 방법: 단독 찬물 세탁 권장',
    shippingInfo: '',
    originalPrice: '',
    discountedPrice: '',
  });

  const bedSizes = [
    { value: 'single', label: 'Single (싱글)' },
    { value: 'queen', label: 'Queen (퀸)' },
    { value: 'king', label: 'King (킹)' },
    { value: 'super-king', label: 'Super King (수퍼킹)' },
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleDescriptionChange = (index, value) => {
    const newDescriptions = [...formData.descriptions];
    newDescriptions[index] = value;
    setFormData(prev => ({
      ...prev,
      descriptions: newDescriptions
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Product data:', { ...formData, images });
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
          <ImageUpload
            images={images}
            onImagesChange={setImages}
            maxImages={10}
          />
        </div>

        {/* Basic Information */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 space-y-6">
          <h2 className="text-lg font-semibold text-gray-900">기본 정보</h2>
          
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

          {/* Product Descriptions */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              상품 설명 (최대 4개)
            </label>
            <div className="space-y-3">
              {formData.descriptions.map((description, index) => (
                <input
                  key={index}
                  type="text"
                  value={description}
                  onChange={(e) => handleDescriptionChange(index, e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 transition-colors"
                  placeholder={`상품 설명 ${index + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Size Selection */}
          <Form.Field name="size">
            <Form.Label className="block text-sm font-medium text-gray-700 mb-2">
              사이즈 *
            </Form.Label>
            <Form.Control asChild>
              <select
                value={formData.size}
                onChange={(e) => handleInputChange('size', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 transition-colors"
                required
              >
                <option value="">사이즈를 선택하세요</option>
                {bedSizes.map((size) => (
                  <option key={size.value} value={size.value}>
                    {size.label}
                  </option>
                ))}
              </select>
            </Form.Control>
            <Form.Message match="valueMissing" className="text-sm text-red-600 mt-1">
              사이즈를 선택해주세요.
            </Form.Message>
          </Form.Field>

          {/* Fabric */}
          <Form.Field name="fabric">
            <Form.Label className="block text-sm font-medium text-gray-700 mb-2">
              Fabric
            </Form.Label>
            <Form.Control asChild>
              <input
                type="text"
                value={formData.fabric}
                onChange={(e) => handleInputChange('fabric', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 transition-colors"
                placeholder="예: 100% 코튼, 폴리에스터 블렌드 등"
              />
            </Form.Control>
          </Form.Field>
        </div>

        {/* Product Information */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 space-y-6">
          <h2 className="text-lg font-semibold text-gray-900">상품 정보</h2>
          
          {/* Information */}
          <Form.Field name="information">
            <Form.Label className="block text-sm font-medium text-gray-700 mb-2">
              Information
            </Form.Label>
            <div className="text-xs text-gray-500 mb-2">
              예시: 두께: 적당함 / 촉감: 부드러움 / 안감: 있음 / 신축성: 없음 / 세탁 방법: 단독 찬물 세탁 권장
            </div>
            <Form.Control asChild>
              <textarea
                value={formData.information}
                onChange={(e) => handleInputChange('information', e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 transition-colors"
                placeholder="상품의 세부 정보를 입력하세요"
              />
            </Form.Control>
          </Form.Field>

          {/* Shipping Info */}
          <Form.Field name="shippingInfo">
            <Form.Label className="block text-sm font-medium text-gray-700 mb-2">
              배송 정보
            </Form.Label>
            <Form.Control asChild>
              <textarea
                value={formData.shippingInfo}
                onChange={(e) => handleInputChange('shippingInfo', e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 transition-colors"
                placeholder="배송 정보를 입력하세요 (예: 배송비, 배송 기간 등)"
              />
            </Form.Control>
          </Form.Field>
        </div>

        {/* Pricing */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 space-y-6">
          <h2 className="text-lg font-semibold text-gray-900">가격 정보</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

            {/* Discounted Price */}
            <Form.Field name="discountedPrice">
              <Form.Label className="block text-sm font-medium text-gray-700 mb-2">
                할인된 가격
              </Form.Label>
              <div className="relative">
                <Form.Control asChild>
                  <input
                    type="number"
                    value={formData.discountedPrice}
                    onChange={(e) => handleInputChange('discountedPrice', e.target.value)}
                    className="w-full px-3 py-2 pr-8 border border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 transition-colors"
                    placeholder="0"
                    min="0"
                  />
                </Form.Control>
                <span className="absolute right-3 top-2 text-gray-500">원</span>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                할인 가격을 입력하지 않으면 기존 가격으로 판매됩니다.
              </p>
            </Form.Field>
          </div>

          {/* Discount Percentage Display */}
          {formData.originalPrice && formData.discountedPrice && (
            <div className="bg-green-50 p-3 rounded-md">
              <p className="text-sm text-green-800">
                할인율: {Math.round((1 - formData.discountedPrice / formData.originalPrice) * 100)}%
              </p>
            </div>
          )}
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