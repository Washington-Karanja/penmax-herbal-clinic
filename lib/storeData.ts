export type Product = {
  id: number;
  slug: string;
  name: string;
  category: "Herbal Remedies" | "Beauty & Skincare";
  description: string;
  longDescription: string;
  ingredients: string;
  usage: string;
  price: number;
  badge?: "Bestseller" | "New";
  image: string;
  gallery: string[];
  variants: { name: string; price: number }[];
  reviews: number;
  rating: number;
  inStock: boolean;
};

const galleryImages = {
  capsules: [
    "https://images.unsplash.com/photo-1611073761742-bce90ccd60ae?auto=format&fit=crop&w=1100&q=90",
    "https://images.unsplash.com/photo-1563911892437-1feda0179e1b?auto=format&fit=crop&w=1100&q=88",
    "https://images.unsplash.com/photo-1563822249548-9a72b6353cd1?auto=format&fit=crop&w=1100&q=88",
  ],
  tea: [
    "https://images.unsplash.com/photo-1571934811356-5cc061b6821f?auto=format&fit=crop&w=1100&q=90",
    "https://images.unsplash.com/photo-1563822249366-3efb23b8e0c9?auto=format&fit=crop&w=1100&q=88",
    "https://images.unsplash.com/photo-1514733670139-4d87a1941d55?auto=format&fit=crop&w=1100&q=88",
  ],
  skincare: [
    "https://images.unsplash.com/photo-1748543668676-ea8241cb3886?auto=format&fit=crop&w=1100&q=90",
    "https://images.unsplash.com/photo-1748543668751-902d6461890d?auto=format&fit=crop&w=1100&q=88",
    "https://images.unsplash.com/photo-1748543669178-efd3de4e64e0?auto=format&fit=crop&w=1100&q=88",
  ],
  butter: [
    "https://images.unsplash.com/photo-1739949154765-f2a23bdfa3f4?auto=format&fit=crop&w=1100&q=90",
    "https://images.unsplash.com/photo-1772987714654-2df39af2c658?auto=format&fit=crop&w=1100&q=88",
    "https://images.unsplash.com/photo-1748543668646-e81cda0890f3?auto=format&fit=crop&w=1100&q=88",
  ],
  oil: [
    "https://images.unsplash.com/photo-1671493235081-5842463637cd?auto=format&fit=crop&w=1100&q=90",
    "https://images.unsplash.com/photo-1671493234842-6e600f721982?auto=format&fit=crop&w=1100&q=88",
    "https://images.unsplash.com/photo-1671493229048-4dddd00ca84a?auto=format&fit=crop&w=1100&q=88",
  ],
  spice: [
    "https://images.unsplash.com/photo-1516715043227-1cdf27bcd09a?auto=format&fit=crop&w=1100&q=90",
    "https://images.unsplash.com/photo-1643067077447-78239a403a18?auto=format&fit=crop&w=1100&q=88",
    "https://images.unsplash.com/photo-1563822249548-9a72b6353cd1?auto=format&fit=crop&w=1100&q=88",
  ],
};

export const products: Product[] = [
  {
    id: 1,
    slug: "moringa-wellness-capsules",
    name: "Moringa Wellness Capsules",
    category: "Herbal Remedies",
    description: "Daily plant-based vitality support.",
    longDescription: "A considered daily botanical ritual made with finely milled moringa leaf. Naturally rich in plant nutrients, this balanced blend supports everyday vitality and complements a mindful wellness routine.",
    ingredients: "Pure moringa leaf powder, vegetable capsule. No artificial colours, flavours, or unnecessary fillers.",
    usage: "Take two capsules daily with water after a meal. Keep in a cool, dry place.",
    price: 1850,
    badge: "Bestseller",
    image: galleryImages.capsules[0],
    gallery: galleryImages.capsules,
    variants: [{ name: "30 capsules", price: 1850 }, { name: "60 capsules", price: 3200 }],
    reviews: 46,
    rating: 4.9,
    inStock: true,
  },
  {
    id: 2,
    slug: "herbal-detox-tea",
    name: "Herbal Detox Tea",
    category: "Herbal Remedies",
    description: "A bright, restorative botanical blend.",
    longDescription: "A fragrant, caffeine-free infusion designed for slow mornings and gentle evening rituals. Its layered botanicals support hydration and natural wellbeing with a clean, refreshing finish.",
    ingredients: "Hibiscus, lemongrass, ginger, moringa leaf, and dried citrus peel.",
    usage: "Steep one teaspoon in freshly boiled water for 5–7 minutes. Enjoy once or twice daily.",
    price: 1450,
    badge: "Bestseller",
    image: galleryImages.tea[0],
    gallery: galleryImages.tea,
    variants: [{ name: "100g pouch", price: 1450 }, { name: "250g pouch", price: 2850 }],
    reviews: 71,
    rating: 4.8,
    inStock: true,
  },
  {
    id: 3,
    slug: "aloe-vera-comfort-gel",
    name: "Aloe Vera Comfort Gel",
    category: "Beauty & Skincare",
    description: "Cooling care for calm, nourished skin.",
    longDescription: "A lightweight botanical gel for face and body that cools on contact and leaves skin feeling calm, soft, and replenished. Ideal after sun exposure or whenever skin needs quiet comfort.",
    ingredients: "Aloe vera leaf gel, cucumber extract, glycerin, vitamin E, and a gentle plant-derived preservative.",
    usage: "Smooth a small amount over clean skin as needed. For an extra-cooling ritual, store in the refrigerator.",
    price: 1200,
    badge: "New",
    image: galleryImages.skincare[0],
    gallery: galleryImages.skincare,
    variants: [{ name: "100ml", price: 1200 }, { name: "250ml", price: 2350 }],
    reviews: 28,
    rating: 4.7,
    inStock: true,
  },
  {
    id: 4,
    slug: "shea-neem-body-butter",
    name: "Shea & Neem Body Butter",
    category: "Beauty & Skincare",
    description: "Deep moisture with a velvety finish.",
    longDescription: "A rich, slow-melting body butter that cushions dry skin with lasting moisture. Shea butter and neem are blended with botanical oils for skin that feels supple, protected, and beautifully soft.",
    ingredients: "Unrefined shea butter, neem oil, baobab oil, vitamin E, and natural botanical fragrance.",
    usage: "Warm a small amount between your palms and massage into slightly damp skin, focusing on dry areas.",
    price: 1650,
    image: galleryImages.butter[0],
    gallery: galleryImages.butter,
    variants: [{ name: "100ml", price: 1650 }, { name: "250ml", price: 3100 }],
    reviews: 39,
    rating: 4.9,
    inStock: true,
  },
  {
    id: 5,
    slug: "hibiscus-glow-face-oil",
    name: "Hibiscus Glow Face Oil",
    category: "Beauty & Skincare",
    description: "A radiant ritual for supple skin.",
    longDescription: "A silken facial oil pairing hibiscus with nutrient-rich botanical oils. The lightweight blend nourishes the skin barrier and promotes a soft, naturally luminous finish without feeling heavy.",
    ingredients: "Hibiscus-infused sunflower oil, rosehip oil, jojoba oil, baobab oil, and vitamin E.",
    usage: "Press 2–3 drops into clean, slightly damp skin in the evening. Follow with moisturiser if desired.",
    price: 2100,
    badge: "New",
    image: galleryImages.oil[0],
    gallery: galleryImages.oil,
    variants: [{ name: "30ml", price: 2100 }, { name: "60ml", price: 3750 }],
    reviews: 34,
    rating: 4.8,
    inStock: true,
  },
  {
    id: 6,
    slug: "ginger-turmeric-blend",
    name: "Ginger Turmeric Blend",
    category: "Herbal Remedies",
    description: "Warming roots for everyday wellbeing.",
    longDescription: "A vibrant pantry blend with earthy turmeric and warming ginger. Stir it into tea, golden milk, or smoothies as an easy way to support a balanced everyday wellness routine.",
    ingredients: "Turmeric root, ginger root, cinnamon, and a touch of black pepper.",
    usage: "Mix half a teaspoon into warm milk, water, tea, or smoothies once daily.",
    price: 1350,
    image: galleryImages.spice[0],
    gallery: galleryImages.spice,
    variants: [{ name: "100g jar", price: 1350 }, { name: "250g jar", price: 2600 }],
    reviews: 52,
    rating: 4.8,
    inStock: true,
  },
  {
    id: 7,
    slug: "herbal-hair-growth-oil",
    name: "Herbal Hair Growth Oil",
    category: "Beauty & Skincare",
    description: "Nourishes roots and supports strong hair.",
    longDescription: "A concentrated scalp and hair oil infused with Kenyan botanicals. The blend nourishes roots, supports the look of stronger hair, and helps seal moisture into textured hair.",
    ingredients: "Castor oil, rosemary-infused sunflower oil, neem oil, moringa oil, and peppermint essential oil.",
    usage: "Massage a small amount into the scalp 2–3 times weekly. Smooth any remainder through the lengths.",
    price: 1950,
    badge: "Bestseller",
    image: galleryImages.oil[2],
    gallery: [galleryImages.oil[2], galleryImages.oil[1], galleryImages.oil[0]],
    variants: [{ name: "100ml", price: 1950 }, { name: "250ml", price: 3600 }],
    reviews: 63,
    rating: 4.9,
    inStock: true,
  },
  {
    id: 8,
    slug: "pure-black-seed-oil",
    name: "Pure Black Seed Oil",
    category: "Herbal Remedies",
    description: "Cold-pressed for natural daily rituals.",
    longDescription: "Pure, cold-pressed black seed oil with its naturally bold aroma and character intact. A versatile botanical staple for personal care and considered daily wellness rituals.",
    ingredients: "100% cold-pressed black seed oil (Nigella sativa).",
    usage: "Use a small amount as part of your preferred food or personal-care ritual. Store away from direct sunlight.",
    price: 1750,
    image: "https://images.unsplash.com/photo-1671493234254-15fc6c91aa87?auto=format&fit=crop&w=1100&q=90",
    gallery: ["https://images.unsplash.com/photo-1671493234254-15fc6c91aa87?auto=format&fit=crop&w=1100&q=90", galleryImages.oil[0], galleryImages.oil[1]],
    variants: [{ name: "100ml", price: 1750 }, { name: "250ml", price: 3250 }],
    reviews: 41,
    rating: 4.7,
    inStock: true,
  },
];

export const testimonials = [
  { quote: "The care in every detail is unmistakable. My tea ritual has become the calmest part of my day.", name: "Amara N.", country: "Nairobi, Kenya" },
  { quote: "Beautifully packed, thoughtfully made, and delivered to London sooner than expected. The face oil feels exceptional.", name: "Wanjiku M.", country: "London, UK" },
  { quote: "I love knowing the ingredients are simple and rooted in nature. Penmax has earned a permanent place on my shelf.", name: "Lena A.", country: "Toronto, Canada" },
];
