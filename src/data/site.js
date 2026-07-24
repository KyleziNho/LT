// Additional site content beyond the artwork catalogue.
// Sourced from Lisa Teo's biography, credentials, and testimonials.

export const pathways = [
  {
    id: "collect",
    index: "01",
    title: "Collect",
    subtitle: "Original Works",
    blurb:
      "Original oil and acrylic paintings — paddy fields, coral reefs, and meditations on transformation. Each piece ships worldwide.",
    to: "/works",
    cta: "Browse the collection",
    accent: "violet",
    image: "/images/artwork/awakening/03-Fullness-Of-Life.jpg",
  },
  {
    id: "commission",
    index: "02",
    title: "Commission",
    subtitle: "Made to Order",
    blurb:
      "A painting made for your space and story — portraits, landscapes, and feng-shui compositions, completed in two to four weeks.",
    to: "/commissions",
    cta: "Start a commission",
    accent: "rose",
    image: "/images/artwork/made_to_order/01-Golden-Horse.jpg",
  },
  {
    id: "therapy",
    index: "03",
    title: "Art Therapy",
    subtitle: "For Teams & Individuals",
    blurb:
      "Guided Drawing sessions for corporate wellness and personal healing. HRD Corp certified, trusted by Coca-Cola and AXA.",
    to: "/art-therapy",
    cta: "Bring calm to your team",
    accent: "aqua",
    image: "/images/artist/Lisa-Teo-Session.jpg",
  },
];

// real corporate art-wellness clients (lisateoart.com/corporate-art-wellness)
export const clients = ["AXA", "Coca-Cola", "Ogilvy", "Marsh", "Sunway University", "Taylor's University", "SEGi College", "BE International"];

export const stats = [
  { value: "200+", label: "Guided Drawing sessions" },
  { value: "150+", label: "Paintings collected" },
  { value: "3", label: "Continents collected" },
  { value: "2020", label: "Full-time since" },
];

// ART THERAPY — her largest revenue stream (corporate wellness)
export const therapy = {
  eyebrow: "Guided Drawing Art Therapy",
  // headline + intro copy taken verbatim from lisateoart.com/art-therapy
  headline: "Take a moment from your daily stress to reconnect with your inner balance and peace.",
  intro:
    "A guided practice for individuals and corporate teams, especially in high-stress environments.",
  introMore:
    "Participants identify and release the anxiety and tension they carry, and leave ready to resume their work with refreshed vigour.",
  // the important distinction the live site leads with
  distinction:
    "This session is therapeutic in nature, not a recreational art class or casual team-building activity.",
  // words participants use to describe how they leave a session
  outcomes: ["Calm", "Joyful", "Positive", "Grounded"],
  // "What is Guided Drawing?" — the four components, verbatim from lisateoart.com
  method: [
    {
      step: "Sensory-based art therapy",
      text: "Draw with eyes closed using both hands, in a quiet environment, to reduce visual and audio distractions. Track your inner thoughts, emotions and body sensations more effectively.",
      img: "/images/therapy/guided-1-sensory.jpg",
      alt: "Participants drawing with their eyes closed at a quiet table",
    },
    {
      step: "Emotional release and clarity",
      text: "Alternate between breathing, drawing and reflection. Use drawing and body movements to release negative emotions and reduce mental clutter.",
      img: "/images/therapy/guided-2-release.jpg",
      alt: "Hands drawing loose colour across large-format paper",
    },
    {
      step: "Regulate your nervous system",
      text: "Draw in rhythmic repetition to regulate your nervous system and stimulate increasingly satisfying and positive sensory feedback.",
      img: "/images/therapy/guided-3-regulate.jpg",
      alt: "Hands sweeping over rhythmic, repeated crayon marks",
    },
    {
      step: "Recalibrate your brain",
      text: "This sensorimotor feedback loop encourages the development of new neurological pathways that allow you to rewrite your biography towards a more authentic, alive sense of self.",
      img: "/images/therapy/guided-4-recalibrate.jpg",
      alt: "Two participants sharing a moment of lightness mid-session",
    },
  ],
  // "Who is this for?" — verbatim target audience from the live site
  audiences: [
    "Corporate teams seeking meaningful wellness programs",
    "Companies with HRDC training budgets",
    "Companies looking for alternatives to conventional team-building and leadership workshops",
    "Individuals seeking emotional release and grounding",
  ],
  // "Session Details" — verbatim from the live site
  session: [
    { label: "Duration", value: "2 hours per session" },
    { label: "Group size", value: "Up to 25 participants per session" },
    { label: "Frequency", value: "Multiple sessions can be conducted within a day" },
    { label: "Materials", value: "All art materials, including crayons, finger paints and large-format paper, are provided" },
    { label: "You provide", value: "A venue such as a meeting room, with tables and chairs for participants" },
  ],
  // tiered corporate pricing, verbatim from lisateoart.com
  pricing: {
    tiers: [
      { range: "20 to 80 participants", price: "130" },
      { range: "81 to 100 participants", price: "120" },
      { range: "100 or more", price: "100" },
    ],
    unit: "MYR / pax",
    custom:
      "For half or whole day workshops, HRDC-claimable programs, or other customised sessions, please get in touch.",
  },
  // genuine, non-overlapping credentials — HRD lives once, in its own seal note;
  // the client roster lives once, in the logo strip. No line repeats either.
  credentials: [
    "Certified in Guided Drawing by the Institute for Sensorimotor Art Therapy, Australia",
    "A sensory-based method that pairs breathing, drawing and reflection to regulate the nervous system",
    "Hundreds of sessions held for teams and individuals since turning to this practice full-time",
  ],
  testimonials: [
    {
      quote:
        "I felt a little stressed and pressured before the session, but it felt genuinely therapeutic while it happened, and I left with a childlike joy.",
      name: "Natasha S.",
    },
    {
      quote:
        "Lisa is experienced and patient in the way she guides you through the art. We were so well held from the first mark to the last.",
      name: "Elynn K.",
    },
    {
      quote:
        "Before the session I felt gloomy. During it I felt excited. Afterwards I felt genuinely happy.",
      name: "Lufti M.",
    },
  ],
};

// COMMISSIONS — revenue stream #2
export const commissionProcess = [
  {
    step: "01",
    title: "Share your vision",
    text: "Send a note describing the painting you imagine — the subject, the space it will live in, any reference photos. We meet in person or online.",
  },
  {
    step: "02",
    title: "Design & quote",
    text: "Together we settle on subject, size, and meaning. Pricing follows complexity and dimensions. A deposit reserves your place in the studio.",
  },
  {
    step: "03",
    title: "Watch it grow",
    text: "Over two to four weeks the piece takes shape. You receive two to three progress photos and shape the work as it evolves.",
  },
  {
    step: "04",
    title: "Delivered to your door",
    text: "Framing and installation for Klang Valley clients; secure rolled shipping via FedEx or DHL worldwide, fully insured against transit damage.",
  },
];

export const commissionFaqs = [
  {
    q: "How do I start a custom order?",
    a: "Email a description of the painting you'd like and any relevant photos. We'll meet — in person or online — to discuss purpose, size, and timeline before I prepare a quote.",
  },
  {
    q: "How long does a commission take?",
    a: "Around two to four weeks, depending on the studio schedule and the complexity of the piece. You'll receive two to three progress updates along the way.",
  },
  {
    q: "Do you ship internationally?",
    a: "Yes. Paintings travel rolled in a hard, secure tube via trusted couriers such as FedEx or DHL. Should anything be damaged in transit, I provide a full refund and file the claim.",
  },
  {
    q: "How is pricing decided?",
    a: "By subject complexity and dimensions. Once we've agreed on the concept and size, I'll share a clear quote before any work begins.",
  },
];

// verified from the testimonial pages on lisateoart.com
export const testimonials = [
  {
    quote:
      "She understood our needs clearly — the colours, and even matched it to the room my uncle planned to hang the painting in.",
    name: "Wuan Xin",
    detail: "Commission · 2020",
  },
  {
    quote:
      "Lisa is full of energy and such a friendly person. She took her time to understand what we wanted. Her artwork hangs grandly now and really changed the whole atmosphere of our home. Thank you, Lisa!",
    name: "Michelle Chuah",
    detail: "Penang · 2019",
  },
  {
    quote:
      "Lisa has really captured me in this painting — a playful, youthful grandma swinging in the galaxy of imagination.",
    name: "Cecilia Lee",
    detail: "Commission · 2019",
  },
  {
    quote:
      "Lisa is such a wonderful artist. It was a truly wonderful and satisfying experience throughout the journey.",
    name: "Wendy Yong",
    detail: "Commission · 2019",
  },
  {
    quote:
      "We commissioned a charcoal Avatar mountain in April 2020. Through every step — the consultation, the progress updates, the delivery and installation — Lisa was a true professional.",
    name: "Elaine & EJ Kuan",
    detail: "Commission · 2020",
  },
  {
    quote:
      "We met Lisa where our sons trained football, visited her exhibition, and commissioned cherry blossoms and birds for our holiday home. We fully intend to commission more.",
    name: "Junie & Borjan",
    detail: "Zagreb, Croatia · 2018",
  },
];

// verified from lisateoart.com/exhibitions
export const exhibitions = [
  { year: "2025", text: "Malaysiana Big HeArts 2.0 — KL City Gallery, Kuala Lumpur" },
  { year: "2025", text: "Colours of Creativity — World Women's Economic & Business Summit, KL" },
  { year: "2024", text: "Walt's Waltz Mental Health Moonshot — Greenville Center for Creative Arts, South Carolina" },
  { year: "2024", text: "Linked INNNY · Women of the World — On The Fringe, New York" },
  { year: "2024", text: "Visionary Journeys — University Malaya Art Gallery, Kuala Lumpur" },
  { year: "2023", text: "Awakening — solo exhibition, Gallery 1819, Singapore" },
  { year: "2021", text: "Reflection — solo exhibition, Gallery 1819, Singapore" },
  { year: "2019", text: "Inspire III — The Ledge, Petaling Jaya" },
];

/* ── real artist statement (lisateoart.com) ───────────────────────────── */
// verbatim from lisateoart.com/artiststatement
export const artistStatement = {
  eyebrow: "Artist statement",
  heading: "Transforming inner landscapes through art.",
  quote: "My art is to be felt, not just seen — each series reflecting a different aspect of our human experience.",
  body: "Each painting is a map of the inner landscape, charted through the external terrains of Malaysia — paddy fields, coral, and mountains held as meditative tools for peace, healing, and the human spirit.",
  dream: "I offer painting as a counterbalance to a world obsessed with material metrics: a site for restoration, and a moment of stillness.",
};

/* ── a day in her life (Women Who Win feature) ────────────────────────── */
export const dayInLife = [
  { time: "05:00", title: "Eighty sun salutations", text: "The day opens on the mat — breath and movement long before the first brushstroke." },
  { time: "06:30", title: "Meditation & a walk", text: "Stillness, then a slow morning walk with Chewie while the studio is still asleep." },
  { time: "10:00", title: "At the easel", text: "The core hours, ten to half-twelve, when the light is even and the mind is quiet." },
  { time: "Evening", title: "Filling the well", text: "Diving, hiking, travel, family — the source she paints from is replenished away from the canvas." },
];

/* ── Body · Mind · Spirit — the three bodies of work (lisateoart.com) ── */
export const pillars = [
  {
    key: "Body",
    series: "Paddy Fields",
    text: "The cycle of life — new beginnings, growth, expanse, abundance, and harvesting the fruits of our labour.",
    accent: "aqua",
    image: "/images/artwork/paddy_series_1/01-Yellow-Fields-I.jpg",
    to: "/series/paddy-series-1",
  },
  {
    key: "Mind",
    series: "Coral & the Underwater World",
    text: "The fluidity of our thoughts and emotions, reflections of the subconscious mind, and the discovery of untapped human potential.",
    accent: "rose",
    image: "/images/artwork/awakening/03-Fullness-Of-Life.jpg",
    to: "/series/awakening",
  },
  {
    key: "Spirit",
    series: "Mountains",
    text: "Strength, stability, and resilience — overcoming challenges, and the spirit's transcendence.",
    accent: "violet",
    image: "/images/artwork/mountains/04-Green-Mountains-With-Mist-And-Waterfalls.jpg",
    to: "/series/mountains",
  },
];

/* ── press & features (verified links) ────────────────────────────────── */
export const press = [
  { name: "Women Who Win", note: "From Lawyer to Artist — a day in the life", href: "https://www.womenwhowin100.com/blog/lisa-teo-kuala-lampur-artist-law-to-art-gallery-1819-tips" },
  { name: "Spill The Tea", note: "On law, restaurants & finding art — the podcast", href: "https://www.lisateoart.com/blog/special-feature-spill-the-tea-podcast-feat-lisa-teo-art" },
  { name: "Gallery 1819", note: "Represented artist · Singapore", href: "https://gallery1819.com/artist/lisa-teo-cheng-yen/" },
  { name: "Asian Art Association", note: "Master profile · Singapore", href: "https://en.artassociation.asia/master/lisateochengyen/" },
  { name: "WITGRITFIT", note: "“What if people don’t like your art?”", href: "https://witgritfit.com/articles/10/12/explore-careers-with-witgritfit-featuring-lisa-teo-what-if-people-dont-like-your-art/2022/" },
];

/* ── journal / blog — full posts scraped from lisateoart.com/blog ─────── */
const BLOG_BASE = "https://www.lisateoart.com/blog/";
export const blog = [
  {
    slug: "art-wellness-workshop",
    title: "Art Wellness Workshop",
    date: "Dec 2025", tag: "Art therapy",
    cover: "/images/journal/art-wellness.webp",
    excerpt: "A third year of corporate art-wellness \u2014 this time for 100 employees at BE International's Bukit Jalil headquarters.",
    body: [
      "As 2025 draws to a close, I feel very grateful for all the support and opportunities granted to me this year. One person I'm especially grateful to is Lisa Leong, who offered me a third opportunity to conduct art-wellness workshops for corporate employees \u2014 this time for 100 BE International employees.",
      "BE (Beyond Eternity) is a direct-marketing company founded in Malaysia that offers wellness products. Their vision reaches beyond business: \u201cWe strive to create wellness in every way, for everyone \u2014 physical, mental, spiritual, economic, financial, familial and social. For everyone means our doors are open to any individual, regardless of race, colour, creed, background or belief.\u201d",
      "Having met 100 of their employees, seen how they interacted, and heard their feedback about BE, I think the founders and management are doing a wonderful job creating a positive work environment and good relationships amongst their people.",
      "The workshops were one of the monthly activities BE offers to enhance their employees' well-being. It was a great experience working with such a fun, vibrant group at their Bukit Jalil headquarters. I wish BE and all its employees continued success in the years to come.",
    ],
    source: BLOG_BASE + "art-wellness-workshop",
  },
  {
    slug: "paddy-fields",
    title: "Why I paint the paddy fields of Malaysia",
    date: "Oct 2021", tag: "The work",
    cover: "/images/journal/paddy-fields.webp",
    excerpt: "The fields are a metaphor for the cycle of life and our life journey \u2014 order, patience, and the quiet reward of the harvest.",
    body: [
      "The fields are a metaphor for the cycle of life and our life journey. I have learnt so much during my visits \u2014 the impermanence of life; change and new chapters; weathering storms and challenges; life's unpredictability; patience and persistence; harvesting the fruits of our labour; growth and development; and non-attachment, non-resistance and non-judgment.",
      "Each time I visit, the view has changed \u2014 I see the different stages of the paddy plantation. But it is always serene, always expansive, always inspiring.",
      "Can't wait to visit again. Does nature inspire you too?",
    ],
    source: BLOG_BASE + "why-do-i-have-a-special-interest-in-painting-the-paddy-fields-of-malaysia",
  },
  {
    slug: "the-gift",
    title: "The story behind \u201cThe Gift\u201d",
    date: "Oct 2021", tag: "The work",
    cover: "/images/journal/the-gift.webp",
    excerpt: "A meditation on transformation, time, and the courage it takes to grasp the present moment.",
    body: [
      "Everything that is transformed inside can be observed outside. Time is an eternal moment. Just as a single drop of water holds the heart of the past, a single moment holds the heart of all time \u2014 the past and the future. Those who grasp the moment grasp the wholeness of time and its journey.",
      "Remember, life is the greatest gift we're given. It is open to infinite possibilities. There's only one thing for you to do: surrender. Just surrender to it. Let life flow, and flow with it. Let yourself live.",
      "You connect with another person either out of love or fear. Let it be love. Let it be infinite love. Connect out of love and the universe will surround and protect you \u2014 not only in times of joy, but also in darkness, in grief or danger. Don't run away from any of it. Don't be afraid to laugh, to cry. Embrace it all.",
      "Don't try to be anyone else. Find out who you are and spread your wings to life. As you spread your wings, your soul will appear. That is how you become one with yourself and the world, united with the universe and everything in it.",
      "Never stop questioning. Never get tired of asking yourself the same question, over and over, for the rest of your life: who am I?",
    ],
    gallery: ["/images/journal/the-gift-1.webp", "/images/journal/the-gift-2.webp"],
    source: BLOG_BASE + "the-story-behind-the-gift-painting-lisa-teo-art",
  },
  {
    slug: "spill-the-tea",
    title: "Spill The Tea \u2014 the podcast",
    date: "Oct 2021", tag: "Feature",
    cover: "/images/journal/spill-the-tea.webp",
    excerpt: "How my stints as a lawyer, a restaurateur, and a conference producer shaped me as an artist.",
    body: [
      "It was an honour speaking to Biswarup Bhattacharjee and Keisya Prasetyawan on the Spill The Tea podcast, a show about unconventional people. We talked about how my stints as a lawyer, a restaurateur, and a conference producer shaped me as an artist.",
      "A few of the things we got into: how a career in art isn't always encouraged in many families; how the childhood experiences our parents provide influence what we do in life; how every piece I make tells a story, whether my own creation or a made-to-order work; whether male artists get more opportunities than their female peers; and how a mind stretched by new experiences can never go back to its old dimensions.",
      "You can find the full conversation on Spotify, Apple Podcasts, and Google Podcasts.",
    ],
    source: BLOG_BASE + "special-feature-spill-the-tea-podcast-feat-lisa-teo-art",
  },
  {
    slug: "women-who-win",
    title: "Featured by Women Who Win",
    date: "Nov 2021", tag: "Feature",
    cover: "/images/journal/women-who-win-portrait.webp",
    excerpt: "My story, shared to inspire fellow artists and anyone contemplating a new journey of their own.",
    body: [
      "Thank you, Women Who Win, for featuring my story on your platforms. I hope my sharing gives inspiration and insight to readers and fellow artists \u2014 and benefits anyone who wishes to embark on a new journey of their own.",
    ],
    source: BLOG_BASE + "thank-you-a-hrefhttpswwwlinkedincomcompanywomen-who-win-100women-who-wina-for-featuring-my-story-on-your-platforms",
  },
  {
    slug: "haiku",
    title: "A haiku with Dr. Frank Clark",
    date: "Oct 2021", tag: "Art therapy",
    cover: "/images/journal/haiku.webp",
    excerpt: "A collaboration for Mental Health Month, pairing verse with painting to celebrate art's therapeutic power.",
    body: [
      "\u201cWater nourishes / Hate scorches rooted friendships / Hope is life's beacon.\u201d \u2014 a haiku by Frank Clark, MD, FAPA.",
      "October is Mental Health Month. I'm an advocate of art therapy and the important role it plays in improving one's mental health. I was honoured to collaborate with esteemed psychiatrist Dr Frank Clark, creating this piece for his beautiful haiku \u2014 and grateful to Psychiatric Times for publishing our collaboration.",
      "I used soft pastel sticks to reflect water nourishing our hearts and lives; flames of hate that threaten relationships and love; and an infinity symbol \u2014 because at the heart of it all, love prevails. There is always hope. Have faith.",
      "How are you looking after your mental health?",
    ],
    source: BLOG_BASE + "haiku-bynbspa-hrefhttpswwwlinkedincominacoaaave13ibn0vo1lvvtw49dznqognzwxd-u3gfrank-clark-md-fapaa-feat-lisa-teo-art",
  },
  {
    slug: "art-jamming",
    title: "Art jamming with me",
    date: "Nov 2021", tag: "Studio",
    cover: "/images/journal/art-jamming.webp",
    excerpt: "Art lessons that encourage you to explore your Self, express your heart, and use art for discovery and healing.",
    body: [
      "I conduct art lessons where I encourage participants to explore their Self and express their hearts. I hope to inspire others to find joy in art \u2014 and to use art for discovery and healing.",
    ],
    source: BLOG_BASE + "art-jamming-with-me",
  },
  {
    slug: "supporting-local-artists",
    title: "Supporting local artists",
    date: "Oct 2021", tag: "Studio",
    cover: "/images/journal/supporting-local-artists.webp",
    excerpt: "Three travel-inspired paintings \u2014 a Balinese dancer, the first bend of the Yangtze, and a lotus pond at sunset.",
    body: [
      "Art serves communities by providing joy, interaction and inspiration. It reaches across space and time, allowing people from different cultures and eras to communicate through the images and stories they tell. Through art, we experience what the artist sees, feels, and wants to share with the world.",
      "In this exhibition, we artists tell our stories and life experiences. I share three paintings that speak of my love for travelling: a graceful Balinese dancer, and how their dance came about; the first bend of the mighty Yangtze River in China, which has served millions through the ages; and a lotus pond in shimmering pointillist sunset light.",
      "Do check out the exhibition and lend your support as we continue to serve the community. Which artist tells your favourite story?",
    ],
    gallery: ["/images/journal/supporting-1.webp"],
    source: BLOG_BASE + "supporting-local-artists-lisa-teo-art",
  },
];

export const voiceLines = [
  "Many people think all artists do is paint. The reality is that artists are entrepreneurs like any other.",
  "I pursued Law as they wished — eventually I had the opportunity to resume my passion for art.",
];

export const journey = [
  "I trained as a lawyer, then stepped away over a decade ago — driven by a conviction in art's power to transform. Today I keep a dual practice: evocative painting on one hand, therapeutic Guided Drawing on the other.",
  "My work explores the dialogue between inner consciousness and the natural world — the paddy fields of Sekinchan, the coral reefs I've dived, the mountains I've climbed. More than 150 paintings now hang with collectors and corporations across three continents.",
  "As a certified Guided Drawing art therapist, I help people access what words often can't — reducing anxiety, finding emotional clarity, and renewed confidence, one breath and one line at a time.",
];

export const interests = ["Meditation", "Yoga", "Diving", "Hiking", "Energy healing", "Travelling", "Family & Chewie"];
