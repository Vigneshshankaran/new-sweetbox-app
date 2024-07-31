// Import the necessary hooks and components
import React, { useState, useEffect } from 'react';
import {
  Box,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Typography,
  IconButton,
  Button,
  TextField,
  Menu,
  MenuItem,
  CircularProgress,
} from '@mui/material';
import {
  Print as PrintIcon,
  Description as DescriptionIcon,
  FilterList as FilterListIcon,
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import useCustomerData from '../../useCustomerData'; 
import { exportTableToExcel } from '../../exportTableToExcel';
import CustomerRow from './CustomerRow';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  '&.MuiTableCell-head': {
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.common.white,
  },
  '&.MuiTableCell-body': {
    fontSize: 14,
  },
}));

const StyledTableContainer = styled(Box)(({ theme }) => ({
  overflowX: 'auto',
  '& .MuiTableRow-root:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '& .MuiTableRow-root:hover': {
    backgroundColor: theme.palette.action.selected,
  },
  '& .MuiTableCell-root': {
    border: '1px solid lightgray',
    padding: theme.spacing(1),
  },
  '& .MuiTableHead-root .MuiTableCell-head': {
    fontWeight: 'bold',
  },
}));

const CustomerDetailsTable = () => {
  const { customerData, loading, error, deleteCustomer, updateCustomerStatus } = useCustomerData();  // Destructure updateCustomerStatus here
  const [search, setSearch] = useState('');
  const [expandedRows, setExpandedRows] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [sweetFilter, setSweetFilter] = useState('All');

  useEffect(() => {
    if (sweetFilter === 'All') {
      setExpandedRows(customerData.map(customer => customer._id));
    } else {
      setExpandedRows([]);
    }
  }, [sweetFilter, customerData]);

  const handleDelete = (customerId) => {
    deleteCustomer(customerId);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleExport = () => {
    exportTableToExcel('orders-table', 'Orders');
  };

  const handleRowExpand = (customerId) => {
    setExpandedRows(prevExpanded =>
      prevExpanded.includes(customerId)
        ? prevExpanded.filter(id => id !== customerId)
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

  const classifyCustomer = (customer) => {
    const isMainSweet = !customer.isCustomEntry && !customer.subForms.some(subForm => subForm.isCustomEntry);
    const isCustomSweet = customer.isCustomEntry || customer.subForms.some(subForm => subForm.isCustomEntry);
    return isMainSweet ? 'Main Sweets' : (isCustomSweet ? 'Custom Sweets' : 'Unknown');
  };

  const classifySubMenu = (subForm) => {
    return subForm.isCustomEntry ? 'Custom Sweets' : 'Main Sweets';
  };

  const filteredData = (customerData || [])
    .map(customer => ({
      ...customer,
      subForms: customer.subForms || [],
    }))
    .filter(customer => customer.cname && customer.cname.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => new Date(a.ddate) - new Date(b.ddate))
    .filter(customer => {
      if (sweetFilter === 'All') return true;
      return sweetFilter === 'Main Sweets' ? classifyCustomer(customer) === 'Main Sweets' : classifyCustomer(customer) === 'Custom Sweets';
    });

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
      <Box sx={{ width: '100%', maxWidth: 400, margin: 'auto' }}>
        <TextField
          label="Search by Name"
          variant="outlined"
          value={search}
          onChange={handleSearchChange}
          sx={{ width: '100%', margin: 2 }}
        />
      </Box>
      <Box sx={{ marginBottom: 2 }}>
        <Button
          variant="contained"
          color="primary"
          startIcon={<PrintIcon />}
          onClick={handlePrint}
          sx={{ marginRight: 2 }}
        >
          Print
        </Button>
        <Button
          variant="contained"
          color="primary"
          startIcon={<DescriptionIcon />}
          onClick={handleExport}
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
          <MenuItem onClick={() => handleFilterClose('All')}>All</MenuItem>
          <MenuItem onClick={() => handleFilterClose('Main Sweets')}>Main Sweets</MenuItem>
          <MenuItem onClick={() => handleFilterClose('Custom Sweets')}>Custom Sweets</MenuItem>
        </Menu>
      </Box>
      <StyledTableContainer>
        <Table id='orders-table'>
          <TableHead>
            <TableRow>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell>Phone Number</StyledTableCell>
              <StyledTableCell>Order Date</StyledTableCell>
              <StyledTableCell>Delivery Date</StyledTableCell>
              <StyledTableCell>Delivery Time</StyledTableCell>
              <StyledTableCell>Box Type</StyledTableCell>
              <StyledTableCell>Box Quantity</StyledTableCell>
              <StyledTableCell>Box Weight</StyledTableCell>
              <StyledTableCell>Sweet Name</StyledTableCell>
              <StyledTableCell>Sweet Gram</StyledTableCell>
              <StyledTableCell>Sweet Quantity</StyledTableCell>
              <StyledTableCell>Delivery Center</StyledTableCell>
              <StyledTableCell>Manufacturing Unit</StyledTableCell>
              <StyledTableCell>Total Kilograms</StyledTableCell>
              <StyledTableCell>Status</StyledTableCell>

              <StyledTableCell className='action-button'>Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.map(customer => (
              <CustomerRow
                key={customer._id}
                customer={customer}
                expandedRows={expandedRows}
                handleRowExpand={handleRowExpand}
                handleDelete={handleDelete}
                handleStatusChange={updateCustomerStatus}  // Pass the function here
                classifyCustomer={classifyCustomer}
                classifySubMenu={classifySubMenu}
              />
            ))}
          </TableBody>
        </Table>
      </StyledTableContainer>
    </>
  );
};

export default CustomerDetailsTable;
