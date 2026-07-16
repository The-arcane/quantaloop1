import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GradientCard } from "./GradientCard";

export default function UpcomingEvents() {
  return (
    <section id="events" className="py-16 sm:py-24 bg-card/50">
      <div className="container">
        <h2 className="text-3xl font-headline font-bold tracking-tight text-center sm:text-4xl mb-12 animate-fadeInUp uppercase">
          Upcoming Events
        </h2>
        <div className="mx-auto max-w-2xl animate-fadeInUp">
          <GradientCard className="hover:shadow-[0_0_40px_-10px_hsl(var(--secondary)/0.6)] transition-shadow duration-300">
            <Card className="bg-card border-border/20 text-center">
              <CardHeader>
                <CardTitle className="font-headline text-2xl uppercase">
                  Coming Soon
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground font-body">
                  We are preparing something exciting. Stay tuned for upcoming QuantaLoop events.
                </p>
              </CardContent>
            </Card>
          </GradientCard>
        </div>
      </div>
    </section>
  );
}
