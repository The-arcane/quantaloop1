import { Users, Lightbulb, GraduationCap } from "lucide-react";

export default function Mission() {
  return (
    <section id="mission" className="py-16 sm:py-24 bg-card/50 border-t border-b border-purple-500/20">
      <div className="container max-w-4xl mx-auto text-center animate-fadeInUp">
        <h2 className="text-3xl font-headline font-bold tracking-tight sm:text-4xl uppercase" style={{ animationDelay: '0.4s' }}>Our Mission</h2>
        <div className="relative mt-4 mb-8">
            <div className="absolute left-1/2 -translate-x-1/2 top-1/2 h-[2px] w-2/3 bg-gradient-to-r from-transparent via-purple-500 to-transparent"></div>
        </div>
        <p className="mt-8 text-lg leading-8 text-muted-foreground font-body" style={{ animationDelay: '0.6s' }}>
          QuantaLoop is a student-led technical society and in-house tech agency dedicated to fostering innovation, peer learning, and industry-ready skills among BCA students. We provide real-world project experience, mentorship, workshops, and networking opportunities to prepare future tech leaders.
        </p>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="flex flex-col items-center">
                <Lightbulb className="h-10 w-10 text-primary mb-3"/>
                <h3 className="font-headline text-xl font-semibold">Innovation</h3>
                <p className="text-muted-foreground mt-1">Fostering creative solutions and cutting-edge projects.</p>
            </div>
             <div className="flex flex-col items-center">
                <Users className="h-10 w-10 text-primary mb-3"/>
                <h3 className="font-headline text-xl font-semibold">Collaboration</h3>
                <p className="text-muted-foreground mt-1">Building a community through peer learning and teamwork.</p>
            </div>
             <div className="flex flex-col items-center">
                <GraduationCap className="h-10 w-10 text-primary mb-3"/>
                <h3 className="font-headline text-xl font-semibold">Growth</h3>
                <p className="text-muted-foreground mt-1">Developing industry-ready skills and future tech leaders.</p>
            </div>
        </div>
      </div>
    </section>
  );
}
