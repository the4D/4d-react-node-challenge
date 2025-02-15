export type Region = 'eu' | 'apac' | 'na';
export type Department =
  | 'hr'
  | 'it'
  | 'finance'
  | 'operations'
  | 'marketing'
  | 'legal';
export type DocumentType =
  | 'employee_contract'
  | 'performance_review'
  | 'training_certificate'
  | 'compliance_document';

export const REGIONS: Region[] = ['eu', 'apac', 'na'];
export const DEPARTMENTS: Department[] = [
  'hr',
  'it',
  'finance',
  'operations',
  'marketing',
  'legal',
];
export const DOCUMENT_TYPES: DocumentType[] = [
  'employee_contract',
  'performance_review',
  'training_certificate',
  'compliance_document',
];

export const DUMMY_SKILLS = [
  'JavaScript',
  'TypeScript',
  'React',
  'Node.js',
  'Python',
  'Java',
  'C++',
  'SQL',
  'Project Management',
  'Agile',
  'Communication',
  'Leadership',
  'Problem Solving',
  'Analytics',
  'Cloud Computing',
  'DevOps',
  'Security',
  'Data Analysis',
];

export const ROLES = [
  'Software Engineer',
  'Project Manager',
  'Business Analyst',
  'HR Manager',
  'Financial Analyst',
  'Marketing Specialist',
  'Legal Counsel',
  'Operations Manager',
  'IT Administrator',
  'Department Head',
];

export type ExportFormat = 'csv' | 'txt' | 'html' | 'pdf';

export const REGION_LABELS: Record<Region, string> = {
  eu: 'European Union',
  apac: 'Asia Pacific',
  na: 'North America',
};

export const DEPARTMENT_LABELS: Record<Department, string> = {
  hr: 'Human Resources',
  it: 'Information Technology',
  finance: 'Finance',
  operations: 'Operations',
  marketing: 'Marketing',
  legal: 'Legal',
};

export const DOCUMENT_TYPE_LABELS: Record<DocumentType, string> = {
  employee_contract: 'Employee Contract',
  performance_review: 'Performance Review',
  training_certificate: 'Training Certificate',
  compliance_document: 'Compliance Document',
};

export interface FormData {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  region: Region;
  department: Department;
  documentType: DocumentType;
  role: string;
  experience: number;
  skills: string[];
  additionalNotes?: string;
  submittedAt: string;
  status: 'pending' | 'approved' | 'rejected';
  privacyConsent: boolean;
  employeeId: string;              
  phoneNumber: string;             
  salary: number;                  
  startDate: string;              
  supervisorEmail: string;        
  costCenter: string;             
  projectCode: string; 
  emergencyContact: {
    name: string;
    relationship: string;
    phone: string;
  };
  workPreferences: {
    remoteWork: boolean;
    flexibleHours: boolean;
    travelWillingness: string;
  };
  employmentDetails: {
    contractType: 'permanent' | 'contract' | 'temporary';
    probationPeriod: number;
    workingHours: number;
    overtimeEligible: boolean;
  };
  benefits: string[];
  languages: {
    language: string;
    proficiency: 'basic' | 'intermediate' | 'fluent' | 'native';
  }[];
  certifications: {
    name: string;
    issueDate: string;
    expiryDate: string;
    issuingBody: string;
  }[];
  bankingInfo: {
    accountHolder: string;
    bankName: string;
    accountNumber: string;
    routingNumber: string;
  };
  officeDetails: {
    building: string;
    floor: string;
    deskNumber: string;
    parkingSpace: string;
  };
  itRequirements: {
    computerType: 'laptop' | 'desktop' | 'both';
    softwareNeeds: string[];
    accessCards: string[];
  };
}

export const INITIAL_FORM_STATE: Omit<FormData, 'id'> = {
  firstName: '',
  lastName: '',
  email: '',
  role: '',
  department: DEPARTMENTS[0] as Department,
  region: REGIONS[0] as Region,
  documentType: DOCUMENT_TYPES[0] as DocumentType,
  experience: 0,
  skills: [],
  additionalNotes: '',
  submittedAt: '',
  privacyConsent: false,
  status: 'pending',
  employeeId: '',
  phoneNumber: '',
  salary: 0,
  startDate: '',
  supervisorEmail: '',
  costCenter: '',
  projectCode: '',
  emergencyContact: {
    name: '',
    relationship: '',
    phone: '',
  },
  workPreferences: {
    remoteWork: false,
    flexibleHours: false,
    travelWillingness: 'no',
  },
  employmentDetails: {
    contractType: 'permanent',
    probationPeriod: 3,
    workingHours: 40,
    overtimeEligible: true,
  },
  benefits: [],
  languages: [],
  certifications: [],
  bankingInfo: {
    accountHolder: '',
    bankName: '',
    accountNumber: '',
    routingNumber: '',
  },
  officeDetails: {
    building: '',
    floor: '',
    deskNumber: '',
    parkingSpace: '',
  },
  itRequirements: {
    computerType: 'laptop',
    softwareNeeds: [],
    accessCards: [],
  },
};
