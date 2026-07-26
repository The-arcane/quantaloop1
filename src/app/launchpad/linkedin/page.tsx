import type { Metadata } from "next";
import LaunchPadLinkedInPage from "@/components/launchpad/LaunchPadLinkedInPage";

export const metadata: Metadata = {
  title: "LaunchPad LinkedIn Post Assistant | QuantaLoop",
  description: "Create and share your LaunchPad: Profile to Product learning experience.",
};

export default function Page() {
  return <LaunchPadLinkedInPage />;
}
