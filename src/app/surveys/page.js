'use client';

import { useRouter } from 'next/navigation';
import { SurveyCard } from '@/components/surveyCard';
import { useState, useEffect } from 'react';
import { surveyService } from '@/services/surveyService';
import { ErrorDialog } from '@/components/errorDialog';
import { BasePagination } from '@/components/basePagination';

export default function SurveysPage() {
  const router = useRouter();
  const [surveys, setSurveys] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchSurveys = async () => {
      const res = await surveyService.getSurveys(page);
      if (res.ok) {
        console.log(res.data);
        setSurveys(res.data?.results ?? []);
        setTotal(res.data?.count ?? 0);
        setIsLoading(false);
      } else {
        setError(res.data);
        setIsLoading(false);
      }
    };

    fetchSurveys();
  }, [page]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const handleTakeSurvey = (surveyId) => {
    router.push(`/surveys/${surveyId}`);
  };

  const handleEditSurvey = (surveyId) => {
    router.push(`/surveys/${surveyId}/edit`);
  };

  const handleDeleteSurvey = (surveyId) => {
    console.log(`Deleting survey ${surveyId}`);
  };

  return (
    <>
      <BasePagination
        total={total}
        page={page}
        pageSize={process.env.NEXT_PUBLIC_PAGE_SIZE || 10}
        onPageChange={(p) => setPage(p)}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {surveys.map((survey) => (
            <SurveyCard
              key={survey.id}
              title={survey.title}
              status={survey.status}
              createdAt={survey.createdAt}
              isOwner={survey.isOwner}
              onTakeSurvey={() => handleTakeSurvey(survey.id)}
              onEdit={() => handleEditSurvey(survey.id)}
              onDelete={() => handleDeleteSurvey(survey.id)}
            />
          ))}
        </div>
      </BasePagination>
      <ErrorDialog
        open={error}
        onOpenChange={(open) => setError(open ? error : null)}
        statusCode={error?.statusCode}
        title={error?.title || 'Ошибка'}
        message={error?.message}
      />
    </>
  );
}
