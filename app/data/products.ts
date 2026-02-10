// app/data/products.ts

export type Product = {
  id: number;
  name: string;
  price: number;
  images: string[];
  description: string;
  /**
   * Local favorites counter (optional).
   * Useful for UI + placeholder; replace with real DB later.
   */
  favorites?: number;
};

export const products: Product[] = [
  {
    id: 1,
    name: "Engraved Aluminium Business Card (Ask for Bulk Orders)",
    price: 10.00,
    images: ["/images/buss.JPG"],
    description: `Introducing our exquisite 0.2mm aluminium business cards, the perfect blend of durability and elegance! Crafted from high-quality aluminium, these cards are not only lightweight but also incredibly strong, making them a lasting impression in the world of networking.
Each card is precision-engraved with your unique design, ensuring that your brand stands out with a modern and professional aesthetic. The sleek metallic finish adds a touch of sophistication, while the matte or brushed options give a contemporary feel that’s sure to catch the eye.
Ideal for entrepreneurs, creatives, and professionals alike, these business cards are perfect for making a memorable statement at meetings, conferences, or networking events. With their resistance to wear and tear, they’ll maintain their pristine appearance, representing your brand effectively over time.
Upgrade your networking game with our aluminium business cards and leave a lasting impression that speaks volumes about your brand’s quality and commitment to excellence!`,
    favorites: 0,
  },
  {
    id: 2,
    name: "Dog Tag Stainless Steel",
    price: 10.00,
    images: ["/images/dogTagFront.JPG", "/images/dogTagBack.JPG"],
    description: `Introducing our premium laser-engraved stainless steel dog tags, designed to provide both style and security for your beloved pet! Crafted from high-quality stainless steel, these tags are not only durable and resistant to wear, but they also feature a sleek, polished finish that catches the eye.
Each tag is expertly engraved with your pet’s name and your contact information, ensuring that they can always find their way back home. The precision laser engraving guarantees clear visibility, so important details are easy to read. Plus, the smooth edges ensure comfort for your furry friend, making it the perfect accessory for everyday wear.
Available in various shapes and sizes, our dog tags can be customised to match your pet’s personality. Whether you prefer a classic round tag or a trendy bone shape, we’ve got you covered. With our stainless steel dog tags, you can rest assured knowing that your pet is not only stylish but also safe.
Give your pet the gift of security with our laser-engraved stainless steel dog tags and let their personality shine through!`,
    favorites: 0,
  },
  {
    id: 3,
    name: "Selfie :-)",
    price: 10.0,
    images: ["/images/selfie.JPG"],
    description: `Introducing our stunning 0.2mm thick aluminium cards, perfect for showcasing your cherished memories! These lightweight yet durable cards are designed for engraving high-quality images, allowing you to immortalise your favourite moments in style.
Each card features a sleek surface ideal for detailed engraving, making it easy to customise with your chosen pictures. Once engraved, you can display your cards in a stylish frame or simply place them on a shelf, creating a unique and personal touch to any space.
Whether you’re looking to celebrate special occasions, commemorate milestones, or simply decorate your home, these aluminium cards offer a modern and elegant way to display your memories. Their minimalist design complements any decor, making them perfect gifts for loved ones or a delightful addition to your own collection.
Elevate your space and keep your treasured moments close with our versatile aluminium cards—where memories meet artistry!`,
    favorites: 0,
  },
  {
    id: 4,
    name: "Engraved RFID (pre-order, not in stock)",
    price: 30.0,
    images: ["/images/walletF.jpg", "/images/walletB.jpg"],
    description: `Engraved RFID Card Protector: Metal and Wood Elegance
Protect your cards in style with our unique engraved RFID card protector. Crafted with a stunning combination of durable metal and rich wood, this card holder not only safeguards your essential cards from identity theft but also adds a touch of sophistication to your everyday carry.
The sleek metal side offers robust protection against RFID skimming, while the beautifully engraved wooden side provides a warm, natural aesthetic. Personalise it with your choice of engraving, making it a perfect gift for yourself or a loved one.
Features:
• Dual Material Design: Metal for maximum durability and wood for a touch of elegance.
• Custom Engraving: Personalise with initials, a special date, or a unique design.
• RFID Protection: Safeguards against electronic pickpocketing.
• Compact Size: Fits easily in your pocket or wallet.
Elevate your accessory game while ensuring your peace of mind. Order yours today!`,
    favorites: 0,
  },
  //{
  // id: 5,
  // name: "Personalised knives (not in stock, order yours today)",
  //price: 30.00,
  //images: ["/images/kit1.JPG", "/images/kit2.JPG"],
  //description:
  //  "Elegant, engraved and ready to gift, these knives are the perfect personalized present for anyone who loves to cook. The fine engraving on the blade adds a unique, custom touch, transforming a practical tool into a meaningful keepsake that can be cherished and used every day.",
  //favorites: 0,
  //},
  {
    id: 6,
    name: "Customised Pandative (low stock)",
    price: 8.00,
    images: ["/images/pen1.JPG", "/images/pend1.JPG", "/images/pend.JPG"],
    description: "Create a unique and meaningful gift with our personalized laser-engraved pendants. Each pendant is custom-made with your photo, symbol, or text, carefully engraved with high-precision laser technology for a sharp and lasting finish. Perfect as a gift for loved ones, anniversaries, birthdays, memorials, or special occasions, these pendants turn your favourite memories and messages into a beautiful piece of jewellery you can wear every day",
    favorites: 0,
  },
  
   {
     id: 7,
    name: "Cat 🐈 Pendant",
     price: 8.0,
     images: ["/images/cat1.JPG", "/images/cat2.JPG"],
     description: `Great gift idea for:
       • Friends and family who adore their cats
       • Pet parents who want a keepsake to remind them of their furry friend
       • Anyone who loves minimalist, meaningful jewelry

       Add a touch of feline charm to your daily look or surprise a cat lover with a special, custom-engraved pendant they’ll treasure.
     You can customize this pendant – contact me if you’d like a different cat design, name, or a special message added!
     Celebrate your love for cats with this elegant laser-engraved aluminum pendant. 
     Lightweight yet durable, this piece is perfect for everyday wear and makes a thoughtful gift for any cat lover.
     Each pendant features a finely detailed cat design, permanently engraved with laser precision onto high-quality aluminum.
     The result is a clean, modern look that won’t fade, peel, or wash off.`,
     favorites: 0,
   },
   {
     id: 8,
    name: "Wooden keychains ",
     price: 8.0,
     images: ["/images/woodenkeychain.JPG", "/images/key.JPG"],
     description: `Great gift idea for:
       • Someone who loves the outdoors

       I make these beautiful Walnut Wood & Leather keychains right here in Salford.

🏔️ The Design: I can engrave outdoor themes (like in the photo), OR any custom text/name you want.
✨ Personalized: Add a name, a date, or a coordinate on the back!
Perfect for car keys, campervans, or hiking backpacks. Beautiful real wood keychains with leather strap.

Can be engraved with ANY name, message, or logo you want.
The laser burn gives a lovely rustic look that doesn't fade.`,
     favorites: 0,
   },
];