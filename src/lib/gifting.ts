export const eventTypes = ["Wedding", "Corporate Hospitality", "Private Majlis", "Seasonal Gifting"] as const;
export const guestVolumes = ["50–100 guests", "100–300 guests", "300+ guests / Large Scale"] as const;
export const presentations = ["Luxury Velvet Trays", "Clear Acrylic Displays", "Individual Guest Favors"] as const;

export const vessels = ["Royal Velvet Tray", "Clear Acrylic Display", "Wooden Gift Box"] as const;
export const finishes = ["Deep Burgundy", "Emerald Green", "Midnight Navy", "Ivory & Pearl"] as const;
export const signatureFillings = ["Pistachio", "Gianduja", "Salted Caramel", "Praline Noir", "Tiramisu", "Fruit Rouge"] as const;
export const finishingTouches = ["Calligraphed silk ribbon", "Bespoke acrylic topper", "Gold foil seal"] as const;
export const maxFillings = 3;

export type GiftDesign = {
  vessel: string;
  finish: string;
  fillings: string[];
  monogram: string;
  touches: string[];
};

export type GiftingEnquiry = {
  event: string;
  volume: string;
  presentation: string;
  notes: string;
  design?: GiftDesign;
};

export function toggleFilling(current: string[], filling: string) {
  if (current.includes(filling)) return current.filter((f) => f !== filling);
  return current.length >= maxFillings ? current : [...current, filling];
}

export function formatGiftDesign(d: GiftDesign) {
  return [
    `Vessel: ${d.vessel} (${d.finish})`,
    d.fillings.length ? `Fillings: ${d.fillings.join(", ")}` : "",
    d.monogram.trim() ? `Monogram / message: ${d.monogram.trim()}` : "",
    d.touches.length ? `Finishing touches: ${d.touches.join(", ")}` : "",
  ].filter(Boolean).join("\n");
}

// Set only once the business supplies a verified international WhatsApp number.
export const businessWhatsAppNumber: string = "";

export function formatGiftingEnquiry(enquiry: GiftingEnquiry) {
  return [
    "Hello Occasion Chocolate, I would like a bespoke gifting proposal.",
    `Occasion: ${enquiry.event}`,
    `Guest count / volume: ${enquiry.volume}`,
    `Presentation: ${enquiry.presentation}`,
    enquiry.design ? `Design:\n${formatGiftDesign(enquiry.design)}` : "",
    enquiry.notes.trim() ? `Additional details: ${enquiry.notes.trim()}` : "",
    "Please share availability and arrange a private tasting in Dammam.",
  ].filter(Boolean).join("\n");
}

export function giftingWhatsAppUrl(enquiry: GiftingEnquiry, phone: string) {
  const digits = phone.replace(/\D/g, "");
  if (!digits) return null;
  return `https://wa.me/${digits}?text=${encodeURIComponent(formatGiftingEnquiry(enquiry))}`;
}