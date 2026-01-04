import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { XMarkIcon } from '@heroicons/react/24/outline';
import {
  HomeIcon,
  CubeIcon,
  ChatBubbleLeftRightIcon,
  QuestionMarkCircleIcon,
  FolderIcon,
  TicketIcon,
} from '@heroicons/react/24/outline';

const navigation = [
  { name: '대시보드', href: '/', icon: HomeIcon },
  { name: '카테고리 관리', href: '/categories', icon: FolderIcon },
  { name: '쿠폰 관리', href: '/coupons', icon: TicketIcon },
  { name: '상품 관리', href: '/products', icon: CubeIcon },
  { name: '리뷰 관리', href: '/reviews', icon: ChatBubbleLeftRightIcon },
  { name: 'Q&A 관리', href: '/qna', icon: QuestionMarkCircleIcon },
];

const Sidebar = ({ sidebarOpen, setSidebarOpen, sidebarCollapsed, setSidebarCollapsed }) => {
  const location = useLocation();

  return (
    <>
      {/* Desktop sidebar */}
      <div className={`hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:flex-col transition-all duration-300 ${sidebarCollapsed ? 'lg:w-20' : 'lg:w-72'}`}>
        <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white border-r border-gray-200 px-6 pb-4">
          {/* Logo */}
          <div className="flex h-16 shrink-0 items-center">
            <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">H</span>
            </div>
            {!sidebarCollapsed && (
              <span className="ml-3 text-xl font-semibold text-gray-900">Hable</span>
            )}
          </div>

          {/* Navigation */}
          <nav className="flex flex-1 flex-col">
            <ul role="list" className="flex flex-1 flex-col gap-y-7">
              <li>
                <ul role="list" className="-mx-2 space-y-1">
                  {navigation.map((item) => (
                    <li key={item.name}>
                      <Link
                        to={item.href}
                        className={`group flex rounded-md p-2 text-sm leading-6 font-semibold transition-colors ${
                          sidebarCollapsed ? 'justify-center' : 'gap-x-3'
                        } ${
                          location.pathname === item.href
                            ? 'bg-primary-600 text-white'
                            : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50'
                        }`}
                        title={sidebarCollapsed ? item.name : ''}
                      >
                        <item.icon
                          className={`h-6 w-6 shrink-0 ${
                            location.pathname === item.href
                              ? 'text-white'
                              : 'text-gray-400 group-hover:text-primary-600'
                          }`}
                        />
                        {!sidebarCollapsed && item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      {/* Mobile sidebar */}
      <div className={`relative z-50 lg:hidden ${sidebarOpen ? '' : 'hidden'}`}>
        <div className="fixed inset-0 flex">
          <div className="relative mr-16 flex w-full max-w-xs flex-1">
            <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
              <button
                type="button"
                className="-m-2.5 p-2.5"
                onClick={() => setSidebarOpen(false)}
              >
                <XMarkIcon className="h-6 w-6 text-white" />
              </button>
            </div>

            <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-4">
              {/* Mobile Logo */}
              <div className="flex h-16 shrink-0 items-center">
                <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">H</span>
                </div>
                <span className="ml-3 text-xl font-semibold text-gray-900">Hable</span>
              </div>

              {/* Mobile Navigation */}
              <nav className="flex flex-1 flex-col">
                <ul role="list" className="flex flex-1 flex-col gap-y-7">
                  <li>
                    <ul role="list" className="-mx-2 space-y-1">
                      {navigation.map((item) => (
                        <li key={item.name}>
                          <Link
                            to={item.href}
                            onClick={() => setSidebarOpen(false)}
                            className={`group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold transition-colors ${
                              location.pathname === item.href
                                ? 'bg-primary-600 text-white'
                                : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50'
                            }`}
                          >
                            <item.icon
                              className={`h-6 w-6 shrink-0 ${
                                location.pathname === item.href
                                  ? 'text-white'
                                  : 'text-gray-400 group-hover:text-primary-600'
                              }`}
                            />
                            {item.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;