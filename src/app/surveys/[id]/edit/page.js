'use client';

import { SurveyCard } from '@/components/surveyCard';
import { useParams } from 'next/navigation';

export default function EditSurveyPage() {
  const params = useParams();
  const id = params.id;
  return (
    <SurveyCard
      title="Edit Survey"
      status="draft"
      createdAt="2025-02-15"
      isOwner={true}
      onTakeSurvey={() => {}}
      onEdit={() => {}}
      onDelete={() => {}}
    />
  );
}
