
# 🏠 IoT Room Dashboard - Mô Tả Giao Diện & Kiến Trúc

## 📋 Tổng Quan

Ứng dụng **IoT Room Dashboard** cho phép người dùng giám sát và điều khiển các thiết bị thông minh theo từng **phòng** trong ngôi nhà, với giao diện **trực quan, dễ dùng**, sử dụng công nghệ **React + TypeScript + Tailwind CSS**.

---

## 🧱 Cấu Trúc Dự Án

```
src/
├── components/
│   ├── Header.tsx
│   ├── RoomCard.tsx
│   ├── SensorCard.tsx
│   ├── EnergyCard.tsx
│   ├── DeviceGroup.tsx
│   └── ToggleSwitch.tsx
├── pages/
│   └── Dashboard.tsx
├── services/
│   └── api.ts
├── types/
│   └── index.ts
├── utils/
│   └── helpers.ts
└── App.tsx
```

---

## 🎨 Thiết Kế Giao Diện

### **Giao Diện Theo Phòng**
Mỗi "Room Card" hiển thị:
- **Tên phòng & icon**
- **Nhiệt độ, độ ẩm**
- **Năng lượng tiêu thụ (W, V, CO₂)**
- **Danh sách thiết bị theo nhóm**, ví dụ:
  - Nhóm công tắc đèn
  - Nhóm máy lạnh
  - Nhóm thiết bị khác

---

## 📦 API Giả Lập (Mock Data)

### **Danh sách phòng**

```json
[
  {
    "id": "bedroom",
    "name": "Phòng ngủ",
    "icon": "🛏️",
    "temperature": 25,
    "humidity": 60,
    "energy": {
      "power": 130,
      "voltage": 220,
      "co2": 18
    }
  },
  {
    "id": "living-room",
    "name": "Phòng khách",
    "icon": "🛋️",
    "temperature": 27,
    "humidity": 55,
    "energy": {
      "power": 180,
      "voltage": 220,
      "co2": 22
    }
  }
]
```

### **Thiết bị trong từng phòng (theo group)**

```json
{
  "bedroom": {
    "lights": [
      {
        "id": "light-1",
        "name": "Đèn ngủ",
        "type": "light",
        "status": "on",
        "brightness": 80
      },
      {
        "id": "light-2",
        "name": "Đèn trần",
        "type": "light",
        "status": "off",
        "brightness": 0
      }
    ],
    "acs": [
      {
        "id": "ac-1",
        "name": "Máy lạnh",
        "type": "ac",
        "status": "on",
        "mode": "cool",
        "fan": "medium",
        "temperature": 24
      }
    ],
    "others": [
      {
        "id": "tv-1",
        "name": "TV Samsung",
        "type": "tv",
        "status": "off"
      }
    ]
  }
}
```

---

## 🧩 Component Chính

### **RoomCard.tsx**
- Hiển thị thông tin tổng quan
- Load danh sách thiết bị từ API theo từng room

### **DeviceGroup.tsx**
- Chia các thiết bị theo nhóm: lights, acs, others
- Map qua từng nhóm để render đúng card tương ứng

### **Device Card**
- Gồm:
  - LightCard: Có brightness
  - ACCard: Có fan mode, temperature
  - OtherCard: Chỉ toggle bật tắt

---

## 📝 Ghi Chú

- Không có nút “thêm thiết bị”
- Danh sách thiết bị **được load từ API**
- Giao diện vẫn giữ layout gọn gàng theo từng phòng
