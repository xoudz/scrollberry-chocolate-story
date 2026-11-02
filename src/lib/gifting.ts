export const eventTypes = ["Wedding", "Corporate Hospitality", "Private Majlis", "Seasonal Gifting"] as const;
export const guestVolumes = ["50–100 guests", "100–300 guests", "300+ guests / Large Scale"] as const;
export const presentations = ["Luxury Velvet Trays", "Clear Acrylic Displays", "Individual Guest Favors"] as const;

export type GiftingEnquiry = {
  event: string;
  volume: string;
  presentation: string;
  notes: string;
};

// Set only once the business supplies a verified international WhatsApp number.
export const businessWhatsAppNumber: string = "";

export function formatGiftingEnquiry(enquiry: GiftingEnquiry) {
  return [
    "Hello Occasion Chocolate, I would like a bespoke gifting proposal.",
    `Occasion: ${enquiry.event}`,
    `Guest count / volume: ${enquiry.volume}`,
    `Presentation: ${enquiry.presentation}`,
    enquiry.notes.trim() ? `Additional details: ${enquiry.notes.trim()}` : "",
    "Please share availability and arrange a private tasting in Dammam.",
  ].filter(Boolean).join("\n");
}

export function giftingWhatsAppUrl(enquiry: GiftingEnquiry, phone: string) {
  const digits = phone.replace(/\D/g, "");
  if (!digits) return null;
  return `https://wa.me/${digits}?text=${encodeURIComponent(formatGiftingEnquiry(enquiry))}`;
}