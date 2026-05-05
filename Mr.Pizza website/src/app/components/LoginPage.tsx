import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { User, Mail, Lock, Phone, MapPin, Eye, EyeOff } from 'lucide-react';
import { toast } from 'sonner';
import { assets } from '../data/assets';

interface LoginPageProps {
  open: boolean;
  onClose: () => void;
  onLogin: (user: UserData) => void;
  onNavigate?: (section: string) => void;
}

export interface UserData {
  id: string;
  name: string;
  email: string;
  phone: string;
  address?: string;
}

export function LoginPage({ open, onClose, onLogin, onNavigate }: LoginPageProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [showRegisterPassword, setShowRegisterPassword] = useState(false);

  // Login form state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Register form state
  const [registerName, setRegisterName] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPhone, setRegisterPhone] = useState('');
  const [registerAddress, setRegisterAddress] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [registerConfirmPassword, setRegisterConfirmPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    if (!loginEmail || !loginPassword) {
      toast.error('Por favor, preencha todos os campos');
      return;
    }

    // Get users from localStorage
    const users = JSON.parse(localStorage.getItem('mr-pizza-users') || '[]');
    const user = users.find((u: any) => u.email === loginEmail && u.password === loginPassword);

    if (user) {
      const userData: UserData = {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
      };
      onLogin(userData);
      toast.success(`Bem-vindo, ${user.name}! 🍕`);
    } else {
      toast.error('Email ou password incorretos');
    }
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!registerName || !registerEmail || !registerPhone || !registerPassword || !registerConfirmPassword) {
      toast.error('Por favor, preencha todos os campos obrigatórios');
      return;
    }

    if (registerPassword !== registerConfirmPassword) {
      toast.error('As passwords não coincidem');
      return;
    }

    if (registerPassword.length < 6) {
      toast.error('A password deve ter pelo menos 6 caracteres');
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(registerEmail)) {
      toast.error('Email inválido');
      return;
    }

    // Phone validation (basic)
    const phoneRegex = /^[0-9]{9}$/;
    if (!phoneRegex.test(registerPhone.replace(/\s/g, ''))) {
      toast.error('Número de telefone inválido (9 dígitos)');
      return;
    }

    // Get existing users
    const users = JSON.parse(localStorage.getItem('mr-pizza-users') || '[]');

    // Check if email already exists
    if (users.some((u: any) => u.email === registerEmail)) {
      toast.error('Este email já está registado');
      return;
    }

    // Create new user
    const newUser = {
      id: Math.random().toString(36).substr(2, 9),
      name: registerName,
      email: registerEmail,
      phone: registerPhone,
      address: registerAddress,
      password: registerPassword,
      createdAt: new Date().toISOString(),
    };

    // Save to localStorage
    users.push(newUser);
    localStorage.setItem('mr-pizza-users', JSON.stringify(users));

    // Auto login
    const userData: UserData = {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      phone: newUser.phone,
      address: newUser.address,
    };
    onLogin(userData);
    toast.success(`Conta criada com sucesso! Bem-vindo, ${newUser.name}! 🍕`);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-center">
            <div className="flex justify-center mb-2">
              <img src={assets.logo} alt="Mr. Pizza" className="h-14 w-auto" />
            </div>
          </DialogTitle>
          <DialogDescription className="text-center">
            Entre ou crie a sua conta para aproveitar todos os benefícios
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="login" className="w-full mt-4">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="login" className="data-[state=active]:bg-red-700 data-[state=active]:text-white">
              Entrar
            </TabsTrigger>
            <TabsTrigger value="register" className="data-[state=active]:bg-red-700 data-[state=active]:text-white">
              Registar
            </TabsTrigger>
          </TabsList>

          {/* Login Tab */}
          <TabsContent value="login">
            <Card>
              <CardHeader>
                <CardTitle>Bem-vindo de volta!</CardTitle>
                <CardDescription>Entre com a sua conta Mr. Pizza</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="login-email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        id="login-email"
                        type="email"
                        placeholder="seu@email.com"
                        className="pl-10"
                        value={loginEmail}
                        onChange={(e) => setLoginEmail(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="login-password">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        id="login-password"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="••••••••"
                        className="pl-10 pr-10"
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>

                  <Button type="submit" className="w-full bg-red-700 hover:bg-red-800">
                    Entrar
                  </Button>

                  <div className="text-center text-sm text-gray-600 mt-4">
                    <button
                      type="button"
                      onClick={() => onNavigate?.('home')}
                      className="text-red-700 hover:underline"
                    >
                      Continuar sem conta
                    </button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Register Tab */}
          <TabsContent value="register">
            <Card>
              <CardHeader>
                <CardTitle>Criar Conta</CardTitle>
                <CardDescription>Junte-se à família Mr. Pizza</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleRegister} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="register-name">Nome Completo *</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        id="register-name"
                        type="text"
                        placeholder="João Silva"
                        className="pl-10"
                        value={registerName}
                        onChange={(e) => setRegisterName(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="register-email">Email *</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        id="register-email"
                        type="email"
                        placeholder="seu@email.com"
                        className="pl-10"
                        value={registerEmail}
                        onChange={(e) => setRegisterEmail(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="register-phone">Telefone *</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        id="register-phone"
                        type="tel"
                        placeholder="912345678"
                        className="pl-10"
                        value={registerPhone}
                        onChange={(e) => setRegisterPhone(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="register-address">Morada (opcional)</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        id="register-address"
                        type="text"
                        placeholder="Rua, número, código postal, cidade"
                        className="pl-10"
                        value={registerAddress}
                        onChange={(e) => setRegisterAddress(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="register-password">Password *</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        id="register-password"
                        type={showRegisterPassword ? 'text' : 'password'}
                        placeholder="Mínimo 6 caracteres"
                        className="pl-10 pr-10"
                        value={registerPassword}
                        onChange={(e) => setRegisterPassword(e.target.value)}
                      />
                      <button
                        type="button"
                        onClick={() => setShowRegisterPassword(!showRegisterPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showRegisterPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="register-confirm-password">Confirmar Password *</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        id="register-confirm-password"
                        type="password"
                        placeholder="Repita a password"
                        className="pl-10"
                        value={registerConfirmPassword}
                        onChange={(e) => setRegisterConfirmPassword(e.target.value)}
                      />
                    </div>
                  </div>

                  <Button type="submit" className="w-full bg-red-700 hover:bg-red-800">
                    Criar Conta
                  </Button>

                  <div className="text-center text-sm text-gray-600 mt-4">
                    <button
                      type="button"
                      onClick={() => onNavigate?.('home')}
                      className="text-red-700 hover:underline"
                    >
                      Continuar sem conta
                    </button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Footer Links */}
        <div className="mt-8 text-center text-sm text-gray-600">
          <p>
            Ao criar uma conta, você concorda com os nossos{' '}
            <button className="text-red-700 hover:underline">Termos de Serviço</button> e{' '}
            <button className="text-red-700 hover:underline">Política de Privacidade</button>
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}