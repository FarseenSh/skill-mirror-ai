
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
  CheckCircle2,
  PlayCircle,
  BarChart3,
  Clock,
  User,
  FileText,
  Zap,
} from "lucide-react";
import ScrollAnimation from "@/components/ScrollAnimation";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Logo } from "@/components/Logo";
import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from "@/components/AuthProvider";

export default function LandingPage() {
  const { user } = useAuth();
  
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
            <a href="#pricing" className="text-sm font-medium hover:text-primary transition-colors duration-300 relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-primary after:transition-all after:duration-300">
              Pricing
            </a>
          </nav>
          <div className="flex items-center gap-4">
            <ThemeToggle variant="minimal" />
            {user ? (
              <Link to="/app/dashboard">
                <Button variant="default" size="sm" className="transition-all duration-300 hover:scale-105">
                  Dashboard
                </Button>
              </Link>
            ) : (
              <>
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
              </>
            )}
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section - Enhanced with more targeted content */}
        <section className="relative overflow-hidden">
          {/* 3D Geometric Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-skill-blue via-skill-purple to-skill-deepPurple opacity-90">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2784&q=80')] bg-cover bg-center opacity-10"></div>
            <div className="absolute w-full h-full bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.2)_0%,rgba(255,255,255,0)_60%)]"></div>
            <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent"></div>
          </div>
          
          {/* Animated Particles */}
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
                    AI-Powered Professional Development Platform
                  </span>
                </div>
              </ScrollAnimation>
              
              <ScrollAnimation animation="fade-up" delay={1}>
                <h1 className="mb-6 text-5xl font-bold tracking-tight sm:text-6xl md:text-7xl bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80 drop-shadow-sm">
                  Master Real-World Skills with <span className="text-skill-lightBlue">AI Simulation</span>
                </h1>
              </ScrollAnimation>
              
              <ScrollAnimation animation="fade-up" delay={2}>
                <p className="mb-8 max-w-2xl mx-auto text-xl sm:text-2xl text-white/90">
                  Practice with AI colleagues in realistic workplace scenarios and get personalized feedback to accelerate your career growth
                </p>
              </ScrollAnimation>
              
              <ScrollAnimation animation="fade-up" delay={3}>
                <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                  <Link to="/auth/signup">
                    <Button size="lg" className="bg-white text-skill-purple hover:bg-white/90 hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-white/30 group">
                      Start Free Trial
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                  <a href="#demo-video">
                    <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10 transition-all duration-300 hover:scale-105 group">
                      <PlayCircle className="mr-2 h-5 w-5 group-hover:animate-pulse" />
                      See How It Works
                    </Button>
                  </a>
                </div>
              </ScrollAnimation>
              
              {/* Key Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
                <ScrollAnimation animation="fade-up" delay={4}>
                  <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20 transform hover:translate-y-[-5px] hover:bg-white/20 transition-all duration-500 shadow-lg hover:shadow-white/20">
                    <h3 className="text-2xl font-bold mb-1">500+</h3>
                    <p className="text-white/80">Workplace Scenarios</p>
                  </div>
                </ScrollAnimation>
                
                <ScrollAnimation animation="fade-up" delay={5}>
                  <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20 transform hover:translate-y-[-5px] hover:bg-white/20 transition-all duration-500 shadow-lg hover:shadow-white/20">
                    <h3 className="text-2xl font-bold mb-1">94%</h3>
                    <p className="text-white/80">Skill Improvement</p>
                  </div>
                </ScrollAnimation>
                
                <ScrollAnimation animation="fade-up" delay={6}>
                  <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20 transform hover:translate-y-[-5px] hover:bg-white/20 transition-all duration-500 shadow-lg hover:shadow-white/20">
                    <h3 className="text-2xl font-bold mb-1">12K+</h3>
                    <p className="text-white/80">Active Users</p>
                  </div>
                </ScrollAnimation>
              </div>
            </div>
          </div>
          
          {/* Mouse Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <div className="w-8 h-12 rounded-full border-2 border-white/50 flex items-start justify-center p-1 animate-pulse">
              <div className="w-1 h-2 bg-white/80 rounded-full animate-[bounce_1.5s_ease_infinite]"></div>
            </div>
          </div>
        </section>

        {/* Featured In Section - NEW */}
        <section className="py-12 bg-muted/20">
          <div className="container px-4">
            <ScrollAnimation animation="fade-up">
              <div className="text-center mb-6">
                <p className="text-sm uppercase text-muted-foreground tracking-wider">Trusted by professionals from</p>
              </div>
              <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
                <img src="https://placeholder.pics/svg/150x50/DEDEDE/555555/COMPANY" alt="Company Logo" className="h-6 md:h-8 opacity-50 hover:opacity-80 transition-opacity" />
                <img src="https://placeholder.pics/svg/150x50/DEDEDE/555555/BRAND" alt="Brand Logo" className="h-6 md:h-8 opacity-50 hover:opacity-80 transition-opacity" />
                <img src="https://placeholder.pics/svg/150x50/DEDEDE/555555/ENTERPRISE" alt="Enterprise Logo" className="h-6 md:h-8 opacity-50 hover:opacity-80 transition-opacity" />
                <img src="https://placeholder.pics/svg/150x50/DEDEDE/555555/TECH" alt="Tech Logo" className="h-6 md:h-8 opacity-50 hover:opacity-80 transition-opacity" />
                <img src="https://placeholder.pics/svg/150x50/DEDEDE/555555/CORP" alt="Corp Logo" className="h-6 md:h-8 opacity-50 hover:opacity-80 transition-opacity" />
              </div>
            </ScrollAnimation>
          </div>
        </section>

        {/* Key Features Section - Redesigned */}
        <section id="features" className="py-24 bg-muted/30">
          <div className="container px-4">
            <ScrollAnimation animation="fade-up">
              <div className="text-center mb-16">
                <div className="inline-block mb-3 px-4 py-1 rounded-full bg-primary/10">
                  <span className="text-sm font-medium text-primary flex items-center gap-1">
                    <Sparkles className="h-4 w-4" />
                    Platform Highlights
                  </span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                  Accelerate Your Career Development
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  SkillMirror combines AI technology with proven learning methodologies to create a uniquely effective skill development experience.
                </p>
              </div>
            </ScrollAnimation>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <ScrollAnimation animation="slide-in-left" delay={1}>
                <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group hover:-translate-y-1">
                  <div className="h-2 bg-skill-blue w-full"></div>
                  <CardContent className="p-6 pt-8">
                    <div className="mb-4 rounded-full bg-skill-blue/10 p-3 w-fit group-hover:bg-skill-blue/20 transition-colors duration-300">
                      <BrainCircuit className="h-6 w-6 text-skill-blue group-hover:scale-110 transition-transform duration-300" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2 group-hover:text-skill-blue transition-colors duration-300">AI Colleagues</h3>
                    <p className="text-muted-foreground">
                      Interact with AI personas that respond realistically to your communication style and decisions, providing a safe space to practice.
                    </p>
                    <ul className="mt-4 space-y-2">
                      <li className="flex items-start">
                        <CheckCircle2 className="h-5 w-5 text-skill-blue mr-2 flex-shrink-0 mt-0.5" />
                        <span className="text-sm">Adaptive responses based on your style</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle2 className="h-5 w-5 text-skill-blue mr-2 flex-shrink-0 mt-0.5" />
                        <span className="text-sm">Different personality types to practice with</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </ScrollAnimation>

              <ScrollAnimation animation="fade-up" delay={2}>
                <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group hover:-translate-y-1">
                  <div className="h-2 bg-skill-purple w-full"></div>
                  <CardContent className="p-6 pt-8">
                    <div className="mb-4 rounded-full bg-skill-purple/10 p-3 w-fit group-hover:bg-skill-purple/20 transition-colors duration-300">
                      <Briefcase className="h-6 w-6 text-skill-purple group-hover:scale-110 transition-transform duration-300" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2 group-hover:text-skill-purple transition-colors duration-300">Realistic Scenarios</h3>
                    <p className="text-muted-foreground">
                      Practice in carefully designed workplace situations that mirror real-world challenges across various industries.
                    </p>
                    <ul className="mt-4 space-y-2">
                      <li className="flex items-start">
                        <CheckCircle2 className="h-5 w-5 text-skill-purple mr-2 flex-shrink-0 mt-0.5" />
                        <span className="text-sm">Industry-specific challenges and scenarios</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle2 className="h-5 w-5 text-skill-purple mr-2 flex-shrink-0 mt-0.5" />
                        <span className="text-sm">Varying difficulty levels for progressive learning</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </ScrollAnimation>

              <ScrollAnimation animation="slide-in-right" delay={3}>
                <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group hover:-translate-y-1">
                  <div className="h-2 bg-skill-deepPurple w-full"></div>
                  <CardContent className="p-6 pt-8">
                    <div className="mb-4 rounded-full bg-skill-deepPurple/10 p-3 w-fit group-hover:bg-skill-deepPurple/20 transition-colors duration-300">
                      <BarChart3 className="h-6 w-6 text-skill-deepPurple group-hover:scale-110 transition-transform duration-300" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2 group-hover:text-skill-deepPurple transition-colors duration-300">Skill Analytics</h3>
                    <p className="text-muted-foreground">
                      Track your progress with detailed analytics that highlight strengths and specific areas for improvement.
                    </p>
                    <ul className="mt-4 space-y-2">
                      <li className="flex items-start">
                        <CheckCircle2 className="h-5 w-5 text-skill-deepPurple mr-2 flex-shrink-0 mt-0.5" />
                        <span className="text-sm">Personalized skill radar and trend charts</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle2 className="h-5 w-5 text-skill-deepPurple mr-2 flex-shrink-0 mt-0.5" />
                        <span className="text-sm">Benchmarking against industry standards</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </ScrollAnimation>

              <ScrollAnimation animation="slide-in-left" delay={4}>
                <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group hover:-translate-y-1">
                  <div className="h-2 bg-skill-lightBlue w-full"></div>
                  <CardContent className="p-6 pt-8">
                    <div className="mb-4 rounded-full bg-skill-lightBlue/10 p-3 w-fit group-hover:bg-skill-lightBlue/20 transition-colors duration-300">
                      <Lightbulb className="h-6 w-6 text-skill-lightBlue group-hover:scale-110 transition-transform duration-300" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2 group-hover:text-skill-lightBlue transition-colors duration-300">Personalized Learning</h3>
                    <p className="text-muted-foreground">
                      Receive customized resources and exercises based on your performance, goals, and learning patterns.
                    </p>
                    <ul className="mt-4 space-y-2">
                      <li className="flex items-start">
                        <CheckCircle2 className="h-5 w-5 text-skill-lightBlue mr-2 flex-shrink-0 mt-0.5" />
                        <span className="text-sm">Adaptive learning paths based on performance</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle2 className="h-5 w-5 text-skill-lightBlue mr-2 flex-shrink-0 mt-0.5" />
                        <span className="text-sm">AI-curated resource recommendations</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </ScrollAnimation>

              <ScrollAnimation animation="fade-up" delay={5}>
                <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group hover:-translate-y-1">
                  <div className="h-2 bg-skill-lightPurple w-full"></div>
                  <CardContent className="p-6 pt-8">
                    <div className="mb-4 rounded-full bg-skill-lightPurple/10 p-3 w-fit group-hover:bg-skill-lightPurple/20 transition-colors duration-300">
                      <Award className="h-6 w-6 text-skill-lightPurple group-hover:scale-110 transition-transform duration-300" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2 group-hover:text-skill-lightPurple transition-colors duration-300">Certification</h3>
                    <p className="text-muted-foreground">
                      Earn verified credentials that showcase your practical skills to employers and enhance your portfolio.
                    </p>
                    <ul className="mt-4 space-y-2">
                      <li className="flex items-start">
                        <CheckCircle2 className="h-5 w-5 text-skill-lightPurple mr-2 flex-shrink-0 mt-0.5" />
                        <span className="text-sm">Industry-recognized skill credentials</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle2 className="h-5 w-5 text-skill-lightPurple mr-2 flex-shrink-0 mt-0.5" />
                        <span className="text-sm">Shareable achievement badges</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </ScrollAnimation>

              <ScrollAnimation animation="slide-in-right" delay={6}>
                <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group hover:-translate-y-1">
                  <div className="h-2 bg-primary w-full"></div>
                  <CardContent className="p-6 pt-8">
                    <div className="mb-4 rounded-full bg-primary/10 p-3 w-fit group-hover:bg-primary/20 transition-colors duration-300">
                      <LayoutDashboard className="h-6 w-6 text-primary group-hover:scale-110 transition-transform duration-300" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors duration-300">Career Planning</h3>
                    <p className="text-muted-foreground">
                      Map your professional journey with clear pathways and objectives to achieve your career goals.
                    </p>
                    <ul className="mt-4 space-y-2">
                      <li className="flex items-start">
                        <CheckCircle2 className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                        <span className="text-sm">Career path visualization and planning</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle2 className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                        <span className="text-sm">Skill gap analysis for targeted roles</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </ScrollAnimation>
            </div>
          </div>
        </section>

        {/* Demo Video Section - NEW */}
        <section id="demo-video" className="py-24 bg-gradient-to-br from-background to-muted/20 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-muted/30 to-transparent"></div>
          <div className="container px-4">
            <ScrollAnimation animation="fade-up">
              <div className="text-center mb-12">
                <div className="inline-block mb-3 px-4 py-1 rounded-full bg-skill-blue/10">
                  <span className="text-sm font-medium text-skill-blue flex items-center gap-1">
                    <PlayCircle className="h-4 w-4" />
                    Live Demo
                  </span>
                </div>
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
                  See SkillMirror in Action
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Watch how our platform creates realistic workplace simulations to help you practice and perfect your professional skills
                </p>
              </div>
            </ScrollAnimation>
            
            <ScrollAnimation animation="scale-in">
              <div className="relative max-w-4xl mx-auto rounded-2xl overflow-hidden shadow-2xl border border-border/50 aspect-video bg-muted/50 backdrop-blur-sm group">
                {/* Video Placeholder - Would be replaced with actual video */}
                <div className="absolute inset-0 flex items-center justify-center hover:bg-black/20 transition-colors">
                  <div className="h-20 w-20 rounded-full bg-white/90 shadow-lg flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                    <PlayCircle className="h-10 w-10 text-skill-blue fill-skill-blue/20" />
                  </div>
                </div>
                <img 
                  src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80" 
                  alt="SkillMirror Platform Demo" 
                  className="w-full h-full object-cover opacity-80"
                />
              </div>
            </ScrollAnimation>
          </div>
        </section>

        {/* How It Works Section - Enhanced */}
        <section id="how-it-works" className="py-24 bg-muted/30">
          <div className="container px-4">
            <ScrollAnimation animation="fade-up">
              <div className="text-center mb-16">
                <div className="inline-block mb-3 px-4 py-1 rounded-full bg-secondary/20">
                  <span className="text-sm font-medium text-secondary-foreground flex items-center gap-1">
                    <Sparkles className="h-4 w-4" />
                    Simple Process
                  </span>
                </div>
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
                  Your Journey to Better Skills
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Four simple steps to transform your professional capabilities with SkillMirror
                </p>
              </div>
            </ScrollAnimation>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-8 relative">
              {/* Connection Line */}
              <div className="hidden md:block absolute top-24 left-0 right-0 h-1 bg-gradient-to-r from-skill-blue via-skill-purple to-skill-deepPurple transform -translate-y-1/2 z-0"></div>
              
              <ScrollAnimation animation="fade-up" delay={1}>
                <div className="relative z-10 flex flex-col items-center text-center p-6 rounded-xl border border-border bg-card shadow-lg hover:shadow-xl transition-all duration-300 hover:border-skill-blue/50 group">
                  <div className="mb-4 rounded-full bg-skill-blue/10 p-4 group-hover:bg-skill-blue/20 transition-all duration-300">
                    <div className="rounded-full bg-skill-blue text-white w-12 h-12 flex items-center justify-center font-bold text-xl group-hover:scale-110 transition-transform duration-300">1</div>
                  </div>
                  <h3 className="text-lg font-semibold mb-2 group-hover:text-skill-blue transition-colors duration-300">Select a Skill</h3>
                  <p className="text-sm text-muted-foreground">
                    Choose from communication, leadership, negotiation, and more
                  </p>
                  <div className="mt-4 hidden md:flex items-center justify-center">
                    <ChevronRight className="h-6 w-6 text-skill-blue group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                </div>
              </ScrollAnimation>

              <ScrollAnimation animation="fade-up" delay={2}>
                <div className="relative z-10 flex flex-col items-center text-center p-6 rounded-xl border border-border bg-card shadow-lg hover:shadow-xl transition-all duration-300 hover:border-skill-purple/50 group">
                  <div className="mb-4 rounded-full bg-skill-purple/10 p-4 group-hover:bg-skill-purple/20 transition-all duration-300">
                    <div className="rounded-full bg-skill-purple text-white w-12 h-12 flex items-center justify-center font-bold text-xl group-hover:scale-110 transition-transform duration-300">2</div>
                  </div>
                  <h3 className="text-lg font-semibold mb-2 group-hover:text-skill-purple transition-colors duration-300">Enter Simulation</h3>
                  <p className="text-sm text-muted-foreground">
                    Interact with AI colleagues in realistic workplace scenarios
                  </p>
                  <div className="mt-4 hidden md:flex items-center justify-center">
                    <ChevronRight className="h-6 w-6 text-skill-purple group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                </div>
              </ScrollAnimation>

              <ScrollAnimation animation="fade-up" delay={3}>
                <div className="relative z-10 flex flex-col items-center text-center p-6 rounded-xl border border-border bg-card shadow-lg hover:shadow-xl transition-all duration-300 hover:border-skill-deepPurple/50 group">
                  <div className="mb-4 rounded-full bg-skill-deepPurple/10 p-4 group-hover:bg-skill-deepPurple/20 transition-all duration-300">
                    <div className="rounded-full bg-skill-deepPurple text-white w-12 h-12 flex items-center justify-center font-bold text-xl group-hover:scale-110 transition-transform duration-300">3</div>
                  </div>
                  <h3 className="text-lg font-semibold mb-2 group-hover:text-skill-deepPurple transition-colors duration-300">Get Feedback</h3>
                  <p className="text-sm text-muted-foreground">
                    Receive detailed analysis and actionable improvement tips
                  </p>
                  <div className="mt-4 hidden md:flex items-center justify-center">
                    <ChevronRight className="h-6 w-6 text-skill-deepPurple group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                </div>
              </ScrollAnimation>

              <ScrollAnimation animation="fade-up" delay={4}>
                <div className="relative z-10 flex flex-col items-center text-center p-6 rounded-xl border border-border bg-card shadow-lg hover:shadow-xl transition-all duration-300 hover:border-skill-lightBlue/50 group">
                  <div className="mb-4 rounded-full bg-skill-lightBlue/10 p-4 group-hover:bg-skill-lightBlue/20 transition-all duration-300">
                    <div className="rounded-full bg-skill-lightBlue text-white w-12 h-12 flex items-center justify-center font-bold text-xl group-hover:scale-110 transition-transform duration-300">4</div>
                  </div>
                  <h3 className="text-lg font-semibold mb-2 group-hover:text-skill-lightBlue transition-colors duration-300">Track Progress</h3>
                  <p className="text-sm text-muted-foreground">
                    Monitor your growth with visual skill analytics and charts
                  </p>
                  <div className="mt-4 hidden md:flex items-center justify-center">
                    <Check className="h-6 w-6 text-skill-lightBlue group-hover:scale-125 transition-transform duration-300" />
                  </div>
                </div>
              </ScrollAnimation>
            </div>

            <ScrollAnimation animation="fade-up" delay={5}>
              <div className="mt-16 text-center">
                <Link to="/auth/signup">
                  <Button size="lg" className="bg-gradient-to-r from-skill-blue to-skill-purple text-white hover:shadow-lg hover:shadow-skill-purple/30 transition-all duration-300 hover:scale-105 group relative overflow-hidden">
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

        {/* Skills Grid Section - NEW */}
        <section className="py-24 bg-gradient-to-br from-background to-muted/50">
          <div className="container px-4">
            <ScrollAnimation animation="fade-up">
              <div className="text-center mb-16">
                <div className="inline-block mb-3 px-4 py-1 rounded-full bg-skill-purple/10">
                  <span className="text-sm font-medium text-skill-purple flex items-center gap-1">
                    <Zap className="h-4 w-4" />
                    Skill Catalog
                  </span>
                </div>
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
                  Develop Skills That Matter
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Our platform offers training across a wide range of in-demand professional skills
                </p>
              </div>
            </ScrollAnimation>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {[
                { name: "Communication", icon: MessagesSquare, color: "skill-blue" },
                { name: "Leadership", icon: User, color: "skill-purple" },
                { name: "Negotiation", icon: Briefcase, color: "skill-deepPurple" },
                { name: "Presentation", icon: FileText, color: "skill-lightBlue" },
                { name: "Time Management", icon: Clock, color: "skill-lightPurple" },
                { name: "Conflict Resolution", icon: Zap, color: "skill-blue" },
                { name: "Project Management", icon: LayoutDashboard, color: "skill-purple" },
                { name: "Data Analysis", icon: BarChart3, color: "skill-deepPurple" },
                { name: "Strategic Thinking", icon: BrainCircuit, color: "skill-lightBlue" },
                { name: "Emotional Intelligence", icon: Lightbulb, color: "skill-lightPurple" },
              ].map((skill, index) => (
                <ScrollAnimation 
                  key={skill.name} 
                  animation="fade-up" 
                  delay={index * 0.1 + 1}
                >
                  <div className={`flex flex-col items-center justify-center p-4 rounded-xl border border-border hover:border-${skill.color} bg-card hover:bg-${skill.color}/5 transition-all duration-300 text-center h-full`}>
                    <skill.icon className={`h-8 w-8 mb-3 text-${skill.color}`} />
                    <span className="text-sm font-medium">{skill.name}</span>
                  </div>
                </ScrollAnimation>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section - Enhanced */}
        <section id="testimonials" className="py-24 bg-muted/30">
          <div className="container px-4">
            <ScrollAnimation animation="fade-up">
              <div className="text-center mb-16">
                <div className="inline-block mb-3 px-4 py-1 rounded-full bg-accent/10">
                  <span className="text-sm font-medium text-accent-foreground flex items-center gap-1">
                    <Sparkles className="h-4 w-4" />
                    Success Stories
                  </span>
                </div>
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
                  What Our Users Say
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Hear from professionals who have transformed their careers with SkillMirror
                </p>
              </div>
            </ScrollAnimation>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <ScrollAnimation animation="slide-in-left" delay={1}>
                <Card className="overflow-visible relative">
                  <CardContent className="p-8 relative z-10">
                    <div className="absolute -top-6 -left-6 w-12 h-12 rounded-full bg-skill-blue text-white flex items-center justify-center font-bold text-lg shadow-lg border-4 border-background">JD</div>
                    <div className="mb-4 pt-4">
                      <h4 className="font-semibold">Jessica Davis</h4>
                      <p className="text-sm text-muted-foreground">Product Manager at TechCorp</p>
                    </div>
                    <p className="italic text-muted-foreground">
                      "SkillMirror's leadership simulations helped me prepare for difficult stakeholder conversations. Within 3 months of practice, I earned a promotion to Senior PM."
                    </p>
                    <div className="mt-4 flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <span key={star} className="text-yellow-400">★</span>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </ScrollAnimation>

              <ScrollAnimation animation="fade-up" delay={2}>
                <Card className="overflow-visible relative">
                  <CardContent className="p-8 relative z-10">
                    <div className="absolute -top-6 -left-6 w-12 h-12 rounded-full bg-skill-purple text-white flex items-center justify-center font-bold text-lg shadow-lg border-4 border-background">MK</div>
                    <div className="mb-4 pt-4">
                      <h4 className="font-semibold">Michael Kim</h4>
                      <p className="text-sm text-muted-foreground">Software Engineer at DataViz</p>
                    </div>
                    <p className="italic text-muted-foreground">
                      "The technical collaboration simulations transformed how I communicate complex ideas. I now lead our architecture discussions with confidence and clarity."
                    </p>
                    <div className="mt-4 flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <span key={star} className="text-yellow-400">★</span>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </ScrollAnimation>

              <ScrollAnimation animation="slide-in-right" delay={3}>
                <Card className="overflow-visible relative">
                  <CardContent className="p-8 relative z-10">
                    <div className="absolute -top-6 -left-6 w-12 h-12 rounded-full bg-skill-deepPurple text-white flex items-center justify-center font-bold text-lg shadow-lg border-4 border-background">AR</div>
                    <div className="mb-4 pt-4">
                      <h4 className="font-semibold">Aisha Robinson</h4>
                      <p className="text-sm text-muted-foreground">Marketing Director at BrandX</p>
                    </div>
                    <p className="italic text-muted-foreground">
                      "The interview simulations were incredibly realistic. After 8 weeks of practice, I landed my dream role with a 35% salary increase."
                    </p>
                    <div className="mt-4 flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <span key={star} className="text-yellow-400">★</span>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </ScrollAnimation>
            </div>
          </div>
        </section>

        {/* Pricing Section - NEW */}
        <section id="pricing" className="py-24 bg-gradient-to-br from-background to-muted/50">
          <div className="container px-4">
            <ScrollAnimation animation="fade-up">
              <div className="text-center mb-16">
                <div className="inline-block mb-3 px-4 py-1 rounded-full bg-skill-lightBlue/10">
                  <span className="text-sm font-medium text-skill-lightBlue flex items-center gap-1">
                    <Sparkles className="h-4 w-4" />
                    Pricing Plans
                  </span>
                </div>
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
                  Simple, Transparent Pricing
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Choose the perfect plan for your professional development needs
                </p>
              </div>
            </ScrollAnimation>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <ScrollAnimation animation="slide-in-left" delay={1}>
                <Card className="border-border relative overflow-hidden h-full">
                  <div className="absolute top-0 inset-x-0 h-2 bg-muted"></div>
                  <CardContent className="p-6 pt-8 flex flex-col h-full">
                    <div className="mb-6">
                      <h3 className="text-xl font-bold mb-2">Free</h3>
                      <div className="flex items-baseline gap-1 mb-3">
                        <span className="text-3xl font-bold">$0</span>
                        <span className="text-muted-foreground">/month</span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Perfect for trying out the platform
                      </p>
                    </div>
                    <ul className="space-y-3 mb-8 flex-grow">
                      <li className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <span>10 workplace simulations</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <span>Basic skill analytics</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <span>3 AI colleague personas</span>
                      </li>
                    </ul>
                    <Link to="/auth/signup" className="w-full">
                      <Button variant="outline" className="w-full">
                        Get Started
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </ScrollAnimation>

              <ScrollAnimation animation="fade-up" delay={2}>
                <Card className="border-skill-blue relative overflow-hidden h-full shadow-lg shadow-skill-blue/10">
                  <div className="absolute top-0 inset-x-0 h-2 bg-skill-blue"></div>
                  <div className="absolute top-6 right-6 bg-skill-blue text-white text-xs font-bold px-3 py-1 rounded-full">
                    Popular
                  </div>
                  <CardContent className="p-6 pt-8 flex flex-col h-full">
                    <div className="mb-6">
                      <h3 className="text-xl font-bold mb-2">Pro</h3>
                      <div className="flex items-baseline gap-1 mb-3">
                        <span className="text-3xl font-bold">$29</span>
                        <span className="text-muted-foreground">/month</span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        For professionals serious about growth
                      </p>
                    </div>
                    <ul className="space-y-3 mb-8 flex-grow">
                      <li className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-skill-blue flex-shrink-0 mt-0.5" />
                        <span>Unlimited workplace simulations</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-skill-blue flex-shrink-0 mt-0.5" />
                        <span>Advanced skill tracking & analytics</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-skill-blue flex-shrink-0 mt-0.5" />
                        <span>10 AI colleague personas</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-skill-blue flex-shrink-0 mt-0.5" />
                        <span>Personalized learning paths</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-skill-blue flex-shrink-0 mt-0.5" />
                        <span>Digital skill certificates</span>
                      </li>
                    </ul>
                    <Link to="/auth/signup" className="w-full">
                      <Button className="w-full bg-skill-blue hover:bg-skill-blue/90">
                        Start 14-Day Free Trial
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </ScrollAnimation>

              <ScrollAnimation animation="slide-in-right" delay={3}>
                <Card className="border-border relative overflow-hidden h-full">
                  <div className="absolute top-0 inset-x-0 h-2 bg-skill-deepPurple"></div>
                  <CardContent className="p-6 pt-8 flex flex-col h-full">
                    <div className="mb-6">
                      <h3 className="text-xl font-bold mb-2">Enterprise</h3>
                      <div className="flex items-baseline gap-1 mb-3">
                        <span className="text-3xl font-bold">Custom</span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        For teams and organizations
                      </p>
                    </div>
                    <ul className="space-y-3 mb-8 flex-grow">
                      <li className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-skill-deepPurple flex-shrink-0 mt-0.5" />
                        <span>All Pro features included</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-skill-deepPurple flex-shrink-0 mt-0.5" />
                        <span>Custom industry scenarios</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-skill-deepPurple flex-shrink-0 mt-0.5" />
                        <span>Team analytics dashboard</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-skill-deepPurple flex-shrink-0 mt-0.5" />
                        <span>Dedicated support</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-skill-deepPurple flex-shrink-0 mt-0.5" />
                        <span>SSO & advanced security</span>
                      </li>
                    </ul>
                    <Link to="/contact" className="w-full">
                      <Button variant="outline" className="w-full">
                        Contact Sales
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
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
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-6 drop-shadow-md">
                  Ready to Accelerate Your Career?
                </h2>
                <p className="text-xl mb-10 max-w-2xl mx-auto opacity-90">
                  Join thousands of professionals using SkillMirror to develop the skills that matter in today's workplace
                </p>
                
                <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-white/20 mb-10 shadow-xl">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-left mb-6">
                    <div className="flex items-start">
                      <div className="mr-3 rounded-full bg-white/20 p-1">
                        <Check className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="font-medium">Realistic Practice</h4>
                        <p className="text-sm text-white/70">Like real workplace scenarios</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="mr-3 rounded-full bg-white/20 p-1">
                        <Check className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="font-medium">Immediate Feedback</h4>
                        <p className="text-sm text-white/70">Learn and improve in real-time</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="mr-3 rounded-full bg-white/20 p-1">
                        <Check className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="font-medium">Career Advancement</h4>
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

      {/* Footer with enhanced design */}
      <footer className="border-t py-12 bg-muted/30">
        <div className="container px-4">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <div className="flex items-center gap-2 mb-6 md:mb-0 group">
              <Logo className="group-hover:scale-110 transition-transform duration-300" />
              <span className="text-lg font-bold group-hover:text-primary transition-colors duration-300">SkillMirror</span>
            </div>
            <div className="flex flex-wrap justify-center gap-8">
              <div className="space-y-2">
                <h4 className="font-semibold text-sm mb-3">Platform</h4>
                <ul className="space-y-2">
                  <li><a href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200">Features</a></li>
                  <li><a href="#pricing" className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200">Pricing</a></li>
                  <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200">Enterprise</a></li>
                </ul>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold text-sm mb-3">Resources</h4>
                <ul className="space-y-2">
                  <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200">Blog</a></li>
                  <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200">Documentation</a></li>
                  <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200">Help Center</a></li>
                </ul>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold text-sm mb-3">Company</h4>
                <ul className="space-y-2">
                  <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200">About</a></li>
                  <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200">Careers</a></li>
                  <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200">Contact</a></li>
                </ul>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold text-sm mb-3">Legal</h4>
                <ul className="space-y-2">
                  <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200">Terms</a></li>
                  <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200">Privacy</a></li>
                  <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200">Cookies</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center">
            <div className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} SkillMirror. All rights reserved.
            </div>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path></svg>
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"></path></svg>
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"></path></svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
