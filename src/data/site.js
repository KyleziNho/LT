// Site copy.
//
// EVERYTHING in this file is Lisa's own text, taken verbatim from
// lisateoart.com. Each block records the page it came from. Nothing here is
// written on her behalf: where her site has no wording for a slot, the slot
// either reuses one of her sentences from the same page or does not exist.
//
// Source pages: / (home), /about, /artiststatement, /art-therapy,
// /corporate-art-wellness, /commissions, /paintings, /exhibitions, /contact,
// /book-a-call, /featured-projects, /testimonials-*.

/* ── home page ────────────────────────────────────────────────────────── */
// lisateoart.com (home)
export const home = {
  headline: "Transforming Inner Landscapes Through Art",
  sub: "My art is to be felt, not just seen, with each series reflecting different aspects of our human experience",
  paintingsCta: "View My Paintings",
  therapyHeading: "A space to pause, release, reconnect and reset",
  therapyText:
    "Beyond the canvas, I am a Creative Wellness Consultant and Art Therapy Facilitator for corporates. I specialise in work burnout recovery, guided art-based emotional regulation, creative resilience at work, team cohesion and mental health. I am a HRDC accredited corporate trainer and I run HRDC-claimable programs.",
  therapyCta: "Learn More About Art Therapy",
  intro: [
    "I’m an artist and a certified art therapist based in Kuala Lumpur, Malaysia.",
    "My art explores our inner landscapes, as expressed using Malaysian external terrains such as paddy fields, oceans, and mountains. My art therapy sessions encourage participants to pause, connect, discover clarity and regain emotional balance.",
    "Each canvas and session is an invitation to rediscover inner peace and joy from within.",
  ],
  introCta: "More About Me",
  featuredProjectsTitle: "Featured Projects",
  quote: {
    text: "A painting by Lisa can remind you of who you are and what you represent.",
    name: "Cecilia Lee",
  },
  closing: "Have a query about my paintings or art therapy?",
  closingCta: "Contact Me",
};

/* ── the three ways into the work ─────────────────────────────────────── */
// blurbs verbatim: home (paintings + art therapy) and /commissions
export const pathways = [
  {
    id: "collect",
    index: "01",
    title: "Paintings",
    subtitle: "Original Works",
    blurb:
      "My art explores our inner landscapes, as expressed using Malaysian external terrains such as paddy fields, oceans, and mountains.",
    to: "/works",
    cta: "View My Paintings",
    accent: "violet",
    image: "/images/artwork/awakening/03-Fullness-Of-Life.jpg",
  },
  {
    id: "commission",
    index: "02",
    title: "Commissions",
    subtitle: "Made to Order",
    blurb:
      "I accept commissions to create unique paintings for collectors. I work closely with them to understand their needs.",
    to: "/commissions",
    cta: "Make An Enquiry",
    accent: "rose",
    image: "/images/artwork/made_to_order/01-Golden-Horse.jpg",
  },
  {
    id: "therapy",
    index: "03",
    title: "Art Therapy",
    subtitle: "For Teams & Individuals",
    blurb:
      "Beyond the canvas, I am a Creative Wellness Consultant and Art Therapy Facilitator for corporates. I specialise in work burnout recovery, guided art-based emotional regulation, creative resilience at work, team cohesion and mental health.",
    to: "/art-therapy",
    cta: "Learn More About Art Therapy",
    accent: "aqua",
    image: "/images/artist/Lisa-Teo-Session.jpg",
  },
];

/* ── corporate art wellness roster ────────────────────────────────────── */
// lisateoart.com/corporate-art-wellness — verbatim, including her spellings
export const corporateWellness = {
  heading: "Corporate Art Wellness Sessions",
  intro: [
    "Over the years, I’ve facilitated Guided Drawing and art wellness sessions for organisations seeking meaningful experiences for their teams.",
    "These sessions are not team-building activities, but intentional spaces for emotional release, grounding, and mental clarity.",
  ],
  rosterLabel: "Leading corporates that I’ve worked with over the years:",
  cta: "Interested in exploring whether this is suitable for your organisation?",
  ctaButton: "Book a Discovery Call",
};

export const corporateSessions = [
  { name: "BE International", year: "2025", people: "100 participants" },
  { name: "Sunway University", year: "2025", people: "25 participants" },
  { name: "Coca Cola", year: "2025", people: "75 participants" },
  { name: "Ogivly", year: "2025", people: "10 participants" },
  { name: "Marsh Insurance Brokers", year: "2024", people: "35 participants" },
  { name: "AXA", year: "2023", people: "35 participants" },
  { name: "Taylor’s University", year: "2023", people: "50 participants" },
  { name: "Segi University & Colleges", year: "2023", people: "25 participants" },
  { name: "Life Festival", year: "2023", people: "30 participants" },
  { name: "Life Festival", year: "2022", people: "40 participants" },
  { name: "Asia Assurance", year: "2022", people: "120 participants" },
];

export const clients = corporateSessions.map((c) => c.name);

/* ── figures, each traceable to a line on her site ────────────────────── */
export const stats = [
  // /about: "I have sold over 150 paintings over the years."
  { value: "150+", label: "Paintings sold" },
  // /exhibitions: "Since 2014, I have exhibited in numerous group exhibitions"
  { value: "2014", label: "Exhibiting since" },
  // /exhibitions: solo exhibitions, Gallery 1819, Singapore (2021, 2023)
  { value: "2", label: "Solo exhibitions in Singapore" },
];

/* ── art therapy ──────────────────────────────────────────────────────── */
// lisateoart.com/art-therapy — all copy verbatim
export const therapy = {
  eyebrow: "Guided Drawing Art Therapy",
  headline:
    "Take a moment from your daily stress to reconnect with your inner balance and peace.",
  intro:
    "My Guided Drawing session is designed for individuals and corporate teams seeking a calm, grounding experience, especially in high-stress environments.",
  introMore:
    "Participants learn to identify and release anxiety and tension and leave the session feeling calm, joyful, positive and ready to resume their daily lives and work with refreshed vigour and productivity.",
  distinctionLabel: "Disclaimer:",
  distinction:
    "This session is therapeutic in nature, not a recreational art class or casual team-building activity.",
  // the words she uses for how participants leave a session
  outcomes: ["Calm", "Joyful", "Positive"],
  // "What is Guided Drawing?" — her four components, verbatim
  method: [
    {
      step: "Sensory-based Art Therapy",
      text: "Draw with eyes closed using both hands, in a quiet environment, to reduce visual and audio distractions. Track your inner thoughts, emotions, and body sensations more effectively.",
      img: "/images/therapy/guided-1-sensory.jpg",
      alt: "Participants drawing with their eyes closed at a quiet table",
    },
    {
      step: "Emotional Release and Clarity",
      text: "Alternate between breathing, drawing and reflection. Use drawing and body movements to release negative emotions and reduce mental clutter.",
      img: "/images/therapy/guided-2-release.jpg",
      alt: "Hands drawing loose colour across large-format paper",
    },
    {
      step: "Regulate Your Nervous System",
      text: "Draw in rhythmic repetition to regulate nervous system and stimulate increasingly satisfying and positive sensory feedback.",
      img: "/images/therapy/guided-3-regulate.jpg",
      alt: "Hands sweeping over rhythmic, repeated crayon marks",
    },
    {
      step: "Recalibrate Your Brain",
      text: "This sensorimotor feedback loop encourages the development of new neurological pathways that allows you to rewrite your biography towards a more authentic, alive sense of self.",
      img: "/images/therapy/guided-4-recalibrate.jpg",
      alt: "Two participants sharing a moment of lightness mid-session",
    },
  ],
  // "Who is this for?"
  audiences: [
    "Corporate teams seeking meaningful wellness programs",
    "Companies with HRDC training budgets",
    "Companies looking for alternatives to conventional team-building and leadership workshops",
    "Individuals seeking emotional release and grounding",
  ],
  // "Session Details"
  session: [
    { label: "Duration", value: "2 hours per session" },
    { label: "Maximum", value: "25 participants per session" },
    { label: "Sessions", value: "Multiple sessions can be conducted within a day." },
    {
      label: "Materials",
      value:
        "All art materials, including crayons, finger paints, and large-format paper, will be provided.",
    },
    {
      label: "Client to provide",
      value: "Venue (meeting room or suitable space), tables and chairs for participants.",
    },
  ],
  // "Pricing for Art Therapy"
  pricing: {
    heading: "Pricing for Art Therapy",
    tiers: [
      { range: "20–80 participants", price: "130" },
      { range: "81–100 participants", price: "120" },
      { range: "100+ participants", price: "100" },
    ],
    unit: "MYR / pax",
    customLabel: "Custom & Extended Sessions:",
    custom:
      "For half or whole day workshops, HRDC-claimable programs, or other customised sessions, please email me.",
    cta: "Book a Discovery Call",
  },
  trustLabel: "Trusted by Leading Corporates",
  ctaQuestion: "Interested in exploring whether this is suitable for your organisation?",
  // /about and the art-therapy FAQ
  credentials: [
    "I am certified by the Institute for Sensorimotor Art Therapy, based in Australia, to conduct the Guided Drawing method.",
    "As an HRD Corp certified trainer in Malaysia, I design corporate wellness programs that harness the power of drawing to manage work stress, enhance mental health, interpersonal relationships, and work productivity.",
  ],
  // participant feedback, verbatim (/art-therapy and the BE Wellness project page)
  testimonials: [
    {
      quote:
        "A little stressed and pressured before the session but felt therapeutic during it and I left the session with a childlike joy!",
      name: "Natasha S.",
    },
    {
      quote: "Lisa is experienced and patient in guiding us to do the art. Well guided by her!",
      name: "Elynn K.",
    },
    {
      quote:
        "Before the session I felt gloomy, during the session I was excited, and after the session I felt happy.",
      name: "Lufti M.",
    },
    {
      quote:
        "I feel relaxed during the session, my mind is filled with work stuffs before it. After session feel more energy and lively.",
      name: "Shun Wen K.",
    },
  ],
  // "Frequently Asked Questions" — verbatim
  faqs: [
    {
      q: "What sort of corporate wellness programs do you offer?",
      a: "I offer wellness programs using art as a tool to help participants manage their stress and mental health. I am certified by the Institute for Sensorimotor Art Therapy, based in Australia, to conduct the Guided Drawing method.",
    },
    {
      q: "What is the Guided Drawing method?",
      a: "It is a sensory-based method whereby the participants draw on large pieces of paper (stuck to the tables) in a rhythmic manner, using both their hands and with their eyes closed. The reason for closing the eyes is to minimise visual distraction so that they can go to a deeper subconscious level. Participants learn to become more self-aware and to feel their body sensations. The aim is to transform negative feelings like anger, frustration, sadness to positive ones such as joy, inner peace, motivated and focused. When participants feel happier and more positive, they naturally perform better at work. During the session, participants alternate between drawing and then discussing how they feel. Every participant will experience their own unique transformation, depending on their current circumstances. At the end of the session, participants feel a relief of burden and stress.",
    },
    {
      q: "Do I need to know how to draw well?",
      a: "No, because the focus is on the changes to how the participants feel from the drawing and body movement, rather than on the visual outcome of their drawing. I will guide participants to draw simple shapes such as circles, squares and infinity shapes with both hands and eyes closed. Each shape triggers a different feeling, for example, some shapes help participants to release anger and tension, and another shape may help them develop self-confidence or foster a clarity of their thoughts.",
    },
    {
      q: "How is the Guided Drawing method conducted?",
      a: "I usually conduct the programs in the meeting rooms of my corporate clients. Some clients rent the conference rooms in hotels to accommodate larger groups. I need a table and chair for each participant. I bring all the art materials for the sessions, including plastic sheets to protect the tables.",
    },
    {
      q: "How many persons can be accommodated in one session?",
      a: "A maximum of 20 participants per session. Multiple sessions can be conducted back-to-back within the same day, e.g.: 10am-12pm, 1pm-3pm, 3.30pm-5.30pm.",
    },
    {
      q: "How long is the session for?",
      a: "Each session lasts for 2 hours.",
    },
    {
      q: "What are the benefits of the Guided Drawing method?",
      a: "Participants feel calmer, happier, and more positive. Some participants feel more clarity in their thinking, more motivated to achieve their goals.",
    },
  ],
};

/* ── book a call ──────────────────────────────────────────────────────── */
// lisateoart.com/book-a-call
export const bookACall = {
  heading: "Schedule a Call",
  text: [
    "Ready to discover how Guided Drawing can bring clarity, joy, and positive energy to your day or your team?",
    "Book a short, personalised call with me to explore your goals, ask questions, and plan a session that’s tailored to your needs.",
  ],
};

/* ── commissions ──────────────────────────────────────────────────────── */
// lisateoart.com/commissions (intro) and /paintings (made-to-order FAQ)
export const commissionIntro =
  "I accept commissions to create unique paintings for collectors. I work closely with them to understand their needs. Throughout the commission, I send picture updates of my progress. Changes can be made as necessary. Once the painting is finalised, I help to frame, deliver and install the paintings (for Klang Valley clients). For interstate and overseas clients, I use a reputable courier company to send the paintings, rolled up in a secured hard tube.";

export const commissionCta = {
  question: "Have a question or looking to commission a unique painting?",
  line: "I’d love to hear from you.",
  button: "Get In Touch",
  enquiry: "Make An Enquiry",
};

export const commissionProcess = [
  {
    step: "01",
    title: "Send me your idea",
    text: "Please send me an email with a description of the painting you would like and any relevant photos. We can meet physically or online to discuss the purpose of the painting, subject matter, preferred size, deadline and price.",
  },
  {
    step: "02",
    title: "Pricing and deposit",
    text: "Pricing depends on the complexity of the subject matter and the size. Generally, it will be MYR700-1000 per square foot. 50% deposit is payable in advance to confirm the painting commission. Balance payment is required upon completion of the commission.",
  },
  {
    step: "03",
    title: "Progress updates",
    text: "During the commission, I will send 2-3 photo updates of my progress. Changes can be made accordingly. Each commission takes around 2-4 weeks to complete.",
  },
  {
    step: "04",
    title: "Framing and delivery",
    text: "For Klang Valley buyers, I can assist in arranging for the framing, delivery and installation of the painting. For all other clients, I can arrange for the painting to be delivered to you by courier via PosLaju, DHL or Fedex.",
  },
];

// verbatim from the FAQ on lisateoart.com/paintings
export const commissionFaqs = [
  {
    q: "Do you create made-to-order paintings?",
    a: "Yes I do. Please send me an email with a description of the painting you would like and any relevant photos. We can meet physically or online to discuss the purpose of the painting, subject matter, preferred size, deadline and price. Pricing depends on the complexity of the subject matter and the size. Generally, it will be MYR700-1000 per square foot. 50% deposit is payable in advance to confirm the painting commission. Balance payment is required upon completion of the commission. During the commission, I will send 2-3 photo updates of my progress. Changes can be made accordingly. Each commission takes around 2-4 weeks to complete. For Klang Valley buyers, I can assist in arranging for the framing, delivery and installation of the painting. For all other clients, I can arrange for the painting to be delivered to you by courier via PosLaju, DHL or Fedex.",
  },
  {
    q: "Do you offer delivery for paintings?",
    a: "Yes. Delivery can be arranged for both local and international collectors after checkout is completed. Shipping fees are not included at checkout and will be quoted separately based on location, artwork size, and delivery method. For collectors in Malaysia, paintings will be couriered using PosLaju in a secure hard tube. For international orders, paintings will be sent by courier, rolled in a secure hard tube, via FedEx or DHL, unless otherwise agreed.",
  },
  {
    q: "What happens if my painting gets damaged in transit?",
    a: "I will provide a full refund for the painting and make a claim with the courier company.",
  },
];

/* ── collectors' words ────────────────────────────────────────────────── */
// verbatim from the testimonial pages on lisateoart.com
export const testimonials = [
  {
    quote:
      "I commissioned Lisa to create a paddy field painting for my uncle, She provided excellent advice and gave us a few examples to choose from. She understood our needs clearly, the colours, and even matched it to the room that my uncle planned to hang the painting in.",
    name: "Wuan Xin",
    detail: "AI Talent, 2020",
  },
  {
    quote:
      "Lisa is full of energy and such a friendly person. We appreciate that she actually took her time to understand our wants and came up with suggestions for us. Her artwork is now hung grandly and it really changed the whole atmosphere and feel of our home. Thank you, Lisa!",
    name: "Michelle Chuah",
    detail: "Penang, 2019",
  },
  {
    quote: "A painting by Lisa can remind you of who you are and what you represent.",
    name: "Cecilia Lee",
    detail: "MMKglo, 2019",
  },
  {
    quote:
      "Lisa is such a wonderful artist drawing this very important painting for me. It is truly a wonderful and satisfying experience throughout the journey.",
    name: "Wendy Yong",
    detail: "2019",
  },
  {
    quote:
      "We are so happy with our experience with Lisa and the Avatar painting that we commissioned two additional paintings from her.",
    name: "Elaine and EJ Kuan",
    detail: "2020",
  },
  {
    quote:
      "The painting turned out even better than we hoped for and we couldn’t be happier. Many thanks once again to Lisa! We will definitely be using her for our additional paintings.",
    name: "Junie & Borjan",
    detail: "Zagreb, Croatia, 2018",
  },
  {
    quote:
      "I am very happy with the final painting she created for me about harvesting the fruits of one’s labour. She took the extra step to arrange for my painting to be delivered to me.",
    name: "Tan Tong Ek",
    detail: "2020",
  },
  {
    quote:
      "Lisa was very creative and came up with a sketch of a lotus that not only had the dollar sign, it also told our family and business history. We are very happy with the colourful and meaningful painting and we highly recommend Lisa for commissioned paintings.",
    name: "Cheng Luan and Alan",
    detail: "2018",
  },
];

/* ── exhibitions ──────────────────────────────────────────────────────── */
// lisateoart.com/exhibitions — verbatim
export const exhibitionsIntro =
  "Since 2014, I have exhibited in numerous group exhibitions in Kuala Lumpur, Malaysia. In 2021 and 2023, I held 2 solo exhibitions in Singapore. In 2024, I participated in 2 group exhibitions in South Carolina and New York, USA.";

export const exhibitions = [
  { year: "2025", kind: "Group", text: "Malaysiana Big HeArts 2.0, KL City Gallery, Kuala Lumpur" },
  { year: "2025", kind: "Group", text: "Random Thoughts in Art, Royal Selangor Golf Club, Kuala Lumpur" },
  { year: "2025", kind: "Group", text: "Colours of Creativity, World Women’s Economic and Business Summit, Kuala Lumpur" },
  { year: "2024", kind: "Group", text: "Malaysiana Big HeArts, Segaris Art Center, Kuala Lumpur" },
  { year: "2024", kind: "Group", text: "Visionary Journeys, University Malaya Art Gallery, Kuala Lumpur" },
  { year: "2024", kind: "Group", text: "Linked INNNY-Women of the World, On The Fringe gallery, New York, USA" },
  { year: "2024", kind: "Group", text: "Walt's Waltz Mental Health Moonshot, Greenville Center for Creative Arts, South Carolina, USA" },
  { year: "2023", kind: "Solo", text: "Awakening, Gallery 1819, Singapore" },
  { year: "2022", kind: "Group", text: "Affordable Art Exhibition, Creative Space, WTCKL, Kuala Lumpur" },
  { year: "2021", kind: "Solo", text: "Reflection, Gallery 1819, Singapore" },
  { year: "2019", kind: "Group", text: "Inspire III, The Ledge, Petaling Jaya" },
];

/* ── artist statement ─────────────────────────────────────────────────── */
// lisateoart.com/artiststatement — verbatim, in full
export const artistStatement = {
  heading: "Transforming Inner Landscapes Through Art",
  body: [
    "My art is a map of the inner landscape, charted through the external terrains of Malaysia. The rhythmic waves of paddy fields, the silent, breathing architecture of corals, and the enduring solitude of mountains—these are not merely subjects I paint. They are my companions in a deep, meditative inquiry into the nature of peace, healing, and the human spirit. This path is a deliberate one. To be an artist and art therapist, instead of a lawyer, is to choose a life dedicated to the economy of the soul. I have chosen to invest my life in creating portals to healing and understanding, both on the canvas and in the therapeutic space as an art therapist.",
    "My process is a form of visual alchemy. I translate the anxieties and quiet joys of the human experience—the very currents I navigate as a single woman and artist building a life of meaning—into universal landscapes. The paddy field becomes a meditation on order, growth and abundance; the coral, a testament to the fragile, beautiful structures of the subconscious mind; the mountain, a symbol of strength and resilience and an aspiration toward spiritual clarity. In this way, the personal struggle for stability is transmuted into a shared exploration of our inner worlds.",
    "I believe that art is a vital counterbalance to a world obsessed with material metrics. My work stands as a quiet argument for a different value system—one where a painting is not a commodity, but a site for restoration; where the artist is not a producer, but a keeper of spiritual and psychological equilibrium. I paint to offer a moment of stillness, a mirror for the psyche, and a testament to the profound courage it takes to build a life around beauty and depth.",
  ],
};

/* ── about ────────────────────────────────────────────────────────────── */
// lisateoart.com/about — her page, in full and in her order
export const about = {
  title: "From Law to Art: Nature, Healing and the Journey Within",
  intro: "I’m Lisa",
  opening: [
    "I was trained as a lawyer and I transitioned into the world of art more than a decade ago. My career transition was guided by a conviction in the power of art and creativity to transform lives. Today, I am an artist and certified Guided Drawing art therapist based in Kuala Lumpur, Malaysia.",
    "I have cultivated a unique, dual-discipline practice that bridges visual storytelling and emotional healing, all rooted in a deep belief in the interconnectedness of nature, humanity, and the psyche.",
    "My creative practice is an exploration of the dialogue between inner consciousness and the natural world, forged at the intersection of evocative painting and therapeutic art.",
  ],
  museQuote:
    "Nature is my enduring muse - whether in the lush paddy fields, the depth of the ocean, or the majesty of mountains.",
  // her single long block on /about, split at her own sentence boundaries so it
  // reads as paragraphs. Not a word is changed.
  work: [
    "My Paddy Series (2017–2021) emerged as a meditative response to the turbulence of the COVID-19 pandemic, finding solace and symbolism in the cyclical rhythms of planting and harvest. These works are quiet testaments to the human capacities for patience, resilience, and the certainty of renewal and new beginnings. In painting the paddy fields, I find order amidst the chaos of the world.",
    "Later, my Ocean Series (2023) delves into the fluid and mysterious, using impressionistic, layered brushstrokes to parallel the unexplored depth of the deep ocean with the subconscious mind. Here, ethereal light piercing aquatic darkness becomes a powerful symbol of illumination and self-discovery emerging from within. The message of my ocean series is that all answers can be found within us.",
    "I have also been painting mountains over the years. Mountains represent strength, challenges, resilience, and spiritual ascent. In the coming months, I will create a new series that bring together the paddy fields, ocean life and the mountains (Body, Mind and Spirit).",
  ],
  collectedQuote:
    "I have sold over 150 paintings over the years. My paintings are collected by individuals and corporations, notably Dr Steve Wong, Dato’ Lim Chee Wee and Perodua.",
  reach: [
    "My artistic journey reflects a growing dialogue with audiences locally and internationally. Following numerous group exhibitions in Malaysia, I held two solo exhibitions in Singapore - Reflection (2021) and Inbound (2023). This reach expanded globally in 2024, with participations in the Walt’s Waltz Mental Health Moonshot in South Carolina, USA, and a curated exhibition of 80 international female artists at On The Fringe gallery in New York’s Tribeca.",
    "These platforms affirm my work’s universal resonance and my commitment to art as a language of connection and healing.",
  ],
  therapy: [
    "Parallel and integral to my painting is my work in art therapy. My Guided Drawing sessions empower participants to bypass the rational mind to access and release subconscious patterns through the drawing of simple, rhythmic shapes with eyes closed and using both hands.",
    "This powerful method fosters tangible transformation, reported by participants as reduced anxiety, greater emotional clarity, and renewed confidence.",
    "My therapy extends from intimate one-on-one sessions to structured workshops for diverse groups, including corporate teams at AXA and Coca-Cola, university students at Taylor’s University, and broader community circles via holistic wellness festivals and community programs run by organisations such as SEGi College.",
    "As an HRD Corp certified trainer in Malaysia, I design corporate wellness programs that harness the power of drawing to manage work stress, enhance mental health, interpersonal relationships, and work productivity.",
  ],
  therapyQuote:
    "Through guided drawing, I help unlock the mind, release stress, and transform emotions into clarity and calm.",
  closing: [
    "Ultimately, my practice underscores a core philosophy: that art is not merely expression but a vital pathway to health, wholesomeness and the understanding of Life.",
    "My landscapes and seascapes are thus imbued with a dual intention — to capture transcendent beauty while offering a reflective, therapeutic space for the viewer. Each canvas is an invitation to pause, contemplate, and embark on one’s own journey inward. Through my paintings and therapeutic workshops, I shall continue to foster an essential dialogue between art, nature, and the human spirit, and build a strong connection between contemporary art and holistic wellness.",
  ],
};

/* ── Body · Mind · Spirit ─────────────────────────────────────────────── */
// lisateoart.com (home) — the three series, described in her words
export const pillars = [
  {
    key: "Body",
    series: "Paddy Fields",
    text: "The cycle of life, new beginnings, growth, expanse, abundance and harvesting the fruits of our labour",
    accent: "aqua",
    image: "/images/artwork/paddy_series_1/01-Yellow-Fields-I.jpg",
    to: "/series/paddy-series-1",
  },
  {
    key: "Mind",
    series: "Corals and Underwater World",
    text: "Fluidity of our thoughts and emotions, reflections of our subconscious mind and discovering untapped human potential",
    accent: "rose",
    image: "/images/artwork/awakening/03-Fullness-Of-Life.jpg",
    to: "/series/awakening",
  },
  {
    key: "Spirit",
    series: "Mountains",
    text: "Symbols of strength, stability, resilience, overcoming challenges, and spiritual transcendence",
    accent: "violet",
    image: "/images/artwork/mountains/04-Green-Mountains-With-Mist-And-Waterfalls.jpg",
    to: "/series/mountains",
  },
];

/* ── featured projects ────────────────────────────────────────────────── */
// lisateoart.com/featured-projects — each write-up verbatim
export const featuredProjects = [
  {
    slug: "rafulin",
    title: "Corporate Art Commission: Rafulin Sdn Bhd",
    date: "2025",
    body: [
      "In 2025, I was honoured to collaborate with Dato’ Mohamed Raffe of Rafulin Sdn Bhd to create a curated collection of five paintings for their newly renovated corporate office. The artistic vision was to enhance the workspace with imagery that embodies positive themes of abundance, growth, success, and expansion.",
      "Each piece was thoughtfully designed to convey specific values:",
    ],
    list: [
      "A paddy field scene, symbolising abundance and fruitful harvest",
      "A landscape of green mountains with mist and waterfalls, representing strength, resilience, and divinely bestowed prosperity",
      "A dynamic duo of charcoal horses, reflecting strength, perseverance, and triumphant success",
      "Two hibiscus blooms - Malaysia’s national flower - signifying Rafulin’s identity as a successful Malaysian company in a vibrant an continued state of growth",
    ],
    after: [
      "For all commissioned projects, I provide a comprehensive service package that includes final delivery and professional installation, ensuring a seamless and polished presentation for any space.",
    ],
  },
  {
    slug: "penyu-shelter",
    title: "The Penyu Shelter Project by YTL Cement",
    date: "2025",
    body: [
      "In celebration of YTL’s 70th anniversary in 2025, 70 cement turtle sculptures were created by YTL Cement Group, painted by artists and celebrities, and put up for bidding. Sales proceeds went towards turtle conservation in Malaysia. I painted 2 turtles named “Don’t Paint My Shell” and “Picasso Turtle”. 50 turtles were put up for online bidding whilst 20 were chosen for live auction at a charity gala dinner held at the JW Marriott Hotel KL.",
      "For each artist’s role in painting the turtles, YTL Cement donated RM5000 to the charity of our choice. I chose the Malaysian Mental Health Association (MMHA) in recognition of my work as an art therapist. I am thrilled that my artwork can play a part for Mother Earth & further my interest in mental health and environmental concerns.",
      "Prominent art auctioneer Ian McGinlay was flown in from Hong Kong to preside over the auctions. Ian was one of Sotheby’s leading auctioneers, presiding over major sales in Asia, including record-breaking contemporary and modern art auctions in Hong Kong. What a treat to see him live in action! RM1 Million was raised in total for turtle conservation. The monies collected were distributed equally to Turtle Conservation Society of Malaysia and PULIHARA Malaysia",
    ],
  },
  {
    slug: "royal-selangor-golf-club",
    title: "Coral Painting Exhibition with Royal Selangor Golf Club",
    date: "November 2025",
    body: [
      "In November 2025, I participated in a group art exhibition with 7 other Malaysian artists. The exhibition was officially launched by DYMM Yang di-Pertuan Besar Negeri Sembilan Tuanku Muhriz. I exhibited 5 of my coral paintings, of which 3 were sold.",
    ],
  },
  {
    slug: "solo-exhibition-singapore",
    title: "Solo Exhibition in Singapore",
    date: "2021",
    body: [
      "In 2021, I held a solo exhibition of my second paddy field series in Gallery 1891 in Singapore. It was a momentous event for me as it was my first solo exhibition ever. I was honoured that the High Commissioner of Malaysia to Singapore, His Excellency Dato’ Indera Dr Azfar Mohamad Mustafar, visited my exhibition.",
    ],
  },
  {
    slug: "be-wellness-campaign",
    title: "BE Wellness Campaign - Art Therapy",
    date: "December 2025",
    body: [
      "In December 2025, I was engaged by BE (Beyond Eternity) International to conduct Guided Drawing art therapy workshops for 100 of their employees in their headquarters in Bukit Jalil, Malaysia.",
      "A total of 5 workshops were held, attended by 25 employees per workshop, over 2 days. I am inspired to hear that BE organises monthly activities such as my art therapy workshops for their employees, as part of the company’s ongoing effort to maintain their staff’s well-being and job satisfaction.",
      "It was a great experience conducting the workshops for such fun and vibrant employees.",
    ],
  },
  {
    slug: "pan8-mural",
    title: "Mural Art for Pan8 Mediterranean Restaurant",
    date: "2022",
    body: [
      "In 2022, a new Mediterranean restaurant opened at IOI Putrajaya Mall. They engaged me to create 2 large murals on their walls, one inspired by the Greek city Santorini and the other inspired by the Spanish city of Cadaques, home of Salvador Dali’s house museum.",
      "The purpose of the mural art was to enhance the dining experience of their diners. It was also a photo opportunity for their diners to post on social media. It took me 2 weeks to complete both large murals. It was challenging to work on the project close to midnight when the restaurant was closed for business. However, I thoroughly enjoyed the experience and greatly appreciate the opportunity to showcase my mural art in a public space.",
    ],
  },
];

/* ── contact ──────────────────────────────────────────────────────────── */
// lisateoart.com/contact
export const contact = {
  heading: "Get in Touch",
  note: "Please complete the form below or email me",
};

/* ── journal / blog ───────────────────────────────────────────────────── */
// lisateoart.com/blog — each post's title and body verbatim. This array is the
// seed for the Sanity CMS (scripts/migrate-blog.mjs); the site itself reads the
// posts back from Sanity so Lisa can edit them herself.
const BLOG_BASE = "https://www.lisateoart.com/blog/";
export const blog = [
  {
    slug: "art-wellness-workshop",
    title: "Art Wellness Workshop",
    date: "Dec 2025",
    tag: "Art therapy",
    cover: "/images/journal/art-wellness.webp",
    excerpt:
      "As 2025 draws to a close, I feel very grateful for all the support and opportunities granted to me this year.",
    body: [
      "As 2025 draws to a close, I feel very grateful for all the support and opportunities granted to me this year. One such person I am grateful to is Lisa Leong who offered me a third opportunity to conduct art wellness workshops for corporate employees, this time for 100 BE International employees.",
      "BE (Beyond Eternity) is a direct marketing company founded in Malaysia that offers wellness products. Their vision beyond business - “We strive to create wellness in every way, for everyone. We define wellness as a feeling of liberation that brings about health, peace, prosperity, contentment and happiness. In every way encompasses all aspects of life – physical, mental, spiritual, economic, financial, familial and social. For everyone means our doors are open to any individual regardless of race, colour, creed, background or belief. For eternity merely means that we uphold sustainability in everything we do for positive impact that lasts.”",
      "Having met 100 of their employees, seeing their interaction with each other and hearing their feedback about BE, I think the BE founders and management are doing a great job in creating a positive work environment and developing good relationships with their employees and amongst employees.",
      "The art workshops that I conducted were one of the monthly activities that BE offer their employees to enhance their well-being. It was a great experience working with such a fun and vibrant group of employees from their headquarters in Bukit Jalil. I wish BE and all its employees continued success in the years to come.",
    ],
    source: BLOG_BASE + "art-wellness-workshop",
  },
  {
    slug: "birthday-wishes",
    title: "Birthday Wishes",
    date: "Feb 2024",
    tag: "Studio",
    cover: "/images/journal/birthday-wishes.webp",
    excerpt:
      "Today is my birthday! What better way to celebrate it than a nature getaway?",
    body: [
      "Today is my birthday! What better way to celebrate it than a nature getaway? I’m a city girl at heart but love spending time in nature to rejuvenate and reconnect with myself. What about you?",
      "I turn 49 today and I am full of gratitude. I reflected on my life and how I’ve progressed from a lawyer to conference producer, restaurant owner, legal editor, full time mum, part time artist and now full time artist, art therapist and art teacher. I am reminded of “anicca” - that all things, including the self, are impermanent and constantly changing. I wonder how I will continue to evolve? Time will tell.",
      "I reflected on my divorce during Covid in 2020 and how it propelled me into social media, and especially LinkedIn, to reach an audience who appreciates my voice in art. Thank you all! Would love to share my birthday joy with you - best wishes everyone and may all of us continue to grow from strength to strength!",
    ],
    source: BLOG_BASE + "art-jamming-with-me-ddbxl",
  },
  {
    slug: "art-jamming",
    title: "Art Jamming with Me",
    date: "Nov 2021",
    tag: "Studio",
    cover: "/images/journal/art-jamming.webp",
    excerpt:
      "Art lessons that encourage you to have fun, discover your inner self and voice and boost mental health and creativity.",
    body: [
      "I conduct art lessons where I encourage participants to explore their Self and express their hearts. I hope to inspire others to find joy in art and to use art for discovery and healing.",
    ],
    source: BLOG_BASE + "art-jamming-with-me",
  },
  {
    slug: "women-who-win",
    title: "Thank you “Women Who Win” for featuring my story on your platforms.",
    date: "Nov 2021",
    tag: "Feature",
    cover: "/images/journal/women-who-win-portrait.webp",
    excerpt:
      "Thank you Women Who Win for featuring my story on your platforms. I hope that my sharing gives inspiration and insight to readers and fellow artists, and benefits those who wish to embark on a new journey.",
    body: [
      "Thank you Women Who Win for featuring my story on your platforms. I hope that my sharing gives inspiration and insight to readers and fellow artists, and benefits those who wish to embark on a new journey.",
    ],
    source:
      BLOG_BASE +
      "thank-you-a-hrefhttpswwwlinkedincomcompanywomen-who-win-100women-who-wina-for-featuring-my-story-on-your-platforms",
  },
  {
    slug: "paddy-fields",
    title: "Why Do I Have a Special Interest in Painting The Paddy Fields of Malaysia?",
    date: "Oct 2021",
    tag: "The work",
    cover: "/images/journal/paddy-fields.webp",
    excerpt:
      "The fields are a metaphor for the cycle of life and our life journey. I have learnt so much during my visits.",
    body: [
      "The fields are a metaphor for the cycle of life and our life journey. I have learnt so much during my visits:",
      "~ the impermanence of life",
      "~ change & new chapters in life",
      "~ weathering storms & challenges",
      "~ life's unpredictability",
      "~ patience & persistence",
      "~ harvesting the fruits of our labour",
      "~ growth & development",
      "~ non-attachment, non-resistance & non-judgment",
      "Each time I visit the fields, the view changes as I see the different stages of paddy plantation. But always serene, always expansive, always inspiring. ❤️",
      "Can't wait to visit again. Does nature inspire you too?",
    ],
    source:
      BLOG_BASE + "why-do-i-have-a-special-interest-in-painting-the-paddy-fields-of-malaysia",
  },
  {
    slug: "video-paddy-fields",
    title: "(Video) Paddy Fields Of Sekinchan, Malaysia - Lisa Teo Art",
    date: "Oct 2021",
    tag: "The work",
    cover: "/images/journal/video-paddy-fields.webp",
    excerpt:
      "Short video of the paddy fields of Sekinchan, Malaysia, a source of inspiration for my paintings.",
    body: [
      "Short video of the paddy fields of Sekinchan, Malaysia, a source of inspiration for my paintings. Hope you like it, especially those who’ve never been. Have a great day!",
    ],
    source: BLOG_BASE + "video-paddy-fields-of-sekinchan-malaysia-lisa-teo-art",
  },
  {
    slug: "the-gift",
    title: "The Story Behind “The Gift” Painting - Lisa Teo Art",
    date: "Oct 2021",
    tag: "The work",
    cover: "/images/journal/the-gift.webp",
    excerpt:
      "Everything that is transformed inside can be observed outside. Time is an eternal moment.",
    body: [
      "Everything that is transformed inside can be observed outside. Time is an eternal moment. Just as a single drop of water holds the heart of the past, a single moment holds the heart of all time. The past and the future. Those who grasp the moment grasp the wholeness of time and its journey.",
      "Remember, life is the greatest gift we’re given. It’s open to infinite possibilities. There’s only one thing for you to do: surrender. Just surrender to it. Let life flow and flow with it. Let yourself live.",
      "You connect with another person either out of love or fear. Let it be love. Let it be infinite love. Connect out of love and the universe will surround and protect you. It will embrace you with its loving arms. And not only in times of joy or pleasure but also in darkness, in grief or danger. Don’t run away from any of it. Don’t be afraid to laugh, to cry. Embrace it all. Enjoy it. That’s the only way you’ll grasp the wholeness of every single moment. And only by doing that will you live a full life. Don’t be afraid of living. Let time make you… you.",
      "Don’t try to be anyone else. Find out who you are and spread your wings to life. And as you spread your wings, your soul will appear. That’s how you become one with yourself and the world, united with the universe, and everything in it.",
      "Never stop questioning. Never get tired of asking yourself the same question over and over again for the rest of your life: Who am I?",
      "(“The Gift”)",
    ],
    gallery: ["/images/journal/the-gift-1.webp", "/images/journal/the-gift-2.webp"],
    source: BLOG_BASE + "the-story-behind-the-gift-painting-lisa-teo-art",
  },
  {
    slug: "supporting-local-artists",
    title: "Supporting Local Artists! - Lisa Teo Art",
    date: "Oct 2021",
    tag: "Exhibitions",
    cover: "/images/journal/supporting-local-artists.webp",
    excerpt:
      "In this exhibition, we artists tell our stories and life experiences. I share these 3 paintings that tell of my love for travelling.",
    body: [
      "Art serves communities by providing joy, interaction & inspiration. Art reaches across space and time by allowing people from different cultures and different eras to communicate with each other through the images and stories that they tell. Through art, we experience what the artist sees, feels, experiences and wants to share with the world. Art develops creativity & innovation, critical thinking, communication & collaboration. Art also makes social, political & economic statements that provoke thought & action toward social progress.",
      "In this exhibition, we artists tell our stories and life experiences. I share these 3 paintings that tell of my love for travelling and my experiences of the wonders of the world and its people. A graceful Balinese dancer and how their dance came about. The first bend of the mighty Yangtze River in China that has served millions of people through the ages. A lotus pond in shimmering pointillism sunset light.",
      "Do check out this exhibition and lend your support as we continue to serve the community. Which artist tells your favourite story in this exhibition?",
    ],
    gallery: ["/images/journal/supporting-1.webp"],
    source: BLOG_BASE + "supporting-local-artists-lisa-teo-art",
  },
  {
    slug: "haiku",
    title: "Haiku by Frank Clark, MD, FAPA - (feat. Lisa Teo Art)",
    date: "Oct 2021",
    tag: "Art therapy",
    cover: "/images/journal/haiku.webp",
    excerpt:
      "Water nourishes / Hate scorches rooted friendships / Hope is life’s beacon",
    body: [
      "Water nourishes",
      "Hate scorches rooted friendships",
      "Hope is life’s beacon",
      "~ Haiku by Frank Clark, MD, FAPA",
      "This month of October is Mental Health Month. I am an advocate of art therapy and the important role it plays in improving one’s mental health. I am honoured to collaborate with esteemed psychiatrist, Dr Frank Clark, in creating this art for his beautiful haiku. Thank you Heidi Anne Duerr and Psychiatric Times for publishing our collaboration in promoting mental health.",
      "I used soft pastel sticks for this sketch to reflect water nourishing our hearts and lives. Flames of hate threaten to damage relationships & love. An infinity symbol to reflect that at the heart of it all, love prevails. There is always hope. Have faith.",
      "How are you looking after your mental health?",
    ],
    source:
      BLOG_BASE +
      "haiku-bynbspa-hrefhttpswwwlinkedincominacoaaave13ibn0vo1lvvtw49dznqognzwxd-u3gfrank-clark-md-fapaa-feat-lisa-teo-art",
  },
  {
    slug: "lockdown-fun",
    title: "What Do You Do For Fun During the lockdown? - Lisa Teo Art",
    date: "Oct 2021",
    tag: "Studio",
    cover: "/images/journal/lockdown-fun.webp",
    excerpt:
      "When I’m not busy creating art, I spend time with Chloe, Ashton and our dog Chewie.",
    body: [
      "When I’m not busy creating art, I spend time with Chloe, Ashton and our dog Chewie. The positive thing about Covid lockdown, working from home & online schooling is that we get to see our children a lot more. The downside is trying to find activities during the long summer holiday while being stuck at home.",
      "What do you do for fun with your children and pet during the lockdown?",
    ],
    source: BLOG_BASE + "what-do-you-do-for-fun-during-the-lockdown-lisa-teo-art",
  },
  {
    slug: "spill-the-tea",
    title: "SPECIAL FEATURE: Spill The Tea Podcast feat. Lisa Teo Art",
    date: "Oct 2021",
    tag: "Feature",
    cover: "/images/journal/spill-the-tea.webp",
    excerpt:
      "We talked about how my stints as a lawyer, a restaurateur and a conference producer shaped me as an artist.",
    body: [
      "It was a honour speaking to Biswarup Bhattacharjee (BB) & Keisya Prasetyawan on Spill The Tea podcast (about unconventional people). We talked about how my stints as a lawyer, a restaurateur and a conference producer shaped me as an artist.",
      "Key Takeaways:",
      "[2:15] A career in art (unconventional!) is not always encouraged in many families",
      "[6:18] What we do in life is influenced by the childhood experiences our parents provide",
      "[10:15] Every art I produce tells a story, whether my own creation or a made-to-order art",
      "[12:52] My professional experiences shaped me to become the artist I am today",
      "[14:25] Do male artists get more opportunities than their female peers?",
      "[17:05] It is unconventional for an artist to be digitally present on #linkedin",
      "[26:26] Other art forms I would take up in future",
      "[28:20] Even if you are not an art lover, you can understand and find hidden stories in paintings",
      "[36:00] A mind stretched by new experiences can never go back to old dimensions",
    ],
    source: BLOG_BASE + "special-feature-spill-the-tea-podcast-feat-lisa-teo-art",
  },
];
