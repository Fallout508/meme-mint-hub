
import { useState } from "react";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";

export default function AuthPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  supabase.auth.onAuthStateChange((event, session) => {
    if (event === "SIGNED_IN") {
      navigate("/");
    }
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-background via-accent to-background p-4">
      <Card className="w-full max-w-md p-6 glass-card">
        <Auth
          supabaseClient={supabase}
          appearance={{
            theme: ThemeSupa,
            variables: {
              default: {
                colors: {
                  brand: '#D946EF',
                  brandAccent: '#8B5CF6',
                },
              },
            },
          }}
          providers={["google", "github"]}
          redirectTo={window.location.origin}
        />
      </Card>
    </div>
  );
}
