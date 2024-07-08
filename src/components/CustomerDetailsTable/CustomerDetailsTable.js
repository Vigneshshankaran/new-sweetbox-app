import React from 'react';
import { Table, TableHead, TableBody, TableRow, TableCell, Typography, IconButton, Button } from '@mui/material';
import { Delete as DeleteIcon, Print as PrintIcon, Description as DescriptionIcon } from '@mui/icons-material';
import useCustomerData from '../../useCustomerData'; // Import the custom hook
import { exportTableToExcel } from '../../exportTableToExcel';

const EmptyCell = () => <TableCell />;

const CustomerDetailsTable = () => {
  const { customerData, loading, error, deleteCustomer } = useCustomerData();

  const handleDelete = (customerId) => {
    deleteCustomer(customerId); // Assume deleteCustomer is a function from your custom hook to delete a customer
  };

  const handlePrint = () => {
    window.print();
  };

  const handleExport = () => {
    exportTableToExcel('orders-table', 'Orders'); // Assuming 'orders-table' is the id of your table
  };

  if (loading) return <Typography variant="h4">Loading...</Typography>;
  if (error) return <Typography variant="h4">Error fetching data: {error.message}</Typography>;

  return (
    <>
      <Typography variant="h4" gutterBottom>
        Customer Details
      </Typography>
      <Button
        variant="contained"
        color="primary"
        startIcon={<PrintIcon />}
        onClick={handlePrint}
        sx={{ mb: 2, marginRight: 2 }}
      >
        Print
      </Button>
      <Button
        variant="contained"
        color="primary"
        startIcon={<DescriptionIcon />}
        onClick={handleExport}
        sx={{ mb: 2 }}
      >
        Export to Excel
      </Button>
      <div className='printableArea'>
        <Table id='orders-table'>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Phone Number</TableCell>
              <TableCell>Order Date</TableCell>
              <TableCell>Delivery Date</TableCell>
              <TableCell>Delivery Time</TableCell>
              <TableCell>Box Type</TableCell>
              <TableCell>Box Quantity</TableCell>
              <TableCell>Sweet Name</TableCell>
              <TableCell>Sweet Gram</TableCell>
              <TableCell>Sweet Quantity</TableCell>
              <TableCell>Total Kilograms</TableCell>
              <TableCell className='action-button'>Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {customerData && customerData.length > 0 ? (
              customerData.map((customer) => (
                <React.Fragment key={customer.id}>
                  <TableRow>
                    <TableCell>{customer.cname}</TableCell>
                    <TableCell>{customer.phone}</TableCell>
                    <TableCell>{customer.odate}</TableCell>
                    <TableCell>{customer.ddate}</TableCell>
                    <TableCell>{customer.dtime}</TableCell>
                    <TableCell>{customer.boxtype}</TableCell>
                    <TableCell>{customer.boxquantity}</TableCell>
                    <TableCell colSpan={3}>Main Sweets</TableCell>
                    <TableCell>
                      {customer.sweet.reduce((totalKg, item) => {
                        return totalKg + (item.sweetgram * item.sweetquantity * customer.boxquantity) / 1000;
                      }, 0).toFixed(2)}
                    </TableCell>
                    <TableCell>
                      <IconButton color="error" className='action-button' onClick={() => handleDelete(customer.id)}>
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                  {customer.sweet.map((item, index) => (
                    <TableRow key={`${customer.id}-${index}`}>
                      {[...Array(7)].map((_, i) => <EmptyCell key={i} />)}
                      <TableCell>{item.sweetname}</TableCell>
                      <TableCell>{item.sweetgram}</TableCell>
                      <TableCell>{item.sweetquantity}</TableCell>
                    </TableRow>
                  ))}
                </React.Fragment>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={12}>No data available</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </>
  );
};

export default CustomerDetailsTable;
