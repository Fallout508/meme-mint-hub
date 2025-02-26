
import { TokenCreator } from "@/components/TokenCreator";
import { Navbar } from "@/components/Navbar";
import { Sparkles } from "lucide-react";

export default function CreateToken() {
  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-background via-accent to-background">
      <Navbar />
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="w-6 h-6 text-purple-400 animate-pulse" />
            <h1 className="text-4xl font-bold gradient-text">Create Your Token</h1>
            <Sparkles className="w-6 h-6 text-purple-400 animate-pulse" />
          </div>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Launch your own meme token in minutes. No coding required! 🚀
          </p>
        </div>
        <div className="flex justify-center">
          <TokenCreator />
        </div>
      </div>
    </div>
  );
}
