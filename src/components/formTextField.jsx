'use client';

import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

export function FormTextField({
  control,
  name,
  label,
  placeholder = 'Введите текст...',
  disabled = false,
  labelClassName = 'shrink-0 w-20',
  ...inputProps
}) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <div className="flex items-center gap-3">
            <FormLabel className={labelClassName}>{label}</FormLabel>
            <FormControl className="flex-1 min-w-0">
              <Input {...field} placeholder={placeholder} disabled={disabled} {...inputProps} />
            </FormControl>
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
