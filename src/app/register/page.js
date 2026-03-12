'use client';

import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { authService } from '@/services/authService';
import { ErrorDialog } from '@/components/errorDialog';

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

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

  function validateConfirmPassword(value, originalPassword) {
    if (!value) {
      return 'Повтор пароля обязателен';
    }
    if (value !== originalPassword) {
      return 'Пароли должны совпадать';
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
    setConfirmPasswordError(validateConfirmPassword(confirmPassword, value));
  }

  function handleConfirmPasswordChange(event) {
    const { value } = event.target;
    setConfirmPassword(value);
    setConfirmPasswordError(validateConfirmPassword(value, password));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const emailValidationError = validateEmail(email);
    const passwordValidationError = validatePassword(password);
    const confirmPasswordValidationError = validateConfirmPassword(confirmPassword, password);

    setEmailError(emailValidationError);
    setPasswordError(passwordValidationError);
    setConfirmPasswordError(confirmPasswordValidationError);

    if (emailValidationError || passwordValidationError || confirmPasswordValidationError) {
      return;
    }

    const response = await authService.register(email, password);
    if (response.ok) {
      setError({
        statusCode: response.statusCode,
        title: 'Успешная регистрация',
        detail: 'Проверьте почту для подтверждения аккаунта или войдите в систему.',
      });
      setEmail('');
      setPassword('');
      setConfirmPassword('');
    } else {
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
          <CardTitle>Регистрация</CardTitle>
          <CardDescription>Создайте аккаунт, указав email и пароль.</CardDescription>
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

            <div className="space-y-1.5">
              <Label htmlFor="confirmPassword">Повторите пароль</Label>
              <div className="flex items-center gap-1.5">
                <Input
                  id="confirmPassword"
                  type={isPasswordVisible ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                  placeholder="Повторите пароль"
                  aria-invalid={confirmPasswordError ? 'true' : 'false'}
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
              {confirmPasswordError && (
                <p className="text-xs text-destructive">{confirmPasswordError}</p>
              )}
            </div>

            <Button
              type="submit"
              className="w-full mt-2 transition-colors duration-200 bg-primary hover:bg-primary/90 active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-primary/40 focus:ring-offset-1"
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
