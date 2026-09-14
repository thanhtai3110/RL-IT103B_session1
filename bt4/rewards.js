"use strict";

// ========================================
// 1. DỮ LIỆU ĐẦU VÀO
// ========================================

const customerName = "Nguyen Thi Mai";
const totalSpending = 8500000;
const completedOrders = 22;
const isBirthdayMonth = true;
const isAccountLocked = false;

// ========================================
// 2. KIỂM TRA ĐIỀU KIỆN HỢP LỆ
// ========================================

const isSpendingValid = totalSpending >= 0;
const isOrderCountValid = completedOrders >= 0;
const isAccountActive = !isAccountLocked;

const isEligible =
    isSpendingValid &&
    isOrderCountValid &&
    isAccountActive;

// ========================================
// 3. PHÂN HẠNG
// ========================================

const isDiamond =
    isEligible &&
    totalSpending >= 8000000 &&
    completedOrders >= 20;

const isGold =
    isEligible &&
    !isDiamond &&
    totalSpending >= 3000000 &&
    completedOrders >= 10;

const isSilver =
    isEligible &&
    !isDiamond &&
    !isGold;

// ========================================
// 4. TỶ LỆ HOÀN XU THEO HẠNG
// ========================================

const diamondRate = isDiamond * 0.05;
const goldRate = isGold * 0.02;
const silverRate = isSilver * 0.01;

const baseCashbackRate =
    diamondRate +
    goldRate +
    silverRate;

// ========================================
// 5. NHÂN ĐÔI TRONG THÁNG SINH NHẬT
// ========================================

const birthdayMultiplier =
    1 + isBirthdayMonth;

const finalCashbackRate =
    baseCashbackRate * birthdayMultiplier;

// ========================================
// 6. TÍNH XU TÍCH LŨY
// ========================================

const cashbackCoins =
    isEligible *
    totalSpending *
    finalCashbackRate;

// ========================================
// 7. XÁC ĐỊNH TÊN HẠNG
// ========================================

const memberRank =
    (isDiamond && "KIM CƯƠNG") ||
    (isGold && "VÀNG") ||
    (isSilver && "BẠC") ||
    "KHÔNG XẾP HẠNG";

// ========================================
// 8. XUẤT THẺ THÀNH VIÊN
// ========================================

console.log(`
╔══════════════════════════════════════╗
║       SHOPEEFOOD REWARDS CARD       ║
╠══════════════════════════════════════╣
║ Khách hàng: ${customerName}
║ Chi tiêu: ${totalSpending} VNĐ
║ Số đơn hoàn thành: ${completedOrders}
║ Tháng sinh nhật: ${isBirthdayMonth}
║ Tài khoản bị khóa: ${isAccountLocked}
╠══════════════════════════════════════╣
║ Hạng thành viên: ${memberRank}
║ Tỷ lệ hoàn xu: ${finalCashbackRate * 100}%
║ Xu tích lũy: ${cashbackCoins} Xu
║ Đơn đủ điều kiện: ${isEligible}
╚══════════════════════════════════════╝
`);