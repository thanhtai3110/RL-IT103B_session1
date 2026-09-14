# Dò vết & Khắc phục lỗi nối chuỗi tính tiền đơn hàng

## 1. Mục tiêu

Bài tập thực hiện dò vết mã nguồn, xác định nguyên nhân gây sai lệch kết quả tính tiền đơn hàng và khắc phục lỗi.

Các nội dung chính:

* Đọc hiểu luồng dữ liệu trong chương trình.
* Xác định lỗi nối chuỗi khi tính tổng tiền.
* Phân tích ảnh hưởng của lỗi đến nghiệp vụ Freeship.
* Xây dựng bảng Test Cases đối chứng.
* Sửa mã nguồn để tính toán chính xác.

---

## 2. Phân tích lỗi

### 2.1. Dữ liệu đầu vào

Trong chương trình ban đầu:

```javascript
const rawFoodPrice = "55000";
const rawToppingPrice = "15000";
const rawDistanceKm = "3.5";
```

Các giá trị trên được đặt trong dấu ngoặc kép nên có kiểu dữ liệu là `string`.

Có thể kiểm tra:

```javascript
typeof rawFoodPrice
// "string"

typeof rawToppingPrice
// "string"
```

---

## 2.2. Dòng code gây lỗi

Dòng code gây ra lỗi chính là:

```javascript
const foodTotal = rawFoodPrice + rawToppingPrice;
```

Trong JavaScript, toán tử `+` có thể thực hiện phép cộng số hoặc phép nối chuỗi.

Do cả hai biến đều là chuỗi:

```text
"55000" + "15000"
```

JavaScript sẽ nối hai chuỗi lại với nhau:

```text
"5500015000"
```

Thay vì thực hiện:

```text
55000 + 15000 = 70000
```

Vì vậy chương trình hiển thị:

```text
Tổng tiền món ăn: 5500015000 VND
```

---

## 3. Dò vết luồng dữ liệu

### Bước 1: Nhận dữ liệu

```text
rawFoodPrice = "55000"
rawToppingPrice = "15000"
rawDistanceKm = "3.5"
```

Các giá trị giá tiền và khoảng cách đều đang ở dạng chuỗi.

### Bước 2: Tính tổng tiền món

Code ban đầu:

```javascript
const foodTotal = rawFoodPrice + rawToppingPrice;
```

Kết quả:

```text
"55000" + "15000"
= "5500015000"
```

### Bước 3: Kiểm tra Freeship

Code ban đầu:

```javascript
const isEligibleFreeship =
  foodTotal >= 60000 && rawDistanceKm <= 5 && isStoreOpen && !isUserBlocked;
```

Do `foodTotal` có giá trị:

```text
"5500015000"
```

Khi thực hiện phép so sánh với `60000`, JavaScript có thể chuyển chuỗi số sang dạng số để so sánh.

Do đó:

```text
5500015000 >= 60000
→ true
```

Khoảng cách:

```text
"3.5" <= 5
→ true
```

Cửa hàng đang mở:

```text
true
```

Người dùng không bị khóa:

```text
!false
→ true
```

Kết quả:

```text
isEligibleFreeship = true
```

Điều này gây ra lỗi nghiệp vụ vì hệ thống hiểu tổng tiền món là 5.500.015.000 VND thay vì 70.000 VND.

---

## 4. Nguyên nhân kỹ thuật

Nguyên nhân là dữ liệu giá tiền được nhận vào dưới dạng `string`, nhưng chương trình sử dụng trực tiếp toán tử `+` để tính toán.

Trong JavaScript:

```javascript
"55000" + "15000"
```

là phép nối chuỗi.

Muốn thực hiện phép cộng số học cần chuyển dữ liệu sang kiểu `number`.

Giải pháp:

```javascript
const foodPrice = Number(rawFoodPrice);
const toppingPrice = Number(rawToppingPrice);
const distanceKm = Number(rawDistanceKm);
```

Sau đó sử dụng các biến số để tính toán:

```javascript
const foodTotal = foodPrice + toppingPrice;
```

Kết quả:

```text
55000 + 15000 = 70000
```

---

## 5. Bảng Test Cases

| Trường hợp kiểm thử                                           | Dữ liệu đầu vào                                                                                                 | Kết quả sai thực tế                                                                                                                        | Kết quả đúng mong đợi                                                                                                         |
| ------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------- |
| TC01 - Đơn hàng 55.000đ + topping 15.000đ, khoảng cách 3.5 km | `rawFoodPrice = "55000"`, `rawToppingPrice = "15000"`, `rawDistanceKm = "3.5"`, cửa hàng mở, user không bị khóa | `foodTotal = "5500015000" VND`, hệ thống đánh giá đủ điều kiện Freeship do tổng tiền bị hiểu nhầm là rất lớn                               | `foodTotal = 70000 VND`, đủ điều kiện Freeship vì `70000 >= 60000`, khoảng cách `3.5 <= 5`, cửa hàng mở và user không bị khóa |
| TC02 - Đơn hàng 40.000đ + topping 10.000đ, khoảng cách 3 km   | `rawFoodPrice = "40000"`, `rawToppingPrice = "10000"`, `rawDistanceKm = "3"`, cửa hàng mở, user không bị khóa   | `foodTotal = "4000010000" VND`, hệ thống có thể đánh giá đủ điều kiện Freeship vì giá trị nối chuỗi bị chuyển thành số rất lớn khi so sánh | `foodTotal = 50000 VND`, không đủ điều kiện Freeship vì `50000 < 60000`                                                       |

---

## 6. Mã nguồn đã khắc phục

Lỗi được khắc phục bằng cách chuyển các dữ liệu nhận từ biểu mẫu sang kiểu `number` trước khi thực hiện phép tính.

```javascript
const foodPrice = Number(rawFoodPrice);
const toppingPrice = Number(rawToppingPrice);
const distanceKm = Number(rawDistanceKm);

const foodTotal = foodPrice + toppingPrice;
```

Sau khi sửa:

```text
55000 + 15000 = 70000
```

Không còn xảy ra lỗi nối chuỗi:

```text
"55000" + "15000"
= "5500015000"
```

---

## 7. Kết quả mong đợi sau khi sửa

Với Test Case 01:

```text
Khách hàng: Nguyen Thi Mai
Món ăn đặt: Com Tam Suon Bi Cha
Tổng tiền món ăn: 70000 VND
Đủ điều kiện Freeship: true
```

Do đơn hàng đủ điều kiện Freeship nên phí giao hàng thực tế được áp dụng là:

```text
0 VND
```

Tiền thanh toán:

```text
70000 + 0 - 15000 = 55000 VND
```

Kết quả cuối cùng:

```text
Số tiền thanh toán thực tế: 55000 VND
```

---

## 8. Kết luận

Lỗi xuất phát từ việc dữ liệu giá tiền được lưu dưới dạng `string` và được cộng trực tiếp bằng toán tử `+`.

Việc chuyển đổi dữ liệu từ `string` sang `number` trước khi tính toán giúp chương trình:

* Tính chính xác tổng tiền món ăn.
* Đánh giá đúng điều kiện Freeship.
* Tránh sai lệch số tiền thanh toán.
* Đảm bảo dữ liệu đầu vào từ biểu mẫu được xử lý đúng kiểu dữ liệu.

Mã nguồn sau khi sửa đáp ứng yêu cầu bài toán và không sử dụng:

* `if-else`
* Vòng lặp
* Hàm
* Mảng
* Đối tượng
