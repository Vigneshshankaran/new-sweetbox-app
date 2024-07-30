import React from "react";
import { TableRow, TableCell } from "@mui/material";

const SweetRow = ({ item, customer, calculateTotalGrams }) => (
  <TableRow>
    <TableCell colSpan={10}></TableCell>
    <TableCell>{item.sweetname}</TableCell>
    <TableCell>{item.sweetgram}</TableCell>
    <TableCell>{item.sweetquantity}</TableCell>
    <TableCell>{customer.boxquantity}</TableCell>
    <TableCell>{calculateTotalGrams(customer.boxquantity, item.sweetgram, item.sweetquantity)} kg</TableCell>
  </TableRow>
);

export default SweetRow;
