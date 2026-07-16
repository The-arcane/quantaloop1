import CTA from "@/components/landing/CTA";
import FeaturedProjects from "@/components/landing/FeaturedProjects";
import Footer from "@/components/landing/Footer";
import Header from "@/components/landing/Header";
import Hero from "@/components/landing/Hero";
import Mission from "@/components/landing/Mission";
import Testimonials from "@/components/landing/Testimonials";
import UpcomingEvents from "@/components/landing/UpcomingEvents";

export const dynamic = "force-dynamic";

type Member = {
  id: string | number;
  name: string;
  position: string;
  image_url: string | null;
  short_description: string;
  linkedin_profile?: string;
};

const fallbackMembers: Member[] = [
    "Raunaq Adlakha",
    "Vrinda Jain",
    "Ipshita Sethi",
    "Kanav Gupta",
    "Yajat Prabhakar",
    "Saumya Sudha",
    "Gazal Sindhwani",
    "Lavanya Sharma",
    "Rishabh Bhatnagar",
    "Muskan Goel",
    "Agamya Jain",
    "Ginim Narang",
    "Aanjanay Arora",
    "Mandeep Singh",
    "Adarsh Shukla",
  ].map((name, index) => ({
    id: `member-${index + 1}`,
    name,
    position: "QuantaLoop Team",
    image_url: null,
    short_description: "Building, learning, and innovating together with QuantaLoop.",
  }));

async function getMembers(): Promise<Member[]> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) return fallbackMembers;

  try {
    const response = await fetch(`${url}/rest/v1/members?select=*`, {
      headers: {
        apikey: key,
        Authorization: `Bearer ${key}`,
      },
      cache: "no-store",
    });

    if (!response.ok) throw new Error(`Members request failed: ${response.status}`);

    const members = (await response.json()) as Member[];
    const order = new Map(fallbackMembers.map((member, index) => [member.name, index]));
    return members.sort(
      (a, b) => (order.get(a.name) ?? Number.MAX_SAFE_INTEGER) - (order.get(b.name) ?? Number.MAX_SAFE_INTEGER),
    );
  } catch (error) {
    console.error("Could not load member profiles; using code fallback.", error);
    return fallbackMembers;
  }
}

export default async function Home() {
  const members = await getMembers();

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow">
        <Hero />
        <Mission />
        <UpcomingEvents />
        <FeaturedProjects />
        <Testimonials members={members} />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
