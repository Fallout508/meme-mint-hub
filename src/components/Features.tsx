
import { Card } from "@/components/ui/card";
import { Coins, Code, Shield } from "lucide-react";

export function Features() {
  const features = [
    {
      icon: <Coins className="w-6 h-6 text-primary" />,
      title: "Simple Token Creation",
      description: "Create your own ERC-20 token in minutes with our intuitive interface.",
    },
    {
      icon: <Shield className="w-6 h-6 text-primary" />,
      title: "Secure Contracts",
      description: "Built on audited, industry-standard smart contract templates.",
    },
    {
      icon: <Code className="w-6 h-6 text-primary" />,
      title: "Full Customization",
      description: "Customize every aspect of your token, from supply to functionality.",
    },
  ];

  return (
    <div className="grid md:grid-cols-3 gap-6 py-12">
      {features.map((feature, index) => (
        <Card key={index} className="p-6 glass-card group hover:scale-105 transition-all duration-300">
          <div className="flex items-center gap-4 mb-4">
            {feature.icon}
            <h3 className="text-xl font-semibold">{feature.title}</h3>
          </div>
          <p className="text-muted-foreground">{feature.description}</p>
        </Card>
      ))}
    </div>
  );
}
