
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Coins, Wallet, User } from "lucide-react";
import { connectWallet } from "@/utils/web3";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);

    // Check for user session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      subscription.unsubscribe();
    };
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

  const handleAuth = () => {
    if (user) {
      supabase.auth.signOut();
      toast.success("Logged out successfully");
    } else {
      navigate("/auth");
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
          <div className="flex items-center gap-4">
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
            <Button
              onClick={handleAuth}
              variant="ghost"
              className="border border-primary/20 hover:bg-accent/50"
            >
              <User className="w-4 h-4 mr-2" />
              {user ? "Logout" : "Login"}
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
