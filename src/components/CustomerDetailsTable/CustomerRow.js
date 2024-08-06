import React from 'react';
import SweetRow from './SweetRow';
import { TableRow, TableCell, IconButton, Select, MenuItem } from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

const CustomerRow = ({ customer, expandedRows, handleRowExpand, handleDelete, handleStatusChange, classifyCustomer, classifySubMenu }) => (
  <>
    <TableRow onClick={() => handleRowExpand(customer._id)}> 
      <TableCell>{customer.cname}</TableCell>
      <TableCell>{customer.phone}</TableCell>
      <TableCell>{customer.odate}</TableCell>
      <TableCell>{customer.ddate}</TableCell>
      <TableCell>{customer.dtime}</TableCell>
      <TableCell>{customer.dunit}</TableCell>
      <TableCell>{customer.mplant}</TableCell>
      <TableCell>{customer.boxtype === 'customEntry' ? customer.cuboxtype : customer.boxtype}</TableCell>
      <TableCell>{customer.boxquantity}</TableCell>
      <TableCell>{customer.sweetweight === 'customWeight' ? customer.cusweetweight : customer.sweetweight}</TableCell>
      <TableCell colSpan={3}>{classifyCustomer(customer)}</TableCell>
      <TableCell>
        {customer.sweet.reduce((totalKg, item) => {
          return totalKg + (item.sweetgram * item.sweetquantity * customer.boxquantity) / 1000;
        }, 0).toFixed(2)} Kg
      </TableCell>
      <TableCell>
        <Select
          value={customer.status || ''}
          onChange={(e) => handleStatusChange(customer._id, e.target.value)}
        >
          <MenuItem value="Confirmed">Confirmed</MenuItem>
          <MenuItem value="In Progress">In Progress</MenuItem>   
          <MenuItem value="Pending">Pending</MenuItem>
          <MenuItem value="Completed">Completed</MenuItem>
          <MenuItem value="Delivered">Delivered</MenuItem>
        </Select>
      </TableCell>
      <TableCell>
        <IconButton color="primary" component={Link} to={`/editpost/${customer._id}`}>
          <EditIcon />
        </IconButton>
        <IconButton color="error" onClick={() => handleDelete(customer._id)}>
          <DeleteIcon />
        </IconButton>
        <ToastContainer />
      </TableCell>
    </TableRow>

    {expandedRows.includes(customer._id) && ( 
      <>
        {customer.sweet.map((item, index) => (
          <SweetRow key={`${customer._id}-sweet-${index}`} item={item} />
        ))}
        
        {customer.subForms.map((subForm, subIndex) => (
          <React.Fragment key={`${customer._id}-subform-${subIndex}`}>
            <TableRow>
              <TableCell colSpan={7} />
              <TableCell>{subForm.boxtype === 'customEntry' ? subForm.cuboxtype : subForm.boxtype}</TableCell>
              <TableCell>{subForm.boxquantity}</TableCell>
              <TableCell>{subForm.sweetweight === 'customWeight' ? subForm.cusweetweight : subForm.sweetweight}</TableCell>
              <TableCell colSpan={4}>
                <b>Sub Menu</b> {subIndex + 1} - {classifySubMenu(subForm)}
              </TableCell>
              <TableCell colSpan={4} />
            </TableRow>
            {subForm.sweet.map((item, index) => (
              <SweetRow key={`${customer._id}-subform-${subIndex}-sweet-${index}`} item={item} />
            ))}
          </React.Fragment>
        ))}
      </>
    )}
  </>
);

export default CustomerRow;