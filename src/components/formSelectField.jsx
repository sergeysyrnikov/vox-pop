'use client';

import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { cn } from '@/lib/utils';

export function FormSelectField({
  control,
  name,
  label,
  options = [],
  disabled = false,
  labelClassName = 'shrink-0 w-20',
  ...selectProps
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
              <select
                {...field}
                value={field.value}
                onChange={(e) => field.onChange(e.target.value)}
                onBlur={field.onBlur}
                disabled={disabled}
                className={cn(
                  'w-full h-8 rounded-lg border border-input bg-transparent px-2.5 py-1 text-base transition-colors outline-none',
                  'focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50',
                  'disabled:pointer-events-none disabled:opacity-50 md:text-sm'
                )}
                {...selectProps}
              >
                {options.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </FormControl>
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
