import { describe, expect, it } from "vitest";
import { formatGiftingEnquiry, giftingWhatsAppUrl, guestVolumes, toggleFilling } from "./gifting";

describe("bespoke gifting enquiry", () => {
  const enquiry = { event: "Wedding", volume: "50–100 guests", presentation: "Luxury Velvet Trays", notes: "Ivory ribbons" };
  it("includes the approved three volume tiers", () => {
    expect(guestVolumes).toEqual(["50–100 guests", "100–300 guests", "300+ guests / Large Scale"]);
  });
  it("carries the exact selections into the proposal message", () => {
    expect(formatGiftingEnquiry(enquiry)).toContain("Occasion: Wedding\nGuest count / volume: 50–100 guests\nPresentation: Luxury Velvet Trays\nAdditional details: Ivory ribbons");
  });
  it("limits signature fillings to three", () => {
    expect(toggleFilling(["Pistachio", "Gianduja", "Tiramisu"], "Praline Noir")).toEqual(["Pistachio", "Gianduja", "Tiramisu"]);
    expect(toggleFilling(["Pistachio"], "Pistachio")).toEqual([]);
  });
  it("carries the customised design into the proposal message", () => {
    const msg = formatGiftingEnquiry({ ...enquiry, design: { vessel: "Royal Velvet Tray", finish: "Emerald Green", fillings: ["Pistachio"], monogram: "S & N", touches: ["Gold foil seal"] } });
    expect(msg).toContain("Vessel: Royal Velvet Tray (Emerald Green)\nFillings: Pistachio\nMonogram / message: S & N\nFinishing touches: Gold foil seal");
  });
  it("does not open an unaddressed WhatsApp enquiry", () => {
    expect(giftingWhatsAppUrl(enquiry, "")).toBeNull();
  });
  it("encodes the complete enquiry when a contact is provided", () => {
    const url = giftingWhatsAppUrl(enquiry, "+1 202 555 0123");
    expect(url).toBe(`https://wa.me/12025550123?text=${encodeURIComponent(formatGiftingEnquiry(enquiry))}`);
  });
});