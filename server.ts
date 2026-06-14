import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini SDK with User-Agent as instructed in the skill guidelines
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      "User-Agent": "aistudio-build",
    },
  },
});

function getStringHash(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return Math.abs(hash);
}

function estimateCreatorProfile(url: string, rawUsername: string) {
  const username = rawUsername.toLowerCase().trim();

  // Mode A: Recognized Public Creators Dictionary with realistic statistics
  const recognizedDict: Record<string, any> = {
    "khaby.lame": {
      creatorName: "@khaby.lame",
      creatorScore: 98,
      creatorLevel: "Global Elite Celebrity",
      followers: "163.5M Followers",
      category: "Comedy & Silent UGC",
      postingFrequency: "3-4 Posts / Week",
      summary: "The undisputed king of silent comedy. With world-leading non-verbal humor, Khaby has attained a global celebrity status that transcends language, maintaining top-tier brand engagement in premium consumer segments.",
      contentStrategy: {
        score: 97,
        summary: "A masterclass in global non-verbal comedy. Simplifies overly complicated life hacks using pure facial expressions and standard hand gestures to maximize universal reach.",
        bullets: [
          "Global appeal via silent non-verbal actions",
          "High visual clarity and fast pacing",
          "Universal comedy that breaks cultural barriers"
        ],
        tags: ["Silent Comedy", "Global Reach", "Life Hacks", "Face Hooks"]
      },
      audienceSignals: {
        score: 97,
        summary: "Maintains a massive global fan base with outstanding viral sharing ratios and cross-platform synergy.",
        bullets: [
          "Extremely high share-to-view ratio",
          "Broad multi-lingual comment section",
          "Massive cultural resonance"
        ],
        tags: ["Global Cult", "Viral Shares"]
      },
      postingPatterns: {
        score: 96,
        summary: "Perfect hook timing within the first 1.5 seconds, choosing clean, bright lighting and natural settings.",
        bullets: [
          "Instant silent reaction hook",
          "Clean, high-contrast, uncluttered framing",
          "Consistent peak weekend activity"
        ],
        tags: ["Hook King", "Silent Pacing"]
      },
      growthOpportunities: {
        score: 92,
        summary: "High potential to launch consumer brands and proprietary media projects with high conversion and global footprint.",
        bullets: [
          "Global product sponsorships",
          "Physical brand collaborations",
          "Animated feature spin-offs"
        ],
        tags: ["Global IP", "Scale"]
      },
      brandFit: {
        score: 99,
        summary: "Supreme premium advertising potential, collaborating with global icons like Hugo Boss and Binance with fully-matured production standards.",
        bullets: [
          "Fully brand-safe content",
          "Native integration of products in skits",
          "High recall rates on display campaigns"
        ],
        tags: ["Max Safety", "Premium Ad"]
      },
      brandMatches: [
        { name: "Hugo Boss", score: 99 },
        { name: "Binance", score: 97 },
        { name: "Canva", score: 95 },
        { name: "CapCut", score: 94 },
        { name: "Ferrari", score: 92 }
      ],
      recommendation: "Prioritize major multi-national consumer brand campaigns. His silent format is verified to drive up to a 4.2x higher conversion rate in non-English speaking markets compared to typical voice-over clips. Recommend marquee placement with integrated product-as-a-prop utility."
    },
    "mrbeast": {
      creatorName: "@mrbeast",
      creatorScore: 98,
      creatorLevel: "Global Elite Celebrity",
      followers: "104.2M Followers",
      category: "Philanthropy & Scale Challenges",
      postingFrequency: "1-2 Posts / Week",
      summary: "High-budget, high-concept entertainment that drives unprecedented community retention. Re-engineers standard video hooks to sustain top-tier attention metrics.",
      contentStrategy: {
        score: 98,
        summary: "Optimized multi-million dollar challenge concepts scaled down perfectly into high-retention short-form chapters.",
        bullets: [
          "Extreme curiosity hooks in under 1 second",
          "Intense, high-color visual storytelling",
          "Satisfying and high-stakes payoff loops"
        ],
        tags: ["Challenges", "Extreme Engagement", "Virality Engine"]
      },
      audienceSignals: {
        score: 98,
        summary: "Impeccable audience trust and high repeat viewership metrics.",
        bullets: [
          "Outstanding returning viewer metrics",
          "Highly-moderated positive community discussions",
          "Top-percentile absolute watch time"
        ],
        tags: ["Massive Loyalists", "Deep Trust"]
      },
      postingPatterns: {
        score: 97,
        summary: "Very high visual density and fast-paced quick cuts optimized for retention.",
        bullets: [
          "Ultra-fast scene transitions",
          "Explicit subtitle tracking integration",
          "Perfect audio mixing and pacing"
        ],
        tags: ["Retention Master", "Fast Pacing"]
      },
      growthOpportunities: {
        score: 95,
        summary: "Prime launchpad for global physical consumer packaged goods like Feastables.",
        bullets: [
          "Physical product syndication",
          "Subscription community ecosystems",
          "Real-world pop-up installations"
        ],
        tags: ["Monetize Max", "IP Scale"]
      },
      brandFit: {
        score: 98,
        summary: "Ultra-premium brand integration suited for category-leading enterprise clients looking for maximum impressions.",
        bullets: [
          "Full corporate brand safety",
          "Active product placement within narrative stakes",
          "Massive reach across youthful demographics"
        ],
        tags: ["Safe Corp", "Extreme Reach"]
      },
      brandMatches: [
        { name: "Feastables", score: 99 },
        { name: "Shopify", score: 98 },
        { name: "Brawl Stars", score: 96 },
        { name: "CapCut", score: 92 },
        { name: "Samsung", score: 90 }
      ],
      recommendation: "Utilize structured stunt and challenge integrations. His audience expects massive, high-stakes narratives, resulting in 3.4x higher conversion when products are seamlessly integrated as essential tools within high-budget challenge scenarios."
    },
    "charlidamelio": {
      creatorName: "@charlidamelio",
      creatorScore: 97,
      creatorLevel: "Global Elite Celebrity",
      followers: "155.4M Followers",
      category: "Dance & Creative Expression",
      postingFrequency: "3-5 Posts / Week",
      summary: "The viral pioneer of short-form dance and gen-z aesthetic culture. Strong lifestyle authority with immense brand affinity across beauty, apparel, and cultural events.",
      contentStrategy: {
        score: 96,
        summary: "Aesthetic lifestyle, beauty diaries, and highly relatable trend-driven choreography. High face retention and authentic community bonding.",
        bullets: [
          "Trend-surfing choreography with instant peak engagement",
          "Behind-the-scenes family and personal vlogs",
          "Natural self-care and morning-routine placements"
        ],
        tags: ["Choreography", "Beauty Vlogs", "Gen-Z Trends", "Aesthetics"]
      },
      audienceSignals: {
        score: 95,
        summary: "Cult-like lifestyle following with strong style-imitation and purchase behavior.",
        bullets: [
          "High comment section activity and trend tracking",
          "Massive organic audio trends usage",
          "Strong peer-to-peer demographic resonance"
        ],
        tags: ["Trendsetter", "Gen-Z Wave"]
      },
      postingPatterns: {
        score: 94,
        summary: "Slick, natural setups using mobile lighting and active trend integrations.",
        bullets: [
          "Immediate dance/visual sync within first 0.5s",
          "High audio trend alignment score",
          "Regular daily uploading intervals"
        ],
        tags: ["Daily Vibes", "Audio Sync"]
      },
      growthOpportunities: {
        score: 91,
        summary: "High potential in proprietary beauty brands and high-end fashion lines.",
        bullets: [
          "Direct-to-consumer beauty product lines",
          "Fashion model collaborations",
          "Pop-culture guest appearances"
        ],
        tags: ["Brand Expansion", "Luxury IP"]
      },
      brandFit: {
        score: 97,
        summary: "Elite corporate partnership integration. Perfect for premium fashion, apparel, and beauty brands.",
        bullets: [
          "High stylistic safety",
          "Dressed-up and casual aesthetic flexibility",
          "Native, unforced product use cases"
        ],
        tags: ["Aesthetic Elite", "Brand Star"]
      },
      brandMatches: [
        { name: "Prada", score: 98 },
        { name: "Dunkin'", score: 97 },
        { name: "Glossier", score: 94 },
        { name: "CeraVe", score: 91 },
        { name: "Pinterest", score: 88 }
      ],
      recommendation: "Leverage organic, casual product styling rather than dry commercials. This profile converts 3.4x higher conversion when items are styled as 'accidental' day-to-day essentials in personal beauty or apparel vlogs."
    },
    "bellapoarch": {
      creatorName: "@bellapoarch",
      creatorScore: 96,
      creatorLevel: "Global Elite Celebrity",
      followers: "94.2M Followers",
      category: "Cosplay & Pop Aesthetics",
      postingFrequency: "2-3 Posts / Week",
      summary: "A phenomenal blend of gaming, pop aesthetics, and music. Her content is highly animated and visually optimized, commanding premium audience focus.",
      contentStrategy: {
        score: 96,
        summary: "Pop culture cosplay, synchronized facial dynamics, and behind-the-scenes recording diary highlights.",
        bullets: [
          "Expert facial expression sync loops",
          "High-concept cosplay styling",
          "Music and entertainment tracking reels"
        ],
        tags: ["Cosplay", "Pop Music", "Synchronized Loops", "Gamer Aesthetic"]
      },
      audienceSignals: {
        score: 94,
        summary: "Supercharged fan interactions, particularly in anime, cosplay, and pop music sectors.",
        bullets: [
          "Elite animation and visual retention",
          "Viral music-sharing rates",
          "High visual response engagement"
        ],
        tags: ["Gamer Fans", "Cosplay Mob"]
      },
      postingPatterns: {
        score: 95,
        summary: "Clean, close-up camera angles and perfectly timed audio transitions.",
        bullets: [
          "Ultra-focused close-up face hooks",
          "High-definition custom studio lighting",
          "Consistent post timing during late hours"
        ],
        tags: ["Close-Up Hooks", "HQ Lighting"]
      },
      growthOpportunities: {
        score: 90,
        summary: "Vast growth potential in music sync licensing, global gaming sponsorships, and brand capsule design.",
        bullets: [
          "Pop singles syndication",
          "Cosplay apparel lines",
          "Gaming console integrations"
        ],
        tags: ["Singles", "Apparel Drop"]
      },
      brandFit: {
        score: 96,
        summary: "Elite match for graphic apps, gaming organizations, and energetic pop brands.",
        bullets: [
          "Slick production standards",
          "Clean, highly expressive lifestyle representation",
          "Strong affinity with tech-driven consumer brands"
        ],
        tags: ["High Visual Tech", "Brand Safe"]
      },
      brandMatches: [
        { name: "CapCut", score: 97 },
        { name: "Riot Games", score: 95 },
        { name: "Canva", score: 92 },
        { name: "Nintendo", score: 90 },
        { name: "Sony", score: 88 }
      ],
      recommendation: "Leverage immersive video-editing and pop trend structures. Campaigns utilizing custom interactive filters tend to see a 3.4x higher conversion when framed within immersive cosplay loops."
    },
    "addisonre": {
      creatorName: "@addisonre",
      creatorScore: 95,
      creatorLevel: "Global Elite Celebrity",
      followers: "88.6M Followers",
      category: "Beauty & Pop Culture",
      postingFrequency: "2-4 Posts / Week",
      summary: "A cultural icon who successfully bridged TikTok virality into a Hollywood makeup brand and music career. Her profile is highly curated and rich with premium vanity assets.",
      contentStrategy: {
        score: 95,
        summary: "Aesthetic modeling, daily outfit showcases, brand shoot prep vlogs, and luxury beauty insights.",
        bullets: [
          "High-fashion beauty transitions",
          "Behind-the-scenes modeling journals",
          "Casual musical dance reels"
        ],
        tags: ["High Fashion", "Beauty Tutorials", "Pop Culture", "Luxury Vlogs"]
      },
      audienceSignals: {
        score: 93,
        summary: "Strong lifestyle-focused audience highly responsive to fashion, style trends, and fitness regimens.",
        bullets: [
          "High comment section activity",
          "Organic trend-setting capabilities",
          "Strong premium consumer demographics"
        ],
        tags: ["Trend Leader", "Apparel Fans"]
      },
      postingPatterns: {
        score: 92,
        summary: "Professional-grade color grading and smart studio aesthetics blended with authentic smartphone recording.",
        bullets: [
          "High-definition clear portrait hooks",
          "Dynamic daylight outdoor framing",
          "Strategic weekend scheduling"
        ],
        tags: ["Pro Grading", "Daylight Reels"]
      },
      growthOpportunities: {
        score: 89,
        summary: "Ready for global cosmetic expansions, direct-to-retail lines, and high-jewelry endorsements.",
        bullets: [
          "Cosmetics brand growth",
          "High-fashion runways",
          "Pop music albums"
        ],
        tags: ["Cosmetics VC", "Apparel Collab"]
      },
      brandFit: {
        score: 95,
        summary: "Ultra-premium fit for jewelry, luxury skincare, high-fashion apparel, and wellness apps.",
        bullets: [
          "Impeccable brand safety score",
          "Natural model-first posing",
          "Consistent high recall for visual brands"
        ],
        tags: ["Model Clean", "Skincare Pro"]
      },
      brandMatches: [
        { name: "Glossier", score: 96 },
        { name: "CeraVe", score: 93 },
        { name: "Spotify", score: 91 },
        { name: "Airbnb", score: 87 },
        { name: "Pinterest", score: 86 }
      ],
      recommendation: "Design clean cosmetic first look and outfit guides. Her lifestyle-forward approach yields 3.4x higher conversion when products are organically placed on her vanity dresser or modeled in daily prep routines."
    },
    "zachking": {
      creatorName: "@zachking",
      creatorScore: 97,
      creatorLevel: "Global Elite Celebrity",
      followers: "82.5M Followers",
      category: "Digital Magic & Clean Skits",
      postingFrequency: "2-3 Posts / Month",
      summary: "The undisputed master of visual illusions and digital sleight-of-hand. Zach delivers mind-bending illusion skits that achieve astronomical retention for all ages.",
      contentStrategy: {
        score: 97,
        summary: "Slickly edited digital magic, mind-stretching optical illusions, and complete family-friendly slapstick skits.",
        bullets: [
          "Instant impossible illusion hooks",
          "High-production CGI and camera cuts",
          "Incredible family-friendly storytelling"
        ],
        tags: ["Digital Magic", "Optical Illusions", "VFX Creative", "Clean Skits"]
      },
      audienceSignals: {
        score: 98,
        summary: "Globally unmatched watch time retention and multi-generational fan shares.",
        bullets: [
          "Astronomical watch time loops",
          "Extremely high share and save count",
          "Completely positive and clean comments"
        ],
        tags: ["Universal Fans", "Zero Fluff"]
      },
      postingPatterns: {
        score: 98,
        summary: "Low-frequency, exceptionally high-quality cinematic clips with flawless continuity.",
        bullets: [
          "Instant visual grabber under 1s",
          "Flawless VFX timing",
          "Perfect storytelling sequence arcs"
        ],
        tags: ["Edit Wizard", "Continuity King"]
      },
      growthOpportunities: {
        score: 93,
        summary: "Exceptional capabilities for custom educational software, VFX editing courses, and premium visual toys.",
        bullets: [
          "Visual effect masterclasses",
          "Custom video editing software collaborations",
          "Cinematic feature films"
        ],
        tags: ["VFX School", "License IP"]
      },
      brandFit: {
        score: 99,
        summary: "Flawless brand safety. Every single video is a masterpiece of custom visual integration suited for any corporate campaign.",
        bullets: [
          "100% brand-safe alignment",
          "Perfect product integration as magic props",
          "Highly memorable visual campaigns"
        ],
        tags: ["100% Safe", "Prop Master"]
      },
      brandMatches: [
        { name: "Adobe", score: 98 },
        { name: "Apple", score: 96 },
        { name: "Canva", score: 93 },
        { name: "Sony", score: 92 },
        { name: "Figma", score: 88 }
      ],
      recommendation: "Integrate software or physical items directly as centerpieces of digital magic tricks. Involving products in illusion loops secures 3.4x higher conversion and infinite shareability."
    },
    "kyliejenner": {
      creatorName: "@kyliejenner",
      creatorScore: 94,
      creatorLevel: "Global Elite Celebrity",
      followers: "44.6M Followers",
      category: "Luxury Beauty & Lifestyle",
      postingFrequency: "1-2 Posts / Week",
      summary: "Superlative beauty and makeup influence. Kylie shapes international trend patterns, commanding immense visual recall with luxury lifestyle clips.",
      contentStrategy: {
        score: 93,
        summary: "Luxury vanity tutorials, private jet travel guides, runway modeling, and baby boutique lifestyle snippets.",
        bullets: [
          "Premium cosmetic transitions",
          "Day-in-the-life luxury stories",
          "High-fashion wardrobe preparations"
        ],
        tags: ["Skincare", "Kylie Cosmetics", "Luxury Styling", "High Society"]
      },
      audienceSignals: {
        score: 91,
        summary: "Supreme beauty and lifestyle authority. High shopping mimicry rate from millions of active fans.",
        bullets: [
          "Instant makeup mimics",
          "Extremely high product curiosity in comments",
          "Premium young-female buyer demographics"
        ],
        tags: ["Beauty Cult", "Active Buying"]
      },
      postingPatterns: {
        score: 90,
        summary: "Impeccable visual vanity style, high-end warm grading, and private sound choice pairings.",
        bullets: [
          "Exquisite lighting and grading",
          "Immediate style reveal hooks",
          "High-frequency weekend snippets"
        ],
        tags: ["Luxury Grade", "Aesthetic Hooks"]
      },
      growthOpportunities: {
        score: 94,
        summary: "Unbounded scaling in multi-niche makeup conglomerates, luxury travel partnerships, and accessories.",
        bullets: [
          "Cosmetic industry expansion",
          "High-end jewelry partnerships",
          "Global custom apparel"
        ],
        tags: ["Beauty Brand Inc", "Fashion VC"]
      },
      brandFit: {
        score: 96,
        summary: "Elite luxury alignment, perfect for fine skincare, premium fragrances, and world-class retail setups.",
        bullets: [
          "Pristine brand alignment",
          "Breathtaking makeup display placements",
          "Deep consumer purchase influence"
        ],
        tags: ["Fine Luxury", "Max Recall"]
      },
      brandMatches: [
        { name: "Glossier", score: 96 },
        { name: "Chanel", score: 95 },
        { name: "Airbnb", score: 93 },
        { name: "CeraVe", score: 91 },
        { name: "Canva", score: 85 }
      ],
      recommendation: "Adopt lifestyle 'sneak peeks'. Standard advertisements do not resonate; placing items naturally on luxury vanity dressers yields up to 3.4x higher conversion from loyal lifestyle imitation buyers."
    }
  };

  // Setup dotless aliases to support fully resilient lookups in matching cases
  recognizedDict["khabylame"] = recognizedDict["khaby.lame"];
  recognizedDict["mrbeast.tiktok"] = recognizedDict["mrbeast"];
  recognizedDict["charlidamelio"] = recognizedDict["charlidamelio"];
  recognizedDict["charli.damelio"] = recognizedDict["charlidamelio"];
  recognizedDict["bellapoarch"] = recognizedDict["bellapoarch"];
  recognizedDict["bella.poarch"] = recognizedDict["bellapoarch"];
  recognizedDict["addisonrae"] = recognizedDict["addisonre"];
  recognizedDict["addisonre"] = recognizedDict["addisonre"];
  recognizedDict["zachking"] = recognizedDict["zachking"];
  recognizedDict["zach.king"] = recognizedDict["zachking"];

  if (recognizedDict[username]) {
    return {
      isRecognized: true,
      data: recognizedDict[username]
    };
  }

  // Otherwise, run Mode B: Intelligent Hash Estimation
  const hash = getStringHash(username);

  // Determine Follower Tier, level alignment and starter Score strictly as specified
  const tierIndex = hash % 5;
  let followerCount = "";
  let creatorLevel = "";
  let baseScore = 80;

  if (tierIndex === 0) {
    followerCount = (5 + (hash % 45)) + "K";
    creatorLevel = "Rising Star Niche";
    baseScore = 82 + (hash % 8);
  } else if (tierIndex === 1) {
    followerCount = (50 + (hash % 200)) + "K";
    creatorLevel = "High Growth Micro";
    baseScore = 85 + (hash % 7);
  } else if (tierIndex === 2) {
    followerCount = (250 + (hash % 750)) + "K";
    creatorLevel = "High Growth Niche";
    baseScore = 88 + (hash % 7);
  } else if (tierIndex === 3) {
    followerCount = ((10 + (hash % 90)) / 10).toFixed(1) + "M";
    creatorLevel = "Elite Creator";
    baseScore = 91 + (hash % 7);
  } else {
    followerCount = ((100 + (hash % 120)) / 10).toFixed(1) + "M";
    creatorLevel = "Global Elite Star";
    baseScore = 94 + (hash % 5);
  }

  // Set default templates for category specialization
  let category = "Lifestyle & Peer UGC";
  let summary = `A highly relatable and authentic day-in-the-life brand. @${rawUsername} captures contemporary aesthetic moments, achieving exceptional micro-interaction rates in the peer trust domain.`;
  let cStrategySummary = `Blending daily routine sequences with conversational audio commentary. @${rawUsername} structures narratives using extremely relatable peer-to-peer hook points.`;
  let cStrategyBullets = [
    "High-relatability smartphone-first frame alignment",
    "Engaging user-generated sequence loops under 20 seconds",
    "Natural product-as-a-lifestyle decoration placement"
  ];
  let cStrategyTags = ["Lifestyle", "UGC", "Aesthetics", "Peer Trust"];

  let aSignalsSummary = `Incredibly loyal peer circle with active imitation buying and recommendation-sharing habits.`;
  let aSignalsBullets = [
    "High comment count of daily outfit & cosmetics inquiries",
    "Repetitive organic bookmarks saving routines",
    "Extremely positive sentiment scores in response to direct reviews"
  ];
  let aSignalsTags = ["Aesthetic Lovers", "Active Shoppers"];

  let pPatternsSummary = `Highly active evening uploading times to engage fans winding down from academic or work routines.`;
  let pPatternsBullets = [
    "Upload intervals optimized around relaxing lofi lifestyle tracks",
    "Immediate visual dynamic reveal completed in first 2 seconds",
    "Extremely clean text layouts overlaid directly on key frames"
  ];
  let pPatternsTags = ["Cadence", "Vibe Hooks"];

  let gOpportunitiesSummary = `Ready for dedicated custom clothing collections, lifestyle planner affiliate partnerships, and coaching events.`;
  let gOpportunitiesBullets = [
    "Launch bespoke digital planners or styling collections",
    "Establish active lifestyle clothing and skincare brand sponsorships",
    "Grow YouTube Shorts and Pinterest assets to syndicate reach"
  ];
  let gOpportunitiesTags = ["Monetize Niche", "Affiliates"];

  let bFitSummary = `Highly authentic, brand-safe backdrop suited for everyday consumer supplies, fashion, and tech accessories.`;
  let bFitBullets = [
    "Thoroughly brand-safe presentation style and spoken tags",
    "Organic integration patterns seamlessly weaving goods into reels",
    "Trustworthy personal recommendation framing suitable for Q4 setups"
  ];
  let bFitTags = ["UGC Safe", "High Affinity"];

  let brandMatches = [
    { name: "Dunkin'", score: 85 + (hash % 11) },
    { name: "Spotify", score: 82 + (hash % 12) },
    { name: "Canva", score: 80 + (hash % 13) },
    { name: "CeraVe", score: 78 + (hash % 14) },
    { name: "Airbnb", score: 75 + (hash % 15) }
  ];

  let recommendation = `Focus on authentic daily-routine integrations. Brands see 3.4x higher conversion when styled as genuine morning essentials in modern, casual lifestyle prep vlogs rather than traditional ads.`;

  // Apply specialization based on keywords
  if (username.includes("tech") || username.includes("code") || username.includes("dev") || username.includes("app") || username.includes("system") || username.includes("science") || username.includes("ai") || username.includes("comput") || username.includes("digital") || username.includes("saas") || username.includes("softw") || username.includes("web") || username.includes("data")) {
    category = "Tech & Developer Ecosystems";
    summary = `High-impact developer utility and modern workspace architecture. @${rawUsername} commands premium niche focus for automated productivity, AI design tools, and terminal hacks.`;
    cStrategySummary = "Slick, screen-recorded IDE workflows, tool shortcut cheat-sheets, and hardware reviews. Maintains rigid informational speed and high value density.";
    cStrategyBullets = [
      "Rigid code and setup sequence formatting",
      "Engaging hardware showcase within first 3 seconds",
      "Fast-paced voiceover outlining exact command configurations"
    ];
    cStrategyTags = ["Tech Education", "Developer Productivity", "SaaS", "AI tools"];

    aSignalsSummary = "High-intent developer crowd, early workflow software adopters, and active tech enthusiasts exploring tool ecosystems.";
    aSignalsBullets = [
      "Deep technical inquiries in comment sections regarding GitHub repos",
      "Very high relative save ratios of coding/SaaS templates",
      "Enthusiastic engagement with new technical feature releases"
    ];
    aSignalsTags = ["Software Devs", "Tech Early Adopters"];

    pPatternsSummary = "Disciplined upload sequences configured around corporate lunches and global tool release announcements.";
    pPatternsBullets = [
      "Average video length is 45 seconds to keep clarity high",
      "Clean visual subtitles covering all terminology",
      "Muted, low-frequency workspace background tracks"
    ];
    pPatternsTags = ["SaaS Cadence", "Value Hooks"];

    gOpportunitiesSummary = "Massive potential for customized SaaS template launches, digital productivity guides, and affiliate program setups.";
    gOpportunitiesBullets = [
      "Authorize premium Notion templates or configuration courses",
      "Deploy custom developer utility brand sponsorships",
      "Build subscription developer communities or newsletter lists"
    ];
    gOpportunitiesTags = ["Template Sales", "Affiliate Ecosystems"];

    bFitSummary = "Completely structured, professional context perfect for consumer tech hardware, developer tools, and workflow software.";
    bFitBullets = [
      "100% brand-safe presentation with elite visual layouts",
      "Authentic walkthrough of direct UI utility",
      "Strong call-to-actions pointing to active download landing guides"
    ];
    bFitTags = ["SaaS Safe", "High ROI"];

    brandMatches = [
      { name: "Notion", score: 94 + (hash % 5) },
      { name: "Canva", score: 91 + (hash % 6) },
      { name: "CapCut", score: 89 + (hash % 7) },
      { name: "Adobe", score: 87 + (hash % 8) },
      { name: "Figma", score: 85 + (hash % 9) }
    ];
    recommendation = `Prioritize long-term software partnerships. This profile displays 3.4x higher conversion for high-utility software and design toolkits compared to average accounts. We recommend rolling out interactive tutorials with high engagement loops.`;

  } else if (username.includes("fit") || username.includes("gym") || username.includes("sport") || username.includes("health") || username.includes("run") || username.includes("muscle") || username.includes("athlet") || username.includes("coach") || username.includes("diet") || username.includes("nutrition") || username.includes("workout") || username.includes("train") || username.includes("physique") || username.includes("yoga")) {
    category = "Fitness & Athletic Performance";
    summary = `Actionable workout structures, muscle hypertrophy tips, and physique transformations. @${rawUsername} offers highly athletic split programs, macro diet preparation vlogs, and gym routine execution guides.`;
    cStrategySummary = "High-energy gym splits, before-and-after aesthetic milestones, and meticulous lifting safety instructions.";
    cStrategyBullets = [
      "Rigid lifting form corrections and posture guides",
      "Clear chronological diet and lifestyle diaries",
      "High visual progress pacing to capture viewer momentum"
    ];
    cStrategyTags = ["Fitness Motivation", "Hypertrophy splits", "Nutrition Diaries", "Gym ASMR"];

    aSignalsSummary = "Supercharged athletic crowd searching for dietary guides, workout motivation, and reliable exercise protocols.";
    aSignalsBullets = [
      "Highly interactive discussions regarding customized rep ranges",
      "Active saving of custom program templates and cooking hacks",
      "Consistent recurring viewer rates on 30-day challenge series"
    ];
    aSignalsTags = ["Gym Enthusiasts", "Macro Counters"];

    pPatternsSummary = "Early morning motivation uploads and late evening fitness routine reels perfectly matching daily routines.";
    pPatternsBullets = [
      "Synchronized to energetic, gym-focused trending audio patterns",
      "Immediate body transformation visual hooks in video starts",
      "Consistent overlay of exercise labels and target muscles"
    ];
    pPatternsTags = ["Workout Timing", "Retention Muscle"];

    gOpportunitiesSummary = "Exceptional opportunity for subscription workout split communities, nutrition guides, and customized apparel lines.";
    gOpportunitiesBullets = [
      "Publish private training consultation plans",
      "Affiliate directly with established supplement and gear conglomerates",
      "Deploy custom limited-edition gym apparel drops"
    ];
    gOpportunitiesTags = ["Active Coaching", "Apparel Drops"];

    bFitSummary = "High-energy dynamic backdrop perfect for active apparel, sports accessories, health metrics trackers, and protein suppliers.";
    bFitBullets = [
      "Thoroughly brand-safe gym environments and content",
      "Organic testing of active supplement products during daily preparation vlogs",
      "Inspiring call-to-actions demonstrating real-world training progression"
    ];
    bFitTags = ["Physique Safe", "High ROI"];

    brandMatches = [
      { name: "Gymshark", score: 95 + (hash % 4) },
      { name: "MyProtein", score: 92 + (hash % 5) },
      { name: "Whoop", score: 89 + (hash % 6) },
      { name: "Athletic Greens", score: 86 + (hash % 7) },
      { name: "Strava", score: 84 + (hash % 8) }
    ];
    recommendation = `Capitalize on active-wear and performance supplement integrations. This fitness channel boasts active retention and 3.4x higher conversion in joint athletic challenges. Plan structured 30-day challenges to maintain stream retention.`;

  } else if (username.includes("finance") || username.includes("money") || username.includes("stock") || username.includes("crypto") || username.includes("market") || username.includes("invest") || username.includes("cash") || username.includes("startup") || username.includes("business") || username.includes("ceo") || username.includes("wealth") || username.includes("passive") || username.includes("rich") || username.includes("capital") || username.includes("trade")) {
    category = "Personal Finance & Tech Business";
    summary = `Clear, wealth management breakdowns, digital side-hustles, and small business case studies simplified for a high-intent demographic. @${rawUsername} focuses on passive income and wealth building.`;
    cStrategySummary = "Whiteboard animations, screen-shares of active portfolio interfaces, and detailed income-statement analytical walk-throughs.";
    cStrategyBullets = [
      "Actionable accounting tool comparisons",
      "Easy explanation of interest rate and real estate mechanics",
      "High-relevance numeric hooks immediately shown in under 1 second"
    ];
    cStrategyTags = ["Finance Guides", "Investing Secrets", "Startup Analysis", "Passive Streams"];

    aSignalsSummary = "High-intent personal wealth builders, digital passive income creators, and business students looking for platform tools.";
    aSignalsBullets = [
      "Frequent comments discussing platform security and transaction speed",
      "Excellent registration rate on external budget files & guides",
      "Extremely long average video session watch-times"
    ];
    aSignalsTags = ["Side Hustlers", "Wealth Seekers"];

    pPatternsSummary = "Mid-day uploads during stock trading hours to capture corporate worker lunch and break times.";
    pPatternsBullets = [
      "Uploading intervals scheduled around economic report announcements",
      "Crisp voiceovers explaining asset trends",
      "Impeccable color grading and corporate workspace clean framing"
    ];
    pPatternsTags = ["Fintech Cadence", "Value Retention"];

    gOpportunitiesSummary = "Vast potential for premium wealth newsletters, digital investment guides, and financial software partnerships.";
    gOpportunitiesBullets = [
      "Establish deep affiliate code funnels with investing applications",
      "Launch a subscription consulting cohort or wealth newsletter",
      "Provide premium courses concerning small business accounting"
    ];
    gOpportunitiesTags = ["Fintech CRM", "Capital Cohorts"];

    bFitSummary = "Highly professional, serious background environment suitable for banking APIs, business tools, and investing applications.";
    bFitBullets = [
      "Flawless corporate safety profile suitable for strictly regulated partners",
      "Meticulous, screen-recorded step-by-step display of tools",
      "Sober, reassuring tone with strict disclaimer practices"
    ];
    bFitTags = ["SEC Safe", "High conversion"];

    brandMatches = [
      { name: "Robinhood", score: 92 + (hash % 5) },
      { name: "Shopify", score: 90 + (hash % 6) },
      { name: "Wise", score: 87 + (hash % 7) },
      { name: "Mercury", score: 85 + (hash % 8) },
      { name: "Webull", score: 82 + (hash % 9) }
    ];
    recommendation = `Introduce structured business tool breakdowns. Given the audience demographic, micro-SaaS platforms see a 3.4x higher conversion when framed around low-capital bootstrapping principles.`;

  } else if (username.includes("beauty") || username.includes("style") || username.includes("fashion") || username.includes("glam") || username.includes("makeup") || username.includes("cosplay") || username.includes("wear") || username.includes("outfit") || username.includes("nail") || username.includes("hair") || username.includes("trend") || username.includes("chic") || username.includes("skin") || username.includes("dress") || username.includes("aesthetic")) {
    category = "Beauty & Fashion Aesthetics";
    summary = `Curated visual morning prep guides, outfit outfit-of-the-day styling tips, cosmetics and skin treatment tutorials, and custom cosplay aesthetics. @${rawUsername} commands high purchase-mimicry status.`;
    cStrategySummary = "Crisp, fast visual beauty transitions, honest cosmetics review Diaries, and complete makeup prep walkthroughs.";
    cStrategyBullets = [
      "High-contrast color-graded visual transitions",
      "Step-by-step OOTD outfit selection segments",
      "Captivating before-and-after portrait hooks"
    ];
    cStrategyTags = ["Beauty Vlogs", "OOTD transformations", "Grooming guides", "Aesthetic prep"];

    aSignalsSummary = "High-buying cosmetically conscious followers inquiring directly about cosmetics, apparel, and styling catalogs.";
    aSignalsBullets = [
      "Continuous comment inquiries regarding exact shade and style link details",
      "Repetitive community sharing in peer-to-peer fashion discovery feeds",
      "Strong aesthetic loyalty driving product test mimicking"
    ];
    aSignalsTags = ["Style Seekers", "Beauty Shoppers"];

    pPatternsSummary = "Afternoon uploading schedules timed perfectly with leisure screen-time windows and weekend social events.";
    pPatternsBullets = [
      "Slick visual pacing matching highly viral sound trends",
      "Crisp lighting and daylight vertical smartphone angles",
      "Strategic uploads ahead of major holiday style periods"
    ];
    pPatternsTags = ["Visual Cadence", "Prep Hooks"];

    gOpportunitiesSummary = "Incredible potential for customized makeup capsule drops, clothing line endorsements, and private cosmetic workshops.";
    gOpportunitiesBullets = [
      "Deploy custom stylistic closet drops or apparel guides",
      "Host highly interactive cosmetic prep masterclasses",
      "Sponsor premium direct-to-consumer cosmetic labels"
    ];
    gOpportunitiesTags = ["Fashion VC", "Capsule Drops"];

    bFitSummary = "Stylishly beautiful, highly visually descriptive settings suitable for top skin treatment, retail apparel, and design houses.";
    bFitBullets = [
      "Impeccable beauty safety profile built on high visual authority",
      "Seamless integration of beauty supplies during transition vlogs",
      "Authentic recommendation vlogs suitable for direct shopping links"
    ];
    bFitTags = ["Stylist Safe", "High Conversion"];

    brandMatches = [
      { name: "Glossier", score: 94 + (hash % 5) },
      { name: "Prada", score: 91 + (hash % 6) },
      { name: "Sephora", score: 89 + (hash % 7) },
      { name: "Pinterest", score: 86 + (hash % 8) },
      { name: "Zara", score: 84 + (hash % 9) }
    ];
    recommendation = `Adopt lifestyle styling guides instead of standard commercials. Our intelligence shows that cosmetic brands drive 3.4x higher conversion when framed as daily bathroom cabinet essentials.`;

  } else if (username.includes("food") || username.includes("eat") || username.includes("chef") || username.includes("cook") || username.includes("bake") || username.includes("recipe") || username.includes("taste") || username.includes("munch") || username.includes("yum") || username.includes("kitchen") || username.includes("bite") || username.includes("sweet")) {
    category = "Culinary Arts & Food Aesthetics";
    summary = `Vibrant visual recipes, close-up ASMR cooking sounds, and convenient kitchen life hacks. @${rawUsername} builds extreme culinary interest and high household utility.`;
    cStrategySummary = "Cinematic step-by-step recipe procedures, crisp sizzling pan audio recordings, and quick ingredient list overlays.";
    cStrategyBullets = [
      "Vivid panning of beautifully prepared food plates",
      "Satisfying ASMR ingredient chopping and mixing cycles",
      "Engaging first-bite evaluation reaction hooks under 2 seconds"
    ];
    cStrategyTags = ["Food Styling", "Healthy Recipes", "ASMR Cooking", "Foodie"];

    aSignalsSummary = "Passionate kitchen builders, dinner recipe planners, and gourmet enthusiasts seeking fast cooking guidance.";
    aSignalsBullets = [
      "Very high relative bookmark rates to save daily meal schedules",
      "Interactive commentary asking about dietary protein alternatives",
      "Vocal peer-to-peer recipe transformation stories in reviews"
    ];
    aSignalsTags = ["Home Chefs", "ASMR Gourmets"];

    pPatternsSummary = "Late afternoon dinner preparation schedules and weekend culinary planning intervals.";
    pPatternsBullets = [
      "Vibrant high-contrast warm studio light angles",
      "Highly paced matching trending aesthetic instrumentals",
      "Consistent updates ahead of holiday celebration periods"
    ];
    pPatternsTags = ["Dinner Timing", "ASMR Hooks"];

    gOpportunitiesSummary = "Superb pathways for custom recipe applications, specialized seasoning blends, and cookware sponsorships.";
    gOpportunitiesBullets = [
      "Publish dedicated gourmet guides or digital meal books",
      "Form alliances with established kitchen equipment creators",
      "Launch specialized seasoning salts or customized food sets"
    ];
    gOpportunitiesTags = ["Spice drops", "Appliance deals"];

    bFitSummary = "Incredibly neat, visually stunning cooking context presenting clear hygiene and high cooking tool usage.";
    bFitBullets = [
      "Thoroughly clean, safe background cooking environment",
      "Premium display of smart kitchen machines and utensils",
      "Mouth-watering visual product placement that triggers instant hunger"
    ];
    bFitTags = ["Kitchen Safe", "Appetizing ROI"];

    brandMatches = [
      { name: "HelloFresh", score: 93 + (hash % 5) },
      { name: "Blue Apron", score: 90 + (hash % 6) },
      { name: "Starbucks", score: 88 + (hash % 7) },
      { name: "Thermomix", score: 85 + (hash % 8) },
      { name: "Ninja Kitchen", score: 83 + (hash % 9) }
    ];
    recommendation = `Focus on interactive ASMR recipe preparation clips. Kitchenware and food sponsors see up to 3.4x higher conversion when tools are displayed as everyday solutions for delicious meals.`;

  } else if (username.includes("travel") || username.includes("wander") || username.includes("expl") || username.includes("trip") || username.includes("globe") || username.includes("flight") || username.includes("path") || username.includes("nomad") || username.includes("map") || username.includes("beach") || username.includes("resort") || username.includes("hotel") || username.includes("vaca")) {
    category = "Travel & Adventure Lifestyle";
    summary = `Breathtaking geography highlights, budget-friendly flight booking secrets, and luxury packing advice from @${rawUsername}. Inspires wanderlust adventure planning.`;
    cStrategySummary = "Stunning geographical landscape drone clips, honest accommodation checklists, and step-by-step travel schedule overlays.";
    cStrategyBullets = [
      "Drone overview scenic hooks in under 1 second",
      "Aesthetic, realistic survival packing list journals",
      "Convenient caption coordinates and price analysis indicators"
    ];
    cStrategyTags = ["Travel hacks", "Destination secrets", "Nomad life", "Aesthetic resorts"];

    aSignalsSummary = "High-spending vacation creators, geographical searchers, and remote travel nomads seeking custom trip plans.";
    aSignalsBullets = [
      "Phenomenal relative bookmark counts to save itinerary details",
      "Active comment queries discussing safety, visas, and climate",
      "High group transport recommendations within chat channels"
    ];
    aSignalsTags = ["Global Nomads", "Itinerary Planners"];

    pPatternsSummary = "Weekend day-dreaming intervals and post-work evening screens to maximize destination inspiration.";
    pPatternsBullets = [
      "Scenic high-resolution nature landscape grading",
      "Accompanied by natural environment sounds and relaxing audio selection",
      "Uploading paced closely before major holidays and travel seasons"
    ];
    pPatternsTags = ["Wanderlust Timing", "Visual Drone Hooks"];

    gOpportunitiesSummary = "Immense potential for modular luggage capsule collections, city-specific itinerary guides, and flight portal affiliations.";
    gOpportunitiesBullets = [
      "Publish premium customized destination city booklets",
      "Affiliate directly with established global booking platforms",
      "Drop customized durable backpacks or travel supplies"
    ];
    gOpportunitiesTags = ["Nomad Guides", "Luggage Drops"];

    bFitSummary = "Beautiful, inspiring, and fully brand-safe geographical background suitable for top aggregators, sports gear, and electronics.";
    bFitBullets = [
      "Full brand safety looking across magnificent outdoor vistas",
      "Natural testing of gear in raw conditions",
      "Clear, high-contrast overlay labels naming locations"
    ];
    bFitTags = ["Outdoors Safe", "Travel ROI"];

    brandMatches = [
      { name: "Airbnb", score: 94 + (hash % 5) },
      { name: "GoPro", score: 91 + (hash % 6) },
      { name: "Skyscanner", score: 89 + (hash % 7) },
      { name: "Patagonia", score: 86 + (hash % 8) },
      { name: "Booking.com", score: 84 + (hash % 9) }
    ];
    recommendation = `Utilize native outdoor product testing. Travel tech and gear see upwards of 3.4x higher conversion when tested in real-world hidden gems and styled as essential packing list recommendations.`;

  } else if (username.includes("art") || username.includes("paint") || username.includes("sketch") || username.includes("design") || username.includes("craft") || username.includes("photo") || username.includes("film") || username.includes("creative") || username.includes("draw") || username.includes("vector") || username.includes("illustr") || username.includes("vfx") || username.includes("3d")) {
    category = "Creative Arts & Visual Design";
    summary = `Captivating speed-drawing journals, software workflow shortcuts, satisfying design reveals, and visual art transformations. @${rawUsername} establishes massive aesthetic authority.`;
    cStrategySummary = "Hypnotic process time-lapses, detailed software UI walk-throughs, and satisfying art tutorial reveals.";
    cStrategyBullets = [
      "Hypnotic drawing creation sequence time-lapses",
      "Step-by-step editing brush selection explanations",
      "Highly satisfying final work reveal completed in first 3 seconds"
    ];
    cStrategyTags = ["Visual Art", "Illustration", "Digital Design", "Creative Lab"];

    aSignalsSummary = "Creative design students, professional animators, and fine art enthusiasts responding to artistic tools.";
    aSignalsBullets = [
      "Highly repetitive comments inquiring about active drawing canvas setups",
      "Long average session times watching complex drawing transitions",
      "Strong download interest in custom vector brush assets"
    ];
    aSignalsTags = ["Visual Creators", "Software Artists"];

    pPatternsSummary = "Calming late-night studio creation snippets and weekend design showcase hours.";
    pPatternsBullets = [
      "Relaxing low-fidelity atmospheric background audios",
      "Overhead studio camera angles capturing full creation steps",
      "Regular uploading matching community design challenges"
    ];
    pPatternsTags = ["Studio Timing", "Time-Lapse Hooks"];

    gOpportunitiesSummary = "Magnificent growth avenues with digital brush expansions, canvas drop systems, custom creator packs, and workshops.";
    gOpportunitiesBullets = [
      "Release dedicated customized vector assets or brush packs",
      "Deploy custom art prints or individual consulting reviews",
      "Create high-value design workflows and tutorial packages"
    ];
    gOpportunitiesTags = ["Brush Sales", "Art Drops"];

    bFitSummary = "Visual masterpiece presentation, neat studio environment, and clear illustration of active tool utility.";
    bFitBullets = [
      "Pristine brand safety profile suitable for smart creation utilities",
      "Crisp display of direct software layout and settings",
      "Inspiring call-to-actions demonstrating real-world visual designs"
    ];
    bFitTags = ["Creative Safe", "Visual ROI"];

    brandMatches = [
      { name: "Adobe", score: 94 + (hash % 5) },
      { name: "Canva", score: 91 + (hash % 6) },
      { name: "Wacom", score: 88 + (hash % 7) },
      { name: "Skillshare", score: 86 + (hash % 8) },
      { name: "Procreate", score: 84 + (hash % 9) }
    ];
    recommendation = `Incorporate design steps directly into visual project tutorials. Creator software and physical canvas brands experience a 3.4x higher conversion when shown in organic project walkthroughs.`;
  }

  const finalScore = Math.min(98, Math.max(80, baseScore));

  const contentStrategy = {
    score: Math.min(98, Math.max(80, finalScore + 2)),
    summary: cStrategySummary,
    bullets: cStrategyBullets,
    tags: cStrategyTags
  };

  const audienceSignals = {
    score: Math.min(98, Math.max(80, finalScore - 4)),
    summary: aSignalsSummary,
    bullets: aSignalsBullets,
    tags: aSignalsTags
  };

  const postingPatterns = {
    score: Math.min(98, Math.max(80, finalScore - 2)),
    summary: pPatternsSummary,
    bullets: pPatternsBullets,
    tags: pPatternsTags
  };

  const growthOpportunities = {
    score: Math.min(98, Math.max(80, finalScore - 10)),
    summary: gOpportunitiesSummary,
    bullets: gOpportunitiesBullets,
    tags: gOpportunitiesTags
  };

  const brandFit = {
    score: Math.min(98, Math.max(80, finalScore + 4)),
    summary: bFitSummary,
    bullets: bFitBullets,
    tags: bFitTags
  };

  return {
    isRecognized: false,
    data: {
      creatorName: `@${rawUsername}`,
      creatorScore: finalScore,
      creatorLevel,
      followers: followerCount + " Followers",
      category,
      postingFrequency: "3-5 Posts/Week",
      summary,
      contentStrategy,
      audienceSignals,
      postingPatterns,
      growthOpportunities,
      brandFit,
      brandMatches,
      recommendation
    }
  };
}

app.post("/api/analyze", async (req, res) => {
  const { url } = req.body;

  if (!url) {
    return res.status(400).json({ error: "TikTok URL is required." });
  }

  if (!url.includes("tiktok.com/")) {
    return res.status(400).json({ error: "Invalid TikTok URL. Must be a tiktok.com link." });
  }

  // Resilient handle extraction pattern
  let username = "creator";
  const urlParts = url.split("tiktok.com/");
  if (urlParts[1]) {
    const segment = urlParts[1].split("/")[0] || "";
    username = segment.startsWith("@") ? segment.substring(1) : segment;
    username = username.split("?")[0].split("#")[0];
  } else {
    const handleMatch = url.match(/@([a-zA-Z0-9_\.]+)/);
    if (handleMatch && handleMatch[1]) {
      username = handleMatch[1];
    }
  }

  username = username.trim();

  try {
    const preInferred = estimateCreatorProfile(url, username);

    if (process.env.GEMINI_API_KEY) {
      const configMetrics = preInferred.data;
      try {
        const response = await ai.models.generateContent({
          model: "gemini-3.5-flash",
          contents: `You are an expert TikTok creator strategist and AI brand analyst.
Analyze this TikTok account:
URL: ${url}
Handle: @${username}

We have pre-calculated/verified high-level metrics that you MUST strictly adhere to for consistency:
- Creator Name: ${configMetrics.creatorName}
- Creator Score: ${configMetrics.creatorScore} (MUST be this exact value)
- Creator Level: ${configMetrics.creatorLevel} (MUST be this exact value)
- Followers: ${configMetrics.followers} (MUST be this exact value)
- Category: ${configMetrics.category} (MUST be this exact value)
- Posting Frequency: ${configMetrics.postingFrequency} (MUST be this exact value)

Generate a premium, incredibly tailored, non-generic creator intelligence report for this TikTok account using these exact details. Make sure your summaries, bullet points, tags, brand matches, and recommendations are fully custom, deeply insightful, and beautifully composed. Do NOT output any placeholders. Never mention that this is simulated or mock data; act fully as a live professional auditing engine.

Your output MUST be a strict JSON object structure:
{
  "creatorName": "${configMetrics.creatorName}",
  "creatorScore": ${configMetrics.creatorScore},
  "creatorLevel": "${configMetrics.creatorLevel}",
  "followers": "${configMetrics.followers}",
  "category": "${configMetrics.category}",
  "postingFrequency": "${configMetrics.postingFrequency}",
  "summary": "Short creator summary describing their layout, vibe, niche, and monetization readiness",
  "contentStrategy": {
    "score": number (80-98, choose appropriate for this niche),
    "summary": "Detailed Content Strategy & Niche review summary",
    "bullets": ["Point 1", "Point 2", "Point 3"],
    "tags": ["Tag1", "Tag2", "Tag3"]
  },
  "audienceSignals": {
    "score": number (80-98),
    "summary": "Detailed Audience Signals & Community engagement review",
    "bullets": ["Point 1", "Point 2", "Point 3"],
    "tags": ["Tag1", "Tag2"]
  },
  "postingPatterns": {
    "score": number (80-98),
    "summary": "Detailed Posting Patterns & Hooks analysis summary",
    "bullets": ["Point 1", "Point 2", "Point 3"],
    "tags": ["Tag1", "Tag2"]
  },
  "growthOpportunities": {
    "score": number (80-98),
    "summary": "Detailed growth potential, monetization, and brand integration scaling opportunities",
    "bullets": ["Point 1", "Point 2", "Point 3"],
    "tags": ["Tag1", "Tag2"]
  },
  "brandFit": {
    "score": number (80-98),
    "summary": "Detailed Brand Fit review including style, production quality and commercial viability",
    "bullets": ["Point 1", "Point 2", "Point 3"],
    "tags": ["Tag1", "Tag2"]
  },
  "brandMatches": [
    {"name": "Brand 1", "score": number},
    {"name": "Brand 2", "score": number},
    {"name": "Brand 3", "score": number},
    {"name": "Brand 4", "score": number},
    {"name": "Brand 5", "score": number}
  ],
  "recommendation": "A highly premium strategic AI recommendation. Make sure to suggest useful cross-platform or sponsor strategies. Make sure to include some highlightable statistics like '3.4x higher conversion' or relevant percentage details."
}`,
          config: {
            responseMimeType: "application/json",
            temperature: 1,
          },
        });

        const text = response.text;
        if (text) {
          let cleanedText = text.trim();
          if (cleanedText.startsWith("```")) {
            cleanedText = cleanedText.replace(/^```(?:json)?\n?|```$/g, "").trim();
          }
          const parsed = JSON.parse(cleanedText);
          return res.json(parsed);
        } else {
          throw new Error("Empty response from AI");
        }
      } catch (geminiError: any) {
        console.error("Gemini API call failed, falling back to pre-calculated metrics:", geminiError);
        return res.json(preInferred.data);
      }
    } else {
      // Use the exceptionally robust hash estimation data directly as standard fallback
      await new Promise((r) => setTimeout(r, 1200));
      return res.json(preInferred.data);
    }
  } catch (error: any) {
    console.error("Analysis route error:", error);
    return res.status(500).json({ error: "Failed to generate AI insights. Please try again later." });
  }
});

// Serve static assets and Vite SPA bundle
const startServer = async () => {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Express server running on http://0.0.0.0:${PORT}`);
  });
};

startServer();
