import React from 'react';
import { Shield, Phone, MapPin, AlertTriangle, ExternalLink } from 'lucide-react';
import { TabType } from '../types';

interface FooterProps {
  onSelectTab: (tab: TabType) => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectTab }) => {
  return (
    <footer className="bg-slate-950 text-slate-400 text-xs border-t border-slate-800 print:hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 space-y-8">
        
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Column 1: Organization */}
          <div className="space-y-3 md:col-span-2">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-blue-900 border border-sky-400/30 text-sky-300 font-bold">
                <Shield className="w-5 h-5" />
              </div>
              <div>
                <span className="font-extrabold text-white text-base block">
                  PersonProof Digital Guide
                </span>
                <span className="text-slate-400 text-xs">
                  สถาบันนิติเวชวิทยา โรงพยาบาลตำรวจ
                </span>
              </div>
            </div>

            <p className="text-slate-400 text-xs leading-relaxed max-w-lg">
              คู่มือดิจิทัลต้นแบบเพื่อสนับสนุนกระบวนการปฏิบัติงานด้านการตรวจพิสูจน์หลักฐานเกี่ยวกับบุคคล เพื่อยกระดับความถูกต้อง รวดเร็ว และเป็นไปตามมาตรฐานห่วงโซ่พยานหลักฐานสากล
            </p>

            <div className="flex items-start gap-2 text-slate-400 text-xs pt-1">
              <MapPin className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
              <span>อาคารเฉลิมพระเกียรติ 60 พรรษา สถาบันนิติเวชวิทยา รพ.ตร. ถนนอังรีดูนังต์ แขวงปทุมวัน เขตปทุมวัน กรุงเทพฯ 10330</span>
            </div>
          </div>

          {/* Column 2: Navigation Links */}
          <div className="space-y-3">
            <h4 className="font-bold text-white text-sm">เมนูหลักคู่มือ</h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => onSelectTab('home')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  หน้าแรกและวัตถุประสงค์
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('categories')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  หมวดหมู่ขั้นตอน (SOPs)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('workflow')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  ผังขั้นตอนการประสานงาน
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('checklist')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  รายการตรวจสอบความพร้อม (Checklist)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('references')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  แหล่งอ้างอิงและประวัติปรับปรุง
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Emergency & Contact */}
          <div className="space-y-3">
            <h4 className="font-bold text-white text-sm">ประสานงานเร่งด่วน</h4>
            <div className="space-y-2">
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-1">
                <span className="text-[11px] text-slate-400 block">ศูนย์รับสิ่งส่งตรวจ (24 ชั่วโมง):</span>
                <span className="font-mono font-bold text-sky-300 text-sm flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5" /> 02-207-6000 ต่อ 211
                </span>
              </div>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-1">
                <span className="text-[11px] text-slate-400 block">งานตรวจดีเอ็นเอและชีววิทยา:</span>
                <span className="font-mono font-bold text-sky-300 text-sm flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5" /> 02-207-6000 ต่อ 402
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* Prototype Warning Bottom Bar */}
        <div className="pt-6 border-t border-slate-800/80 flex flex-col md:flex-row items-center justify-between gap-4 text-slate-500 text-[11px]">
          <div className="flex items-center gap-2 text-amber-400">
            <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
            <span>
              ระบบต้นแบบเพื่อการศึกษา (Prototype) — ห้ามนำไปอ้างอิงทางคดี ต้องผ่านการอนุมัติก่อนใช้งานจริง
            </span>
          </div>

          <div className="flex items-center gap-4">
            <span>เวอร์ชัน 1.2 Prototype (Beta)</span>
            <span>สงวนลิขสิทธิ์ตามระเบียบราชการ</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
