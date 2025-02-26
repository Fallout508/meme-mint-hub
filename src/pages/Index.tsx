
import { Navbar } from "@/components/Navbar";
import { Features } from "@/components/Features";
import { TokenCreator } from "@/components/TokenCreator";
import { CryptoChart } from "@/components/CryptoChart";
import { Button } from "@/components/ui/button";
import { ArrowDown, Sparkles } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-background via-accent to-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1634704784915-aacf363b021f')] bg-cover bg-center opacity-5" />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <span className="inline-block px-4 py-2 glass-card rounded-full text-sm font-medium mb-6 animate-fade-in">
            <Sparkles className="w-4 h-4 inline-block mr-2 animate-glow text-purple-400" />
            The Future of Meme Tokens is Here
          </span>
          <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight gradient-text animate-fade-in">
            Create Your Own
            <br />
            Meme Token Magic
          </h1>
          <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto animate-fade-in delay-100">
            Launch your token in minutes. No coding required. Join the meme revolution.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 animate-fade-in delay-200">
            <div className="gradient-border">
              <Button
                size="lg"
                className="w-full sm:w-auto bg-background hover:bg-accent/50 text-primary-foreground"
              >
                Start Creating
                <Sparkles className="w-4 h-4 ml-2" />
              </Button>
            </div>
            <Button
              size="lg"
              variant="ghost"
              className="w-full sm:w-auto border border-primary/20 hover:bg-accent/50"
            >
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Market Overview Section */}
      <section className="py-16 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-3xl font-bold text-center mb-8 gradient-text">
            Market Overview
          </h2>
          <div className="glass-card p-6 rounded-xl animate-fade-in">
            <CryptoChart />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-accent/20 to-background" />
        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-3xl font-bold text-center mb-12 gradient-text">
            Why Choose Us
          </h2>
          <Features />
        </div>
      </section>

      {/* Token Creator Section */}
      <section id="create" className="py-16 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 gradient-text">
              Create Your Token
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Fill out the form below to create your custom ERC-20 token. No coding required.
            </p>
          </div>
          <div className="flex justify-center">
            <TokenCreator />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-white/5 bg-background/80 backdrop-blur-lg">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>© 2024 MemeToken MintHub. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
