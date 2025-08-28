import { Button } from "@/components/ui/button";
import Link from "next/link";
import { AnimatedBackground } from "./AnimatedBackground";

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10 h-full w-full bg-background">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-transparent to-transparent"></div>
        <AnimatedBackground />
      </div>
      <div className="container flex flex-col items-center justify-center text-center min-h-[calc(100vh-5rem)] py-20 md:py-32">
        <h1 className="text-4xl font-headline font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl bg-gradient-to-br from-foreground to-muted-foreground bg-clip-text text-transparent animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
          Welcome to QuantaLoop – Innovate. Iterate. Evolve.
        </h1>
        <p className="mt-6 max-w-[700px] text-muted-foreground md:text-xl animate-fadeInUp font-body" style={{ animationDelay: '0.4s' }}>
          Official tech society of BVIMR, empowering students to innovate, collaborate, and lead in technology.
        </p>
        <div className="mt-8 flex flex-wrap justify-center items-center gap-6 animate-fadeInUp" style={{ animationDelay: '0.6s' }}>
          <Link href="/join">
            <Button size="lg" className="bg-primary hover:bg-secondary text-black rounded-full shadow-lg shadow-primary/40 hover:shadow-secondary/60 transition-all duration-300 hover:scale-105">
              Join the Society
            </Button>
          </Link>
          <Link href="#testimonials" className="text-white hover:text-primary underline-offset-4 hover:underline transition-colors">
            Meet the Team
          </Link>
        </div>
      </div>
    </section>
  );
}
