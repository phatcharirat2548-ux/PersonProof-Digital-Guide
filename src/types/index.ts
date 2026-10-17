export type TabType = 'home' | 'categories' | 'workflow' | 'checklist' | 'references';

export interface SOPStep {
  stepNumber: number;
  title: string;
  description: string;
  details?: string[];
  cautions?: string;
  equipmentOrForms?: string[];
  responsibleRole?: string;
}

export interface SOPItem {
  id: string;
  code: string;
  title: string;
  category: string;
  categoryLabel: string;
  summary: string;
  objective: string;
  scope: string;
  requiredDocuments: string[];
  steps: SOPStep[];
  cautions: string[];
  referenceStandard: string;
  tags: string[];
  lastUpdated: string;
}

export interface SOPCategory {
  id: string;
  code: string;
  title: string;
  titleEn: string;
  description: string;
  iconName: string;
  itemCount: number;
  highlightColor: string;
}

export interface WorkflowNode {
  id: string;
  stageNumber: number;
  title: string;
  unitName: string;
  role: string;
  description: string;
  inputs: string[];
  actions: string[];
  outputs: string[];
  cautions: string[];
  coordinationContact: string;
  estimatedTimeline: string;
}

export interface ChecklistItem {
  id: string;
  category: 'official-request' | 'packaging' | 'living-person' | 'deceased-id';
  label: string;
  description: string;
  critical: boolean; // Must have
  referenceDoc?: string;
  isChecked: boolean;
}

export interface ReferenceItem {
  id: string;
  title: string;
  source: string;
  year: string;
  type: 'law' | 'standard' | 'guideline' | 'academic';
  description: string;
  urlLabel?: string;
}

export interface RevisionHistory {
  version: string;
  date: string;
  summary: string;
  editor: string;
  approvalStatus: 'ฉบับร่างต้นแบบ (Draft Prototype)' | 'รอการพิจารณา' | 'อนุมัติแล้ว';
}
