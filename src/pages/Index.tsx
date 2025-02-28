
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4 animate-in">
      <div className="glass-panel w-full max-w-md space-y-8 p-8 rounded-lg">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold tracking-tighter">InspiredOne</h1>
          <p className="text-muted-foreground">Connect, Share, Inspire.</p>
        </div>
        <div className="space-y-4">
          <Button
            onClick={() => navigate("/register")}
            className="w-full bg-primary hover:bg-primary/90"
          >
            Create Account
          </Button>
          <Button
            onClick={() => navigate("/login")}
            variant="outline"
            className="w-full"
          >
            Sign In
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;
