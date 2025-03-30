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
  Check,
  ChevronRight,
  MousePointer,
  Sparkles,
} from "lucide-react";
import ScrollAnimation from "@/components/ScrollAnimation";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Logo } from "@/components/Logo";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2 group">
            <Logo className="group-hover:scale-110 transition-transform duration-300" />
            <span className="text-xl font-bold group-hover:text-primary transition-colors duration-300">SkillMirror</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <a href="#features" className="text-sm font-medium hover:text-primary transition-colors duration-300 relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-primary after:transition-all after:duration-300">
              Features
            </a>
            <a href="#how-it-works" className="text-sm font-medium hover:text-primary transition-colors duration-300 relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-primary after:transition-all after:duration-300">
              How It Works
            </a>
            <a href="#testimonials" className="text-sm font-medium hover:text-primary transition-colors duration-300 relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-primary after:transition-all after:duration-300">
              Testimonials
            </a>
          </nav>
          <div className="flex items-center gap-4">
            <ThemeToggle variant="minimal" />
            <Link to="/auth/login">
              <Button variant="ghost" size="sm" className="transition-all duration-300 hover:scale-105 hover:bg-primary/10">
                Log in
              </Button>
            </Link>
            <Link to="/auth/signup">
              <Button size="sm" className="shadow-lg hover:shadow-skill-purple/50 transition-all duration-300 hover:scale-105 animate-pulse hover:animate-none">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section - Enhanced with more animations */}
        <section className="relative overflow-hidden">
          {/* 3D Geometric Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-skill-blue via-skill-purple to-skill-deepPurple opacity-90">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2784&q=80')] bg-cover bg-center opacity-10"></div>
            <div className="absolute w-full h-full bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.2)_0%,rgba(255,255,255,0)_60%)]"></div>
            <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent"></div>
          </div>
          
          {/* Animated Particles with enhanced animations */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="particle-1"></div>
            <div className="particle-2"></div>
            <div className="particle-3"></div>
            <div className="absolute top-[20%] right-[15%] w-20 h-20 rounded-full bg-white/10 backdrop-blur-md animate-[float_20s_ease-in-out_infinite]"></div>
            <div className="absolute bottom-[30%] left-[10%] w-32 h-32 rounded-full bg-white/5 backdrop-blur-sm animate-[float_25s_ease-in-out_infinite_reverse]"></div>
          </div>
          
          {/* Hero Content */}
          <div className="container relative min-h-[90vh] flex flex-col items-center justify-center px-4 py-32 text-center text-white z-10">
            <div className="max-w-5xl mx-auto">
              <ScrollAnimation animation="fade-in">
                <div className="inline-block mb-3 px-4 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 animate-pulse">
                  <span className="text-sm font-medium flex items-center gap-1">
                    <Sparkles className="h-4 w-4 animate-ping" />
                    Next-Generation Skill Development Platform
                  </span>
                </div>
              </ScrollAnimation>
              
              <ScrollAnimation animation="fade-up" delay={1}>
                <h1 className="mb-6 text-5xl font-bold tracking-tight sm:text-6xl md:text-7xl bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80 drop-shadow-sm animate-[pulse_5s_ease-in-out_infinite]">
                  Master Professional Skills Through AI Simulation
                </h1>
              </ScrollAnimation>
              
              <ScrollAnimation animation="fade-up" delay={2}>
                <p className="mb-8 max-w-2xl mx-auto text-xl sm:text-2xl text-white/90">
                  Practice and perfect your workplace skills with realistic AI colleagues in simulated environments
                </p>
              </ScrollAnimation>
              
              <ScrollAnimation animation="fade-up" delay={3}>
                <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                  <Link to="/auth/signup">
                    <Button size="lg" className="bg-white text-skill-purple hover:bg-white/90 hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-white/30 group">
                      Start Your Journey
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                  <a href="#how-it-works">
                    <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10 transition-all duration-300 hover:scale-105">
                      Learn How It Works
                      <MousePointer className="ml-2 h-4 w-4 animate-bounce" />
                    </Button>
                  </a>
                </div>
              </ScrollAnimation>
              
              {/* Floating Stats Cards with enhanced hover effects */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
                <ScrollAnimation animation="fade-up" delay={4}>
                  <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20 transform hover:translate-y-[-5px] hover:bg-white/20 transition-all duration-500 shadow-lg hover:shadow-white/20">
                    <h3 className="text-2xl font-bold mb-1">500+</h3>
                    <p className="text-white/80">Workplace Scenarios</p>
                  </div>
                </ScrollAnimation>
                
                <ScrollAnimation animation="fade-up" delay={5}>
                  <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20 transform hover:translate-y-[-5px] hover:bg-white/20 transition-all duration-500 shadow-lg hover:shadow-white/20">
                    <h3 className="text-2xl font-bold mb-1">50,000+</h3>
                    <p className="text-white/80">Skills Improved</p>
                  </div>
                </ScrollAnimation>
                
                <ScrollAnimation animation="fade-up" delay={6}>
                  <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20 transform hover:translate-y-[-5px] hover:bg-white/20 transition-all duration-500 shadow-lg hover:shadow-white/20">
                    <h3 className="text-2xl font-bold mb-1">98%</h3>
                    <p className="text-white/80">User Satisfaction</p>
                  </div>
                </ScrollAnimation>
              </div>
            </div>
          </div>
          
          {/* Mouse Scroll Indicator with enhanced animation */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <div className="w-8 h-12 rounded-full border-2 border-white/50 flex items-start justify-center p-1 animate-pulse">
              <div className="w-1 h-2 bg-white/80 rounded-full animate-[bounce_1.5s_ease_infinite]"></div>
            </div>
          </div>
        </section>

        {/* Features Section - Enhanced with Animations */}
        <section id="features" className="py-24 bg-muted/30">
          <div className="container px-4">
            <ScrollAnimation animation="fade-up">
              <div className="text-center mb-16">
                <div className="inline-block mb-3 px-4 py-1 rounded-full bg-primary/10">
                  <span className="text-sm font-medium text-primary flex items-center gap-1">
                    <Sparkles className="h-4 w-4 animate-spin animate-duration-[3s]" />
                    Platform Highlights
                  </span>
                </div>
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
                  Why Choose SkillMirror?
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Our platform offers a unique approach to professional development through simulated workplace experiences.
                </p>
              </div>
            </ScrollAnimation>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <ScrollAnimation animation="slide-in-left" delay={1}>
                <div className="feature-card transform hover:translate-y-[-5px] transition-all duration-300 hover:shadow-lg hover:border-primary/50 group">
                  <div className="mb-4 rounded-full bg-primary/10 p-3 w-fit group-hover:bg-primary/20 transition-colors duration-300">
                    <MessagesSquare className="h-6 w-6 text-primary group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors duration-300">AI Colleagues</h3>
                  <p className="text-muted-foreground">
                    Interact with AI-powered colleagues that respond realistically to your decisions and communication style.
                  </p>
                </div>
              </ScrollAnimation>

              <ScrollAnimation animation="fade-up" delay={2}>
                <div className="feature-card transform hover:translate-y-[-5px] transition-all duration-300 hover:shadow-lg hover:border-primary/50 group">
                  <div className="mb-4 rounded-full bg-primary/10 p-3 w-fit group-hover:bg-primary/20 transition-colors duration-300">
                    <Briefcase className="h-6 w-6 text-primary group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors duration-300">Realistic Scenarios</h3>
                  <p className="text-muted-foreground">
                    Practice in carefully designed workplace situations that mirror real-world challenges.
                  </p>
                </div>
              </ScrollAnimation>

              <ScrollAnimation animation="slide-in-right" delay={3}>
                <div className="feature-card transform hover:translate-y-[-5px] transition-all duration-300 hover:shadow-lg hover:border-primary/50 group">
                  <div className="mb-4 rounded-full bg-primary/10 p-3 w-fit group-hover:bg-primary/20 transition-colors duration-300">
                    <LineChart className="h-6 w-6 text-primary group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors duration-300">Skill Tracking</h3>
                  <p className="text-muted-foreground">
                    Monitor your progress with detailed analytics that highlight strengths and areas for improvement.
                  </p>
                </div>
              </ScrollAnimation>

              <ScrollAnimation animation="slide-in-left" delay={4}>
                <div className="feature-card transform hover:translate-y-[-5px] transition-all duration-300 hover:shadow-lg hover:border-primary/50 group">
                  <div className="mb-4 rounded-full bg-primary/10 p-3 w-fit group-hover:bg-primary/20 transition-colors duration-300">
                    <Lightbulb className="h-6 w-6 text-primary group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors duration-300">Personalized Learning</h3>
                  <p className="text-muted-foreground">
                    Receive customized resources and exercises based on your performance and goals.
                  </p>
                </div>
              </ScrollAnimation>

              <ScrollAnimation animation="fade-up" delay={5}>
                <div className="feature-card transform hover:translate-y-[-5px] transition-all duration-300 hover:shadow-lg hover:border-primary/50 group">
                  <div className="mb-4 rounded-full bg-primary/10 p-3 w-fit group-hover:bg-primary/20 transition-colors duration-300">
                    <Award className="h-6 w-6 text-primary group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors duration-300">Certification</h3>
                  <p className="text-muted-foreground">
                    Earn verified credentials that showcase your practical skills to potential employers.
                  </p>
                </div>
              </ScrollAnimation>

              <ScrollAnimation animation="slide-in-right" delay={6}>
                <div className="feature-card transform hover:translate-y-[-5px] transition-all duration-300 hover:shadow-lg hover:border-primary/50 group">
                  <div className="mb-4 rounded-full bg-primary/10 p-3 w-fit group-hover:bg-primary/20 transition-colors duration-300">
                    <LayoutDashboard className="h-6 w-6 text-primary group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors duration-300">Career Planning</h3>
                  <p className="text-muted-foreground">
                    Map your professional journey with clear pathways to achieve your career goals.
                  </p>
                </div>
              </ScrollAnimation>
            </div>
          </div>
        </section>

        {/* How It Works Section - Enhanced with more animations */}
        <section id="how-it-works" className="py-24 bg-gradient-to-br from-background to-muted/50">
          <div className="container px-4">
            <ScrollAnimation animation="fade-up">
              <div className="text-center mb-16">
                <div className="inline-block mb-3 px-4 py-1 rounded-full bg-secondary/50">
                  <span className="text-sm font-medium text-secondary-foreground flex items-center gap-1">
                    <Sparkles className="h-4 w-4 animate-pulse" />
                    Simple Process
                  </span>
                </div>
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
                  How SkillMirror Works
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Our innovative approach to skill development combines AI technology with proven learning methodologies.
                </p>
              </div>
            </ScrollAnimation>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-12 relative">
              {/* Connection Line with animation */}
              <div className="hidden md:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-skill-blue via-skill-purple to-skill-deepPurple transform -translate-y-1/2 z-0 animate-pulse"></div>
              
              <ScrollAnimation animation="fade-up" delay={1}>
                <div className="relative z-10 flex flex-col items-center text-center bg-card p-8 rounded-xl shadow-lg border border-border hover:shadow-xl transition-all duration-500 hover:border-skill-blue/50 group">
                  <div className="mb-6 rounded-full bg-skill-blue/10 p-4 group-hover:bg-skill-blue/20 transition-all duration-300">
                    <div className="rounded-full bg-skill-blue text-white w-14 h-14 flex items-center justify-center font-bold text-2xl group-hover:scale-110 transition-transform duration-300">1</div>
                  </div>
                  <h3 className="text-xl font-semibold mb-3 group-hover:text-skill-blue transition-colors duration-300">Select a Skill Path</h3>
                  <p className="text-muted-foreground">
                    Choose from a variety of professional skills you want to develop, from leadership to technical expertise.
                  </p>
                  <div className="mt-4 flex items-center justify-center">
                    <ChevronRight className="h-6 w-6 text-skill-blue group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                </div>
              </ScrollAnimation>

              <ScrollAnimation animation="fade-up" delay={3}>
                <div className="relative z-10 flex flex-col items-center text-center bg-card p-8 rounded-xl shadow-lg border border-border hover:shadow-xl transition-all duration-500 hover:border-skill-purple/50 group">
                  <div className="mb-6 rounded-full bg-skill-purple/10 p-4 group-hover:bg-skill-purple/20 transition-all duration-300">
                    <div className="rounded-full bg-skill-purple text-white w-14 h-14 flex items-center justify-center font-bold text-2xl group-hover:scale-110 transition-transform duration-300">2</div>
                  </div>
                  <h3 className="text-xl font-semibold mb-3 group-hover:text-skill-purple transition-colors duration-300">Enter the Simulation</h3>
                  <p className="text-muted-foreground">
                    Immerse yourself in realistic workplace scenarios with AI colleagues that adapt to your interactions.
                  </p>
                  <div className="mt-4 flex items-center justify-center">
                    <ChevronRight className="h-6 w-6 text-skill-purple group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                </div>
              </ScrollAnimation>

              <ScrollAnimation animation="fade-up" delay={5}>
                <div className="relative z-10 flex flex-col items-center text-center bg-card p-8 rounded-xl shadow-lg border border-border hover:shadow-xl transition-all duration-500 hover:border-skill-deepPurple/50 group">
                  <div className="mb-6 rounded-full bg-skill-deepPurple/10 p-4 group-hover:bg-skill-deepPurple/20 transition-all duration-300">
                    <div className="rounded-full bg-skill-deepPurple text-white w-14 h-14 flex items-center justify-center font-bold text-2xl group-hover:scale-110 transition-transform duration-300">3</div>
                  </div>
                  <h3 className="text-xl font-semibold mb-3 group-hover:text-skill-deepPurple transition-colors duration-300">Reflect and Improve</h3>
                  <p className="text-muted-foreground">
                    Receive detailed feedback and analytics to understand your performance and focus your further practice.
                  </p>
                  <div className="mt-4 flex items-center justify-center">
                    <Check className="h-6 w-6 text-skill-deepPurple group-hover:scale-125 transition-transform duration-300" />
                  </div>
                </div>
              </ScrollAnimation>
            </div>

            <ScrollAnimation animation="fade-up" delay={7}>
              <div className="mt-16 text-center">
                <Link to="/auth/signup">
                  <Button size="lg" className="bg-gradient-to-r from-skill-blue to-skill-purple text-white hover:shadow-lg hover:shadow-skill-purple/30 transition-all duration-300 hover:scale-105 group relative overflow-hidden">
                    <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-skill-blue to-skill-purple opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
                    <span className="relative z-10 flex items-center">
                      Start Your First Simulation
                      <Rocket className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                    </span>
                  </Button>
                </Link>
              </div>
            </ScrollAnimation>
          </div>
        </section>

        {/* Testimonials Section - Enhanced */}
        <section id="testimonials" className="py-24 bg-gradient-to-br from-muted/30 to-background">
          <div className="container px-4">
            <ScrollAnimation animation="fade-up">
              <div className="text-center mb-16">
                <div className="inline-block mb-3 px-4 py-1 rounded-full bg-accent/10">
                  <span className="text-sm font-medium text-accent-foreground flex items-center gap-1">
                    <Sparkles className="h-4 w-4" />
                    User Testimonials
                  </span>
                </div>
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
                  Success Stories
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Hear from professionals who have transformed their careers with SkillMirror.
                </p>
              </div>
            </ScrollAnimation>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <ScrollAnimation animation="slide-in-left" delay={1}>
                <div className="bg-card p-8 rounded-xl shadow-md hover:shadow-xl transition-duration-300 border border-border relative hover:translate-y-[-5px] transition-all duration-300">
                  <div className="absolute top-0 right-0 transform translate-x-3 -translate-y-3">
                    <div className="text-6xl text-primary/10 font-serif">"</div>
                  </div>
                  <div className="flex items-center mb-6">
                    <div className="w-14 h-14 rounded-full bg-skill-blue text-white flex items-center justify-center font-bold text-lg mr-4 shadow-md">JD</div>
                    <div>
                      <h4 className="font-semibold">Jessica Davis</h4>
                      <p className="text-sm text-muted-foreground">Product Manager</p>
                    </div>
                  </div>
                  <p className="italic text-muted-foreground relative z-10">
                    "SkillMirror helped me prepare for difficult conversations with stakeholders. The AI colleagues provided realistic pushback that made me think on my feet."
                  </p>
                  <div className="mt-4 flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span key={star} className="text-yellow-400">★</span>
                    ))}
                  </div>
                </div>
              </ScrollAnimation>

              <ScrollAnimation animation="fade-up" delay={3}>
                <div className="bg-card p-8 rounded-xl shadow-md hover:shadow-xl transition-duration-300 border border-border relative hover:translate-y-[-5px] transition-all duration-300">
                  <div className="absolute top-0 right-0 transform translate-x-3 -translate-y-3">
                    <div className="text-6xl text-primary/10 font-serif">"</div>
                  </div>
                  <div className="flex items-center mb-6">
                    <div className="w-14 h-14 rounded-full bg-skill-purple text-white flex items-center justify-center font-bold text-lg mr-4 shadow-md">MK</div>
                    <div>
                      <h4 className="font-semibold">Michael Kim</h4>
                      <p className="text-sm text-muted-foreground">Software Engineer</p>
                    </div>
                  </div>
                  <p className="italic text-muted-foreground relative z-10">
                    "The technical collaboration simulations improved my ability to explain complex concepts. I now lead architecture discussions with confidence."
                  </p>
                  <div className="mt-4 flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span key={star} className="text-yellow-400">★</span>
                    ))}
                  </div>
                </div>
              </ScrollAnimation>

              <ScrollAnimation animation="slide-in-right" delay={5}>
                <div className="bg-card p-8 rounded-xl shadow-md hover:shadow-xl transition-duration-300 border border-border relative hover:translate-y-[-5px] transition-all duration-300">
                  <div className="absolute top-0 right-0 transform translate-x-3 -translate-y-3">
                    <div className="text-6xl text-primary/10 font-serif">"</div>
                  </div>
                  <div className="flex items-center mb-6">
                    <div className="w-14 h-14 rounded-full bg-skill-deepPurple text-white flex items-center justify-center font-bold text-lg mr-4 shadow-md">AR</div>
                    <div>
                      <h4 className="font-semibold">Aisha Robinson</h4>
                      <p className="text-sm text-muted-foreground">Marketing Director</p>
                    </div>
                  </div>
                  <p className="italic text-muted-foreground relative z-10">
                    "After practicing with SkillMirror for three months, I secured a promotion. The interview simulations were incredibly similar to my actual interviews."
                  </p>
                  <div className="mt-4 flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span key={star} className="text-yellow-400">★</span>
                    ))}
                  </div>
                </div>
              </ScrollAnimation>
            </div>
          </div>
        </section>

        {/* CTA Section - Enhanced */}
        <section className="py-24 bg-gradient-to-r from-skill-blue to-skill-purple text-white relative overflow-hidden">
          {/* Animated Background Pattern */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-[linear-gradient(45deg,var(--skill-blue)_25%,transparent_25%,transparent_50%,var(--skill-blue)_50%,var(--skill-blue)_75%,transparent_75%,transparent)] bg-[length:100px_100px] opacity-10 animate-[moveBg_30s_linear_infinite]"></div>
          </div>
        
          <ScrollAnimation animation="fade-up">
            <div className="container px-4 text-center relative z-10">
              <div className="max-w-3xl mx-auto">
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-6 drop-shadow-md animate-pulse">
                  Ready to Transform Your Professional Skills?
                </h2>
                <p className="text-xl mb-10 max-w-2xl mx-auto opacity-90">
                  Join thousands of professionals using SkillMirror to advance their careers through realistic workplace simulations.
                </p>
                
                <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-white/20 mb-10 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-[1.02]">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-left mb-6">
                    <div className="flex items-start group">
                      <div className="mr-3 rounded-full bg-white/20 p-1 group-hover:bg-white/40 transition-colors duration-300">
                        <Check className="h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
                      </div>
                      <div>
                        <h4 className="font-medium group-hover:text-white/80 transition-colors duration-300">Realistic Practice</h4>
                        <p className="text-sm text-white/70">Just like real workplace scenarios</p>
                      </div>
                    </div>
                    <div className="flex items-start group">
                      <div className="mr-3 rounded-full bg-white/20 p-1 group-hover:bg-white/40 transition-colors duration-300">
                        <Check className="h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
                      </div>
                      <div>
                        <h4 className="font-medium group-hover:text-white/80 transition-colors duration-300">Immediate Feedback</h4>
                        <p className="text-sm text-white/70">Learn and improve in real-time</p>
                      </div>
                    </div>
                    <div className="flex items-start group">
                      <div className="mr-3 rounded-full bg-white/20 p-1 group-hover:bg-white/40 transition-colors duration-300">
                        <Check className="h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
                      </div>
                      <div>
                        <h4 className="font-medium group-hover:text-white/80 transition-colors duration-300">Career Advancement</h4>
                        <p className="text-sm text-white/70">Skills that employers value</p>
                      </div>
                    </div>
                  </div>
                  
                  <Link to="/auth/signup" className="inline-block">
                    <Button size="lg" className="bg-white text-skill-purple hover:bg-white/90 shadow-lg hover:shadow-white/30 transition-all duration-300 hover:scale-105 font-bold group">
                      Start Your Free Trial
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                    </Button>
                  </Link>
                  <p className="mt-4 text-sm text-white/70">No credit card required. 14-day free trial.</p>
                </div>
              </div>
            </div>
          </ScrollAnimation>
        </section>
      </main>

      {/* Footer with enhanced animations */}
      <footer className="border-t py-12 bg-muted/30">
        <div className="container px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-6 md:mb-0 group">
              <Logo className="group-hover:scale-110 transition-transform duration-300" />
              <span className="text-lg font-bold group-hover:text-primary transition-colors duration-300">SkillMirror</span>
            </div>
            <div className="flex flex-wrap justify-center gap-8">
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-primary after:transition-all after:duration-300">
                Terms of Service
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-primary after:transition-all after:duration-300">
                Privacy Policy
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-primary after:transition-all after:duration-300">
                Contact Us
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-primary after:transition-all after:duration-300">
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
