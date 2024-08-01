import React from "react";
import { TableRow, TableCell } from "@mui/material";
import SweetRow from "./SweetRow";

const CustomerRow = ({ customer, totalKgByCustomer, calculateTotalGrams }) => {
  return (
    <>
      <TableRow>
        <TableCell>{customer.cname}</TableCell>
        <TableCell>{customer.phone}</TableCell>
        <TableCell>{customer.odate}</TableCell>
        <TableCell>{customer.ddate}</TableCell>
        <TableCell>{customer.dtime}</TableCell>
        <TableCell>{customer.boxtype === "customEntry" ? customer.cuboxtype : customer.boxtype}</TableCell>
        <TableCell>{customer.boxquantity}</TableCell>
        <TableCell>{customer.dunit}</TableCell>
        <TableCell>{customer.mplant}</TableCell>
        <TableCell>{customer.status}</TableCell>
        <TableCell>{customer.sweetweight === "customWeight" ? customer.cusweetweight : customer.sweetweight}</TableCell>
        <TableCell colSpan={4}>Main Sweets</TableCell>
      </TableRow>

      {customer.sweet.map((item, index) => (
        <SweetRow key={`${customer.id}-${index}`} item={item} customer={customer} calculateTotalGrams={calculateTotalGrams} />
      ))}

      {customer.subForms.map((subForm, subIndex) => (
        <React.Fragment key={`${customer.id}-subform-${subIndex}`}>
          <TableRow>
            <TableCell colSpan={11}></TableCell>
            <TableCell colSpan={0}><h4>Sub Menu {subIndex + 1}</h4> </TableCell>
          </TableRow>
          {subForm.sweet.map((item, index) => (
            <SweetRow key={`${customer.id}-subform-${subIndex}-${index}`} item={item} customer={subForm} calculateTotalGrams={calculateTotalGrams} />
          ))}
        </React.Fragment>
      ))}

      <TableRow>
        <TableCell colSpan={15} align="right">
          Total KG for {customer.cname}
        </TableCell>
        <TableCell>{totalKgByCustomer[customer.id]?.toFixed(2)} kg</TableCell>
      </TableRow>
    </>
  );
};

export default CustomerRow;
