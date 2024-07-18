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
} from '@mui/material';
import {
  Delete as DeleteIcon,
  Print as PrintIcon,
  Description as DescriptionIcon,
  Edit as EditIcon,
  FilterList as FilterListIcon,

} from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useCustomerData from '../../useCustomerData'; // Adjust path as per your actual structure
import { exportTableToExcel } from '../../exportTableToExcel'; // Adjust path as per your actual structure

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  '&.MuiTableCell-head': {
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.common.white,
  },
  '&.MuiTableCell-body': {
    fontSize: 14,
  },
}));

const EmptyCell = () => <TableCell />;

const CustomerDetailsTable = () => {
  const { customerData, loading, error, deleteCustomer } = useCustomerData(); // Assuming useCustomerData hook correctly fetches customer data
  const [search, setSearch] = useState('');
  const [expandedRows, setExpandedRows] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [sweetFilter, setSweetFilter] = useState('All'); // Default to 'All'

  useEffect(() => {
    // When sweetFilter changes, reset expandedRows accordingly
    if (sweetFilter === 'All') {
      setExpandedRows(customerData.map(customer => customer.id));
    } else {
      setExpandedRows([]); // Collapse all rows when filter is not 'All'
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
    // Check main form classification
    const isMainSweet = !customer.isCustomEntry && !customer.subForms.some(subForm => subForm.isCustomEntry);

    // Check subform classification
    const isCustomSweet = customer.isCustomEntry || customer.subForms.some(subForm => subForm.isCustomEntry);

    if (isMainSweet) {
      return 'Main Sweets';
    } else if (isCustomSweet) {
      return 'Custom Sweets';
    } else {
      return 'Unknown';
    }
  };

  const classifySubMenu = (subForm) => {
    if (subForm.isCustomEntry) {
      return 'Custom Sweets';
    } else {
      return 'Main Sweets';
    }
  };

  const filteredData = customerData && customerData
    .map(customer => ({
      ...customer,
      subForms: customer.subForms || [],
    }))
    .filter(customer => customer.cname.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => new Date(a.ddate) - new Date(b.ddate))
    .filter(customer => {
      if (sweetFilter === 'All') {
        return true; // Show all customers
      } else if (sweetFilter === 'Main Sweets') {
        return classifyCustomer(customer) === 'Main Sweets';
      } else if (sweetFilter === 'Custom Sweets') {
        return classifyCustomer(customer) === 'Custom Sweets';
      }
      return false; // Default to not showing anything if filter is invalid
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
      <Box sx={{ width: '100%', maxWidth: 400, margin: 'auto',  }}>
        <TextField
          label="Search by Name"
          variant="outlined"
          value={search}
          onChange={handleSearchChange}
          sx={{ width: '100%', margin: 2 }}
        />
      </Box>
      <Box sx={{  marginBottom: 2 }}>
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
      <div className='printableArea'>
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
              <StyledTableCell>Total Kilograms</StyledTableCell>
              <StyledTableCell className='action-button'>Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.map(customer => (
              <React.Fragment key={customer.id}>
                {/* Main Customer Row */}
                <TableRow onClick={() => handleRowExpand(customer.id)}>
                  <TableCell>{customer.cname}</TableCell>
                  <TableCell>{customer.phone}</TableCell>
                  <TableCell>{customer.odate}</TableCell>
                  <TableCell>{customer.ddate}</TableCell>
                  <TableCell>{customer.dtime}</TableCell>
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
                    <IconButton color="primary" component={Link} to={`/editpost/${customer.id}`}>
                      <EditIcon />
                    </IconButton>
                    <IconButton color="error" onClick={() => handleDelete(customer.id)}>
                      <DeleteIcon />
                      <ToastContainer />
                    </IconButton>
                  </TableCell>
                </TableRow>

                {/* Expanded Sweet Details */}
                {expandedRows.includes(customer.id) && (
                  <>
                    {/* Main Sweets */}
                    {customer.sweet.map((item, index) => (
                      <TableRow key={`${customer.id}-sweet-${index}`}>
                        <EmptyCell />
                        <EmptyCell />
                        <EmptyCell />
                        <EmptyCell />
                        <EmptyCell />
                        <EmptyCell />
                        <EmptyCell />
                        <EmptyCell />

                        <TableCell>{item.sweetname}</TableCell>
                        <TableCell>{item.sweetgram}</TableCell>
                        <TableCell>{item.sweetquantity}</TableCell>
                        <EmptyCell />
                      </TableRow>
                    ))}

                    {/* SubForms */}
                    {customer.subForms.map((subForm, subIndex) => (
                      <React.Fragment key={`${customer.id}-subform-${subIndex}`}>
                        {/* SubForm Row */}
                        <TableRow>
                          <TableCell colSpan={5} />
                        
                         
                          
                          <TableCell>{subForm.boxtype === 'customEntry' ? subForm.cuboxtype : subForm.boxtype}</TableCell>
                          <TableCell colSpan={1} />

                          <TableCell>{subForm.sweetweight === 'customWeight' ? subForm.cusweetweight : subForm.sweetweight}</TableCell>
                          <TableCell colSpan={4}>
                           <b>Sub Menu</b>  {subIndex + 1} - {classifySubMenu(subForm)}
                          </TableCell>
                        </TableRow>
                        {/* Sweet Items in SubForm */}
                        {subForm.sweet.map((item, index) => (
                          <TableRow key={`${customer.id}-subform-${subIndex}-sweet-${index}`}>
                            <EmptyCell colSpan={3} />
                            <EmptyCell />
                        <EmptyCell />
                        <EmptyCell />
                        <EmptyCell />
                        <EmptyCell />
                        <EmptyCell />
                        <EmptyCell />
                            <TableCell>{item.sweetname}</TableCell>
                            <TableCell>{item.sweetgram}</TableCell>
                            <TableCell>{item.sweetquantity}</TableCell>
                            <EmptyCell />
                          </TableRow>
                        ))}
                      </React.Fragment>
                    ))}
                  </>
                )}
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
};

export default CustomerDetailsTable;
