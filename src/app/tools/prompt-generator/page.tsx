"use client";

import { useState } from "react";

type PromptField = {
  label: string;
  placeholder: string;
  multiline?: boolean;
};

type PromptTemplate = {
  id: string;
  name: string;
  category: string;
  fields: PromptField[];
  template: (values: Record<string, string>) => string;
};

const prompts: PromptTemplate[] = [
  // CONTENT (3)
  {
    id: "blog-post",
    name: "Blog Post Writer",
    category: "Content",
    fields: [
      { label: "Topic", placeholder: "e.g., AI automation for small businesses" },
      { label: "Target Audience", placeholder: "e.g., solopreneurs, developers" },
      { label: "Tone", placeholder: "e.g., conversational, professional, witty" },
      { label: "Word Count", placeholder: "e.g., 1500" },
    ],
    template: (v) => `Write a ${v["Word Count"]}-word blog post about "${v["Topic"]}" for ${v["Target Audience"]}. Use a ${v["Tone"]} tone. Include:
- A compelling headline
- An engaging introduction with a hook
- 3-5 main sections with subheadings
- Actionable takeaways
- A strong conclusion with a call-to-action

Make it SEO-friendly and easy to scan.`,
  },
  {
    id: "social-media-post",
    name: "Social Media Post Generator",
    category: "Content",
    fields: [
      { label: "Platform", placeholder: "e.g., Twitter, LinkedIn, Instagram" },
      { label: "Topic/Product", placeholder: "e.g., new feature launch, industry insight" },
      { label: "Key Message", placeholder: "e.g., we just shipped AI email automation" },
      { label: "Call-to-Action", placeholder: "e.g., try it free, read more, comment below" },
    ],
    template: (v) => `Create a ${v["Platform"]} post about "${v["Topic/Product"]}". 

Key message: ${v["Key Message"]}

Requirements:
- Hook in the first line
- Clear value proposition
- Include relevant emojis
- End with: ${v["Call-to-Action"]}
- If Twitter/X: keep under 280 characters
- If LinkedIn: write 3-5 short paragraphs
- If Instagram: write caption + 10 relevant hashtags`,
  },
  {
    id: "email-newsletter",
    name: "Email Newsletter Writer",
    category: "Content",
    fields: [
      { label: "Main Topic", placeholder: "e.g., weekly AI news roundup" },
      { label: "Audience", placeholder: "e.g., startup founders" },
      { label: "Number of Sections", placeholder: "e.g., 3" },
      { label: "CTA", placeholder: "e.g., reply with your thoughts, book a demo" },
    ],
    template: (v) => `Write an email newsletter for ${v["Audience"]} about "${v["Main Topic"]}".

Structure:
- Subject line (under 50 characters, curiosity-driven)
- Preview text (under 100 characters)
- Personal opening (1-2 sentences)
- ${v["Number of Sections"]} main sections with clear subheadings
- Each section: one key insight + why it matters
- Close with: ${v["CTA"]}

Keep it conversational, scannable, and valuable. No fluff.`,
  },

  // PRODUCT (3)
  {
    id: "landing-page-copy",
    name: "Landing Page Copy",
    category: "Product",
    fields: [
      { label: "Product/Service", placeholder: "e.g., AI chatbot for customer support" },
      { label: "Target Customer", placeholder: "e.g., SaaS companies with 10-50 employees" },
      { label: "Main Benefit", placeholder: "e.g., reduce support tickets by 60%" },
      { label: "Price Point", placeholder: "e.g., $99/month" },
    ],
    template: (v) => `Write high-converting landing page copy for "${v["Product/Service"]}" targeting ${v["Target Customer"]}.

Main benefit: ${v["Main Benefit"]}
Price: ${v["Price Point"]}

Include:
1. Hero headline (10 words max, outcome-focused)
2. Subheadline (one sentence explaining what it is)
3. 3 key benefits (not features — what the customer gets)
4. Social proof section (how to present testimonials/stats)
5. Pricing section copy (why it's worth it)
6. FAQ section (5 common objections)
7. Final CTA (urgency without being pushy)

Write like a human. No marketing jargon.`,
  },
  {
    id: "feature-announcement",
    name: "Feature Announcement Email",
    category: "Product",
    fields: [
      { label: "Feature Name", placeholder: "e.g., Dark Mode" },
      { label: "What It Does", placeholder: "e.g., toggleable dark theme across entire app" },
      { label: "Why It Matters", placeholder: "e.g., reduces eye strain, looks better" },
    ],
    template: (v) => `Write a feature announcement email for existing customers about "${v["Feature Name"]}".

What it does: ${v["What It Does"]}
Why it matters: ${v["Why It Matters"]}

Structure:
- Subject line (exciting but clear)
- Opening: build anticipation in 1-2 sentences
- What's new: explain the feature simply
- Why you'll love it: focus on benefits, not tech specs
- How to use it: 2-3 simple steps
- Visual suggestion: what screenshot/GIF would help
- Close: invite feedback

Keep it enthusiastic but not over-the-top. Make them want to try it now.`,
  },
  {
    id: "product-description",
    name: "Product Description (E-commerce)",
    category: "Product",
    fields: [
      { label: "Product Name", placeholder: "e.g., Wireless Noise-Cancelling Headphones" },
      { label: "Key Features", placeholder: "e.g., 30hr battery, Bluetooth 5.0, foldable", multiline: true },
      { label: "Target Buyer", placeholder: "e.g., remote workers, travelers" },
    ],
    template: (v) => `Write a compelling product description for "${v["Product Name"]}" aimed at ${v["Target Buyer"]}.

Key features:
${v["Key Features"]}

Include:
- Opening hook (one sentence that makes them want it)
- Main benefits (how it improves their life)
- Feature breakdown (turn specs into benefits)
- Use cases (when/where they'll use it)
- What's included (box contents)
- Trust elements (warranty, return policy)

Write in second person ("you'll love..."). Make it scannable with bullet points. Create desire, not just information.`,
  },

  // SUPPORT (3)
  {
    id: "faq-generator",
    name: "FAQ Generator",
    category: "Support",
    fields: [
      { label: "Product/Service", placeholder: "e.g., online course platform" },
      { label: "Common Issues", placeholder: "e.g., login problems, payment questions, content access", multiline: true },
      { label: "Support Tone", placeholder: "e.g., friendly, professional, patient" },
    ],
    template: (v) => `Generate a comprehensive FAQ section for "${v["Product/Service"]}".

Common issues to address:
${v["Common Issues"]}

Use a ${v["Support Tone"]} tone.

Create 10 FAQ entries covering:
- Account/login issues
- Payment/billing questions
- Feature usage
- Troubleshooting
- Refund/cancellation policy

Format each as:
**Q: [Question in customer's words]**
A: [Clear, helpful answer in 2-3 sentences. Include a next step or link where relevant.]

Anticipate customer frustration. Be helpful, not defensive.`,
  },
  {
    id: "customer-response",
    name: "Customer Support Response",
    category: "Support",
    fields: [
      { label: "Customer Issue", placeholder: "e.g., they can't access their account", multiline: true },
      { label: "Resolution", placeholder: "e.g., reset password via email link" },
      { label: "Tone", placeholder: "e.g., apologetic, helpful, friendly" },
    ],
    template: (v) => `Write a customer support response to this issue:

"${v["Customer Issue"]}"

Resolution: ${v["Resolution"]}
Tone: ${v["Tone"]}

Requirements:
- Acknowledge their frustration
- Apologize if appropriate (don't over-apologize)
- Explain the solution in simple steps
- Offer additional help
- Keep it under 100 words

Sound human. No corporate-speak.`,
  },
  {
    id: "help-article",
    name: "Help Center Article",
    category: "Support",
    fields: [
      { label: "Topic", placeholder: "e.g., How to export your data" },
      { label: "Target User", placeholder: "e.g., non-technical users" },
      { label: "Steps Involved", placeholder: "e.g., go to Settings > Export > Choose format > Download", multiline: true },
    ],
    template: (v) => `Write a help center article: "${v["Topic"]}" for ${v["Target User"]}.

Steps:
${v["Steps Involved"]}

Structure:
- Brief intro (what this article covers, why they might need it)
- Prerequisites (if any)
- Step-by-step instructions (numbered, with what they'll see at each step)
- Screenshots/visual guidance suggestions
- Troubleshooting section (common problems)
- Related articles (suggest 2-3 related topics)

Use simple language. Assume zero technical knowledge. Be specific about where to click.`,
  },

  // STRATEGY (3)
  {
    id: "marketing-plan",
    name: "90-Day Marketing Plan",
    category: "Strategy",
    fields: [
      { label: "Business/Product", placeholder: "e.g., AI-powered scheduling app" },
      { label: "Target Audience", placeholder: "e.g., busy founders and consultants" },
      { label: "Current Metrics", placeholder: "e.g., 100 users, $500 MRR" },
      { label: "Goal", placeholder: "e.g., 1,000 users, $5k MRR" },
    ],
    template: (v) => `Create a 90-day marketing plan for "${v["Business/Product"]}" targeting ${v["Target Audience"]}.

Current state: ${v["Current Metrics"]}
Goal: ${v["Goal"]}

Deliver:
1. Situation analysis (what's working, what's not)
2. Core positioning (how to talk about the product)
3. Top 3 marketing channels to focus on (and why)
4. Month 1 priorities (specific tactics)
5. Month 2 priorities (scaling what works)
6. Month 3 priorities (optimization)
7. Key metrics to track weekly
8. Budget allocation (if $500/month)

Be specific. No generic advice. Assume limited time and budget.`,
  },
  {
    id: "competitor-analysis",
    name: "Competitive Analysis",
    category: "Strategy",
    fields: [
      { label: "Your Product", placeholder: "e.g., project management tool for designers" },
      { label: "Competitors", placeholder: "e.g., Asana, Notion, ClickUp", multiline: true },
      { label: "Your Unique Angle", placeholder: "e.g., built specifically for design workflows" },
    ],
    template: (v) => `Conduct a competitive analysis for "${v["Your Product"]}" vs:
${v["Competitors"]}

Your unique angle: ${v["Your Unique Angle"]}

Analyze:
1. Feature comparison matrix (what you have, what they have)
2. Pricing comparison (how you stack up)
3. Positioning gaps (what they're NOT saying)
4. Customer complaints (check reviews/Reddit for each competitor)
5. Your differentiation strategy (how to stand out)
6. Threat level (which competitor is most dangerous, and why)
7. Opportunity assessment (market gaps you can own)

Be honest. Include where competitors are legitimately better. Focus on strategic insight, not just feature lists.`,
  },
  {
    id: "growth-experiment",
    name: "Growth Experiment Designer",
    category: "Strategy",
    fields: [
      { label: "Current Problem", placeholder: "e.g., low trial-to-paid conversion" },
      { label: "Hypothesis", placeholder: "e.g., users don't understand the value during trial" },
      { label: "Resources Available", placeholder: "e.g., can send emails, modify onboarding flow" },
    ],
    template: (v) => `Design a growth experiment to solve: "${v["Current Problem"]}"

Hypothesis: ${v["Hypothesis"]}
Resources: ${v["Resources Available"]}

Provide:
1. Experiment name (short, descriptive)
2. What you'll test (specific change)
3. Control vs. variant (what's different)
4. Success metric (one primary metric)
5. Sample size needed (how many users)
6. Duration (how long to run)
7. Implementation steps (what to build/change)
8. Analysis plan (how to know if it worked)
9. Rollout plan if successful

Keep it simple. One variable at a time. Make it shippable in < 1 week.`,
  },

  // AUTOMATION (3)
  {
    id: "workflow-automation",
    name: "Workflow Automation Mapper",
    category: "Automation",
    fields: [
      { label: "Manual Process", placeholder: "e.g., customer onboarding", multiline: true },
      { label: "Tools Available", placeholder: "e.g., Zapier, Make, n8n, custom code" },
      { label: "Desired Outcome", placeholder: "e.g., zero manual steps from signup to first value" },
    ],
    template: (v) => `Design an automation workflow for:
"${v["Manual Process"]}"

Tools: ${v["Tools Available"]}
Goal: ${v["Desired Outcome"]}

Provide:
1. Current workflow (step-by-step, what happens manually)
2. Pain points (where it breaks, slows down, or annoys people)
3. Automation design:
   - Trigger (what starts the workflow)
   - Steps (what happens automatically)
   - Tools used (which app does what)
   - Data passed between steps
4. Error handling (what happens if something fails)
5. Monitoring (how to know it's working)
6. Implementation difficulty (easy/medium/hard + time estimate)

Be specific about the tools and integrations. Make it actionable.`,
  },
  {
    id: "ai-prompt-chain",
    name: "AI Prompt Chain Builder",
    category: "Automation",
    fields: [
      { label: "End Goal", placeholder: "e.g., turn meeting notes into action items + follow-up emails" },
      { label: "Input Format", placeholder: "e.g., raw transcript from Zoom" },
      { label: "AI Tool", placeholder: "e.g., ChatGPT, Claude, Gemini" },
    ],
    template: (v) => `Build a multi-step AI prompt chain to achieve:
"${v["End Goal"]}"

Input: ${v["Input Format"]}
AI tool: ${v["AI Tool"]}

Design:
1. Prompt 1 - [Purpose]
   Input: [what it receives]
   Output: [what it produces]
   Prompt text: [exact prompt]

2. Prompt 2 - [Purpose]
   Input: [output from Prompt 1]
   Output: [what it produces]
   Prompt text: [exact prompt]

3. Prompt 3 - [Purpose]
   Input: [output from Prompt 2]
   Output: [final deliverable]
   Prompt text: [exact prompt]

Include:
- Why this chain structure (why not one prompt)
- Quality checks (how to verify output)
- Automation tip (how to run this without copy-paste)

Make each prompt clear, specific, and copy-paste ready.`,
  },
  {
    id: "recurring-task-system",
    name: "Recurring Task System",
    category: "Automation",
    fields: [
      { label: "Task", placeholder: "e.g., weekly performance report" },
      { label: "Data Sources", placeholder: "e.g., Google Analytics, Stripe, email metrics" },
      { label: "Delivery", placeholder: "e.g., Slack message every Monday 9am" },
    ],
    template: (v) => `Design an automated system for recurring task:
"${v["Task"]}"

Data sources: ${v["Data Sources"]}
Delivery: ${v["Delivery"]}

Build:
1. Data collection (how to pull each data source)
2. Data processing (calculations, formatting, insights)
3. Report generation (what the output looks like)
4. Delivery mechanism (how it gets sent)
5. Schedule (when it runs)
6. Tools/services needed (be specific)
7. Setup steps (how to build this)
8. Maintenance (what could break, how to fix)

Aim for zero manual intervention. If a human needs to review, explain when and why.`,
  },
];

export default function PromptGeneratorPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedPrompt, setSelectedPrompt] = useState<string>("");
  const [formValues, setFormValues] = useState<Record<string, string>>({});
  const [generatedPrompt, setGeneratedPrompt] = useState<string>("");
  const [copied, setCopied] = useState(false);

  const categories = Array.from(new Set(prompts.map((p) => p.category)));
  const categoryPrompts = prompts.filter((p) => p.category === selectedCategory);
  const currentPrompt = prompts.find((p) => p.id === selectedPrompt);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setSelectedPrompt("");
    setFormValues({});
    setGeneratedPrompt("");
  };

  const handlePromptChange = (promptId: string) => {
    setSelectedPrompt(promptId);
    setFormValues({});
    setGeneratedPrompt("");
  };

  const handleFieldChange = (label: string, value: string) => {
    setFormValues({ ...formValues, [label]: value });
  };

  const handleGenerate = () => {
    if (!currentPrompt) return;
    const prompt = currentPrompt.template(formValues);
    setGeneratedPrompt(prompt);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedPrompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const allFieldsFilled = currentPrompt
    ? currentPrompt.fields.every((f) => formValues[f.label]?.trim())
    : false;

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Header */}
      <header className="border-b border-gray-800 px-6 py-6">
        <div className="mx-auto max-w-5xl">
          <a href="/" className="text-sm text-gray-400 hover:text-white">
            ← Back to Cody Labs
          </a>
          <h1 className="mt-4 text-4xl font-bold">Free Prompt Generator</h1>
          <p className="mt-2 text-gray-400">
            Fill in the blanks, get battle-tested prompts ready for ChatGPT or Claude.
          </p>
        </div>
      </header>

      <div className="mx-auto max-w-5xl px-6 py-12">
        {/* Category Selection */}
        <div className="mb-8">
          <label className="mb-3 block text-sm font-medium text-gray-300">
            1. Choose a category
          </label>
          <div className="flex flex-wrap gap-3">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategoryChange(cat)}
                className={`rounded-lg px-6 py-3 font-medium transition ${
                  selectedCategory === cat
                    ? "bg-blue-600 text-white"
                    : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Prompt Selection */}
        {selectedCategory && (
          <div className="mb-8">
            <label className="mb-3 block text-sm font-medium text-gray-300">
              2. Pick a prompt type
            </label>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {categoryPrompts.map((prompt) => (
                <button
                  key={prompt.id}
                  onClick={() => handlePromptChange(prompt.id)}
                  className={`rounded-lg p-4 text-left transition ${
                    selectedPrompt === prompt.id
                      ? "bg-blue-600 text-white"
                      : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                  }`}
                >
                  <div className="font-medium">{prompt.name}</div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Form Fields */}
        {currentPrompt && (
          <div className="mb-8">
            <label className="mb-3 block text-sm font-medium text-gray-300">
              3. Fill in the details
            </label>
            <div className="space-y-4 rounded-lg bg-gray-900 p-6">
              {currentPrompt.fields.map((field) => (
                <div key={field.label}>
                  <label className="mb-2 block text-sm font-medium text-gray-300">
                    {field.label}
                  </label>
                  {field.multiline ? (
                    <textarea
                      value={formValues[field.label] || ""}
                      onChange={(e) => handleFieldChange(field.label, e.target.value)}
                      placeholder={field.placeholder}
                      rows={3}
                      className="w-full rounded-lg bg-gray-800 px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  ) : (
                    <input
                      type="text"
                      value={formValues[field.label] || ""}
                      onChange={(e) => handleFieldChange(field.label, e.target.value)}
                      placeholder={field.placeholder}
                      className="w-full rounded-lg bg-gray-800 px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  )}
                </div>
              ))}
              <button
                onClick={handleGenerate}
                disabled={!allFieldsFilled}
                className={`mt-4 w-full rounded-lg px-6 py-3 font-semibold transition ${
                  allFieldsFilled
                    ? "bg-blue-600 text-white hover:bg-blue-500"
                    : "cursor-not-allowed bg-gray-700 text-gray-500"
                }`}
              >
                Generate Prompt
              </button>
            </div>
          </div>
        )}

        {/* Generated Prompt */}
        {generatedPrompt && (
          <div className="mb-12">
            <div className="mb-3 flex items-center justify-between">
              <label className="text-sm font-medium text-gray-300">
                4. Copy and use in ChatGPT/Claude
              </label>
              <button
                onClick={handleCopy}
                className="rounded-lg bg-gray-800 px-4 py-2 text-sm font-medium text-white transition hover:bg-gray-700"
              >
                {copied ? "✓ Copied!" : "Copy to Clipboard"}
              </button>
            </div>
            <div className="rounded-lg bg-gray-900 p-6">
              <pre className="whitespace-pre-wrap font-mono text-sm text-gray-300">
                {generatedPrompt}
              </pre>
            </div>
          </div>
        )}

        {/* Tip Jar */}
        <div className="mt-16 border-t border-gray-800 pt-12 text-center">
          <h2 className="mb-4 text-2xl font-bold">Found this useful?</h2>
          <p className="mb-6 text-gray-400">
            This free tool has 15 prompts. Want all 50+ prompts with even more categories?
          </p>
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <a
              href="https://codylabsai.gumroad.com/l/wjpelw"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-500"
            >
              Buy me a coffee ☕
            </a>
            <span className="text-gray-500">or</span>
            <a
              href="https://codylabsai.gumroad.com/l/wjpelw"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block rounded-lg border border-gray-700 px-6 py-3 font-semibold text-white transition hover:border-gray-600 hover:bg-gray-800"
            >
              Get all 50+ prompts for $1+
            </a>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-800 px-6 py-8 text-center text-sm text-gray-500">
        <p>
          Built by{" "}
          <a href="/" className="text-blue-500 hover:underline">
            Cody Labs
          </a>{" "}
          · An AI-run business with zero employees
        </p>
      </footer>
    </main>
  );
}
