import React, { useState } from 'react';
import { 
  X, 
  Printer, 
  Copy, 
  Check, 
  Bookmark, 
  ShieldAlert, 
  FileCheck2, 
  Layers, 
  AlertTriangle, 
  Clock, 
  Building2, 
  ArrowRight,
  BookOpen,
  Info
} from 'lucide-react';
import { SOPItem } from '../types';

interface SOPDetailModalProps {
  item: SOPItem | null;
  onClose: () => void;
  isBookmarked: boolean;
  onToggleBookmark: (id: string) => void;
  onOpenChecklistForCategory?: (categoryId: string) => void;
}

export const SOPDetailModal: React.FC<SOPDetailModalProps> = ({
  item,
  onClose,
  isBookmarked,
  onToggleBookmark,
  onOpenChecklistForCategory
}) => {
  const [copied, setCopied] = useState(false);

  if (!item) return null;

  const handleCopySummary = () => {
    const textToCopy = `[${item.code}] ${item.title}\nหมวดหมู่: ${item.categoryLabel}\nวัตถุประสงค์: ${item.objective}\n\nเอกสารที่ต้องใช้:\n${item.requiredDocuments.map((d, i) => `${i + 1}. ${d}`).join('\n')}\n\nขั้นตอนการปฏิบัติ:\n${item.steps.map(s => `ขั้นที่ ${s.stepNumber}: ${s.title}\n${s.description}`).join('\n\n')}\n\n*ข้อความตัวอย่างสมมติเพื่อการทดสอบระบบ PersonProof Digital Guide (ต้องผ่านการอนุมัติก่อนใช้งานจริง)`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-6 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[92vh] flex flex-col overflow-hidden border border-slate-200 text-slate-800">
        
        {/* Header Bar */}
        <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white p-5 md:p-6 flex items-start justify-between gap-4 border-b border-slate-800 shrink-0">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="bg-sky-500 text-slate-950 font-mono text-xs font-bold px-2.5 py-0.5 rounded shadow-sm">
                {item.code}
              </span>
              <span className="bg-white/10 text-sky-200 text-xs px-2.5 py-0.5 rounded border border-white/10">
                {item.categoryLabel}
              </span>
              <span className="bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[11px] px-2 py-0.5 rounded font-medium">
                เนื้อหาตัวอย่างสมมติ
              </span>
            </div>
            <h2 className="text-xl md:text-2xl font-bold tracking-tight text-white leading-snug">
              {item.title}
            </h2>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <button
              onClick={() => onToggleBookmark(item.id)}
              className={`p-2 rounded-lg transition-colors cursor-pointer ${
                isBookmarked 
                  ? 'bg-amber-400 text-slate-950' 
                  : 'bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white'
              }`}
              title={isBookmarked ? 'ลบออกจากรายการที่บันทึก' : 'บันทึกเป็นรายการโปรด'}
            >
              <Bookmark className={`w-5 h-5 ${isBookmarked ? 'fill-slate-950' : ''}`} />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-colors cursor-pointer"
              aria-label="ปิดหน้าต่าง"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Content Body */}
        <div className="p-5 md:p-8 space-y-6 overflow-y-auto flex-1 text-slate-700 text-sm md:text-base leading-relaxed">
          
          {/* Prototype Callout */}
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-3.5 flex items-start gap-3 text-xs md:text-sm text-amber-900">
            <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-amber-950">ข้อความกำกับความถูกต้องตามกฎหมายและระเบียบปฏิบัติราชการ</p>
              <p className="mt-0.5 text-amber-800">
                ขั้นตอนและข้อมูลในคู่มือนี้จัดทำขึ้นเป็นตัวอย่างสมมติเพื่อการแสดงผลในระบบต้นแบบ (Prototype) ต้องได้รับการตรวจสอบและอนุมัติจากผู้มีอำนาจของสถาบันนิติเวชวิทยา โรงพยาบาลตำรวจ ก่อนนำไปใช้ปฏิบัติงานจริง
              </p>
            </div>
          </div>

          {/* Overview & Objective Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-4">
              <h3 className="font-bold text-slate-900 flex items-center gap-2 text-sm mb-1.5">
                <Info className="w-4 h-4 text-sky-600" />
                วัตถุประสงค์ (Objective)
              </h3>
              <p className="text-slate-600 text-sm">
                {item.objective}
              </p>
            </div>

            <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-4">
              <h3 className="font-bold text-slate-900 flex items-center gap-2 text-sm mb-1.5">
                <Building2 className="w-4 h-4 text-indigo-600" />
                ขอบเขตการบังคับใช้ (Scope)
              </h3>
              <p className="text-slate-600 text-sm">
                {item.scope}
              </p>
            </div>
          </div>

          {/* Required Documents Section */}
          <div className="bg-sky-50/60 border border-sky-100 rounded-xl p-5">
            <h3 className="font-bold text-slate-900 flex items-center gap-2 text-base mb-3">
              <FileCheck2 className="w-5 h-5 text-sky-700" />
              เอกสารและหลักฐานประกอบที่ต้องใช้ (Required Documents)
            </h3>
            <ul className="space-y-2">
              {item.requiredDocuments.map((doc, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-slate-700 text-sm">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-sky-200 text-sky-800 font-bold text-xs mt-0.5">
                    {idx + 1}
                  </span>
                  <span>{doc}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Step by Step Breakdown */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-slate-900 flex items-center gap-2 text-lg">
                <Layers className="w-5 h-5 text-blue-700" />
                ขั้นตอนการปฏิบัติงานโดยละเอียด (Step-by-Step Procedure)
              </h3>
              <span className="text-xs text-slate-500 font-medium">
                ทั้งหมด {item.steps.length} ขั้นตอน
              </span>
            </div>

            <div className="space-y-4">
              {item.steps.map((step) => (
                <div 
                  key={step.stepNumber} 
                  className="bg-white border border-slate-200 rounded-xl p-4 md:p-5 shadow-xs hover:border-slate-300 transition-colors"
                >
                  <div className="flex items-start gap-3">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-slate-900 text-sky-300 font-bold text-sm shadow-xs mt-0.5">
                      {step.stepNumber}
                    </span>
                    <div className="space-y-2 flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                        <h4 className="font-bold text-slate-900 text-base">
                          {step.title}
                        </h4>
                        {step.responsibleRole && (
                          <span className="text-xs bg-slate-100 text-slate-700 px-2.5 py-0.5 rounded-full font-medium inline-block w-fit">
                            ผู้รับผิดชอบ: {step.responsibleRole}
                          </span>
                        )}
                      </div>

                      <p className="text-slate-600 text-sm leading-relaxed">
                        {step.description}
                      </p>

                      {step.details && step.details.length > 0 && (
                        <div className="bg-slate-50 p-3 rounded-lg border border-slate-150 space-y-1.5 mt-2">
                          <p className="text-xs font-semibold text-slate-700">รายละเอียดวิธีปฏิบัติ:</p>
                          <ul className="list-disc pl-5 space-y-1 text-xs text-slate-600">
                            {step.details.map((d, i) => (
                              <li key={i}>{d}</li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Equipment or forms */}
                      {step.equipmentOrForms && step.equipmentOrForms.length > 0 && (
                        <div className="flex flex-wrap items-center gap-1.5 pt-1 text-xs">
                          <span className="text-slate-500 font-medium">อุปกรณ์/แบบฟอร์ม:</span>
                          {step.equipmentOrForms.map((eq, i) => (
                            <span key={i} className="bg-sky-100 text-sky-800 px-2 py-0.5 rounded font-mono text-[11px]">
                              {eq}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Step caution */}
                      {step.cautions && (
                        <div className="flex items-start gap-2 bg-amber-50 text-amber-900 p-2.5 rounded-lg border border-amber-200 text-xs">
                          <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                          <span><strong>ข้อควรระวัง:</strong> {step.cautions}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* General Precautions */}
          <div className="bg-rose-50 border border-rose-200 rounded-xl p-5">
            <h3 className="font-bold text-rose-950 flex items-center gap-2 text-base mb-2">
              <AlertTriangle className="w-5 h-5 text-rose-600" />
              ข้อควรระวังสำคัญและข้อห้าม (Critical Precautions)
            </h3>
            <ul className="space-y-1.5 text-rose-900 text-sm list-disc pl-5">
              {item.cautions.map((caution, idx) => (
                <li key={idx} className="font-medium">{caution}</li>
              ))}
            </ul>
          </div>

          {/* Reference Standard & Tags */}
          <div className="border-t border-slate-200 pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-500">
            <div>
              <span className="font-semibold text-slate-700">มาตรฐานอ้างอิง:</span> {item.referenceStandard}
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              <span>ปรับปรุงล่าสุด: {item.lastUpdated}</span>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap items-center gap-1.5 pt-1">
            <span className="text-xs text-slate-400">คำสำคัญ:</span>
            {item.tags.map((tag, i) => (
              <span key={i} className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded text-xs">
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* Modal Action Bar */}
        <div className="bg-slate-100 px-5 md:px-6 py-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopySummary}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 text-xs md:text-sm font-medium transition-colors shadow-xs cursor-pointer"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4 text-slate-500" />}
              <span>{copied ? 'คัดลอกข้อความแล้ว' : 'คัดลอกสรุปขั้นตอน'}</span>
            </button>

            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 text-xs md:text-sm font-medium transition-colors shadow-xs cursor-pointer"
            >
              <Printer className="w-4 h-4 text-slate-500" />
              <span>พิมพ์หน้านี้</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            {onOpenChecklistForCategory && (
              <button
                onClick={() => {
                  onClose();
                  onOpenChecklistForCategory(item.category);
                }}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-sky-600 hover:bg-sky-700 text-white text-xs md:text-sm font-medium transition-colors shadow-xs cursor-pointer"
              >
                <span>เปิดรายการ Checklist ที่เกี่ยวข้อง</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}

            <button
              onClick={onClose}
              className="px-4 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs md:text-sm font-medium transition-colors cursor-pointer"
            >
              ปิด
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
