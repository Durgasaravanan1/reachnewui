// DataTable.jsx
import React from 'react';

// ===================== Helper =====================
const cn = (...classes) => classes.filter(Boolean).join(' ');

// ===================== Sub-components =====================
const Checkbox = ({ checked, indeterminate, onChange, 'aria-label': ariaLabel }) => {
  const inputRef = React.useRef(null);
  React.useEffect(() => {
    if (inputRef.current) {
      inputRef.current.indeterminate = indeterminate || false;
    }
  }, [indeterminate]);
  return (
    <input
      ref={inputRef}
      type="checkbox"
      checked={checked}
      onChange={onChange}
      aria-label={ariaLabel}
      className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
    />
  );
};

const Spinner = () => (
  <div className="flex items-center justify-center py-16">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600" />
  </div>
);

const EmptyState = ({ title, description, children }) => (
  <div className="text-center py-12">
    <p className="text-lg font-semibold text-slate-800">{title}</p>
    <p className="text-sm text-slate-500 mt-1">{description}</p>
    {children && <div className="mt-4">{children}</div>}
  </div>
);

// ===================== Main DataTable Component =====================
export default function DataTable({
  data,
  columns,
  isLoading = false,
  emptyTitle = 'No results',
  emptyDescription,
  emptyAction,
  onRowClick,
  selectable = false,
  selected = [],
  onSelectionChange,
  className,
  rowClassName,
}) {
  const allSelected = data.length > 0 && data.every((row) => selected.includes(row.id));
  const someSelected = selected.length > 0 && !allSelected;

  const toggleAll = () => {
    if (!onSelectionChange) return;
    onSelectionChange(allSelected ? [] : data.map((row) => row.id));
  };

  const toggleRow = (id) => {
    if (!onSelectionChange) return;
    onSelectionChange(
      selected.includes(id) ? selected.filter((s) => s !== id) : [...selected, id]
    );
  };

  if (isLoading) {
    return <Spinner />;
  }

  if (!data.length) {
    return (
      <EmptyState title={emptyTitle} description={emptyDescription}>
        {emptyAction}
      </EmptyState>
    );
  }

  return (
    <div className={cn('overflow-x-auto', className)}>
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr className="border-b border-slate-200 bg-slate-50">
            {selectable && (
              <th className="w-10 px-4 py-3 text-left">
                <Checkbox
                  checked={allSelected}
                  indeterminate={someSelected}
                  onChange={toggleAll}
                  aria-label="Select all"
                />
              </th>
            )}
            {columns.map((col) => (
              <th
                key={String(col.key)}
                className={cn(
                  'px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide whitespace-nowrap',
                  col.width && `w-[${col.width}]`,
                  col.hideOnMobile && 'hidden md:table-cell',
                  col.className
                )}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, idx) => (
            <tr
              key={row.id}
              onClick={() => onRowClick?.(row)}
              className={cn(
                'border-b border-slate-100 last:border-0 transition-colors',
                onRowClick && 'cursor-pointer hover:bg-slate-50',
                rowClassName?.(row)
              )}
            >
              {selectable && (
                <td className="w-10 px-4 py-3" onClick={(e) => e.stopPropagation()}>
                  <Checkbox
                    checked={selected.includes(row.id)}
                    onChange={() => toggleRow(row.id)}
                    aria-label="Select row"
                  />
                </td>
              )}
              {columns.map((col) => (
                <td
                  key={String(col.key)}
                  className={cn(
                    'px-4 py-3 text-slate-700 align-middle',
                    col.hideOnMobile && 'hidden md:table-cell',
                    col.className
                  )}
                >
                  {col.render
                    ? col.render(row, idx)
                    : String(row[String(col.key)] ?? '—')}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}