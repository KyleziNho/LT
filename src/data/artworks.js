// Artwork catalogue.
//
// Every title, year, medium, dimension, price, availability and description in
// this file is taken verbatim from lisateoart.com (the painting pages under
// /paintings/p/*, the series pages /corals, /paddyfields, /mountains, and the
// /commissions page). Where Lisa publishes no description for a work, the
// `story` field is simply absent — nothing here is written on her behalf.

export const artistInfo = {
  name: "Lisa Teo",
  tagline: "Fine Art and Art Therapy",
  location: "Kuala Lumpur, Malaysia",
  email: "lisateo@gmail.com",
  phone: "(60) 12 3086 220",
  // her own author bio, as it appears on lisateoart.com
  bio: `I am a lawyer-turned-artist based in Kuala Lumpur, Malaysia. My speciality is oil paintings of paddy fields. I merge Western techniques & Feng Shui elements. I create commissioned art, tailored to client's needs. I also teach art & give talks on art.`,
  social: {
    instagram: "https://www.instagram.com/lisateoart",
    facebook: "https://www.facebook.com/lisateoart",
    linkedin: "https://www.linkedin.com/in/lisateoart/",
    youtube: "https://www.youtube.com/c/LisaTeoArt"
  }
};

// Series narratives are Lisa's own, verbatim from lisateoart.com:
// /paddyfields (Paddy Series I & II), /corals (Awakening), /mountains,
// /commissions. `subtitle` uses her Body / Mind / Spirit framing from the
// lisateoart.com home page.
export const series = [
  {
    id: "paddy-series-2",
    title: "Paddy Series II",
    subtitle: "Body",
    year: "2021-2024",
    narrative: [
      "My fascination with the paddy fields of Sekinchan began in 2017, following an en plein air painting trip with a group of fellow artists. I was immediately struck by the vastness of the landscape—the expansive fields stretching endlessly toward the horizon, articulated by precise, orderly grids. Immersed in this environment, I experienced a profound sense of space and freedom, alongside a quiet reflection on humanity's relationship with nature: our desire to impose order while remaining deeply dependent on the nourishment of the earth.",
      "As I later learned more about the cycles of paddy cultivation and harvest, the landscape revealed itself as a powerful metaphor for life. The recurring rhythms of labor, endurance, harvest, and renewal mirror the chapters of our own existence, reminding us to embrace change with grace—even when outcomes differ from our expectations. Beyond their poetic resonance, the paddy fields stand as enduring symbols of Asia's rice bowl, representing abundance, sustenance, and prosperity.",
      "In 2017, I presented my first series inspired by the Sekinchan paddy fields in Kuala Lumpur. This exploration continued in 2021 with a second series created for my solo exhibition in Singapore. To this day, the paddy fields remain a source of joy, contemplation, and ongoing inspiration in my artistic practice."
    ],
    coverImage: "/images/artwork/paddy_series_2/01-Blissful.jpg",
    color: "#4a7c59"
  },
  {
    id: "awakening",
    title: "Awakening",
    subtitle: "Mind",
    year: "2023-2025",
    narrative: [
      "When you see my coral paintings, think: “Untapped human potential.” Science tells us we only use a fraction of our mind — just 10% of our conscious awareness. The remaining 90% lies in the subconscious and unconscious realms, full of mystery and limitless possibility. As a scuba diver, I am captivated by the ocean — especially the hidden worlds beneath the surface. Vast stretches of the sea remain unexplored, holding secrets we can only imagine. Who knows what wonders — or even cures — lie undiscovered in its depths?",
      "In my coral paintings, the ocean becomes a metaphor for the mind. The rich, intricate marine life represents the subconscious — beautiful, wild, and largely untapped. Just as technology allows us to dive deeper into the sea, practices like meditation, art, and self-inquiry help us explore the inner landscapes of the mind.",
      "My work as an art therapist, my yoga and meditation practice — all stem from this same curiosity: How can we access more of our true potential? When we look at the lives of great thinkers, artists, and inventors — Beethoven, Picasso, Steve Jobs, Nobel Prize-winning scientists — we see that their brilliance came from tapping into something deeper. Something beyond the surface.",
      "My coral series is both a celebration of marine beauty and a visual invitation: to dive inward, to explore fearlessly, and to expand beyond the limits we place on ourselves. Just as divers must conquer their fear of the unknown to discover underwater treasures, I hope my art inspires you to dive deeper into your own potential — and find the brilliance already waiting there."
    ],
    coverImage: "/images/artwork/awakening/01-Source.jpg",
    color: "#2d5a7b"
  },
  {
    id: "paddy-series-1",
    title: "Paddy Series I",
    subtitle: "Body",
    year: "2017",
    narrative: [
      "My fascination with the paddy fields of Sekinchan began in 2017, following an en plein air painting trip with a group of fellow artists. I was immediately struck by the vastness of the landscape—the expansive fields stretching endlessly toward the horizon, articulated by precise, orderly grids. Immersed in this environment, I experienced a profound sense of space and freedom, alongside a quiet reflection on humanity's relationship with nature: our desire to impose order while remaining deeply dependent on the nourishment of the earth.",
      "As I later learned more about the cycles of paddy cultivation and harvest, the landscape revealed itself as a powerful metaphor for life. The recurring rhythms of labor, endurance, harvest, and renewal mirror the chapters of our own existence, reminding us to embrace change with grace—even when outcomes differ from our expectations. Beyond their poetic resonance, the paddy fields stand as enduring symbols of Asia's rice bowl, representing abundance, sustenance, and prosperity.",
      "In 2017, I presented my first series inspired by the Sekinchan paddy fields in Kuala Lumpur. This exploration continued in 2021 with a second series created for my solo exhibition in Singapore. To this day, the paddy fields remain a source of joy, contemplation, and ongoing inspiration in my artistic practice."
    ],
    coverImage: "/images/artwork/paddy_series_1/01-Yellow-Fields-I.jpg",
    color: "#c4a35a"
  },
  {
    id: "mountains",
    title: "Mountains",
    subtitle: "Spirit",
    year: "2020-2023",
    narrative: [
      "In 2017, a journey to the Zhangjiajie Mountains in China profoundly shaped my artistic direction. The towering sandstone pillars — rising over 1,000 meters from the forest floor and known globally through the Avatar I movie — felt both ancient and transcendent. Compelled by their scale and presence, I translated these forms into a series of three large charcoal works that explore monumentality, atmosphere, and quiet power.",
      "Mountains are central to my life and practice. As a hiker and climber, I am drawn to them as symbols of endurance, courage, and inner resolve. From the Annapurna Base Camp circuit in Nepal to the summit of Mount Agung in Bali, each ascent culminates in a moment above the clouds — an experience of awe, perspective, and spiritual clarity. These moments of elevation, where earth and sky seem to converge, continue to shape the emotional and conceptual foundation of my work. I have since created other mountain paintings in oil and acrylic."
    ],
    coverImage: "/images/artwork/mountains/04-Green-Mountains-With-Mist-And-Waterfalls.jpg",
    color: "#5f8577"
  },
  {
    id: "commissions",
    title: "Commissions",
    subtitle: "Made to order",
    year: "2017-2023",
    narrative: [
      "I accept commissions to create unique paintings for collectors. I work closely with them to understand their needs. Throughout the commission, I send picture updates of my progress. Changes can be made as necessary. Once the painting is finalised, I help to frame, deliver and install the paintings (for Klang Valley clients). For interstate and overseas clients, I use a reputable courier company to send the paintings, rolled up in a secured hard tube."
    ],
    coverImage: "/images/artwork/made_to_order/01-Golden-Horse.jpg",
    color: "#8b6914"
  }
];

export const artworks = {
  "paddy-series-2": [
    {
      id: 1,
      title: "Blissful",
      year: 2021,
      medium: "Oil",
      dimensions: "120cm x 80cm",
      status: "sold",
      image: "/images/artwork/paddy_series_2/01-Blissful.jpg",
      story: "Have you ever felt like you are in a dream - busy with work, family, business, children, hobbies - and never stopping to listen to your heart and figure out who you really are and what your life purpose is?"
    },
    {
      id: 2,
      title: "Inner Joy",
      year: 2021,
      medium: "Oil",
      dimensions: "120 x 80cm",
      status: "sold",
      image: "/images/artwork/paddy_series_2/02-Inner-Joy.jpg"
    },
    {
      id: 3,
      title: "Strength & Courage",
      year: 2021,
      medium: "Oil",
      dimensions: "100 x 150cm",
      status: "sold",
      image: "/images/artwork/paddy_series_2/03-Strength-And-Courage.jpg",
      story: "The self-discovery process is tumultuous. Some decisions we make may not be in favour with the people around us. It takes strength and courage to continue pursuing our dreams. Have faith that we will get the support we need if the path we seek is the right one for us."
    },
    {
      id: 4,
      title: "Flourish",
      year: 2021,
      medium: "Oil",
      dimensions: "80cm x 120cm",
      status: "sold",
      image: "/images/artwork/paddy_series_2/04-Flourish.jpg",
      story: "The cycle of life is such that when we are down for a long period, eventually the only way to go is up. Have faith that there is light at the end of the tunnel. We do eventually get to reap what we sow."
    },
    {
      id: 5,
      title: "Prosperity",
      year: 2021,
      medium: "Oil",
      dimensions: "80cm x 120cm",
      status: "sold",
      image: "/images/artwork/paddy_series_2/05-Prosperity.jpg"
    },
    {
      id: 6,
      title: "Dream Fields",
      year: 2021,
      medium: "Oil",
      dimensions: "100 x 150cm",
      status: "sold",
      image: "/images/artwork/paddy_series_2/06-Dream-Fields.jpg",
      story: "Dream the impossible, set out intentions right, do the necessary work, and gradually our dream fields will bloom."
    },
    {
      id: 7,
      title: "Purpose",
      year: 2021,
      medium: "Oil",
      dimensions: "100 x 150cm",
      status: "sold",
      image: "/images/artwork/paddy_series_2/07-Purpose.jpg",
      story: "Look within to understand our many layers. Ultimately, we are not our thoughts nor emotions. We are not our minds nor bodies. We are the changeless soul with a purpose in this life."
    },
    {
      id: 8,
      title: "Radiate",
      year: 2024,
      medium: "Oil",
      dimensions: "80 x 120cm",
      status: "sold",
      image: "/images/artwork/paddy_series_2/08-Radiate.jpg",
      story: "Radiate inner joy and light up the lives of those around us. Be the Light!"
    },
    {
      id: 9,
      title: "Journey",
      year: 2021,
      medium: "Oil",
      dimensions: "120 x 80cm",
      status: "sold",
      image: "/images/artwork/paddy_series_2/09-Journey.jpg",
      story: "The journey is just as important as the end goal. Our lives are made up of accumulated daily joyful moments. Remember to be in the present moment, appreciate all these daily joys and feel gratitude for all the good in our lives."
    },
    {
      id: 10,
      title: "Infinite",
      year: 2021,
      medium: "Oil",
      dimensions: "80 x 120cm",
      status: "sold",
      image: "/images/artwork/paddy_series_2/10-Infinite.jpg",
      story: "As Eckhart Tolle taught, the sky is our changeless soul, and the clouds are but the transient events in our lives. If we can stay focused living each present moment, without dwelling on our past nor worrying about our future, we can access the infinite possibilities of our Self and live our dreams."
    },
    {
      id: 11,
      title: "Manifest",
      year: 2024,
      medium: "Oil",
      dimensions: "120 x 80cm",
      status: "sold",
      image: "/images/artwork/paddy_series_2/11-Manifest.jpg",
      story: "We can never silence our hearts if we are not on our true path. An impactful storm occurs to kickstart the journey within. In the process of self-discovery, one gains the ability to manifest the necessary changes and a future that the heart seeks."
    },
    {
      id: 12,
      title: "Serenity",
      year: 2021,
      medium: "Oil",
      dimensions: "100 x 150cm",
      status: "sold",
      image: "/images/artwork/paddy_series_2/12-Serenity.jpg"
    },
    {
      id: 13,
      title: "Inner Peace",
      year: 2021,
      medium: "Oil",
      dimensions: "100 x 150cm",
      status: "sold",
      image: "/images/artwork/awakening/20-Inner-Peace.jpg",
      story: "Still the mind and we achieve inner peace."
    },
    {
      id: 14,
      title: "As Within, So Without",
      year: 2021,
      medium: "Oil",
      dimensions: "60cm x 92cm",
      status: "sold",
      image: "/images/artwork/awakening/21-As-Within-So-Without.jpg",
      story: "Like attracts like. I learnt that how we experience the external world is a reflection of our inner self. If we feel peace and abundance within, we experience the same with the events and people in our lives. If we feel anger and conflict within, we attract the same. Stay positive with a high vibrational frequency to attract positivity in our lives."
    },
    {
      id: 15,
      title: "Awareness",
      year: 2021,
      medium: "Oil",
      dimensions: "100cm x 150cm",
      status: "sold",
      image: "/images/artwork/awakening/22-Awareness.jpg",
      story: "Throughout our lives, we play different roles to meet the expectations of our parents, friends, teachers, employers, spouse, children and society. Many of us feel “I am not good enough” when we can’t meet all of these expectations. The sky (expectations) changes all the time but we want to be like the hut. To remain strong and be ourselves, untouched by the colours before us. We are whole and enough as we are. We don’t need to perform well to deserve love from others. We live life because we enjoy life, not because we need to fulfil every expectation."
    },
    {
      id: 16,
      title: "Clarity",
      year: 2021,
      medium: "Oil",
      dimensions: "100cm x 150cm",
      status: "sold",
      image: "/images/artwork/awakening/23-Clarity.jpg",
      story: "When we are trapped in our endless thoughts and emotions, we lack the ability to make discerning decisions. When we are able to control our minds and achieve inner peace, clarity emerges. With clarity, we make the right decisions that serve our life purpose and the people in our lives."
    },
    {
      id: 17,
      title: "Self Reflection",
      year: 2021,
      medium: "Oil",
      dimensions: "60cm x 92cm",
      status: "sold",
      image: "/images/artwork/awakening/24-Self-Reflection.jpg",
      story: "Sometimes, we need to withdraw from others, look within and quiet our minds in order to discern the whispers of our hearts. We can get too caught up doing so much for others that we don’t have time for ourselves. I learnt that there are times for input and output. Self-reflection and inner work are necessary in order for us to be effective in giving to others."
    }
  ],
  "paddy-series-1": [
    {
      id: 1,
      title: "Yellow Fields I",
      year: 2017,
      medium: "Oil",
      dimensions: "61 x 76cm",
      status: "sold",
      image: "/images/artwork/paddy_series_1/01-Yellow-Fields-I.jpg"
    },
    {
      id: 2,
      title: "New Beginnings",
      year: 2017,
      medium: "Oil",
      dimensions: "76 x 102cm",
      status: "sold",
      image: "/images/artwork/paddy_series_1/02-New-Beginnings.jpg"
    },
    {
      id: 3,
      title: "Dawn At The Paddy Fields",
      year: 2017,
      medium: "Oil",
      dimensions: "60 x 90cm",
      status: "sold",
      image: "/images/artwork/paddy_series_1/03-Dawn-At-The-Paddy-Fields.png"
    },
    {
      id: 4,
      title: "Yellow Fields II",
      year: 2017,
      medium: "Oil",
      dimensions: "61 x 76cm",
      status: "sold",
      image: "/images/artwork/paddy_series_1/04-Yellow-Fields-II.jpg"
    },
    {
      id: 5,
      title: "Banana Trees By The Paddy Fields",
      year: 2017,
      medium: "Oil",
      dimensions: "76 x 76cm",
      status: "sold",
      image: "/images/artwork/paddy_series_1/05-Banana-Trees-By-Paddy-Fields.png"
    },
    {
      id: 6,
      title: "Rice Factory",
      year: 2017,
      medium: "Oil",
      dimensions: "76 x 102cm",
      status: "sold",
      image: "/images/artwork/paddy_series_1/06-Rice-Factory.jpg"
    },
    {
      id: 7,
      title: "The Paddy Harvester",
      year: 2017,
      medium: "Oil",
      dimensions: "92 x 92cm",
      status: "sold",
      image: "/images/artwork/paddy_series_1/07-The-Paddy-Harvester.jpg"
    },
    {
      id: 8,
      title: "Sunrise Over Paddy",
      year: 2017,
      medium: "Oil",
      dimensions: "60 x 84cm",
      status: "sold",
      image: "/images/artwork/paddy_series_1/08-Sunrise-Over-Paddy.png"
    },
    {
      id: 9,
      title: "Paddy Workers I",
      year: 2017,
      medium: "Oil",
      dimensions: "61 x 84cm",
      status: "sold",
      image: "/images/artwork/paddy_series_1/09-Paddy-Workers-I.jpg"
    },
    {
      id: 10,
      title: "Paddy Impression I",
      year: 2017,
      medium: "Oil",
      dimensions: "76 x 102cm",
      status: "sold",
      image: "/images/artwork/paddy_series_1/10-Paddy-Impression-I.jpg"
    },
    {
      id: 11,
      title: "Double Harvest",
      year: 2017,
      medium: "Oil",
      dimensions: "30.5 x 92cm (2 canvases)",
      status: "sold",
      image: "/images/artwork/paddy_series_1/11-Double-Harvest.png"
    },
    {
      id: 12,
      title: "Paddy Impression II",
      year: 2017,
      medium: "Oil",
      dimensions: "102 x 76cm",
      status: "sold",
      image: "/images/artwork/paddy_series_1/12-Paddy-Impression-II.jpg"
    },
    {
      id: 13,
      title: "Paddy Grains",
      year: 2025,
      medium: "Oil",
      dimensions: "45cm x 45cm",
      price: "MYR2,400",
      status: "available",
      image: "/images/artwork/paddy_series_1/13-Paddy-Grains.jpg"
    },
    {
      id: 14,
      title: "Paddy Impression III",
      year: 2017,
      medium: "Oil",
      dimensions: "46 x 92cm",
      status: "sold",
      image: "/images/artwork/paddy_series_1/14-Paddy-Impression-III.jpg"
    }
  ],
  "awakening": [
    {
      id: 1,
      title: "Source",
      year: 2023,
      medium: "Acrylic",
      dimensions: "120cm x 80cm",
      status: "sold",
      image: "/images/artwork/awakening/01-Source.jpg"
    },
    {
      id: 2,
      title: "Inner Joy",
      year: 2023,
      medium: "Acrylic",
      dimensions: "90cm x 60cm",
      status: "sold",
      image: "/images/artwork/awakening/02-Inner-Joy.jpg",
      story: "Rediscover our inner child and inner joy."
    },
    {
      id: 3,
      title: "Fullness Of Life",
      year: 2023,
      medium: "Acrylic",
      dimensions: "107cm x 107cm",
      status: "sold",
      image: "/images/artwork/awakening/03-Fullness-Of-Life.jpg"
    },
    {
      id: 4,
      title: "Flow",
      year: 2023,
      medium: "Acrylic",
      dimensions: "60cm x 60cm",
      status: "sold",
      image: "/images/artwork/awakening/04-Flow.jpg",
      story: "Soothing whiter soft corals and green crinoids flowing gently in the blue ocean. Don’t resist. Just flow with the rhythm of Life."
    },
    {
      id: 5,
      title: "Red Coral I",
      year: 2023,
      medium: "Acrylic",
      dimensions: "90cm x 60cm",
      status: "sold",
      image: "/images/artwork/awakening/05-Red-Coral-I.jpg",
      story: "All the colours of the rainbow are included, to show our Inner Light."
    },
    {
      id: 6,
      title: "Euphoria I",
      year: 2023,
      medium: "Acrylic",
      dimensions: "60cm x 60cm",
      status: "sold",
      image: "/images/artwork/awakening/06-Euphoria-I.jpg",
      story: "Euphoria is a feeling or state of intense excitement and happiness. The Euphoria paintings depict an explosion of colourful corals that represent the joy of life. Live joyfully with great intensity."
    },
    {
      id: 7,
      title: "Euphoria II",
      year: 2023,
      medium: "Acrylic",
      dimensions: "60cm x 60cm",
      status: "sold",
      image: "/images/artwork/awakening/07-Euphoria-II.jpg",
      story: "Live joyfully with great intensity."
    },
    {
      id: 8,
      title: "Euphoria III",
      year: 2023,
      medium: "Acrylic",
      dimensions: "100cm x 150cm",
      status: "sold",
      image: "/images/artwork/awakening/08-Euphoria-III.jpg",
      story: "Intense excitement and happiness."
    },
    {
      id: 9,
      title: "Euphoria IV",
      year: 2023,
      medium: "Acrylic",
      dimensions: "120cm x 80cm",
      price: "MYR9,000",
      status: "available",
      image: "/images/artwork/awakening/09-Euphoria-IV.jpg",
      story: "An explosion of colourful corals that represent the joy of Life."
    },
    {
      id: 10,
      title: "Euphoria V",
      year: 2023,
      medium: "Acrylic",
      dimensions: "90cm x 60cm",
      status: "sold",
      image: "/images/artwork/awakening/10-Euphoria-V.jpg",
      story: "The joy of Life!"
    },
    {
      id: 11,
      title: "Gold Coral",
      year: 2023,
      medium: "Acrylic",
      dimensions: "90cm x 90cm",
      status: "sold",
      image: "/images/artwork/awakening/11-Gold-Coral.jpg",
      story: "Deep in the ocean where light does not penetrate, there are bright gold, yellow and white corals growing. When we delve deep within ourselves, we discover this wealth within us. Trust our inner guidance."
    },
    {
      id: 12,
      title: "Orange Coral",
      year: 2023,
      medium: "Acrylic",
      dimensions: "120cm x 80cm",
      status: "sold",
      image: "/images/artwork/awakening/12-Orange-Coral.jpg"
    },
    {
      id: 13,
      title: "Carnival",
      year: 2023,
      medium: "Acrylic",
      dimensions: "100cm x 150cm",
      status: "sold",
      image: "/images/artwork/awakening/13-Carnival.jpg",
      story: "Life is precious and to be celebrated! The corals in this painting resemble a parade in procession, with big vibrant flowers, little fish like confetti, and the audience waving their flags and balloons. This is the only painting in the Awakening series that includes a lionfish, which resembles a float in a carnival."
    },
    {
      id: 14,
      title: "Plate Corals",
      year: 2023,
      medium: "Acrylic",
      dimensions: "90cm x 60cm",
      status: "sold",
      image: "/images/artwork/awakening/14-Plate-Corals.jpg"
    },
    {
      id: 15,
      title: "Harmony",
      year: 2023,
      medium: "Acrylic",
      dimensions: "90cm x 60cm",
      status: "sold",
      image: "/images/artwork/awakening/15-Harmony.jpg",
      story: "Four groups of corals living in tandem and harmony. A reminder of peace and order when we work with each other."
    },
    {
      id: 16,
      title: "Vigour",
      year: 2023,
      medium: "Acrylic",
      dimensions: "60cm x 60cm",
      status: "sold",
      image: "/images/artwork/awakening/16-Vigour.jpg",
      story: "Live a robust active life, full of energy and vitality!"
    },
    {
      id: 17,
      title: "Fan and Brain Coral",
      year: 2023,
      medium: "Acrylic",
      dimensions: "120cm x 80cm",
      status: "sold",
      image: "/images/artwork/awakening/17-Fan-And-Brain-Coral.jpg"
    },
    {
      id: 18,
      title: "Orange Fan Coral",
      year: 2025,
      medium: "Acrylic",
      dimensions: "118cm x 80cm",
      price: "MYR9,000",
      status: "available",
      image: "/images/artwork/awakening/18-Orange-Fan-Coral.jpg"
    },
    {
      id: 19,
      title: "Lionfish",
      year: 2025,
      medium: "Acrylic",
      dimensions: "60cm x 90cm",
      price: "MYR6,000",
      status: "available",
      image: "/images/artwork/awakening/19-Lionfish.jpg"
    }
  ],
  "mountains": [
    {
      id: 1,
      title: "Avatar I",
      year: 2020,
      medium: "Charcoal on Canvas",
      dimensions: "185 x 102cm",
      status: "sold",
      image: "/images/artwork/mountains/01-Avatar-I.jpg"
    },
    {
      id: 2,
      title: "Avatar II",
      year: 2020,
      medium: "Charcoal on Canvas",
      dimensions: "185 x 102cm",
      status: "sold",
      image: "/images/artwork/mountains/02-Avatar-II.jpg"
    },
    {
      id: 3,
      title: "Avatar III",
      year: 2020,
      medium: "Charcoal on Canvas",
      dimensions: "127 x 152cm",
      status: "sold",
      image: "/images/artwork/mountains/03-Avatar-III.jpg"
    },
    {
      id: 4,
      title: "Green Mountains with Mist and Waterfalls",
      year: 2023,
      medium: "Mixed Media",
      dimensions: "122cm x 122cm",
      status: "sold",
      image: "/images/artwork/mountains/04-Green-Mountains-With-Mist-And-Waterfalls.jpg"
    },
    {
      id: 5,
      title: "Abstract Mountain",
      year: 2023,
      medium: "Acrylic with Gold Paint",
      dimensions: "150 x 80cm",
      status: "sold",
      image: "/images/artwork/mountains/05-Abstract-Mountain.jpg"
    },
    {
      id: 6,
      title: "Mountains with Morning Mist",
      year: 2020,
      medium: "Oil",
      dimensions: "244cm x 116cm",
      status: "sold",
      image: "/images/artwork/mountains/06-Mountains-With-Morning-Mist.jpg",
      story: "A painting of grand misty mountains and 88 birds flying by the rising sun. This painting is about grand visions and dreams, scaling great heights to achieve one’s dreams and being innovative and ahead in life and business."
    }
  ],
  "commissions": [
    {
      id: 1,
      title: "Golden Horse",
      year: 2023,
      medium: "Oil",
      dimensions: "100cm x 130cm",
      status: "commission",
      image: "/images/artwork/made_to_order/01-Golden-Horse.jpg",
      story: "I painted this horse for a vacation home in The OWO, London. The intention was to paint a magnificent, dignified and regal looking horse to match the architectural and historical landmark building on the royal site of Whitehall Palace, where their home is located. This painting is inspired by George Stubbs’ “Whistlejacket”."
    },
    {
      id: 2,
      title: "Wedding Portrait",
      year: 2020,
      medium: "Oil",
      dimensions: "51cm x 76cm",
      status: "commission",
      image: "/images/artwork/made_to_order/02-Wedding-Portrait.jfif",
      story: "I created this oil portrait by referring to a photo. For portraits, I strive to capture not only the likeness but also the essence and personality of the person. The first meeting to discuss a painting commission is important because this is when I have the opportunity to understand their background and personality."
    },
    {
      id: 3,
      title: "Paddy Harvester",
      year: 2018,
      medium: "Oil",
      dimensions: "76cm x 102cm",
      status: "commission",
      image: "/images/artwork/made_to_order/03-Paddy-Harvester.jfif",
      story: "This painting was created for a property developer’s office in Kuala Lumpur. The painting is about harvesting the fruits of one’s labour."
    },
    {
      id: 4,
      title: "Spring Dance",
      year: 2021,
      medium: "Mixed Media",
      dimensions: "130cm x 100cm",
      status: "commission",
      image: "/images/artwork/made_to_order/04-Spring-Dance.jfif",
      story: "I was given liberty to create a painting for the newly renovated home of a young couple. Upon meeting them online, I was inspired by their new love and happiness. This painting is of 3 red spring flowers dancing in the wind. I drew inspiration from Spring - new beginnings, vibrant sun energy, fresh spring grass & flowers. I incorporated wind and movement to symbolise Dance and the synergy between the young couple. The number 3 to represent Life and their future family unit."
    },
    {
      id: 5,
      title: "Love, Peace & Respect",
      year: 2020,
      medium: "Oil",
      dimensions: "46cm x 61cm",
      status: "commission",
      image: "/images/artwork/made_to_order/05-Love-Peace-Respect.jfif",
      story: "I was given a black and white photo of this couple and I created this oil portrait in colour. This painting was commissioned in loving memory of the buyer’s late parents."
    },
    {
      id: 6,
      title: "Lotus with Dollar Sign",
      year: 2017,
      medium: "Oil",
      dimensions: "185cm x 102cm",
      status: "commission",
      image: "/images/artwork/made_to_order/06-Lotus-With-Dollar-Sign.jfif",
      story: "This is a feng shui painting of a dollar sign hidden in a lotus scenery for a home. The flow of the lotus flowers in an S-shape and the middle stalk represent the $ dollar sign. The lotus buds gradually blooming into full bloom lotus flowers represent their family business growing from strength to strength over the years. The pair of koi fish represent my buyers and the pair of mandarin ducks represent their son and daughter-in-law following their footsteps in the family business. The pair of dragonflies represent their future grandchildren."
    },
    {
      id: 7,
      title: "Father and Sons",
      year: 2021,
      medium: "Oil",
      dimensions: "61cm x 61cm",
      status: "commission",
      image: "/images/artwork/made_to_order/07-Father-And-Sons.jpg",
      story: "This painting was commissioned as a surprise birthday gift for the buyer’s husband. I combined the images of the three figures using two different photos as reference and reoriented their positions to create a formal portrait."
    },
    {
      id: 8,
      title: "Gordon Gekko",
      year: 2020,
      medium: "Oil",
      dimensions: "130cm x 130cm",
      status: "commission",
      image: "/images/artwork/made_to_order/08-Gordon-Gekko.png",
      story: "A banker based in Hong Kong commissioned this large oil portrait of Gordon Gekko in the movie Wall Street. Once completed, I couriered it to him."
    },
    {
      id: 9,
      title: "Harvest",
      year: 2021,
      medium: "Oil",
      dimensions: "76cm x 102cm",
      status: "commission",
      image: "/images/artwork/made_to_order/09-Harvest.jfif",
      story: "This was commissioned for an office in Penang, Malaysia. I created a scenery of a rich field of yellow ready-to-harvest paddy to represent growth, vitality, abundance and prosperity for his business."
    },
    {
      id: 10,
      title: "Go With The Flow",
      year: 2023,
      medium: "Acrylic",
      dimensions: "60cm x 60cm",
      status: "commission",
      image: "/images/artwork/made_to_order/12-Go-With-The-Flow.jpg",
      story: "This painting was created for my client’s home in Singapore. The cool colours of the water contrast with the warm colours of the corals. The rough coral texture contrasts with the softness of the seaweed. This painting represents both the Yin and Yang elements in Chinese beliefs. This painting is about balance and harmony and the bringing of a smooth flow of light, energy and movement into the home."
    }
  ]
};

// Map a series id back to its meta record.
export const seriesById = Object.fromEntries(series.map((s) => [s.id, s]));

// Flat list of every artwork, tagged with its series id/title. Handy for the
// unified Works gallery and for featured selections.
export const allArtworks = Object.entries(artworks).flatMap(([seriesId, items]) =>
  items.map((art) => ({
    ...art,
    seriesId,
    seriesTitle: seriesById[seriesId]?.title ?? seriesId,
    // stable, url-safe unique key across series
    uid: `${seriesId}-${art.id}`,
  }))
);

export const availableArtworks = allArtworks.filter((a) => a.status === "available");

// filter chips for the Works page (housed in the expanding nav tier)
export const worksFilters = [
  { id: "all", label: "All works" },
  { id: "available", label: "Available" },
  ...series.map((s) => ({ id: s.id, label: s.title })),
];

// A hand-picked, visually strong set for the home page hero + featured band.
// exactly the works lisateoart.com still lists for sale
export const featuredUids = [
  "awakening-19", // Lionfish
  "awakening-18", // Orange Fan Coral
  "paddy-series-1-13", // Paddy Grains
  "awakening-9", // Euphoria IV
];

export const featuredArtworks = featuredUids
  .map((uid) => allArtworks.find((a) => a.uid === uid))
  .filter(Boolean);
