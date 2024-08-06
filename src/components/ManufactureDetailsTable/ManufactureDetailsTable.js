import React, { useEffect, useState } from "react";
import {
  Box,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Typography,
  TextField,
  Button,
  MenuItem,
  IconButton,
  Menu,
  TablePagination,
} from "@mui/material";
import {
  Print as PrintIcon,
  Description as DescriptionIcon,
  FilterList as FilterListIcon,
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
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:hover": {
    backgroundColor: theme.palette.action.selected,
  },
}));

const StyledTableContainer = styled(Box)(({ theme }) => ({
  overflowX: "auto",
  "& .MuiTableCell-root": {
    border: "1px solid lightgray",
    padding: theme.spacing(1),
  },
  "& .MuiTableHead-root .MuiTableCell-head": {
    fontWeight: "bold",
  },
}));

const ManufactureDetailsTable = () => {
  const { customerData, loading, error } = useCustomerData();
  const [totalKgByCustomer, setTotalKgByCustomer] = useState({});

  const [search, setSearch] = useState("");
  const [expandedRows, setExpandedRows] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [sweetFilter, setSweetFilter] = useState("All");
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset to the first page when changing rows per page
  };

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  useEffect(() => {
    if (sweetFilter === "All") {
      setExpandedRows(customerData.map((customer) => customer._id));
    } else {
      setExpandedRows([]);
    }
  }, [sweetFilter, customerData]);

  const handleRowExpand = (customerId) => {
    setExpandedRows((prevExpanded) =>
      prevExpanded.includes(customerId)
        ? prevExpanded.filter((id) => id !== customerId)
        : [...prevExpanded, customerId]
    );
  };

  const handleFilterClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleFilterClose = (filter) => {
    setAnchorEl(null);
    setSweetFilter(filter);
  };

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

  const classifyCustomer = (customer) => {
    const isMainSweet =
      !customer.isCustomEntry &&
      !customer.subForms.some((subForm) => subForm.isCustomEntry);
    const isCustomSweet =
      customer.isCustomEntry ||
      customer.subForms.some((subForm) => subForm.isCustomEntry);
    return isMainSweet
      ? "Main Sweets"
      : isCustomSweet
      ? "Custom Sweets"
      : "Unknown";
  };

  const classifySubMenu = (subForm) => {
    return subForm.isCustomEntry ? "Custom Sweets" : "Main Sweets";
  };

  const filteredData = (customerData || [])
    .map((customer) => ({
      ...customer,
      subForms: customer.subForms || [],
    }))
    .filter(
      (customer) =>
        customer.cname &&
        customer.cname.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => new Date(a.ddate) - new Date(b.ddate))
    .filter((customer) => {
      if (sweetFilter === "All") return true;
      return sweetFilter === "Main Sweets"
        ? classifyCustomer(customer) === "Main Sweets"
        : classifyCustomer(customer) === "Custom Sweets";
    });

  return (
    <>
      <Typography variant="h4" gutterBottom>
        Manufacture Details
      </Typography>
      <Box sx={{ width: "100%", maxWidth: 400, margin: "auto" }}>
        <TextField
          label="Search by Name"
          variant="outlined"
          value={search}
          onChange={handleSearchChange}
          sx={{ width: "100%", margin: 2 }}
        />
      </Box>
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
      <IconButton onClick={handleFilterClick}>
        <FilterListIcon />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={() => handleFilterClose(null)}
      >
        <MenuItem onClick={() => handleFilterClose("All")}>All</MenuItem>
        <MenuItem onClick={() => handleFilterClose("Main Sweets")}>
          Main Sweets
        </MenuItem>
        <MenuItem onClick={() => handleFilterClose("Custom Sweets")}>
          Custom Sweets
        </MenuItem>
      </Menu>

      <TablePagination
        component="div" // Use 'div' for standard behavior
        count={filteredData.length} // Use the length of your filtered data for the total count
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[10, 25, 50]}
      />
      <StyledTableContainer>
        <Table id="orders-table">
          <TableHead>
            <StyledTableRow>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell>Phone Number</StyledTableCell>
              <StyledTableCell>Order Date</StyledTableCell>
              <StyledTableCell>Delivery Date</StyledTableCell>
              <StyledTableCell>Delivery Time</StyledTableCell>
              <StyledTableCell>Delivery Center</StyledTableCell>
              <StyledTableCell>Manufacturing Unit</StyledTableCell>
              <StyledTableCell>Status</StyledTableCell>
              <StyledTableCell>Box Type</StyledTableCell>
              <StyledTableCell>Box Quantity</StyledTableCell>
              <StyledTableCell>Box Weight</StyledTableCell>
              <StyledTableCell>Sweet Name</StyledTableCell>
              <StyledTableCell>Sweet Gram</StyledTableCell>
              <StyledTableCell>Sweet Quantity</StyledTableCell>
              <StyledTableCell>Box Quantity</StyledTableCell>
              <StyledTableCell>Total Grams (kg)</StyledTableCell>
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {filteredData && filteredData.length > 0 ? (
              filteredData
                .slice(page * rowsPerPage, (page + 1) * rowsPerPage)
                .map((customer) => (
                  <CustomerRow
                    key={customer.id}
                    customer={customer}
                    totalKgByCustomer={totalKgByCustomer}
                    calculateTotalGrams={calculateTotalGrams}
                    handleRowExpand={handleRowExpand}
                    classifyCustomer={classifyCustomer}
                    classifySubMenu={classifySubMenu}
                    expandedRows={expandedRows}
                  />
                ))
            ) : (
              <StyledTableRow>
                <StyledTableCell colSpan={15}>
                  No data available
                </StyledTableCell>
              </StyledTableRow>
            )}
          </TableBody>
        </Table>
      </StyledTableContainer>
    </>
  );
};

export default ManufactureDetailsTable;
