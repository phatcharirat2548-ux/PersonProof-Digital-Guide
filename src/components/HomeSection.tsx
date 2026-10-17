import React from 'react';
import { 
  Search, 
  BookOpen, 
  GitBranch, 
  CheckSquare, 
  FileText, 
  ShieldCheck, 
  ArrowRight, 
  UserCheck, 
  ShieldAlert, 
  Dna, 
  Smile, 
  Fingerprint, 
  HelpCircle,
  Clock,
  PhoneCall,
  CheckCircle2,
  AlertTriangle,
  Bookmark
} from 'lucide-react';
import { SOP_CATEGORIES, SOP_ITEMS } from '../data/forensicData';
import { TabType, SOPItem } from '../types';

interface HomeSectionProps {
  onSelectTab: (tab: TabType) => void;
  onOpenSearch: () => void;
  onSelectCategory: (categoryId: string) => void;
  onSelectSOP: (sop: SOPItem) => void;
  savedBookmarkCount: number;
}

export const HomeSection: React.FC<HomeSectionProps> = ({
  onSelectTab,
  onOpenSearch,
  onSelectCategory,
  onSelectSOP,
  savedBookmarkCount
}) => {
  // Icon mapper helper
  const renderCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'UserCheck': return <UserCheck className="w-6 h-6" />;
      case 'ShieldAlert': return <ShieldAlert className="w-6 h-6" />;
      case 'Dna': return <Dna className="w-6 h-6" />;
      case 'Smile': return <Smile className="w-6 h-6" />;
      case 'Fingerprint': return <Fingerprint className="w-6 h-6" />;
      case 'FileText': return <FileText className="w-6 h-6" />;
      default: return <BookOpen className="w-6 h-6" />;
    }
  };

  return (
    <div className="space-y-10 pb-12 animate-in fade-in duration-300">
      
      {/* Hero Banner Section */}
      <section className="relative overflow-hidden rounded-2xl md:rounded-3xl bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white shadow-xl border border-slate-800 p-6 md:p-12">
        {/* Background ambient pattern */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none"></div>
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 max-w-4xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/20 border border-sky-400/30 text-sky-300 text-xs font-semibold tracking-wide">
            <ShieldCheck className="w-4 h-4 text-sky-400" />
            <span>สถาบันนิติเวชวิทยา โรงพยาบาลตำรวจ | Institute of Forensic Medicine (IFM-PGH)</span>
          </div>

          <div className="space-y-3">
            <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
              PersonProof Digital Guide
            </h1>
            <p className="text-lg md:text-xl font-medium text-sky-100">
              คู่มือดิจิทัลสนับสนุนกระบวนการตรวจพิสูจน์หลักฐานเกี่ยวกับบุคคล
            </p>
            <p className="text-sm md:text-base text-slate-300 leading-relaxed max-w-3xl">
              ระบบศูนย์กลางความรู้เพื่อจัดหมวดหมู่ข้อมูลและนำเสนอขั้นตอนการปฏิบัติงานด้านนิติเวชศาสตร์และนิติวิทยาศาสตร์ในรูปแบบดิจิทัล เพื่อความถูกต้อง รวดเร็ว ปลอดภัย และคงไว้ซึ่งมาตรฐานห่วงโซ่พยานหลักฐาน (Chain of Custody)
            </p>
          </div>

          {/* Quick Search Bar directly in Hero */}
          <div className="pt-2">
            <div 
              onClick={onOpenSearch}
              className="flex items-center justify-between p-2 sm:p-2.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 backdrop-blur-md cursor-pointer transition-all max-w-2xl group shadow-inner"
            >
              <div className="flex items-center gap-3 pl-2">
                <Search className="w-5 h-5 text-sky-400 group-hover:scale-110 transition-transform" />
                <span className="text-sm text-slate-300 group-hover:text-white transition-colors">
                  ค้นหาหัวข้อในคู่มือ (เช่น ขั้นตอนตรวจ DNA, พิมพ์ลายนิ้วมือศพ, ป.วิ.อ. 131/1)...
                </span>
              </div>
              <span className="hidden sm:inline-block px-3 py-1 rounded-lg bg-sky-600 hover:bg-sky-500 text-white text-xs font-semibold transition-colors">
                เปิดค้นหา (Ctrl+K)
              </span>
            </div>
          </div>

          {/* Quick Action Navigation Buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => onSelectTab('categories')}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-sm font-semibold shadow-md shadow-sky-950/40 transition-all cursor-pointer"
            >
              <BookOpen className="w-4 h-4" />
              <span>ดูหมวดหมู่ขั้นตอน (SOPs)</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => onSelectTab('workflow')}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-100 border border-slate-700 text-sm font-semibold transition-all cursor-pointer"
            >
              <GitBranch className="w-4 h-4 text-sky-400" />
              <span>ผังขั้นตอนการประสานงาน</span>
            </button>

            <button
              onClick={() => onSelectTab('checklist')}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-100 border border-slate-700 text-sm font-semibold transition-all cursor-pointer"
            >
              <CheckSquare className="w-4 h-4 text-emerald-400" />
              <span>ตรวจความพร้อม (Checklist)</span>
            </button>
          </div>
        </div>
      </section>

      {/* Purpose & How to Use Section (วัตถุประสงค์และวิธีใช้งานคู่มือ) */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-slate-200 pb-3">
          <div>
            <span className="text-xs font-bold text-sky-600 uppercase tracking-wider">
              System Objectives & Guidance
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
              วัตถุประสงค์และวิธีใช้งานคู่มือดิจิทัล
            </h2>
          </div>
          <p className="text-xs text-slate-500">
            ออกแบบเพื่อสนับสนุนพนักงานสอบสวน แพทย์นิติเวช และเจ้าหน้าที่ผู้เกี่ยวข้อง
          </p>
        </div>

        {/* 4 Feature Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs hover:shadow-md transition-shadow space-y-3">
            <div className="w-10 h-10 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center font-bold">
              1
            </div>
            <h3 className="font-bold text-slate-900 text-base">ค้นหาขั้นตอนมาตรฐาน</h3>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
              สืบค้นขั้นตอนการตรวจพิสูจน์ (SOPs) ได้ทุกที่ผ่านสมาร์ทโฟน แท็บเล็ต หรือคอมพิวเตอร์ เพื่อเตรียมตัวก่อนเข้าตรวจ
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs hover:shadow-md transition-shadow space-y-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold">
              2
            </div>
            <h3 className="font-bold text-slate-900 text-base">เข้าใจผังการประสานงาน</h3>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
              เห็นภาพรวมขั้นตอนตั้งแต่พนักงานสอบสวนในที่เกิดเหตุ จนถึงการรับสิ่งส่งตรวจ ชันสูตร และออกรายงานผลชันสูตร
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs hover:shadow-md transition-shadow space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
              3
            </div>
            <h3 className="font-bold text-slate-900 text-base">ตรวจความพร้อมก่อนส่ง</h3>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
              ใช้ Interactive Checklist ตรวจเช็กเอกสาร หนังสือยินยอม และสภาพหีบห่อ ป้องกันการถูกปฏิเสธหรือตีกลับหลักฐาน
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs hover:shadow-md transition-shadow space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
              4
            </div>
            <h3 className="font-bold text-slate-900 text-base">อ้างอิงมาตรฐานที่เชื่อถือได้</h3>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
              ทุกหัวข้อระบุประมวลกฎหมายวิธีพิจารณาความอาญา มาตรฐานสากล ISO/IEC 17025 และแนวทางของ INTERPOL DVI
            </p>
          </div>
        </div>
      </section>

      {/* 6 Procedure Categories Cards (หมวดหมู่ขั้นตอนการปฏิบัติงาน) */}
      <section className="space-y-6">
        <div className="flex items-center justify-between border-b border-slate-200 pb-3">
          <div>
            <span className="text-xs font-bold text-sky-600 uppercase tracking-wider">
              Forensic Procedure Catalog
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
              หมวดหมู่ขั้นตอนการปฏิบัติงานหลัก
            </h2>
          </div>
          <button
            onClick={() => onSelectTab('categories')}
            className="text-xs sm:text-sm font-semibold text-sky-600 hover:text-sky-800 flex items-center gap-1 cursor-pointer"
          >
            <span>ดูทั้งหมด ({SOP_ITEMS.length} ขั้นตอน)</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {SOP_CATEGORIES.map((cat) => (
            <div
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className="group bg-white rounded-2xl p-5 border border-slate-200 hover:border-sky-500 hover:shadow-lg transition-all cursor-pointer flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-xl bg-slate-900 text-sky-300 flex items-center justify-center group-hover:scale-105 transition-transform">
                    {renderCategoryIcon(cat.iconName)}
                  </div>
                  <span className="text-xs font-mono font-bold bg-slate-100 text-slate-700 px-2.5 py-1 rounded-md">
                    {cat.code}
                  </span>
                </div>

                <div>
                  <h3 className="font-bold text-slate-900 text-base group-hover:text-sky-700 transition-colors">
                    {cat.title}
                  </h3>
                  <p className="text-xs text-slate-400 font-mono mt-0.5">
                    {cat.titleEn}
                  </p>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 line-clamp-2 leading-relaxed">
                  {cat.description}
                </p>
              </div>

              <div className="pt-4 mt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-500 font-medium">
                  {cat.itemCount} ขั้นตอนตัวอย่าง
                </span>
                <span className="text-sky-600 font-semibold group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                  เข้าสู่หมวดนี้ <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Recommended Procedures */}
      <section className="bg-slate-100/80 rounded-2xl p-6 border border-slate-200 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-blue-700" />
            <h3 className="font-bold text-slate-900 text-base">ขั้นตอนปฏิบัติงานที่ใช้งานบ่อย (Most Frequently Referenced)</h3>
          </div>
          <span className="text-xs text-slate-500 hidden sm:inline">คลิกเพื่อดูขั้นตอนโดยละเอียด</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {SOP_ITEMS.slice(0, 4).map((sop) => (
            <div
              key={sop.id}
              onClick={() => onSelectSOP(sop)}
              className="bg-white p-4 rounded-xl border border-slate-200 hover:border-sky-500 transition-all cursor-pointer flex items-start justify-between gap-3 group shadow-2xs"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[10px] font-bold bg-sky-100 text-sky-800 px-1.5 py-0.5 rounded">
                    {sop.code}
                  </span>
                  <span className="text-xs text-slate-500">{sop.categoryLabel}</span>
                </div>
                <h4 className="font-bold text-slate-900 text-sm group-hover:text-sky-700 transition-colors line-clamp-1">
                  {sop.title}
                </h4>
                <p className="text-xs text-slate-600 line-clamp-1">
                  {sop.summary}
                </p>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-sky-600 group-hover:translate-x-1 transition-all shrink-0 mt-1" />
            </div>
          ))}
        </div>
      </section>

      {/* Urgent Protocol / Field Quick Advice */}
      <section className="bg-gradient-to-r from-blue-900 via-indigo-950 to-slate-900 text-white rounded-2xl p-6 md:p-8 shadow-lg border border-blue-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded bg-amber-400/20 text-amber-300 text-xs font-bold border border-amber-400/30">
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>คำแนะนำเมื่อต้องส่งตรวจเร่งด่วน</span>
          </div>
          <h3 className="text-xl md:text-2xl font-bold text-white">
            กรณีคดีอุกฉกรรจ์ หรือพยานหลักฐานชีวภาพเสี่ยงต่อการเสื่อมสลาย
          </h3>
          <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
            โปรดประสานงานศูนย์รับสิ่งส่งตรวจ สถาบันนิติเวชวิทยา ทันทีเพื่อเตรียมความพร้อมห้องปฏิบัติการ ควบคุมอุณหภูมิสิ่งส่งตรวจด้วยน้ำแข็งแห้งหรือ Cold Chain และนำส่งพร้อมหนังสือส่งตรวจที่มีสาระสำคัญครบถ้วนตาม ป.วิ.อ.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch gap-3 shrink-0 w-full md:w-auto">
          <button
            onClick={() => onSelectTab('checklist')}
            className="px-4 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs sm:text-sm text-center transition-colors cursor-pointer"
          >
            เปิด Checklist ความพร้อมก่อนส่ง
          </button>
          <button
            onClick={() => onSelectTab('references')}
            className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/20 text-xs sm:text-sm text-center font-medium transition-colors cursor-pointer"
          >
            ดูเบอร์โทรประสานงาน 24 ชม.
          </button>
        </div>
      </section>

    </div>
  );
};
