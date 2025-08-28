import { QuantaLoopLogo } from "@/components/QuantaLoopLogo";
import { Instagram, Linkedin } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";

export default function Footer() {
  return (
    <footer className="border-t border-purple-500/20">
      <div className="container py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <QuantaLoopLogo className="h-8 w-8" />
          <p className="text-sm text-muted-foreground text-center sm:text-left">QuantaLoop- Official Technical Society of Bvimr</p>
        </div>
        <div className="flex items-center gap-2">
            <Link href="https://www.linkedin.com/company/quantaloop-technical-society-of-bvimr/" target="_blank" rel="noopener noreferrer">
                <Button variant="ghost" size="icon">
                    <Linkedin className="h-5 w-5 text-muted-foreground hover:text-primary transition-colors" />
                    <span className="sr-only">LinkedIn</span>
                </Button>
            </Link>
             <Link href="https://www.instagram.com/quantaloop_bvimr?igsh=OXo1aml4ZDB5c2p3" target="_blank" rel="noopener noreferrer">
                <Button variant="ghost" size="icon">
                    <Instagram className="h-5 w-5 text-muted-foreground hover:text-primary transition-colors" />
                    <span className="sr-only">Instagram</span>
                </Button>
            </Link>
        </div>
      </div>
    </footer>
  )
}
