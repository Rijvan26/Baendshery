const mongoose = require("mongoose");
require("dotenv").config();
const songModel = require("./src/models/song.model");

const seedSongs = [
  {
    title: "Happy Vibes",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    posterUrl: "https://images.unsplash.com/photo-1514525253361-b83f859b73c0?w=800&auto=format&fit=crop&q=60",
    mood: "happy"
  },
  {
    title: "Mellow Melodies",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    posterUrl: "https://images.unsplash.com/photo-1459749411177-042180ce673c?w=800&auto=format&fit=crop&q=60",
    mood: "sad"
  },
  {
    title: "Energetic Surprise",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    posterUrl: "https://images.unsplash.com/photo-1493225255756-d9584f8606e9?w=800&auto=format&fit=crop&q=60",
    mood: "surprised"
  }
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Connected to DB for seeding...");
    
    // Check if songs already exist
    const count = await songModel.countDocuments();
    if (count === 0) {
      await songModel.insertMany(seedSongs);
      console.log("Database seeded with sample songs!");
    } else {
      console.log("Database already has songs, skipping seed.");
    }
    
    await mongoose.connection.close();
  } catch (err) {
    console.error("Seeding error:", err);
  }
};

seedDB();
