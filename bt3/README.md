# Phân tích Trade-off: Biểu thức Lồng nhau vs Cờ hiệu Boolean

## 1. Mục tiêu

Phân tích hai phương pháp kiểm tra tính hợp lệ của mã khuyến mãi trong hệ thống ShopeeFood:

1. Nested Logic Expression - Biểu thức logic lồng nhau.
2. Tiered Boolean Flags - Chuỗi cờ hiệu Boolean phân tầng.

Sau khi phân tích, lựa chọn phương pháp phù hợp để triển khai trong file `voucherAnalysis.js`.

Chương trình phải xử lý các điều kiện voucher mà không sử dụng:

* `if`
* `else`
* `switch`
* Toán tử ba ngôi `? :`
* Vòng lặp
* Hàm
* Mảng
* Đối tượng

---

# 2. Phân tích bài toán

Hệ thống có hai mã khuyến mãi:

### Voucher GIAM20K

Giảm:

```text
20.000 VNĐ
```

Điều kiện:

```text
Mã voucher = "GIAM20K"
VÀ
Tiền món >= 100.000 VNĐ
```

### Voucher FREESHIP

Giảm:

```text
15.000 VNĐ phí vận chuyển
```

Điều kiện:

```text
Mã voucher = "FREESHIP"
VÀ
Khoảng cách <= 5 km
```

Một đơn hàng chỉ được hưởng tối đa một ưu đãi.

---

# 3. Hướng tiếp cận 1: Nested Logic Expression

Với phương pháp này, các điều kiện được lồng trực tiếp vào biểu thức tính toán.

Ví dụ ý tưởng:

```javascript
const discount =
    (voucherCode === "GIAM20K" && foodTotal >= 100000) * 20000 +
    (voucherCode === "FREESHIP" && distanceKm <= 5) * 15000;
```

Ưu điểm là code ngắn và trực tiếp.

Tuy nhiên, khi số lượng voucher tăng lên, biểu thức sẽ ngày càng dài và khó đọc.

Ví dụ nếu hệ thống có thêm nhiều mã:

```text
GIAM20K
FREESHIP
GIAM30K
GIAM50K
FREESHIP20
NEWUSER
...
```

thì một biểu thức duy nhất sẽ trở nên phức tạp.

---

# 4. Hướng tiếp cận 2: Tiered Boolean Flags

Với phương pháp này, mỗi điều kiện được tách thành một biến Boolean riêng.

Ví dụ:

```javascript
const isGiam20kCode = voucherUsed === "GIAM20K";

const isEligibleGiam20k =
    isValidData &&
    isGiam20kCode &&
    foodTotal >= 100000;
```

Voucher FREESHIP được kiểm tra độc lập:

```javascript
const isFreeshipCode = voucherUsed === "FREESHIP";

const isEligibleFreeship =
    isValidData &&
    isFreeshipCode &&
    distanceKm <= 5;
```

Sau đó mới tổng hợp:

```javascript
const giam20kDiscount = isEligibleGiam20k * 20000;
const freeshipDiscount = isEligibleFreeship * 15000;

const totalDiscount =
    giam20kDiscount + freeshipDiscount;
```

---

# 5. Bảng phân tích Trade-off

| Tiêu chí                         | Nested Logic Expression                                                     | Tiered Boolean Flags                           |
| -------------------------------- | --------------------------------------------------------------------------- | ---------------------------------------------- |
| Độ phức tạp nhận thức            | Cao khi có nhiều điều kiện lồng nhau                                        | Thấp hơn vì mỗi điều kiện được tách riêng      |
| Khả năng đọc hiểu                | Khó đọc khi biểu thức dài                                                   | Dễ đọc, từng biến thể hiện rõ ý nghĩa          |
| Khả năng mở rộng                 | Kém hơn khi thêm nhiều voucher                                              | Tốt hơn, có thể thêm cờ kiểm tra riêng         |
| Khả năng kiểm thử                | Khó xác định chính xác điều kiện nào sai                                    | Dễ kiểm tra từng cờ Boolean                    |
| Theo dõi lỗi                     | Khó tìm nguyên nhân khi biểu thức sai                                       | Dễ xác định voucher hoặc điều kiện bị sai      |
| Nguy cơ lỗi ép kiểu              | Có thể tăng khi nhiều phép tính Boolean và số được trộn trong một biểu thức | Thấp hơn vì ép kiểu được kiểm soát ở từng bước |
| Bảo trì                          | Khó bảo trì khi nghiệp vụ phát triển                                        | Dễ bảo trì và thay đổi                         |
| Độ ngắn của code                 | Ngắn hơn                                                                    | Dài hơn nhưng rõ ràng hơn                      |
| Phù hợp với nghiệp vụ nhiều tầng | Không tối ưu                                                                | Phù hợp                                        |

---

# 6. Phân tích nguy cơ ép kiểu

Dữ liệu từ thiết bị di động có thể được nhận dưới dạng chuỗi.

Ví dụ:

```javascript
const rawFoodTotal = "120000";
```

Nếu sử dụng trực tiếp:

```javascript
rawFoodTotal >= 100000
```

JavaScript có thể thực hiện ép kiểu ngầm khi so sánh.

Tuy nhiên, không nên phụ thuộc quá nhiều vào ép kiểu ngầm vì có thể gây khó kiểm soát dữ liệu.

Thay vào đó, chương trình chủ động chuyển đổi:

```javascript
const foodTotal = Number(rawFoodTotal);
```

Sau đó mới thực hiện phép tính và kiểm tra.

---

# 7. Phòng ngừa gian lận mã khuyến mãi

Mã voucher phải được so sánh chính xác:

```javascript
voucherUsed === "GIAM20K"
```

hoặc:

```javascript
voucherUsed === "FREESHIP"
```

Không sử dụng các phép so sánh lỏng lẻo để tránh trường hợp dữ liệu không đúng kiểu vẫn được chấp nhận.

Ví dụ không nên sử dụng:

```javascript
voucherUsed == "GIAM20K"
```

Việc sử dụng `===` giúp yêu cầu cả giá trị và kiểu dữ liệu phải phù hợp.

Ngoài ra, hệ thống không tự động biến đổi mã voucher thành chữ hoa hoặc chữ thường. Vì vậy:

```text
"GIAM20K"
```

được chấp nhận, nhưng:

```text
"giam20k"
```

không được xem là cùng một mã.

Điều này phù hợp với yêu cầu mã voucher phải nhập chính xác.

---

# 8. Đảm bảo chỉ được hưởng tối đa một ưu đãi

Mã voucher được lưu trong một biến duy nhất:

```javascript
const voucherUsed = rawVoucherCode;
```

Voucher GIAM20K chỉ hợp lệ khi:

```javascript
const isEligibleGiam20k =
    isValidData &&
    isGiam20kCode &&
    foodTotal >= 100000;
```

Voucher FREESHIP chỉ hợp lệ khi:

```javascript
const isEligibleFreeship =
    isValidData &&
    isFreeshipCode &&
    distanceKm <= 5;
```

Do một chuỗi voucher không thể đồng thời bằng:

```text
"GIAM20K"
```

và:

```text
"FREESHIP"
```

nên chỉ một cờ voucher có thể đạt giá trị `true`.

Mức giảm được tính:

```javascript
const totalDiscount =
    giam20kDiscount + freeshipDiscount;
```

Do đó hệ thống không cộng đồng thời hai ưu đãi.

---

# 9. Lựa chọn giải pháp

## Giải pháp được lựa chọn: Tiered Boolean Flags

Lựa chọn phương pháp **Tiered Boolean Flags** vì đây là phương án phù hợp hơn với bài toán có nhiều điều kiện nghiệp vụ.

### Lý do 1: Dễ đọc

Mỗi biến Boolean thể hiện một điều kiện cụ thể:

```text
isGiam20kCode
isEligibleGiam20k
isFreeshipCode
isEligibleFreeship
```

Người lập trình có thể nhanh chóng biết điều kiện nào đang đúng hoặc sai.

### Lý do 2: Dễ mở rộng

Nếu thêm một voucher mới, có thể tạo thêm các biến cờ hiệu tương ứng thay vì làm một biểu thức duy nhất ngày càng phức tạp.

### Lý do 3: Dễ kiểm thử

Có thể kiểm tra từng tầng:

```text
Dữ liệu có hợp lệ không?
        ↓
Mã voucher có đúng không?
        ↓
Điều kiện voucher có đạt không?
        ↓
Mức giảm là bao nhiêu?
```

### Lý do 4: Hạn chế lỗi

Việc chuyển đổi dữ liệu được thực hiện ngay từ đầu:

```javascript
const foodTotal = Number(rawFoodTotal);
const distanceKm = Number(rawDistanceKm);
```

Sau đó mới thực hiện kiểm tra điều kiện.

Điều này giúp hạn chế lỗi do ép kiểu ngầm.

---

# 10. Kết quả với dữ liệu mẫu

Dữ liệu:

```text
Tiền món: 120.000 VNĐ
Khoảng cách: 4.5 km
Voucher: GIAM20K
```

Kiểm tra:

```text
Mã GIAM20K: đúng
Tiền món >= 100.000: đúng
```

Vì vậy:

```text
isEligibleGiam20k = true
```

Mức giảm:

```text
20.000 VNĐ
```

Voucher FREESHIP:

```text
isEligibleFreeship = false
```

Tổng giảm:

```text
20.000 VNĐ
```

---

# 11. Kết luận

Hai phương pháp đều có thể triển khai bài toán mà không cần sử dụng `if-else`.

Tuy nhiên, **Tiered Boolean Flags** được lựa chọn vì có độ phức tạp nhận thức thấp hơn, dễ kiểm thử, dễ bảo trì và có khả năng mở rộng tốt hơn khi hệ thống xuất hiện thêm nhiều mã voucher.

Việc chủ động chuyển đổi dữ liệu bằng `Number()` và sử dụng phép so sánh nghiêm ngặt `===` cũng giúp giảm nguy cơ lỗi ép kiểu và hạn chế việc áp dụng voucher không hợp lệ.

Giải pháp cuối cùng đáp ứng đầy đủ yêu cầu:

* Không dùng `if-else`.
* Không dùng `switch`.
* Không dùng toán tử `? :`.
* Không dùng vòng lặp.
* Không dùng hàm.
* Không dùng mảng.
* Không dùng đối tượng.
* Sử dụng `const` và tên biến theo chuẩn `camelCase`.
* Có `"use strict";`.
* Xuất kết quả bằng Template Literals.
