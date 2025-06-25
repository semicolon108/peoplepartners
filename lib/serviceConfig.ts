// app/lib/serviceConfig.ts (Extract config for reuse)
export const serviceConfig = {
  bpo: {
    title: 'Business Process Outsourcing',
    description: 'Streamline operations by outsourcing non-core HR functions',
    icon: '⚙️',
    gradient: 'linear-gradient(135deg, #059669 0%, #10b981 100%)',
  },
  'career-transitioning': {
    title: 'Career Transitioning',
    description: 'Professional career coaching and CV optimization',
    icon: '🚀',
    gradient: 'linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)',
  },
  'hr-consulting': {
    title: 'HR Consulting',
    description: 'Strategic HR guidance and optimization',
    icon: '📊',
    gradient: 'linear-gradient(135deg, #ea580c 0%, #f97316 100%)',
  },
  payroll: {
    title: 'Payroll Services',
    description: 'Complete payroll management with full compliance',
    icon: '💼',
    gradient: 'linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)',
  },
  peo: {
    title: 'PEO / Employer of Record',
    description: 'Enter Lao market without legal entity',
    icon: '🏢',
    gradient: 'linear-gradient(135deg, #dc2626 0%, #ef4444 100%)',
  },
  recruitment: {
    title: 'Recruitment Services',
    description: 'Access top talent through our network',
    icon: '👥',
    gradient: 'linear-gradient(135deg, #7c2d12 0%, #ea580c 100%)',
  },
  'salary-survey': {
    title: 'Salary Survey',
    description: 'Data-driven salary intelligence for compensation planning',
    icon: '📈',
    gradient: 'linear-gradient(135deg, #be185d 0%, #ec4899 100%)',
  },
  visa: {
    title: 'Visa & Immigration',
    description: 'Complete visa and work permit assistance',
    icon: '✈️',
    gradient: 'linear-gradient(135deg, #0891b2 0%, #06b6d4 100%)',
  },
} as const

export type ServiceKey = keyof typeof serviceConfig