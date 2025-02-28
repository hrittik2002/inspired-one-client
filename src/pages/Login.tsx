import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { Mail, Lock } from "lucide-react";
import { useLogin } from "@/hooks/useLogin";

const Login = () => {
  const navigate = useNavigate();
  const {
    email,
    setEmail,
    password,
    setPassword,
    errors,
    handleLogin,
    clearError
  } = useLogin();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4 animate-in">
      <div className="glass-panel w-full max-w-md space-y-8 p-8 rounded-lg">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold tracking-tighter">Welcome Back</h1>
          <p className="text-sm text-muted-foreground">
            Sign in to your account to continue
          </p>
        </div>
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="flex items-center gap-1">
              Email <span className="text-destructive">*</span>
            </Label>
            <div className="relative">
              <Mail className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  clearError('email');
                }}
                className={`pl-10 ${
                  errors.email ? "border-destructive ring-destructive" : ""
                }`}
              />
            </div>
            {errors.email && (
              <p className="text-sm text-destructive">Email is required</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="password" className="flex items-center gap-1">
              Password <span className="text-destructive">*</span>
            </Label>
            <div className="relative">
              <Lock className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  clearError('password');
                }}
                className={`pl-10 ${
                  errors.password ? "border-destructive ring-destructive" : ""
                }`}
              />
            </div>
            {errors.password && (
              <p className="text-sm text-destructive">Password is required</p>
            )}
          </div>
          <Button type="submit" className="w-full">
            Sign In
          </Button>
        </form>
        <div className="text-center text-sm">
          Don't have an account?{" "}
          <Button
            variant="link"
            className="p-0 text-primary"
            onClick={() => navigate("/register")}
          >
            Create one
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Login;
