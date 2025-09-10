// Mock Q&A data for demonstration
export const mockQnA = [
  {
    id: 1,
    productId: 1,
    customerName: "김민수",
    question: "이 헤드폰이 노이즈 캔슬링 기능이 있나요?",
    createdAt: "2024-01-15T11:30:00Z",
    adminAnswer: {
      content: "네, 액티브 노이즈 캔슬링 기능이 탑재되어 있습니다. 주변 소음을 효과적으로 차단할 수 있습니다.",
      createdAt: "2024-01-15T14:20:00Z"
    }
  },
  {
    id: 2,
    productId: 2,
    customerName: "이지은",
    question: "무선 키보드 배터리 수명이 얼마나 되나요?",
    createdAt: "2024-01-14T16:45:00Z",
    adminAnswer: null
  },
  {
    id: 3,
    productId: 3,
    customerName: "박현우",
    question: "게이밍 마우스 DPI 설정이 가능한가요?",
    createdAt: "2024-01-13T09:15:00Z",
    adminAnswer: {
      content: "네, 800~3200 DPI까지 4단계로 조절 가능합니다. 전용 소프트웨어를 통해 세밀한 설정도 가능합니다.",
      createdAt: "2024-01-13T15:30:00Z"
    }
  },
  {
    id: 4,
    productId: 4,
    customerName: "최서연",
    question: "모니터 스탠드 높이 조절 범위가 어떻게 되나요?",
    createdAt: "2024-01-12T13:20:00Z",
    adminAnswer: null
  },
  {
    id: 5,
    productId: 5,
    customerName: "정하늘",
    question: "USB 허브가 USB 3.0을 지원하나요?",
    createdAt: "2024-01-11T14:55:00Z",
    adminAnswer: {
      content: "네, USB 3.0을 지원하며 데이터 전송 속도가 빠릅니다. 또한 하위 호환성도 제공됩니다.",
      createdAt: "2024-01-12T09:10:00Z"
    }
  },
  {
    id: 6,
    productId: 6,
    customerName: "김도윤",
    question: "블루투스 스피커 연결 거리는 얼마나 되나요?",
    createdAt: "2024-01-10T12:30:00Z",
    adminAnswer: null
  },
  {
    id: 7,
    productId: 7,
    customerName: "장미래",
    question: "노트북 거치대가 15인치 노트북도 지원하나요?",
    createdAt: "2024-01-09T16:40:00Z",
    adminAnswer: {
      content: "네, 11인치부터 17인치까지 다양한 크기의 노트북을 지원합니다.",
      createdAt: "2024-01-10T11:25:00Z"
    }
  },
  {
    id: 8,
    productId: 8,
    customerName: "윤성호",
    question: "웹캠 해상도가 어떻게 되나요?",
    createdAt: "2024-01-08T10:15:00Z",
    adminAnswer: null
  },
  {
    id: 9,
    productId: 9,
    customerName: "오지은",
    question: "마이크가 스탠드형인가요 아니면 클립형인가요?",
    createdAt: "2024-01-07T15:25:00Z",
    adminAnswer: {
      content: "스탠드형 마이크입니다. 높이와 각도 조절이 가능하여 편리하게 사용하실 수 있습니다.",
      createdAt: "2024-01-08T08:45:00Z"
    }
  },
  {
    id: 10,
    productId: 10,
    customerName: "임현우",
    question: "태블릿 펜이 압력 감지를 지원하나요?",
    createdAt: "2024-01-06T11:50:00Z",
    adminAnswer: null
  },
  {
    id: 11,
    productId: 1,
    customerName: "한소영",
    question: "헤드폰 무게가 얼마나 되나요? 오래 착용해도 편한가요?",
    createdAt: "2024-01-05T14:20:00Z",
    adminAnswer: {
      content: "약 250g으로 가벼운 편이며, 쿠션이 부드러워 장시간 착용에도 편안합니다.",
      createdAt: "2024-01-06T10:15:00Z"
    }
  },
  {
    id: 12,
    productId: 2,
    customerName: "강태민",
    question: "키보드가 방수 기능이 있나요?",
    createdAt: "2024-01-04T09:35:00Z",
    adminAnswer: null
  },
  {
    id: 13,
    productId: 3,
    customerName: "송예린",
    question: "마우스 버튼이 몇 개인가요?",
    createdAt: "2024-01-03T16:10:00Z",
    adminAnswer: {
      content: "좌클릭, 우클릭, 휠클릭 외에 추가로 2개의 사이드 버튼이 있어 총 5개 버튼입니다.",
      createdAt: "2024-01-04T13:25:00Z"
    }
  },
  {
    id: 14,
    productId: 11,
    customerName: "노준혁",
    question: "충전 케이블 길이가 어떻게 되나요?",
    createdAt: "2024-01-02T18:45:00Z",
    adminAnswer: null
  },
  {
    id: 15,
    productId: 12,
    customerName: "안지혜",
    question: "무선 충전기가 아이폰도 지원하나요?",
    createdAt: "2024-01-01T12:30:00Z",
    adminAnswer: {
      content: "네, Qi 표준을 지원하므로 아이폰 8 이후 모델부터 사용 가능합니다.",
      createdAt: "2024-01-02T09:20:00Z"
    }
  },
  {
    id: 16,
    productId: 13,
    customerName: "류민준",
    question: "스마트 워치 배터리 지속시간은 얼마나 되나요?",
    createdAt: "2023-12-31T14:15:00Z",
    adminAnswer: null
  },
  {
    id: 17,
    productId: 14,
    customerName: "서다은",
    question: "이어버드 케이스도 같이 오나요?",
    createdAt: "2023-12-30T11:40:00Z",
    adminAnswer: {
      content: "네, 충전 케이스가 포함되어 있습니다. 케이스로 추가 충전이 가능합니다.",
      createdAt: "2023-12-31T10:30:00Z"
    }
  },
  {
    id: 18,
    productId: 15,
    customerName: "조현석",
    question: "폰 케이스가 카드 수납이 되나요?",
    createdAt: "2023-12-29T13:25:00Z",
    adminAnswer: null
  }
];