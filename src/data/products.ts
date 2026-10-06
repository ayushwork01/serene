// import Patchouli Orange from "@/assets/Patchouli Orange Cream & Sachet.png";
// import Calmness from "@/assets/Calmness Cream & Sachet.png";
// import Ocean Thirst from "@/assets/Ocean Thirst Cream & Sachet.png";
// import Pina Nirvana from "@/assets/Pina Nirvana Cream & Sachet.png";
// import Gulab Noir from "@/assets/Gulab Noir Cream & Sachet.png";

import patchouliOrange from "@/assets/Patchouli Orange Cream & Sachet.png";
import calmness from "@/assets/Calmness Cream & Sachet.png";
import oceanThirst from "@/assets/Ocean Thirst Cream and Sachet.png";
import pinaNirvana from "@/assets/Pina Nirvana Cream & Sachet.png";
import gulabNoir from "@/assets/Gulab Noir Cream & Sachet.png";

export type Product = {
  id: number;
  name: string;
  image: string;
  description: string;
  notes: string;
};

// Edit names, descriptions and notes here. Kept in alphabetical order.
// export const products: Product[] = [
//   { id: 1, name: "Chamomile Comfort", image: chamomile, description: "A soft, gentle cream for slow evenings and quiet moments.", notes: "Chamomile · Honey · Oat" },
//   { id: 2, name: "Jasmine Glow", image: jasmine, description: "Light and luminous, made for bright everyday self-care.", notes: "Jasmine · Neroli · White tea" },
//   { id: 3, name: "Lavender Calm", image: lavender, description: "Our calming classic, for winding down at the end of the day.", notes: "Lavender · Sweet almond · Vanilla" },
//   { id: 4, name: "Rose Bloom", image: rose, description: "A rich, nourishing cream with a delicate floral warmth.", notes: "Rose · Geranium · Shea" },
//   { id: 5, name: "Sandalwood Serenity", image: sandalwood, description: "Warm and grounding, for a steady moment of calm.", notes: "Sandalwood · Cedar · Cocoa butter" },
// ];
export const products: Product[] = [
  {
    id: 1,
    name: "Patchouli Orange",
    image: patchouliOrange,
    description: "Sweet citrus over warm, musky earth.",
    notes: "Citrus · Patchouli · Musk",
  },
  {
    id: 2,
    name: "Calmness",
    image: calmness,
    description: "Fresh, floral and herbaceous with a gentle apple-tree character.",
    notes: "Floral · Herbs · Apple",
  },
  {
    id: 3,
    name: "Ocean Thirst",
    image: oceanThirst,
    description: "Crisp sea salt air, ozone, and cool mint.",
    notes: "Sea Salt · Ozone · Mint",
  },
  {
    id: 4,
    name: "Pina Nirvana",
    image: pinaNirvana,
    description: "Sweet pineapple, creamy coconut, and warm vanilla.",
    notes: "Pineapple · Coconut · Vanilla",
  },
  {
    id: 5,
    name: "Gulab Noir",
    image: gulabNoir,
    description: "Deep, velvety rose layered with smoky, dark woods.",
    notes: "Rose · Smoky Woods · Dark Woods",
  },
];