import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
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

const EditProduct = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState(dummyCategories);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [expandedCategories, setExpandedCategories] = useState({});
  const [images, setImages] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    size: '',
    fabric: '',
    information: '',
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

  // Mock data for demo (ID 1 product)
  const mockProductData = {
    id: 1,
    name: '프리미엄 코튼 침대 시트',
    description: '100% 순면 소재로 제작된 고급 침대 시트입니다. 부드럽고 통기성이 좋아 사계절 사용 가능하며, 세탁 후에도 형태 변형이 적은 고품질 제품입니다. 다양한 색상으로 침실 분위기에 맞게 선택 가능합니다.',
    size: 'queen',
    fabric: '100% 순면 (Cotton)',
    information: '두께: 적당함 / 촉감: 부드러움 / 안감: 있음 / 신축성: 없음 / 세탁 방법: 단독 찬물 세탁 권장',
    shippingInfo: '무료배송 (2-3일 소요) / 제주도 및 도서산간 지역 추가 배송비 3,000원',
    originalPrice: '89000',
    discountedPrice: '69000',
    images: [
      '/api/placeholder/400/400',
      '/api/placeholder/400/400',
      '/api/placeholder/400/400'
    ]
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        // TODO: Replace with actual API call
        // const response = await fetch(`/api/products/${id}`);
        // const productData = await response.json();

        // For demo, use mock data for ID 1
        const productData = mockProductData;
        
        setFormData({
          name: productData.name,
          description: productData.description,
          size: productData.size,
          fabric: productData.fabric,
          information: productData.information,
          shippingInfo: productData.shippingInfo,
          originalPrice: productData.originalPrice,
          discountedPrice: productData.discountedPrice,
        });
        
        setImages(productData.images || []);
        
      } catch (error) {
        console.error('Error fetching product:', error);
        alert('상품 정보를 불러오는데 실패했습니다.');
        navigate('/products');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id, navigate]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

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


  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Updated product data:', { ...formData, images });
    // TODO: API 호출 로직 구현
    alert('상품이 수정되었습니다!');
    navigate('/products');
  };

  const handleCancel = () => {
    navigate('/products');
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-lg text-gray-600">상품 정보를 불러오는 중...</div>
      </div>
    );
  }

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
          <h1 className="text-2xl font-bold text-gray-900">상품 수정</h1>
          <p className="text-sm text-gray-500 mt-1">상품 정보를 수정합니다.</p>
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

          {/* Product Description */}
          <Form.Field name="description">
            <Form.Label className="block text-sm font-medium text-gray-700 mb-2">
              상품 설명
            </Form.Label>
            <Form.Control asChild>
              <textarea
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 transition-colors"
                placeholder="상품 설명을 입력하세요"
              />
            </Form.Control>
          </Form.Field>

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
              상품 수정
            </button>
          </Form.Submit>
        </div>
      </Form.Root>
    </div>
  );
};

export default EditProduct;