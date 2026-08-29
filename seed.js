import mongoose from "mongoose";
import dotenv from "dotenv";
import HijabStyle from "./models/HijabStyle.js";

dotenv.config();

const styles = [
  {
    name: "Turkish Style",
    description:
      "A sleek, voluminous wrap known for its clean lines and elegant side pin. Popular for both everyday wear and formal occasions, it uses a rectangular scarf tucked neatly at the crown for a polished silhouette.",
    imageUrl:
      "https://images.unsplash.com/photo-1585728748176-455ac5eed962?auto=format&fit=crop&w=800&q=80",
    tags: ["elegant", "formal", "everyday"],
  },
  {
    name: "Al-Amira",
    description:
      "A simple two-piece style consisting of a fitted cap and a matching tube scarf. Easy to put on and secure, it's a favorite for sports, school, and casual outings where comfort and convenience matter most.",
    imageUrl:
      "https://images.unsplash.com/photo-1613611927458-3ddd4b0afdb9?auto=format&fit=crop&w=800&q=80",
    tags: ["casual", "sporty", "beginner-friendly"],
  },
  {
    name: "Shayla Wrap",
    description:
      "A long rectangular scarf draped over the head and pinned at the shoulders, leaving one end flowing loosely. Loved across the Gulf region for its breezy, relaxed drape that still looks put-together.",
    imageUrl:
      "https://images.unsplash.com/photo-1613447895817-e617a4093f50?auto=format&fit=crop&w=800&q=80",
    tags: ["relaxed", "gulf-style", "breathable"],
  },
  {
    name: "Khaleeji Style",
    description:
      "A dramatic, voluminous style featuring a teased top layer for extra height and a flowing drape down the back. Often worn for weddings and special events for its bold, glamorous look.",
    imageUrl:
      "https://images.unsplash.com/photo-1640154852340-9de73a0643a8?auto=format&fit=crop&w=800&q=80",
    tags: ["glamorous", "occasion", "voluminous"],
  },
  {
    name: "Crimson Tarha",
    description:
      "A rich, deep-red drape with soft folds that frame the face. This style favors flowing, uncomplicated wraps in bold jewel tones, popular for making a striking statement without heavy styling.",
    imageUrl:
      "https://images.unsplash.com/photo-1662806407800-56793fa8e924?auto=format&fit=crop&w=800&q=80",
    tags: ["bold", "jewel-tone", "statement"],
  },
  {
    name: "Chiffon Blue Wrap",
    description:
      "A lightweight chiffon scarf in a soft sky-blue tone, wrapped loosely for a breathable, airy finish. Ideal for warm-weather days when comfort matters as much as style.",
    imageUrl:
      "https://images.unsplash.com/photo-1542380841-5eef57349ca1?auto=format&fit=crop&w=800&q=80",
    tags: ["chiffon", "lightweight", "summer"],
  },
  {
    name: "Pashmina Drape",
    description:
      "A soft, textured pashmina in a rich purple hue, draped with gentle folds for warmth and softness. A cold-weather favorite that pairs elegance with cozy, tactile fabric.",
    imageUrl:
      "https://images.unsplash.com/photo-1693985007521-e08e64770947?auto=format&fit=crop&w=800&q=80",
    tags: ["pashmina", "cozy", "winter"],
  },
  {
    name: "Veil Blue Classic",
    description:
      "A timeless, understated wrap in a deep blue tone with a clean, single-layer finish. Simple to tie and versatile enough to pair with almost any outfit for daily wear.",
    imageUrl:
      "https://images.unsplash.com/photo-1730454626266-e6d47134c044?auto=format&fit=crop&w=800&q=80",
    tags: ["classic", "versatile", "everyday"],
  },
  {
    name: "Balcony Casual",
    description:
      "A relaxed, low-maintenance style with a loose drape and minimal pinning, worn for at-home comfort or quick errands. Function-first, without sacrificing a put-together look.",
    imageUrl:
      "https://images.unsplash.com/photo-1643326217693-d046e41815be?auto=format&fit=crop&w=800&q=80",
    tags: ["casual", "relaxed", "low-maintenance"],
  },
  {
    name: "Modern Minimalist White",
    description:
      "A crisp, all-white wrap with sharp, clean lines and minimal embellishment. A go-to for professional settings and modest-minimalist wardrobes that favor simplicity.",
    imageUrl:
      "https://images.unsplash.com/photo-1552874869-5c39ec9288dc?auto=format&fit=crop&w=800&q=80",
    tags: ["minimalist", "professional", "clean"],
  },
  {
    name: "Maroon Chic",
    description:
      "A structured wrap in a deep maroon shade, styled with a slight forward drape for a chic, editorial finish. Often paired with tailored outerwear for a polished, fashion-forward look.",
    imageUrl:
      "https://images.unsplash.com/photo-1574297500578-afae55026ff3?auto=format&fit=crop&w=800&q=80",
    tags: ["chic", "editorial", "outerwear"],
  },
  {
    name: "Abaya Set Black",
    description:
      "A coordinated black hijab and abaya set with a fluid, floor-length silhouette. A modest-fashion staple for formal gatherings, prayer, and occasions calling for understated elegance.",
    imageUrl:
      "https://images.unsplash.com/photo-1668028554854-245f8ccae15b?auto=format&fit=crop&w=800&q=80",
    tags: ["abaya", "formal", "elegant"],
  },
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected for seeding");

    await HijabStyle.deleteMany({});
    console.log("Cleared existing hijab styles");

    const created = await HijabStyle.insertMany(styles);
    console.log(`Seeded ${created.length} hijab styles`);

    process.exit(0);
  } catch (err) {
    console.error("Seeding failed:", err.message);
    process.exit(1);
  }
}

seed();
