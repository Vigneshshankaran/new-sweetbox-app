import React, { useEffect, useState } from 'react';
import { Table, TableHead, TableBody, TableRow, TableCell, Typography, Button, tableCellClasses } from '@mui/material';
import { Print as PrintIcon, Description as DescriptionIcon } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import useCustomerData from '../../useCustomerData'; // Import the custom hook
import { exportTableToExcel } from '../../exportTableToExcel';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.dark,    // MUI default blue
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

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
        let totalKg = customer.sweet.reduce((total, item) => {
          return total + calculateTotalGrams(customer.boxquantity, item.sweetgram, item.sweetquantity);
        }, 0);

        customer.subForms.forEach((subForm) => {
          totalKg += subForm.sweet.reduce((total, item) => {
            return total + calculateTotalGrams(subForm.boxquantity, item.sweetgram, item.sweetquantity);
          }, 0);
        });

        newTotalKgByCustomer[customer.id] = totalKg;
      });

      setTotalKgByCustomer(newTotalKgByCustomer);
    }
  }, [customerData]);

  const handlePrint = () => {
    window.print();
  };

  const handleExport = () => {
    exportTableToExcel('orders-table', 'Orders');
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
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell>Order Date</StyledTableCell>
              <StyledTableCell>Delivery Date</StyledTableCell>
              <StyledTableCell>Delivery Time</StyledTableCell>
              <StyledTableCell>Box Type</StyledTableCell>
              <StyledTableCell>Box Weight</StyledTableCell>
              <StyledTableCell>Sweet Name</StyledTableCell>
              <StyledTableCell>Sweet Gram</StyledTableCell>
              <StyledTableCell>Sweet Quantity</StyledTableCell>
              <StyledTableCell>Box Quantity</StyledTableCell>
              <StyledTableCell>Total Grams (kg)</StyledTableCell>
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
                    <TableCell>{customer.boxtype === 'customEntry' ? customer.cuboxtype : customer.boxtype}</TableCell>
                    <TableCell>{customer.sweetweight === 'customWeight' ? customer.cusweetweight : customer.sweetweight}</TableCell>
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
                  {customer.subForms.map((subForm, subIndex) => (
                    <React.Fragment key={`${customer.id}-subform-${subIndex}`}>
                      <TableRow>
                        <TableCell colSpan={6} />
                        <TableCell colSpan={5}>Sub Menu {subIndex + 1}</TableCell>
                      </TableRow>
                      {subForm.sweet.map((item, index) => (
                        <TableRow key={`${customer.id}-subform-${subIndex}-${index}`}>
                          {[...Array(6)].map((_, idx) => (
                            <EmptyCell key={idx} />
                          ))}
                          <TableCell>{item.sweetname}</TableCell>
                          <TableCell>{item.sweetgram}</TableCell>
                          <TableCell>{item.sweetquantity}</TableCell>
                          <TableCell>{subForm.boxquantity}</TableCell>
                          <TableCell>{calculateTotalGrams(subForm.boxquantity, item.sweetgram, item.sweetquantity)} kg</TableCell>
                        </TableRow>
                      ))}
                    </React.Fragment>
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
