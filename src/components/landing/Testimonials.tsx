"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Linkedin, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import React from "react";

interface Member {
  id: string | number;
  name: string;
  position: string;
  image_url: string | null;
  short_description: string;
  linkedin_profile?: string;
}

export default function Testimonials({ members }: { members: Member[] }) {

  if (!members || members.length === 0) {
    return (
      <section id="testimonials" className="py-16 sm:py-24 border-t border-purple-500/20">
        <div className="container">
          <h2 className="text-3xl font-headline font-bold tracking-tight text-center sm:text-4xl mb-12 uppercase">Meet the Team</h2>
          <p className="text-center text-muted-foreground">No testimonials available at the moment.</p>
        </div>
      </section>
    )
  }

  return (
    <section id="testimonials" className="py-16 sm:py-24 border-t border-purple-500/20">
      <div className="container">
        <h2 className="text-3xl font-headline font-bold tracking-tight text-center sm:text-4xl mb-12 uppercase">Meet the Team</h2>
        <Carousel 
          opts={{ 
            align: "start",
          }}
          className="w-full max-w-xs sm:max-w-xl md:max-w-3xl lg:max-w-5xl xl:max-w-6xl mx-auto"
        >
          <CarouselContent>
            {members.map((item) => (
              <CarouselItem key={item.id} className="basis-full sm:basis-1/2 lg:basis-1/3 p-4">
                <Card className="bg-card/60 border-primary/20 backdrop-blur-sm transform transition-all duration-300 hover:scale-105 hover:shadow-primary/20 hover:shadow-2xl rounded-xl overflow-hidden flex flex-col h-full">
                  <CardContent className="p-6 text-center flex flex-col items-center flex-grow">
                    <Avatar className="w-24 h-24 mb-4">
                      {item.image_url ? (
                        <AvatarImage src={item.image_url} alt={item.name} className="object-cover"/>
                      ) : (
                        <AvatarFallback className="bg-primary/10">
                          <User className="w-12 h-12 text-primary" />
                        </AvatarFallback>
                      )}
                    </Avatar>
                    <blockquote className="text-muted-foreground italic mb-4 font-body text-sm flex-grow">"{item.short_description}"</blockquote>
                    <div className="mt-auto">
                      <p className="font-semibold text-lg text-foreground font-headline">{item.name}</p>

                      <p className="text-sm text-primary font-body">{item.position}</p>
                      {item.linkedin_profile && (
                        <div className="mt-4">
                          <Link href={item.linkedin_profile} target="_blank" rel="noopener noreferrer">
                            <Button variant="outline" size="icon" className="rounded-full border-primary/40 hover:bg-primary/10">
                              <Linkedin className="h-5 w-5 text-primary" />
                            </Button>
                          </Link>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </section>
  );
}
