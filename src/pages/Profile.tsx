
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { User } from "lucide-react";
import { getUserProfile, removeToken } from "@/services/auth.service";

interface UserData {
  name: string;
  email: string;
}

const dummyUser = {
  name: "John Doe",
  email: "john.doe@example.com"
};

const Profile = () => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }
      try {
        const res = await getUserProfile();
        setUserData(res.data);
      } catch (err: any) {
        removeToken()
        setUserData(null);
        navigate("/login");
      }
    };
    fetchProfile();
  }, [navigate]);

  const handleSignOut = () => {
    removeToken()
    setUserData(null);
    navigate("/login");
  };

  if (!userData) return null;

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4 animate-in">
      <div className="glass-panel w-full max-w-md space-y-8 p-8 rounded-lg">
        <div className="flex flex-col items-center space-y-4">
          <div className="h-24 w-24 rounded-full bg-primary/10 flex items-center justify-center">
            <User className="h-12 w-12 text-primary" />
          </div>
          {/* <div className="space-y-1 text-center">
            <h1 className="text-2xl font-bold">{userData.name}</h1>
            <p className="text-sm text-muted-foreground">{userData.email}</p>
          </div> */}
        </div>
        <div className="space-y-4">
          <div className="space-y-2 rounded-lg bg-secondary/50 p-4">
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">Name</p>
              <p className="font-medium">{userData.name}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">Email</p>
              <p className="font-medium">{userData.email}</p>
            </div>
          </div>
          <Button
            onClick={handleSignOut}
            variant="destructive"
            className="w-full"
          >
            Sign Out
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
