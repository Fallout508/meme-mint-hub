
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Coins } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function TokenCreator() {
  const [tokenName, setTokenName] = useState("");
  const [tokenSymbol, setTokenSymbol] = useState("");
  const [totalSupply, setTotalSupply] = useState("");
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Coming Soon",
      description: "Token creation functionality will be available soon!",
    });
  };

  return (
    <Card className="w-full max-w-md p-6 glass-card">
      <div className="flex items-center gap-2 mb-6">
        <Coins className="w-6 h-6 text-primary" />
        <h2 className="text-2xl font-bold">Create Token</h2>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="tokenName">Token Name</Label>
          <Input
            id="tokenName"
            placeholder="e.g., PepeGold"
            value={tokenName}
            onChange={(e) => setTokenName(e.target.value)}
            className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="tokenSymbol">Token Symbol</Label>
          <Input
            id="tokenSymbol"
            placeholder="e.g., PEPEG"
            value={tokenSymbol}
            onChange={(e) => setTokenSymbol(e.target.value)}
            className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="totalSupply">Total Supply</Label>
          <Input
            id="totalSupply"
            type="number"
            placeholder="e.g., 1000000"
            value={totalSupply}
            onChange={(e) => setTotalSupply(e.target.value)}
            className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
          />
        </div>
        <Button 
          type="submit" 
          className="w-full bg-primary hover:bg-primary/90 transition-all duration-200"
        >
          Create Token
        </Button>
      </form>
    </Card>
  );
}
