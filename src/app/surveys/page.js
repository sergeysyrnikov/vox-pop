'use client';

import { useRouter } from 'next/navigation';
import { SurveyCard } from '@/components/surveyCard';

const surveys = [
  {
    id: '1',
    title:
      'Пожалуйста, примите участие в подробном опросе о качестве обслуживания нашей поддержки — ваш отзыв поможет нам стать лучше',
    description: 'Поделитесь своим мнением о работе нашей поддержки',
    questionCount: 10,
    status: 'active',
    createdAt: '2025-02-15',
    isOwner: true,
  },
  {
    id: '2',
    title: 'Исследование рынка',
    description: 'Помогите нам узнать предпочтения пользователей',
    questionCount: 15,
    status: 'draft',
    createdAt: '2025-03-01',
    isOwner: false,
  },
  {
    id: '3',
    title: 'Отзыв о новом продукте',
    description: 'Расскажите, что вы думаете о нашей новинке',
    questionCount: 5,
    status: 'completed',
    createdAt: '2025-01-20',
    isOwner: false,
  },
];

export default function SurveysPage() {
  const router = useRouter();

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
  );
}
