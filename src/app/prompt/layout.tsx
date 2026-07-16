import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Portfolio Website Prompt | QuantaLoop",
  description: "Copy a complete prompt for generating a modern, responsive personal portfolio website.",
};

export default function PromptLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
