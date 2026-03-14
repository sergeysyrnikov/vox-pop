'use client';

import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { cn } from '@/lib/utils';

export function ContentCard({
  title,
  children,
  form: formFromUseForm,
  formId,
  onSubmit,
  onCancel,
  isSubmitting = false,
  submitLabel = 'Сохранить',
  submittingLabel = 'Сохранение…',
  cancelLabel = 'Отмена',
  isDirty = true,
  className,
}) {
  const showFooter = formId != null && onCancel != null;
  const useRhf = formId != null && onSubmit != null && formFromUseForm != null;

  const formContent = useRhf ? (
    <Form {...formFromUseForm}>
      <form
        id={formId}
        onSubmit={formFromUseForm.handleSubmit(onSubmit)}
        className="space-y-4"
        noValidate
      >
        {children}
      </form>
    </Form>
  ) : (
    <form id={formId} onSubmit={onSubmit} className="space-y-4" noValidate>
      {children}
    </form>
  );

  return (
    <Card className={cn('w-full max-w-[50rem]', className)}>
      <CardHeader>
        <CardTitle className="text-center">{title}</CardTitle>
      </CardHeader>
      <CardContent>{formContent}</CardContent>
      {showFooter && (
        <CardFooter className="flex justify-end gap-2">
          <Button type="submit" form={formId} disabled={isSubmitting || !isDirty}>
            {isSubmitting ? submittingLabel : submitLabel}
          </Button>
          <Button type="button" variant="outline" onClick={onCancel} disabled={isSubmitting}>
            {cancelLabel}
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}
