import React, { useState } from 'react';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';
import * as Form from '@radix-ui/react-form';

// 더미 쿠폰 데이터
const dummyCoupons = [
  {
    id: 1,
    name: '신규 회원 웰컴 10% 할인',
    type: 'PERCENT',
    value: 10,
    startTime: '2025-01-01T00:00:00',
    endTime: '2025-12-31T23:59:59',
    createdAt: '2025-01-01T10:00:00'
  },
  {
    id: 2,
    name: '설 특별 3000원 할인',
    type: 'FIXED_AMOUNT',
    value: 3000,
    startTime: '2025-02-01T00:00:00',
    endTime: '2025-02-28T23:59:59',
    createdAt: '2025-01-15T10:00:00'
  },
  {
    id: 3,
    name: '가을 시즌 20% 할인',
    type: 'PERCENT',
    value: 20,
    startTime: '2025-09-01T00:00:00',
    endTime: '2025-11-30T23:59:59',
    createdAt: '2025-08-15T10:00:00'
  }
];

const Coupons = () => {
  const navigate = useNavigate();
  const [coupons, setCoupons] = useState(dummyCoupons);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    type: 'PERCENT',
    value: '',
    startTime: '',
    endTime: ''
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // 더미 쿠폰 생성
    const newCoupon = {
      id: coupons.length + 1,
      name: formData.name,
      type: formData.type,
      value: parseInt(formData.value),
      startTime: formData.startTime,
      endTime: formData.endTime,
      createdAt: new Date().toISOString()
    };

    setCoupons([newCoupon, ...coupons]);
    setShowCreateModal(false);
    setFormData({
      name: '',
      type: 'PERCENT',
      value: '',
      startTime: '',
      endTime: ''
    });

    alert(`쿠폰 "${formData.name}"이(가) 생성되었습니다.`);
  };

  const handleDelete = (couponId) => {
    if (window.confirm('이 쿠폰을 삭제하시겠습니까?')) {
      setCoupons(coupons.filter(c => c.id !== couponId));
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getDiscountText = (coupon) => {
    if (coupon.type === 'PERCENT') {
      return `${coupon.value}% 할인`;
    } else {
      return `${coupon.value.toLocaleString()}원 할인`;
    }
  };

  const getTypeLabel = (type) => {
    return type === 'PERCENT' ? '퍼센트 (%)' : '고정 금액 (원)';
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">쿠폰 관리</h1>
          <p className="text-sm text-gray-500 mt-1">
            전체 회원에게 발급할 쿠폰을 생성하고 관리합니다.
          </p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium"
        >
          쿠폰 생성
        </button>
      </div>

      {/* 쿠폰 리스트 */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        {coupons.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 mb-4">생성된 쿠폰이 없습니다.</p>
            <button
              onClick={() => setShowCreateModal(true)}
              className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
            >
              첫 번째 쿠폰 생성
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    쿠폰명
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    타입
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    할인 값
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    시작일
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    종료일
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    생성일
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    관리
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {coupons.map((coupon) => (
                  <tr key={coupon.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{coupon.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
                        {getTypeLabel(coupon.type)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 font-semibold">
                        {getDiscountText(coupon)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{formatDate(coupon.startTime)}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{formatDate(coupon.endTime)}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{formatDate(coupon.createdAt)}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => handleDelete(coupon.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        삭제
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* 쿠폰 생성 모달 */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold text-gray-900 mb-4">쿠폰 생성</h2>
            <Form.Root onSubmit={handleSubmit} className="space-y-6">
              {/* 쿠폰명 */}
              <Form.Field name="couponName">
                <Form.Label className="block text-sm font-medium text-gray-700 mb-2">
                  쿠폰명 *
                </Form.Label>
                <Form.Control asChild>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
                    placeholder="예: 신규 회원 10% 할인"
                    required
                  />
                </Form.Control>
                <Form.Message match="valueMissing" className="text-sm text-red-600 mt-1">
                  쿠폰명을 입력해주세요.
                </Form.Message>
              </Form.Field>

              {/* 할인 타입 */}
              <Form.Field name="discountType">
                <Form.Label className="block text-sm font-medium text-gray-700 mb-2">
                  할인 타입 *
                </Form.Label>
                <select
                  value={formData.type}
                  onChange={(e) => handleInputChange('type', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
                  required
                >
                  <option value="PERCENT">퍼센트 (%) 할인</option>
                  <option value="FIXED_AMOUNT">고정 금액 (원) 할인</option>
                </select>
                <Form.Message match="valueMissing" className="text-sm text-red-600 mt-1">
                  할인 타입을 선택해주세요.
                </Form.Message>
              </Form.Field>

              {/* 할인 값 */}
              <Form.Field name="discountValue">
                <Form.Label className="block text-sm font-medium text-gray-700 mb-2">
                  {formData.type === 'PERCENT' ? '할인율 (%) *' : '할인 금액 (원) *'}
                </Form.Label>
                <div className="relative">
                  <Form.Control asChild>
                    <input
                      type="number"
                      value={formData.value}
                      onChange={(e) => handleInputChange('value', e.target.value)}
                      className="w-full px-3 py-2 pr-12 border border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
                      placeholder={formData.type === 'PERCENT' ? '10' : '3000'}
                      min="0"
                      max={formData.type === 'PERCENT' ? '100' : '1000000'}
                      required
                    />
                  </Form.Control>
                  <span className="absolute right-3 top-2 text-gray-500">
                    {formData.type === 'PERCENT' ? '%' : '원'}
                  </span>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  {formData.type === 'PERCENT' ? '1-100 사이의 숫자를 입력하세요' : '0-1,000,000 사이의 숫자를 입력하세요'}
                </p>
              </Form.Field>

              {/* 시작일 */}
              <Form.Field name="startTime">
                <Form.Label className="block text-sm font-medium text-gray-700 mb-2">
                  시작일시 *
                </Form.Label>
                <input
                  type="datetime-local"
                  value={formData.startTime}
                  onChange={(e) => handleInputChange('startTime', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
                  required
                />
                <Form.Message match="valueMissing" className="text-sm text-red-600 mt-1">
                  시작일시를 선택해주세요.
                </Form.Message>
              </Form.Field>

              {/* 종료일 */}
              <Form.Field name="endTime">
                <Form.Label className="block text-sm font-medium text-gray-700 mb-2">
                  종료일시 *
                </Form.Label>
                <input
                  type="datetime-local"
                  value={formData.endTime}
                  onChange={(e) => handleInputChange('endTime', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
                  required
                />
                <Form.Message match="valueMissing" className="text-sm text-red-600 mt-1">
                  종료일시를 선택해주세요.
                </Form.Message>
              </Form.Field>

              {/* 안내 메시지 */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-blue-800">알려드립니다</h3>
                    <div className="mt-2 text-sm text-blue-700">
                      <p>쿠폰 생성 시 모든 회원에게 자동으로 발급됩니다.</p>
                      <p className="mt-1">쿠폰 종료일을 설정하는 것을 잊지 마세요.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* 버튼 */}
              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowCreateModal(false);
                    setFormData({
                      name: '',
                      type: 'PERCENT',
                      value: '',
                      startTime: '',
                      endTime: ''
                    });
                  }}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                >
                  취소
                </button>
                <Form.Submit asChild>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
                  >
                    쿠폰 생성
                  </button>
                </Form.Submit>
              </div>
            </Form.Root>
          </div>
        </div>
      )}
    </div>
  );
};

export default Coupons;
