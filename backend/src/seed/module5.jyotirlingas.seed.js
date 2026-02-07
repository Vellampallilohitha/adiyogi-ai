require("dotenv").config();
const mongoose = require("mongoose");
const Content = require("../models/Content.model");

async function seedJyotirlingas() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");

    // remove old jyotirlinga data
    await Content.deleteMany({ type: "jyotirlinga" });

    await Content.insertMany([
      {
        type: "jyotirlinga",
        title: "Origin of the Jyotirlingas",
        slug: "jyotirlinga-origin",
        detailedText: "The Jyotirlingas are believed to be self-manifested representations of Lord Shiva.\nThe term Jyotirlinga translates to “pillar of light,” and each of the twelve shrines has a unique legend associated with its origin\n But what connects them all is their foundation in Shiva’s eternal presence as an eternal source of light.\nIt is believed that visiting these sacred shrines grants moksha and showers us with blessings.\nThe twelve Jyotirlingas are:\n 1.Somnath (Gujarat)\n 2.Mallikarjuna (Andhra Pradesh)\n 3.Mahakaleshwar (Madhya Pradesh)\n 4.Omkareshwar (Madhya Pradesh)\n 5.Kedarnath (Uttarakhand)\n 6.Bhimashankar (Maharashtra)\n 7.Kashi Vishwanath (Uttar Pradesh)\n 8.Trimbakeshwar (Maharashtra)\n 9.Vaidyanath (Jharkhand)\n10.Nageshwar (Gujarat)\n11.Rameshwaram (Tamil Nadu)\n12.Grishneshwar (Maharashtra)\nThe universal origin story of the Jyotirlingas is rooted in the Shiva Purana. \nOne day, Lord Brahma and Lord Vishnu were engaged in a debate over who among them was supreme. The quarrel grew intense, threatening the balance of the cosmos. To resolve their dispute, Shiva manifested as an immense pillar of light and declared that whoever could find the origin or end of the pillar would be considered supreme.Brahma took the form of a swan and flew upwards to find the top of the pillar.Vishnu assumed the form of a boar and dug deep into the earth to locate its base.Despite their exhaustive efforts, neither could find the limits of the pillar. Vishnu acknowledged his failure. Brahma, however, lied, claiming he had found the top and presented a Ketaki flower as evidence. Angered by Brahma’s deceit, Shiva appeared from the pillar and cursed Brahma, declaring that he would no longer be worshiped on earth. The Ketaki flower was also banned from being used in Shiva’s worship.This pillar of light (Jyoti) became a symbol of Shiva’s infinite and formless essence, giving rise to the Jyotirlinga.They represent Shiva’s omnipresence and his role as the destroyer of ignorance and illusions. They symbolize the connection between the physical and spiritual realms, encouraging seekers to connect with the divine. \nEach Jyotirlinga is believed to have immense spiritual energy, offering devotees a path to self-realization and liberation.",
        order: 0,
      },

      {
        type: "jyotirlinga",
        title: "Somnath-Gujarath",
        slug: "somnath",
        detailedText:
          "The story of Somnath Jyotirlinga centers on the Moon God, Chandra, who was cursed by his father-in-law, Daksha Prajapati, for showing favoritism to his wife Rohini over his other 27 wives (the nakshatras), causing him to lose his luster. Seeking relief, Chandra prayed to Lord Shiva at Prabhas Patan, where Shiva appeared, modified the curse, and blessed Chandra to wax and wane, leading Chandra to build the first gold temple and install the first Jyotirlinga. The temple, meaning 'Lord of the Moon', became a sacred site, rebuilt many times, and is associated with the Saraswati River and the Arabian Sea, attracting devotion for centuries.The Curse and Prayer\nDaksha's Curse: Chandra favored Rohini, neglecting his other 27 wives, daughters of Daksha. Infuriated, Daksha cursed Chandra to lose his radiance and vitality.\nSeeking Shiva: As the moon faded, the gods advised Chandra to worship Lord Shiva. Chandra went to Prabhas Kshetra (Somnath), performed penance, and recited mantras. \nShiva's Blessing & Creation\nModified Curse: Impressed by Chandra's devotion, Lord Shiva appeared and modified the curse, blessing Chandra to wax (grow bright) for 15 days and wane (grow dim) for the next 15, explaining the moon's phases. \nTemple Built: In gratitude, Chandra built a magnificent temple of gold for Shiva at the spot, calling it Somnath (Lord of the Moon). \nRiver & Sea: Chandra bathed in the holy Saraswati River here, regaining his luster, and the site is where the river meets the sea, making it sacred.",
        spiritualMeaning: "Renewal and immortality",
        order: 1,
      },
      {
        type: "jyotirlinga",
        title: "Mallikarjuna-Srisailam",
        slug: "mallikarjuna",
        detailedText:
          "Perched atop the pious peaks of the Shri Shaila Mountain, a magnificent abode of two supreme deities reigns over an adoring local populace. The Mallikarjuna Temple based in Srisailam is a grand celebration of the Shaivism and Shaktism worship in India.When Lord Shiva and Goddess Parvati decided to marry their two adoring sons, Lord Ganesha and Kartikeya, they were in a dilemma who should be married first. Lord Shiva and Parvati then devised a competition for their sons. Shiva decided that whoever circumambulates the earth first wins and will be married first. Kartikeya set out on his flying peacock mount, thinking there was no chance that his brother could win on his mount which was Mouse Mushaka. But Ganesha was clever and devised a strategy that would ensure his success.srisailam mallikarjuna temple\nHe went around Shiva and Parvati seven times, arguing that parents were equivalent to the world according to the Shashtra scriptures. The Shastras are a set of rules that have been a part of Hinduism since the conception of the religion. This feat much impressed Shiva and Parvati, and they married Lord Ganesha to the embodiment of intellect (Goddess Buddhi), prosperity (Goddess Riddhi) and spiritual dexterity (Goddess Siddhi).\n\nHowever, the celebration was short-lived because when Kartikeya returned, he was furious that he lost. Feeling dejected, he flew away to Mount Krauncha to spend his days as Kumar Brahmachari. Shiva and Parvati then followed after their son to appease him and presided on the Mountain as Mallika and Arjuna. They became patrons of the mountain and lived there with Kartikeya. The site was then called Mallikarjuna and became a holy place of worship for both Shiva and Parvati disciples.",
        spiritualMeaning: "Unity of Shiva and Shakti",
        order: 2,
      },
      {
        type: "jyotirlinga",
        title: "Mahakaleshwar-Ujjain",
        slug: "mahakaleshwar",
        detailedText:
          "According to the Shiva Purana and Skanda Purana, the Mahakaleshwar Jyotirlinga in Ujjain emerged when demons threatened the city of Avantika (Ujjain); Lord Shiva manifested as a blazing pillar of light (Jyotirlinga) to destroy the asuras (demons), and at the plea of devotees and a pious boy, decided to stay permanently as Mahakaleshwar (Lord of Time) to protect the city, making it a powerful, south-facing deity. The legends highlight his role as the protector of Ujjain, a city of salvation, and explain the significance of rituals like the Bhasma Aarti, where ash from a cremation ground is offered to the deity. Key Legends from the Puranas:\nThe Demon Threat: A powerful demon named Dushan attacked Avantika, terrifying the gods and people.\nShiva's Emergence: The ground near Parvati's statue split open, and Lord Shiva emerged as a fiery, infinite pillar of light (Jyotirlinga).\nDestruction of Demons: With a single roar, Mahakaal destroyed the demons, saving the city.\nPromise to Stay: Pleased with the devotion of the people, especially a young devotee named Brahmapati, Lord Shiva promised to reside in Ujjain as Mahakaleshwar (Lord of Time) to safeguard it forever.",
        spiritualMeaning: "Victory over death and time",
        order: 3,
      },
      {
        type: "jyotirlinga",
        title: "Omkareshwar-Madhya Pradesh",
        slug: "omkareshwar",
        detailedText:
          "Omkareshwar is a Jyotirlinga because Lord Shiva manifested as a self-emanated, radiant light (Jyoti) in the form of the sacred sound \"Om\" (Omkara) to bless devotees, notably King Mandhata and the Vindhya Parvat, after they performed intense penance, appearing as a lingam of divine light on the Narmada River island, signifying ultimate spiritual power and presence. \nHere are the key reasons and legends:\nOrigin as a Jyoti-Light: A Jyotirlinga signifies Shiva as a fiery, infinite pillar of light, and Omkareshwar is one such manifestation, representing the cosmic sound of creation (Om).\nKing Mandhata's Penance: King Mandhata of the Ikshvaku dynasty performed severe penance to please Shiva, who appeared as a Jyotirlinga, making the island sacred and naming it after the king.\nVindhya Parvat's Plea: The Vindhya mountains (Vindhya Parvat) also worshipped Shiva to grow taller than Mount Meru, leading Shiva to manifest as the Jyotirlinga, splitting into Omkareshwar and Amareshwar/Mamleshwar (the other temple on the island).\nManifestation of the Divine Sound: Shiva manifested in his 'Omkaara' form, embodying the sacred syllable 'Om,' which is the sound of the universe, further solidifying its status as a Jyotirlinga.\nScriptural Significance: The event is detailed in ancient texts like the Skanda Purana and Shiva Purana, confirming its divine importance.",
        spiritualMeaning: "Cosmic vibration",
        order: 4,
      },
      {
        type: "jyotirlinga",
        title: "Kedarnath-Uttarakhand",
        slug: "kedarnath",
        detailedText:
          "Kedarnath is a Jyotirlinga because it's believed to be a self-manifested pillar of light (Jyoti-lingam) where Lord Shiva eternally resides, a sacred spot formed when the Pandavas sought atonement for sins after the Mahabharata war, with the unique triangular Shivlinga representing Shiva's hump, making it a paramount pilgrimage site where devotees seek spiritual liberation. History & Legends Pandava Legend: After the Mahabharata war, the Pandavas performed penance to cleanse their sins, seeking forgiveness from Lord Shiva, who initially hid as a bull. When Bhima tried to pull him out, Shiva's body appeared in parts at five locations, forming the Panch Kedar shrines, with Kedarnath being his hump.Nar-Narayana Legend: Twin sages Nar and Narayana, avatars of Vishnu, performed severe penance at Kedarnath, and Shiva appeared as a Jyotirlinga at their request to reside there eternally.Adi Shankaracharya: The temple was revived and re-established by Adi Shankaracharya in the 8th century, who also attained nirvana here.Temple Architecture: The ancient temple is built from large stone slabs and is located at a high altitude in the Himalayas, accessible only for about six months a year due to snow. \nWhy \"Jyotirlinga\"?\n\"Jyoti\" (Light) + \"Lingam\" (Symbol): The term means a radiant or luminous symbol of Shiva, representing his infinite, formless presence.\nSelf-Manifestation: These are places where Shiva manifested as a column of light (a \"stambha\") when Brahma and Vishnu argued over his supremacy, appearing as an endless pillar of light.",
        spiritualMeaning: "Grace and forgiveness",
        order: 5,
      },
      {
        type: "jyotirlinga",
        title: "Bhimashankar-Maharashtra",
        slug: "bhimashankar",
        detailedText:
          "The legend of Bhimashankar Jyotirlinga centers around the demon Tripurasura, who had become invincible and was terrorizing the three worlds. The gods, unable to defeat him, sought Lord Shiva's help. Shiva agreed to assist and created a massive bow from Mount Meru and arrows from the rays of the sun. Riding his divine chariot, he engaged in a fierce battle with Tripurasura. With a single arrow, Shiva destroyed the three cities of the demon, thus earning the name Tripurantaka (the destroyer of Tripura). Pleased with Shiva's valor, the gods requested him to reside on Earth as a Jyotirlinga to continue protecting the world from evil. Shiva agreed and manifested as Bhimashankar in the Sahyadri hills of Maharashtra. The temple is also associated with the legend of Bhima from the Mahabharata, who is said to have meditated here and received blessings from Lord Shiva. The name 'Bhimashankar' reflects both the might of Shiva (Bhim) and his form as a Jyotirlinga (Shankar), symbolizing strength and divine protection.",
        spiritualMeaning: "Protection from negativity",
        order: 6,
      },
      {
        type: "jyotirlinga",
        title: "Kashi Vishwanath-Kasi",
        slug: "kashi-vishwanath",
        detailedText:
          "Kashi Vishwanath is considered a Jyotirlinga because it is believed to be a self-manifested pillar of light (Jyoti-lingam) where Lord Shiva eternally resides, symbolizing his infinite and formless presence. The temple's significance is deeply rooted in Hindu mythology, particularly the legend of King Harishchandra, who was granted a boon by Lord Shiva to attain moksha (liberation) by visiting Kashi. The temple is also associated with the story of Sage Vishwamitra, who meditated here and received Shiva's blessings. Kashi Vishwanath is revered as the 'Lord of Kashi,' and it is believed that a visit to this sacred shrine can lead to liberation from the cycle of birth and death. The temple's location on the banks of the Ganges River further enhances its spiritual significance, making it one of the most important pilgrimage sites for devotees seeking enlightenment and divine grace.",
        spiritualMeaning: "Liberation",
        order: 7,
      },
      {
        type: "jyotirlinga",
        title: "Trimbakeshwar-Maharashtra",
        slug: "trimbakeshwar",
        detailedText:
          "The legend of Trimbakeshwar Jyotirlinga is deeply intertwined with the story of the demon Tripurasura, who had become invincible and was wreaking havoc across the three worlds. The gods, unable to defeat him, sought the help of Lord Shiva. In response, Shiva created a massive bow from Mount Meru and arrows from the rays of the sun. Riding his divine chariot, he engaged in a fierce battle with Tripurasura. With a single arrow, Shiva destroyed the three cities of the demon, earning the name Tripurantaka (the destroyer of Tripura). Pleased with Shiva's valor, the gods requested him to reside on Earth as a Jyotirlinga to continue protecting the world from evil. Shiva agreed and manifested as Trimbakeshwar in the Brahmagiri hills of Maharashtra. The temple is also associated with the origin of the sacred Godavari River, which is believed to have sprung from Shiva's matted hair at this location. The name 'Trimbakeshwar' reflects the three-eyed form of Shiva (Trimurti) and his role as a protector and destroyer of evil.",
        spiritualMeaning: "Purification",
        order: 8,
      },
      {
        type: "jyotirlinga",
        title: "Vaidyanath-Jharkhand",
        slug: "vaidyanath",
        detailedText:
          "The legend of Vaidyanath Jyotirlinga centers around the demon Ravana, who was a great devotee of Lord Shiva. According to the story, Ravana performed intense penance to please Shiva and sought a boon for immortality. Pleased with his devotion, Shiva granted him a powerful lingam, instructing him to carry it to his kingdom in Lanka. However, the gods, fearing Ravana's growing power, devised a plan to prevent him from taking the lingam to Lanka. As Ravana was carrying the lingam, Lord Vishnu disguised himself as a cowherd and requested Ravana to place the lingam on the ground temporarily. When Ravana set it down, the lingam became firmly rooted to the earth, and despite his efforts, he could not lift it again. Realizing that he could not take the lingam with him, Ravana worshipped it at that spot, which is now known as Vaidyanath (the Lord of Physicians), as Shiva is also revered as the divine healer. The temple is believed to have healing powers, and devotees visit it seeking relief from ailments and diseases.",
        spiritualMeaning: "Healing",
        order: 9,
      },
      {
        type: "jyotirlinga",
        title: "Nageshwar-Gujarat",
        slug: "nageshwar",
        detailedText:
          "The legend of Nageshwar Jyotirlinga revolves around a demon named Daruka, who terrorized the sages and devotees in the forest where they performed their penance. The sages, unable to bear the demon's atrocities, prayed to Lord Shiva for protection. In response to their prayers, Shiva manifested as a Jyotirlinga at that very spot to vanquish the demon. The name 'Nageshwar' translates to 'Lord of Serpents,' symbolizing Shiva's control over the deadly serpent, which is often associated with poison and danger. According to the legend, when Daruka attacked the sages, Shiva appeared in his fierce form and defeated the demon, restoring peace and sanctity to the area. The temple is also believed to have been established by Lord Krishna, who installed the lingam after defeating the serpent Kaliya in the Yamuna River. Devotees visit Nageshwar seeking protection from negative influences and spiritual enlightenment.",
        spiritualMeaning: "Fearlessness",
        order: 10,
      },
      {
        type: "jyotirlinga",
        title: "Rameshwaram-Tamil Nadu",
        slug: "rameshwaram",
        detailedText:
          "The legend of Rameshwaram Jyotirlinga is closely linked to the epic Ramayana. According to the story, after Lord Rama defeated the demon king Ravana and rescued his wife Sita, he wanted to atone for the sin of killing a Brahmin (Ravana, who was a Brahmin by birth). To seek forgiveness, Rama decided to worship Lord Shiva. He instructed his devotee Hanuman to bring a lingam from the Himalayas for the worship. However, as Hanuman was delayed",
        spiritualMeaning: "Dharma and devotion",
        order: 11,
      },
      {
        type: "jyotirlinga",
        title: "Grishneshwar-Maharashtra",
        slug: "grishneshwar",
        detailedText:
          "The legend of Grishneshwar Jyotirlinga is associated with a devoted couple, Sudharm and Sudeha, who lived in the village of Verul (now known as Ellora) near Aurangabad. Sudharm was a staunch devotee of Lord Shiva, while his wife Sudeha was skeptical of his devotion. To test her husband's faith, Sudeha conspired to create a situation that would challenge his beliefs. She invited a group of thieves to their home, hoping that Sudharm would abandon his worship to protect their belongings. However, Sudharm remained steadfast in his devotion, continuing his prayers to Lord Shiva despite the danger. Impressed by his unwavering faith, Lord Shiva appeared before Sudharm and granted him a boon. Sudharm requested that Shiva manifest as a Jyotirlinga at that spot so that devotees could worship him there. Pleased with the request, Shiva manifested as Grishneshwar Jyotirlinga, symbolizing the power of true devotion and faith. The temple is also associated with the nearby Ellora Caves, which are renowned for their rock-cut architecture and spiritual significance.",
        spiritualMeaning: "Compassion",
        order: 12,
      },
    ]);

    console.log("✅ Jyotirlingas Seeded");
    process.exit(0);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

seedJyotirlingas();
