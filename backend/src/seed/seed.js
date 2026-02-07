require("dotenv").config();
const mongoose = require("mongoose");
const Content = require("../models/Content.model");

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");

    // 🔥 CLEAR EVERYTHING (SAFE NOW)
    await Content.deleteMany({});
    console.log("Old content cleared");

    await Content.insertMany([

      // 🕉️ ABOUT LORD SHIVA
{
  type: "about",
  title: "Lord Shiva",
  slug: "lord-shiva",
  detailedText:
    "Lord Shiva represents pure awareness — that which exists before thought, emotion, and action. In Shaiva understanding, Shiva is not merely a deity but the principle of consciousness itself.",
  order: 1,
},
{
  type: "about",
  title: "Shiva as Awareness",
  slug: "shiva-awareness",
  detailedText:
    "Shiva symbolizes awareness that observes but does not interfere. Thoughts, emotions, and actions arise and dissolve within this awareness, yet it remains unchanged.",
  spiritualMeaning:
    "Awareness does not need to act to exist.",
  order: 2,
},
{
  type: "about",
  title: "Shiva as Adi Yogi",
  slug: "adi-yogi-origin",
  detailedText:
    "Shiva is revered as Adi Yogi — the first yogi. He represents mastery over inner experience rather than control over the external world.",
  order: 3,
},
{
  type: "about",
  title: "Symbolism of Shiva",
  slug: "shiva-symbolism",
  detailedText:
    "Every aspect of Shiva’s form carries symbolic meaning. His ornaments and posture reflect inner balance, awareness, and detachment.",
  order: 4,
},

      // 🔱 SYMBOLS OF SHIVA
{
  type: "symbol",
  title: "Third Eye",
  slug: "third-eye",
  detailedText:
    "The Third Eye of Shiva represents perception beyond ordinary sight.\nIt symbolizes awareness that sees truth without distortion by desire, fear, or attachment.\nWhen opened, the Third Eye does not destroy the world — it dissolves ignorance.",
  spiritualMeaning:
    "True vision is inward, not outward.",
  order: 1,
},
{
  type: "symbol",
  title: "Trishul",
  slug: "trishul",
  detailedText:
    "The Trishul represents balance among three fundamental aspects of existence.\nIt is commonly understood as creation, preservation, and dissolution — or body, mind, and awareness.\nIn Shiva’s hand, the Trishul shows mastery, not aggression.",
  spiritualMeaning:
    "Balance arises when awareness governs action.",
  order: 2,
},
{
  type: "symbol",
  title: "Damru",
  slug: "damru",
  detailedText:
    "The Damru is the rhythm of existence.\nIts sound symbolizes the pulse from which creation unfolds and into which it returns.\nIn yogic symbolism, Damru represents the vibration behind form.",
  spiritualMeaning:
    "All movement arises from stillness.",
  order: 3,
},
{
  type: "symbol",
  title: "Crescent Moon",
  slug: "crescent-moon",
  detailedText:
    "The crescent moon on Shiva’s head represents mastery over time and the mind.\nThe moon reflects change, cycles, and emotion — Shiva remains steady while holding it.",
  spiritualMeaning:
    "Awareness remains stable even as thoughts change.",
  order: 4,
},
{
  type: "symbol",
  title: "Ganga on the Head",
  slug: "ganga-on-head",
  detailedText:
    "The river Ganga flowing from Shiva’s hair symbolizes the descent of grace into the world.\nShiva absorbs the force of Ganga before allowing it to flow gently, representing restraint and compassion.",
  spiritualMeaning:
    "Power must be tempered by awareness.",
  order: 5,
},
{
  type: "symbol",
  title: "Vibhuti",
  slug: "vibhuti",
  detailedText:
    "Vibhuti, the sacred ash smeared on Shiva’s body, signifies the impermanent nature of the physical world.\nIt reminds devotees that all material forms will eventually dissolve back into formlessness.",
  spiritualMeaning:
    "Remember impermanence to realize the eternal.",
  order: 6,
},
{
  type: "symbol",
  title: "Snake (Vasuki)",
  slug: "vasuki",
  detailedText:
    "The snake around Shiva’s neck represents kundalini energy — the dormant spiritual energy within every being.\nIt also symbolizes fearlessness and control over primal forces.",
  spiritualMeaning:
    "Awareness transforms raw energy into wisdom.",
  order: 7,
},


      // 👨‍👩‍👦 SHIVA FAMILY
{
  type: "family",
  title: "Parvati",
  slug: "parvati",
  detailedText:
    "Parvati represents Shakti — the dynamic energy of existence. Together, Shiva and Parvati express the unity of awareness and energy.\n\nWho She Is\nParvati Devi is the loving wife of Lord Shiva and the personification of Shakti—the primordial, creative cosmic energy that sustains the universe. She is the Re-creator of what Shiva destroys, representing love, fertility, devotion, and supreme power.\n\nOrigin & Family\nParents: Daughter of King Himavan (Lord of the Himalayas) and Queen Mena.\nPrevious Birth: Reincarnation of Sati (Shiva's first wife who self-immolated).\nFamily Structure: Inseparable companion of Lord Shiva, making them the divine couple of Kailash.\nChildren: Mother of Lord Ganesha (Wisdom) and Lord Kartikeya/Murugan (War).\n\nKey Aspects & Roles\nShiva Shakti: Parvati is the power that energizes Shiva; without her, he is considered inert.\nIdeal Householder: Represents the balance between asceticism (Shiva) and family life.\nForms: She is the calm and beautiful Gauri (fair one), but also manifests as the ferocious Durga (demon-slayer) and Kali (destroyer of evil).\nAnnapurna: The goddess of food and nourishment.\n\nSignificance to the Family Section\nParvati's intense penance (tapasya) allowed her to win Shiva, transforming him from a detached hermit into a family man. She is revered for her devotion, which brings harmony and stability to the home.\n\nImportant Symbols\nArdhanarishvara: The form where she is merged as half of Shiva's body, symbolizing the unity of masculine and feminine energies.\nVehicle: Lion (symbolizing mastery over power).",
  spiritualMeaning:
    "Awareness without energy is stillness; energy without awareness is chaos.",
  order: 1,
},
{
  type: "family",
  title: "Ganesha",
  slug: "ganesha",
  detailedText:
    "Ganesha symbolizes wisdom, discernment, and the removal of inner obstacles. He represents clarity before action.\nRole in Family: Son of Lord Shiva and Goddess Parvati, and the younger brother of Lord Kartikeya (Murugan).\nBirth Story: Parvati created Ganesha out of sandalwood paste (or turmeric) to guard her privacy while she bathed. When Shiva returned, Ganesha, not recognizing him, stopped him from entering. Enraged, Shiva beheaded the boy. Upon learning it was their son, Shiva revived him by placing the head of an elephant on his body.\nSignificance: Known as the Vighnaharta (Remover of Obstacles) and Buddhi Pradaayaka (Giver of Wisdom). He is the Pratham Pujya—the first deity to be worshipped before any auspicious event, ritual, or new beginning.\nAttributes:\nHead: Elephant head representing immense wisdom and intellect.\nVahana (Vehicle): A small mouse/rat (Mooshika), symbolizing the ability to control desires and go everywhere.\nBeloved Sweet: Modak.\nFamily Bond: He is deeply attached to his parents, famously circling them to win a race against his brother Kartikeya, proving that parents are the \"universe\".",
  spiritualMeaning:
    "Obstacles dissolve when awareness precedes action.",
  order: 2,
},
{
  type: "family",
  title: "Kartikeya",
  slug: "kartikeya",
  detailedText:
    "Kartikeya represents focused intelligence, courage, and disciplined action guided by clarity./nBrief Intro:/n Kartikeya, known predominantly as Murugan or Subramanya in South India, is the firstborn son of Lord Shiva and Goddess Parvati. He is revered as the Supreme Commander of the Deva Army (Devasenapati), representing supreme wisdom, youthful valor, and the power to destroy internal and external demons. In South Indian theology, he is considered \"Shiva Swarupa\" (a manifestation of Shiva). /n Birth from Shiva’s Third Eye: /n According to South Indian tradition, Kartikeya was born from the six rays of light that emerged from the third eye of Lord Shiva to destroy the demon Surapadman. These rays were carried to the Ganga by Agni and Vayu, turning into six babies, who were later combined into one by Parvati. \nKey South Indian Aspects\nPatron Deity: He is regarded as the \"God of the Tamil people,\" or the \"Red God seated on a blue peacock\".\nAru Padai Veedu: His worship is centered around six primary temples in Tamil Nadu (Tirupparamkunram, Tiruchendur, Palani, Swamimalai, Tiruttani, and Pazhamudircholai).\nThe Vel: He wields the Vel (spear), a divine weapon gifted by Parvati representing wisdom and destruction of ignorance.\nConsorts: Unlike some Northern traditions that depict him as a bachelor, South Indian tradition features two consorts: Devayanai (adopted daughter of Indra) and Valli (daughter of a local tribal chief).\nSymbolism: He is the master of the Kundalini energy. His six faces represent the five senses plus the mind, and his peacock mount symbolizes the destruction of ego. \nRelationship with Lord Shiva\nGuru to Shiva: In the Skanda Purana, Kartikeya teaches the meaning of the Pranava Mantra (Om) to Lord Shiva, earning the name Swaminatha (\"Lord of Shiva\").\nGuardian: He is worshipped in countless Shiva temples across South India as a guardian deity. \nPopular Mantras & Chants\nOm Saravana Bhavaya Namah\nVetrivel Muruganukku Arogara",
  spiritualMeaning:
    "Victory arises from clarity, not aggression.",
  order: 3,
},


      // 🕺 FORMS OF SHIVA
{
  type: "form",
  title: "Mahadeva",
  slug: "mahadeva",
  detailedText:
    "Mahadeva (literally \"Greatest God\" or \"Supreme God\") is the ultimate, all-encompassing divine form of Lord Shiva in Hinduism, embodying the supreme consciousness that governs the universe. As part of the Trimurti (the Hindu trinity of Brahma, Vishnu, and Shiva), he represents the destroyer or transformer, responsible for dissolving the universe to allow for its regeneration. Fundamental Aspects of Mahadeva The Supreme Being (Parabrahman): Beyond his form as a deity, Mahadeva represents the formless (nirakar), limitless, and unchanging absolute Brahman. He is considered the primal Atman (soul/self) of the universe.\n    Swayambhu (Self-Manifested): Mahadeva is not born from any other being; he is self-created, existing before the universe and continuing to exist after its dissolution.\n    Adiyogi & Adiguru: He is regarded as the first yogi (Adiyogi) and the first teacher of yoga (Adiguru), who imparted knowledge to the Saptarishis (seven sages).\n    Ashutosh (Easily Pleased): Despite his fierce aspects, he is known as the most magnanimous God, easily pleased by pure devotion, regardless of the worshipper's status.\n    Iconography and Symbolism\n    Shiva's form is rich in symbolism. Key elements include the third eye (Trinetra), crescent moon, serpent (Vasuki), Trishula (trident), Damaru (drum), Ganga, and ash-smeared body (Vibhuti).\n    Key Forms and Manifestations\n    Shiva is worshipped in various forms, such as the Shiva Lingam, Nataraja, Ardhanarishvara, Mahakaal, and Neelkanth.\n    Significance in Worship\n    Devotees worship Mahadeva for spiritual growth and liberation, with Maha Shivaratri being a significant night of worship.\n    The Five Fundamental Forms\n    Shiva is understood through five core roles: Yogeshwara, Bhuteshwara, Kaleshwara, Sarveshwara, and Mahadeva.",
  spiritualMeaning:
    "That which is complete needs nothing to become whole.",
  order: 1,
},
{
  type: "form",
  title: "Nataraja",
  slug: "nataraja",
  detailedText:
    "Nataraja, or the \"Lord of the Dance\" (derived from Sanskrit Nata = dance and Raja = king), is a profoundly symbolic, iconic representation of the Hindu god Shiva as the cosmic dancer. Popularized primarily through bronze sculptures during the Chola dynasty (9th-13th century CE) in South India, this form represents the five cosmic activities of the divine: creation, preservation, destruction, illusion, and grace. Nataraja embodies the ultimate, eternal cycle of life, death, and rebirth within the cosmos.\n\nThe Five Primary Cosmic Acts (Panchakritya)\n\nNataraja's dance is known as the Ananda Tandava (Dance of Bliss) or Nadanta, and it represents 5 essential functions:\n\nSrishti (Creation/Evolution): Represented by the Damaru (drum) in the upper right hand, creating the initial vibrations of the universe.\n\nSthiti (Preservation/Support): The lower right hand is in Abhaya Mudra (\"fear not\" gesture), offering protection.\n\nSamhara (Destruction/Dissolution): The upper left hand holds Agni (fire), symbolizing the destruction of the universe.\n\nTirobhava (Illusion/Concealment): The right foot crushes the demon Apasmara, representing the suppression of ignorance and ego.\n\nAnugraha (Grace/Salvation): The raised left foot points to the lower left hand, signifying the path to liberation.",
  spiritualMeaning:
    "Remain aware even as life moves.",
  order: 2,
},
{
  type: "form",
  title: "Ardhanarishvara",
  slug: "ardhanarishvara",
  detailedText:
    "Ardhanarishvara (Sanskrit: अर्धनारीश्वर, Ardhanārīśvara) is a profound composite, androgynous form of the Hindu deity Shiva and his consort, Parvati (Shakti). It represents the perfect synthesis of masculine and feminine energies, illustrating that the divine is both, neither, and beyond gender.\n\n1. Fundamental Definition & Meaning Name Breakdown: Ardha (Half) + Nari (Woman) + Ishwara (Lord) = \"The Lord whose half is a woman\".\nComposite Form: A single, vertically split body, usually featuring Shiva on the right and Parvati on the left.\nOther Names: Ardhanarisha, Ardhanaranari (half man-woman), Ammiappan (Tamil: Mother-Father), Naranari, Gaurishvara.\nCore Symbolism: Represents the balance of opposites, specifically Purusha (masculine principle/consciousness) and Prakriti (feminine principle/active energy). \n2. Iconography & Physical Details (The Split)\nThe figure is typically divided down the middle, showcasing contrasting yet complementary, harmonious traits. Right Half: Lord Shiva (Masculine Principle)Appearance: Typically white or ash-smeared.Hair: Jatamakuta (matted, coiled hair) adorned with a crescent moon and sometimes the river goddess Ganga. Eye: One half of the Third Eye (Trinetra) is visible.Earring: Sarpa-kundala (serpent earring).Attire/Arms: Wears a tiger skin or dhoti. Often holds a Trishula (trident) and Damaru (drum) or Kapala (skull cup).Body: Broader shoulder, muscular thigh. Left Half: Goddess Parvati (Feminine Principle) Appearance: Typically fair, golden, or green-hued.Hair: Well-combed, styled, and knotted (karanda-mukuta).Eye: Decorated with black eyeliner (kohl).Earring: Valika-kundala (ornate earring).Attire/Arms: Draped in a silk saree/garment. Holds a lotus (nilotpala), a mirror, or a parrot.Body: Well-developed, round bosom and a narrow, curvy waist.Ornamentation: Adorned with necklaces, bangles, and an anklet. \nCommon Details:Posture: Frequently in Tribhanga (three-bend posture) or leaning towards the left.Vehicle (Vahana): Usually accompanied by Nandi the bull.Center: The chest is often divided by a sacred thread (Yagnopavita). 3. Spiritual and Philosophical Significance Unity of Opposites: Reconciles the spiritual asceticism of Shiva with the worldly materialism of Parvati.Inseparability: Illustrates that Shiva is inert without Shakti, and Shakti is formless without Shiva.Creation & Fertility: Represents the \"Cosmic Seed\" and the proactive force of nature.Equality: Symbolizes that man and woman are equal, complementary, and incomplete without each other.Non-Dual Consciousness: A symbol for the \"Self\" in which all opposites find peace. 4. Key Legends (Origin Stories) Brahma's Creation: Brahma created male Prajapatis but creation stalled. He prayed to Shiva, who appeared as Ardhanarishvara. Brahma realized he needed to create females to enable procreation.Sage Bhringi's Vow: Sage Bhringi vowed to worship only Shiva. He ignored Parvati and attempted to circumambulate only the right side. Parvati made herself half of Shiva to compel him to worship her.The Embrace: Parvati desired to be \"limb-to-limb\" with Shiva forever, asking him to allow her to share his body. 5. Historical & Cultural Context\nOrigin: Early images date back to the Kushan period (1st century CE), with perfect evolution in the Gupta era.Temples: While found in most Shiva temples, few are exclusively dedicated to this form, such as the famous Arthanareeswarar Temple in Tiruchengode, Tamil Nadu.Popularity: Often depicted in South Indian Bronzes and Pattachitra art. ",
  spiritualMeaning:
    "Wholeness arises from balance, not division.",
  order: 3,
},
{
  type: "form",
  title: "Bhairava",
  slug: "bhairava",
  detailedText:
    "1. Introduction: Who is Bhairava? Definition: Bhairava (\"Terrible\" or \"Frightful\") is a fierce, ferocious manifestation of Lord Shiva, associated with annihilation and the supreme reality. Significance: He represents the destruction of the ego and ignorance. He is the guardian of time (\"Kala\") and the protector of the universe.Role: He is the Kshetrapala (guardian of the territory/temple). 2. Iconography and Symbolism (Appearance) Form: Often depicted naked (digambara - representing detachment) with a pot belly, round yellow eyes, fangs, and flaming hair.Complexion: Dark, like a rain cloud.Four Arms: Typically carries a skull (kapala), a drum (damaru), a trident (trishula), and a noose (pasha).Ornaments: Garland of skulls (mundamala), snakes coiled around his neck and limbs.Vehicle (Vahana): A black dog.Third Eye: Signifies enlightenment and the ability to see beyond illusion. 3. The Eight Forms (Ashta Bhairava)These eight manifestations guard the eight directions of the universe: Asitanga Bhairava: East. Grants creative ability.Ruru Bhairava: Southeast. Divine educator, provides knowledge.Chanda Bhairava: South. Bestows confidence, success, and cuts competition.Krodha Bhairava: Southwest. Gives power for massive action and removes obstacles.Unmatta Bhairava: West. Controls negative ego and harmful self-talk.Kapala Bhairava: Northwest. Ends unrewarding work and action.Bhishana Bhairava: North. Obliterates evil spirits and negativity.Samhara Bhairava: Northeast. Final destroyer; dissolves old karma. 4. Special Manifestations:Kala Bhairava: The supreme ruler of time and chief form.Swarna Akarshana Bhairava: \"Gold-attracting\" form, red-complexioned, seated on a ruby throne, bestows wealth.Batuk Bhairava: The childlike, youthful, and radiant form often worshipped by householders for protection. \n5. Key Details for App Content: Key Mantra: Om Hraam Hreem Hroom Hrime Hroum Ksham Kshetrapaalaaya Kaala Bhairavaaya Namah.Bhairava Ashtakam: Composed by Adi Shankaracharya, this 8-verse hymn is ideal for audio/text sections.Best Time for Worship: Krishna Paksha Ashtami (8th day after full moon).",
  spiritualMeaning:
    "Fear dissolves when truth is faced directly.",
  order: 4,
},
{
  type: "form",
  title: "Dakshinamurthy",
  slug: "dakshinamurthy",
  detailedText:
    "Lord Dakshinamurthy is a prominent, benevolent form of Shiva worshipped as the Adi Guru (First Teacher) of wisdom, yoga, music, and the scriptures. As the supreme teacher, Dakshinamurthy embodies ultimate awareness and knowledge, often guiding seekers towards self-realization through silence rather than words. The name translates to \"one who faces south\" (Dakshina = South, Murthy = Form), symbolizing the transformation of death and ignorance into eternal wisdom. Iconography and Symbolism Dakshinamurthy is typically depicted seated in a yogic pose (often Virasan) under a banyan tree (Vata Vriksha), facing South. Four Arms: Representing his omnipotence.Lower Right Hand (Chin Mudra): The index finger touches the thumb, representing the union of human consciousness (Jivatma) with the Supreme (Brahman). The other three fingers symbolize the removal of impurities: ignorance, ego, and past karmas.Lower Left Hand: Holds palm leaf manuscripts (Pustaka) or Kusha grass, symbolizing scriptural knowledge.Upper Hands: Typically hold a fire (Agni) and a snake or a rosary (Akshamala), representing the destruction of ignorance and the mastery of tantric knowledge.Demon Under Feet: He sits with his right foot resting on the back of the demon Apasmara, who symbolizes ignorance and the forgetfulness of the self.Surroundings: He is often surrounded by four ancient, rishi disciples (Sanaka, Sanandana, Sanatana, and Sanatkumara). Key Aspects and FormsWhile the primary form is the seated teacher, there are several variations:Jnana Dakshinamurthy: The classic form teaching wisdom.Veenadhara Dakshinamurthy: Holding a Veena, representing mastery over music and sound vibration.Rishabharooda Dakshinamurthy: Seated on Nandi the bull, symbolizing dharma.Yoga Dakshinamurthy: Focused on profound meditative silence. Significance and WorshipThe Silent Teacher: Dakshinamurthy imparts wisdom through silence (Mauna), which is considered the highest form of teaching.South-Facing Presence: In all Shaivite temples, a stone image of Dakshinamurthy is installed in the Southern Devakoshtam (niche) around the main sanctum sanctorum.Thursday (Guruvar): Thursday is considered the day of the Guru, and special worship is offered to Dakshinamurthy on this day, particularly on Guru Purnima.Benefits of Worship: Worshippers seek his blessings for wisdom, knowledge, intelligence, and the clearing of mental confusion or ignorance.",
  spiritualMeaning:
    "True knowledge arises in stillness.",
  order: 5,
},
{
  type: "form",
  title: "Rudra",
  slug: "rudra",
  detailedText:
    "Rudra is an ancient Vedic deity, recognized as an early, fierce, and tempestuous form of Lord Shiva. He is often associated with storms, fire, hunting, and destruction, acting as a force that destroys to enable renewal and transformation. While Rudra can represent terror, he is also revered as a protector and healer. Etymology and Meaning\"The Roarer\" or \"Howler\": The name is derived from the Sanskrit root rud, meaning to roar, howl, or cry, reflecting his nature as a stormy, chaotic force.\"Destroyer of Sins/Sorrow\": Another interpretation is \"one who makes people weep\" (at the time of cosmic dissolution) or \"one who removes the tears of devotees\". Iconography and Form Appearance:\n Rudra is described as having a long, braided hair (jaṭā). He is often described as tawny, reddish, or \"blue-necked\" (nīlagrīva).\nWeapons: He is a master archer, holding a bow and arrows, and sometimes a trident (trishula) or a thunderbolt (vajrāyudha).\nAppearance: He is described as being adorned with gold ornaments. In later texts, he is often depicted smeared with ashes, wearing a garland of skulls, and carrying a skull in his hand (Kapali). \nVedic and Puranic Significance\nVedic Period: In the Rigveda, Rudra is a minor, yet feared deity associated with the atmosphere. He is the father of the Maruts (storm gods).\nEvolution to Shiva: Over time, Rudra merged with the Puranic deity Shiva. While Rudra represents the fierce, destructive, or \"terrible\" (ghora) side, Shiva represents the calm, benevolent (saumya) side.\nThe Eleven Rudras (Ekadasha Rudras): Puranas, such as the Shiva Purana, describe 11 Rudra Avatars born to Rishi Kashyap and his wife Surabhi to protect the gods from demons.\nThe Eleven Names: Common lists include Kapali, Pingal, Bheem, Virupaksha, Vilohita, Shastra, Ajapaad, Ahirbudhnya, Shambhu, Chand, and Bhava.\nSignificance: These eleven forms represent the eleven pranic forces (ten vital breaths and the mind) and are associated with the 11th hour of creation.\nRole in Creation: Rudra is often described as being born from Brahma's anger when his, (Brahma's) mental sons refused to create, making him a figure responsible for destruction to facilitate new creation. \nWorship and Symbolism\nRudrabhisheka: The most prominent form of worship is the Rudra-abhisheka (pouring water or other offerings over a Shiva Linga), which is believed to wash away sins and negative energy.\nSri Rudram: A key hymn in the Yajurveda (Taittiriya Samhita 4.5), which lists the manifold,, and, sometimes contradictory aspects of Rudra.\nSymbolism: Rudra is considered the \"inner self\" of all beings and the \"Lord of Remedies\" (Vaidyanatha), as he controls diseases and cures them.\nRudraksha: The sacred Rudraksha beads are believed to have originated from the tears (akṣa) of Rudra. .",
  spiritualMeaning:
    "Transformation often begins with disruption.",
  order: 6,
},

      // 📖 STORY

{
  type: "story",
  title: "Shiva — The One Who Always Was",
  slug: "shiva-the-one-who-always-was",
  part: "Part I – The Eternal Shiva",
  chapterNumber: 1,
  detailedText:
    "Long… long ago.\n\nNot long ago in time.\nBut long ago before time itself was born.\n\nThere was Shiva.\n\nThere was no sky above.\nThere was no earth below.\nThere was no sun to shine.\nThere was no moon to glow.\n\nThere were no sounds.\nNo voices.\nNo wind.\n\nThere was only quiet.\n\nShiva was that quiet.\n\nHe was not sitting somewhere.\nBecause there was no ‘where’ yet.\n\nHe was not watching anything.\nBecause there was nothing to watch.\n\nEverything that would one day exist was resting gently within him.\n\nShiva felt no hurry.\n\nHe was not waiting for something to begin.\nHe was not afraid of something ending.\n\nThere was no beginning.\nThere was no ending.\n\nShiva did not speak.\nWords had not yet come.\n\nShiva did not move.\nThere was nowhere to go.\n\nLike a very deep ocean before waves are born,\nShiva rested in himself.\n\nInside that deep calm were many sleeping dreams.\n\nStars waiting to shine.\nRivers waiting to flow.\nLives waiting to breathe.\nStories waiting to be told.\n\nBut all of them were sleeping peacefully.\n\nShiva did not wake them.\n\nHe did not push.\nHe did not pull.\n\nBecause nothing was missing.\n\nShiva was complete.\n\nThis is why elders say:\nShiva has no beginning.\n\nHe was never born.\nNo one created him.\n\nHe did not come from anywhere.\n\nHe simply was.\n\nEven now…\n\nWhen the world feels noisy.\nWhen thoughts feel heavy.\nWhen everything seems to move too fast.\n\nThat same quiet still exists.\n\nWhen you sit silently.\nWhen you feel calm without knowing why.\n\nYou are touching that same stillness.\n\nThat stillness is Shiva.",
  spiritualMeaning:
    "When the heart becomes quiet, we remember the peace that has always been there.",
  order: 101
},

{
  type: "story",
  title: "Rudra — When Stillness Took Its First Breath",
  slug: "rudra-first-breath",
  part: "Part I – The Eternal Shiva",
  chapterNumber: 2,
  detailedText:
    "Shiva was still.\n\nVery still.\n\nBut inside that stillness,\nsomething quietly shifted.\n\nNot suddenly.\nNot loudly.\n\nLike a deep breath taken\nby the universe for the first time.\n\nThe calm did not break.\nBut it began to move.\n\nThis movement was not anger.\nIt was not desire.\n\nIt was energy waking up.\n\nThis energy was called Rudra.\n\nRudra was not separate from Shiva.\nHe was Shiva’s power,\nstepping forward.\n\nIf Shiva was silence,\nRudra was the echo.\n\nIf Shiva was the deep ocean,\nRudra was the first wave\nforming far below the surface.\n\nRudra moved through empty space.\n\nWhere he moved,\nold stillness loosened.\n\nThings that were tightly held\nbegan to open.\n\nRudra did not come to destroy.\n\nHe came to shake\nwhat had become stuck.\n\nHe came like a storm\nthat clears the air.\n\nTo some,\nRudra felt frightening.\n\nBecause change always feels scary\nwhen we hold on too tightly.\n\nBut to the universe,\nRudra was necessary.\n\nWithout movement,\nnothing could be born.\n\nWithout change,\nnothing could grow.\n\nRudra roared —\nnot in anger,\nbut in strength.\n\nFire followed him.\nWind followed him.\n\nYet even in his power,\nRudra was not wild.\n\nSlowly,\nhe learned to listen.\n\nHis energy softened.\n\nHis movement found balance.\n\nThe roar became breath.\nThe storm became rhythm.\n\nAnd Rudra returned to Shiva.\n\nPower rested inside awareness.\n\nMovement bowed to stillness.\n\nFrom that moment,\nthe universe learned something important:\n\nThat force must be guided by calm.\n\nThat change must live\ninside awareness.\n\nRudra did not disappear.\n\nHe became Shiva —\npowerful,\npeaceful,\nawake.\n\nThe first movement was complete.",
  spiritualMeaning:
    "Change becomes healing when it rises from awareness, not fear.",
  order: 102
},

{
  type: "story",
  title: "Adi Yogi — When Stillness Learned to Teach",
  slug: "adi-yogi-stillness-teaches",
  part: "Part I – The Eternal Shiva",
  chapterNumber: 3,
  detailedText:
    "After movement found balance,\nShiva became still again.\n\nNot the stillness of sleep.\nBut the stillness of deep knowing.\n\nHe sat quietly.\n\nTime passed.\n\nNot days.\nNot years.\n\nTime passed like a slow river,\nflowing without sound.\n\nMountains slowly rose.\nWinds found their paths.\nThe first rhythms of life\nbegan to appear.\n\nShiva watched.\n\nHe did not interfere.\nHe did not control.\n\nHe simply remained aware.\n\nSome beings felt drawn toward him.\n\nThey did not know why.\n\nThey felt calm when they came near.\nTheir restless thoughts softened.\nTheir breathing slowed.\n\nThey sat near Shiva,\nwithout asking questions.\n\nThey did not demand answers.\n\nThey waited.\n\nShiva did not speak.\n\nHis silence was the teaching.\n\nSlowly,\nthe seekers began to notice\nsomething within themselves.\n\nTheir minds became quiet.\nTheir bodies became steady.\n\nThey felt whole,\nfor the first time.\n\nWhen the moment was right,\nShiva opened his eyes.\n\nNot to command.\nNot to impress.\n\nBut to share.\n\nWithout words,\nhe showed them a path inward.\n\nA way to sit.\nA way to breathe.\nA way to be aware.\n\nThis was yoga.\n\nNot exercise.\nNot rules.\n\nBut union.\n\nUnion with oneself.\n\nShiva did not keep this knowledge\nfor himself.\n\nHe allowed it to flow.\n\nThose who were ready\nreceived it.\n\nThose who were not\ncontinued their journey.\n\nShiva did not insist.\n\nTrue teaching does not push.\n\nThe seekers later remembered him\nas Adi Yogi —\nthe first yogi.\n\nAnd Adi Guru —\nthe first teacher.\n\nWhen the teaching was complete,\nShiva returned to silence.\n\nBecause silence was always\nhis true home.",
  spiritualMeaning:
    "The deepest learning happens when the mind becomes quiet.",
  order: 103
},

{
  type: "story",
  title: "Nāṭarāja — When Stillness Began to Dance",
  slug: "nataraja-stillness-dances",
  part: "Part I – The Eternal Shiva",
  chapterNumber: 4,
  detailedText:
    "Shiva was still.\n\nYet the universe around him was learning how to move.\n\nMovement had been born.\nAwareness had been shared.\n\nNow something new was ready to happen.\n\nStillness wished to express joy.\n\nSlowly,\nvery slowly,\nShiva stood.\n\nNot with effort.\nNot with intention.\n\nHe simply rose.\n\nAnd then —\nhe moved.\n\nThis movement was not hurried.\nIt was not heavy.\n\nIt was gentle.\nBalanced.\nAlive.\n\nThis was Shiva as Nāṭarāja —\nthe dancer.\n\nNot a dancer on a stage.\nBut the dancer behind all movement.\n\nAs Shiva moved,\nthe universe moved with him.\n\nStars began their slow turning.\nTime learned how to flow.\nBirth and ending found rhythm.\n\nShiva’s dance was calm.\nYet powerful.\n\nIn one hand,\nhe held rhythm —\nthe sound that gives shape.\n\nIn another hand,\nhe held fire —\nthe warmth that transforms.\n\nOne foot touched the ground,\nsteady and sure.\n\nThe other foot lifted,\nlight and free.\n\nBelow him lay ignorance —\nnot destroyed,\nonly gently pressed down.\n\nBecause ignorance fades\nwhen awareness is present.\n\nAround Shiva,\na soft circle of fire glowed.\n\nNot burning.\nProtecting.\n\nInside this circle,\nworlds could rise and fall safely.\n\nShiva did not dance\nbecause he needed to.\n\nHe danced\nbecause movement is joy\nwhen it rises from stillness.\n\nThe universe was not chaotic.\nIt was rhythmic.\n\nThe universe was not random.\nIt was graceful.\n\nWhen the dance slowed,\nShiva returned to stillness.\n\nMovement rested.\nSilence smiled.\n\nStillness and dance\nwere never separate.\n\nThey were always one.",
  spiritualMeaning:
    "Life becomes joyful when movement flows from inner calm.",
  order: 104
},

{
  type: "story",
  title: "Gaṅgā — When Grace Learned to Flow Gently",
  slug: "ganga-grace-flowed-gently",
  part: "Part I – The Eternal Shiva",
  chapterNumber: 5,
  detailedText:
    "The universe was calm.\n\nYet deep within it,\nsorrow quietly gathered.\n\nLives were being lived.\nLives were ending.\n\nSome souls felt heavy.\nSome waited for peace.\n\nA king named Bhagīratha felt this pain.\n\nHe did not shout.\nHe did not demand.\n\nHe sat quietly.\n\nHe prayed.\n\nNot for power.\nNot for reward.\n\nHe prayed so suffering could soften.\n\nHigh above,\nGaṅgā listened.\n\nShe was pure.\nShe was powerful.\n\nHer waters carried healing.\n\nShe agreed to come down.\n\nBut her force was great.\n\nIf she fell freely,\nshe would flood the world.\n\nHealing could become harm.\n\nOnce again,\nthe universe turned to Shiva.\n\nShiva stood silently.\n\nHe did not rush.\n\nWhen Gaṅgā descended,\nroaring with strength,\nShiva received her upon his hair.\n\nHer force slowed.\n\nHer anger softened.\n\nHer power learned patience.\n\nThrough Shiva,\nGaṅgā became gentle.\n\nShe flowed calmly onto the earth.\n\nLives were eased.\nSouls were lifted.\n\nShiva did not hold Gaṅgā forever.\n\nHe simply guided her.\n\nGrace flowed safely\nbecause awareness stood first.\n\nAnd the world learned:\n\nThat kindness is strongest\nwhen it moves slowly.",
  spiritualMeaning:
    "True grace heals when guided by calm awareness.",
  order: 105
},

{
  type: "story",
  title: "Nīlakaṇṭha — When Shiva Chose to Hold the Pain",
  slug: "neelkantha-holding-the-pain",
  part: "Part I – The Eternal Shiva",
  chapterNumber: 6,
  detailedText:
    "The universe had learned how to be still.\n\nIt had learned how to move.\nIt had learned how to care.\n\nNow it faced something harder.\n\nDeep within existence,\na great effort began.\n\nGods and demons together\nstirred the vast ocean of life.\n\nThey hoped for sweetness.\nThey hoped for peace.\n\nThey hoped for something\nthat would remove fear forever.\n\nThe ocean turned.\nSlowly.\nHeavily.\n\nFrom its depths,\nsomething dark rose first.\n\nIt was poison.\n\nNot poison made by hands.\nBut poison made from\nfear,\nanger,\ngreed,\nand pain\nthat had gathered for a long time.\n\nThe poison spread.\n\nIt did not shout.\nIt did not rush.\n\nBut wherever it touched,\nlife began to weaken.\n\nThe gods stepped back.\nThe demons stepped away.\n\nNo one wanted to hold it.\n\nSilence fell.\n\nAll eyes turned toward Shiva.\n\nShiva did not react.\n\nHe did not ask who was right.\nHe did not ask who was wrong.\n\nHe simply saw\nwhat needed to be done.\n\nWithout anger.\nWithout fear.\n\nShiva stepped forward.\n\nHe took the poison\ninto himself.\n\nHe did not swallow it fully.\n\nHe held it\nat his throat —\nthe place between\ninside and outside,\nbetween silence and speech.\n\nThe poison burned.\n\nPain was real.\n\nYet Shiva did not resist.\n\nHe remained aware.\n\nThe poison did not spread.\n\nThe world was saved.\n\nShiva’s throat turned blue.\n\nNot as a mark of suffering,\nbut as a sign of responsibility.\n\nHe did not ask for praise.\nHe did not seek thanks.\n\nHe simply stayed still,\nholding what others could not.\n\nThe poison remained.\n\nBut it was contained.\n\nFrom that moment,\nShiva was known as Nīlakaṇṭha —\nthe one with the blue throat.\n\nThe universe learned a quiet truth:\n\nSome pain cannot be destroyed.\n\nIt must be held\nwith awareness,\nso it does not spread.\n\nShiva returned to silence.\n\nThe ocean rested.\n\nAnd existence breathed again.",
  spiritualMeaning:
    "True strength is the courage to hold pain consciously so it does not harm others.",
  order: 106
},

{
  type: "story",
  title: "Śakti — When Shiva Was Not Alone Anymore",
  slug: "shakti-when-shiva-not-alone",
  part: "Part II – Śiva & Śakti",
  chapterNumber: 7,
  detailedText:
    "Shiva was complete.\n\nNothing was missing.\n\nYet within that completeness,\na gentle feeling began to rise.\n\nNot a desire.\nNot a need.\n\nBut a quiet wish to share.\n\nStillness had known itself.\n\nNow it wished to experience itself.\n\nFrom Shiva’s calm awareness,\na soft power emerged.\n\nThis power was warm.\nIt was alive.\nIt could move.\n\nThis power was called Śakti.\n\nŚakti was not separate from Shiva.\n\nShe was his energy.\nHis movement.\nHis living expression.\n\nIf Shiva was the deep sky,\nŚakti was the flowing breeze.\n\nIf Shiva was the silent lamp,\nŚakti was the gentle light.\n\nWhen Śakti appeared,\nShiva did not feel disturbed.\n\nHe felt whole in a new way.\n\nAwareness and energy\nrecognized each other.\n\nThis was not marriage.\n\nThis was not romance.\n\nThis was understanding.\n\nTogether,\nShiva and Śakti formed balance.\n\nAwareness guided movement.\nMovement brought awareness to life.\n\nThe universe felt warmer.\n\nLife felt possible.\n\nCreation did not rush forward.\n\nIt paused.\n\nAs if taking a soft breath.\n\nFrom this union,\nall future stories would grow.\n\nLove.\nLoss.\nJoy.\nPain.\nLearning.\n\nBut for now,\nShiva and Śakti simply existed together.\n\nCalm.\nBalanced.\nAlive.\n\nThe universe watched quietly.\n\nA new chapter had begun.",
  spiritualMeaning:
    "Life begins when calm awareness and gentle energy move together in balance.",
  order: 201
},


{
  type: "story",
  title: "Satī — When Divine Love Took Birth",
  slug: "sati-divine-love-birth",
  part: "Part II – Śiva & Śakti",
  chapterNumber: 8,
  detailedText:
    "After Śakti awakened,\nher warmth spread quietly through existence.\n\nEnergy wished to feel the world more closely.\n\nSo she chose to be born.\n\nNot in thunder.\nNot in fire.\n\nBut gently.\n\nŚakti was born as Satī.\n\nShe was born in the home of King Dakṣa.\n\nDakṣa was powerful.\nHe loved order.\nHe believed the world must follow rules.\n\nHe respected rituals.\nHe trusted traditions.\n\nSatī grew up surrounded by structure and ceremony.\n\nYet her heart was different.\n\nShe was calm.\nShe listened deeply.\n\nWhile others spoke of pride and honor,\nSatī felt drawn toward silence.\n\nShe loved open skies.\nQuiet forests.\nMoments where the heart becomes still.\n\nOften,\nwithout knowing why,\nher thoughts turned toward Śiva.\n\nShe had never seen him.\n\nShe had never heard his voice.\n\nYet something inside her remembered him.\n\nLike a forgotten song\nslowly returning.\n\nDakṣa did not understand this.\n\nTo him,\nŚiva did not belong.\n\nŚiva did not follow customs.\nHe did not seek approval.\n\nHe lived simply,\nunmoved by praise or blame.\n\nDakṣa believed such a being\nhad no place in society.\n\nBut Satī did not choose Śiva out of rebellion.\n\nShe chose him out of truth.\n\nHer love was quiet.\nSteady.\nUnshaken.\n\nIt did not demand.\nIt did not rush.\n\nThe universe watched silently.\n\nFor when divine love enters human form,\nit must pass through misunderstanding.\n\nSatī’s birth marked a turning point.\n\nLove was now walking the earth.\n\nAnd soon,\nit would be tested.",
  spiritualMeaning:
    "True love is a quiet recognition that does not need permission.",
  order: 202
},

{
  type: "story",
  title: "When Satī Met Śiva — Recognition Beyond Words",
  slug: "sati-meets-shiva",
  part: "Part II – Śiva & Śakti",
  chapterNumber: 9,
  detailedText:
    "Time passed quietly.\n\nSatī grew.\n\nHer body grew with age,\nbut her heart grew with awareness.\n\nThe feeling she carried within her\nnever faded.\n\nIt became clearer.\n\nOne day,\nshe heard of a place far from palaces.\n\nA place where silence lived.\n\nA place where a yogi sat,\nunmoved by praise or insult.\n\nThat yogi was Śiva.\n\nSatī felt no excitement.\n\nShe felt calm.\n\nAs if she were walking toward\nsomething already known.\n\nWhen she reached him,\nŚiva was seated in deep stillness.\n\nHis eyes were closed.\n\nThe world could pass before him,\nand he would not turn.\n\nSatī stood quietly.\n\nShe did not call out.\n\nShe did not ask for attention.\n\nShe simply waited.\n\nIn that waiting,\nher breath slowed.\n\nHer thoughts softened.\n\nHer heart became still.\n\nAfter some time,\nŚiva opened his eyes.\n\nHe looked at her.\n\nNot with surprise.\n\nNot with judgment.\n\nBut with recognition.\n\nThere were no questions.\n\nNo explanations.\n\nNo promises.\n\nAwareness recognized energy.\n\nEnergy recognized awareness.\n\nThey did not fall in love.\n\nThey remembered love.\n\nThe forest felt silent.\n\nThe wind slowed.\n\nEven time seemed to pause.\n\nSatī did not bow.\n\nŚiva did not speak.\n\nNothing more was needed.\n\nTwo truths had met.\n\nAnd in that meeting,\nseparation quietly dissolved.",
  spiritualMeaning:
    "True connection does not begin with words; it begins with recognition.",
  order: 203
},

{
  type: "story",
  title: "Dakṣa Yajña — When Pride Refused to Bow",
  slug: "daksha-yajna-pride",
  part: "Part II – Śiva & Śakti",
  chapterNumber: 10,
  detailedText:
    "King Dakṣa watched the world carefully.\n\nHe saw order.\nHe saw rules.\nHe saw tradition holding everything in place.\n\nThis gave him comfort.\n\nTo Dakṣa,\nrespect meant following custom.\n\nHonor meant being seen.\n\nAnd power meant control.\n\nŚiva did not fit into this world.\n\nŚiva did not ask permission.\nHe did not seek approval.\n\nHe did not wear symbols of status.\n\nThis made Dakṣa uneasy.\n\nThough Satī loved Śiva,\nDakṣa’s heart remained closed.\n\nHe did not shout.\n\nHe did not argue.\n\nHe simply refused to accept.\n\nTime passed.\n\nDakṣa decided to perform a great yajña —\na sacred gathering meant to honor the gods.\n\nInvitations were sent far and wide.\n\nKings.\nSages.\nDevas.\n\nBut one name was missing.\n\nŚiva was not invited.\n\nSatī noticed.\n\nAt first,\nshe said nothing.\n\nShe hoped.\n\nShe believed\nunderstanding would come.\n\nBut when she asked her father,\nDakṣa did not soften.\n\nHe spoke calmly,\nbut his words were sharp.\n\nHe said Śiva did not belong.\n\nThat Śiva did not follow rules.\n\nThat Śiva was unworthy of honor.\n\nSatī felt a quiet pain.\n\nNot anger.\n\nNot hatred.\n\nBut a deep hurt.\n\nBecause love had met rejection.\n\nTruth had met pride.\n\nSatī did not argue loudly.\n\nShe did not fight.\n\nShe simply stood still,\nfeeling the weight of her father’s words.\n\nFar away,\nŚiva remained silent.\n\nHe did not react.\n\nHe did not defend himself.\n\nAwareness does not beg ego for acceptance.\n\nThe yajña began.\n\nFire rose.\n\nChants filled the air.\n\nBut beneath the sacred sounds,\nsomething was missing.\n\nHumility.\n\nAnd when humility is absent,\nritual becomes empty.\n\nThe universe felt uneasy.\n\nSomething fragile\nwas about to break.",
  spiritualMeaning:
    "Pride closes the heart, even when truth stands quietly before it.",
  order: 204
},

{
  type: "story",
  title: "Satī’s Choice — When Truth Could Not Stay Silent",
  slug: "satis-choice-truth",
  part: "Part II – Śiva & Śakti",
  chapterNumber: 11,
  detailedText:
    "The yajña continued.\n\nFire burned steadily.\nMantras filled the air.\n\nOn the surface,\neverything looked sacred.\n\nBut Satī felt something heavy inside.\n\nShe could not ignore it.\n\nHer father was performing a ritual\nthat spoke of purity,\nwhile his heart remained closed.\n\nŚiva was not invited.\n\nNot by mistake.\n\nBut by choice.\n\nSatī stood among the gathering.\n\nShe looked around.\n\nGods were present.\nSages were present.\n\nBut awareness was missing.\n\nSlowly,\nSatī walked forward.\n\nShe did not shout.\n\nShe did not accuse.\n\nHer voice was calm,\nbut firm.\n\nShe asked her father\nwhy Śiva was insulted.\n\nDakṣa answered without anger.\n\nHe spoke of rules.\n\nOf tradition.\n\nOf status.\n\nHe spoke as if love\nhad no place in sacred duty.\n\nSatī listened.\n\nEach word felt heavier than the last.\n\nShe realized something painful.\n\nHer father could not see beyond ego.\n\nAnd ego could not see Śiva.\n\nSatī felt torn.\n\nBetween her birth family\nand her truth.\n\nBetween silence\nand integrity.\n\nShe closed her eyes.\n\nIn that stillness,\nher heart became clear.\n\nShe understood:\n\nA body born from pride\ncannot carry awareness.\n\nA life built on insult\ncannot honor truth.\n\nSatī did not act in anger.\n\nShe did not seek revenge.\n\nShe simply let go.\n\nShe released the body\nthat had become a place of pain.\n\nThe fire before her rose quietly.\n\nSatī entered it\nwithout fear.\n\nNot to escape.\n\nBut to return.\n\nThe gathering fell silent.\n\nThe ritual stopped.\n\nThe universe held its breath.\n\nFar away,\nShiva felt the shift.\n\nA stillness deeper than silence\nbegan to form.\n\nLove had been wounded.\n\nAnd the world would never be the same.",
  spiritualMeaning:
    "When truth is denied, the soul chooses integrity over attachment.",
  order: 205
},

{
  type: "story",
  title: "Śiva’s Grief — When Silence Trembled",
  slug: "shivas-grief-transformation",
  part: "Part II – Śiva & Śakti",
  chapterNumber: 12,
  detailedText:
    "The moment Satī let go,\nthe universe felt it.\n\nNot as sound.\nNot as movement.\n\nBut as a deep stillness\nsettling everywhere.\n\nFar away,\nŚiva opened his eyes.\n\nHe did not cry.\n\nHe did not speak.\n\nBut something ancient shifted\nwithin him.\n\nŚakti had withdrawn.\n\nThe warmth of existence\nhad faded.\n\nŚiva rose slowly.\n\nHe did not hurry.\n\nGrief does not rush.\n\nHe walked toward the place\nwhere Satī had fallen.\n\nThe world watched silently.\n\nWhen Śiva reached her,\nhe did not react.\n\nHe did not collapse.\n\nHe did not rage.\n\nHe simply stood.\n\nAwareness\nlooking at loss.\n\nŚiva lifted Satī’s form\ngently.\n\nNot as possession.\n\nBut as remembrance.\n\nHe carried her\nacross worlds.\n\nMountains trembled.\n\nOceans grew restless.\n\nNot from anger.\n\nBut from imbalance.\n\nFor when awareness\nloses energy,\nexistence itself feels empty.\n\nŚiva did not destroy.\n\nHe did not punish.\n\nHe withdrew.\n\nHe became still again —\nnot the stillness of peace,\nbut the stillness of grief.\n\nThe gods grew afraid.\n\nLife could not continue\nlike this.\n\nThey approached Śiva\nwith humility.\n\nNot to command.\n\nBut to heal.\n\nSlowly,\nthrough compassion,\nthrough understanding,\nSatī’s form was released\nback into the elements.\n\nBalance returned.\n\nŚiva remained silent.\n\nBut silence was changing.\n\nFrom this grief,\na deeper wisdom would rise.\n\nŚakti would return —\nnot as Satī,\nbut transformed.\n\nLove was not destroyed.\n\nIt was waiting\nfor a new beginning.\n\nThe universe breathed again.\n\nPart II came to rest.",
  spiritualMeaning:
    "Grief transforms awareness, not by breaking it, but by deepening it.",
  order: 206
},

{
  type: "story",
  title: "Pārvatī — When Love Returned as Patience",
  slug: "parvati-love-returns-as-patience",
  part: "Part III – Pārvatī’s Tapasya",
  chapterNumber: 13,
  detailedText:
    "After Satī was gone,\nthe world slowly moved forward.\n\nBut something was missing.\n\nThe warmth of life felt distant.\n\nFar away,\nŚiva remained silent.\n\nHe did not seek company.\nHe did not seek comfort.\n\nHe sat alone,\nresting in stillness\nthat was deeper than before.\n\nTime passed.\n\nNot quickly.\n\nSlowly.\n\nIn the mountains,\na child was born.\n\nShe was born to Himavān,\nthe king of the mountains,\nand to gentle Menā.\n\nThey named her Pārvatī —\ndaughter of the mountains.\n\nFrom a young age,\nPārvatī felt drawn toward silence.\n\nShe loved sitting quietly.\n\nShe loved the sound of wind\nmoving through trees.\n\nHer heart felt peaceful\nin still places.\n\nAs she grew,\nmemories stirred within her.\n\nNot as clear pictures.\n\nBut as feelings.\n\nA deep knowing.\n\nA quiet love\nwithout explanation.\n\nShe heard stories of Śiva.\n\nOf his stillness.\nOf his simplicity.\n\nSomething within her recognized him.\n\nNot as someone new.\n\nBut as someone remembered.\n\nPārvatī did not rush toward him.\n\nShe did not demand his attention.\n\nShe chose patience.\n\nShe chose effort.\n\nShe chose to prepare herself.\n\nQuietly,\nshe decided to walk a path inward.\n\nThis path was tapasya —\nnot punishment,\nnot suffering,\n\nbut focused devotion.\n\nShe sat.\n\nShe breathed.\n\nShe observed her thoughts.\n\nDay after day,\nseason after season,\n\nPārvatī remained steady.\n\nShe did not seek reward.\n\nShe sought truth.\n\nAnd the mountains watched silently.\n\nLove had returned —\nnot as pain,\nbut as patience.",
  spiritualMeaning:
    "True devotion grows through patience, not urgency.",
  order: 301
},

{
  type: "story",
  title: "Tapasya — When Patience Became Strength",
  slug: "parvati-tapasya-patience-strength",
  part: "Part III – Pārvatī’s Tapasya",
  chapterNumber: 14,
  detailedText:
    "Pārvatī sat quietly.\n\nThe mountains did not rush her.\n\nThe winds did not disturb her.\n\nDays passed.\n\nThen seasons.\n\nCold came.\n\nHeat followed.\n\nRain washed the earth.\n\nPārvatī remained.\n\nShe did not complain.\n\nShe did not ask when her effort would end.\n\nShe did not measure progress.\n\nShe simply stayed.\n\nHer body grew thinner.\n\nHer breath grew softer.\n\nHer mind grew clearer.\n\nTapasya was not suffering.\n\nIt was attention.\n\nAttention to breath.\n\nAttention to thought.\n\nAttention to silence.\n\nWhen hunger came,\nPārvatī observed it.\n\nWhen tiredness came,\nshe observed that too.\n\nShe did not fight herself.\n\nShe did not force herself.\n\nShe allowed awareness to guide her.\n\nAnimals came near her.\n\nThey felt no fear.\n\nBirds rested close by.\n\nThey felt no danger.\n\nNature recognized her stillness.\n\nInside,\nold memories softened.\n\nOld pain loosened.\n\nWhat remained was clear love.\n\nNot excitement.\n\nNot longing.\n\nBut certainty.\n\nPārvatī was not trying to win Śiva.\n\nShe was becoming ready.\n\nReady to stand in stillness\nwithout needing anything.\n\nFar away,\nŚiva felt a quiet change.\n\nNot as thought.\n\nNot as sound.\n\nBut as balance returning.\n\nTapasya continued.\n\nNot loudly.\n\nNot dramatically.\n\nBut steadily.\n\nLike a flame that does not flicker,\neven in strong wind.",
  spiritualMeaning:
    "Real strength grows when patience and awareness move together.",
  order: 302
},

{
  type: "story",
  title: "The Test — When Love Was Questioned Gently",
  slug: "shiva-tests-parvati",
  part: "Part III – Pārvatī’s Tapasya",
  chapterNumber: 15,
  detailedText:
    "Pārvatī’s tapasya continued.\n\nHer body was still.\nHer breath was slow.\nHer mind was clear.\n\nFar away,\nŚiva was aware.\n\nNot curious.\n\nNot doubtful.\n\nBut observant.\n\nBefore union,\ntruth must be steady.\n\nSo Śiva approached\nin a simple form.\n\nNot as a god.\n\nNot as a yogi.\n\nBut as an old ascetic.\n\nHe walked slowly.\n\nHe sat near Pārvatī.\n\nHis voice was calm.\n\nHe asked her why\nshe was performing tapasya.\n\nPārvatī opened her eyes.\n\nShe answered simply.\n\nShe spoke of stillness.\n\nOf awareness.\n\nOf Śiva.\n\nThe ascetic smiled softly.\n\nHe questioned her choice.\n\nHe spoke of Śiva’s wild ways.\n\nOf his silence.\n\nOf his distance from society.\n\nHe asked her\nwhy she chose someone\nwho owned nothing,\nwho followed no rules.\n\nPārvatī listened.\n\nShe did not feel insulted.\n\nShe did not feel shaken.\n\nShe replied gently.\n\nShe said she did not seek\nwealth.\n\nShe did not seek comfort.\n\nShe sought truth.\n\nShe said Śiva was stillness itself.\n\nAnd stillness needed no approval.\n\nThe ascetic grew quiet.\n\nNo argument followed.\n\nNo defense was needed.\n\nPārvatī returned to silence.\n\nHer devotion had not changed.\n\nHer love had not moved.\n\nŚiva watched carefully.\n\nThe test was not about words.\n\nIt was about steadiness.\n\nAnd Pārvatī remained steady.",
  spiritualMeaning:
    "What is true does not need to be defended; it simply remains.",
  order: 303
},

{
  type: "story",
  title: "Revelation — When Stillness Recognized Itself",
  slug: "shiva-reveals-himself",
  part: "Part III – Pārvatī’s Tapasya",
  chapterNumber: 16,
  detailedText:
    "The ascetic remained seated.\n\nSilence stretched between them.\n\nNot empty silence.\n\nLiving silence.\n\nPārvatī did not wait for answers.\n\nShe did not expect anything.\n\nHer breath flowed gently.\n\nHer body was steady.\n\nHer heart was clear.\n\nIn that clarity,\nsomething subtle shifted.\n\nThe air felt lighter.\n\nThe space around her felt wider.\n\nWithout sound,\nwithout movement,\nthe ascetic changed.\n\nThe simplicity remained.\n\nBut the presence deepened.\n\nThe silence became vast.\n\nPārvatī felt it.\n\nNot with her eyes.\n\nNot with her thoughts.\n\nBut with her whole being.\n\nShe bowed.\n\nNot in surprise.\n\nNot in excitement.\n\nBut in recognition.\n\nŚiva did not speak.\n\nWords were unnecessary.\n\nAwareness had recognized awareness.\n\nŚakti had found her source.\n\nŚiva looked at Pārvatī.\n\nNot as a reward.\n\nNot as approval.\n\nBut as balance restored.\n\nHer tapasya had not created love.\n\nIt had removed what covered it.\n\nŚiva did not promise.\n\nHe did not declare.\n\nHe simply remained present.\n\nThat presence was the answer.\n\nThe mountains stood still.\n\nThe wind paused.\n\nTime softened.\n\nNothing dramatic happened.\n\nAnd yet,\neverything changed.\n\nThe separation was over.\n\nNot because two became one.\n\nBut because one was never two.",
  spiritualMeaning:
    "Truth is revealed when all effort dissolves into clarity.",
  order: 304
},

{
  type: "story",
  title: "Union — When Nothing Needed to Be Said",
  slug: "divine-union-silence",
  part: "Part III – Pārvatī’s Tapasya",
  chapterNumber: 17,
  detailedText:
    "There was no announcement.\n\nNo gathering.\n\nNo sound of celebration.\n\nŚiva and Pārvatī sat together.\n\nNot facing each other.\n\nNot holding hands.\n\nSimply present.\n\nThe mountains did not shake.\n\nThe sky did not open.\n\nNothing dramatic appeared.\n\nAnd yet,\nthis was the most complete moment the universe had known.\n\nAwareness rested.\nEnergy rested.\n\nNot separate.\n\nNot joined.\n\nJust balanced.\n\nPārvatī did not feel she had achieved something.\n\nŚiva did not feel he had gained something.\n\nNothing was added.\n\nNothing was taken.\n\nWhat had always been true\nwas now visible.\n\nStillness and movement\nwere no longer distant.\n\nSilence and expression\nno longer opposed.\n\nThey existed together,\nwithout effort.\n\nThe world felt steady.\n\nLife felt supported.\n\nCreation could continue\nwithout confusion.\n\nThis was their union.\n\nNot a ceremony.\n\nNot a promise.\n\nBut understanding.\n\nFrom this balance,\nall future stories would arise.\n\nJoy.\n\nStruggle.\n\nBirth.\n\nChange.\n\nYet beneath all of it,\nthis quiet union would remain.\n\nUnmoving.\n\nComplete.\n\nThe mountains breathed.\n\nThe silence smiled.\n\nPart III came to rest.",
  spiritualMeaning:
    "Union happens when nothing remains to be proven.",
  order: 305
},

{
  type: "story",
  title: "Kailāsa — When Stillness Chose to Live in the World",
  slug: "kailasa-grihastha-shiva",
  part: "Part IV – Gṛhastha Śiva",
  chapterNumber: 18,
  detailedText:
    "After union,\nlife did not stop.\n\nSilence did not disappear.\n\nInstead,\nsilence chose to live within life.\n\nŚiva and Pārvatī made their home\non Mount Kailāsa.\n\nNot a palace of gold.\n\nNot a place of luxury.\n\nA quiet mountain.\n\nCold.\nClear.\nStill.\n\nHere,\nawareness lived among snow and stone.\n\nŚiva sat in meditation.\n\nPārvatī moved gently through daily life.\n\nFire was lit.\nWater was carried.\n\nSimple work was done\nwith full presence.\n\nThis was not retreat.\n\nThis was participation.\n\nŚiva did not abandon the world.\n\nHe entered it fully —\nwithout attachment.\n\nPārvatī did not lose her strength.\n\nShe expressed it\nthrough care and balance.\n\nTogether,\nthey showed a new way.\n\nOne could live in the world\nwithout being owned by it.\n\nOne could act\nwithout losing awareness.\n\nThe mountain watched.\n\nThe wind listened.\n\nLife felt supported.\n\nFrom Kailāsa,\nthis quiet example\nspread everywhere.\n\nTo households.\nTo families.\nTo ordinary lives.\n\nThe message was simple:\n\nAwareness does not require escape.\n\nIt can live\nright where you are.\n\nThe householder path\nhad begun.",
  spiritualMeaning:
    "True spirituality lives fully in the world without being bound by it.",
  order: 401
},

{
  type: "story",
  title: "The Teacher at Home — When Daily Life Became Wisdom",
  slug: "shiva-householder-teacher",
  part: "Part IV – Gṛhastha Śiva",
  chapterNumber: 19,
  detailedText:
    "Life on Kailāsa was simple.\n\nMornings arrived quietly.\n\nSnow reflected soft light.\n\nThe air was clear.\n\nŚiva rose early.\n\nNot with urgency.\n\nBut with ease.\n\nHe sat.\n\nHe breathed.\n\nAwareness settled gently.\n\nPārvatī moved through the home.\n\nShe prepared fire.\n\nShe arranged water.\n\nEvery action was calm.\n\nNothing was rushed.\n\nNothing was ignored.\n\nThose who came to Kailāsa\nnoticed something unusual.\n\nNo grand lessons were given.\n\nNo long speeches were made.\n\nYet understanding grew naturally.\n\nVisitors watched.\n\nThey saw Śiva listening deeply.\n\nThey saw Pārvatī caring attentively.\n\nThey felt peace simply by being present.\n\nQuestions often dissolved\nbefore being asked.\n\nWhen words were spoken,\nthey were few.\n\nClear.\n\nKind.\n\nŚiva did not correct harshly.\n\nHe did not instruct forcefully.\n\nHe allowed people to observe.\n\nTo notice.\n\nTo learn on their own.\n\nThis was teaching through living.\n\nWisdom expressed\nnot through rules,\n\nbut through example.\n\nHouseholder life became sacred.\n\nCooking.\n\nListening.\n\nResting.\n\nWorking.\n\nAll became paths to awareness.\n\nKailāsa did not feel distant.\n\nIt felt familiar.\n\nAs if reminding everyone:\n\nYour own home\ncan become a place of stillness\nwhen lived with presence.",
  spiritualMeaning:
    "Wisdom is absorbed naturally when life itself becomes the lesson.",
  order: 402
},

{
  type: "story",
  title: "Preparing for Parenthood — When Stillness Made Space for New Life",
  slug: "preparing-for-parenthood",
  part: "Part IV – Gṛhastha Śiva",
  chapterNumber: 20,
  detailedText:
    "Life on Kailāsa continued quietly.\n\nDays followed nights.\n\nSeasons changed without announcement.\n\nSnow melted.\n\nSnow returned.\n\nŚiva and Pārvatī moved through each day\nwith the same calm attention.\n\nNothing was forced.\n\nNothing was delayed.\n\nSlowly,\na gentle readiness began to form.\n\nNot excitement.\n\nNot planning.\n\nBut space.\n\nPārvatī felt it first.\n\nA softness within her.\n\nA widening.\n\nAs if the heart itself\nwas becoming a home.\n\nŚiva noticed.\n\nNot with words.\n\nBut with awareness.\n\nHe did not ask.\n\nHe did not decide.\n\nHe simply allowed.\n\nTogether,\nthey adjusted their rhythm.\n\nMeditation remained.\n\nSilence remained.\n\nBut care deepened.\n\nŚiva became more attentive to small things.\n\nHow fire was placed.\n\nHow water was stored.\n\nHow rest was taken.\n\nPārvatī moved with greater gentleness.\n\nNot from weakness.\n\nBut from respect for life.\n\nThe mountain responded.\n\nAnimals lingered longer.\n\nBirds nested closer.\n\nThe air felt softer.\n\nNothing announced\nthat change was coming.\n\nYet everything prepared.\n\nThis was not anticipation.\n\nIt was alignment.\n\nThey did not think of becoming parents\nas gaining something.\n\nThey understood it\nas serving life.\n\nŚiva did not leave his stillness.\n\nPārvatī did not leave her strength.\n\nBoth deepened.\n\nResponsibility did not feel heavy.\n\nIt felt natural.\n\nAs if the universe itself\nhad leaned gently toward them.\n\nNo celebration was needed.\n\nNo declaration was made.\n\nLife was simply getting ready\nto express itself again.\n\nQuietly.\n\nRespectfully.\n\nWith care.",
  spiritualMeaning:
    "New life enters naturally when awareness creates space, not urgency.",
  order: 403
},

{
  type: "story",
  title: "Gaṇeśa — When Care Took a Gentle Form",
  slug: "birth-of-ganesha",
  part: "Part IV – Gṛhastha Śiva",
  chapterNumber: 21,
  detailedText:
    "Life on Kailāsa moved softly.\n\nCare filled the space.\n\nPārvatī felt complete.\n\nOne quiet day,\nwhile Śiva was away in deep meditation,\nPārvatī remained at home.\n\nShe felt the need to protect her stillness.\n\nNot out of fear.\n\nBut out of care.\n\nFrom the earth beneath her feet,\nfrom the warmth of her hands,\nfrom her focused attention,\nPārvatī shaped a form.\n\nShe did not rush.\n\nShe did not force.\n\nShe worked gently.\n\nHer breath steady.\n\nHer mind calm.\n\nInto this form,\nshe placed awareness.\n\nNot separate from herself.\n\nNot borrowed.\n\nIt was her care made visible.\n\nThe child opened his eyes.\n\nThere was innocence.\n\nThere was strength.\n\nThere was quiet intelligence.\n\nPārvatī smiled.\n\nShe asked him to stand guard.\n\nNot to fight.\n\nNot to challenge.\n\nOnly to protect the space of stillness.\n\nThe child agreed.\n\nHe stood calmly.\n\nPresent.\n\nWhen Śiva returned,\nhe saw someone unfamiliar.\n\nThe child stood steady.\n\nHe did not move aside.\n\nNot from defiance.\n\nBut from duty.\n\nŚiva paused.\n\nHe felt no anger.\n\nOnly confusion.\n\nAwareness met innocence.\n\nA misunderstanding formed.\n\nWhat followed was sudden.\n\nA moment without awareness.\n\nAnd the quiet space was broken.\n\nWhen Pārvatī returned\nand saw what had happened,\nher pain was deep.\n\nNot loud.\n\nNot angry.\n\nBut overwhelming.\n\nŚiva became still.\n\nHe saw clearly.\n\nA mistake had occurred.\n\nNot from cruelty.\n\nBut from absence of understanding.\n\nHe knelt.\n\nHe listened.\n\nHe accepted responsibility.\n\nTo restore balance,\nŚiva gave the child new life.\n\nA new form.\n\nA new beginning.\n\nThe child returned,\ncalm and radiant.\n\nWith an elephant’s head —\nsymbol of wisdom,\npatience,\nand gentle strength.\n\nŚiva placed his hand upon him.\n\nNot in command.\n\nBut in blessing.\n\nFrom that moment,\nGaṇeśa became the guardian\nof beginnings.\n\nHe stood not at the door of homes,\n\nbut at the door of understanding.\n\nRemoving obstacles\nnot by force,\n\nbut by clarity.\n\nKailāsa grew warmer.\n\nA new presence had arrived.\n\nLife smiled softly again.",
  spiritualMeaning:
    "When mistakes are met with responsibility and care, wisdom is born.",
  order: 404
},

{
  type: "story",
  title: "Kārtikeya — When Courage Learned Direction",
  slug: "birth-of-kartikeya",
  part: "Part IV – Gṛhastha Śiva",
  chapterNumber: 22,
  detailedText:
    "Kailāsa was peaceful again.\n\nGaṇeśa’s presence brought calm wisdom.\n\nYet the world beyond the mountain\nwas not always calm.\n\nConfusion grew.\n\nForces that lacked clarity\nbegan to disturb balance.\n\nThe universe needed courage —\nbut courage guided by awareness.\n\nFrom Śiva’s deep stillness,\na focused energy arose.\n\nIt was bright.\n\nIt was sharp.\n\nIt did not hesitate.\n\nThis energy could not be held\nin one place.\n\nIt needed guidance.\n\nCare.\n\nDirection.\n\nThe energy traveled gently\nthrough nature.\n\nIt was carried by fire.\n\nIt rested in water.\n\nIt was watched over\nby the stars.\n\nWhen the time was right,\nPārvatī received it.\n\nNot with effort.\n\nNot with fear.\n\nWith calm readiness.\n\nFrom this union of focus and care,\nKārtikeya was born.\n\nHe did not cry loudly.\n\nHe did not struggle.\n\nHis eyes were clear.\n\nHis presence was steady.\n\nHe carried courage\nwithout aggression.\n\nStrength\nwithout anger.\n\nŚiva looked upon him\nwith quiet understanding.\n\nPārvatī held him\nwith gentle pride.\n\nKārtikeya grew quickly.\n\nNot rushed.\n\nBut prepared.\n\nHe learned to move forward\nwithout losing awareness.\n\nHe learned to act\nwithout becoming harsh.\n\nIn time,\nhe would guide others\nthrough confusion.\n\nHe would stand\nwhen action was needed.\n\nNot for dominance.\n\nBut for balance.\n\nThus,\nKārtikeya became\nfocused courage.\n\nThe protector of clarity.\n\nThe strength that listens\nbefore it moves.",
  spiritualMeaning:
    "True courage acts with clarity, not anger.",
  order: 405
},

{
  type: "story",
  title: "Harmony — When Different Paths Lived Together",
  slug: "family-harmony-kailasa",
  part: "Part IV – Gṛhastha Śiva",
  chapterNumber: 23,
  detailedText:
    "Kailāsa became a home filled with quiet life.\n\nŚiva.\n\nPārvatī.\n\nGaṇeśa.\n\nKārtikeya.\n\nEach was different.\n\nEach moved in their own way.\n\nYet nothing felt divided.\n\nGaṇeśa sat often with his mother.\n\nHe listened.\n\nHe observed.\n\nHe learned patience.\n\nKārtikeya moved outward.\n\nHe watched the world.\n\nHe felt where action was needed.\n\nHe learned courage.\n\nPārvatī stood between them —\n\nnot controlling,\n\nnot choosing sides,\n\nbut understanding both.\n\nShe knew wisdom needed time.\n\nShe knew courage needed direction.\n\nŚiva watched quietly.\n\nHe did not compare.\n\nHe did not measure.\n\nHe did not favor.\n\nHe allowed each one to grow\naccording to their nature.\n\nThere was no competition.\n\nNo demand to be the same.\n\nDifferences were not corrected.\n\nThey were respected.\n\nWhen Gaṇeśa paused,\nKārtikeya did not push him.\n\nWhen Kārtikeya moved quickly,\nGaṇeśa did not hold him back.\n\nEach learned from the other\nwithout trying to change the other.\n\nMeals were shared quietly.\n\nStories were told slowly.\n\nSilence was welcomed.\n\nEven disagreement,\nwhen it arose,\nwas met with listening.\n\nThis was not perfection.\n\nIt was balance.\n\nA family living\nwithout losing awareness.\n\nFrom Kailāsa,\nthis harmony spread silently.\n\nIt reminded the world:\n\nUnity does not mean sameness.\n\nLove does not require control.\n\nBalance grows\nwhen each path is allowed\nits own rhythm.",
  spiritualMeaning:
    "Harmony arises when differences are allowed to exist without comparison.",
  order: 406
},

{
  type: "story",
  title: "Dakṣiṇāmūrti — When Silence Became the Greatest Teacher",
  slug: "dakshinamurti-silent-teacher",
  part: "Part V – Śiva as Universal Guide",
  chapterNumber: 24,
  detailedText:
    "Time moved on.\n\nFamilies grew.\n\nWorlds changed.\n\nQuestions arose in many hearts.\n\nPeople searched.\n\nThey read.\n\nThey asked.\n\nThey argued.\n\nYet something remained unclear.\n\nTruth could not be held by words alone.\n\nSeeing this,\nŚiva chose a new way to guide.\n\nHe did not speak.\n\nHe did not explain.\n\nHe simply sat.\n\nFacing south,\nbeneath an ancient banyan tree.\n\nThis form was Dakṣiṇāmūrti.\n\nFour young seekers sat before him.\n\nThey came with questions.\n\nThey came with doubt.\n\nThey came with restless minds.\n\nŚiva did not answer them.\n\nMinutes passed.\n\nThen hours.\n\nThen something changed.\n\nTheir breathing slowed.\n\nTheir thoughts softened.\n\nTheir questions dissolved.\n\nUnderstanding appeared\nwithout being spoken.\n\nThe banyan tree stood firm.\n\nRoots reached deep.\n\nBranches spread wide.\n\nLike awareness itself.\n\nDakṣiṇāmūrti did not teach through sound.\n\nHe taught through presence.\n\nHe showed that truth\nis already known\nwhen the mind becomes quiet.\n\nThe seekers bowed.\n\nNot because they received answers.\n\nBut because they no longer needed them.\n\nFrom that moment,\nŚiva became the eternal Guru.\n\nNot for one age.\n\nNot for one people.\n\nBut for all who sit quietly\nand listen inward.\n\nSilence had spoken.\n\nAnd it spoke forever.",
  spiritualMeaning:
    "The deepest truth is understood when the mind becomes silent.",
  order: 501
},

{
  type: "story",
  title: "Bhairava — When Awareness Stood Guard",
  slug: "bhairava-guardian-awareness",
  part: "Part V – Śiva as Universal Guide",
  chapterNumber: 25,
  detailedText:
    "There are moments\nwhen the mind reaches its edge.\n\nFear appears.\n\nUncertainty rises.\n\nNot from danger outside,\n\nbut from confusion within.\n\nAt these edges,\nawareness must stand firm.\n\nThis firmness is Bhairava.\n\nBhairava is not anger.\n\nHe is clarity.\n\nHe does not chase fear.\n\nHe looks directly at it.\n\nŚiva appeared as Bhairava\nwhere awareness was needed most.\n\nAt crossroads.\n\nAt thresholds.\n\nAt the borders between knowing and forgetting.\n\nBhairava stood still.\n\nEyes open.\n\nPresence sharp.\n\nNothing passed him unnoticed.\n\nHe did not attack.\n\nHe did not destroy.\n\nHe simply allowed nothing false to enter.\n\nFear dissolved\nwhen faced without movement.\n\nConfusion softened\nwhen watched clearly.\n\nThose who approached Bhairava\nfelt uneasy at first.\n\nBecause truth feels intense\nwhen masks fall away.\n\nBut those who stayed\nfelt protected.\n\nNot by force.\n\nBy awareness.\n\nBhairava guarded temples.\n\nHe guarded spaces of silence.\n\nBut more importantly,\nhe guarded the inner doorway.\n\nWhere the mind meets the unknown.\n\nBhairava reminded all seekers:\n\nDo not run.\n\nDo not hide.\n\nStand still.\n\nLet awareness stand guard.\n\nNothing unreal can remain\nwhen seen clearly.\n\nThus,\nBhairava became the protector.\n\nNot of places.\n\nBut of truth itself.",
  spiritualMeaning:
    "Fear dissolves when awareness stands firm without reaction.",
  order: 502
},

{
  type: "story",
  title: "Kālabhairava — When Time Bowed to Awareness",
  slug: "kalabhairava-time-awareness",
  part: "Part V – Śiva as Universal Guide",
  chapterNumber: 26,
  detailedText:
    "Everything moves.\n\nMoments pass.\n\nBodies change.\n\nThoughts rise and fall.\n\nThis movement is time.\n\nTime does not wait.\n\nIt does not ask.\n\nIt carries all things forward.\n\nMost beings are carried by time.\n\nFew learn to stand within it.\n\nŚiva appeared as Kālabhairava\nat the heart of time itself.\n\nNot to stop it.\n\nNot to escape it.\n\nBut to hold it with awareness.\n\nKālabhairava did not run from change.\n\nHe watched it.\n\nHe measured it.\n\nHe guided it.\n\nIn his presence,\ntime slowed.\n\nNot outside.\n\nInside.\n\nActions became precise.\n\nChoices became clear.\n\nResponsibility arose naturally.\n\nKālabhairava carried a key.\n\nNot to lock doors.\n\nBut to remind all beings:\n\nEvery moment matters.\n\nNothing can be postponed forever.\n\nTruth must be lived now.\n\nThose who remembered time\nfelt urgency without fear.\n\nThose who forgot time\nfelt fear without direction.\n\nKālabhairava did not punish.\n\nHe revealed consequence.\n\nHe showed that awareness\nmust walk with action.\n\nTime bowed\nnot in defeat,\n\nbut in order.\n\nThus,\nKālabhairava became\nkeeper of time.\n\nGuardian of responsibility.\n\nReminder that awareness\nis meaningless\nunless lived in the moment.",
  spiritualMeaning:
    "Awareness becomes wisdom when it respects time and responsibility.",
  order: 503
},

{
  type: "story",
  title: "The Witness — When Nothing Needed to Change",
  slug: "shiva-inner-witness",
  part: "Part V – Śiva as Universal Guide",
  chapterNumber: 27,
  detailedText:
    "Thoughts appeared.\n\nThey passed.\n\nFeelings arose.\n\nThey softened.\n\nActions happened.\n\nThey ended.\n\nBehind all of this,\nsomething remained.\n\nUnmoving.\n\nUnchanging.\n\nThat presence did not judge.\n\nIt did not interfere.\n\nIt did not improve or correct.\n\nIt simply watched.\n\nThis presence was Śiva\nas the Witness.\n\nNot above life.\n\nNot outside life.\n\nWithin every moment.\n\nWhen joy came,\nhe remained.\n\nWhen pain came,\nhe remained.\n\nWhen clarity appeared,\nhe remained.\n\nWhen confusion passed,\nhe remained.\n\nNothing needed to be fixed.\n\nNothing needed to be removed.\n\nSeeing itself was enough.\n\nThose who noticed the Witness\nfelt relief.\n\nThey stopped fighting thoughts.\n\nThey stopped chasing peace.\n\nThey rested as awareness.\n\nLife continued.\n\nBut suffering softened.\n\nBecause the Witness\nwas never harmed\nby what appeared.\n\nŚiva did not ask\nfor belief.\n\nHe did not ask\nfor worship.\n\nHe asked only one thing:\n\nNotice.\n\nAnd in noticing,\nfreedom appeared\nwithout effort.",
  spiritualMeaning:
    "Freedom begins when awareness notices without trying to change.",
  order: 504
},

{
  type: "story",
  title: "Beyond — Where Even Shiva Disappears",
  slug: "shiva-beyond-form",
  part: "Part V – Śiva as Universal Guide",
  chapterNumber: 28,
  detailedText:
    "Before Shiva,\n\nthere was this.\n\nAfter Shiva,\n\nthere is this.\n\nNo name.\n\nNo form.\n\nNo witness.\n\nNo seeker.\n\nSilence remains.\n\nNot the silence that follows sound.\n\nThe silence that was never broken.\n\nHere,\n\nstories dissolve.\n\nTeachers dissolve.\n\nEven Shiva dissolves.\n\nNot lost.\n\nNot destroyed.\n\nSimply unnecessary.\n\nNothing needs to be known.\n\nNothing needs to be practiced.\n\nNothing needs to be reached.\n\nThis is not emptiness.\n\nThis is fullness\nwithout edges.\n\nIf attention rests here,\n\nthere is no question.\n\nNo answer.\n\nOnly being.\n\nAnd even that\n\nneeds no name.",
  spiritualMeaning:
    "The ultimate truth is not something to realize, but something that was never absent.",
  order: 505
},


// 🧘 SHIVA TEACHINGS
// =======================

{
  type: "teaching",
  title: "Shiva as Adi Yogi",
  slug: "shiva-as-adi-yogi",
  detailedText:
    "Shiva is revered as Adi Yogi — the first yogi. He did not teach through books or commandments, but through direct experience. His stillness became the teaching. From him came yoga, meditation, and the science of inner transformation. Shiva shows that liberation is not belief-based but experiential.",
  order: 1
},
{
  type: "teaching",
  title: "The Power of Silence (Mauna)",
  slug: "power-of-silence",
  detailedText:
    "Silence is Shiva’s primary teaching. Not silence of the mouth, but silence of the mind. When thoughts settle, awareness shines naturally. Shiva teaches that truth does not need words; it reveals itself in stillness.",
  order: 2
},
{
  type: "teaching",
  title: "Vairagya — The Art of Letting Go",
  slug: "vairagya-letting-go",
  detailedText:
    "Shiva lives unclothed, covered in ash, not because he rejects life, but because he is not bound by it. Vairagya means living fully without clinging. Shiva teaches that freedom comes not from renunciation of the world, but renunciation of attachment.",
  order: 3
},
{
  type: "teaching",
  title: "Balance of Householder and Ascetic",
  slug: "householder-and-ascetic",
  detailedText:
    "Shiva is both an ascetic and a householder. With Parvati and children, he shows family life. In meditation, he shows detachment. His life teaches balance — one can be deeply spiritual without escaping responsibilities.",
  order: 4
},
{
  type: "teaching",
  title: "Destruction as Transformation",
  slug: "destruction-as-transformation",
  detailedText:
    "Shiva is the destroyer, not of life, but of illusion. Destruction clears space for renewal. Shiva teaches that endings are not failures — they are gateways to transformation.",
  order: 5
},
{
  type: "teaching",
  title: "Awareness Over Action",
  slug: "awareness-over-action",
  detailedText:
    "Shiva acts only when necessary. Most of the time, he observes. Awareness, not constant action, is his path. He teaches that right action arises naturally from awareness.",
  order: 6
},
{
  type: "teaching",
  title: "Fearlessness",
  slug: "fearlessness",
  detailedText:
    "Shiva wears snakes and resides in cremation grounds. He shows that fear arises from misunderstanding life and death. Awareness dissolves fear. Shiva teaches us to face life fully, without escape.",
  order: 7
},
{
  type: "teaching",
  title: "Time is Not the Enemy",
  slug: "time-is-not-enemy",
  detailedText:
    "As Mahakaal, Shiva governs time. He teaches that time binds only those who cling. For the aware, time becomes a flow, not a prison.",
  order: 8
},
{
  type: "teaching",
  title: "Compassion with Strength",
  slug: "compassion-with-strength",
  detailedText:
    "Shiva drinks poison to save the universe, yet remains fierce against injustice. His compassion is not weakness. True compassion requires inner strength.",
  order: 9
},
{
  type: "teaching",
  title: "Inner Guru",
  slug: "inner-guru",
  detailedText:
    "Shiva teaches from within. External guidance is useful, but the true guru awakens inner intelligence. Shiva reminds us that wisdom already exists within awareness.",
  order: 10
},
{
  type: "teaching",
  title: "Meditation is Remembering",
  slug: "meditation-is-remembering",
  detailedText:
    "Meditation is not concentration or effort. It is remembering one’s true nature. Shiva’s meditation is effortless awareness.",
  order: 11
},
{
  type: "teaching",
  title: "Liberation is Now",
  slug: "liberation-is-now",
  detailedText:
    "Shiva does not promise liberation after death. He teaches liberation here and now — through awareness, clarity, and inner freedom.",
  order: 12
},


      // ✨ QUOTE
      // ✨ SHIVA QUOTES
{
  type: "quote",
  title: "On Silence",
  slug: "silence-quote",
  shortText: "In silence, Shiva is known without words.",
  timeOfDay: "morning",
  order: 1,
},
{
  type: "quote",
  title: "On Stillness",
  slug: "stillness-quote",
  shortText: "Stillness is not empty; it is full of truth.",
  timeOfDay: "morning",
  order: 2,
},
{
  type: "quote",
  title: "On Awareness",
  slug: "awareness-quote",
  shortText: "Awareness needs no effort; it shines when the mind rests.",
  timeOfDay: "morning",
  order: 3,
},
{
  type: "quote",
  title: "On the Present Moment",
  slug: "present-moment-quote",
  shortText: "Shiva lives in the present — not in memory, not in imagination.",
  timeOfDay: "morning",
  order: 4,
},
{
  type: "quote",
  title: "On Detachment",
  slug: "detachment-quote",
  shortText: "Detachment is not rejection of life; it is freedom within life.",
  timeOfDay: "morning",
  order: 5,
},
{
  type: "quote",
  title: "On Inner Peace",
  slug: "inner-peace-quote",
  shortText: "When the mind becomes quiet, peace reveals itself naturally.",
  timeOfDay: "morning",
  order: 6,
},
{
  type: "quote",
  title: "On Letting Go",
  slug: "letting-go-quote",
  shortText: "Let go, and you will discover that nothing was missing.",
  timeOfDay: "morning",
  order: 7,
},
{
  type: "quote",
  title: "On Fear",
  slug: "fear-quote",
  shortText: "Fear dissolves when truth is faced with awareness.",
  timeOfDay: "morning",
  order: 8,
},
{
  type: "quote",
  title: "On Meditation",
  slug: "meditation-quote",
  shortText: "Meditation is not doing something; it is remembering who you are.",
  timeOfDay: "night",
  order: 9,
},
{
  type: "quote",
  title: "On Freedom",
  slug: "freedom-quote",
  shortText: "Freedom begins where clinging ends.",
  timeOfDay: "night",
  order: 10,
},
{
  type: "quote",
  title: "On Truth",
  slug: "truth-quote",
  shortText: "Truth does not shout; it waits patiently in stillness.",
  timeOfDay: "night",
  order: 11,
},
{
  type: "quote",
  title: "On Awareness and Action",
  slug: "awareness-action-quote",
  shortText: "Right action arises naturally from awareness.",
  timeOfDay: "night",
  order: 12,
},
{
  type: "quote",
  title: "On Shiva Within",
  slug: "shiva-within-quote",
  shortText: "Do not seek Shiva outside; turn inward.",
  timeOfDay: "night",
  order: 13,
},
{
  type: "quote",
  title: "On Time",
  slug: "time-quote",
  shortText: "Time binds only those who cling; awareness is timeless.",
  timeOfDay: "night",
  order: 14,
},
{
  type: "quote",
  title: "On Liberation",
  slug: "liberation-quote",
  shortText: "Liberation is not after death; it is available now.",
  timeOfDay: "night",
  order: 15,
},

    ]);

    console.log("✅ ALL MODULE 1 DATA SEEDED");
    process.exit(0);
  } catch (err) {
    console.error("❌ SEED ERROR:", err);
    process.exit(1);
  }
}

seed();
