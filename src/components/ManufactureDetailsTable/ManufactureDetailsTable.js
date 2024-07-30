import React, { useEffect, useState } from "react";
import {
  Box,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Typography,
  Button,
} from "@mui/material";
import {
  Print as PrintIcon,
  Description as DescriptionIcon,
} from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import { tableCellClasses } from "@mui/material/TableCell";
import useCustomerData from "../../useCustomerData"; // Import the custom hook
import { exportTableToExcel } from "../../exportTableToExcel";
import CustomerRow from "./CustomerRow"; // Import the CustomerRow component

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:hover': {
    backgroundColor: theme.palette.action.selected,
  },
}));

const StyledTableContainer = styled(Box)(({ theme }) => ({
  overflowX: 'auto',
  '& .MuiTableCell-root': {
    border: '1px solid lightgray',
    padding: theme.spacing(1),
  },
  '& .MuiTableHead-root .MuiTableCell-head': {
    fontWeight: 'bold',
  },
}));

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
          return (
            total +
            calculateTotalGrams(
              customer.boxquantity,
              item.sweetgram,
              item.sweetquantity
            )
          );
        }, 0);

        customer.subForms.forEach((subForm) => {
          totalKg += subForm.sweet.reduce((total, item) => {
            return (
              total +
              calculateTotalGrams(
                subForm.boxquantity,
                item.sweetgram,
                item.sweetquantity
              )
            );
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
    exportTableToExcel("orders-table", "Orders");
  };

  if (loading) return <Typography variant="h4">Loading...</Typography>;
  if (error)
    return (
      <Typography variant="h4">Error fetching data: {error.message}</Typography>
    );

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

      <StyledTableContainer>
        <Table id="orders-table">
          <TableHead>
            <StyledTableRow>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell>Phone Number</StyledTableCell>
              <StyledTableCell>Order Date</StyledTableCell>
              <StyledTableCell>Delivery Date</StyledTableCell>
              <StyledTableCell>Delivery Time</StyledTableCell>
              <StyledTableCell>Box Type</StyledTableCell>
              <StyledTableCell>Box Quantity</StyledTableCell>
              <StyledTableCell>Delivery Center</StyledTableCell>
              <StyledTableCell>Manufacturing Unit</StyledTableCell>
              <StyledTableCell>Box Weight</StyledTableCell>
              <StyledTableCell>Sweet Name</StyledTableCell>
              <StyledTableCell>Sweet Gram</StyledTableCell>
              <StyledTableCell>Sweet Quantity</StyledTableCell>
              <StyledTableCell>Box Quantity</StyledTableCell>
              <StyledTableCell>Total Grams (kg)</StyledTableCell>
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {customerData && customerData.length > 0 ? (
              customerData.map((customer) => (
                <CustomerRow
                  key={customer.id}
                  customer={customer}
                  totalKgByCustomer={totalKgByCustomer}
                  calculateTotalGrams={calculateTotalGrams}
                />
              ))
            ) : (
              <StyledTableRow>
                <StyledTableCell colSpan={15}>No data available</StyledTableCell>
              </StyledTableRow>
            )}
          </TableBody>
        </Table>
      </StyledTableContainer>
    </>
  );
};

export default ManufactureDetailsTable;
