import React, { useState, useMemo, useEffect } from 'react';
import { 
  CheckSquare, 
  Square, 
  RotateCcw, 
  Printer, 
  Copy, 
  Check, 
  AlertTriangle, 
  FileCheck, 
  ShieldAlert, 
  Plus, 
  Trash2,
  Filter,
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import { INITIAL_CHECKLIST } from '../data/forensicData';
import { ChecklistItem } from '../types';

interface ChecklistSectionProps {
  initialCategory?: string | null;
}

export const ChecklistSection: React.FC<ChecklistSectionProps> = ({
  initialCategory
}) => {
  const [items, setItems] = useState<ChecklistItem[]>(() => {
    const saved = localStorage.getItem('personproof_checklist_state');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return INITIAL_CHECKLIST;
      }
    }
    return INITIAL_CHECKLIST;
  });

  const [activeCategory, setActiveCategory] = useState<string>(
    initialCategory || 'all'
  );
  const [filterMode, setFilterMode] = useState<'all' | 'pending' | 'critical'>('all');
  const [copied, setCopied] = useState(false);
  const [caseInspectorName, setCaseInspectorName] = useState('');
  const [caseStationName, setCaseStationName] = useState('');
  const [newCustomItemText, setNewCustomItemText] = useState('');
  const [showAddCustom, setShowAddCustom] = useState(false);

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem('personproof_checklist_state', JSON.stringify(items));
  }, [items]);

  const toggleItem = (id: string) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, isChecked: !item.isChecked } : item
      )
    );
  };

  const handleReset = () => {
    if (window.confirm('คุณต้องการรีเซ็ตผลการตรวจสอบทั้งหมดหรือไม่?')) {
      const reset = items.map((i) => ({ ...i, isChecked: false }));
      setItems(reset);
      localStorage.setItem('personproof_checklist_state', JSON.stringify(reset));
    }
  };

  const handleCheckAllInView = () => {
    setItems((prev) =>
      prev.map((item) => {
        if (activeCategory === 'all' || item.category === activeCategory) {
          return { ...item, isChecked: true };
        }
        return item;
      })
    );
  };

  const handleAddCustomItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCustomItemText.trim()) return;

    const newItem: ChecklistItem = {
      id: `custom-${Date.now()}`,
      category: activeCategory === 'all' ? 'official-request' : (activeCategory as any),
      label: newCustomItemText.trim(),
      description: 'รายการตรวจสอบเฉพาะกรณีที่ผู้ปฏิบัติงานบันทึกเพิ่มเติม',
      critical: false,
      isChecked: false
    };

    setItems((prev) => [newItem, ...prev]);
    setNewCustomItemText('');
    setShowAddCustom(false);
  };

  const handleDeleteItem = (id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  // Metrics
  const totalCount = items.length;
  const checkedCount = items.filter((i) => i.isChecked).length;
  const progressPercent = totalCount > 0 ? Math.round((checkedCount / totalCount) * 100) : 0;
  
  const criticalItems = items.filter((i) => i.critical);
  const criticalPassedCount = criticalItems.filter((i) => i.isChecked).length;
  const allCriticalPassed = criticalPassedCount === criticalItems.length;

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      if (activeCategory !== 'all' && item.category !== activeCategory) {
        return false;
      }
      if (filterMode === 'pending' && item.isChecked) {
        return false;
      }
      if (filterMode === 'critical' && !item.critical) {
        return false;
      }
      return true;
    });
  }, [items, activeCategory, filterMode]);

  const handleCopySummary = () => {
    const header = `[บันทึกผลการตรวจสอบความพร้อมก่อนส่งตรวจ - PersonProof Digital Guide]\nสถานีตำรวจ/หน่วยงาน: ${caseStationName || '-'}\nผู้ตรวจสอบ: ${caseInspectorName || '-'}\nความคืบหน้า: ${checkedCount}/${totalCount} รายการ (${progressPercent}%)\nเกณฑ์จำเป็น: ${criticalPassedCount}/${criticalItems.length} รายการ\n\n`;
    const details = items
      .map(
        (it) =>
          `[${it.isChecked ? '✓ ผ่าน' : '✗ ยังไม่ผ่าน'}] ${it.label} ${it.critical ? '(จำเป็น)' : ''}`
      )
      .join('\n');
    const footer = '\n\n*ข้อมูลตัวอย่างสมมติเพื่อการทดสอบระบบ PersonProof Digital Guide';

    navigator.clipboard.writeText(header + details + footer);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-300">
      
      {/* Header and Progress Overview */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded uppercase tracking-wider">
                Interactive Readiness Checklist
              </span>
              <span className="text-xs text-amber-700 font-semibold bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                ระบบกดเลือกได้จริง
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
              รายการตรวจสอบความพร้อมก่อนส่งตรวจพิสูจน์ (Checklist)
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              ใช้ตรวจสอบความถูกต้องของเอกสาร สภาพบรรจุภัณฑ์ ห่วงโซ่พยานหลักฐาน และความยินยอม ป้องกันข้อผิดพลาดก่อนถึงสถาบันนิติเวชวิทยา
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={handleCopySummary}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs sm:text-sm font-semibold transition-colors cursor-pointer"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'คัดลอกสรุปแล้ว' : 'คัดลอกสรุป'}</span>
            </button>

            <button
              onClick={() => window.print()}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs sm:text-sm font-semibold transition-colors cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>พิมพ์ใบตรวจ</span>
            </button>

            <button
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs sm:text-sm font-semibold transition-colors cursor-pointer"
              title="ล้างเครื่องหมายทั้งหมด"
            >
              <RotateCcw className="w-4 h-4" />
              <span className="hidden sm:inline">รีเซ็ต</span>
            </button>
          </div>
        </div>

        {/* Progress Metric Card */}
        <div className="bg-slate-900 text-white rounded-2xl p-5 shadow-inner space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="text-xs text-sky-300 font-medium">ความพร้อมโดยรวมของพยานหลักฐานและเอกสาร:</span>
              <div className="flex items-baseline gap-2 mt-0.5">
                <span className="text-3xl font-extrabold text-white">{progressPercent}%</span>
                <span className="text-xs text-slate-400">
                  (ตรวจสอบแล้ว {checkedCount} จาก {totalCount} รายการ)
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="text-right">
                <span className="text-[11px] text-slate-400 block">เกณฑ์จำเป็นต้องมี (Mandatory):</span>
                <span className={`text-sm font-bold ${allCriticalPassed ? 'text-emerald-400' : 'text-amber-400'}`}>
                  {criticalPassedCount} / {criticalItems.length} รายการ
                </span>
              </div>
              <div className={`p-2 rounded-xl ${allCriticalPassed ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'}`}>
                {allCriticalPassed ? <CheckCircle2 className="w-6 h-6" /> : <AlertTriangle className="w-6 h-6" />}
              </div>
            </div>
          </div>

          {/* Progress bar */}
          <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
            <div
              className={`h-full transition-all duration-300 rounded-full ${
                progressPercent === 100
                  ? 'bg-emerald-500'
                  : progressPercent >= 60
                  ? 'bg-sky-500'
                  : 'bg-amber-500'
              }`}
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>
        </div>

        {/* Case & Inspector metadata input (saved in state for printing/copying) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs">
          <div>
            <label className="block text-slate-600 font-medium mb-1">
              สถานีตำรวจ / หน่วยงานต้นทาง (เพื่อระบุในรายงาน):
            </label>
            <input
              type="text"
              value={caseStationName}
              onChange={(e) => setCaseStationName(e.target.value)}
              placeholder="เช่น สน.ปทุมวัน, สภ.เมืองนนทบุรี"
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-1 focus:ring-sky-500"
            />
          </div>
          <div>
            <label className="block text-slate-600 font-medium mb-1">
              ชื่อเจ้าหน้าที่ผู้ตรวจเช็กความพร้อม:
            </label>
            <input
              type="text"
              value={caseInspectorName}
              onChange={(e) => setCaseInspectorName(e.target.value)}
              placeholder="เช่น ร.ต.อ. สมศักดิ์ มีชัย / พนักงานสอบสวน"
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-1 focus:ring-sky-500"
            />
          </div>
        </div>

        {/* Category tabs & Filter mode */}
        <div className="space-y-3 pt-2 border-t border-slate-100">
          <div className="flex flex-wrap items-center justify-between gap-2">
            
            {/* Category pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto text-xs">
              {[
                { id: 'all', label: 'ทั้งหมด' },
                { id: 'official-request', label: 'หนังสือส่งตรวจราชการ' },
                { id: 'packaging', label: 'บรรจุภัณฑ์ & ห่วงโซ่หลักฐาน' },
                { id: 'living-person', label: 'ตรวจบุคคลมีชีวิต' },
                { id: 'deceased-id', label: 'ตรวจพิสูจน์ศพนิรนาม' },
              ].map((c) => (
                <button
                  key={c.id}
                  onClick={() => setActiveCategory(c.id)}
                  className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors cursor-pointer ${
                    activeCategory === c.id
                      ? 'bg-sky-600 text-white shadow-xs'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>

            {/* Quick check view / filter */}
            <div className="flex items-center gap-1.5 text-xs">
              <button
                onClick={() => setFilterMode('all')}
                className={`px-2.5 py-1 rounded-md transition-colors ${
                  filterMode === 'all' ? 'bg-slate-800 text-white font-medium' : 'text-slate-500 hover:bg-slate-100'
                }`}
              >
                ทั้งหมด
              </button>
              <button
                onClick={() => setFilterMode('pending')}
                className={`px-2.5 py-1 rounded-md transition-colors ${
                  filterMode === 'pending' ? 'bg-slate-800 text-white font-medium' : 'text-slate-500 hover:bg-slate-100'
                }`}
              >
                เฉพาะที่ยังไม่ผ่าน
              </button>
              <button
                onClick={() => setFilterMode('critical')}
                className={`px-2.5 py-1 rounded-md transition-colors ${
                  filterMode === 'critical' ? 'bg-slate-800 text-white font-medium' : 'text-slate-500 hover:bg-slate-100'
                }`}
              >
                เฉพาะเกณฑ์จำเป็น
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Checklist items list */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs text-slate-500 px-1">
          <span>แสดง {filteredItems.length} รายการ</span>
          <div className="flex items-center gap-3">
            <button
              onClick={handleCheckAllInView}
              className="text-sky-600 hover:text-sky-800 font-semibold cursor-pointer"
            >
              เลือกทั้งหมดในหน้านี้
            </button>
            <button
              onClick={() => setShowAddCustom(!showAddCustom)}
              className="text-slate-700 hover:text-slate-900 font-semibold inline-flex items-center gap-1 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>เพิ่มบันทึกตรวจสอบเอง</span>
            </button>
          </div>
        </div>

        {/* Custom Item Form */}
        {showAddCustom && (
          <form 
            onSubmit={handleAddCustomItem}
            className="bg-white p-4 rounded-xl border border-sky-300 shadow-sm flex flex-col sm:flex-row items-center gap-2 text-xs"
          >
            <input
              type="text"
              value={newCustomItemText}
              onChange={(e) => setNewCustomItemText(e.target.value)}
              placeholder="พิมพ์ข้อความรายการตรวจสอบที่ต้องการบันทึกเพิ่มเติม..."
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-sky-500 text-sm"
              autoFocus
            />
            <div className="flex items-center gap-2 shrink-0 w-full sm:w-auto justify-end">
              <button
                type="submit"
                className="px-4 py-2 bg-sky-600 hover:bg-sky-500 text-white rounded-lg font-semibold cursor-pointer"
              >
                เพิ่มรายการ
              </button>
              <button
                type="button"
                onClick={() => setShowAddCustom(false)}
                className="px-3 py-2 text-slate-500 hover:text-slate-700"
              >
                ยกเลิก
              </button>
            </div>
          </form>
        )}

        {/* Checklist Rows */}
        <div className="space-y-2.5">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => toggleItem(item.id)}
              className={`p-4 rounded-xl border transition-all cursor-pointer flex items-start justify-between gap-3 group ${
                item.isChecked
                  ? 'bg-emerald-50/60 border-emerald-300 shadow-2xs'
                  : 'bg-white border-slate-200 hover:border-sky-400'
              }`}
            >
              <div className="flex items-start gap-3">
                <button
                  type="button"
                  className={`mt-0.5 w-5 h-5 rounded flex items-center justify-center transition-colors shrink-0 ${
                    item.isChecked
                      ? 'bg-emerald-600 text-white'
                      : 'border-2 border-slate-300 text-transparent group-hover:border-sky-500'
                  }`}
                  aria-label={item.isChecked ? 'ทำเครื่องหมายแล้ว' : 'ยังไม่ได้ทำเครื่องหมาย'}
                >
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </button>

                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    {item.critical && (
                      <span className="bg-rose-100 text-rose-700 border border-rose-200 font-bold text-[10px] px-1.5 py-0.2 rounded">
                        จำเป็นต้องมี
                      </span>
                    )}
                    {item.referenceDoc && (
                      <span className="bg-slate-100 text-slate-600 font-mono text-[10px] px-1.5 py-0.2 rounded">
                        {item.referenceDoc}
                      </span>
                    )}
                    <h4
                      className={`text-sm sm:text-base font-semibold leading-snug ${
                        item.isChecked ? 'text-emerald-950 line-through opacity-80' : 'text-slate-900'
                      }`}
                    >
                      {item.label}
                    </h4>
                  </div>

                  <p className="text-xs text-slate-500 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>

              {item.id.startsWith('custom-') && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteItem(item.id);
                  }}
                  className="p-1 text-slate-400 hover:text-rose-600 rounded transition-colors"
                  title="ลบรายการนี้"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Printable Sheet Card */}
      <div className="bg-slate-100 rounded-2xl p-5 border border-slate-200 text-xs text-slate-600 flex flex-col sm:flex-row items-center justify-between gap-4 print:hidden">
        <div className="flex items-center gap-2">
          <ShieldAlert className="w-4 h-4 text-sky-600 shrink-0" />
          <span>
            สามารถกดปุ่ม <strong>"พิมพ์ใบตรวจ"</strong> เพื่อนำเอกสารสรุปความพร้อมไปแนบประกอบสำนวนหรือกล่องวัตถุพยานได้ทันที
          </span>
        </div>
        <button
          onClick={() => window.print()}
          className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-semibold shrink-0 cursor-pointer"
        >
          พิมพ์เอกสารตรวจเช็ก
        </button>
      </div>

    </div>
  );
};
