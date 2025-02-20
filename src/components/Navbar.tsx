
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Coins } from "lucide-react";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useState(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  });

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? "bg-background/80 backdrop-blur-lg shadow-md" : ""
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <Coins className="w-6 h-6 text-primary" />
            <span className="text-xl font-bold">MintHub</span>
          </div>
          <div className="hidden md:flex items-center gap-6">
            <a href="#features" className="nav-link">Features</a>
            <a href="#how-it-works" className="nav-link">How It Works</a>
            <a href="#create" className="nav-link">Create Token</a>
          </div>
          <Button className="bg-primary hover:bg-primary/90 transition-all duration-200">
            Connect Wallet
          </Button>
        </div>
      </div>
    </nav>
  );
}
