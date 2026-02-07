require("dotenv").config();
const mongoose = require("mongoose");
const Content = require("../models/Content.model");

const songs = [
    {
      type: "song",
      title: "Adi Yogi",
      slug: "adi-yogi",
      audioUrl: "/audio/songs/adi-yogi.mp3",
      order: 1,
    },
    {
      type: "song",
      title: "Lingastakam",
      slug: "bramhamurari",
      audioUrl: "/audio/songs/bramhamurari.mp3",
      order: 2,
    },
    {
      type: "song",
      title: "Endi Kondaleletoda",
      slug: "endi-kondaleletoda",
      audioUrl: "/audio/songs/endi-kondaleletoda.mp3",
      order: 3,
    },
    {
      type: "song",
      title: "Jagamantha Neede",
      slug: "jagamantha-neede",
      audioUrl: "/audio/songs/jagamantha-neede.mp3",
      order: 4,
    },
    {
      type: "song",
      title: "Kala-Bhairavastakam",
      slug: "kala-bhairavastakam",
      audioUrl: "/audio/songs/kala-bhairavastakam.mp3",
      order: 5,
    },
    {
      type: "song",
      title: "Omkaaram",
      slug: "omkaaram",
      audioUrl: "/audio/songs/omkaaram.mp3",
      order: 6,
    },
    {
      type: "song",
      title: "Shankaraay",
      slug: "shankaraay",
      audioUrl: "/audio/songs/shankaraay.mp3",
      order: 7,
    },
    {
      type: "song",
      title: "Shiv Tandava",
      slug: "shiv-tandava",
      audioUrl: "/audio/songs/shiv-tandava.mp3",
      order: 8,
    },
    {
      type: "song",
      title: "Shiva Govinda 1",
      slug: "shiva-govinda-1",
      audioUrl: "/audio/songs/shiva-govinda-1.mp3",
      order: 9,
    },
    {
      type: "song",
      title: "Shiva Govinda 2",
      slug: "shiva-govinda-2",
      audioUrl: "/audio/songs/shiva-govinda-2.mp3",
      order: 10,
    },
    {
      type: "song",
      title: "Shiva Stotram",
      slug: "shiva-stotram",
      audioUrl: "/audio/songs/shiva-stotram.mp3",
      order: 11,
    },
    {
      type: "song",
      title: "Sri Kalahasthiswara",
      slug: "sri-kalahasthiswara",
      audioUrl: "/audio/songs/sri-kalahasthiswara.mp3",
      order: 12,
    },
    {
      type: "song",
      title: "Om Namah Shivaya (Chant)",
      slug: "om-namah-shivaya-song",
      audioUrl: "/audio/songs/om-namah-shivaya.mp3",
      order: 13,
    },
    {
      type: "song",
      title: "Aathma Rama",
      slug: "aathma-rama",
      audioUrl: "/audio/songs/aathma-rama.mp3",
      order: 14,
    },
    {
      type: "song",
      title: "Chandrachooda",
      slug: "chandrachooda",
      audioUrl: "/audio/songs/chandrachooda.mp3",
      order: 15,
    },
    {
      type: "song",
      title: "Powerful Shiva Chant",
      slug: "lord-shiva-chant-powerful",
      audioUrl: "/audio/songs/lord-shiva-chant-powerful.mp3",
      order: 16,
    },
    {
      type: "song",
      title: "Shambo Shankara Namah Shiva",
      slug: "shambo-shankara-nama-shiva",
      audioUrl: "/audio/songs/shambo-shankara-nama-shiva.mp3",
      order: 17,
    },
    {
      type: "song",
      title: "Shiv Panchakshari Mantram",
      slug: "shiv-panchakshari-mantram",
      audioUrl: "/audio/songs/shiv-panchakshari-mantram.mp3",
      order: 18,
    },
    {
      type: "song",
      title: "Ganga Daray Shiva",
      slug: "ganga-daray-shiva",
      audioUrl: "/audio/songs/ganga-daray-shiva.mp3",
      order: 19,
    },
    {
      type: "song",
      title: "Shiv Kaliasho Vasi",
      slug: "shiv-kaliasho-vasi",
      audioUrl: "/audio/songs/shiv-kaliasho-vasi.mp3",
      order: 20,
    },
    {
      type: "song",
      title: "Mahadev",
      slug: "mahadev",
      audioUrl: "/audio/songs/mahadev.mp3",
      order: 21,
    },
  ];
async function seed() {
  await mongoose.connect(process.env.MONGO_URI);

  for (const song of songs) {
    await Content.updateOne(
      { slug: song.slug },
      { $setOnInsert: song },
      { upsert: true }
    );
  }

  console.log("✅ Songs seeded successfully");
  process.exit();
}

seed();
