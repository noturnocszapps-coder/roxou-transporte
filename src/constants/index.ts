export const ROLES = {
  PASSENGER: 'passenger',
  DRIVER: 'driver',
  ADMIN: 'admin',
} as const;

export const DRIVER_STATUS = {
  PENDING: 'pending',
  APPROVED: 'approved',
  REJECTED: 'rejected',
} as const;

export const REQUEST_STATUS = {
  OPEN: 'open',
  FILLED: 'filled',
  CANCELLED: 'cancelled',
} as const;

export const REPORT_REASONS = {
  INAPPROPRIATE_BEHAVIOR: 'inappropriate_behavior',
  HARASSMENT: 'harassment',
  SCAM: 'scam',
  SAFETY_CONCERN: 'safety_concern',
  NO_SHOW: 'no_show',
  OTHER: 'other',
} as const;

export const REPORT_STATUS = {
  PENDING: 'pending',
  RESOLVED: 'resolved',
  DISMISSED: 'dismissed',
} as const;

export const MODERATION_ACTIONS = {
  WARN: 'warn',
  SUSPEND: 'suspend',
  BLOCK: 'block',
  RESOLVE: 'resolve',
} as const;

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  TERMS_ACCEPTANCE: '/terms-acceptance',
  PASSENGER_DASHBOARD: '/dashboard',
  DRIVER_DASHBOARD: '/driver/dashboard',
  DRIVER_ONBOARDING: '/driver/onboarding',
  ADMIN_DASHBOARD: '/admin/dashboard',
  ADMIN_REPORTS: '/admin/reports',
  CHAT: (id: string) => `/chat/${id}`,
} as const;

export const LEGAL_VERSION = '1.0.0';
