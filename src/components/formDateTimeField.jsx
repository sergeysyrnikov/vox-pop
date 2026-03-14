'use client';

import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

/**
 * Converts ISO date string or Date to datetime-local value (YYYY-MM-DDTHH:mm).
 * @param {string|Date|null|undefined} value
 * @returns {string} Empty string or "YYYY-MM-DDTHH:mm"
 */
function toDateTimeLocalValue (value) {
  if (value == null || value === '') return ''
  const d = value instanceof Date ? value : new Date(value)
  if (Number.isNaN(d.getTime())) return ''
  const pad = (n) => String(n).padStart(2, '0')
  const y = d.getFullYear()
  const m = pad(d.getMonth() + 1)
  const day = pad(d.getDate())
  const h = pad(d.getHours())
  const min = pad(d.getMinutes())
  return `${y}-${m}-${day}T${h}:${min}`
}

export function FormDateTimeField ({
  control,
  name,
  label,
  disabled = false,
  labelClassName = 'shrink-0 w-20',
  className,
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
              <Input
                type="datetime-local"
                id={field.name}
                value={toDateTimeLocalValue(field.value)}
                onChange={(e) => field.onChange(e.target.value || null)}
                onBlur={field.onBlur}
                disabled={disabled}
                className={cn('max-w-[240px]', className)}
                {...inputProps}
              />
            </FormControl>
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
