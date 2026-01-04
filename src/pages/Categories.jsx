import React, { useState, useRef } from 'react';
import { ChevronRightIcon, PencilIcon, TrashIcon, PlusIcon } from '@heroicons/react/24/outline';

// 더미 카테고리 데이터
const initialCategories = [
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

const CategoryTree = ({ categories, onAdd, onEdit, onDelete, level = 0 }) => {
  if (!categories || categories.length === 0) {
    return null;
  }

  return (
    <div className={`space-y-2 ${level > 0 ? 'ml-6 border-l-2 border-gray-200 pl-4' : ''}`}>
      {categories.map((category) => (
        <div key={category.id} className="category-item">
          <div
            className={`flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200 hover:shadow-sm transition-shadow ${
              level > 0 ? 'ml-4' : ''
            }`}
          >
            <div className="flex items-center gap-2">
              {category.subCategories && category.subCategories.length > 0 && (
                <ChevronRightIcon className="h-4 w-4 text-gray-400" />
              )}
              <span className="font-medium text-gray-900">{category.name}</span>
              {category.subCategories && category.subCategories.length > 0 && (
                <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                  {category.subCategories.length}
                </span>
              )}
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => onAdd(category)}
                className="p-1.5 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                title="하위 카테고리 추가"
              >
                <PlusIcon className="h-4 w-4" />
              </button>
              <button
                onClick={() => onEdit(category)}
                className="p-1.5 text-gray-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                title="수정"
              >
                <PencilIcon className="h-4 w-4" />
              </button>
              <button
                onClick={() => onDelete(category)}
                className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                title="삭제"
              >
                <TrashIcon className="h-4 w-4" />
              </button>
            </div>
          </div>
          {category.subCategories && category.subCategories.length > 0 && (
            <CategoryTree
              categories={category.subCategories}
              onAdd={onAdd}
              onEdit={onEdit}
              onDelete={onDelete}
              level={level + 1}
            />
          )}
        </div>
      ))}
    </div>
  );
};

// 카테고리 추가 헬퍼 함수
const addCategoryToTree = (categories, parentCategory, newCategory) => {
  if (!parentCategory) {
    // 최상위 카테고리 추가
    return [...categories, newCategory];
  }

  return categories.map(category => {
    if (category.id === parentCategory.id) {
      return {
        ...category,
        subCategories: [...(category.subCategories || []), newCategory]
      };
    }
    if (category.subCategories && category.subCategories.length > 0) {
      return {
        ...category,
        subCategories: addCategoryToTree(category.subCategories, parentCategory, newCategory)
      };
    }
    return category;
  });
};

// 카테고리 삭제 헬퍼 함수
const deleteCategoryFromTree = (categories, categoryId) => {
  return categories
    .filter(category => category.id !== categoryId)
    .map(category => ({
      ...category,
      subCategories: category.subCategories && category.subCategories.length > 0
        ? deleteCategoryFromTree(category.subCategories, categoryId)
        : []
    }));
};

// 카테고리 수정 헬퍼 함수
const updateCategoryInTree = (categories, categoryId, updates) => {
  return categories.map(category => {
    if (category.id === categoryId) {
      return { ...category, ...updates };
    }
    if (category.subCategories && category.subCategories.length > 0) {
      return {
        ...category,
        subCategories: updateCategoryInTree(category.subCategories, categoryId, updates)
      };
    }
    return category;
  });
};

const Categories = () => {
  const [categories, setCategories] = useState(initialCategories);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedParentCategory, setSelectedParentCategory] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
  });

  const nextIdRef = useRef(100); // 새 카테고리 ID를 위한 카운터

  const handleAdd = () => {
    setSelectedParentCategory(null);
    setFormData({ name: '' });
    setShowAddModal(true);
  };

  const handleAddSubCategory = (parent) => {
    setSelectedParentCategory(parent);
    setFormData({ name: '' });
    setShowAddModal(true);
  };

  const handleEdit = (category) => {
    setSelectedCategory(category);
    setFormData({ name: category.name });
    setShowEditModal(true);
  };

  const handleDelete = (category) => {
    if (category.subCategories && category.subCategories.length > 0) {
      alert('하위 카테고리가 있는 카테고리는 삭제할 수 없습니다.');
      return;
    }

    if (window.confirm(`"${category.name}" 카테고리를 삭제하시겠습니까?`)) {
      const updatedCategories = deleteCategoryFromTree(categories, category.id);
      setCategories(updatedCategories);
    }
  };

  const handleAddSubmit = (e) => {
    e.preventDefault();

    const newCategory = {
      id: nextIdRef.current++,
      name: formData.name,
      parentId: selectedParentCategory ? selectedParentCategory.id : null,
      subCategories: []
    };

    const updatedCategories = addCategoryToTree(categories, selectedParentCategory, newCategory);
    setCategories(updatedCategories);
    setShowAddModal(false);
    setFormData({ name: '' });
    setSelectedParentCategory(null);
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();

    const updatedCategories = updateCategoryInTree(categories, selectedCategory.id, {
      name: formData.name
    });

    setCategories(updatedCategories);
    setShowEditModal(false);
    setSelectedCategory(null);
    setFormData({ name: '' });
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">카테고리 관리</h1>
        <button
          onClick={handleAdd}
          className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium"
        >
          카테고리 추가
        </button>
      </div>

      {categories.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
          <p className="text-gray-500 mb-4">등록된 카테고리가 없습니다.</p>
          <button
            onClick={handleAdd}
            className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
          >
            첫 번째 카테고리 추가
          </button>
        </div>
      ) : (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <CategoryTree
            categories={categories}
            onAdd={handleAddSubCategory}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </div>
      )}

      {/* 추가 모달 */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              {selectedParentCategory ? `"${selectedParentCategory.name}" 하위 카테고리 추가` : '최상위 카테고리 추가'}
            </h2>
            <form onSubmit={handleAddSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  카테고리명
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  required
                  autoFocus
                />
              </div>
              <div className="flex gap-2">
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                >
                  추가
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowAddModal(false);
                    setFormData({ name: '' });
                    setSelectedParentCategory(null);
                  }}
                  className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  취소
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 수정 모달 */}
      {showEditModal && selectedCategory && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">카테고리 수정</h2>
            <form onSubmit={handleEditSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  카테고리명
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  required
                  autoFocus
                />
              </div>
              <div className="flex gap-2">
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                >
                  저장
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowEditModal(false);
                    setSelectedCategory(null);
                    setFormData({ name: '' });
                  }}
                  className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  취소
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Categories;
