import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { loginUser } from "@/services/auth.service";

interface LoginErrors {
  [key: string]: boolean;
}

export const useLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<LoginErrors>({});
  const { toast } = useToast();
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors: LoginErrors = {};
    if (!email) newErrors.email = true;
    if (!password) newErrors.password = true;
    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      toast({
        variant: "destructive",
        title: "Validation Error",
        description: "Please fill in all required fields.",
      });
      return false;
    }
    return true;
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    try {
      const res = await loginUser(email, password);
      localStorage.setItem("token", res.data.token);
      toast({
        title: "Login successfully!",
        description: "Welcome to InspiredOne.",
      });
      navigate("/profile");
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.error || err.message || "Something went wrong";
      toast({
        variant: "destructive",
        title: "Login failed!",
        description: errorMessage,
      });
    }
  };

  const clearError = (field: keyof LoginErrors) => {
    setErrors(prev => ({ ...prev, [field]: false }));
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    errors,
    handleLogin,
    clearError
  };
};
