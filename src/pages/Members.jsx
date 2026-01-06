import React, { useState, useEffect } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
// import { memberApi } from '../services/memberApi'; // 추후 API 연동 시 사용

// TODO: 추후 실제 API 연동으로 교체 필요
const mockMembers = [
  { id: 1, nickname: '김철수', email: 'cheolsu@example.com', phoneNumber: '010-1234-5678', role: 'ROLE_USER', createdAt: '2024-01-15T10:30:00' },
  { id: 2, nickname: '이영희', email: 'younghee@example.com', phoneNumber: '010-2345-6789', role: 'ROLE_USER', createdAt: '2024-01-18T14:20:00' },
  { id: 3, nickname: '박민수', email: 'minsu@example.com', phoneNumber: '010-3456-7890', role: 'ROLE_ADMIN', createdAt: '2024-02-01T09:15:00' },
  { id: 4, nickname: '정수진', email: 'sujin@example.com', phoneNumber: '010-4567-8901', role: 'ROLE_USER', createdAt: '2024-02-10T16:45:00' },
  { id: 5, nickname: '강동원', email: 'dongwon@example.com', phoneNumber: '010-5678-9012', role: 'ROLE_USER', createdAt: '2024-02-15T11:30:00' },
  { id: 6, nickname: '손나은', email: 'naeun@example.com', phoneNumber: '010-6789-0123', role: 'ROLE_USER', createdAt: '2024-02-20T13:50:00' },
  { id: 7, nickname: '유인나', email: 'inna@example.com', phoneNumber: '010-7890-1234', role: 'ROLE_USER', createdAt: '2024-03-01T10:00:00' },
  { id: 8, nickname: '현빈', email: 'hyunbin@example.com', phoneNumber: '010-8901-2345', role: 'ROLE_USER', createdAt: '2024-03-05T15:20:00' },
  { id: 9, nickname: '한효주', email: 'hyojoo@example.com', phoneNumber: '010-9012-3456', role: 'ROLE_USER', createdAt: '2024-03-10T09:40:00' },
  { id: 10, nickname: '이민호', email: 'minho@example.com', phoneNumber: '010-0123-4567', role: 'ROLE_USER', createdAt: '2024-03-15T14:10:00' },
  { id: 11, nickname: '박보영', email: 'boyoung@example.com', phoneNumber: '010-1234-5678', role: 'ROLE_USER', createdAt: '2024-03-20T11:25:00' },
  { id: 12, nickname: '수지', email: 'suji@example.com', phoneNumber: '010-2345-6789', role: 'ROLE_USER', createdAt: '2024-03-25T16:50:00' },
  { id: 13, nickname: '김우빈', email: 'woobin@example.com', phoneNumber: '010-3456-7890', role: 'ROLE_USER', createdAt: '2024-04-01T10:15:00' },
  { id: 14, nickname: '전지현', email: 'jihyun@example.com', phoneNumber: '010-4567-8901', role: 'ROLE_USER', createdAt: '2024-04-05T13:30:00' },
  { id: 15, nickname: '이준기', email: 'joonki@example.com', phoneNumber: '010-5678-9012', role: 'ROLE_USER', createdAt: '2024-04-10T09:45:00' },
];

const Members = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [members, setMembers] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const [loading, setLoading] = useState(false);

  const itemsPerPage = 10;

  useEffect(() => {
    fetchMembers();
  }, [currentPage]);

  // TODO: 추후 실제 API 연동으로 교체 필요
  const fetchMembers = async () => {
    try {
      setLoading(true);

      // 임시: 더미 데이터 사용
      setTimeout(() => {
        const startIndex = currentPage * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const pageData = mockMembers.slice(startIndex, endIndex);

        setMembers(pageData);
        setTotalPages(Math.ceil(mockMembers.length / itemsPerPage));
        setTotalElements(mockMembers.length);
        setLoading(false);
      }, 300);

      /* 실제 API 연동 시 주석 해제
      const data = await memberApi.getMembers(currentPage, itemsPerPage);
      setMembers(data.content);
      setTotalPages(data.totalPages);
      setTotalElements(data.totalElements);
      */
    } catch (error) {
      console.error('Failed to fetch members:', error);
      alert('회원 목록을 불러오는데 실패했습니다.');
    } finally {
      // TODO: 실제 API 연동 시 setLoading(false)를 finally 블럭에서 처리
      // setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatRole = (role) => {
    if (!role) return 'USER';
    return role.replace('ROLE_', '');
  };

  const goToPage = (page) => {
    if (page >= 0 && page < totalPages) {
      setCurrentPage(page);
    }
  };

  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 0; i < totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 2) {
        for (let i = 0; i < maxVisiblePages; i++) {
          pages.push(i);
        }
      } else if (currentPage >= totalPages - 3) {
        for (let i = totalPages - maxVisiblePages; i < totalPages; i++) {
          pages.push(i);
        }
      } else {
        for (let i = currentPage - 2; i <= currentPage + 2; i++) {
          pages.push(i);
        }
      }
    }

    return pages;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="border-b border-gray-200 pb-5">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-2xl font-bold leading-6 text-gray-900">회원 관리</h3>
            <p className="mt-2 max-w-4xl text-sm text-gray-500">
              전체 회원 정보를 조회하고 관리할 수 있습니다.
            </p>
          </div>
        </div>
      </div>

      {/* Members Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-gray-500">로딩 중...</div>
        ) : members.length === 0 ? (
          <div className="p-8 text-center text-gray-500">회원 정보가 없습니다.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    닉네임
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    이메일
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    핸드폰 번호
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    역할
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    가입일
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {members.map((member) => (
                  <tr key={member.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {member.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {member.nickname || '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {member.email || '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {member.phoneNumber || '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        member.role === 'ROLE_ADMIN'
                          ? 'bg-purple-100 text-purple-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {formatRole(member.role)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(member.createdAt)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
        <div className="flex flex-1 justify-between sm:hidden">
          <button
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 0}
            className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            이전
          </button>
          <button
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage >= totalPages - 1}
            className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            다음
          </button>
        </div>

        <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-gray-700">
              총 <span className="font-medium">{totalElements}</span>명 중{' '}
              <span className="font-medium">{currentPage * itemsPerPage + 1}</span>-
              <span className="font-medium">{Math.min((currentPage + 1) * itemsPerPage, totalElements)}</span>명 표시
            </p>
          </div>

          <div>
            <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm">
              <button
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 0}
                className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeftIcon className="h-5 w-5" />
              </button>

              {getPageNumbers().map((page) => (
                <button
                  key={page}
                  onClick={() => goToPage(page)}
                  className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ring-1 ring-inset ring-gray-300 focus:z-10 focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                    currentPage === page
                      ? 'z-10 bg-primary-600 text-white'
                      : 'text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  {page + 1}
                </button>
              ))}

              <button
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage >= totalPages - 1}
                className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronRightIcon className="h-5 w-5" />
              </button>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Members;
