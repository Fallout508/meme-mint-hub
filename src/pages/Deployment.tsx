
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Rocket, Check, ArrowRight } from "lucide-react";

export default function Deployment() {
  const deploymentSteps = [
    {
      title: "Contract Verification",
      description: "Automatic verification on blockchain explorers",
      status: "complete",
    },
    {
      title: "Token Listing",
      description: "Get listed on decentralized exchanges",
      status: "pending",
    },
    {
      title: "Liquidity Pool",
      description: "Create initial liquidity pool",
      status: "pending",
    },
  ];

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-background via-accent to-background">
      <Navbar />
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 gradient-text flex items-center justify-center gap-2">
            <Rocket className="w-8 h-8" />
            Deploy Your Token
          </h1>
          <p className="text-muted-foreground">
            Launch your token to the moon! 🚀
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          {deploymentSteps.map((step, index) => (
            <Card key={index} className="mb-6 backdrop-blur-sm bg-background/80">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>{step.title}</span>
                  {step.status === "complete" ? (
                    <Check className="w-6 h-6 text-green-500" />
                  ) : (
                    <ArrowRight className="w-6 h-6 text-primary" />
                  )}
                </CardTitle>
                <CardDescription>{step.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button
                  className="w-full"
                  variant={step.status === "complete" ? "secondary" : "default"}
                  disabled={step.status === "complete"}
                >
                  {step.status === "complete" ? "Completed" : "Start"}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
