'use client';

import { useState, useCallback, useEffect } from 'react';
import { useWatch } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { userService } from '@/services/userService';
import { useUserStore } from '@/stores/userStore';
import { cn } from '@/lib/utils';

function getDisplayName(user) {
  if (!user) return '';
  return user.name ?? user.email ?? user.username ?? (user.id != null ? String(user.id) : '');
}

function normalizeId(value) {
  if (value == null || value === '') return '';
  return String(value).trim();
}

export function FormUserField({
  control,
  name,
  label,
  disabled = false,
  labelClassName = 'shrink-0 w-20',
  placeholder = 'ID пользователя',
  searchButtonLabel = 'Найти',
  className,
  ...inputProps
}) {
  const currentUser = useUserStore((s) => s.user);
  const watchedValue = useWatch({ control, name, defaultValue: '' });
  const idValue = normalizeId(watchedValue);
  const isCurrentUser = currentUser && idValue && String(currentUser.id) === idValue;

  const [displayName, setDisplayName] = useState('');
  const [isResolving, setIsResolving] = useState(false);
  const [resolveError, setResolveError] = useState(null);

  const resolveUserById = useCallback(async (id) => {
    const raw = normalizeId(id);
    if (!raw) {
      setDisplayName('');
      setResolveError(null);
      return;
    }
    setIsResolving(true);
    setResolveError(null);
    // const res = await userService.getUser(raw)
    setIsResolving(false);
    setDisplayName(currentUser.email);
    // if (res.ok && res.data) {
    //   setDisplayName(getDisplayName(res.data))
    // } else {
    //   setDisplayName('')
    //   setResolveError(res.data?.message ?? res.data?.detail ?? 'Пользователь не найден')
    // }
  }, []);

  useEffect(() => {
    if (!idValue) {
      setDisplayName('');
      setResolveError(null);
      return;
    }
    if (isCurrentUser) {
      setDisplayName(getDisplayName(currentUser));
      setResolveError(null);
      return;
    }
    resolveUserById(idValue);
  }, [idValue, isCurrentUser, currentUser, resolveUserById]);

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        const handleSearch = () => {
          resolveUserById(field.value);
        };

        return (
          <FormItem>
            <div className="flex items-center gap-3">
              <FormLabel className={labelClassName}>{label}</FormLabel>
              <div className="flex-1 min-w-0 flex items-center gap-2">
                <FormControl>
                  <Input
                    type="text"
                    inputMode="numeric"
                    id={field.name}
                    value={field.value ?? ''}
                    onChange={(e) => field.onChange(e.target.value ? e.target.value.trim() : '')}
                    onBlur={field.onBlur}
                    placeholder={placeholder}
                    disabled={disabled}
                    className={cn('max-w-[140px]', className)}
                    {...inputProps}
                  />
                </FormControl>
                <Button
                  type="button"
                  variant="outline"
                  size="default"
                  onClick={handleSearch}
                  disabled={disabled || isResolving || !normalizeId(field.value)}
                >
                  {isResolving ? '…' : searchButtonLabel}
                </Button>
              </div>
            </div>
            {(displayName || isResolving) && (
              <p className="text-sm text-muted-foreground pl-[calc(theme(spacing.20)+0.75rem)]">
                {isResolving ? 'Загрузка…' : `Имя: ${displayName}`}
              </p>
            )}
            {resolveError && (
              <p className="text-sm text-destructive pl-[calc(theme(spacing.20)+0.75rem)]">
                {resolveError}
              </p>
            )}
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
}
