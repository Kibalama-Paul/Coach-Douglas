export interface BannerContent {
  brandName: string;
  navLinks: string[];
  ctaText: string;
  greeting: string;
  titleLine1: string;
  titleLine2: string;
  quoteTitle: string;
  quoteDescription: string;
  services: Array<{
    id: string;
    name: string;
  }>;
  statusBadgeText: string;
  showStatusBadge: boolean;
  themeStyle: 'pure-black' | 'onyx-black';
}

export interface ColorDefinition {
  name: string;
  percentage: string;
  hex: string;
  description: string;
  role: string;
}

export interface TrainingTicket {
  ticketId: string;
  clientName: string;
  clientEmail: string;
  packageId: string;
  packageName: string;
  packagePrice: string;
  goalProgram: string;
  dateBooked: string;
  expiryDate: string;
  duration: string;
  notes?: string;
  createdAt: string;
  status: 'CONFIRMED' | 'ACTIVE' | 'PENDING';
}
