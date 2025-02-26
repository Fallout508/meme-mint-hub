
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Navbar } from "@/components/Navbar";
import { Sparkles, TrendingUp, Rocket } from "lucide-react";

interface Token {
  id: string;
  name: string;
  symbol: string;
  supply: number;
  contract_address: string;
  image_url: string | null;
  created_at: string;
}

export default function Charts() {
  const [tokens, setTokens] = useState<Token[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTokens = async () => {
      try {
        const { data, error } = await supabase
          .from('tokens')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;
        setTokens(data || []);
      } catch (error) {
        console.error('Error fetching tokens:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTokens();
  }, []);

  const getTimeSeriesData = (createdAt: string, supply: number) => {
    const data = [];
    const startDate = new Date(createdAt);
    const now = new Date();
    const daysDiff = Math.floor((now.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
    
    for (let i = 0; i <= daysDiff; i++) {
      const currentDate = new Date(startDate);
      currentDate.setDate(startDate.getDate() + i);
      data.push({
        date: currentDate.toISOString().split('T')[0],
        supply: supply * (1 + (Math.random() * 0.1 - 0.05))
      });
    }
    return data;
  };

  const defaultMemeImages = [
    "https://images.unsplash.com/photo-1582562124811-c09040d0a901",
    "https://images.unsplash.com/photo-1498936178812-4b2e558d2937",
    "https://images.unsplash.com/photo-1501286353178-1ec871214838",
  ];

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-background via-accent to-background">
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <img 
          src={defaultMemeImages[2]} 
          alt="background" 
          className="w-full h-full object-cover"
        />
      </div>
      <Navbar />
      <div className="container mx-auto px-4 py-8 relative z-10">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Sparkles className="w-6 h-6 text-purple-400 animate-pulse" />
          <h1 className="text-3xl font-bold text-center gradient-text">
            Meme Token Gallery 🚀
          </h1>
          <Sparkles className="w-6 h-6 text-purple-400 animate-pulse" />
        </div>
        
        <p className="text-center text-muted-foreground mb-8">
          Discover the latest community-created tokens! 🌟
        </p>
        
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className="h-[300px] w-full" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {tokens.map((token, index) => (
              <Card key={token.id} className="p-6 backdrop-blur-sm bg-background/80">
                <div className="flex items-center gap-4 mb-4">
                  {token.image_url ? (
                    <img 
                      src={token.image_url} 
                      alt={token.name} 
                      className="w-12 h-12 rounded-full ring-2 ring-purple-500"
                    />
                  ) : (
                    <img 
                      src={defaultMemeImages[index % defaultMemeImages.length]} 
                      alt={token.name}
                      className="w-12 h-12 rounded-full ring-2 ring-purple-500 object-cover"
                    />
                  )}
                  <div>
                    <h2 className="text-xl font-bold flex items-center gap-2">
                      {token.name}
                      <TrendingUp className="w-4 h-4 text-green-400" />
                    </h2>
                    <p className="text-muted-foreground flex items-center gap-1">
                      {token.symbol} 
                      <Rocket className="w-4 h-4 inline-block" />
                    </p>
                  </div>
                </div>
                <div className="h-[200px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={getTimeSeriesData(token.created_at, token.supply)}>
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Line
                        type="monotone"
                        dataKey="supply"
                        stroke="#8B5CF6"
                        strokeWidth={2}
                        dot={false}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-4">
                  <p className="text-sm text-muted-foreground">
                    💰 Total Supply: {token.supply.toLocaleString()}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    🎂 Created: {new Date(token.created_at).toLocaleDateString()}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
