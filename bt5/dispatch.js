"use strict";

// ===============================
// 1. THÔNG TIN TÀI XẾ
// ===============================

const driverName = "Nguyen Van An";

const distanceToStore = 2.5;
const starRating = 4.8;
const currentActiveOrders = 1;
const isOnline = true;

// ===============================
// 2. GIỚI HẠN NGHIỆP VỤ
// ===============================

const maxServiceDistance = 5;
const minStarRating = 4.5;
const maxActiveOrders = 3;

// ===============================
// 3. KIỂM TRA ĐIỀU KIỆN
// ===============================

// Khoảng cách phải từ 0 đến 5 km
const isDistanceValid =
    distanceToStore >= 0 &&
    distanceToStore <= maxServiceDistance;

// Điểm sao phải từ 4.5 đến 5
const isRatingValid =
    starRating >= minStarRating &&
    starRating <= 5;

// Số đơn đang mang phải từ 0 đến 3
const isActiveOrdersValid =
    currentActiveOrders >= 0 &&
    currentActiveOrders <= maxActiveOrders;

// ===============================
// 4. XÁC ĐỊNH TÀI XẾ CÓ ĐỦ ĐIỀU KIỆN
// ===============================

const isEligible =
    isOnline &&
    isDistanceValid &&
    isRatingValid &&
    isActiveOrdersValid;

// ===============================
// 5. TÍNH ĐIỂM ƯU TIÊN
// ===============================

// Điểm sao chiếm 60%
const ratingScore =
    (starRating / 5) * 60;

// Điểm khoảng cách chiếm 40%
// Càng gần quán thì điểm càng cao
const distanceScore =
    (1 - distanceToStore / maxServiceDistance) * 40;

// Nếu đủ điều kiện thì lấy tổng điểm.
// Nếu không đủ điều kiện thì điểm = 0.
const priorityScore =
    isEligible * (ratingScore + distanceScore);

// ===============================
// 6. XÁC ĐỊNH TRẠNG THÁI
// ===============================

const dispatchStatus =
    (isEligible && "ĐỦ ĐIỀU KIỆN NHẬN ĐƠN") ||
    "KHÔNG ĐỦ ĐIỀU KIỆN";

// ===============================
// 7. XUẤT KẾT QUẢ
// ===============================

console.log(`
╔══════════════════════════════════════════╗
║         DRIVER MATCHING ENGINE           ║
╠══════════════════════════════════════════╣
║ Tài xế: ${driverName}
║ Trạng thái Online: ${isOnline}
║ Khoảng cách tới quán: ${distanceToStore} km
║ Điểm sao tín nhiệm: ${starRating}
║ Đơn đang vận chuyển: ${currentActiveOrders}
╠══════════════════════════════════════════╣
║ Khoảng cách hợp lệ: ${isDistanceValid}
║ Điểm sao hợp lệ: ${isRatingValid}
║ Số đơn hợp lệ: ${isActiveOrdersValid}
╠══════════════════════════════════════════╣
║ KẾT QUẢ: ${dispatchStatus}
║ Điểm sao: ${ratingScore}
║ Điểm khoảng cách: ${distanceScore}
║ ĐIỂM ƯU TIÊN: ${priorityScore}
╚══════════════════════════════════════════╝
`);