require("dotenv").config();
const mongoose = require("mongoose");
const Content = require("../models/Content.model");

async function seedMantras() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");

    await Content.deleteMany({ type: "mantra" });
    console.log("Old mantras cleared");

    await Content.insertMany([
      // 1️⃣ OM NAMAH SHIVAYA
      {
        type: "mantra",
        title: "Om Namah Shivaya",
        slug: "om-namah-shivaya",
        order: 1,

        text_sanskrit: "ॐ नमः शिवाय",
        text_telugu: "ఓం నమః శివాయ",
        text_hindi: "ॐ नमः शिवाय",
        text_english: "Om Namah Shivaya",

        meaning:
          "I bow to Lord Shiva — the pure consciousness within me. This mantra calms the mind and awakens inner peace.",

        audioUrl: "/audio/mantras/om-namah-shivaya.mp3",
        enable108: true,
      },

      // 2️⃣ MAHAMRITYUNJAYA MANTRA
      {
        type: "mantra",
        title: "Mahamrityunjaya Mantra",
        slug: "mahamrityunjaya",
        isPremium: true,
        order: 2,

        text_sanskrit:
          "ॐ त्र्यम्बकं यजामहे सुगन्धिं पुष्टिवर्धनम् ।\nउर्वारुकमिव बन्धनान्मृत्योर्मुक्षीय मामृतात् ॥",

        text_telugu:
          "ఓం త్ర్యంబకం యజామహే సుగంధిం పుష్టివర్ధనం ।\nఉర్వారుకమివ బంధనాన్ మృత్యోర్ముక్షీయ మామృతాత్ ॥",

        text_hindi:
          "ॐ त्र्यम्बकं यजामहे सुगन्धिं पुष्टिवर्धनम् ।\nउर्वारुकमिव बन्धनान् मृत्योर्मुक्षीय मामृतात् ॥",

        text_english:
          "Om Tryambakam Yajamahe Sugandhim Pushtivardhanam\nUrvarukamiva Bandhanan Mrityor Mukshiya Maamritat",

        meaning:
          "We worship the three-eyed Lord Shiva. May He free us from fear, illness, and death, and grant us immortality.",

        audioUrl: "/audio/mantras/maha-mrityunjaya.mp3",
        enable108: true,
      },

      // 3️⃣ RUDRA MANTRA
      {
        type: "mantra",
        title: "Rudra Mantra",
        slug: "rudra-mantra",
        isPremium: true,
        order: 3,

        text_sanskrit: "ॐ भैरव रुद्राय\nमहा रुद्राय/nकाल रुद्राय/nकल्पान्त रुद्राय/nवीरा रुद्राय/nरुद्र रुद्राय/nघोरा रुद्राय/nअघोरा रुद्राय/nमार्तण्ड रुद्राय/nअण्ड रुद्राय/nब्रह्माण्ड रुद्राय/nचण्ड रुद्राय/nप्रचण्ड रुद्राय/nतण्ड रुद्राय/nशूरा रुद्राय/nवीरा रुद्राय/nभव रुद्राय/nभीम रुद्राय/nअथला रुद्राय/nवितल रुद्राय/nसुतल रुद्राय/nमहातल रुद्राय/nरसातल रुद्राय/nतलातल रुद्राय/nपाताल रुद्राय ..नमो नमः",
        text_telugu: "ఓం బైరవ రుద్రాయ/nమహా రుద్రాయ/nకాల రుద్రాయ/nకల్పాన్త రుద్రాయ/nవీర రుద్రాయ/nరుద్ర రుద్రాయ/nఘొర రుద్రాయ/nఅఘొర రుద్రాయ/nమార్తాండ రుద్రాయ/nఅండ రుద్రాయ/nబ్రహ్మనడ రుద్రాయ/nఛంఢ రుద్రాయ/nప్రచండ రుద్రాయ/nతాండ రుద్రాయ/nశూర రుద్రాయ/nవీర రుద్రాయ/nభవ రుద్రాయ/nబీమ రుద్రాయ/nఅతల రుద్రాయ/nవితల రుద్రాయ/nసుతల రుద్రాయ/nమహాతల రుద్రాయ/nరసాతల రుద్రాయ/nతాలాతల రుద్రాయ/nపాతాళ రుద్రాయ ..నమో నమః",
        text_hindi: "ॐ भैरव रुद्राय/nमहा रुद्राय/nकाल रुद्राय/nकल्पान्त रुद्राय/nवीरा रुद्राय/nरुद्र रुद्राय/nघोरा रुद्राय/nअघोरा रुद्राय/nमार्तण्ड रुद्राय/nअण्ड रुद्राय/nब्रह्माण्ड रुद्राय/nचण्ड रुद्राय/nप्रचण्ड रुद्राय/nतण्ड रुद्राय/nशूरा रुद्राय/nवीरा रुद्राय/nभव रुद्राय/nभीम रुद्राय/nअथला रुद्राय/nवितल रुद्राय/nसुतल रुद्राय/nमहातल रुद्राय/nरसातल रुद्राय/nतलातल रुद्राय/nपाताल रुद्राय ..नमो नमः",
        text_english: "Om Bhairava Rudraaya/nMahaa Rudraaya/nKaala Rudraaya/nKalpanta Rudraaya/nVeeraa Rudraaya/nRudra Rudraaya/nGhora Rudraaya/nAghora Rudraaya/nMaartanda Rudraaya/nAnda Rudraaya/nBrahmaanda Rudraaya/nChanda Rudraaya/nPrachanda Rudraaya/nTanda Rudraaya/nShooraa Rudraaya/nVeeraa Rudraaya/nBhava Rudraaya/nBheema Rudraaya/nAthalaa Rudraaya/nVitala Rudraaya/nSutala Rudraaya/nMahaatala Rudraaya/nRasaatala Rudraaya/nTalaatala Rudraaya/nPaatala Rudraaya ..Namo Namah",

        meaning:
          "Salutations to Rudra — the transforming force that dissolves ignorance and awakens strength.",

        audioUrl: "/audio/mantras/rudra.mp3",
        enable108: true,
      },

      // 4️⃣ KALA BHAIRAVA MANTRA

      {
type: "mantra",
        title: "Kala-Bhairava Mantra",
        slug: "kala-bhairava",
        isPremium: true,
        order: 4,

        text_sanskrit: "न मः शि वा य",
        text_telugu: "న మః శి వా య",
        text_hindi: "न मः शि वा य",
        text_english: "Na Ma Shi Va Ya",

  text: "ॐ ह्रां ह्रीं ह्रूं ह्रैं ह्रौं क्षं\nक्षेत्रपालाय कालभैरवाय नमः",
text_telugu: "ఓం హ్రాం హ్రీం హ్రూం హ్రైం హ్రౌం క్షం\nక్షేత్రపాలాయ కాలభైరవాయ నమః",
   text_hindi: "ॐ ह्रां ह्रीं ह्रूं ह्रैं ह्रौं क्षं\nक्षेत्रपालाय कालभैरवाय नमः",
   text_english: "Om Hraam Hreem Hroom Hraim Hroum Ksham\nKshetrapalaaya Kaala Bhairavaaya Namah",

   meaning:
     "Salutations to Kala Bhairava, protector from fear and guardian of time.",
     audioUrl: "/audio/mantras/kala-bhairava.mp3",
     enable108: true,

   order: 4,
 },
      
    ]);

    console.log("✅ Module 2 Mantras seeded successfully");
    process.exit(0);
  } catch (err) {
    console.error("❌ Mantra seed error:", err);
    process.exit(1);
  }
}

seedMantras();
