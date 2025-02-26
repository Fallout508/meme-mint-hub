
import { Navbar } from "@/components/Navbar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Lock, CheckCircle } from "lucide-react";

export default function SecureContract() {
  const securityFeatures = [
    {
      icon: Shield,
      title: "OpenZeppelin Standards",
      description: "Built on battle-tested smart contract standards",
    },
    {
      icon: Lock,
      title: "Ownership Controls",
      description: "Secure ownership management and transfer capabilities",
    },
    {
      icon: CheckCircle,
      title: "Automated Auditing",
      description: "Continuous security checks and vulnerability scanning",
    },
  ];

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-background via-accent to-background">
      <Navbar />
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 gradient-text">
            Smart Contract Security 🔒
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Your tokens are protected by industry-leading security measures
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {securityFeatures.map((feature, index) => (
            <Card key={index} className="backdrop-blur-sm bg-background/80">
              <CardHeader>
                <feature.icon className="w-12 h-12 text-primary mb-4" />
                <CardTitle>{feature.title}</CardTitle>
                <CardDescription>{feature.description}</CardDescription>
              </CardHeader>
              <CardContent>
                {/* Additional security details could be added here */}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
