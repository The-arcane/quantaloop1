"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Bell, X } from "lucide-react";
import { QuantaLoopLogo } from "@/components/QuantaLoopLogo";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { usePathname } from 'next/navigation'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'

const navLinks = [
  { href: "#", label: "Home" },
  { href: "#events", label: "Events" },
  { href: "#projects", label: "Projects" },
  { href: "#mission", label: "About" },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = React.useState(true);
  const pathname = usePathname();

  // Hide header on /join page
  if (pathname === '/join') {
    return null;
  }

  return (
    <div className="sticky top-4 z-50 mx-4 md:mx-8">
      <header className="rounded-2xl border-b border-purple-500/20 bg-background/30 backdrop-blur-sm supports-[backdrop-filter]:bg-background/30">
        <div className="container flex h-20 items-center justify-between">
          <Link href="/" className="flex items-center gap-2 mr-4" onClick={() => setIsMenuOpen(false)}>
            <QuantaLoopLogo className="h-10 w-10" />
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-medium text-gray-300 transition-colors hover:text-primary"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="flex flex-1 items-center justify-end gap-2 sm:gap-4">
            <Popover open={isNotificationOpen} onOpenChange={setIsNotificationOpen}>
              <PopoverTrigger asChild>
                <Button variant="ghost" size="icon" className="relative text-white hover:text-primary">
                  <Bell className="h-5 w-5" />
                  {isNotificationOpen && (
                    <span className="absolute top-2 right-2 flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
                    </span>
                  )}
                  <span className="sr-only">Show notifications</span>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[90vw] max-w-sm mr-4 sm:mr-2">
                <button onClick={() => setIsNotificationOpen(false)} className="absolute right-6 top-2 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
                  <X className="h-4 w-4" />
                  <span className="sr-only">Close</span>
                </button>
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <h4 className="font-medium leading-none font-headline">Auditions Are Live!</h4>
                    <p className="text-sm text-muted-foreground">
                      Ready to join the loop? Fill out the form to apply now.
                    </p>
                  </div>
                  <Link href="/join" onClick={() => setIsNotificationOpen(false)}>
                      <Button className="w-full">Register Now</Button>
                  </Link>
                </div>
              </PopoverContent>
            </Popover>
            <div className="hidden md:flex items-center gap-2">
              <Link href="/join">
                 <Button className="bg-primary hover:bg-secondary text-black rounded-full shadow-lg shadow-primary/40 hover:shadow-secondary/60 transition-all duration-300">Join</Button>
              </Link>
            </div>
            <div className="md:hidden">
              <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="text-white hover:text-primary">
                    <Menu className="h-6 w-6" />
                    <span className="sr-only">Open menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[240px] bg-background text-white border-l border-purple-500/50">
                  <SheetHeader>
                    <SheetTitle className="sr-only">Menu</SheetTitle>
                  </SheetHeader>
                  <div className="p-4">
                    <Link href="/" className="flex items-center gap-2 mb-8" onClick={() => setIsMenuOpen(false)}>
                      <QuantaLoopLogo className="h-8 w-8" />
                      <span className="font-bold text-lg font-headline tracking-widest">QUANTALOOP</span>
                    </Link>
                    <div className="flex flex-col gap-6">
                      {navLinks.map((link) => (
                        <Link
                          key={link.href}
                          href={link.href}
                          onClick={() => setIsMenuOpen(false)}
                          className="text-lg font-medium hover:text-primary transition-colors"
                        >
                          {link.label}
                        </Link>
                      ))}
                      <Link
                          href="/join"
                          onClick={() => {
                            setIsMenuOpen(false);
                          }}
                          className="text-lg font-medium hover:text-primary transition-colors"
                        >
                          Join
                        </Link>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}
