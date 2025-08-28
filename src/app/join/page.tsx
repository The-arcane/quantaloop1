import { ApplicationForm } from "@/components/ApplicationForm";
import { QuantaLoopLogo } from "@/components/QuantaLoopLogo";
import { Button } from "@/components/ui/button";
import { AnimatedBackground } from "@/components/landing/AnimatedBackground";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function JoinPage() {
  return (
    <div className="relative min-h-screen bg-background text-foreground flex flex-col items-center justify-center p-4 overflow-hidden">
      <div className="absolute inset-0 -z-10 h-full w-full bg-background">
        <AnimatedBackground />
      </div>
      <div className="w-full max-w-2xl mx-auto z-10 p-2 sm:p-0">
        <div className="flex justify-start w-full mb-4">
            <Link href="/">
                <Button variant="ghost">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Home
                </Button>
            </Link>
        </div>
        <div className="flex justify-center mb-4">
          <Link href="/">
            <QuantaLoopLogo className="w-24 h-24" />
          </Link>
        </div>
        <div className="bg-card/80 backdrop-blur-sm p-6 sm:p-8 rounded-lg border border-purple-500/20 shadow-xl">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-headline font-bold">QuantaLoop Application Form</h1>
            <p className="text-muted-foreground mt-2 px-4">
              Welcome to QuantaLoop – The Tech Society of BVIMR 🚀
            </p>
            <p className="text-sm text-muted-foreground mt-4 px-4">
              QuantaLoop is a student-led initiative that serves as the official Tech Society of BVIMR. It aims to unite the department’s talented students on a common platform to encourage innovation, collaboration, skill enhancement, and industry engagement. Our goal is to transform individual efforts into collective achievements, positioning the department as a vibrant hub of technological excellence. Join us in driving creativity, learning, and growth together!
            </p>
          </div>
          <ApplicationForm />
        </div>
      </div>
    </div>
  );
}
