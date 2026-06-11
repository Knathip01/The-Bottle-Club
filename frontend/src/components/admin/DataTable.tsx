'use client';

import React, { useState } from 'react';
import { ChevronDown, ChevronUp, ChevronsUpDown, ChevronLeft, ChevronRight } from 'lucide-react';

export interface Column<T> {
  header: string;
  accessor: keyof T | ((row: T) => React.ReactNode);
  sortable?: boolean;
  sortKey?: string;
  className?: string;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  loading?: boolean;
  totalItems?: number;
  itemsPerPage?: number;
  currentPage?: number;
  onPageChange?: (page: number) => void;
  onSort?: (key: string, direction: 'asc' | 'desc') => void;
  emptyMessage?: string;
  onRowClick?: (row: T) => void;
}

export default function DataTable<T extends { id: any }>({
  columns,
  data,
  loading = false,
  totalItems = 0,
  itemsPerPage = 10,
  currentPage = 1,
  onPageChange,
  onSort,
  emptyMessage = 'ไม่พบข้อมูลที่ต้องการแสดง',
  onRowClick,
}: DataTableProps<T>) {
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const handleSort = (column: Column<T>) => {
    if (!column.sortable || !onSort) return;

    const key = column.sortKey || (typeof column.accessor === 'string' ? (column.accessor as string) : '');
    if (!key) return;

    let newDir: 'asc' | 'desc' = 'asc';
    if (sortKey === key) {
      newDir = sortDirection === 'asc' ? 'desc' : 'asc';
    }

    setSortKey(key);
    setSortDirection(newDir);
    onSort(key, newDir);
  };

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const renderSortIcon = (column: Column<T>) => {
    if (!column.sortable) return null;
    const key = column.sortKey || (typeof column.accessor === 'string' ? (column.accessor as string) : '');
    if (sortKey !== key) return <ChevronsUpDown className="w-3.5 h-3.5 text-stone-600" />;
    return sortDirection === 'asc' ? (
      <ChevronUp className="w-3.5 h-3.5 text-red-500" />
    ) : (
      <ChevronDown className="w-3.5 h-3.5 text-red-500" />
    );
  };

  return (
    <div className="bg-stone-900 border border-white/5 rounded-2xl overflow-hidden shadow-lg select-none">
      {/* Table Container */}
      <div className="overflow-x-auto w-full">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-stone-950 border-b border-white/5">
              {columns.map((col, idx) => (
                <th
                  key={idx}
                  onClick={() => handleSort(col)}
                  className={`px-6 py-4.5 text-xs font-bold text-stone-400 uppercase tracking-wider ${
                    col.sortable ? 'cursor-pointer hover:bg-white/5 hover:text-stone-200' : ''
                  } ${col.className || ''}`}
                >
                  <div className="flex items-center gap-1.5">
                    <span>{col.header}</span>
                    {renderSortIcon(col)}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              // Loading Skeleton State
              Array.from({ length: itemsPerPage }).map((_, rIdx) => (
                <tr key={rIdx} className="border-b border-white/5 animate-pulse">
                  {columns.map((_, cIdx) => (
                    <td key={cIdx} className="px-6 py-4.5">
                      <div className="h-4 bg-stone-800 rounded w-2/3" />
                    </td>
                  ))}
                </tr>
              ))
            ) : data.length === 0 ? (
              // Empty State
              <tr>
                <td colSpan={columns.length} className="px-6 py-16 text-center text-sm text-stone-500">
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              // Render Rows
              data.map((row) => (
                <tr
                  key={row.id}
                  onClick={() => onRowClick && onRowClick(row)}
                  className={`border-b border-white/5 transition-colors hover:bg-white/5 ${
                    onRowClick ? 'cursor-pointer' : ''
                  }`}
                >
                  {columns.map((col, cIdx) => {
                    let cellContent: React.ReactNode;
                    if (typeof col.accessor === 'function') {
                      cellContent = col.accessor(row);
                    } else {
                      cellContent = (row[col.accessor] as any)?.toString() || '';
                    }

                    return (
                      <td key={cIdx} className={`px-6 py-4.5 text-sm text-stone-300 font-medium ${col.className || ''}`}>
                        {cellContent}
                      </td>
                    );
                  })}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && onPageChange && (
        <div className="bg-stone-950 px-6 py-4.5 border-t border-white/5 flex items-center justify-between">
          <span className="text-xs text-stone-500 font-semibold">
            แสดง {Math.min((currentPage - 1) * itemsPerPage + 1, totalItems)} -{' '}
            {Math.min(currentPage * itemsPerPage, totalItems)} จากทั้งหมด {totalItems} รายการ
          </span>
          <div className="flex gap-2">
            <button
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="p-2 bg-stone-900 border border-white/10 hover:bg-stone-800 disabled:opacity-30 rounded-xl text-stone-300 hover:text-stone-100 cursor-pointer disabled:cursor-not-allowed transition"
            >
              <ChevronLeft className="w-4.5 h-4.5" />
            </button>
            {Array.from({ length: totalPages }).map((_, idx) => {
              const p = idx + 1;
              const isCurrent = p === currentPage;
              return (
                <button
                  key={p}
                  onClick={() => onPageChange(p)}
                  className={`w-9.5 h-9.5 text-xs font-bold rounded-xl transition cursor-pointer ${
                    isCurrent
                      ? 'bg-red-800 text-white'
                      : 'bg-stone-900 hover:bg-stone-800 border border-white/10 text-stone-300 hover:text-stone-100'
                  }`}
                >
                  {p}
                </button>
              );
            })}
            <button
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="p-2 bg-stone-900 border border-white/10 hover:bg-stone-800 disabled:opacity-30 rounded-xl text-stone-300 hover:text-stone-100 cursor-pointer disabled:cursor-not-allowed transition"
            >
              <ChevronRight className="w-4.5 h-4.5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
