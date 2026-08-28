export const galleryItems = [
  {
    src: "/assets/gallery-cyber-car.webp",
    title: "Velocity Noir",
    tag: "Veo 3.1",
    prompt: "A silver hypercar in a rain-soaked coastal megacity",
  },
  {
    src: "/assets/gallery-chrome-stag.webp",
    title: "Fiber Forest",
    tag: "Imagen",
    prompt: "Chrome stag with fiber-optic antlers in blue mist",
  },
  {
    src: "/assets/gallery-orb-studio.webp",
    title: "World in a Lens",
    tag: "Flow Studio",
    prompt: "A complete film set suspended inside a glass sphere",
  },
  {
    src: "/assets/gallery-cosmic-whale.webp",
    title: "Skybound",
    tag: "Avon Image",
    prompt: "A bioluminescent whale sailing over midnight dunes",
  },
];

export const pricingPlans = [
  {
    id: "plus",
    name: "PLUS",
    eyebrow: "For everyday AI creation",
    badge: "43% OFF",
    credits: "25,000 Avon Credits",
    access: "20 days of full creator access",
    oldPrice: { PKR: "2,999", USD: "10.50" },
    price: { PKR: "1,710", USD: "6.50" },
    days: "20 days",
    tone: "plus",
    cta: "Get Plus",
    save: { PKR: "Save Rs. 1,289", USD: "Save $4.00" },
    features: [
      "3-day free trial included",
      "Full Google Flow access",
      "2 parallel video generations",
      "Veo 3.1 + image-to-video",
      "1K image generation",
      "16:9, 9:16 and more ratios",
      "AvonTTS + voice clone",
      "Priority creator support",
      "Ad-free workspace",
    ],
    tools: [
      ["Prompt Library", "Unlocked"],
      ["Imagen Pro", "Included"],
      ["AvonTTS", "25K credits"],
      ["Voice Clone", "Included"],
    ],
  },
  {
    id: "max",
    name: "MAX",
    eyebrow: "For ambitious AI projects",
    badge: "BEST VALUE",
    discount: "50% OFF",
    credits: "45,000 Avon Credits",
    access: "30 days of full creator access",
    oldPrice: { PKR: "4,999", USD: "17.00" },
    price: { PKR: "2,499", USD: "8.50" },
    days: "30 days",
    tone: "max",
    cta: "Get Max",
    save: { PKR: "Save Rs. 2,500", USD: "Save $8.50" },
    features: [
      "Everything in Plus",
      "3 parallel video generations",
      "Highest generation success rate",
      "8× more usage than Plus",
      "Every standard aspect ratio",
      "Fastest processing + premium queue",
      "Early access to new models",
      "Priority creator support",
      "Ad-free workspace",
    ],
    tools: [
      ["Premium Server", "Dedicated"],
      ["Premium Queue", "Top priority"],
      ["AvonTTS", "50K credits"],
      ["Prompt Library", "Unlocked"],
    ],
  },
  {
    id: "heavy",
    name: "HEAVY",
    eyebrow: "For power creators and studios",
    badge: "STUDIO POWER",
    credits: "Unlimited Avon Credits",
    access: "30 days of maximum access",
    price: { PKR: "5,999", USD: "25.00" },
    days: "30 days",
    tone: "heavy",
    cta: "Get Heavy",
    save: { PKR: "Maximum capacity", USD: "Maximum capacity" },
    features: [
      "Everything in Max",
      "Agent Mode access",
      "6,200 Omni Flash credits",
      "Approx. 124 Omni videos",
      "Buy more Omni credits anytime",
      "Unlimited Veo 3.1 Lite queue",
      "Highest priority processing",
      "Studio support channel",
      "Ad-free workspace",
    ],
    tools: [
      ["Agent Mode", "Full access"],
      ["Omni Flash", "6,200 credits"],
      ["Premium Server", "Dedicated"],
      ["AvonTTS", "50K credits"],
    ],
  },
];

export const comparisonRows = [
  ["Veo 3.1 video", true, true, true],
  ["Text-to-video + image-to-video", true, true, true],
  ["Agent Mode", false, false, true],
  ["Omni Flash", false, false, "6,200 credits"],
  ["Avon Credits", "25,000", "45,000", "Unlimited"],
  ["AvonTTS credits", "25,000", "50,000", "50,000"],
  ["Voice cloning", true, true, true],
  ["Prompt library", true, true, true],
  ["Video output", "1080p", "1080p", "1080p"],
  ["Concurrent generations", "2×", "3×", "3×"],
  ["Imagen Pro", true, true, true],
  ["All aspect ratios", false, true, true],
  ["ChatGPT access", false, true, true],
  ["Grok access", true, true, true],
  ["Server access", "Members pool", "Dedicated", "Dedicated"],
  ["Processing speed", "Fast", "Fastest", "Fastest"],
  ["Premium queue", false, true, true],
  ["Early feature access", false, true, true],
  ["Priority support", true, true, true],
  ["Plan duration", "20 days", "30 days", "30 days"],
];

export const pricingFaqs = [
  {
    q: "Is the 3-day trial really free?",
    a: "Yes. You can create an account and explore AVONFlow for three days without adding a payment card. Your plan does not renew automatically during the trial.",
  },
  {
    q: "What happens when my plan expires?",
    a: "Your workspace and project history stay available, while generation tools pause until you renew or choose another plan.",
  },
  {
    q: "What is the difference between Plus and Max?",
    a: "Max adds more creation capacity, a dedicated premium queue, broader shared-model access, and early access to new AVONFlow tools.",
  },
  {
    q: "Are generations unlimited?",
    a: "The Heavy plan includes unlimited standard Avon generations. Model availability and fair-use limits can still apply when upstream providers are under exceptional load.",
  },
  {
    q: "How quickly is access activated?",
    a: "Free access activates instantly. Paid access is normally confirmed within five to ten minutes after successful payment verification.",
  },
  {
    q: "Can I switch currencies?",
    a: "Yes. Use the PKR / USD switch above the plans. It changes the displayed checkout currency without changing plan features.",
  },
];

export const testimonials = [
  {
    quote: "I went from a blank prompt to a pitch-ready concept film before my client call. The workflow feels impossibly fast.",
    name: "Amina R.",
    role: "Creative director",
    initials: "AR",
  },
  {
    quote: "The extension connected in seconds, and having video, images and voice in one place removed half my production tabs.",
    name: "Jonas K.",
    role: "YouTube producer",
    initials: "JK",
  },
  {
    quote: "AVONFlow gives our studio the freedom to test ten visual directions before we commit to a real shoot.",
    name: "Sara M.",
    role: "Film strategist",
    initials: "SM",
  },
  {
    quote: "The quality is cinematic, but the interface stays simple enough that my whole social team can use it.",
    name: "Theo N.",
    role: "Growth lead",
    initials: "TN",
  },
];

export const homeFaqs = [
  {
    q: "Do I need video-editing experience?",
    a: "No. Start from a plain-language prompt, choose a model and format, then generate. AVONFlow is built for first-time creators and professional teams alike.",
  },
  {
    q: "Which AI models can I use?",
    a: "Plans can include Google Flow with Veo 3.1, Imagen and Whisk tools, ChatGPT, Grok, AvonTTS and future models as they become available.",
  },
  {
    q: "Does AVONFlow replace my editing software?",
    a: "AVONFlow handles rapid generation and variation. You can export results to your preferred editor when a project needs detailed finishing or compositing.",
  },
  {
    q: "Can I earn money by referring creators?",
    a: "Yes. Every eligible paid referral earns tokens in your AVONFlow wallet, which can be converted to USD once the withdrawal threshold is reached.",
  },
];

export const earnFaqs = [
  {
    q: "When do referral tokens arrive?",
    a: "Eligible tokens appear in your wallet as soon as the referred creator completes a qualifying plan purchase.",
  },
  {
    q: "Is there a referral limit?",
    a: "No. You can share your link with as many genuine creators as you like and earn on every qualifying purchase.",
  },
  {
    q: "What is the withdrawal minimum?",
    a: "The minimum is 34 tokens, equal to $1.02 USD. Available withdrawal methods are shown before you submit a request.",
  },
  {
    q: "Can I refer myself?",
    a: "No. Self-referrals and duplicate accounts are blocked so rewards stay fair for the whole community.",
  },
];
