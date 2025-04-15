"use client";

import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  ColumnDef,
  getSortedRowModel,
  SortingState,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React from "react";
import { ArrowDown, ArrowUp, ArrowUpDown } from "lucide-react";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  onRowClick?: (row: TData) => void;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  onRowClick,
}: Readonly< DataTableProps<TData, TValue>>) {

  const [sorting, setSorting] = React.useState<SortingState>([]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    state: {
      sorting: sorting,
    },
  });

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id} colSpan={header.colSpan}>
                  {header.isPlaceholder ? null : (
                    <div
                      variant="outline"
                      className={
                        header.column.getCanSort()
                          ? "cursor-pointer select-none flex items-center gap-1"
                          : ""
                      }
                      onClick={header.column.getToggleSortingHandler()}
                      // title={
                      //   header.column.getCanSort()
                      //     ? header.column.getNextSortingOrder() === "asc"
                      //       ? "Sort ascending"
                      //       : header.column.getNextSortingOrder() === "desc"
                      //       ? "Sort descending"
                      //       : "Clear sort"
                      //     : undefined
                      // }
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      {/* Sort Icon - always show */}
                      {
                        {
                          asc: <ArrowUp className="w-4 h-4" />,
                          desc: <ArrowDown className="w-4 h-4" />,
                          false: <ArrowUpDown className="w-4 h-4" />,
                        }[(header.column.getIsSorted() as string) || "false"]
                      }
                    </div>
                  )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.map((row) => (
            <TableRow
              key={row.id}
              className="cursor-pointer hover:bg-muted"
              onClick={() => onRowClick?.(row.original)}
            >
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
