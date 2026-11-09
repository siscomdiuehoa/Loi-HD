import React from 'react';
import { ArrowLeft, ExternalLink, ChevronRight, Palette, Sun, Moon, LogIn } from 'lucide-react';
import { useThemeStore } from '../store/useThemeStore';

export const SettingsScreen: React.FC<{ onBack: () => void; onWelcome: () => void; userEmail?: string; onSignOut: () => void; signingOut: boolean; signOutError: string }> = ({onBack, onWelcome, userEmail, onSignOut, signingOut, signOutError}) => {
  const { openThemeModal, toggleTheme, isDarkMode } = useThemeStore();
  return <div className="settings-page">
    <div className="settings-top"><button type="button" onClick={onBack} className="liquid-pill settings-back" aria-label="Quay lại"><ArrowLeft size={20}/></button><div><p className="section-kicker">TÙY CHỈNH</p><h1 className="section-title">Cài đặt</h1></div></div>
    <p className="settings-label">GIAO DIỆN</p>
    <div className="liquid-card settings-card"><button type="button" onClick={openThemeModal} className="settings-row"><span className="settings-icon"><Palette size={20}/></span><span><strong>Điều chỉnh giao diện</strong><small>Chủ đề, màu nền và độ tương phản</small></span><ChevronRight size={18}/></button><button type="button" onClick={toggleTheme} className="settings-row"><span className="settings-icon">{isDarkMode ? <Moon size={20}/> : <Sun size={20}/>}</span><span><strong>Chế độ {isDarkMode ? 'tối' : 'sáng'}</strong><small>Chạm để chuyển chế độ</small></span><ChevronRight size={18}/></button></div>
    <p className="settings-label">TÀI KHOẢN</p><div className="liquid-card settings-card"><button type="button" onClick={onWelcome} className="settings-row"><span className="settings-icon"><LogIn size={20}/></span><span><strong>Màn hình chào</strong><small>Xem các lựa chọn đăng nhập</small></span><ChevronRight size={18}/></button></div>{userEmail && <div className="liquid-card settings-card mt-3"><button type="button" onClick={onSignOut} disabled={signingOut} className="settings-row"><span className="settings-icon"><LogIn size={20}/></span><span><strong>{signingOut ? 'Đang đăng xuất...' : 'Đăng xuất'}</strong><small>{userEmail}</small></span><ChevronRight size={18}/></button>{signOutError && <p role="alert">{signOutError}</p>}</div>}<p className="settings-label">THÔNG TIN ỨNG DỤNG</p>
    <div className="liquid-card settings-card developer-card">
      <img className="developer-logo" src="/siscom-logo.png" alt="Logo SISCOM" />
      <p className="developer-label">NHÀ PHÁT TRIỂN</p>
      <p className="developer-name">Công ty cổ phần thương mại kỹ thuật SISCOM</p>
      <a className="developer-link" href="https://siscom.vn" target="_blank" rel="noopener noreferrer">siscom.vn <ExternalLink size={14} /></a>
    </div>
  </div>;
};
