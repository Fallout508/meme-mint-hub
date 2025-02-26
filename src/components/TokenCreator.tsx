
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { createToken } from "@/utils/web3";
import { RunwareService } from "@/services/imageService";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";

const generateTokenImage = async (name: string, symbol: string) => {
  const apiKey = localStorage.getItem("runware_api_key");
  let currentApiKey = apiKey;

  if (!currentApiKey) {
    const userInput = window.prompt("Please enter your Runware API key (get one at runware.ai):");
    if (userInput) {
      localStorage.setItem("runware_api_key", userInput);
      currentApiKey = userInput;
    } else {
      return null;
    }
  }

  const runware = new RunwareService(currentApiKey);
  const imagePrompt = `Create a fun and colorful meme coin logo for a cryptocurrency called ${name} (${symbol}). The image should be eye-catching and suitable for a crypto token, with elements that represent the token's name. Style: Modern, vibrant, professional crypto art`;

  try {
    const result = await runware.generateImage({
      positivePrompt: imagePrompt,
    });
    return result.imageURL;
  } catch (error) {
    console.error("Error generating image:", error);
    toast.error("Failed to generate token image");
    return null;
  }
};

export function TokenCreator() {
  const [tokenName, setTokenName] = useState("");
  const [tokenSymbol, setTokenSymbol] = useState("");
  const [totalSupply, setTotalSupply] = useState("");
  const [loading, setLoading] = useState(false);
  const [tokenImage, setTokenImage] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      toast.error("Please login to create a token");
      navigate("/auth");
      return;
    }

    try {
      // Generate token image first
      const imageUrl = await generateTokenImage(tokenName, tokenSymbol);
      if (imageUrl) {
        setTokenImage(imageUrl);
      }

      // Create the token on the blockchain
      const contractAddress = await createToken(tokenName, tokenSymbol, totalSupply);
      
      if (contractAddress) {
        // Save token to database using any type to bypass strict typing
        const { error } = await supabase
          .from('tokens')
          .insert({
            name: tokenName,
            symbol: tokenSymbol,
            supply: parseFloat(totalSupply),
            contract_address: contractAddress,
            image_url: imageUrl,
            creator_id: user.id
          } as any);

        if (error) {
          throw error;
        }

        toast.success(`Token created successfully!`);
        // Clear form
        setTokenName("");
        setTokenSymbol("");
        setTotalSupply("");
        setTokenImage(null);
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to create token");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md p-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        {tokenImage && (
          <div className="mb-6">
            <img
              src={tokenImage}
              alt="Generated Token Logo"
              className="w-32 h-32 mx-auto rounded-full shadow-lg"
            />
          </div>
        )}
        <div className="space-y-2">
          <Label htmlFor="tokenName">Token Name</Label>
          <Input
            id="tokenName"
            placeholder="e.g. MyMemeToken"
            value={tokenName}
            onChange={(e) => setTokenName(e.target.value)}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="tokenSymbol">Token Symbol</Label>
          <Input
            id="tokenSymbol"
            placeholder="e.g. MMT"
            value={tokenSymbol}
            onChange={(e) => setTokenSymbol(e.target.value)}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="totalSupply">Total Supply</Label>
          <Input
            id="totalSupply"
            type="number"
            placeholder="e.g. 1000000"
            value={totalSupply}
            onChange={(e) => setTotalSupply(e.target.value)}
            required
          />
        </div>
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Creating..." : "Create Token"}
        </Button>
      </form>
    </Card>
  );
}
