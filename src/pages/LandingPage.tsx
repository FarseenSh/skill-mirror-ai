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
                  <Button size="sm" className="shadow-lg hover:shadow-skill-purple/50 transition-all duration-300 hover:scale-105">
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

        {/* Featured In Section */}
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

        {/* Skills Grid Section */}
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
                  <div className={`flex flex-col items-center justify-center p-4 rounded-xl border border-border hover:border-${skill.color} bg-card hover:bg-${skill.color}/5 transition
