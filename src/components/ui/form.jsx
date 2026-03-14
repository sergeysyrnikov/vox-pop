'use client';

import * as React from 'react';
import {
  Controller,
  FormProvider,
  useFormContext
} from 'react-hook-form';
import { cn } from '@/lib/utils';
import { Label } from '@/components/ui/label';

const FormFieldContext = React.createContext(null);

function useFormField () {
  const context = React.useContext(FormFieldContext);
  if (!context) {
    throw new Error('useFormField must be used within FormField');
  }
  return context;
}

const Form = FormProvider;

function FormField ({
  control,
  name,
  render,
  ...props
}) {
  const itemId = React.useId();
  const descriptionId = `${itemId}-description`;
  const messageId = `${itemId}-message`;
  return (
    <Controller
      control={control}
      name={name}
      render={(state) => (
        <FormFieldContext.Provider
          value={{
            name,
            formItemId: `${name}-${itemId}`,
            formDescriptionId: descriptionId,
            formMessageId: messageId,
            ...state
          }}
        >
          {render(state)}
        </FormFieldContext.Provider>
      )}
      {...props}
    />
  );
}

function FormItem ({ className, ...props }) {
  return (
    <div
      data-slot="form-item"
      className={cn('space-y-2', className)}
      {...props}
    />
  );
}

function FormLabel ({ className, ...props }) {
  const { error, formItemId } = useFormField();
  return (
    <Label
      className={cn(error && 'text-destructive', className)}
      htmlFor={formItemId}
      {...props}
    />
  );
}

function FormControl ({ children, className }) {
  const { formItemId, formDescriptionId, formMessageId, error } = useFormField();
  const child = React.Children.only(children);
  const describedBy = [formDescriptionId, formMessageId].filter(Boolean).join(' ') || undefined;
  return React.cloneElement(child, {
    ...child.props,
    id: formItemId,
    'aria-describedby': describedBy,
    'aria-invalid': !!error,
    className: cn(child.props.className, className)
  });
}

function FormMessage ({ className, children, ...props }) {
  const { error, formMessageId } = useFormField();
  const body = error?.message ?? children;
  if (!body) return null;
  return (
    <p
      data-slot="form-message"
      id={formMessageId}
      className={cn('text-sm font-medium text-destructive', className)}
      {...props}
    >
      {body}
    </p>
  );
}

function FormDescription ({ className, ...props }) {
  const { formDescriptionId } = useFormField();
  return (
    <p
      data-slot="form-description"
      id={formDescriptionId}
      className={cn('text-sm text-muted-foreground', className)}
      {...props}
    />
  );
}

export {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
  useFormField,
  useFormContext
};
