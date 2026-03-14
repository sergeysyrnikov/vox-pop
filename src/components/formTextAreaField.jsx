'use client';

import { useRef, useEffect } from 'react';
import { useWatch } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { cn } from '@/lib/utils';

const textareaBaseClasses =
  'w-full min-w-0 rounded-lg border border-input bg-transparent px-2.5 py-1.5 text-base transition-colors outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 md:text-sm dark:bg-input/30 dark:disabled:bg-input/80 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 resize-none overflow-hidden min-h-[2.5rem]';

function adjustHeight (el) {
  if (!el) return;
  el.style.height = 'auto';
  el.style.height = `${Math.max(el.scrollHeight, 40)}px`;
}

export function FormTextAreaField ({
  control,
  name,
  label,
  placeholder = 'Введите текст...',
  disabled = false,
  labelClassName = 'shrink-0 w-20 pt-1.5',
  rows = 2,
  className,
  ...textareaProps
}) {
  const textareaRef = useRef(null);
  const value = useWatch({ control, name, defaultValue: '' });

  useEffect(() => {
    if (textareaRef.current && (value ?? '')) {
      adjustHeight(textareaRef.current);
    }
  }, [value]);

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <div className="flex items-start gap-3">
            <FormLabel className={labelClassName}>{label}</FormLabel>
            <FormControl className="flex-1 min-w-0">
              <textarea
                ref={textareaRef}
                id={field.name}
                rows={rows}
                placeholder={placeholder}
                disabled={disabled}
                className={cn(textareaBaseClasses, className)}
                value={field.value ?? ''}
                onChange={(e) => {
                  field.onChange(e.target.value);
                  adjustHeight(e.target);
                }}
                onBlur={field.onBlur}
                {...textareaProps}
              />
            </FormControl>
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
