'use client';

import { useParams, useRouter } from 'next/navigation';
import { useState, useEffect, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ContentCard } from '@/components/contentCard';
import { FormTextField } from '@/components/formTextField';
import { FormTextAreaField } from '@/components/formTextAreaField';
import { FormSelectField } from '@/components/formSelectField';
import { surveyService } from '@/services/surveyService';
import { LoadingSpinner } from '@/components/loadingSpinner';
import { ErrorDialog } from '@/components/errorDialog';

const STATUS_OPTIONS = [
  { value: 'draft', label: 'Черновик' },
  { value: 'published', label: 'Опубликован' },
];

const editSurveySchema = z.object({
  title: z.string().min(1, 'Введите название опроса'),
  status: z.enum(['draft', 'published']),
  description: z.string().optional(),
});

export default function EditSurveyPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id;

  const [survey, setSurvey] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const form = useForm({
    resolver: zodResolver(editSurveySchema),
    defaultValues: {
      title: '',
      description: '',
      status: 'draft',
    },
  });

  const isSubmitting = form.formState.isSubmitting;
  const isDirty = form.formState.isDirty;

  const loadSurvey = useCallback(async () => {
    if (!id) return;
    setIsLoading(true);
    setError(null);
    const res = await surveyService.getSurvey(id);
    setIsLoading(false);
    if (res.ok && res.data) {
      setSurvey(res.data);
      form.reset({
        title: res.data.title ?? '',
        description: res.data.description ?? '',
        status: res.data.status ?? 'draft',
      });
    } else {
      setError(res.data ?? { message: 'Не удалось загрузить опрос' });
    }
  }, [id, form]);

  useEffect(() => {
    loadSurvey();
  }, [loadSurvey]);

  async function onSubmit(values) {
    if (!id) return;
    setError(null);
    const dirtyFields = form.formState.dirtyFields;
    const changedValues = Object.keys(dirtyFields).reduce((acc, key) => {
      if (dirtyFields[key] && key in values) {
        acc[key] = values[key];
      }
      return acc;
    }, {});
    const res = await surveyService.updateSurvey(id, changedValues);
    if (res.ok) {
      router.push('/surveys');
    } else {
      setError(res.data ?? { message: 'Не удалось сохранить изменения', statusCode: 400 });
    }
  }

  if (isLoading) return <LoadingSpinner />;

  return (
    <>
      <div className="flex justify-center mt-6">
        <ContentCard
          title="Редактирование опроса"
          form={form}
          formId="edit-survey-form"
          onSubmit={onSubmit}
          onCancel={() => router.push('/surveys')}
          isSubmitting={isSubmitting}
          isDirty={isDirty}
        >
          <FormTextField
            control={form.control}
            name="title"
            label="Название"
            placeholder="Введите название опроса"
            disabled={isSubmitting}
          />
          <FormTextAreaField
            control={form.control}
            name="description"
            label="Описание"
            placeholder="Введите описание опроса"
            disabled={isSubmitting}
          />
          <FormSelectField
            control={form.control}
            name="status"
            label="Статус"
            options={STATUS_OPTIONS}
            disabled={isSubmitting}
          />
        </ContentCard>
      </div>

      <ErrorDialog
        open={error}
        onOpenChange={(open) => !open && setError(null)}
        statusCode={error?.statusCode}
        title={error?.title ?? 'Ошибка'}
        message={error?.message ?? 'Произошла неизвестная ошибка'}
      />
    </>
  );
}
