# TikScope

TikScope is an AI-powered creator intelligence platform that analyzes TikTok accounts to uncover performance signals, audience quality, growth opportunities, and brand partnership potential.

Users simply input a TikTok profile link, and TikScope generates structured insights that help brands, agencies, and outreach teams make smarter creator decisions.

---

## Overview

Influencer marketing has grown rapidly, but evaluating creators remains difficult.

Most brands still rely heavily on surface-level metrics like follower count and views.

The problem is simple:

Bigger numbers do not always mean better performance.

A creator with fewer followers may have stronger engagement, higher trust, and better conversion potential than a much larger creator.

TikScope solves this by providing deeper AI-powered creator analysis beyond vanity metrics.

Instead of manually researching profiles, brands and marketers can get quick, structured intelligence in seconds.

---

## Who TikScope Is For

TikScope is designed for:

- Marketing agencies  
- Brand managers  
- Influencer outreach teams  
- Social media strategists  
- Talent scouts  
- Startup founders  

Anyone evaluating creators for collaborations can use TikScope to make smarter partnership decisions.

---

## Features

### Creator Profile Analysis
Analyze TikTok creators instantly.

Extracts and evaluates:

- Username  
- Estimated followers  
- Posting activity  
- Content niche  
- Profile quality  

---

### AI Performance Scoring
Generates an overall creator score based on multiple performance signals.

Scoring considers:

- Content quality  
- Audience engagement  
- Posting consistency  
- Growth signals  

---

### Audience Signal Detection
Evaluates audience quality and engagement strength.

Insights include:

- Engagement quality  
- Audience interaction  
- Niche alignment  
- Audience trust signals  

---

### Growth Opportunity Detection
Identifies creators with strong growth momentum.

Helps answer:

- Is this creator growing fast?  
- Are they underrated?  
- Is this a strong time to collaborate?  

---

### Brand Fit Analysis
Measures how well a creator aligns with a brand or campaign.

Useful for:

- Influencer marketing  
- Sponsorship scouting  
- Outreach qualification  
- Campaign targeting  

---

### Strategic Recommendations
Provides actionable next steps such as:

- Strong partnership fit  
- Monitor for growth  
- Outreach opportunity  
- High-potential creator  

---

## Product Flow

```text
Landing Page
↓
Paste TikTok Profile Link
↓
AI Processing
↓
Results Dashboard
```

1. User pastes TikTok profile URL  
2. TikScope analyzes creator signals  
3. AI generates structured insights  
4. User reviews creator intelligence report  

---

## Architecture

```text
User Inputs TikTok Profile URL
↓
Profile Data Extraction
↓
Signal Estimation
↓
Gemini AI Analysis
↓
Generate Insights:
- Creator Score
- Audience Quality
- Growth Potential
- Brand Fit
↓
Display Results Dashboard
```

---

## Tech Stack

### Frontend
- React  
- TypeScript  
- Vite  

### Backend
- Serverless Functions  
- Node.js  

### AI
- Gemini API  

### Design
- Figma  

### Deployment
- Vercel  

---

## Screens

### Landing Page
Users input a TikTok profile URL to begin analysis.

### Processing Screen
TikScope evaluates creator signals and prepares AI insights.

### Results Screen
TikScope returns detailed creator intelligence including:

- Creator Score  
- Audience Signals  
- Growth Potential  
- Brand Fit  
- Recommendations  

---

## Why TikScope?

Brands often waste time and money partnering with creators based only on follower count.

Follower count alone is no longer enough.

What matters more is:

- Trust  
- Engagement  
- Relevance  
- Audience quality  

TikScope helps users move beyond vanity metrics and make data-informed partnership decisions.

The goal is simple:

Help brands identify better creators faster.

---

## Current Limitations

Due to limited access to official TikTok APIs, TikScope currently relies on estimated public signals and inferred analytics rather than direct private creator metrics.

This means some metrics are modeled rather than pulled from internal TikTok analytics.

Future versions may integrate:

- Official creator APIs  
- Advanced scraping pipelines  
- Third-party analytics providers  

---

## Challenges During Development

Key challenges while building TikScope included:

- Limited TikTok API access  
- Restricted creator analytics data  
- Designing trustworthy estimation systems  
- Creating explainable AI outputs  
- Preventing misleading recommendations  

One major challenge was balancing insight quality with data availability.

Since direct platform data was limited, trust and transparency became critical product decisions.

---

## Lessons Learned

Building TikScope taught me several important lessons:

- AI insights require trust and explainability  
- Data limitations shape product design  
- Transparency improves user confidence  
- Great analytics products prioritize clarity  

TikScope reinforced that powerful AI products are not only about intelligence but also about helping users confidently act on insights.

---

## Future Improvements

Potential future features include:

- Live creator analytics  
- Competitor creator comparison  
- Campaign ROI prediction  
- Historical growth tracking  
- Brand shortlist builder  
- Outreach automation  

---

## Creator

Built by **Godwin Okechukwu (Fabulous Designer)**  
Product Designer • AI Product Builder  

Portfolio: https://gocstudios.carrd.co/

---

## License

MIT License<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://ai.google.dev/static/site-assets/images/share-ais-513315318.png" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/dd389df2-8199-45b9-b769-efa7b2064445

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`
