import React, { useState } from 'react';
import { appleAvailable, googleAvailable, signInApple, signInGoogle } from '../services/authService';
import { ArrowRight, ShieldCheck, WifiOff } from 'lucide-react';

export const WelcomeScreen: React.FC<{ onContinue: () => void; onSignedIn: () => void }> = ({ onContinue, onSignedIn }) => {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const handleGoogle = async () => {
    setBusy(true); setError('');
    try { await signInGoogle(); onSignedIn(); }
    catch (err) { const code = (err as {code?: string}).code; if (code !== 'auth/popup-closed-by-user') setError(code === 'auth/unauthorized-domain' ? 'Tên miền này chưa được cho phép đăng nhập. Vui lòng liên hệ SISCOM.' : 'Không thể đăng nhập Google. Vui lòng thử lại hoặc liên hệ SISCOM.'); }
    finally { setBusy(false); }
  };
  const handleApple = async () => {
    setBusy(true); setError('');
    try { await signInApple(); onSignedIn(); }
    catch { setError('Không thể đăng nhập Apple. Vui lòng thử lại.'); }
    finally { setBusy(false); }
  };
  return (
  <div className="welcome-screen">
    <div className="welcome-content">
      <div className="welcome-brand"><img src="/app-icon-clear.png" alt="" /><span>Mã lỗi điều hòa</span></div>
      <div><p className="section-kicker">TRỢ LÝ KỸ THUẬT ĐIỀU HÒA</p><h1>Tra cứu nhanh.<br /><span>Sửa chữa tự tin.</span></h1><p className="welcome-copy">Mã lỗi, nguyên nhân và hướng kiểm tra cho công việc mỗi ngày.</p></div>
      <div className="welcome-panel liquid-glass">
        <h2>Chào mừng bạn trở lại</h2><p>Đăng nhập để kết nối tài khoản.</p>
        <button type="button" className="welcome-provider" disabled={!googleAvailable || busy} onClick={handleGoogle}><img className="provider-google" src="/google-logo.png" alt="" /> {busy ? "Đang kết nối..." : "Tiếp tục với Google"}{!googleAvailable && <span className="provider-soon">Chưa khả dụng</span>}</button>
        <button type="button" className="welcome-provider" disabled={!appleAvailable || busy} onClick={handleApple}><img className="provider-apple" src="/apple-logo.png" alt="" /> {busy ? 'Đang kết nối...' : 'Tiếp tục với Apple'} {!appleAvailable && <span className="provider-soon">Chưa khả dụng</span>}</button>
        <p className="welcome-note" role="status">{error || (!appleAvailable && !googleAvailable ? 'Đăng nhập trên thiết bị này đang được thiết lập.' : '')}</p>
        <div className="welcome-divider"><span>hoặc</span></div>
        <button type="button" className="welcome-guest" onClick={onContinue}>Tiếp tục không đăng nhập <ArrowRight size={17} /></button>
      </div>
      <div className="welcome-benefits"><span><WifiOff size={15}/> Tra cứu ngoại tuyến</span><span><ShieldCheck size={15}/> Dữ liệu trên thiết bị</span></div>
      <p className="welcome-credit">Công ty cổ phần thương mại kỹ thuật SISCOM</p>
    </div>
  </div>
);
};
