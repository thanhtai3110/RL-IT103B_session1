"use strict";

// ================================
// 1. DỮ LIỆU ĐẦU VÀO
// ================================

const donGiaChuoi = "50000";
const soLuongChuoi = "2";
const khoangCachChuoi = "4";
const quanMoCua = true;

// ================================
// 2. CHUẨN HÓA DỮ LIỆU
// ================================

const donGia = Number(donGiaChuoi);
const soLuong = Number(soLuongChuoi);
const khoangCach = Number(khoangCachChuoi);

// ================================
// 3. TÍNH TIỀN MÓN ĂN
// ================================

const tienMon = donGia * soLuong;

// ================================
// 4. TÍNH CƯỚC GIAO HÀNG
// ================================

const cuocGiaoHang = 15000 + (4000 * khoangCach);

// ================================
// 5. KIỂM TRA ĐIỀU KIỆN FREESHIP
// ================================

const dieuKienFreeship =
    (tienMon >= 100000) &&
    (khoangCach <= 5) &&
    quanMoCua;

const giamCuoc = dieuKienFreeship * 15000;

// ================================
// 6. TÍNH TIỀN THANH TOÁN
// ================================

const tongTienTruocThanhToan =
    tienMon + cuocGiaoHang - giamCuoc;

const thanhToan =
    quanMoCua * tongTienTruocThanhToan;

// ================================
// 7. XUẤT HÓA ĐƠN
// ================================

console.log(`
========================================
        HÓA ĐƠN SHOPEEFOOD
========================================
Đơn giá món       : ${donGia.toLocaleString("vi-VN")} VNĐ
Số lượng          : ${soLuong}
Tiền món          : ${tienMon.toLocaleString("vi-VN")} VNĐ

Khoảng cách       : ${khoangCach} km
Cước giao hàng    : ${cuocGiaoHang.toLocaleString("vi-VN")} VNĐ
Giảm Freeship     : ${giamCuoc.toLocaleString("vi-VN")} VNĐ

Tổng thanh toán   : ${thanhToan.toLocaleString("vi-VN")} VNĐ
========================================
`);