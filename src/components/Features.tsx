
import { 
  Activity, 
  Lock, 
  Wallet, 
  Zap 
} from "lucide-react";

const features = [
  {
    icon: Wallet,
    title: "Easy Token Creation",
    description:
      "Create your own ERC-20 token in minutes with no coding required. Just fill in the basic details and launch your token.",
  },
  {
    icon: Lock,
    title: "Secure Smart Contracts",
    description:
      "Our smart contracts are built on OpenZeppelin's battle-tested standards for maximum security and reliability.",
  },
  {
    icon: Activity,
    title: "Real-time Tracking",
    description:
      "Monitor your token's performance with real-time price charts and market analytics.",
  },
  {
    icon: Zap,
    title: "Instant Deployment",
    description:
      "Deploy your token instantly to the Ethereum network with automatic verification and listing.",
  },
];

export function Features() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      {features.map((feature, index) => (
        <div
          key={index}
          className="flex flex-col items-center text-center p-6 rounded-lg bg-card hover:bg-accent/20 transition-colors duration-200"
        >
          <feature.icon className="w-12 h-12 text-primary mb-4" />
          <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
          <p className="text-muted-foreground">{feature.description}</p>
        </div>
      ))}
    </div>
  );
}
