
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Coins, Wallet } from "lucide-react";
import { connectWallet } from "@/utils/web3";
import { toast } from "sonner";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleConnectWallet = async () => {
    try {
      setIsConnecting(true);
      const address = await connectWallet();
      if (address) {
        setWalletAddress(address);
        toast.success("Wallet connected successfully!");
      }
    } catch (error) {
      console.error("Error connecting wallet:", error);
      toast.error("Failed to connect wallet");
    } finally {
      setIsConnecting(false);
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-background/80 backdrop-blur-lg shadow-md" : ""
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <Coins className="w-6 h-6 text-primary" />
            <span className="text-xl font-bold">MintHub</span>
          </div>
          <div className="hidden md:flex items-center gap-6">
            <a href="#features" className="hover:text-primary transition-colors">
              Features
            </a>
            <a href="#create" className="hover:text-primary transition-colors">
              Create Token
            </a>
          </div>
          <Button
            onClick={handleConnectWallet}
            disabled={isConnecting}
            className="bg-primary hover:bg-primary/90 transition-all duration-200"
          >
            <Wallet className="w-4 h-4 mr-2" />
            {walletAddress
              ? `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}`
              : "Connect Wallet"}
          </Button>
        </div>
      </div>
    </nav>
  );
}
