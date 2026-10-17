import React, { useState } from 'react';
import { 
  GitBranch, 
  ArrowRight, 
  CheckCircle2, 
  AlertTriangle, 
  FileText, 
  Clock, 
  Phone, 
  Building, 
  ShieldAlert, 
  ChevronRight,
  Layers,
  Send,
  Workflow
} from 'lucide-react';
import { WORKFLOW_STAGES } from '../data/forensicData';
import { TabType } from '../types';

interface WorkflowSectionProps {
  onNavigateTab: (tab: TabType) => void;
  selectedStageId?: string;
}

export const WorkflowSection: React.FC<WorkflowSectionProps> = ({
  onNavigateTab,
  selectedStageId
}) => {
  const [activeStageId, setActiveStageId] = useState<string>(
    selectedStageId || 'stage-1'
  );
  const [simulationMode, setSimulationMode] = useState<'standard' | 'living' | 'deceased'>('standard');

  const activeStage = WORKFLOW_STAGES.find((s) => s.id === activeStageId) || WORKFLOW_STAGES[0];

  return (
    <div className="space-y-8 pb-12 animate-in fade-in duration-300">
      
      {/* Section Header */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold bg-indigo-100 text-indigo-800 px-2 py-0.5 rounded uppercase tracking-wider">
                Interactive Coordination Flow
              </span>
              <span className="text-xs text-amber-700 font-semibold bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                ตัวอย่างผังงานสมมติ
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
              ผังขั้นตอนการทำงานและการประสานงานระหว่างหน่วยงาน
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              แสดงสายธารกระบวนการตั้งแต่การสอบสวนในที่เกิดเหตุ การรับพยานหลักฐาน การตรวจพิสูจน์เฉพาะทาง จนถึงการออกรายงานผลราชการ
            </p>
          </div>

          {/* Simulation mode switcher */}
          <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl text-xs font-semibold self-start md:self-center">
            <button
              onClick={() => setSimulationMode('standard')}
              className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                simulationMode === 'standard'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              ภาพรวมทั่วไป
            </button>
            <button
              onClick={() => setSimulationMode('living')}
              className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                simulationMode === 'living'
                  ? 'bg-sky-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              เส้นทางบุคคลมีชีวิต
            </button>
            <button
              onClick={() => setSimulationMode('deceased')}
              className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                simulationMode === 'deceased'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              เส้นทางศพนิรนาม
            </button>
          </div>
        </div>

        {/* Prototype notice */}
        <div className="bg-amber-50 border border-amber-200/80 rounded-xl p-3 flex items-start gap-2.5 text-xs text-amber-900">
          <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <span>
            <strong>ข้อความกำกับ:</strong> ผังขั้นตอนนี้สร้างขึ้นเพื่อแสดงต้นแบบการประสานงานสารสนเทศ ต้องได้รับการตรวจสอบและอนุมัติจากสถาบันนิติเวชวิทยา โรงพยาบาลตำรวจ ก่อนใช้งานจริง
          </span>
        </div>
      </div>

      {/* Interactive Process Flow Timeline Nodes */}
      <div className="space-y-3">
        <h2 className="text-sm font-bold text-slate-500 uppercase tracking-wider px-1 flex items-center gap-2">
          <Workflow className="w-4 h-4 text-sky-600" />
          เลือกลำดับขั้นตอนเพื่อดูรายละเอียดการประสานงาน
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {WORKFLOW_STAGES.map((stage) => {
            const isActive = stage.id === activeStageId;
            return (
              <div
                key={stage.id}
                onClick={() => setActiveStageId(stage.id)}
                className={`relative p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                  isActive
                    ? 'bg-slate-900 text-white border-sky-400 shadow-lg scale-[1.02]'
                    : 'bg-white hover:bg-slate-50 text-slate-800 border-slate-200 hover:border-slate-300'
                }`}
              >
                {/* Active marker pill */}
                {isActive && (
                  <div className="absolute -top-2.5 left-5 bg-sky-500 text-slate-950 font-bold text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wider">
                    กำลังแสดง
                  </div>
                )}

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-sm ${
                      isActive ? 'bg-sky-500 text-slate-950' : 'bg-slate-100 text-slate-700'
                    }`}>
                      {stage.stageNumber}
                    </span>
                    <span className={`text-[11px] font-mono ${isActive ? 'text-sky-300' : 'text-slate-400'}`}>
                      {stage.estimatedTimeline}
                    </span>
                  </div>

                  <div>
                    <h3 className={`font-bold text-base ${isActive ? 'text-white' : 'text-slate-900'}`}>
                      {stage.title}
                    </h3>
                    <p className={`text-xs mt-1 line-clamp-1 ${isActive ? 'text-slate-300' : 'text-slate-500'}`}>
                      {stage.unitName}
                    </p>
                  </div>
                </div>

                <div className="pt-4 mt-2 flex items-center justify-between text-xs font-semibold">
                  <span className={isActive ? 'text-sky-300' : 'text-sky-600'}>
                    คลิกดูหน้าที่และเอกสาร
                  </span>
                  <ChevronRight className={`w-4 h-4 ${isActive ? 'text-sky-300' : 'text-slate-400'}`} />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Active Stage Deep-Dive Detail View */}
      <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-md space-y-8 animate-in fade-in-50 duration-200">
        
        {/* Stage Header Info */}
        <div className="border-b border-slate-200 pb-6 flex flex-col md:flex-row md:items-start justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="bg-sky-600 text-white font-bold text-xs px-2.5 py-0.5 rounded-md">
                ขั้นตอนที่ {activeStage.stageNumber} จาก 4
              </span>
              <span className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md">
                ระยะเวลา: {activeStage.estimatedTimeline}
              </span>
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900">
              {activeStage.title}
            </h2>
            <p className="text-sm font-medium text-sky-700 flex items-center gap-1.5">
              <Building className="w-4 h-4" />
              หน่วยงานรับผิดชอบ: {activeStage.unitName}
            </p>
          </div>

          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80 text-xs text-slate-600 space-y-1 md:max-w-xs shrink-0">
            <div className="font-bold text-slate-900 flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-sky-600" />
              จุดประสานงานหน่วยงาน:
            </div>
            <p>{activeStage.coordinationContact}</p>
          </div>
        </div>

        {/* Roles & Mandates */}
        <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200/80 space-y-2">
          <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
            <Layers className="w-4 h-4 text-sky-600" />
            บทบาทหน้าที่หลัก (Role & Scope of Responsibility)
          </h3>
          <p className="text-slate-700 text-sm leading-relaxed">
            {activeStage.role}
          </p>
          <p className="text-slate-500 text-xs pt-1">
            {activeStage.description}
          </p>
        </div>

        {/* 3-Column Input - Action - Output Flow */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Inputs Column */}
          <div className="bg-sky-50/60 rounded-2xl p-5 border border-sky-100 space-y-3">
            <div className="flex items-center gap-2 text-sky-900 font-bold text-base">
              <FileText className="w-4 h-4 text-sky-600" />
              <h4>1. สิ่งนำเข้า / เอกสาร (Inputs)</h4>
            </div>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
              {activeStage.inputs.map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-500 mt-2 shrink-0"></span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Key Actions Column */}
          <div className="bg-indigo-50/60 rounded-2xl p-5 border border-indigo-100 space-y-3">
            <div className="flex items-center gap-2 text-indigo-900 font-bold text-base">
              <CheckCircle2 className="w-4 h-4 text-indigo-600" />
              <h4>2. วิธีปฏิบัติการ (Key Actions)</h4>
            </div>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
              {activeStage.actions.map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-2 shrink-0"></span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Outputs Column */}
          <div className="bg-emerald-50/60 rounded-2xl p-5 border border-emerald-100 space-y-3">
            <div className="flex items-center gap-2 text-emerald-900 font-bold text-base">
              <Send className="w-4 h-4 text-emerald-600" />
              <h4>3. ผลลัพธ์ที่ได้ (Outputs)</h4>
            </div>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
              {activeStage.outputs.map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 shrink-0"></span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Critical Precautions & Common Pitfalls Callout */}
        <div className="bg-rose-50 border border-rose-200 rounded-2xl p-5 space-y-2">
          <h4 className="font-bold text-rose-950 flex items-center gap-2 text-sm">
            <AlertTriangle className="w-4 h-4 text-rose-600" />
            ข้อควรระวังสำคัญและจุดบกพร่องที่พบบ่อยในขั้นตอนนี้
          </h4>
          <ul className="list-disc pl-5 space-y-1 text-xs sm:text-sm text-rose-900">
            {activeStage.cautions.map((caution, i) => (
              <li key={i}>{caution}</li>
            ))}
          </ul>
        </div>

        {/* Bottom CTA for Workflow */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-100">
          <p className="text-xs text-slate-500">
            ต้องการตรวจสอบความครบถ้วนของเอกสารก่อนเข้าสู่ขั้นตอนนี้?
          </p>
          <button
            onClick={() => onNavigateTab('checklist')}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs sm:text-sm font-semibold transition-colors shadow-sm cursor-pointer"
          >
            <span>เปิดรายการ Checklist ตรวจความพร้อม</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>

    </div>
  );
};
