
# 🏘️ Tính năng: Thêm Phòng và Thiết Bị vào Phòng trong Trang Settings

## 📌 Mục tiêu
Cho phép người dùng thêm mới **phòng** và thêm **thiết bị** (đèn, cảm biến, camera, scene) vào từng phòng trong trang **Settings**. Giao diện phải đồng nhất với thiết kế hiện tại của dashboard: hiện đại, dễ thương, responsive và có hỗ trợ theme sáng/tối.

---

## 🖼️ Giao diện (UI Overview)

### 🧩 Khu vực: Room Management Section trong `/pages/Settings.tsx`
- Thêm một **Accordion / Expandable Section** có tiêu đề:  
  ✅ `Room Management` (quản lý phòng)

### 🏠 UI "Thêm Phòng Mới"
- Input: `Tên phòng` (placeholder: "Nhập tên phòng...")
- Input: `Chọn icon` (dropdown hoặc icon picker - có thể dùng emoji đơn giản như 🛏, 🍽, 🛁, 📚,...)
- Button: `[+] Thêm phòng`
- Khi thêm xong → cập nhật danh sách phòng ngay.

### 🔌 UI "Thêm Thiết Bị Vào Phòng"
- Dropdown 1: Chọn `Phòng` từ danh sách đã có
- Dropdown 2: Chọn `Loại thiết bị` (Light, Sensor, Camera, Scene)
- Input: `Tên thiết bị`
- Button: `[+] Thêm thiết bị`
- Danh sách thiết bị trong từng phòng hiển thị dạng `Card` nhỏ theo loại thiết bị, có nút "🗑 Xóa".

---

## 🧠 Luồng hoạt động (UX Flow)

### ✅ Tạo phòng mới
1. Người dùng nhập tên phòng và chọn icon → bấm `Thêm phòng`.
2. Phòng mới hiển thị ngay trong danh sách (có thể hiển thị ở Dashboard nếu cần).
3. Dữ liệu lưu vào state `rooms[]` trong `useRoomManagement.ts`.

### ✅ Thêm thiết bị vào phòng
1. Người dùng chọn phòng → chọn loại thiết bị → nhập tên thiết bị → bấm `Thêm thiết bị`.
2. Thiết bị sẽ được add vào mảng `room.devices[]` tương ứng.
3. Hiển thị thiết bị đó bằng mini-card (icon + tên + trạng thái).
4. Có thể xóa thiết bị khỏi phòng bằng nút 🗑

---

## 🛠️ File cần chỉnh sửa / thêm

### 1. `src/pages/Settings.tsx`
- Thêm khu vực `RoomManagementSection` vào giao diện

### 2. `src/components/RoomManagementSection.tsx`
Tạo component mới chứa toàn bộ logic UI cho phần quản lý phòng:

```tsx
// Gồm form tạo phòng và form thêm thiết bị
// Dùng useRoomManagement() để fetch/update room data
```

### 3. `src/hooks/useRoomManagement.ts`
Hook quản lý danh sách phòng:
```ts
const [rooms, setRooms] = useState<Room[]>([]);

function addRoom(name: string, icon: string): void
function addDeviceToRoom(roomId: string, device: Device): void
function removeDeviceFromRoom(roomId: string, deviceId: string): void
```

### 4. `src/types/index.ts`
Thêm hoặc cập nhật:
```ts
type Room = {
  id: string;
  name: string;
  icon: string;
  devices: Device[];
}

type Device = {
  id: string;
  type: 'light' | 'sensor' | 'camera' | 'scene';
  name: string;
}
```

---

## 📦 Dữ liệu mẫu (Mock)
```ts
const mockRooms: Room[] = [
  {
    id: 'livingroom',
    name: 'Phòng khách',
    icon: '🛋',
    devices: [
      { id: 'light-1', type: 'light', name: 'Đèn chính' },
      { id: 'sensor-1', type: 'sensor', name: 'Nhiệt độ' }
    ]
  },
  {
    id: 'bedroom',
    name: 'Phòng ngủ',
    icon: '🛏',
    devices: []
  }
];
```

---

## 💡 Tips cho GitHub Copilot

- **Mỗi form** phải sử dụng **React controlled components**
- **Form validation đơn giản** (không để tên trống)
- Nên sử dụng `uuid()` để tạo `id` cho phòng/thiết bị
- Giao diện sử dụng các component có sẵn (`Card`, `Button`, `Input`) để đồng bộ với thiết kế dashboard

---

## ✅ Output mong muốn

- Giao diện Settings có 2 form:
  - [x] Thêm phòng
  - [x] Thêm thiết bị vào phòng
- Danh sách thiết bị của từng phòng hiển thị đẹp mắt
- Có thể thao tác `thêm`, `xóa` thiết bị/phòng
- Dữ liệu dùng mock nhưng chuẩn bị sẵn để gọi real API sau

---

## 🚀 Mở rộng sau này

- Cho phép sửa tên phòng hoặc icon
- Cho phép kéo thả thiết bị giữa các phòng
- Giao diện kéo card cực xịn kiểu drag-and-drop

---

**Tóm lại:** Đây là một tính năng quản lý nâng cao trong trang Settings nhưng vẫn rất dễ dùng. Toàn bộ logic nên được viết trong `useRoomManagement.ts` và hiển thị trong `RoomManagementSection.tsx`.

> ✨ Giao diện phải cute, nhẹ nhàng và vui tươi như em bé vậy đó 🩷
