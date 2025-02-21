
import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface CryptoData {
  timestamp: number;
  price: number;
}

interface CoinData {
  id: string;
  name: string;
  symbol: string;
  current_price: number;
  price_change_percentage_24h: number;
  sparkline_in_7d: {
    price: number[];
  };
}

export function CryptoChart() {
  const [chartData, setChartData] = useState<CryptoData[]>([]);
  const [coins, setCoins] = useState<CoinData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCoinData = async () => {
      try {
        const response = await fetch(
          "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=5&page=1&sparkline=true"
        );
        const data = await response.json();
        setCoins(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching coin data:", error);
        setLoading(false);
      }
    };

    fetchCoinData();
    const interval = setInterval(fetchCoinData, 60000); // Update every minute
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-[400px] w-full" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {coins.map((coin) => (
          <Card key={coin.id} className="p-4">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold">{coin.name}</h3>
                <p className="text-sm text-muted-foreground">{coin.symbol.toUpperCase()}</p>
              </div>
              <div className="text-right">
                <p className="text-lg font-semibold">${coin.current_price.toLocaleString()}</p>
                <p
                  className={`text-sm ${
                    coin.price_change_percentage_24h >= 0
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  {coin.price_change_percentage_24h.toFixed(2)}%
                </p>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={100}>
              <LineChart data={coin.sparkline_in_7d.price.map((price: number, index: number) => ({
                timestamp: index,
                price: price,
              }))}>
                <Line
                  type="monotone"
                  dataKey="price"
                  stroke={coin.price_change_percentage_24h >= 0 ? "#22c55e" : "#ef4444"}
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        ))}
      </div>
    </div>
  );
}
