import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { useNavigate } from 'react-router-dom';

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Ticket } from '@/utils/types';

import { Button } from '../ui';

interface DataTableProps<Ticket, TValue> {
    columns: ColumnDef<Ticket, TValue>[];
    data: Ticket[];
}

export function TicketTable<TValue>({ columns, data }: DataTableProps<Ticket, TValue>) {
    const navigate = useNavigate();
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    return (
        <>
            <div className='rounded-md border my-2'>
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
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
                                            navigate(`/app/projects/${row.original.project_id}/ticket/${row.original.ticket_id}`);
                                        } else {
                                            return;
                                        }
                                    }}
                                    className='cursor-pointer capitalize'
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length}>No results.</TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className='flex items-center justify-start space-x-2 py-4'>
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
