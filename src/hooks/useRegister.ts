import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { registerUser } from "@/services/auth.service";

interface RegisterErrors {
  [key: string]: boolean;
}

export const useRegister = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<RegisterErrors>({});
  const { toast } = useToast();
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors: RegisterErrors = {};
    
    if (!name) newErrors.name = true;
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

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    try {
      const response = await registerUser(name, email, password);
      localStorage.setItem("token", response.data.token);
      if (response.data.token) {
        toast({
          title: "Account created successfully!",
          description: "Welcome to InspiredOne.",
        });
        navigate("/profile");
      } else {
        throw new Error("Registration failed - no token received");
      }
    } catch (err: any) {
      const errorMessage = err.response?.data?.error || err.message || "Something went wrong";
      toast({
        variant: "destructive",
        title: "Account creation failed!",
        description: errorMessage,
      });
    }
  };

  const clearError = (field: keyof RegisterErrors) => {
    setErrors(prev => ({ ...prev, [field]: false }));
  };

  return {
    name,
    setName,
    email,
    setEmail,
    password,
    setPassword,
    errors,
    handleRegister,
    clearError
  };
};
