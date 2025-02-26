
import { useEffect, useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { Activity, ArrowUpRight, ArrowDownRight } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface TokenActivity {
  id: string;
  name: string;
  symbol: string;
  price: number;
  change24h: number;
  chartData: { time: string; value: number }[];
}

export default function RealTimeTracking() {
  const [tokens, setTokens] = useState<TokenActivity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTokens = async () => {
      const { data: tokensData, error } = await supabase
        .from('tokens')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching tokens:', error);
        return;
      }

      // Transform the data and add mock price/chart data
      const tokensWithActivity = tokensData?.map(token => ({
        id: token.id,
        name: token.name,
        symbol: token.symbol,
        price: Math.random() * 100,
        change24h: (Math.random() * 20) - 10,
        chartData: Array.from({ length: 24 }, (_, i) => ({
          time: `${i}:00`,
          value: Math.random() * 100
        }))
      }));

      setTokens(tokensWithActivity || []);
      setLoading(false);
    };

    fetchTokens();

    // Set up real-time subscription
    const channel = supabase
      .channel('token-changes')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'tokens' },
        payload => {
          console.log('Change received!', payload);
          fetchTokens(); // Refresh data when changes occur
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-background via-accent to-background">
      <Navbar />
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 gradient-text flex items-center justify-center gap-2">
            <Activity className="w-8 h-8" />
            Real-Time Token Tracking
          </h1>
          <p className="text-muted-foreground">
            Monitor your tokens' performance in real-time 📊
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {tokens.map((token) => (
            <Card key={token.id} className="backdrop-blur-sm bg-background/80">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>{token.name} ({token.symbol})</span>
                  <div className="flex items-center gap-2">
                    <span className={token.change24h > 0 ? "text-green-500" : "text-red-500"}>
                      {token.change24h > 0 ? (
                        <ArrowUpRight className="w-5 h-5" />
                      ) : (
                        <ArrowDownRight className="w-5 h-5" />
                      )}
                    </span>
                    <span className={`text-sm ${token.change24h > 0 ? "text-green-500" : "text-red-500"}`}>
                      {token.change24h.toFixed(2)}%
                    </span>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[200px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={token.chartData}>
                      <XAxis dataKey="time" />
                      <YAxis />
                      <Tooltip />
                      <Line
                        type="monotone"
                        dataKey="value"
                        stroke="#8B5CF6"
                        strokeWidth={2}
                        dot={false}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
