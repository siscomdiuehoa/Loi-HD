# Tra mã lỗi điều hòa

Ứng dụng tra cứu dữ liệu có sẵn trên thiết bị, giao diện thích ứng cho điện thoại Android và iOS. Dữ liệu được sao chép từ dự án gốc tại `F:\Ma Loi DH`; nội dung kỹ thuật chưa được thẩm định độc lập.

## Chạy và kiểm tra

Cài Node.js, sau đó chạy `npm install`, `npm run dev` hoặc `npm run build`.

## Đóng gói điện thoại

Đây là ứng dụng web React sử dụng Capacitor. Để tạo dự án Android, cài dependencies rồi chạy `npx cap add android`, `npm run build`, `npx cap sync android` và mở bằng Android Studio. Để tạo dự án iOS, cần macOS, Xcode và cài gói `@capacitor/ios` cùng phiên bản Capacitor với dự án; sau đó chạy `npx cap add ios`, `npm run build`, `npx cap sync ios` và `npx cap open ios`. Cần cấu hình ký ứng dụng, kiểm tra trên thiết bị thật và thực hiện các bước phát hành của từng cửa hàng.

Tính năng tìm bằng giọng nói phụ thuộc vào trình duyệt hoặc WebView và có thể không khả dụng trên mọi thiết bị. Tra cứu dữ liệu không phụ thuộc vào tính năng này.
