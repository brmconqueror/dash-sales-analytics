import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast.js";
import { User, Lock, LogIn } from "lucide-react";

export const LoginForm = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Mock login - replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock user data - replace with actual API response
      const userData = {
        username,
        isAdmin: username === "admin"
      };

      onLogin(userData);
      toast({
        title: "Giriş başarılı",
        description: "Dashboard'a yönlendiriliyorsunuz...",
      });
    } catch (error) {
      toast({
        title: "Giriş hatası",
        description: "Kullanıcı adı veya şifre hatalı",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen" style={{background: 'var(--gradient-hero)'}} className="d-flex align-items-center justify-content-center p-4">
      <Card className="w-100" style={{maxWidth: '28rem'}} className="dashboard-card shadow-lg">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 rounded-circle d-flex align-items-center justify-content-center" style={{width: '4rem', height: '4rem', background: 'var(--gradient-primary)'}}>
            <LogIn className="text-white" style={{width: '2rem', height: '2rem'}} />
          </div>
          <CardTitle className="text-2xl font-bold">Satış Dashboard</CardTitle>
          <p className="text-muted-foreground">Hesabınıza giriş yapın</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Kullanıcı Adı</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="username"
                  type="text"
                  placeholder="Kullanıcı adınızı girin"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Şifre</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  placeholder="Şifrenizi girin"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full bg-primary hover:bg-primary-glow transition-colors" 
              disabled={isLoading}
            >
              {isLoading ? "Giriş yapılıyor..." : "Giriş Yap"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};