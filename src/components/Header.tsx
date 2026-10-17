import React, { useState } from 'react';
import { 
  Shield, 
  Search, 
  Menu, 
  X, 
  BookOpen, 
  GitBranch, 
  CheckSquare, 
  FileText, 
  Home, 
  Bookmark,
  ZoomIn,
  ZoomOut
} from 'lucide-react';
import { TabType } from '../types';

interface HeaderProps {
  currentTab: TabType;
  onSelectTab: (tab: TabType) => void;
  onOpenSearch: () => void;
  savedBookmarkCount: number;
  fontSize: 'normal' | 'large' | 'xlarge';
  onChangeFontSize: (size: 'normal' | 'large' | 'xlarge') => void;
  onSelectCategory?: (categoryId: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onSelectTab,
  onOpenSearch,
  savedBookmarkCount,
  fontSize,
  onChangeFontSize,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home' as TabType, label: 'หน้าแรก', icon: Home, shortLabel: 'หน้าแรก' },
    { id: 'categories' as TabType, label: 'หมวดหมู่ขั้นตอนปฏิบัติงาน', icon: BookOpen, shortLabel: 'ขั้นตอน SOP' },
    { id: 'workflow' as TabType, label: 'ผังขั้นตอนและการประสานงาน', icon: GitBranch, shortLabel: 'ผังงาน' },
    { id: 'checklist' as TabType, label: 'รายการตรวจสอบความพร้อม', icon: CheckSquare, shortLabel: 'Checklist' },
    { id: 'references' as TabType, label: 'แหล่งอ้างอิงและประวัติปรับปรุง', icon: FileText, shortLabel: 'อ้างอิง' },
  ];

  const handleNavClick = (tab: TabType) => {
    onSelectTab(tab);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const cycleFontSize = () => {
    if (fontSize === 'normal') onChangeFontSize('large');
    else if (fontSize === 'large') onChangeFontSize('xlarge');
    else onChangeFontSize('normal');
  };

  return (
    <header className="sticky top-0 z-40 bg-slate-900 border-b border-slate-800 shadow-lg text-white">
      {/* Top utility bar */}
      <div className="bg-slate-950/80 border-b border-slate-800/80 px-4 py-1.5 text-xs">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 text-slate-300 font-medium">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="hidden sm:inline">ระบบคู่มือดิจิทัลมาตรฐาน:</span>
            <span className="text-sky-300 font-semibold">สถาบันนิติเวชวิทยา โรงพยาบาลตำรวจ (IFM-PGH)</span>
          </div>

          <div className="flex items-center gap-3">
            {/* Font size toggler */}
            <div className="flex items-center gap-1 bg-slate-800/80 px-2 py-0.5 rounded border border-slate-700/60 text-slate-300">
              <span className="text-[11px] text-slate-400 hidden sm:inline">ขนาดอักษร:</span>
              <button
                onClick={cycleFontSize}
                className="hover:text-white font-medium px-1 text-xs flex items-center gap-1 cursor-pointer transition-colors"
                title="ปรับขนาดตัวอักษร"
              >
                {fontSize === 'normal' && <span>ก ปกติ</span>}
                {fontSize === 'large' && <span className="text-sky-300 font-bold">ก+ ปานกลาง</span>}
                {fontSize === 'xlarge' && <span className="text-amber-300 font-extrabold">ก++ ใหญ่</span>}
              </button>
            </div>

            {/* Bookmarks Counter */}
            {savedBookmarkCount > 0 && (
              <button
                onClick={() => handleNavClick('categories')}
                className="flex items-center gap-1 text-amber-300 hover:text-amber-200 text-xs font-medium cursor-pointer"
                title="รายการที่บันทึกไว้"
              >
                <Bookmark className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span>บันทึก {savedBookmarkCount}</span>
              </button>
            )}

            <div className="text-slate-400 text-[11px] hidden md:block">
              ปรับปรุงล่าสุด: ตุลาคม 2568 (v1.2)
            </div>
          </div>
        </div>
      </div>

      {/* Main navigation header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
        <div className="flex items-center justify-between gap-4">
          
          {/* Brand Logo & Title */}
          <div 
            onClick={() => handleNavClick('home')} 
            className="flex items-center gap-3 cursor-pointer group select-none shrink-0"
          >
            <div className="relative flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br from-blue-700 via-indigo-800 to-slate-900 border border-sky-400/30 shadow-md group-hover:border-sky-400 transition-all">
              <Shield className="w-6 h-6 text-sky-200" />
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-sky-500 rounded-full flex items-center justify-center text-[9px] font-bold text-slate-950 border border-slate-900">
                P
              </div>
            </div>

            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-base md:text-lg tracking-tight text-white group-hover:text-sky-200 transition-colors">
                  PersonProof
                </span>
                <span className="bg-sky-500/20 text-sky-300 border border-sky-400/30 text-[10px] font-bold px-1.5 py-0.5 rounded tracking-wider uppercase">
                  Digital Guide
                </span>
              </div>
              <p className="text-xs text-slate-300 font-medium">
                สถาบันนิติเวชวิทยา โรงพยาบาลตำรวจ
              </p>
            </div>
          </div>

          {/* Desktop Search button & hotkey */}
          <div className="hidden lg:flex flex-1 max-w-xs mx-4">
            <button
              onClick={onOpenSearch}
              className="w-full flex items-center justify-between px-3.5 py-2 rounded-lg bg-slate-800/90 hover:bg-slate-800 border border-slate-700 text-slate-400 text-xs font-normal transition-all shadow-inner hover:border-slate-600 cursor-pointer"
            >
              <span className="flex items-center gap-2">
                <Search className="w-4 h-4 text-sky-400" />
                <span>ค้นหาขั้นตอน, SOP, กฎหมาย...</span>
              </span>
              <kbd className="bg-slate-900 px-2 py-0.5 rounded text-[10px] text-slate-400 border border-slate-700 font-mono">
                Ctrl K
              </kbd>
            </button>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs lg:text-sm font-medium transition-all cursor-pointer ${
                    isActive
                      ? 'bg-sky-600 text-white shadow-md shadow-sky-950/50 font-semibold'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                  <span>{item.shortLabel}</span>
                </button>
              );
            })}
          </nav>

          {/* Mobile Actions */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={onOpenSearch}
              className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white border border-slate-700"
              aria-label="ค้นหา"
            >
              <Search className="w-5 h-5 text-sky-400" />
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white border border-slate-700"
              aria-label="เปิดเมนู"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-slate-950 border-t border-slate-800 px-4 pt-3 pb-5 space-y-2 animate-in slide-in-from-top duration-200">
          <div className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm font-medium transition-colors text-left ${
                    isActive
                      ? 'bg-sky-600 text-white font-semibold'
                      : 'text-slate-300 hover:bg-slate-900 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4 text-sky-400" />
                    <span>{item.label}</span>
                  </div>
                  {isActive && <span className="text-xs bg-white/20 px-2 py-0.5 rounded">กำลังเปิด</span>}
                </button>
              );
            })}
          </div>

          <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400 px-2">
            <span>ปรับขนาดตัวอักษร:</span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => onChangeFontSize('normal')}
                className={`px-2 py-1 rounded border ${fontSize === 'normal' ? 'bg-sky-600 text-white border-sky-500' : 'bg-slate-900 border-slate-800'}`}
              >
                ปกติ
              </button>
              <button
                onClick={() => onChangeFontSize('large')}
                className={`px-2 py-1 rounded border ${fontSize === 'large' ? 'bg-sky-600 text-white border-sky-500' : 'bg-slate-900 border-slate-800'}`}
              >
                ปานกลาง
              </button>
              <button
                onClick={() => onChangeFontSize('xlarge')}
                className={`px-2 py-1 rounded border ${fontSize === 'xlarge' ? 'bg-sky-600 text-white border-sky-500' : 'bg-slate-900 border-slate-800'}`}
              >
                ใหญ่
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
