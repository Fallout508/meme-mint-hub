
import { Navbar } from "@/components/Navbar";
import { Features } from "@/components/Features";
import { TokenCreator } from "@/components/TokenCreator";
import { CryptoChart } from "@/components/CryptoChart";
import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 relative">
        <div className="container mx-auto px-4 text-center">
          <span className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
            Launch Your Token
          </span>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Create Your Own
            <span className="text-primary"> Meme Token</span>
            <br />
            in Minutes
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            The easiest way to create and deploy your Ethereum token. No coding required.
          </p>
          <div className="flex justify-center gap-4">
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 transition-all duration-200"
            >
              Start Creating
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-primary text-primary hover:bg-primary/10"
            >
              Learn More
            </Button>
          </div>
          <div className="mt-16 animate-float">
            <ArrowDown className="w-6 h-6 mx-auto text-primary" />
          </div>
        </div>
      </section>

      {/* Market Overview Section */}
      <section className="py-16 bg-accent/10">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Market Overview</h2>
          <CryptoChart />
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 bg-accent/50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Us</h2>
          <Features />
        </div>
      </section>

      {/* Token Creator Section */}
      <section id="create" className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Create Your Token</h2>
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
      <footer className="py-8 border-t">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>© 2024 MemeToken MintHub. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
