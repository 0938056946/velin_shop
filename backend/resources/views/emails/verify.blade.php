@component('mail::message')
{{-- Logo --}}
<div style="text-align:center; margin-bottom:20px;">
  <img src="https://i.ibb.co/yQJZn3b/velin-logo.png" alt="Velin Shop" width="120" />
</div>

# 🎉 Xin chào {{ $username }} 👋

Cảm ơn bạn đã đăng ký tài khoản tại **Velin Shop**.  
Để bắt đầu mua sắm, bạn hãy xác nhận email của mình nhé 👇

@component('mail::button', ['url' => $url, 'color' => 'success'])
✅ Xác nhận Email Ngay
@endcomponent

---

### 🔒 Bảo mật
Nếu bạn không tạo tài khoản, vui lòng **bỏ qua email này**.  
Tài khoản của bạn sẽ không được kích hoạt nếu không xác nhận.

---

### 📞 Liên hệ hỗ trợ
- Hotline: **0123 456 789**  
- Email: **support@velinshop.com**  
- Website: [Velin Shop](https://velinshop.com)  

---

Cảm ơn bạn đã tin tưởng,  
**Đội ngũ Velin Shop**
@endcomponent
