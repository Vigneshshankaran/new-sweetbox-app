import React, { useEffect, useState } from 'react';
import { Typography, Table, TableHead, TableBody, TableRow, TableCell } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  '&.MuiTableCell-head': {
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.common.white,
  },
  '&.MuiTableCell-body': {
    fontSize: 14,
  },
}));

const useCustomerData = () => {
  const [customerData, setCustomerData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch('https://668bd3e40b61b8d23b0b5aef.mockapi.io/sweet/sweet');
        const data = await response.json();
        setCustomerData(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return { customerData, loading, error };
};

const calculateTotalGrams = (boxQuantity, sweetGram, sweetQuantity) => {
  return (boxQuantity * sweetGram * sweetQuantity) / 1000; // Convert to kilograms
};

const aggregateSweetData = (aggregatedData, sweet, boxQuantity, deliveryDate) => {
  const sweetName = sweet.sweetname.trim();
  let sweetGram = parseFloat(sweet.sweetgram);
  const sweetQuantity = parseInt(sweet.sweetquantity, 10);

  // Handle decimal values like '0.20 gm'
  if (sweet.sweetweight) {
    const weightParts = sweet.sweetweight.split(' ');
    if (weightParts.length === 2 && weightParts[1] === 'gm') {
      sweetGram += parseFloat(weightParts[0]) / 1000;
    }
  }

  const totalKg = calculateTotalGrams(boxQuantity, sweetGram, sweetQuantity);
  const key = `${deliveryDate}-${sweetName}`;

  if (aggregatedData[key]) {
    aggregatedData[key].totalKg += totalKg;
  } else {
    aggregatedData[key] = {
      sweetName,
      deliveryDate,
      totalKg,
    };
  }
};

const ProductionPage = () => {
  const { customerData, loading, error } = useCustomerData();
  const [productionData, setProductionData] = useState([]);

  useEffect(() => {
    if (customerData && customerData.length > 0) {
      const aggregatedData = {};

      customerData.forEach((customer) => {
        const deliveryDate = customer.ddate;
        const boxQuantity = parseInt(customer.boxquantity, 10);

        customer.sweet.forEach((sweet) => {
          aggregateSweetData(aggregatedData, sweet, boxQuantity, deliveryDate);
        });

        if (customer.subForms) {
          customer.subForms.forEach((subForm) => {
            const subFormBoxQuantity = parseInt(subForm.boxquantity, 10);
            subForm.sweet.forEach((sweet) => {
              aggregateSweetData(aggregatedData, sweet, subFormBoxQuantity, deliveryDate);
            });
          });
        }
      });

      const groupedData = Object.values(aggregatedData);
      groupedData.sort((a, b) => new Date(a.deliveryDate) - new Date(b.deliveryDate));
      setProductionData(groupedData);
    }
  }, [customerData]);

  if (loading) return <Typography variant="h4">Loading...</Typography>;
  if (error) return <Typography variant="h4">Error fetching data: {error.message}</Typography>;

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Production Details
      </Typography>
      <Table sx={{ width: '100%', border: '1px solid #e0e0e0', borderCollapse: 'collapse' }}>
        <TableHead>
          <TableRow>
            <StyledTableCell>Delivery Date</StyledTableCell>
            <StyledTableCell>Sweet Name</StyledTableCell>
            <StyledTableCell>Total Kilograms</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {productionData.map((item, index) => (
            <TableRow key={index}>
              {index === 0 || productionData[index - 1].deliveryDate !== item.deliveryDate ? (
                <TableCell rowSpan={productionData.filter(data => data.deliveryDate === item.deliveryDate).length}>
                  {item.deliveryDate}
                </TableCell>
              ) : null}
              <TableCell>{item.sweetName}</TableCell>
              <TableCell>{item.totalKg.toFixed(2)} kg</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ProductionPage;
