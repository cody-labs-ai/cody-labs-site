"use client";

import { useMemo, useState } from "react";

type DataCollectedOption =
  | "Email"
  | "Name"
  | "Payment info"
  | "Usage data"
  | "Cookies"
  | "Location"
  | "Device info";

type ThirdPartyOption =
  | "Google Analytics"
  | "Stripe"
  | "Meta Pixel"
  | "Mailchimp"
  | "AWS";

type FormState = {
  companyName: string;
  websiteUrl: string;
  contactEmail: string;
  effectiveDate: string;
  dataCollected: DataCollectedOption[];
  thirdPartyServices: ThirdPartyOption[];
};

const DATA_OPTIONS: DataCollectedOption[] = [
  "Email",
  "Name",
  "Payment info",
  "Usage data",
  "Cookies",
  "Location",
  "Device info",
];

const THIRD_PARTY_OPTIONS: ThirdPartyOption[] = [
  "Google Analytics",
  "Stripe",
  "Meta Pixel",
  "Mailchimp",
  "AWS",
];

const initialForm: FormState = {
  companyName: "",
  websiteUrl: "",
  contactEmail: "",
  effectiveDate: "",
  dataCollected: [],
  thirdPartyServices: [],
};

function formatDate(dateString: string) {
  if (!dateString) return "[Effective Date]";

  const date = new Date(`${dateString}T00:00:00`);

  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
}

function normalizeWebsite(url: string) {
  const trimmed = url.trim();
  if (!trimmed) return "your website";
  return trimmed.replace(/^https?:\/\//, "");
}

function joinList(items: string[]) {
  if (items.length === 0) return "personal information you provide or that is collected automatically";
  if (items.length === 1) return items[0];
  if (items.length === 2) return `${items[0]} and ${items[1]}`;
  return `${items.slice(0, -1).join(", ")}, and ${items[items.length - 1]}`;
}

function buildCollectedDataSection(selected: DataCollectedOption[]) {
  if (selected.length === 0) {
    return `We may collect information that you voluntarily provide to us and certain technical information automatically when you use the Service. The exact categories of data collected will depend on how you interact with the Service.`;
  }

  const descriptions: Record<DataCollectedOption, string> = {
    Email: "Email address, such as when you contact us, create an account, subscribe to updates, or request support.",
    Name: "Personal identifiers such as your name or company name when you submit forms or communicate with us.",
    "Payment info": "Payment-related information necessary to process transactions. Full payment card details are generally processed by our payment providers and not stored directly by us unless explicitly stated.",
    "Usage data": "Usage information such as pages viewed, features used, referring pages, session duration, clicks, and interaction patterns.",
    Cookies: "Cookie and similar tracking technology data used to remember preferences, understand usage, and improve performance.",
    Location: "Approximate or precise location information, where enabled by your device, browser, or settings, or inferred from your IP address.",
    "Device info": "Device and browser information such as IP address, browser type, operating system, device identifiers, and diagnostic data.",
  };

  return `We may collect the following categories of personal information:\n\n${selected
    .map((item) => `- ${descriptions[item]}`)
    .join("\n")}`;
}

function buildUseSection(selected: DataCollectedOption[], services: ThirdPartyOption[]) {
  const bullets = [
    "Provide, operate, maintain, and secure the Service.",
    "Communicate with you about your account, inquiries, updates, and support requests.",
    "Monitor performance, troubleshoot issues, and improve the functionality and user experience of the Service.",
    "Detect fraud, abuse, unauthorized access, and other harmful or illegal activity.",
    "Comply with legal obligations and enforce our terms, policies, and rights.",
  ];

  if (selected.includes("Payment info") || services.includes("Stripe")) {
    bullets.splice(2, 0, "Process payments, subscriptions, refunds, and related transaction records.");
  }

  if (selected.includes("Cookies") || selected.includes("Usage data") || services.includes("Google Analytics") || services.includes("Meta Pixel")) {
    bullets.splice(3, 0, "Analyze traffic, engagement, and trends to understand how users interact with the Service.");
  }

  if (selected.includes("Email") || services.includes("Mailchimp")) {
    bullets.splice(2, 0, "Send newsletters, promotional messages, or other marketing communications where permitted by law and based on your preferences.");
  }

  return bullets.map((bullet) => `- ${bullet}`).join("\n");
}

function buildThirdPartySection(services: ThirdPartyOption[]) {
  if (services.length === 0) {
    return `We may engage service providers that help us operate the Service, such as hosting, analytics, communications, and payment providers. These providers may access personal information only as needed to perform services for us and are expected to protect it appropriately.`;
  }

  const details: Record<ThirdPartyOption, string> = {
    "Google Analytics": "Google Analytics, which may collect usage data, device information, and cookie-related data to help us understand website traffic and user behavior.",
    Stripe: "Stripe, which may process payment and billing information to securely handle purchases, subscriptions, and refunds.",
    "Meta Pixel": "Meta Pixel, which may collect browsing and conversion-related data to measure advertising performance and improve marketing campaigns.",
    Mailchimp: "Mailchimp, which may process your email address and engagement data for email newsletters, product updates, and marketing communications.",
    AWS: "Amazon Web Services (AWS), which may host infrastructure, databases, files, logs, and related technical data used to operate the Service.",
  };

  return `We may share information with the following third-party services to operate and improve the Service:\n\n${services
    .map((service) => `- ${details[service]}`)
    .join("\n")}`;
}

function buildPolicy(form: FormState) {
  const companyName = form.companyName.trim() || "[Company Name]";
  const websiteUrl = form.websiteUrl.trim() || "[Website URL]";
  const displayWebsite = normalizeWebsite(form.websiteUrl);
  const contactEmail = form.contactEmail.trim() || "[Contact Email]";
  const effectiveDate = formatDate(form.effectiveDate);
  const dataSummary = joinList(form.dataCollected);
  const servicesSummary =
    form.thirdPartyServices.length > 0
      ? joinList(form.thirdPartyServices)
      : "trusted third-party service providers";

  return `PRIVACY POLICY

Effective Date: ${effectiveDate}

This Privacy Policy explains how ${companyName} ("we," "us," or "our") collects, uses, discloses, and protects information when you visit or use ${websiteUrl} and any related products, applications, services, or websites (collectively, the "Service"). By using the Service, you acknowledge the practices described in this Privacy Policy.

1. INFORMATION WE COLLECT

${buildCollectedDataSection(form.dataCollected)}

In summary, the categories of information that may be collected include ${dataSummary}.

2. HOW WE COLLECT INFORMATION

We may collect information in several ways, including:
- Directly from you when you fill out forms, create an account, make a purchase, subscribe, or contact us.
- Automatically when you use the Service, including through browser technologies, logs, cookies, pixels, and analytics tools.
- From third parties, integrations, payment processors, marketing platforms, hosting providers, or other partners connected to the operation of the Service.

3. HOW WE USE YOUR INFORMATION

We may use your information to:
${buildUseSection(form.dataCollected, form.thirdPartyServices)}

4. COOKIES AND TRACKING TECHNOLOGIES

${form.dataCollected.includes("Cookies") || form.dataCollected.includes("Usage data") || form.thirdPartyServices.includes("Google Analytics") || form.thirdPartyServices.includes("Meta Pixel")
    ? `We may use cookies, pixels, tags, scripts, and similar technologies to recognize users, remember preferences, measure campaign effectiveness, analyze traffic, and improve the Service. You can usually control cookies through your browser settings. Disabling cookies may affect certain features or functionality of the Service.`
    : `We may use limited technical tools such as essential cookies or local storage strictly as needed to operate and secure the Service. You can typically manage these settings through your browser, although some functionality may be impacted if they are disabled.`}

5. THIRD-PARTY SERVICES

${buildThirdPartySection(form.thirdPartyServices)}

These third parties may have their own privacy notices and data practices. We encourage you to review their policies where applicable.

6. HOW WE SHARE INFORMATION

We may share information:
- With vendors, contractors, and service providers that help us run the Service, including ${servicesSummary}.
- In connection with a merger, acquisition, financing, asset sale, reorganization, bankruptcy, or similar business transaction.
- If required by law, court order, legal process, or governmental request.
- To protect our rights, users, systems, property, and security, or to investigate fraud, abuse, or violations of our policies.
- With your consent or at your direction.

We do not sell your personal information except as otherwise disclosed in this Privacy Policy or as permitted by applicable law.

7. DATA RETENTION

We retain personal information for as long as reasonably necessary to provide the Service, fulfill the purposes described in this Privacy Policy, comply with legal obligations, resolve disputes, enforce agreements, and maintain business records. Retention periods may vary depending on the type of data and the reason it was collected.

8. DATA SECURITY

We use commercially reasonable administrative, technical, and organizational safeguards designed to protect personal information against unauthorized access, loss, misuse, alteration, or disclosure. However, no method of transmission over the internet or electronic storage is completely secure, and we cannot guarantee absolute security.

9. INTERNATIONAL DATA TRANSFERS

Your information may be transferred to, stored in, or processed in countries other than your own, where data protection laws may differ. Where required, we will take appropriate steps to provide lawful safeguards for such transfers.

10. YOUR PRIVACY RIGHTS

Depending on your location, you may have rights regarding your personal information, which can include the right to:
- Access, correct, update, or delete your personal information.
- Object to or restrict certain processing activities.
- Withdraw consent where processing is based on consent.
- Request a copy of your information in a portable format where available.
- Opt out of certain marketing communications by using the unsubscribe link in emails or by contacting us.

To exercise any applicable rights, contact us at ${contactEmail}. We may need to verify your identity before completing certain requests.

11. CHILDREN'S PRIVACY

The Service is not intended for children under 13 years of age, or any higher minimum age required by local law, and we do not knowingly collect personal information from children without appropriate authorization. If you believe a child has provided personal information to us, please contact us so we can take appropriate action.

12. THIRD-PARTY LINKS

The Service may contain links to third-party websites, products, or services that we do not control. We are not responsible for the privacy, security, or content practices of those third parties. Your use of third-party services is subject to their own terms and privacy policies.

13. CHANGES TO THIS PRIVACY POLICY

We may update this Privacy Policy from time to time to reflect changes to our practices, technologies, legal obligations, or business operations. When we do, we will revise the "Effective Date" above. Your continued use of the Service after any changes become effective constitutes your acknowledgment of the updated Privacy Policy.

14. CONTACT US

If you have questions, concerns, or requests regarding this Privacy Policy or our data practices, you can contact us at:

${companyName}
Website: ${displayWebsite}
Email: ${contactEmail}

Disclaimer: This privacy policy generator provides a general template for informational purposes only and does not constitute legal advice. You should consult a qualified attorney to ensure your policy complies with the laws and regulations applicable to your business, jurisdiction, and data practices.`;
}

export default function PrivacyPolicyGeneratorPage() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [policyText, setPolicyText] = useState("");
  const [copied, setCopied] = useState(false);

  const isFormValid = useMemo(() => {
    return (
      form.companyName.trim() &&
      form.websiteUrl.trim() &&
      form.contactEmail.trim() &&
      form.effectiveDate.trim()
    );
  }, [form]);

  const toggleArrayValue = <T extends string,>(values: T[], value: T) => {
    return values.includes(value)
      ? values.filter((item) => item !== value)
      : [...values, value];
  };

  const updateField = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleGenerate = () => {
    setPolicyText(buildPolicy(form));
  };

  const handleCopy = async () => {
    if (!policyText) return;
    await navigator.clipboard.writeText(policyText);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    if (!policyText) return;

    const blob = new Blob([policyText], { type: "text/plain;charset=utf-8" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    const safeName = (form.companyName.trim() || "privacy-policy")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");

    link.href = url;
    link.download = `${safeName || "privacy-policy"}-privacy-policy.txt`;
    link.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white">
      <header className="border-b border-gray-800 px-6 py-6">
        <div className="mx-auto max-w-6xl">
          <a href="/" className="text-sm text-gray-400 transition hover:text-white">
            ← Back to Cody Labs
          </a>
          <h1 className="mt-4 text-4xl font-bold sm:text-5xl">Privacy Policy Generator</h1>
          <p className="mt-3 max-w-2xl text-gray-400">
            Generate a ready-to-edit privacy policy for your website or app in minutes.
            No API calls. Just a solid template with the right sections based on your setup.
          </p>
        </div>
      </header>

      <div className="mx-auto grid max-w-6xl gap-8 px-6 py-12 lg:grid-cols-[420px_minmax(0,1fr)]">
        <section className="rounded-2xl border border-gray-800 bg-gray-900/60 p-6">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold">Fill in your details</h2>
            <p className="mt-2 text-sm text-gray-400">
              Choose what your business collects and which services you use. We&apos;ll assemble
              the matching policy sections automatically.
            </p>
          </div>

          <div className="space-y-5">
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-300">Company / App Name</label>
              <input
                type="text"
                value={form.companyName}
                onChange={(e) => updateField("companyName", e.target.value)}
                placeholder="e.g. Acme Labs"
                className="w-full rounded-lg border border-gray-800 bg-[#0f0f0f] px-4 py-3 text-white placeholder:text-gray-500 focus:border-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-300">Website URL</label>
              <input
                type="url"
                value={form.websiteUrl}
                onChange={(e) => updateField("websiteUrl", e.target.value)}
                placeholder="https://example.com"
                className="w-full rounded-lg border border-gray-800 bg-[#0f0f0f] px-4 py-3 text-white placeholder:text-gray-500 focus:border-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-300">Contact Email</label>
              <input
                type="email"
                value={form.contactEmail}
                onChange={(e) => updateField("contactEmail", e.target.value)}
                placeholder="privacy@example.com"
                className="w-full rounded-lg border border-gray-800 bg-[#0f0f0f] px-4 py-3 text-white placeholder:text-gray-500 focus:border-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-300">Effective Date</label>
              <input
                type="date"
                value={form.effectiveDate}
                onChange={(e) => updateField("effectiveDate", e.target.value)}
                className="w-full rounded-lg border border-gray-800 bg-[#0f0f0f] px-4 py-3 text-white focus:border-blue-500 focus:outline-none"
              />
            </div>

            <fieldset>
              <legend className="mb-3 block text-sm font-medium text-gray-300">Data collected</legend>
              <div className="grid gap-3 sm:grid-cols-2">
                {DATA_OPTIONS.map((option) => {
                  const checked = form.dataCollected.includes(option);
                  return (
                    <label
                      key={option}
                      className={`flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 text-sm transition ${
                        checked
                          ? "border-blue-500 bg-blue-500/10 text-white"
                          : "border-gray-800 bg-[#0f0f0f] text-gray-300 hover:border-gray-700"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() =>
                          updateField(
                            "dataCollected",
                            toggleArrayValue(form.dataCollected, option)
                          )
                        }
                        className="h-4 w-4 accent-blue-500"
                      />
                      <span>{option}</span>
                    </label>
                  );
                })}
              </div>
            </fieldset>

            <fieldset>
              <legend className="mb-3 block text-sm font-medium text-gray-300">Third-party services</legend>
              <div className="grid gap-3 sm:grid-cols-2">
                {THIRD_PARTY_OPTIONS.map((option) => {
                  const checked = form.thirdPartyServices.includes(option);
                  return (
                    <label
                      key={option}
                      className={`flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 text-sm transition ${
                        checked
                          ? "border-blue-500 bg-blue-500/10 text-white"
                          : "border-gray-800 bg-[#0f0f0f] text-gray-300 hover:border-gray-700"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() =>
                          updateField(
                            "thirdPartyServices",
                            toggleArrayValue(form.thirdPartyServices, option)
                          )
                        }
                        className="h-4 w-4 accent-blue-500"
                      />
                      <span>{option}</span>
                    </label>
                  );
                })}
              </div>
            </fieldset>

            <button
              onClick={handleGenerate}
              disabled={!isFormValid}
              className={`w-full rounded-xl px-6 py-3 font-semibold transition ${
                isFormValid
                  ? "bg-blue-600 text-white hover:bg-blue-500"
                  : "cursor-not-allowed bg-gray-800 text-gray-500"
              }`}
            >
              Generate Privacy Policy
            </button>
          </div>
        </section>

        <section className="rounded-2xl border border-gray-800 bg-gray-900/60 p-6">
          <div className="mb-4 flex flex-col gap-3 border-b border-gray-800 pb-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-2xl font-semibold">Your generated policy</h2>
              <p className="mt-1 text-sm text-gray-400">
                Review carefully and customize as needed before publishing.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                onClick={handleCopy}
                disabled={!policyText}
                className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
                  policyText
                    ? "border border-gray-700 bg-[#0f0f0f] text-white hover:border-gray-600 hover:bg-gray-800"
                    : "cursor-not-allowed border border-gray-800 bg-[#0f0f0f] text-gray-600"
                }`}
              >
                {copied ? "✓ Copied!" : "Copy to Clipboard"}
              </button>
              <button
                onClick={handleDownload}
                disabled={!policyText}
                className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
                  policyText
                    ? "bg-blue-600 text-white hover:bg-blue-500"
                    : "cursor-not-allowed bg-gray-800 text-gray-500"
                }`}
              >
                Download as .txt
              </button>
            </div>
          </div>

          {policyText ? (
            <pre className="max-h-[900px] overflow-auto whitespace-pre-wrap rounded-xl border border-gray-800 bg-[#0b0b0b] p-5 font-mono text-sm leading-7 text-gray-300">
              {policyText}
            </pre>
          ) : (
            <div className="flex min-h-[520px] items-center justify-center rounded-xl border border-dashed border-gray-800 bg-[#0b0b0b] p-8 text-center text-gray-500">
              <div>
                <p className="text-lg font-medium text-gray-300">No policy generated yet</p>
                <p className="mt-2 max-w-md text-sm text-gray-500">
                  Fill out the form, choose your data categories and services, then click
                  generate. Your privacy policy will appear here.
                </p>
              </div>
            </div>
          )}
        </section>
      </div>

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
