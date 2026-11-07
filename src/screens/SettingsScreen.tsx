import React from 'react';
import { ArrowLeft, Building2, ChevronRight, Palette, Sun, Moon, LogIn } from 'lucide-react';
import { useThemeStore } from '../store/useThemeStore';

export const SettingsScreen: React.FC<{ onBack: () => void; onWelcome: () => void }> = ({onBack, onWelcome}) => {
  const { openThemeModal, toggleTheme, isDarkMode } = useThemeStore();
  return <div className="settings-page">
    <div className="settings-top"><button type="button" onClick={onBack} className="liquid-pill settings-back" aria-label="Quay lại"><ArrowLeft size={20}/></button><div><p className="section-kicker">TÙY CHỈNH</p><h1 className="section-title">Cài đặt</h1></div></div>
    <p className="settings-label">GIAO DIỆN</p>
    <div className="liquid-card settings-card"><button type="button" onClick={openThemeModal} className="settings-row"><span className="settings-icon"><Palette size={20}/></span><span><strong>Điều chỉnh giao diện</strong><small>Chủ đề, màu nền và độ tương phản</small></span><ChevronRight size={18}/></button><button type="button" onClick={toggleTheme} className="settings-row"><span className="settings-icon">{isDarkMode ? <Moon size={20}/> : <Sun size={20}/>}</span><span><strong>Chế độ {isDarkMode ? 'tối' : 'sáng'}</strong><small>Chạm để chuyển chế độ</small></span><ChevronRight size={18}/></button></div>
    <p className="settings-label">TÀI KHOẢN</p><div className="liquid-card settings-card"><button type="button" onClick={onWelcome} className="settings-row"><span className="settings-icon"><LogIn size={20}/></span><span><strong>Màn hình chào</strong><small>Xem các lựa chọn đăng nhập</small></span><ChevronRight size={18}/></button></div><p className="settings-label">THÔNG TIN ỨNG DỤNG</p>
    <div className="liquid-card settings-card"><div className="settings-row"><span className="settings-icon"><Building2 size={20}/></span><span><strong>Nhà phát triển</strong><small>Công ty cổ phần thương mại kỹ thuật SISCOM</small></span></div></div>
  </div>;
};
