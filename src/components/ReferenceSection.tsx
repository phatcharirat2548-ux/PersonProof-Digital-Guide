import React, { useState } from 'react';
import { 
  FileText, 
  ExternalLink, 
  Clock, 
  ShieldAlert, 
  Building, 
  Phone, 
  MapPin, 
  CheckCircle2, 
  Send, 
  AlertTriangle,
  History,
  BookMarked
} from 'lucide-react';
import { REFERENCES_LIST, REVISION_HISTORY_LOG, CONTACT_DIRECTORY, SYSTEM_DISCLAIMER } from '../data/forensicData';

export const ReferenceSection: React.FC = () => {
  const [feedbackTitle, setFeedbackTitle] = useState('');
  const [feedbackBody, setFeedbackBody] = useState('');
  const [feedbackSuccess, setFeedbackSuccess] = useState(false);

  const handleSubmitFeedback = (e: React.FormEvent) => {
    e.preventDefault();
    if (!feedbackTitle || !feedbackBody) return;
    setFeedbackSuccess(true);
    setTimeout(() => {
      setFeedbackTitle('');
      setFeedbackBody('');
      setFeedbackSuccess(false);
    }, 3500);
  };

  return (
    <div className="space-y-8 pb-12 animate-in fade-in duration-300">
      
      {/* Header Info */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs space-y-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold bg-sky-100 text-sky-800 px-2 py-0.5 rounded uppercase tracking-wider">
              Legal & Standard References
            </span>
            <span className="text-xs text-amber-700 font-semibold bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
              สถานะต้นแบบ v1.2
            </span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
            แหล่งอ้างอิงทางวิชาการและประวัติการปรับปรุงข้อมูล
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            เอกสารอ้างอิงทางกฎหมาย มาตรฐานสากล ระเบียบปฏิบัติราชการ และบันทึกประวัติการปรับปรุงเนื้อหา
          </p>
        </div>

        {/* Prototype Legal Disclaimer Card */}
        <div className="bg-amber-50 border-l-4 border-amber-500 rounded-r-2xl p-4 text-xs sm:text-sm text-amber-900 space-y-1">
          <div className="flex items-center gap-2 font-bold text-amber-950">
            <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
            <span>คำชี้แจงสถานะเอกสารและการอนุมัติ</span>
          </div>
          <p className="text-amber-800 leading-relaxed font-medium">
            {SYSTEM_DISCLAIMER.th}
          </p>
        </div>
      </div>

      {/* Standards & References List */}
      <div className="space-y-4">
        <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
          <BookMarked className="w-5 h-5 text-sky-600" />
          กฎหมาย มาตรฐานสากล และแนวทางปฏิบัติที่ใช้อ้างอิง
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {REFERENCES_LIST.map((ref) => (
            <div
              key={ref.id}
              className="bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs hover:border-slate-300 transition-all flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider ${
                    ref.type === 'law' ? 'bg-purple-100 text-purple-800' :
                    ref.type === 'standard' ? 'bg-blue-100 text-blue-800' :
                    ref.type === 'guideline' ? 'bg-emerald-100 text-emerald-800' :
                    'bg-slate-100 text-slate-700'
                  }`}>
                    {ref.type === 'law' ? 'บทบัญญัติกฎหมาย' :
                     ref.type === 'standard' ? 'มาตรฐานสากล' :
                     ref.type === 'guideline' ? 'ระเบียบ ตร.' : 'เอกสารวิชาการ'}
                  </span>
                  <span className="text-xs text-slate-400 font-mono">{ref.year}</span>
                </div>

                <h3 className="font-bold text-slate-900 text-base leading-snug">
                  {ref.title}
                </h3>

                <p className="text-xs text-slate-500 font-medium">
                  แหล่งที่มา: {ref.source}
                </p>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pt-1">
                  {ref.description}
                </p>
              </div>

              {ref.urlLabel && (
                <div className="pt-3 mt-3 border-t border-slate-100 text-xs text-sky-600 font-medium flex items-center gap-1">
                  <span>ค้นคว้าเพิ่มเติม: {ref.urlLabel}</span>
                  <ExternalLink className="w-3 h-3" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Revision History Log */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <History className="w-5 h-5 text-indigo-600" />
            <h2 className="text-base sm:text-lg font-bold text-slate-900">
              ประวัติและวันที่ปรับปรุงข้อมูลในคู่มือ (Revision History)
            </h2>
          </div>
          <span className="text-xs text-slate-400">เวอร์ชันปัจจุบัน 1.2</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-slate-700 font-semibold">
                <th className="py-2.5 px-3">เวอร์ชัน</th>
                <th className="py-2.5 px-3">วันที่ปรับปรุง</th>
                <th className="py-2.5 px-3">รายละเอียดการแก้ไข / เพิ่มเติม</th>
                <th className="py-2.5 px-3">ผู้จัดทำ</th>
                <th className="py-2.5 px-3">สถานะการรับรอง</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-600">
              {REVISION_HISTORY_LOG.map((rev, index) => (
                <tr key={index} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3 px-3 font-mono font-bold text-slate-900">{rev.version}</td>
                  <td className="py-3 px-3 whitespace-nowrap text-slate-500">{rev.date}</td>
                  <td className="py-3 px-3 leading-relaxed max-w-md">{rev.summary}</td>
                  <td className="py-3 px-3 whitespace-nowrap text-slate-500">{rev.editor}</td>
                  <td className="py-3 px-3 whitespace-nowrap">
                    <span className="inline-block bg-amber-100 text-amber-800 text-[11px] font-semibold px-2 py-0.5 rounded border border-amber-200">
                      {rev.approvalStatus}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Institutional Contact Directory */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs space-y-4">
        <div className="flex items-center gap-2">
          <Building className="w-5 h-5 text-blue-700" />
          <h2 className="text-base sm:text-lg font-bold text-slate-900">
            หน่วยงานประสานงาน สถาบันนิติเวชวิทยา โรงพยาบาลตำรวจ
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {CONTACT_DIRECTORY.map((contact, i) => (
            <div key={i} className="bg-slate-50 rounded-xl p-4 border border-slate-200/80 space-y-2 text-xs">
              <h3 className="font-bold text-slate-900 text-sm">{contact.title}</h3>
              <p className="text-sky-700 font-semibold flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5" />
                {contact.phone}
              </p>
              <p className="text-slate-600 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                {contact.hours}
              </p>
              <p className="text-slate-500 flex items-start gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                {contact.location}
              </p>
              <div className="pt-2 border-t border-slate-200 text-slate-500 italic">
                {contact.note}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Proposal / Feedback Submission Box */}
      <div className="bg-gradient-to-br from-slate-900 to-blue-950 text-white rounded-3xl p-6 md:p-8 border border-slate-800 shadow-md space-y-4">
        <div>
          <span className="text-xs font-bold text-sky-400 uppercase tracking-wider">
            Continuous Improvement Form
          </span>
          <h3 className="text-xl font-bold text-white mt-1">
            เสนอแนะเพื่อปรับปรุงขั้นตอนการปฏิบัติงานในคู่มือ (สำหรับเจ้าหน้าที่)
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            หากท่านพบจุดที่ควรเพิ่มเติมตามระเบียบใหม่ หรือต้องการเสนอแนะการปรับปรุงขั้นตอน สามารถส่งข้อคิดเห็นเข้าสู่คณะทำงานได้
          </p>
        </div>

        {feedbackSuccess ? (
          <div className="bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 p-4 rounded-xl flex items-center gap-3 text-sm">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
            <span>บันทึกข้อเสนอแนะต้นแบบเรียบร้อยแล้ว ข้อมูลจะถูกนำเข้าสู่วาระการประชุมพิจารณาต่อไป</span>
          </div>
        ) : (
          <form onSubmit={handleSubmitFeedback} className="space-y-3">
            <div>
              <label className="block text-xs text-slate-300 mb-1">หัวข้อหรือรหัส SOP ที่ต้องการเสนอแนะ:</label>
              <input
                type="text"
                value={feedbackTitle}
                onChange={(e) => setFeedbackTitle(e.target.value)}
                placeholder="เช่น เสนอปรับปรุง SOP-LP-002 ข้อกำหนดการเก็บตัวอย่าง Buccal Swab..."
                className="w-full px-3.5 py-2.5 bg-slate-800/80 border border-slate-700 rounded-xl text-white placeholder-slate-400 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
                required
              />
            </div>
            <div>
              <label className="block text-xs text-slate-300 mb-1">รายละเอียดข้อเสนอแนะ / ระเบียบที่เกี่ยวข้อง:</label>
              <textarea
                value={feedbackBody}
                onChange={(e) => setFeedbackBody(e.target.value)}
                placeholder="ระบุข้อเท็จจริงหรือข้อเสนอแนะทางวิชาการ..."
                rows={3}
                className="w-full px-3.5 py-2.5 bg-slate-800/80 border border-slate-700 rounded-xl text-white placeholder-slate-400 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 resize-none"
                required
              />
            </div>
            <button
              type="submit"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs sm:text-sm rounded-xl transition-colors cursor-pointer"
            >
              <Send className="w-4 h-4" />
              <span>ส่งข้อเสนอแนะเข้าสู่ระบบต้นแบบ</span>
            </button>
          </form>
        )}
      </div>

    </div>
  );
};
