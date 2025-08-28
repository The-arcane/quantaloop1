import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Rocket } from "lucide-react";
import { GradientCard } from "./GradientCard";
import React from "react";

export default function FeaturedProjects() {
  return (
    <section id="projects" className="py-16 sm:py-24 bg-background">
      <div className="container">
        <h2 className="text-3xl font-headline font-bold tracking-tight text-center sm:text-4xl mb-12 uppercase">Featured Projects</h2>
        <div className="flex justify-center">
            <GradientCard className="max-w-md hover:shadow-[0_0_40px_-10px_hsl(var(--primary)/0.6)] transition-shadow duration-300">
              <Card className="h-full bg-card/80 border-border/20 text-center flex flex-col items-center p-8 transition-transform duration-300 hover:-translate-y-2">
                <CardHeader>
                  <div className="mx-auto bg-primary/10 text-primary p-4 rounded-full mb-4">
                    <Rocket className="h-12 w-12" />
                  </div>
                  <CardTitle className="font-headline text-2xl">Launching Soon!</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Our members are hard at work on innovative projects. Check back soon to see them showcased here.</p>
                </CardContent>
              </Card>
            </GradientCard>
        </div>
      </div>
    </section>
  );
}
