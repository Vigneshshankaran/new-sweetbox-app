import React, { useEffect, useState } from 'react';
import { Table, TableHead, TableBody, TableRow, TableCell, Typography, Button } from '@mui/material';
import { Print as PrintIcon, Description as DescriptionIcon } from '@mui/icons-material';

import useCustomerData from '../../useCustomerData'; // Import the custom hook
import { exportTableToExcel } from '../../exportTableToExcel';

const EmptyCell = () => <TableCell />;

const ManufactureDetailsTable = () => {
  const { customerData, loading, error } = useCustomerData();
  const [totalKgByCustomer, setTotalKgByCustomer] = useState({});

  const calculateTotalGrams = (boxQuantity, sweetGram, sweetQuantity) => {
    return (boxQuantity * sweetGram * sweetQuantity) / 1000; // Convert to kilograms
  };

  useEffect(() => {
    if (customerData && customerData.length > 0) {
      const newTotalKgByCustomer = {};

      customerData.forEach((customer) => {
        newTotalKgByCustomer[customer.id] = customer.sweet.reduce((total, item) => {
          return total + calculateTotalGrams(customer.boxquantity, item.sweetgram, item.sweetquantity);
        }, 0);
      });

      setTotalKgByCustomer(newTotalKgByCustomer);
    }
  }, [customerData]);

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
        Manufacture Details
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
        <Table id="orders-table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Order Date</TableCell>
              <TableCell>Delivery Date</TableCell>
              <TableCell>Delivery Time</TableCell>
              <TableCell>Box Type</TableCell>
              <TableCell>Box Weight</TableCell>

              <TableCell>Sweet Name</TableCell>
              <TableCell>Sweet Gram</TableCell>
              <TableCell>Sweet Quantity</TableCell>
              <TableCell>Box Quantity</TableCell>
              <TableCell>Total Grams (kg)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {customerData && customerData.length > 0 ? (
              customerData.map((customer) => (
                <React.Fragment key={customer.id}>
                  <TableRow>
                    <TableCell>{customer.cname}</TableCell>
                    <TableCell>{customer.odate}</TableCell>
                    <TableCell>{customer.ddate}</TableCell>
                    <TableCell>{customer.dtime}</TableCell>
                    <TableCell>{customer.boxtype}</TableCell>
                    <TableCell>{customer.sweetweight}</TableCell>
                    <TableCell colSpan={4}>Main Sweets</TableCell>
                  </TableRow>
                  {customer.sweet.map((item, index) => (
                    <TableRow key={`${customer.id}-${index}`}>
                      {[...Array(6)].map((_, idx) => (
                        <EmptyCell key={idx} />
                      ))}
                      <TableCell>{item.sweetname}</TableCell>
                      <TableCell>{item.sweetgram}</TableCell>
                      <TableCell>{item.sweetquantity}</TableCell>
                      <TableCell>{customer.boxquantity}</TableCell>
                

                      <TableCell>{calculateTotalGrams(customer.boxquantity, item.sweetgram, item.sweetquantity)} kg</TableCell>
                    </TableRow>
                  ))}
                  <TableRow>
                    <TableCell colSpan={9} align="right">Total KG for {customer.cname}</TableCell>
                    <TableCell>{totalKgByCustomer[customer.id]?.toFixed(2)} kg</TableCell>
                  </TableRow>
                </React.Fragment>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={10}>No data available</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </>
  );
};

export default ManufactureDetailsTable;