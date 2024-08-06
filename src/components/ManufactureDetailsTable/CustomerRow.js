// CustomerRow.js
import React from "react";
import { TableRow, TableCell } from "@mui/material";
import SweetRow from "./SweetRow";

const CustomerRow = ({ customer, totalKgByCustomer, expandedRows, calculateTotalGrams, classifySubMenu, classifyCustomer, handleRowExpand }) => {
  return (
    <>
      <TableRow onClick={() => handleRowExpand(customer._id)}>
        <TableCell>{customer.cname}</TableCell>
        <TableCell>{customer.phone}</TableCell>
        <TableCell>{customer.odate}</TableCell>
        <TableCell>{customer.ddate}</TableCell>
        <TableCell>{customer.dtime}</TableCell>
        <TableCell>{customer.dunit}</TableCell>
        <TableCell>{customer.mplant}</TableCell>
        <TableCell>{customer.status}</TableCell>
        <TableCell>{customer.boxtype === "customEntry" ? customer.cuboxtype : customer.boxtype}</TableCell>
        <TableCell>{customer.boxquantity}</TableCell>
        <TableCell>{customer.sweetweight === "customWeight" ? customer.cusweetweight : customer.sweetweight}</TableCell>
        <TableCell colSpan={4}>Main Sweets</TableCell>
      </TableRow>
      {expandedRows.includes(customer._id) && (
        <>
          {customer.sweet.map((item, index) => (
            <SweetRow
              key={`${customer._id}-${index}`}
              item={item}
              customer={customer}
              calculateTotalGrams={calculateTotalGrams}
            />
          ))}
          {customer.subForms.map((subForm, subIndex) => (
            <React.Fragment key={`${customer._id}-subform-${subIndex}`}>
              <TableRow>
                <TableCell colSpan={8}></TableCell>
                <TableCell>{subForm.boxtype === 'customEntry' ? subForm.cuboxtype : subForm.boxtype}</TableCell>
                <TableCell>{subForm.boxquantity}</TableCell>
                <TableCell>{subForm.sweetweight === 'customWeight' ? subForm.cusweetweight : subForm.sweetweight}</TableCell>
                <TableCell colSpan={5}>
                  <b>Sub Menu</b> {subIndex + 1} - {classifySubMenu(subForm)}
                </TableCell>
              </TableRow>
              {subForm.sweet.map((item, index) => (
                <SweetRow
                  key={`${customer._id}-subform-${subIndex}-${index}`}
                  item={item}
                  customer={subForm}
                  calculateTotalGrams={calculateTotalGrams}
                />
                
              ))}

            </React.Fragment>
          ))}

        </>
      )}

      <TableRow>
        <TableCell colSpan={15} align="right">
          Total KG for {customer.cname}
        </TableCell>
        <TableCell>{totalKgByCustomer[customer._id]?.toFixed(2)} kg</TableCell>
      </TableRow>
    </>
  );
};

export default CustomerRow;