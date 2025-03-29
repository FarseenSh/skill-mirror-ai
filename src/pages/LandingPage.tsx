
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Award,
  BrainCircuit,
  Briefcase,
  LayoutDashboard,
  Lightbulb,
  LineChart,
  MessagesSquare,
  Rocket,
} from "lucide-react";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <BrainCircuit className="h-8 w-8 text-skill-purple" />
            <span className="text-xl font-bold">SkillMirror</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <a href="#features" className="text-sm font-medium hover:text-primary">
              Features
            </a>
            <a href="#how-it-works" className="text-sm font-medium hover:text-primary">
              How It Works
            </a>
            <a href="#testimonials" className="text-sm font-medium hover:text-primary">
              Testimonials
            </a>
          </nav>
          <div className="flex items-center gap-4">
            <Link to="/auth/login">
              <Button variant="ghost" size="sm">
                Log in
              </Button>
            </Link>
            <Link to="/auth/signup">
              <Button size="sm">Get Started</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="hero-section">
          <div className="hero-overlay"></div>
          <div className="container relative z-10 flex flex-col items-center justify-center px-4 py-32 text-center text-white">
            <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl animate-fade-in">
              Master Professional Skills Through AI Simulation
            </h1>
            <p className="mb-10 max-w-prose text-lg sm:text-xl md:text-2xl animate-fade-in opacity-90">
              Practice and perfect your workplace skills with realistic AI colleagues in simulated environments
            </p>
            <div className="flex flex-col sm:flex-row gap-4 animate-slide-in">
              <Link to="/auth/signup">
                <Button size="lg" className="bg-white text-skill-purple hover:bg-gray-100">
                  Start Your Journey
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <a href="#how-it-works">
                <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
                  Learn How It Works
                </Button>
              </a>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-24 bg-muted/50">
          <div className="container px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
                Why Choose SkillMirror?
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Our platform offers a unique approach to professional development through simulated workplace experiences.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="feature-card">
                <div className="mb-4 rounded-full bg-primary/10 p-3 w-fit">
                  <MessagesSquare className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">AI Colleagues</h3>
                <p className="text-muted-foreground">
                  Interact with AI-powered colleagues that respond realistically to your decisions and communication style.
                </p>
              </div>

              <div className="feature-card">
                <div className="mb-4 rounded-full bg-primary/10 p-3 w-fit">
                  <Briefcase className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Realistic Scenarios</h3>
                <p className="text-muted-foreground">
                  Practice in carefully designed workplace situations that mirror real-world challenges.
                </p>
              </div>

              <div className="feature-card">
                <div className="mb-4 rounded-full bg-primary/10 p-3 w-fit">
                  <LineChart className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Skill Tracking</h3>
                <p className="text-muted-foreground">
                  Monitor your progress with detailed analytics that highlight strengths and areas for improvement.
                </p>
              </div>

              <div className="feature-card">
                <div className="mb-4 rounded-full bg-primary/10 p-3 w-fit">
                  <Lightbulb className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Personalized Learning</h3>
                <p className="text-muted-foreground">
                  Receive customized resources and exercises based on your performance and goals.
                </p>
              </div>

              <div className="feature-card">
                <div className="mb-4 rounded-full bg-primary/10 p-3 w-fit">
                  <Award className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Certification</h3>
                <p className="text-muted-foreground">
                  Earn verified credentials that showcase your practical skills to potential employers.
                </p>
              </div>

              <div className="feature-card">
                <div className="mb-4 rounded-full bg-primary/10 p-3 w-fit">
                  <LayoutDashboard className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Career Planning</h3>
                <p className="text-muted-foreground">
                  Map your professional journey with clear pathways to achieve your career goals.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="py-24">
          <div className="container px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
                How SkillMirror Works
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Our innovative approach to skill development combines AI technology with proven learning methodologies.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <div className="flex flex-col items-center text-center">
                <div className="mb-6 rounded-full bg-secondary/10 p-4">
                  <div className="rounded-full bg-secondary text-white w-12 h-12 flex items-center justify-center font-bold text-lg">1</div>
                </div>
                <h3 className="text-xl font-semibold mb-2">Select a Skill Path</h3>
                <p className="text-muted-foreground">
                  Choose from a variety of professional skills you want to develop, from leadership to technical expertise.
                </p>
              </div>

              <div className="flex flex-col items-center text-center">
                <div className="mb-6 rounded-full bg-secondary/10 p-4">
                  <div className="rounded-full bg-secondary text-white w-12 h-12 flex items-center justify-center font-bold text-lg">2</div>
                </div>
                <h3 className="text-xl font-semibold mb-2">Enter the Simulation</h3>
                <p className="text-muted-foreground">
                  Immerse yourself in realistic workplace scenarios with AI colleagues that adapt to your interactions.
                </p>
              </div>

              <div className="flex flex-col items-center text-center">
                <div className="mb-6 rounded-full bg-secondary/10 p-4">
                  <div className="rounded-full bg-secondary text-white w-12 h-12 flex items-center justify-center font-bold text-lg">3</div>
                </div>
                <h3 className="text-xl font-semibold mb-2">Reflect and Improve</h3>
                <p className="text-muted-foreground">
                  Receive detailed feedback and analytics to understand your performance and focus your further practice.
                </p>
              </div>
            </div>

            <div className="mt-16 text-center">
              <Link to="/auth/signup">
                <Button size="lg" className="animate-pulse">
                  Start Your First Simulation
                  <Rocket className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="py-24 bg-muted/50">
          <div className="container px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
                Success Stories
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Hear from professionals who have transformed their careers with SkillMirror.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-card p-6 rounded-xl shadow-sm">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-skill-blue text-white flex items-center justify-center font-bold text-lg mr-4">JD</div>
                  <div>
                    <h4 className="font-semibold">Jessica Davis</h4>
                    <p className="text-sm text-muted-foreground">Product Manager</p>
                  </div>
                </div>
                <p className="italic text-muted-foreground">
                  "SkillMirror helped me prepare for difficult conversations with stakeholders. The AI colleagues provided realistic pushback that made me think on my feet."
                </p>
              </div>

              <div className="bg-card p-6 rounded-xl shadow-sm">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-skill-purple text-white flex items-center justify-center font-bold text-lg mr-4">MK</div>
                  <div>
                    <h4 className="font-semibold">Michael Kim</h4>
                    <p className="text-sm text-muted-foreground">Software Engineer</p>
                  </div>
                </div>
                <p className="italic text-muted-foreground">
                  "The technical collaboration simulations improved my ability to explain complex concepts. I now lead architecture discussions with confidence."
                </p>
              </div>

              <div className="bg-card p-6 rounded-xl shadow-sm">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-skill-deepPurple text-white flex items-center justify-center font-bold text-lg mr-4">AR</div>
                  <div>
                    <h4 className="font-semibold">Aisha Robinson</h4>
                    <p className="text-sm text-muted-foreground">Marketing Director</p>
                  </div>
                </div>
                <p className="italic text-muted-foreground">
                  "After practicing with SkillMirror for three months, I secured a promotion. The interview simulations were incredibly similar to my actual interviews."
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-gradient-to-r from-skill-blue to-skill-purple text-white">
          <div className="container px-4 text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-6">
              Ready to Transform Your Professional Skills?
            </h2>
            <p className="text-xl mb-10 max-w-2xl mx-auto opacity-90">
              Join thousands of professionals using SkillMirror to advance their careers through realistic workplace simulations.
            </p>
            <Link to="/auth/signup">
              <Button size="lg" className="bg-white text-skill-purple hover:bg-gray-100">
                Start Your Free Trial
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t py-12 bg-muted/30">
        <div className="container px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <BrainCircuit className="h-6 w-6 text-skill-purple" />
              <span className="text-lg font-bold">SkillMirror</span>
            </div>
            <div className="flex flex-wrap justify-center gap-8">
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground">
                Terms of Service
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground">
                Privacy Policy
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground">
                Contact Us
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground">
                Blog
              </a>
            </div>
          </div>
          <div className="mt-8 text-center text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} SkillMirror. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
