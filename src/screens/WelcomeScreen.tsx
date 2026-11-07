import React from 'react';
import { ArrowRight, ShieldCheck, WifiOff } from 'lucide-react';

export const WelcomeScreen: React.FC<{ onContinue: () => void }> = ({ onContinue }) => (
  <div className="welcome-screen">
    <div className="welcome-content">
      <div className="welcome-brand"><img src="/app-icon-clear.png" alt="" /><span>SISCOM · HVAC</span></div>
      <div><p className="section-kicker">TRỢ LÝ KỸ THUẬT ĐIỀU HÒA</p><h1>Tra cứu nhanh.<br /><span>Sửa chữa tự tin.</span></h1><p className="welcome-copy">Mã lỗi, nguyên nhân và hướng kiểm tra cho công việc mỗi ngày.</p></div>
      <div className="welcome-panel liquid-glass">
        <h2>Chào mừng anh trở lại</h2><p>Đăng nhập để kết nối tài khoản của anh.</p>
        <button type="button" className="welcome-provider" disabled><span className="provider-google">G</span> Tiếp tục với Google <span className="provider-soon">Sắp có</span></button>
        <button type="button" className="welcome-provider" disabled><span className="provider-apple">●</span> Tiếp tục với Apple <span className="provider-soon">Sắp có</span></button>
        <p className="welcome-note">Đăng nhập Google và Apple chưa được kết nối.</p>
        <div className="welcome-divider"><span>hoặc</span></div>
        <button type="button" className="welcome-guest" onClick={onContinue}>Tiếp tục không đăng nhập <ArrowRight size={17} /></button>
      </div>
      <div className="welcome-benefits"><span><WifiOff size={15}/> Tra cứu ngoại tuyến</span><span><ShieldCheck size={15}/> Dữ liệu trên thiết bị</span></div>
      <p className="welcome-credit">Công ty cổ phần thương mại kỹ thuật SISCOM</p>
    </div>
  </div>
);
