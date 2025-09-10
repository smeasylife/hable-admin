// Mock review data for demonstration
export const mockReviews = [
  {
    id: 1,
    productId: 1,
    customerName: "김철수",
    rating: 5,
    content: "정말 좋은 헤드폰입니다. 음질이 뛰어나고 편안해요!",
    createdAt: "2024-01-15T10:30:00Z",
    adminReply: null
  },
  {
    id: 2,
    productId: 1,
    customerName: "이영희",
    rating: 4,
    content: "가격 대비 만족스럽습니다. 디자인도 깔끔하고 좋네요.",
    createdAt: "2024-01-14T14:20:00Z",
    adminReply: {
      content: "소중한 리뷰 감사합니다. 앞으로도 좋은 제품으로 보답하겠습니다.",
      createdAt: "2024-01-15T09:00:00Z"
    }
  },
  {
    id: 3,
    productId: 2,
    customerName: "박민수",
    rating: 5,
    content: "무선 키보드 중에서 최고입니다. 타이핑감이 정말 좋아요.",
    createdAt: "2024-01-13T16:45:00Z",
    adminReply: null
  },
  {
    id: 4,
    productId: 3,
    customerName: "최서연",
    rating: 3,
    content: "마우스는 괜찮은데 배송이 좀 늦었어요.",
    createdAt: "2024-01-12T11:10:00Z",
    adminReply: {
      content: "배송 지연으로 불편을 드려 죄송합니다. 개선하도록 노력하겠습니다.",
      createdAt: "2024-01-13T08:30:00Z"
    }
  },
  {
    id: 5,
    productId: 4,
    customerName: "정하늘",
    rating: 5,
    content: "모니터 스탠드 정말 튼튼하고 좋습니다. 높이 조절도 편해요.",
    createdAt: "2024-01-11T09:30:00Z",
    adminReply: null
  },
  {
    id: 6,
    productId: 5,
    customerName: "김도윤",
    rating: 4,
    content: "USB 허브 잘 쓰고 있어요. 포트가 많아서 편리합니다.",
    createdAt: "2024-01-10T13:15:00Z",
    adminReply: null
  },
  {
    id: 7,
    productId: 6,
    customerName: "장미래",
    rating: 5,
    content: "블루투스 스피커 음질이 정말 좋네요! 추천합니다.",
    createdAt: "2024-01-09T15:40:00Z",
    adminReply: {
      content: "음질에 만족해 주셔서 감사합니다. 계속 좋은 제품으로 찾아뵙겠습니다.",
      createdAt: "2024-01-10T10:00:00Z"
    }
  },
  {
    id: 8,
    productId: 7,
    customerName: "윤성호",
    rating: 4,
    content: "노트북 거치대 각도 조절이 좋아요. 목이 편해졌습니다.",
    createdAt: "2024-01-08T12:25:00Z",
    adminReply: null
  },
  {
    id: 9,
    productId: 8,
    customerName: "오지은",
    rating: 3,
    content: "웹캠은 괜찮은데 화질이 생각보다 아쉬워요.",
    createdAt: "2024-01-07T17:30:00Z",
    adminReply: {
      content: "화질 관련 피드백 감사합니다. 더 나은 제품으로 개선하겠습니다.",
      createdAt: "2024-01-08T09:15:00Z"
    }
  },
  {
    id: 10,
    productId: 9,
    customerName: "임현우",
    rating: 5,
    content: "마이크 품질이 예상보다 훨씬 좋습니다. 녹음도 깔끔해요.",
    createdAt: "2024-01-06T14:50:00Z",
    adminReply: null
  },
  {
    id: 11,
    productId: 10,
    customerName: "한소영",
    rating: 4,
    content: "태블릿 펜 반응이 좋고 필기감이 자연스러워요.",
    createdAt: "2024-01-05T11:20:00Z",
    adminReply: null
  },
  {
    id: 12,
    productId: 1,
    customerName: "강태민",
    rating: 5,
    content: "헤드폰 정말 만족합니다. 소음 차단도 잘 되고 음질도 좋아요.",
    createdAt: "2024-01-04T16:35:00Z",
    adminReply: {
      content: "만족스러운 경험을 주셔서 감사합니다. 계속 품질 유지에 힘쓰겠습니다.",
      createdAt: "2024-01-05T08:45:00Z"
    }
  },
  {
    id: 13,
    productId: 2,
    customerName: "송예린",
    rating: 4,
    content: "키보드 타이핑 소리가 조용해서 사무실에서 쓰기 좋아요.",
    createdAt: "2024-01-03T13:10:00Z",
    adminReply: null
  },
  {
    id: 14,
    productId: 3,
    customerName: "노준혁",
    rating: 5,
    content: "게이밍 마우스 반응속도가 빨라서 게임할 때 도움이 많이 됩니다.",
    createdAt: "2024-01-02T19:45:00Z",
    adminReply: null
  },
  {
    id: 15,
    productId: 4,
    customerName: "안지혜",
    rating: 4,
    content: "모니터 스탠드 조립이 간단하고 안정적이에요.",
    createdAt: "2024-01-01T10:15:00Z",
    adminReply: {
      content: "조립 편의성에 만족해 주셔서 감사합니다. 새해 복 많이 받으세요!",
      createdAt: "2024-01-02T09:00:00Z"
    }
  }
];