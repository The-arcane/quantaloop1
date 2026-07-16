import CTA from "@/components/landing/CTA";
import FeaturedProjects from "@/components/landing/FeaturedProjects";
import Footer from "@/components/landing/Footer";
import Header from "@/components/landing/Header";
import Hero from "@/components/landing/Hero";
import Mission from "@/components/landing/Mission";
import Testimonials from "@/components/landing/Testimonials";
import UpcomingEvents from "@/components/landing/UpcomingEvents";

const members = [
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

export default function Home() {
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
