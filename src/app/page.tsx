import CTA from "@/components/landing/CTA";
import FeaturedProjects from "@/components/landing/FeaturedProjects";
import Footer from "@/components/landing/Footer";
import Header from "@/components/landing/Header";
import Hero from "@/components/landing/Hero";
import Mission from "@/components/landing/Mission";
import Testimonials from "@/components/landing/Testimonials";
import UpcomingEvents from "@/components/landing/UpcomingEvents";
import { supabase } from "@/lib/supabase";

async function getMembers() {
  const { data: members, error } = await supabase.from('members').select('*');
  if (error) {
    console.error('Error fetching members:', error);
    return [];
  }

  const hierarchy = [
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
    "Adarsh Shukla"
  ];

  const sortedMembers = members.sort((a, b) => {
    const indexA = hierarchy.indexOf(a.name);
    const indexB = hierarchy.indexOf(b.name);

    if (indexA === -1 && indexB === -1) return 0; // Both not in hierarchy, keep original order
    if (indexA === -1) return 1; // a is not in hierarchy, send to end
    if (indexB === -1) return -1; // b is not in hierarchy, send to end

    return indexA - indexB;
  });

  return sortedMembers;
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
