export type Service = {
  name: string;
  duration: string;
  price: string;
};

export type ServiceCategory = {
  id: string;
  label: string;
  description: string;
  image: string | null;
  imageAlt: string;
  services: Service[];
};

export const SERVICE_CATEGORIES: ServiceCategory[] = [
  {
    id: "manicure",
    label: "Manicure",
    description:
      "Shaping, cuticle care, and polish — in regular, gel, or dipping powder finishes, with optional nail art.",
    image: "/images/clip-hearts-poster.jpg",
    imageAlt: "Finished manicure with hand-painted nail art",
    services: [
      { name: "Bare Manicure", duration: "15 min", price: "$18" },
      { name: "Classic Manicure", duration: "30 min", price: "$22" },
      { name: "Gel Manicure", duration: "30 min", price: "$38" },
      { name: "Dipping Powder", duration: "40 min", price: "$49" },
      { name: "Dipping Powder Ombre", duration: "1 hr", price: "$64" },
      { name: "Paraffin Manicure", duration: "30 min", price: "$30" },
      { name: "Milk & Honey Spa Manicure", duration: "45 min", price: "$39" },
      { name: "Junior Manicure", duration: "15 min", price: "$15" },
    ],
  },
  {
    id: "pedicure",
    label: "Pedicure",
    description:
      "Soak, exfoliation, and polish for your feet — from a quick express service to a full spa treatment with paraffin or volcanic stone.",
    image: null,
    imageAlt: "",
    services: [
      { name: "Reg Mani-Pedi", duration: "1 hr", price: "$59" },
      { name: "Classic Sea-Salt Pedicure", duration: "45 min", price: "$42" },
      { name: "Gel Pedicure", duration: "45 min", price: "$55" },
      { name: "Bomb Spa Pedicure", duration: "1 hr", price: "$62" },
      { name: "Paraffin Pedicure", duration: "45 min", price: "$52" },
      { name: "Milk & Honey Bomb Spa Pedicure", duration: "1 hr", price: "$59" },
      { name: "Volcano / Organic Pedicure", duration: "1 hr", price: "$69" },
      { name: "CBD Volcano Pedicure", duration: "1 hr", price: "$75" },
      { name: "Express Pedicure", duration: "30 min", price: "$39" },
      { name: "Steam Add On", duration: "15 min", price: "$10" },
      { name: "Junior Pedicure", duration: "15 min", price: "$30" },
    ],
  },
  {
    id: "enhancement",
    label: "Nail Enhancement",
    description:
      "Acrylic, Gel-X, and dipping powder extensions, built to your preferred length and shape, in regular or gel polish.",
    image: "/images/clip-galaxy-poster.jpg",
    imageAlt: "Finished acrylic nail extensions with detailed art",
    services: [
      { name: "Acrylic New Set, Regular Polish", duration: "45 min", price: "$49" },
      { name: "Acrylic Refill, Regular Polish", duration: "30 min", price: "$39" },
      { name: "Acrylic New Set, Gel Polish", duration: "1 hr", price: "$64" },
      { name: "Acrylic Refill, Gel Polish", duration: "45 min", price: "$54" },
      { name: "Acrylic Set Ombre", duration: "1 hr 15 min", price: "$75+" },
      { name: "Dipping Powder with Extensions", duration: "1 hr", price: "$59" },
      { name: "Gel-X or Apres-X Gel", duration: "1 hr", price: "$69–$79" },
    ],
  },
  {
    id: "additional",
    label: "Additional Services",
    description:
      "Quick touch-ups — polish changes and custom nail art for an existing set.",
    image: null,
    imageAlt: "",
    services: [
      { name: "Hand Polish Change", duration: "15 min", price: "$15" },
      { name: "Toes Polish Change", duration: "15 min", price: "$19" },
      { name: "Junior Hand & Toes Polish", duration: "30 min", price: "$20" },
      { name: "Nail Art Design", duration: "15 min", price: "$10 & up" },
    ],
  },
  {
    id: "waxing",
    label: "Waxing",
    description: "Smooth, precise hair removal for brows, face, and body.",
    image: null,
    imageAlt: "",
    services: [
      { name: "Eyebrows", duration: "15 min", price: "$17" },
      { name: "Lips", duration: "15 min", price: "$15" },
      { name: "Chin", duration: "15 min", price: "$17" },
      { name: "Legs", duration: "30 min", price: "$38 & up" },
      { name: "Bikini", duration: "30 min", price: "$38 & up" },
      { name: "Underarms", duration: "15 min", price: "$25" },
    ],
  },
  {
    id: "lash",
    label: "Eyelash Extension",
    description:
      "Classic to dramatic volume lash sets, plus lash lift and tint for a low-maintenance curl.",
    image: "/images/eyelash-extensions.jpg",
    imageAlt: "Lash extensions by T&K",
    services: [
      { name: "Classic New Set", duration: "1 hr 15 min", price: "$100" },
      { name: "Light Volume Set", duration: "2 hr", price: "$120" },
      { name: "Dramatic Volume Set", duration: "2 hr 15 min", price: "$150" },
      { name: "Classic Refill", duration: "1 hr", price: "$70" },
      { name: "Light Volume Refill", duration: "1 hr", price: "$90" },
      { name: "Full Volume Refill", duration: "1 hr", price: "$110" },
      { name: "Lash Lift and Tint", duration: "30 min", price: "$80" },
    ],
  },
];
