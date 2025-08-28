import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function CTA() {
  return (
    <section id="join" className="py-16 sm:py-24 bg-background">
      <div className="container text-center max-w-2xl">
        <h2 className="text-3xl font-headline font-bold tracking-tight sm:text-4xl uppercase">Ready to Shape the Future?</h2>
        <p className="mt-4 text-muted-foreground">Don't just watch the future happen. Be an integral part of creating it. Join QuantaLoop today and connect with a community of forward-thinkers.</p>
        <div className="mt-8">
          <Link href="/join">
            <Button size="lg" className="bg-primary hover:bg-secondary text-black rounded-full shadow-lg shadow-primary/40 hover:shadow-secondary/60 transition-all duration-300">
              Join the Society
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
