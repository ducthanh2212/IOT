# Home Assistant Dashboard - UI Design Specification

## 🧠 Mục tiêu
Xây dựng frontend dashboard giống với giao diện của [Home Assistant](https://demo.home-assistant.io/#/lovelace/home), sử dụng **React + TypeScript + Vite**.

## 🧩 Kiến trúc thư mục

```
home-assistant-dashboard/
├── public/
├── src/
│   ├── assets/               # Ảnh, icon, font
│   ├── components/           # Thành phần UI tái sử dụng
│   │   └── Card.tsx          # Component thẻ thiết bị
│   ├── cards/                # Các card như LightCard, SensorCard
│   ├── layout/               # Các layout tổng thể (Sidebar, Header, etc.)
│   ├── pages/                # Trang chính như Dashboard, Settings
│   ├── services/             # Tầng gọi API, websocket
│   ├── hooks/                # Custom React hooks
│   ├── types/                # TypeScript types và interfaces
│   └── App.tsx              # Entry component
├── index.html
├── vite.config.ts
├── tsconfig.json
├── .env
└── README.md
```

## 🎨 Giao diện trang Dashboard (MVP)

- **Sidebar**: Menu trái chứa icon + label (Home, Settings, Log, ...)
- **Header**: Hiển thị thời gian, nút bật/tắt chế độ sáng/tối, trạng thái user
- **Main Grid**: Gồm nhiều card dạng grid responsive:
  - LightCard: Bật/tắt đèn + icon
  - TemperatureCard: Hiển thị nhiệt độ, độ ẩm
  - CameraFeedCard: Xem camera (dùng placeholder)
  - SceneCard: Chạy nhanh 1 ngữ cảnh đã lưu

## 🧱 Component Mẫu

### LightCard.tsx

```tsx
import React from "react";

type LightCardProps = {
  name: string;
  isOn: boolean;
  onToggle: () => void;
};

const LightCard = ({ name, isOn, onToggle }: LightCardProps) => (
  <div className="card">
    <h3>{name}</h3>
    <button onClick={onToggle}>{isOn ? "Turn Off" : "Turn On"}</button>
  </div>
);

export default LightCard;
```

### SensorCard.tsx

```tsx
import React from "react";

type SensorCardProps = {
  label: string;
  value: string;
};

const SensorCard = ({ label, value }: SensorCardProps) => (
  <div className="card">
    <h4>{label}</h4>
    <p>{value}</p>
  </div>
);

export default SensorCard;
```

## 📡 Kết nối Backend

- Dùng WebSocket hoặc REST API gọi đến backend viết bằng Java (chưa xây).
- Giả lập bằng JSON tĩnh trong services trước.

## 🛠 Kế hoạch mở rộng

- Responsive cho mobile/tablet
- Animation + trạng thái loading
- Đăng nhập và phân quyền
- Settings để cấu hình cảm biến/thành phần

---

Copilot có thể dùng mô tả này để tạo workspace ban đầu, sinh mã cho các component và UI layout theo ý tưởng.