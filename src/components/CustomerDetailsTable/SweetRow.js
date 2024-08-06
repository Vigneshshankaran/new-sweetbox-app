import React from 'react';
import { TableRow, TableCell } from '@mui/material';

const SweetRow = ({ item }) => (
  <TableRow>
    <TableCell colSpan={10} />
    <TableCell>{item.sweetname}</TableCell>
    <TableCell>{item.sweetgram}</TableCell>
    <TableCell>{item.sweetquantity}</TableCell>
    <TableCell />
  </TableRow>
);

export default SweetRow;
