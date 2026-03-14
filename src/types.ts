export type UserRole = 'passenger' | 'driver' | 'admin';
export type VerificationStatus = 'pending' | 'approved' | 'rejected';
export type RequestStatus = 'open' | 'filled' | 'cancelled';

export interface Profile {
  id: string;
  role: UserRole;
  fullName: string;
  phone: string;
  avatarUrl?: string;
  createdAt: string;
}

export interface DriverProfile extends Profile {
  status: VerificationStatus;
  documentsUrl?: string;
  driverDashId?: string;
  isAvailable: boolean;
}

export interface TransportRequest {
  id: string;
  passengerId: string;
  eventName: string;
  eventLocation: string;
  eventDate: string;
  status: RequestStatus;
  description: string;
  createdAt: string;
}

export interface ChatConnection {
  id: string;
  requestId: string;
  passengerId: string;
  driverId: string;
  lastMessage?: string;
  updatedAt: string;
}

export interface Message {
  id: string;
  connectionId: string;
  senderId: string;
  content: string;
  createdAt: string;
}
