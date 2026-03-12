'use client';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { AlertCircle } from 'lucide-react';

function StatusBadge({ statusCode }) {
  if (!statusCode) return null;

  let badgeColor = 'bg-red-100 text-red-700 border-red-200';
  if (statusCode >= 400 && statusCode < 500) {
    badgeColor = 'bg-yellow-100 text-yellow-700 border-yellow-200';
  } else if (statusCode >= 500) {
    badgeColor = 'bg-red-100 text-red-700 border-red-200';
  } else if (statusCode >= 300 && statusCode < 400) {
    badgeColor = 'bg-blue-100 text-blue-700 border-blue-200';
  }
  return (
    <span
      className={'inline-block ml-2 px-3 py-1 text-xs font-bold rounded-full border ' + badgeColor}
      aria-label={`Status code: ${statusCode}`}
      title={`Status code: ${statusCode}`}
    >
      {statusCode}
    </span>
  );
}

export function ErrorDialog({
  open,
  onOpenChange,
  statusCode,
  title = 'Ошибка',
  message = 'Произошла неизвестная ошибка',
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <AlertCircle className="h-6 w-6 text-red-500" />
            <DialogTitle className="text-red-600">{title || 'Ошибка'}</DialogTitle>
            <StatusBadge statusCode={statusCode} />
          </div>
          <DialogDescription>{message || 'Произошла неизвестная ошибка'}</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button onClick={() => onOpenChange(false)}>OK</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
