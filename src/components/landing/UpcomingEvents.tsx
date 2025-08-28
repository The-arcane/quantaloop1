import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { GradientCard } from "./GradientCard";

const events = [
  { 
    title: "Build-A-Thon Pre Meetup’25 – The Spark of Innovation 🔥", 
    date: "Day 1 – September 8, 2025", 
    description: "Kick off your journey with inspiring speaker sessions and expert mentorship. Explore the latest in tech domains, choose your innovation track, and set the foundation for the groundbreaking ideas you’ll build ahead." 
  },
  { 
    title: "Build-A-Thon Round 0 – Battle of Ideas 🎤", 
    date: "Day 2 – September 23, 2025", 
    description: "The stage is yours! Present your innovative ideas to the panel and peers. Compete for a spot in the Top 20 teams, gain valuable feedback, and refine your concept for the final hackathon challenge." 
  },
  { 
    title: "Build-A-Thon ’25 – Code. Create. Conquer. 💻", 
    date: "Day 3 – September 24, 2025", 
    description: "A 10-hour adrenaline-packed hackathon where imagination meets execution. Top 20 teams transform their concepts into real-world solutions, culminating in a final showcase where champions emerge victorious." 
  },
];

export default function UpcomingEvents() {
  return (
    <section id="events" className="py-16 sm:py-24 bg-card/50">
      <div className="container">
        <h2 className="text-3xl font-headline font-bold tracking-tight text-center sm:text-4xl mb-12 animate-fadeInUp uppercase">Upcoming Events</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event, i) => (
            <div key={event.title} className="animate-fadeInUp h-full flex" style={{ animationDelay: `${(i * 0.2) + 0.4}s`}}>
              <GradientCard className="hover:shadow-[0_0_40px_-10px_hsl(var(--secondary)/0.6)] transition-shadow duration-300 h-full w-full">
                <Card className="h-full bg-card border-border/20 transition-transform duration-300 hover:-translate-y-2 flex flex-col">
                  <CardHeader>
                    <CardTitle className="font-headline text-xl">{event.title}</CardTitle>
                    <CardDescription>{event.date}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p className="text-muted-foreground mb-4 font-body">{event.description}</p>
                  </CardContent>
                </Card>
              </GradientCard>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
