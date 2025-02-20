
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Coins, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { createToken, connectWallet } from "@/utils/web3";

export function TokenCreator() {
  const [tokenName, setTokenName] = useState("");
  const [tokenSymbol, setTokenSymbol] = useState("");
  const [totalSupply, setTotalSupply] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const account = await connectWallet();
      if (!account) {
        setIsLoading(false);
        return;
      }

      const tokenAddress = await createToken(
        tokenName,
        tokenSymbol,
        totalSupply
      );

      if (tokenAddress) {
        toast({
          title: "Token Created!",
          description: `Your token has been created at ${tokenAddress}`,
        });
        setTokenName("");
        setTokenSymbol("");
        setTotalSupply("");
      }
    } catch (error) {
      console.error("Error:", error);
      toast({
        title: "Error",
        description: "Failed to create token. Please try again.",
        variant: "destructive",
      });
    }

    setIsLoading(false);
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
            disabled={isLoading}
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
            disabled={isLoading}
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
            disabled={isLoading}
          />
        </div>
        <Button 
          type="submit" 
          className="w-full bg-primary hover:bg-primary/90 transition-all duration-200"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Creating...
            </>
          ) : (
            "Create Token"
          )}
        </Button>
      </form>
    </Card>
  );
}
