import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export function SurveyCard({
  title,
  status,
  createdAt,
  isOwner,
  onTakeSurvey,
  onEdit,
  onDelete,
  fullWidth = false,
}) {
  const statusColor = {
    active: 'bg-green-500 text-green-800',
    draft: 'bg-yellow-500 text-yellow-800',
    completed: 'bg-red-500 text-neutral-600',
    archived: 'bg-gray-500 text-grey-800',
  };

  return (
    <Card className="w-full max-w-sm flex flex-col justify-between shadow-lg shadow-gray-300 mt-4">
      <div>
        <CardHeader className="flex flex-row items-top justify-between">
          <CardTitle className="text-xl font-bold">{title}</CardTitle>
          {status && <Badge className={cn('mt-1', statusColor[status])}>{status}</Badge>}
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">Создан: {createdAt}</p>
        </CardContent>
      </div>
      <CardFooter className="flex align-center justify-between">
        <Button
          variant="outline"
          size="sm"
          className="border border-neutral-400"
          onClick={onTakeSurvey}
        >
          Пройти опрос
        </Button>
        {isOwner && (
          <Button
            variant="outline"
            size="sm"
            className="border-yellow-500 text-yellow-800 hover:bg-yellow-50 hover:border-yellow-600 focus:ring-yellow-200"
            onClick={onEdit}
          >
            Редактировать
          </Button>
        )}
        {isOwner && (
          <Button
            variant="outline"
            size="sm"
            className="border-red-500 text-red-600 hover:bg-red-50 hover:border-red-600 focus:ring-red-200"
            onClick={onDelete}
          >
            Удалить
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
