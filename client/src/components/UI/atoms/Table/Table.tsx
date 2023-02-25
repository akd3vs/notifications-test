import React, { memo } from 'react';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

interface TableProps {
  cells: Array<{
    label: string,
    accessor?: string,
    format?: (value: string | number) => string;
    render?: () => React.ReactNode,
  }>;
  rows: Array<any>;
  idAccessor: string;
}

function AtomTable({ cells, rows, idAccessor }: TableProps) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            {cells.map((cell) => (
              <TableCell key={cell.label}>{cell.label}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row[idAccessor]}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              {cells.map(({ accessor, format, label, render }) => (
                <TableCell component="th" scope="row" key={label}>
                  {accessor && (format ? format(row[accessor]) : row[accessor])}
                  {!accessor && render && render()}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default memo(AtomTable);
