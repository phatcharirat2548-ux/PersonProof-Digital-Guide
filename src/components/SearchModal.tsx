import React, { useState, useEffect, useMemo, useRef } from 'react';
import { 
  Search, 
  X, 
  BookOpen, 
  CheckSquare, 
  GitBranch, 
  ArrowRight, 
  CornerDownLeft,
  Tag,
  ShieldAlert
} from 'lucide-react';
import { SOP_ITEMS, INITIAL_CHECKLIST, WORKFLOW_STAGES } from '../data/forensicData';
import { SOPItem, TabType } from '../types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectSOP: (item: SOPItem) => void;
  onNavigateTab: (tab: TabType, extraId?: string) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectSOP,
  onNavigateTab,
}) => {
  const [query, setQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
      setSelectedFilter('all');
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else {
          // Open handled by parent, but prevent browser search
        }
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const searchResults = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) {
      return {
        sops: SOP_ITEMS.slice(0, 4),
        checklist: [],
        workflow: [],
        isDefault: true
      };
    }

    const filteredSOPs = SOP_ITEMS.filter((item) => {
      if (selectedFilter !== 'all' && item.category !== selectedFilter) return false;
      const matchTitle = item.title.toLowerCase().includes(q);
      const matchCode = item.code.toLowerCase().includes(q);
      const matchSummary = item.summary.toLowerCase().includes(q);
      const matchCategory = item.categoryLabel.toLowerCase().includes(q);
      const matchTags = item.tags.some(t => t.toLowerCase().includes(q));
      const matchSteps = item.steps.some(s => s.title.toLowerCase().includes(q) || s.description.toLowerCase().includes(q));
      return matchTitle || matchCode || matchSummary || matchCategory || matchTags || matchSteps;
    });

    const filteredChecklist = INITIAL_CHECKLIST.filter((chk) => {
      return chk.label.toLowerCase().includes(q) || chk.description.toLowerCase().includes(q);
    });

    const filteredWorkflow = WORKFLOW_STAGES.filter((wf) => {
      return wf.title.toLowerCase().includes(q) || 
             wf.unitName.toLowerCase().includes(q) || 
             wf.role.toLowerCase().includes(q) ||
             wf.actions.some(a => a.toLowerCase().includes(q));
    });

    return {
      sops: filteredSOPs,
      checklist: filteredChecklist,
      workflow: filteredWorkflow,
      isDefault: false
    };
  }, [query, selectedFilter]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-12 md:pt-20 px-3 md:px-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full border border-slate-200 overflow-hidden text-slate-800 flex flex-col max-h-[82vh]">
        
        {/* Search Input Bar */}
        <div className="p-4 bg-slate-900 border-b border-slate-800 flex items-center gap-3">
          <Search className="w-5 h-5 text-sky-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="ค้นหาขั้นตอน SOP, รหัส, วัตถุพยานชีวภาพ, ดีเอ็นเอ, ลายนิ้วมือ, ป.วิ.อ...."
            className="w-full bg-transparent text-white placeholder-slate-400 text-sm md:text-base focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-slate-400 hover:text-white rounded"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-mono transition-colors"
          >
            ESC
          </button>
        </div>

        {/* Category Filters Bar */}
        <div className="px-4 py-2.5 bg-slate-50 border-b border-slate-200 flex items-center gap-2 overflow-x-auto text-xs shrink-0">
          <span className="text-slate-400 text-[11px] shrink-0">กรองหมวด:</span>
          {[
            { id: 'all', label: 'ทั้งหมด' },
            { id: 'living-person', label: 'บุคคลมีชีวิต' },
            { id: 'deceased-person', label: 'ศพนิรนาม / DVI' },
            { id: 'dna-biology', label: 'DNA & ชีววิทยา' },
            { id: 'odontology-anthropology', label: 'ทันตกรรม' },
            { id: 'fingerprints', label: 'ลายนิ้วมือ' },
            { id: 'official-documents', label: 'เอกสารราชการ' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedFilter(cat.id)}
              className={`px-2.5 py-1 rounded-full whitespace-nowrap transition-colors cursor-pointer ${
                selectedFilter === cat.id
                  ? 'bg-sky-600 text-white font-medium shadow-xs'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Results Body */}
        <div className="p-4 md:p-6 overflow-y-auto space-y-6 flex-1 text-sm">
          {searchResults.isDefault && (
            <div className="text-xs text-slate-400 font-medium uppercase tracking-wider mb-2">
              ขั้นตอนแนะนำและค้นหาบ่อย:
            </div>
          )}

          {/* SOPs Results */}
          {searchResults.sops.length > 0 && (
            <div className="space-y-2.5">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-500 uppercase tracking-wider">
                <span className="flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5 text-sky-600" />
                  ขั้นตอนการปฏิบัติงาน (SOPs) ({searchResults.sops.length})
                </span>
              </div>

              <div className="space-y-2">
                {searchResults.sops.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => {
                      onClose();
                      onSelectSOP(item);
                    }}
                    className="group p-3.5 rounded-xl border border-slate-200 hover:border-sky-500 hover:bg-sky-50/50 transition-all cursor-pointer flex items-start justify-between gap-3 bg-white shadow-2xs"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="bg-sky-100 text-sky-900 font-mono text-[11px] font-bold px-2 py-0.5 rounded">
                          {item.code}
                        </span>
                        <span className="text-xs text-slate-500">
                          {item.categoryLabel}
                        </span>
                      </div>
                      <h4 className="font-bold text-slate-900 group-hover:text-sky-700 transition-colors">
                        {item.title}
                      </h4>
                      <p className="text-xs text-slate-600 line-clamp-1">
                        {item.summary}
                      </p>
                    </div>

                    <div className="flex items-center gap-1 text-sky-600 opacity-0 group-hover:opacity-100 transition-opacity shrink-0 pt-2 text-xs font-medium">
                      <span>เปิดอ่าน</span>
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Checklist Items Results */}
          {searchResults.checklist.length > 0 && (
            <div className="space-y-2.5 pt-2 border-t border-slate-100">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-500 uppercase tracking-wider">
                <span className="flex items-center gap-1.5">
                  <CheckSquare className="w-3.5 h-3.5 text-emerald-600" />
                  รายการตรวจสอบความพร้อม (Checklist) ({searchResults.checklist.length})
                </span>
              </div>

              <div className="space-y-2">
                {searchResults.checklist.map((chk) => (
                  <div
                    key={chk.id}
                    onClick={() => {
                      onClose();
                      onNavigateTab('checklist');
                    }}
                    className="p-3 rounded-xl border border-slate-200 hover:border-emerald-500 hover:bg-emerald-50/40 transition-all cursor-pointer flex items-start justify-between gap-3 bg-white"
                  >
                    <div className="space-y-1 text-xs">
                      <div className="flex items-center gap-2">
                        {chk.critical && (
                          <span className="bg-rose-100 text-rose-700 font-bold px-1.5 py-0.5 rounded text-[10px]">
                            จำเป็นต้องมี
                          </span>
                        )}
                        <span className="font-semibold text-slate-800">{chk.label}</span>
                      </div>
                      <p className="text-slate-500">{chk.description}</p>
                    </div>
                    <span className="text-[11px] text-emerald-700 font-medium shrink-0 pt-1">
                      ไปที่ Checklist →
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Workflow Stages Results */}
          {searchResults.workflow.length > 0 && (
            <div className="space-y-2.5 pt-2 border-t border-slate-100">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-500 uppercase tracking-wider">
                <span className="flex items-center gap-1.5">
                  <GitBranch className="w-3.5 h-3.5 text-indigo-600" />
                  ช่วงผังขั้นตอนการประสานงาน (Workflow) ({searchResults.workflow.length})
                </span>
              </div>

              <div className="space-y-2">
                {searchResults.workflow.map((wf) => (
                  <div
                    key={wf.id}
                    onClick={() => {
                      onClose();
                      onNavigateTab('workflow', wf.id);
                    }}
                    className="p-3 rounded-xl border border-slate-200 hover:border-indigo-500 hover:bg-indigo-50/40 transition-all cursor-pointer flex items-start justify-between gap-3 bg-white"
                  >
                    <div className="space-y-1 text-xs">
                      <div className="flex items-center gap-2">
                        <span className="bg-indigo-100 text-indigo-800 font-bold px-1.5 py-0.5 rounded text-[10px]">
                          ช่วงที่ {wf.stageNumber}
                        </span>
                        <span className="font-bold text-slate-900">{wf.title}</span>
                      </div>
                      <p className="text-slate-600">{wf.unitName}</p>
                    </div>
                    <span className="text-[11px] text-indigo-700 font-medium shrink-0 pt-1">
                      ดูผังงาน →
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* No results */}
          {!searchResults.isDefault && 
           searchResults.sops.length === 0 && 
           searchResults.checklist.length === 0 && 
           searchResults.workflow.length === 0 && (
            <div className="text-center py-10 space-y-3">
              <div className="inline-flex p-3 bg-slate-100 text-slate-400 rounded-full">
                <Search className="w-8 h-8" />
              </div>
              <h4 className="font-bold text-slate-800">ไม่พบข้อมูลที่ตรงกับคำค้นหา "{query}"</h4>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                ลองค้นหาด้วยคำอื่น เช่น "DNA", "ลายนิ้วมือ", "ชันสูตร", "ป.วิ.อ.", "หนังสือส่งตรวจ", หรือ "กระพุ้งแก้ม"
              </p>
            </div>
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="px-4 py-2.5 bg-slate-100 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500 shrink-0">
          <div className="flex items-center gap-2">
            <span className="font-mono bg-white px-1.5 py-0.5 rounded border border-slate-300 text-[10px]">Enter</span>
            <span>เพื่อเลือกรายการ</span>
          </div>
          <div className="flex items-center gap-1 text-[11px] text-amber-700">
            <ShieldAlert className="w-3.5 h-3.5 text-amber-600" />
            <span>ระบบต้นแบบข้อมูลสมมติ</span>
          </div>
        </div>
      </div>
    </div>
  );
};
