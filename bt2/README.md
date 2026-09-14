# Xây dựng Phân hệ Quyết toán Đơn hàng Đa tầng ShopeeFood

## 1. Mục tiêu

Xây dựng chương trình JavaScript xử lý quyết toán đơn hàng ShopeeFood từ dữ liệu đầu vào dạng chuỗi.

Chương trình thực hiện:

* Chuyển đổi dữ liệu chuỗi sang kiểu số.
* Kiểm tra dữ liệu không hợp lệ và giá trị `NaN`.
* Kiểm tra điều kiện đơn hàng hợp lệ.
* Tính tổng tiền món ăn.
* Tính cước vận chuyển theo khoảng cách.
* Tính phụ phí cao điểm.
* Kiểm tra và áp dụng ưu đãi Freeship.
* Quyết toán tổng số tiền thanh toán.
* Nếu đơn hàng không hợp lệ thì số tiền thanh toán bằng `0 VNĐ`.

Chương trình được xây dựng không sử dụng cấu trúc rẽ nhánh.

---

# 2. Các quy tắc nghiệp vụ

## 2.1. Dữ liệu đầu vào

| Dữ liệu             |        Giá trị mẫu | Kiểu dữ liệu ban đầu |
| ------------------- | -----------------: | -------------------- |
| Đơn giá món         |          `"50000"` | String               |
| Số lượng            |              `"2"` | String               |
| Khoảng cách         |            `"4.5"` | String               |
| Khung giờ           |             `"12"` | String               |
| Mã voucher          | `"FREESHIP_EXTRA"` | String               |
| Tồn kho             |               `10` | Number               |
| Trạng thái cửa hàng |             `true` | Boolean              |

---

# 3. Chuyển đổi dữ liệu

Dữ liệu từ thiết bị di động được nhận dưới dạng chuỗi nên cần chuyển đổi sang số:

```javascript
const unitPrice = Number(rawUnitPrice);
const quantity = Number(rawQuantity);
const distanceKm = Number(rawDistanceKm);
const orderHour = Number(rawOrderHour);
```

Ví dụ:

```text
"50000" → 50000
"2"     → 2
"4.5"   → 4.5
"12"    → 12
```

Việc chuyển đổi giúp các phép tính số học được thực hiện chính xác.

---

# 4. Kiểm tra NaN

Không sử dụng hàm để kiểm tra `NaN`.

JavaScript có đặc điểm:

```text
NaN !== NaN
```

Vì vậy chương trình sử dụng:

```javascript
const isUnitPriceNaN = unitPrice !== unitPrice;
const isQuantityNaN = quantity !== quantity;
const isDistanceNaN = distanceKm !== distanceKm;
const isOrderHourNaN = orderHour !== orderHour;
```

Nếu biểu thức trả về `true` thì giá trị tương ứng là `NaN`.

---

# 5. Kiểm tra đơn hàng hợp lệ

Một đơn hàng hợp lệ phải thỏa mãn đồng thời:

* Cửa hàng đang mở.
* Số lượng lớn hơn `0`.
* Số lượng là số nguyên.
* Số lượng không vượt quá tồn kho.
* Khoảng cách từ `0` đến `15 km`.
* Khung giờ từ `0` đến `23`.
* Đơn giá không âm.
* Không có dữ liệu nào bị chuyển thành `NaN`.

Sử dụng toán tử `&&`:

```javascript
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
```

Toán tử `&&` thực hiện kiểm tra theo logic ngắn mạch. Chỉ cần một điều kiện sai thì toàn bộ biểu thức trả về `false`.

---

# 6. Tính tổng tiền món

Công thức:

```text
Tiền món = Đơn giá × Số lượng
```

Code:

```javascript
const foodTotal = unitPrice * quantity;
```

Với dữ liệu mẫu:

```text
50.000 × 2 = 100.000 VNĐ
```

---

# 7. Tính cước vận chuyển

Quy tắc:

* Km đầu tiên: `16.000 VNĐ`.
* Mỗi km tiếp theo: thêm `4.000 VNĐ`.

Số km vượt quá km đầu tiên:

```javascript
const extraDistance = (distanceKm > 1) * (distanceKm - 1);
```

Do JavaScript chuyển:

```text
true → 1
false → 0
```

nên không cần sử dụng `if-else`.

Cước vận chuyển:

```javascript
const baseDeliveryFee = 16000 + extraDistance * 4000;
```

Ví dụ với `4.5 km`:

```text
Km đầu tiên = 16.000 VNĐ

Km tiếp theo = 4.5 - 1
             = 3.5 km

Phí thêm = 3.5 × 4.000
         = 14.000 VNĐ

Tổng cước = 16.000 + 14.000
          = 30.000 VNĐ
```

---

# 8. Tính phụ phí cao điểm

Khung giờ cao điểm:

* Buổi trưa: `11h - 13h`.
* Buổi tối: `18h - 20h`.

Code:

```javascript
const isLunchPeak = orderHour >= 11 && orderHour <= 13;
const isDinnerPeak = orderHour >= 18 && orderHour <= 20;
const isPeakHour = isLunchPeak || isDinnerPeak;
```

Sau đó:

```javascript
const peakFee = isPeakHour * 10000;
```

Nếu là giờ cao điểm:

```text
true × 10.000 = 10.000 VNĐ
```

Nếu không phải giờ cao điểm:

```text
false × 10.000 = 0 VNĐ
```

---

# 9. Tính ưu đãi Freeship

Khách hàng được giảm `15.000 VNĐ` phí vận chuyển khi đồng thời thỏa mãn:

```text
Tiền món >= 100.000 VNĐ
Khoảng cách <= 5 km
Mã voucher = "FREESHIP_EXTRA"
```

Code:

```javascript
const isEligibleFreeship =
    foodTotal >= 100000 &&
    distanceKm <= 5 &&
    voucherCode === "FREESHIP_EXTRA";
```

Tiền giảm:

```javascript
const deliveryDiscount = isEligibleFreeship * 15000;
```

Kết quả:

```text
Đủ điều kiện → 15.000 VNĐ
Không đủ điều kiện → 0 VNĐ
```

---

# 10. Quyết toán cuối cùng

Công thức:

```text
Tổng thanh toán
= Tiền món
+ Cước vận chuyển
+ Phụ phí cao điểm
- Giảm giá vận chuyển
```

Code:

```javascript
const validPayment =
    foodTotal +
    baseDeliveryFee +
    peakFee -
    deliveryDiscount;
```

Tuy nhiên, nếu đơn hàng không hợp lệ thì phải trả về `0 VNĐ`.

Không sử dụng `if-else`, chương trình sử dụng logic ngắn mạch:

```javascript
const finalPayment = isValidOrder && validPayment || 0;
```

### Trường hợp đơn hợp lệ

```text
true && validPayment
→ validPayment

validPayment || 0
→ validPayment
```

### Trường hợp đơn không hợp lệ

```text
false && validPayment
→ false

false || 0
→ 0
```

Như vậy:

```text
Đơn hợp lệ → tính tiền
Đơn không hợp lệ → 0 VNĐ
```

---

# 11. Kết quả với dữ liệu mẫu

Dữ liệu:

```text
Đơn giá: 50.000 VNĐ
Số lượng: 2
Khoảng cách: 4.5 km
Khung giờ: 12h
Voucher: FREESHIP_EXTRA
Tồn kho: 10
Cửa hàng: đang mở
```

Tính toán:

```text
Tiền món:
50.000 × 2 = 100.000 VNĐ

Cước vận chuyển:
16.000 + (4.5 - 1) × 4.000
= 30.000 VNĐ

Phụ phí cao điểm:
10.000 VNĐ

Giảm Freeship:
15.000 VNĐ
```

Tổng thanh toán:

```text
100.000 + 30.000 + 10.000 - 15.000
= 125.000 VNĐ
```

Kết quả:

```text
Đơn hợp lệ: true
Đủ điều kiện Freeship: true
TỔNG THANH TOÁN: 125000 VNĐ
```

---

# 12. Ý tưởng triển khai Logic ngắn mạch

Chương trình không sử dụng:

* `if`
* `else`
* `switch`
* Toán tử ba ngôi `? :`
* Vòng lặp
* Hàm
* Mảng
* Đối tượng

Thay vào đó sử dụng:

### Toán tử `&&`

Dùng để yêu cầu nhiều điều kiện phải đồng thời đúng:

```javascript
const isValidOrder =
    isStoreOpen &&
    quantity > 0 &&
    quantity <= stockQuantity;
```

### Toán tử `||`

Dùng để cung cấp giá trị thay thế:

```javascript
const finalPayment = isValidOrder && validPayment || 0;
```

### Boolean chuyển thành Number

JavaScript cho phép:

```text
true × 10000
→ 10000

false × 10000
→ 0
```

Nhờ đó có thể xử lý phụ phí và giảm giá mà không cần `if-else`.

### Toán tử `&&` kết hợp phép nhân

Ví dụ:

```javascript
const peakFee = isPeakHour * 10000;
```

Biến Boolean quyết định trực tiếp số tiền cần cộng.

---

# 13. Kết luận

Phân hệ quyết toán sử dụng các phép toán số học và logic ngắn mạch để xử lý toàn bộ nghiệp vụ mà không cần cấu trúc rẽ nhánh.

Cách triển khai này đảm bảo:

* Dữ liệu chuỗi được chuyển sang số trước khi tính toán.
* Kiểm tra được dữ liệu `NaN`.
* Kiểm tra đầy đủ điều kiện đơn hàng.
* Tính cước vận chuyển theo khoảng cách.
* Tự động áp dụng phụ phí cao điểm.
* Tự động áp dụng ưu đãi Freeship.
* Đơn không hợp lệ được quyết toán về `0 VNĐ`.
* Không sử dụng các cấu trúc bị cấm trong đề bài.
