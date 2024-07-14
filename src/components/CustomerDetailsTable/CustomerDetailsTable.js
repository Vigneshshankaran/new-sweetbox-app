import React, { useState } from 'react';
import { Box, Table, TableHead, TableBody, TableRow, TableCell, Typography, IconButton, Button, TextField } from '@mui/material';
import { Delete as DeleteIcon, Print as PrintIcon, Description as DescriptionIcon, Edit as EditIcon } from '@mui/icons-material';
import useCustomerData from '../../useCustomerData'; // Import the custom hook
import { exportTableToExcel } from '../../exportTableToExcel';
import { Link } from 'react-router-dom';

const EmptyCell = () => <TableCell />;

const CustomerDetailsTable = () => {
  const { customerData, loading, error, deleteCustomer } = useCustomerData();
  const [search, setSearch] = useState('');

  const handleDelete = (customerId) => {
    deleteCustomer(customerId); // Assume deleteCustomer is a function from your custom hook to delete a customer
  };

  const handlePrint = () => {
    window.print();
  };

  const handleExport = () => {
    exportTableToExcel('orders-table', 'Orders'); // Assuming 'orders-table' is the id of your table
  };

  const filteredData = customerData && customerData.filter((customer) =>
    customer.cname.toLowerCase().includes(search.toLowerCase())
  );

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  if (loading) return <Typography variant="h4">Loading...</Typography>;
  if (error) return <Typography variant="h4">Error fetching data: {error.message}</Typography>;

  return (
    <>
      <Typography variant="h4" gutterBottom>
        Customer Details
      </Typography>
      <Box sx={{ width: '100%', maxWidth: 400, margin: 'auto', display: 'flex', justifyContent: 'flex-end' }}>
        <TextField
          label="Search by Name"
          variant="outlined"
          value={search}
          onChange={handleSearchChange}
          sx={{ width: '100%', margin: 2 }}
        />
      </Box>
      <Button
        variant="contained"
        color="primary"
        startIcon={<PrintIcon />}
        onClick={handlePrint}
        sx={{ marginBottom: 2, marginRight: 2 }}
      >
        Print
      </Button>
      <Button
        variant="contained"
        color="primary"
        startIcon={<DescriptionIcon />}
        onClick={handleExport}
        sx={{ marginBottom: 2 }}
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
              <TableCell>Box Weight</TableCell>
              <TableCell>Sweet Name</TableCell>
              <TableCell>Sweet Gram</TableCell>
              <TableCell>Sweet Quantity</TableCell>
              <TableCell>Total Kilograms</TableCell>
              <TableCell className='action-button'>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData && filteredData.length > 0 ? (
              filteredData.map((customer) => (
                <React.Fragment key={customer.id}>
                  <TableRow>
                    <TableCell>{customer.cname}</TableCell>
                    <TableCell>{customer.phone}</TableCell>
                    <TableCell>{customer.odate}</TableCell>
                    <TableCell>{customer.ddate}</TableCell>
                    <TableCell>{customer.dtime}</TableCell>
                    <TableCell>{customer.boxtype}</TableCell>
                    <TableCell>{customer.boxquantity}</TableCell>
                    <TableCell>{customer.sweetweight}</TableCell>
                    <TableCell colSpan={3}>Main Sweets</TableCell>
                    <TableCell>
                      {customer.sweet.reduce((totalKg, item) => {
                        return totalKg + (item.sweetgram * item.sweetquantity * customer.boxquantity) / 1000;
                      }, 0).toFixed(2)} Kg
                    </TableCell>
                    <TableCell>
                   <IconButton color="primary" component={Link} to={`/editpost/${customer.id}`}>
                   
  <EditIcon />
</IconButton>

                      <IconButton color="error" onClick={() => handleDelete(customer.id)}>
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                  {customer.sweet.map((item, index) => (
                    <TableRow key={`${customer.id}-${index}`}>
                      {[...Array(8)].map((_, i) => <EmptyCell key={i} />)}
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
