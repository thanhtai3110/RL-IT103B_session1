"use strict";

// ================================
// 1. DỮ LIỆU ĐẦU VÀO
// ================================

const rawFoodTotal = "120000";
const rawDistanceKm = "4.5";
const rawVoucherCode = "GIAM20K";
const voucherUsed = rawVoucherCode;

// ================================
// 2. CHUYỂN ĐỔI DỮ LIỆU SỐ
// ================================

const foodTotal = Number(rawFoodTotal);
const distanceKm = Number(rawDistanceKm);

// ================================
// 3. KIỂM TRA DỮ LIỆU KHÔNG HỢP LỆ
// ================================

const isFoodTotalNaN = foodTotal !== foodTotal;
const isDistanceNaN = distanceKm !== distanceKm;

const isValidData =
    !isFoodTotalNaN &&
    !isDistanceNaN;

// ================================
// 4. CỜ HIỆU CHO VOUCHER GIẢM 20K
// Điều kiện:
// - Mã chính xác là GIAM20K
// - Tiền món >= 100.000 VNĐ
// ================================

const isGiam20kCode = voucherUsed === "GIAM20K";

const isEligibleGiam20k =
    isValidData &&
    isGiam20kCode &&
    foodTotal >= 100000;

// ================================
// 5. CỜ HIỆU CHO VOUCHER FREESHIP
// Điều kiện:
// - Mã chính xác là FREESHIP
// - Khoảng cách <= 5 km
// ================================

const isFreeshipCode = voucherUsed === "FREESHIP";

const isEligibleFreeship =
    isValidData &&
    isFreeshipCode &&
    distanceKm <= 5;

// ================================
// 6. XÁC ĐỊNH MỨC GIẢM
// Chỉ được hưởng tối đa 1 voucher
// ================================

const giam20kDiscount = isEligibleGiam20k * 20000;
const freeshipDiscount = isEligibleFreeship * 15000;

const totalDiscount =
    giam20kDiscount + freeshipDiscount;

// ================================
// 7. KIỂM TRA CÓ VOUCHER HỢP LỆ
// ================================

const hasValidVoucher =
    isEligibleGiam20k ||
    isEligibleFreeship;

// ================================
// 8. XUẤT KẾT QUẢ
// ================================

console.log(`
========== PHÂN TÍCH VOUCHER ==========

Tiền món: ${foodTotal} VNĐ
Khoảng cách: ${distanceKm} km
Mã voucher: ${voucherUsed}

----------------------------------------
GIAM20K hợp lệ: ${isEligibleGiam20k}
FREESHIP hợp lệ: ${isEligibleFreeship}

Có voucher hợp lệ: ${hasValidVoucher}
Giảm giá: ${totalDiscount} VNĐ

========================================
`);