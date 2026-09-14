"use strict";

// ================================
// 1. DỮ LIỆU ĐẦU VÀO
// ================================

const rawUnitPrice = "50000";
const rawQuantity = "2";
const rawDistanceKm = "4.5";
const rawOrderHour = "12";
const voucherCode = "FREESHIP_EXTRA";
const stockQuantity = 10;
const isStoreOpen = true;

// ================================
// 2. CHUYỂN ĐỔI DỮ LIỆU
// ================================

const unitPrice = Number(rawUnitPrice);
const quantity = Number(rawQuantity);
const distanceKm = Number(rawDistanceKm);
const orderHour = Number(rawOrderHour);

// ================================
// 3. KIỂM TRA DỮ LIỆU NaN
// NaN là giá trị duy nhất không bằng chính nó
// ================================

const isUnitPriceNaN = unitPrice !== unitPrice;
const isQuantityNaN = quantity !== quantity;
const isDistanceNaN = distanceKm !== distanceKm;
const isOrderHourNaN = orderHour !== orderHour;

// ================================
// 4. KIỂM TRA ĐƠN HỢP LỆ
// ================================

const isValidOrder =
    isStoreOpen &&
    quantity > 0 &&
    quantity % 1 === 0 &&
    quantity <= stockQuantity &&
    distanceKm >= 0 &&
    distanceKm <= 15 &&
    orderHour >= 0 &&
    orderHour <= 23 &&
    unitPrice >= 0 &&
    !isUnitPriceNaN &&
    !isQuantityNaN &&
    !isDistanceNaN &&
    !isOrderHourNaN;

// ================================
// 5. TÍNH TỔNG TIỀN MÓN
// ================================

const foodTotal = unitPrice * quantity;

// ================================
// 6. TÍNH CƯỚC VẬN CHUYỂN CƠ BẢN
// 16.000 VNĐ cho km đầu tiên
// Mỗi km tiếp theo: +4.000 VNĐ
// ================================

const extraDistance = (distanceKm > 1) * (distanceKm - 1);
const baseDeliveryFee = 16000 + extraDistance * 4000;

// ================================
// 7. TÍNH PHỤ PHÍ CAO ĐIỂM
// Trưa: 11h - 13h
// Tối: 18h - 20h
// ================================

const isLunchPeak = orderHour >= 11 && orderHour <= 13;
const isDinnerPeak = orderHour >= 18 && orderHour <= 20;
const isPeakHour = isLunchPeak || isDinnerPeak;

const peakFee = isPeakHour * 10000;

// ================================
// 8. TÍNH GIẢM GIÁ FREESHIP
// Điều kiện:
// - Tiền món >= 100.000
// - Khoảng cách <= 5 km
// - Mã voucher chính xác
// ================================

const isEligibleFreeship =
    foodTotal >= 100000 &&
    distanceKm <= 5 &&
    voucherCode === "FREESHIP_EXTRA";

const deliveryDiscount = isEligibleFreeship * 15000;

// ================================
// 9. TÍNH TỔNG THANH TOÁN
// Nếu hợp lệ: tính tiền bình thường
// Nếu không hợp lệ: kết quả = 0
// ================================

const validPayment =
    foodTotal +
    baseDeliveryFee +
    peakFee -
    deliveryDiscount;

const finalPayment = isValidOrder && validPayment || 0;

// ================================
// 10. XUẤT HÓA ĐƠN
// ================================

console.log(`
========== HÓA ĐƠN QUYẾT TOÁN ==========

Đơn giá món: ${unitPrice.toLocaleString("vi-VN")} VNĐ
Số lượng: ${quantity}
Khoảng cách: ${distanceKm} km
Khung giờ đặt: ${orderHour}h
Tồn kho: ${stockQuantity}
Cửa hàng mở cửa: ${isStoreOpen}

------------------------------------------
Tiền món: ${foodTotal.toLocaleString("vi-VN")} VNĐ
Cước vận chuyển cơ bản: ${baseDeliveryFee.toLocaleString("vi-VN")} VNĐ
Phụ phí cao điểm: ${peakFee.toLocaleString("vi-VN")} VNĐ
Giảm giá Freeship: ${deliveryDiscount.toLocaleString("vi-VN")} VNĐ

Đơn hợp lệ: ${isValidOrder}
Đủ điều kiện Freeship: ${isEligibleFreeship}

------------------------------------------
TỔNG THANH TOÁN: ${finalPayment.toLocaleString("vi-VN")} VNĐ
==========================================
`);