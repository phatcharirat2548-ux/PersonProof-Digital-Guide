import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  Bookmark, 
  Layers, 
  FileCheck, 
  AlertTriangle, 
  ArrowRight, 
  Calendar, 
  Check, 
  FolderOpen,
  X,
  ShieldAlert
} from 'lucide-react';
import { SOP_CATEGORIES, SOP_ITEMS } from '../data/forensicData';
import { SOPItem } from '../types';

interface CategoriesSectionProps {
  initialCategoryId?: string | null;
  onSelectSOP: (sop: SOPItem) => void;
  bookmarkedIds: string[];
  onToggleBookmark: (id: string) => void;
}

export const CategoriesSection: React.FC<CategoriesSectionProps> = ({
  initialCategoryId,
  onSelectSOP,
  bookmarkedIds,
  onToggleBookmark
}) => {
  const [activeCategory, setActiveCategory] = useState<string>(initialCategoryId || 'all');
  const [searchQuery, setSearchQuery] = useState('');
  const [onlyBookmarks, setOnlyBookmarks] = useState(false);

  const filteredItems = useMemo(() => {
    return SOP_ITEMS.filter((item) => {
      // Bookmark filter
      if (onlyBookmarks && !bookmarkedIds.includes(item.id)) {
        return false;
      }

      // Category filter
      if (activeCategory !== 'all' && item.category !== activeCategory) {
        return false;
      }

      // Search query filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchTitle = item.title.toLowerCase().includes(q);
        const matchCode = item.code.toLowerCase().includes(q);
        const matchSummary = item.summary.toLowerCase().includes(q);
        const matchTags = item.tags.some(t => t.toLowerCase().includes(q));
        const matchDoc = item.requiredDocuments.some(d => d.toLowerCase().includes(q));
        return matchTitle || matchCode || matchSummary || matchTags || matchDoc;
      }

      return true;
    });
  }, [activeCategory, searchQuery, onlyBookmarks, bookmarkedIds]);

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-300">
      
      {/* Header Info */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold bg-sky-100 text-sky-800 px-2 py-0.5 rounded uppercase tracking-wider">
                SOP Directory
              </span>
              <span className="text-xs text-amber-700 font-semibold bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                ข้อมูลตัวอย่างสมมติเพื่อการทดสอบ
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
              หมวดหมู่ขั้นตอนการปฏิบัติงาน (Standard Operating Procedures)
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              คู่มือขั้นตอนมาตรฐานสำหรับการตรวจพิสูจน์เอกลักษณ์บุคคล การเก็บรักษาวัตถุพยานชีวภาพ และการจัดเตรียมเอกสาร
            </p>
          </div>

          {/* Bookmarks toggle button */}
          <button
            onClick={() => setOnlyBookmarks(!onlyBookmarks)}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer shrink-0 ${
              onlyBookmarks
                ? 'bg-amber-500 text-slate-950 shadow-md'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
            }`}
          >
            <Bookmark className={`w-4 h-4 ${onlyBookmarks ? 'fill-slate-950' : ''}`} />
            <span>รายการที่บันทึกไว้ ({bookmarkedIds.length})</span>
          </button>
        </div>

        {/* Search bar inside section */}
        <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ค้นหาชื่อขั้นตอน รหัส SOP คำสำคัญ (เช่น ป.วิ.อ., Buccal swab, น้ำยา, ถุงมือ)..."
              className="w-full pl-10 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:bg-white transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {(searchQuery || activeCategory !== 'all' || onlyBookmarks) && (
            <button
              onClick={() => {
                setSearchQuery('');
                setActiveCategory('all');
                setOnlyBookmarks(false);
              }}
              className="text-xs text-sky-600 hover:text-sky-800 font-semibold px-3 py-2 shrink-0 cursor-pointer"
            >
              ล้างตัวกรองทั้งหมด
            </button>
          )}
        </div>

        {/* Category Pills Bar */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 pt-1 no-scrollbar text-xs">
          <button
            onClick={() => {
              setActiveCategory('all');
              setOnlyBookmarks(false);
            }}
            className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-all cursor-pointer ${
              activeCategory === 'all' && !onlyBookmarks
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
            }`}
          >
            ทั้งหมด ({SOP_ITEMS.length})
          </button>

          {SOP_CATEGORIES.map((cat) => {
            const isSelected = activeCategory === cat.id && !onlyBookmarks;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  setActiveCategory(cat.id);
                  setOnlyBookmarks(false);
                }}
                className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-sky-600 text-white shadow-xs'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
                }`}
              >
                <span>{cat.title}</span>
                <span className={`text-[11px] px-1.5 py-0.2 rounded-full ${isSelected ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-600'}`}>
                  {cat.itemCount}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Procedure List Results */}
      <div className="space-y-4">
        <div className="flex items-center justify-between text-xs text-slate-500 px-1">
          <span>แสดง {filteredItems.length} จากทั้งหมด {SOP_ITEMS.length} ขั้นตอน</span>
          <span className="text-amber-700 font-medium hidden sm:inline">
            *คลิกที่บัตรเพื่อดูขั้นตอนและเอกสารประกอบฉบับเต็ม
          </span>
        </div>

        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredItems.map((item) => {
              const isBookmarked = bookmarkedIds.includes(item.id);
              return (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl p-5 border border-slate-200 hover:border-sky-500 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between group"
                >
                  <div className="space-y-3">
                    {/* Card Header */}
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-mono text-xs font-bold bg-sky-100 text-sky-900 px-2.5 py-0.5 rounded">
                          {item.code}
                        </span>
                        <span className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded">
                          {item.categoryLabel}
                        </span>
                      </div>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onToggleBookmark(item.id);
                        }}
                        className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                          isBookmarked
                            ? 'bg-amber-100 text-amber-700'
                            : 'text-slate-400 hover:text-amber-600 hover:bg-slate-50'
                        }`}
                        title={isBookmarked ? 'ลบออกจากรายการที่บันทึก' : 'บันทึกเป็นรายการโปรด'}
                      >
                        <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-amber-500' : ''}`} />
                      </button>
                    </div>

                    {/* Title */}
                    <h3 
                      onClick={() => onSelectSOP(item)}
                      className="font-bold text-base sm:text-lg text-slate-900 group-hover:text-sky-700 transition-colors cursor-pointer leading-snug"
                    >
                      {item.title}
                    </h3>

                    {/* Summary */}
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-2">
                      {item.summary}
                    </p>

                    {/* Quick highlights: Steps and Required Docs */}
                    <div className="space-y-2 pt-2 border-t border-slate-100 text-xs">
                      <div className="flex items-center gap-1.5 text-slate-600">
                        <Layers className="w-3.5 h-3.5 text-sky-600 shrink-0" />
                        <span className="font-medium">จำนวนขั้นตอน:</span>
                        <span>{item.steps.length} ขั้นตอน</span>
                      </div>

                      <div className="flex items-start gap-1.5 text-slate-600">
                        <FileCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span className="font-medium shrink-0">เอกสารสำคัญ:</span>
                        <span className="line-clamp-1 text-slate-500">
                          {item.requiredDocuments[0]} ({item.requiredDocuments.length} รายการ)
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Card Bottom CTA */}
                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-[11px] text-slate-400 flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {item.lastUpdated}
                    </span>

                    <button
                      onClick={() => onSelectSOP(item)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-sky-50 group-hover:bg-sky-600 text-sky-700 group-hover:text-white text-xs font-semibold transition-all cursor-pointer"
                    >
                      <span>ดูวิธีปฏิบัติฉบับเต็ม</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 space-y-3">
            <div className="inline-flex p-3 bg-slate-100 text-slate-400 rounded-full">
              <FolderOpen className="w-8 h-8" />
            </div>
            <h3 className="font-bold text-slate-800 text-lg">ไม่พบขั้นตอนปฏิบัติงานที่ตรงกับเงื่อนไข</h3>
            <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto">
              ลองเปลี่ยนคำค้นหา หรือคลิกปุ่มด้านล่างเพื่อล้างตัวกรองและแสดงขั้นตอนทั้งหมด
            </p>
            <div className="pt-2">
              <button
                onClick={() => {
                  setSearchQuery('');
                  setActiveCategory('all');
                  setOnlyBookmarks(false);
                }}
                className="px-4 py-2 bg-sky-600 hover:bg-sky-500 text-white rounded-xl text-xs font-semibold transition-colors"
              >
                แสดงขั้นตอนทั้งหมด
              </button>
            </div>
          </div>
        )}
      </div>

    </div>
  );
};
