import {
    ColumnDef,
    ColumnFiltersState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    SortingState,
    useReactTable,
} from '@tanstack/react-table';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Ticket } from '@/utils/types';

import { Button, Input } from '../ui';

interface DataTableProps<Ticket, TValue> {
    columns: ColumnDef<Ticket, TValue>[];
    data: Ticket[];
}

export function TicketTable<TValue>({ columns, data }: DataTableProps<Ticket, TValue>) {
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [sorting, setSorting] = useState<SortingState>([]);
    const navigate = useNavigate();
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        state: {
            sorting,
            columnFilters,
        },
    });
    return (
        <>
            <div className='flex items-center justify-between'>
                <div className='flex items-center py-4'>
                    <Input
                        placeholder='Find tickets by title...'
                        value={(table.getColumn('title')?.getFilterValue() as string) ?? ''}
                        onChange={(event) => table.getColumn('title')?.setFilterValue(event.target.value)}
                        className='min-w-[300px] sm:w-96'
                    />
                </div>
                <div className='hidden md:flex items-center justify-start space-x-2 py-4'>
                    <Button variant='outline' size='sm' onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
                        Previous
                    </Button>
                    <Button variant='outline' size='sm' onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
                        Next
                    </Button>
                </div>
            </div>
            <div className='border rounded-sm my-2'>
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id} className='hover:bg-neutral-100'>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id} className={columns.length < 4 ? 'px-1' : 'px-2'}>
                                            {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                                        </TableHead>
                                    );
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && 'selected'}
                                    onClick={(e) => {
                                        if (e.target instanceof HTMLButtonElement) {
                                            return;
                                        } else if (e.target instanceof HTMLTableCellElement) {
                                            navigate(`/app/tickets/${row.original.ticket_id}`);
                                        } else {
                                            return;
                                        }
                                    }}
                                    className={
                                        row.original.status === 'resolved'
                                            ? 'opacity-50 cursor-pointer capitalize hover:bg-neutral-100'
                                            : 'cursor-pointer capitalize hover:bg-neutral-100'
                                    }
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell className={columns.length < 4 ? 'px-3 py-4' : 'px-4 py-4 last-of-type:px-0'} key={cell.id}>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length}>No results</TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className='flex md:hidden items-center justify-start space-x-2 py-4'>
                <Button variant='outline' size='sm' onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
                    Previous
                </Button>
                <Button variant='outline' size='sm' onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
                    Next
                </Button>
            </div>
        </>
    );
}
