// Dữ liệu tiếp nhận từ biểu mẫu đơn hàng ShopeeFood
const customerName = "Nguyen Thi Mai";
const foodItemName = "Com Tam Suon Bi Cha";
const rawFoodPrice = "55000";
const rawToppingPrice = "15000";
const rawDistanceKm = "3.5";
const isStoreOpen = true;
const isUserBlocked = false;

// Phí giao hàng tiêu chuẩn và voucher ưu đãi
const deliveryFee = 20000;
const voucherDiscount = 15000;

// Chuyển dữ liệu giá từ chuỗi sang số
const foodPrice = Number(rawFoodPrice);
const toppingPrice = Number(rawToppingPrice);
const distanceKm = Number(rawDistanceKm);

// 1. Tính tổng giá trị món ăn
const foodTotal = foodPrice + toppingPrice;

// 2. Thẩm định điều kiện miễn phí giao hàng (Freeship)
const isEligibleFreeship =
  foodTotal >= 60000 && distanceKm <= 5 && isStoreOpen && !isUserBlocked;

// 3. Tính toán tổng số tiền thanh toán cuối cùng
const finalPayment = foodTotal + deliveryFee - voucherDiscount;

// 4. Xuất kết quả kiểm tra ra bảng điều khiển
console.log(`Khách hàng: ${customerName}`);
console.log(`Món ăn đặt: ${foodItemName}`);
console.log(`Tổng tiền món ăn: ${foodTotal} VND`);
console.log(`Đủ điều kiện Freeship: ${isEligibleFreeship}`);
console.log(`Số tiền thanh toán thực tế: ${finalPayment} VND`);