import React, { useState } from 'react';
import { AlertTriangle, Info, X, ShieldAlert, CheckCircle2 } from 'lucide-react';
import { SYSTEM_DISCLAIMER } from '../data/forensicData';

export const DisclaimerBanner: React.FC = () => {
  const [showDetailModal, setShowDetailModal] = useState(false);

  return (
    <>
      <div className="bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 text-slate-950 px-4 py-2.5 shadow-md border-b border-amber-400 print:hidden">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2.5 text-xs md:text-sm">
          <div className="flex items-center gap-2.5 font-medium">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-slate-950 text-amber-300 font-bold text-xs shadow-inner">
              <AlertTriangle className="w-3.5 h-3.5" />
            </span>
            <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5">
              <span className="font-bold bg-slate-900 text-amber-200 px-2 py-0.5 rounded text-[11px] tracking-wide uppercase">
                {SYSTEM_DISCLAIMER.badge}
              </span>
              <span className="text-slate-900 font-semibold line-clamp-1 md:line-clamp-none">
                เนื้อหาตัวอย่างสมมติเพื่อการทดสอบระบบ — ต้องได้รับการตรวจสอบและอนุมัติจากสถาบันนิติเวชวิทยา โรงพยาบาลตำรวจ ก่อนใช้งานจริง
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setShowDetailModal(true)}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-900 hover:bg-slate-800 text-amber-300 text-xs font-semibold transition-colors shadow-sm"
              aria-label="ดูข้อกำหนดและคำชี้แจงทางกฎหมาย"
            >
              <Info className="w-3.5 h-3.5" />
              <span>อ่านข้อกำหนดการใช้งาน</span>
            </button>
          </div>
        </div>
      </div>

      {/* Modal for Full Disclaimer */}
      {showDetailModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/75 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full border border-slate-200 overflow-hidden text-slate-800">
            <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white p-5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-amber-500/20 text-amber-400 rounded-lg border border-amber-500/30">
                  <ShieldAlert className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-white">ข้อกำหนดและคำชี้แจงสถานะระบบต้นแบบ</h3>
                  <p className="text-xs text-sky-200">PersonProof Digital Guide — สถาบันนิติเวชวิทยา โรงพยาบาลตำรวจ</p>
                </div>
              </div>
              <button
                onClick={() => setShowDetailModal(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors"
                aria-label="ปิดหน้าต่าง"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4 text-sm leading-relaxed max-h-[70vh] overflow-y-auto">
              <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-lg">
                <h4 className="font-bold text-amber-900 flex items-center gap-2 text-base">
                  <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />
                  คำชี้แจงสถานะเอกสารและการอนุมัติ
                </h4>
                <p className="text-amber-800 mt-1.5 font-medium">
                  {SYSTEM_DISCLAIMER.th}
                </p>
              </div>

              <div className="space-y-3 pt-2">
                <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  ข้อกำหนดและมาตรการความปลอดภัยของข้อมูล
                </h4>
                <ul className="space-y-2 text-slate-700 list-disc pl-5">
                  <li>
                    <strong>ไม่มีข้อมูลจริง:</strong> ระบบนี้ไม่มีการจัดเก็บหรือแสดงข้อมูลผู้ป่วย ข้อมูลคดี หมายเลขคดีอาญา ข้อมูลพันธุกรรม (DNA Profiles) ภาพศพ หรือข้อมูลส่วนบุคคลจริงใดๆ ทั้งสิ้น
                  </li>
                  <li>
                    <strong>ไม่ใช่ระบบจัดเก็บสำนวน:</strong> เว็บแอปพลิเคชันนี้ออกแบบมาเพื่อเป็น “คู่มือดิจิทัลขั้นตอนการปฏิบัติงาน (SOP & Workflow Guide)” มิใช่ระบบบริหารสำนวนคดีหรือระบบวินิจฉัยทางการแพทย์
                  </li>
                  <li>
                    <strong>กระบวนการอนุมัติก่อนบังคับใช้:</strong> หน่วยงานหรือบุคลากรทางการแพทย์และพนักงานสอบสวนที่ประสงค์จะนำไปใช้จริง ต้องส่งร่างเนื้อหาและขั้นตอนให้คณะกรรมการวิชาการ สถาบันนิติเวชวิทยา รพ.ตร. ตรวจสอบความสอดคล้องกับระเบียบราชการและกฎหมายปัจจุบัน
                  </li>
                  <li>
                    <strong>การคุ้มครองข้อมูลส่วนบุคคล:</strong> การปฏิบัติงานจริงในทุกขั้นตอนต้องเป็นไปตาม พ.ร.บ. คุ้มครองข้อมูลส่วนบุคคล พ.ศ. 2562 (PDPA) และประมวลกฎหมายวิธีพิจารณาความอาญา
                  </li>
                </ul>
              </div>

              <div className="bg-slate-50 p-3.5 rounded-lg border border-slate-200 text-xs text-slate-600">
                <span className="font-semibold text-slate-800">ติดต่อสอบถามข้อมูลราชการ:</span> สถาบันนิติเวชวิทยา โรงพยาบาลตำรวจ อาคารเฉลิมพระเกียรติ 60 พรรษา ถนนอังรีดูนังต์ แขวงปทุมวัน เขตปทุมวัน กรุงเทพฯ 10330 โทรศัพท์ 02-207-6000
              </div>
            </div>

            <div className="bg-slate-100 px-6 py-3.5 border-t border-slate-200 flex justify-end">
              <button
                onClick={() => setShowDetailModal(false)}
                className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-sm font-medium transition-colors shadow-sm"
              >
                รับทราบและเข้าใจข้อกำหนด
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
