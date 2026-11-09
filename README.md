# Tra mã lỗi điều hòa

Ứng dụng tra cứu dữ liệu có sẵn trên thiết bị, giao diện thích ứng cho điện thoại Android và iOS. Dữ liệu được sao chép từ dự án gốc tại `F:\Ma Loi DH`; nội dung kỹ thuật chưa được thẩm định độc lập.

## Chạy và kiểm tra

Cài Node.js, sau đó chạy `npm install`, `npm run dev` hoặc `npm run build`.

## Đóng gói điện thoại

Đây là ứng dụng web React sử dụng Capacitor. Để tạo dự án Android, cài dependencies rồi chạy `npx cap add android`, `npm run build`, `npx cap sync android` và mở bằng Android Studio. Để tạo dự án iOS, cần macOS, Xcode và cài gói `@capacitor/ios` cùng phiên bản Capacitor với dự án; sau đó chạy `npx cap add ios`, `npm run build`, `npx cap sync ios` và `npx cap open ios`. Cần cấu hình ký ứng dụng, kiểm tra trên thiết bị thật và thực hiện các bước phát hành của từng cửa hàng.

Tính năng tìm bằng giọng nói phụ thuộc vào trình duyệt hoặc WebView và có thể không khả dụng trên mọi thiết bị. Tra cứu dữ liệu không phụ thuộc vào tính năng này.

## Cấu hình đăng nhập Google trên web

Sao chép `.env.example` thành `.env.local`, rồi điền cấu hình web của dự án Firebase riêng `tra-ma-loi-dieu-hoa-siscom` từ Firebase Console → Project settings → Your apps. Không đưa tệp `.env.local` hoặc khóa riêng tư lên Git. Trong Firebase Authentication, bật Google và thêm chính xác tên miền của bản web vào Authorized domains. Các thay đổi cấu hình môi trường cần khởi động lại Vite.

Nút Google hiện dùng Firebase Authentication trên trình duyệt web; bản Capacitor Android/iOS chưa tích hợp đăng nhập Google native và không bật nút Google.

## Đăng nhập Apple trên iOS

Mã ứng dụng đã có luồng đăng nhập Apple native qua Firebase, nhưng nút mặc định tắt cho đến khi cấu hình iOS hoàn tất. Cần máy macOS có Xcode, tài khoản Apple Developer và quyền quản trị dự án Firebase:

1. Đăng ký ứng dụng iOS với bundle ID `com.phong.tramaloidieuhoa` trong Firebase, tải `GoogleService-Info.plist` và đặt tại `ios/App/App/GoogleService-Info.plist`. Giai đoạn build sẽ tự sao chép tệp vào ứng dụng khi tệp tồn tại; tệp được loại khỏi Git. Bật nhà cung cấp Apple trong Firebase Authentication.
2. Bật capability Sign in with Apple cho App ID trong Apple Developer, chọn đúng đội ký ứng dụng và provisioning profile trong Xcode. Dự án đã khai báo entitlement Sign in with Apple cho cả Debug và Release; xác nhận capability xuất hiện trong Signing & Capabilities. Làm theo hướng dẫn cấu hình Apple của Firebase cho các chức năng tài khoản cần dùng.
3. Tạo `.env.local` từ `.env.example`, đặt `VITE_ENABLE_APPLE_SIGN_IN=true`, chạy `npm install`, `npm run build` và `npx cap sync ios` trên macOS; mở dự án bằng `npx cap open ios`.
4. Chạy trên thiết bị iOS và kiểm tra đăng nhập, khôi phục phiên và đăng xuất. Không đặt giá trị này thành true khi chưa có cấu hình native.

Google native trên Android/iOS chưa được tích hợp. Đăng nhập không đồng bộ dữ liệu lưu trên thiết bị.

### Kiểm tra iOS trên máy Mac đám mây

Workflow `.github/workflows/ios-build.yml` có thể chạy thủ công trong GitHub Actions hoặc khi tạo pull request có thay đổi liên quan. Workflow cài dependencies, build ứng dụng và biên dịch cho iOS Simulator không ký; không cần thông tin Apple và không tạo bản TestFlight. Cần đưa mã nguồn lên GitHub và chạy workflow để xác nhận kết quả; chưa có kết quả build iOS từ máy Windows này.

Để đăng nhập Apple trên thiết bị và phát hành qua TestFlight, vẫn cần cấu hình Firebase iOS, entitlement, tài khoản Apple, chứng chỉ và provisioning profile trên dịch vụ build. Không đưa khóa riêng tư, chứng chỉ ký hoặc thông tin đăng nhập vào mã nguồn hay workflow. Có thể cân nhắc Codemagic (có gói cá nhân miễn phí theo hạn mức) hoặc GitHub Actions; kiểm tra hạn mức hiện tại trước khi sử dụng.

`codemagic.yaml` chuẩn bị một workflow tạo IPA ký kiểu App Store, không tự tải lên TestFlight. Trong Codemagic, cấu hình chứng chỉ Apple Distribution và provisioning profile App Store phù hợp bundle ID, đã bật Sign in with Apple. Thêm biến bí mật `GOOGLE_SERVICE_INFO_BASE64` trong nhóm `firebase_ios` với nội dung base64 của tệp cấu hình iOS. Trên Windows có thể dùng PowerShell để sao chép giá trị vào clipboard (không dán vào chat hay mã nguồn):

```powershell
[Convert]::ToBase64String([IO.File]::ReadAllBytes('D:\Live-Air-Quality\ios\App\App\GoogleService-Info.plist')) | Set-Clipboard
```

Workflow kiểm tra bundle ID và Firebase project ID, bật đăng nhập Apple trong bản build và tạo IPA. Việc ký, build thực tế và cài TestFlight vẫn cần được kiểm tra trên dịch vụ macOS và iPhone.
