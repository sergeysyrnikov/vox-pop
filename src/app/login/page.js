'use client';

import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { authService } from '@/services/authService';
import { saveAccessToken } from '@/lib/authStorage';
import { useRouter } from 'next/navigation';
import { ErrorDialog } from '@/components/errorDialog';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [error, setError] = useState(null);

  function validateEmail(value) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!value) {
      return 'Email обязателен';
    }
    if (!emailPattern.test(value)) {
      return 'Введите корректный email';
    }
    return '';
  }

  function validatePassword(value) {
    if (!value) {
      return 'Пароль обязателен';
    }
    if (value.length < 8) {
      return 'Пароль должен быть не короче 8 символов';
    }
    return '';
  }

  function handleEmailChange(event) {
    const { value } = event.target;
    setEmail(value);
    setEmailError(validateEmail(value));
  }

  function handlePasswordChange(event) {
    const { value } = event.target;
    setPassword(value);
    setPasswordError(validatePassword(value));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const emailValidationError = validateEmail(email);
    const passwordValidationError = validatePassword(password);

    setEmailError(emailValidationError);
    setPasswordError(passwordValidationError);

    if (emailValidationError || passwordValidationError) {
      return;
    }

    const response = await authService.login(email, password);
    if (response.ok) {
      if (response.data.access) {
        saveAccessToken(response.data.access);
        router.push('/');
      } else {
        setError(response.data);
      }
    } else {
      console.log(response.data);
      setError(response.data);
    }
  }

  function togglePasswordVisibility() {
    setIsPasswordVisible(!isPasswordVisible);
  }

  return (
    <div className="flex min-h-[60vh] w-full items-center justify-center bg-background px-4">
      <Card className="w-full max-w-lg border-border/50 border bg-card/80 shadow-xl backdrop-blur-lg">
        <CardHeader>
          <CardTitle>Вход в аккаунт</CardTitle>
          <CardDescription>Введите email и пароль, чтобы продолжить.</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={handleSubmit} noValidate>
            <div className="space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={handleEmailChange}
                placeholder="you@example.com"
                aria-invalid={emailError ? 'true' : 'false'}
              />
              {emailError && <p className="text-xs text-destructive">{emailError}</p>}
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="password">Пароль</Label>
              <div className="flex items-center gap-1.5">
                <Input
                  id="password"
                  type={isPasswordVisible ? 'text' : 'password'}
                  value={password}
                  onChange={handlePasswordChange}
                  placeholder="Не менее 8 символов"
                  aria-invalid={passwordError ? 'true' : 'false'}
                />
                <Button
                  type="button"
                  variant="outline"
                  size="icon-sm"
                  onClick={togglePasswordVisibility}
                  aria-label={isPasswordVisible ? 'Скрыть пароль' : 'Показать пароль'}
                >
                  {isPasswordVisible ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                </Button>
              </div>
              {passwordError && <p className="text-xs text-destructive">{passwordError}</p>}
            </div>

            <Button
              type="submit"
              className="w-full mt-2 transition-colors duration-200 bg-primary hover:bg-primary/90 active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-primary/40 focus:ring-offset-1"
            >
              Войти
            </Button>

            <Button
              type="button"
              className="w-full mt-2 transition-colors duration-200 bg-primary hover:bg-primary/90 active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-primary/40 focus:ring-offset-1"
              onClick={() => router.push('/register')}
            >
              Зарегистрироваться
            </Button>
          </form>
        </CardContent>
      </Card>

      <ErrorDialog
        open={error !== null}
        onOpenChange={(open) => setError(open ? error : null)}
        statusCode={error?.statusCode}
        title={error?.title || 'Ошибка'}
        message={error?.detail ?? error?.message}
      />
    </div>
  );
}
