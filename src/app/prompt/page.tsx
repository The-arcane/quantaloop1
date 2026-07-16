"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Check, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";

const portfolioPrompt = `Create a complete, modern, fully responsive personal portfolio website immediately. Do not ask any questions, do not show a planning phase, do not provide explanations, and do not use placeholder loading or “working on it” screens. Directly generate the complete, functional website.

The portfolio owner’s personal details are not defined yet. Therefore, keep all personal information easy to edit using clearly labelled placeholders such as:

[YOUR NAME]
[YOUR PROFESSION]
[SHORT INTRODUCTION]
[ABOUT ME DESCRIPTION]
[PROFILE IMAGE]
[EMAIL ADDRESS]
[PHONE NUMBER]
[LOCATION]
[LINKEDIN URL]
[GITHUB URL]
[INSTAGRAM URL]
[RESUME URL]

Create the following sections:

1. A sticky navigation bar with Home, About, Skills, Experience, Projects, Testimonials, and Contact links.
2. A visually impressive hero section containing the person’s name, profession, short introduction, profile image, social links, “View My Work” button, and “Download Resume” button.
3. An About Me section with a professional biography, key statistics, personal strengths, and career objectives.
4. A Skills section with editable skill categories, progress indicators, tools, technologies, and professional competencies.
5. An Experience and Education timeline with editable positions, organizations, degrees, dates, and descriptions.
6. A Projects section with at least six editable project cards. Each card should contain an image, project title, description, technologies used, live demo link, and source-code link.
7. A Services section showing the professional services offered.
8. A Testimonials section with editable client or colleague reviews.
9. A contact section containing a functional contact form with name, email, subject, and message fields.
10. A professional footer with social-media links, navigation links, copyright text, and a back-to-top button.

Design requirements:

* Use a premium, elegant, and professional visual style.
* Use modern typography, balanced spacing, subtle gradients, glassmorphism elements, smooth shadows, and high-quality animations.
* Include smooth scrolling and attractive entrance animations.
* Add interactive hover effects to buttons, cards, links, skills, and project images.
* Include a working light and dark mode toggle.
* Ensure excellent readability and accessibility.
* Make the website fully responsive for mobile, tablet, laptop, and large desktop screens.
* Do not use lorem ipsum. Use realistic sample portfolio content while keeping all personal details editable.
* Use reusable components and clean, maintainable code.
* Ensure all navigation links and buttons work correctly.
* Add proper SEO title, description, Open Graph metadata, semantic HTML, and accessible labels.
* Optimize the website for fast loading and strong performance.
* Do not leave any section incomplete.
* Do not ask for personal details before generating the website.
* Generate the complete website now with editable placeholders for all undefined information.`;

export default function PromptPage() {
  const [copied, setCopied] = useState(false);

  async function copyPrompt() {
    await navigator.clipboard.writeText(portfolioPrompt);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  }

  return (
    <main className="min-h-screen bg-background px-4 py-8 text-foreground sm:px-6 sm:py-12">
      <div className="mx-auto max-w-5xl">
        <div className="mb-6 flex items-center justify-between gap-4">
          <Button asChild variant="ghost">
            <Link href="/" aria-label="Back to home">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Home
            </Link>
          </Button>
          <Button onClick={copyPrompt} aria-label="Copy portfolio prompt">
            {copied ? <Check className="mr-2 h-4 w-4" /> : <Copy className="mr-2 h-4 w-4" />}
            {copied ? "Copied!" : "Copy Prompt"}
          </Button>
        </div>

        <section className="overflow-hidden rounded-2xl border border-primary/20 bg-card/70 shadow-2xl shadow-primary/10 backdrop-blur-sm">
          <header className="border-b border-primary/15 bg-primary/5 p-5 sm:p-8">
            <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-primary">
              QuantaLoop Prompt Library
            </p>
            <h1 className="font-headline text-2xl font-bold sm:text-4xl">
              Complete Personal Portfolio Website Prompt
            </h1>
            <p className="mt-3 max-w-3xl text-sm text-muted-foreground sm:text-base">
              Copy this prompt and paste it into your preferred AI website builder.
            </p>
          </header>

          <div className="relative p-4 sm:p-8">
            <Button
              size="sm"
              variant="outline"
              className="absolute right-7 top-7 hidden sm:flex"
              onClick={copyPrompt}
            >
              {copied ? <Check className="mr-2 h-4 w-4" /> : <Copy className="mr-2 h-4 w-4" />}
              {copied ? "Copied!" : "Copy"}
            </Button>
            <pre className="max-h-[70vh] overflow-auto whitespace-pre-wrap break-words rounded-xl border border-border/60 bg-background/80 p-5 pr-5 font-mono text-sm leading-7 sm:p-7 sm:pr-28">
              {portfolioPrompt}
            </pre>
          </div>
        </section>
      </div>
    </main>
  );
}
