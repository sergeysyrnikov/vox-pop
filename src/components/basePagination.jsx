import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from '@/components/ui/pagination';

function getPageNumbers(totalPages, currentPage) {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }
  const pages = [1];
  const midStart = Math.max(2, currentPage - 2);
  const midEnd = Math.min(totalPages - 1, currentPage + 2);
  if (midStart > 2) pages.push('ellipsis');
  for (let i = midStart; i <= midEnd; i++) {
    if (!pages.includes(i)) pages.push(i);
  }
  if (midEnd < totalPages - 1) pages.push('ellipsis');
  if (totalPages > 1) pages.push(totalPages);
  return pages;
}

export function BasePagination({ total, page, pageSize, onPageChange, children }) {
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const pageNumbers = getPageNumbers(totalPages, page);

  const handleClick = (e, nextPage) => {
    e.preventDefault();
    onPageChange?.(nextPage);
  };

  return (
    <div className="space-y-6">
      <div>{children}</div>
      {totalPages > 1 && (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={(e) => handleClick(e, page - 1)}
                className={page <= 1 ? 'pointer-events-none opacity-50' : ''}
                text="Назад"
              />
            </PaginationItem>
            {pageNumbers.map((p, i) =>
              p === 'ellipsis' ? (
                <PaginationItem key={`ellipsis-${i}`}>
                  <PaginationEllipsis />
                </PaginationItem>
              ) : (
                <PaginationItem key={p}>
                  <PaginationLink href="#" onClick={(e) => handleClick(e, p)} isActive={page === p}>
                    {p}
                  </PaginationLink>
                </PaginationItem>
              )
            )}
            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={(e) => handleClick(e, page + 1)}
                className={page >= totalPages ? 'pointer-events-none opacity-50' : ''}
                text="Вперёд"
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
}
