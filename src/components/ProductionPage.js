import React, { useEffect, useState } from 'react';
import { Typography, Table, TableHead, TableBody, TableRow, TableCell } from '@mui/material';

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
          const sweetName = sweet.sweetname.trim();
          const sweetGram = parseFloat(sweet.sweetgram);
          const sweetQuantity = parseInt(sweet.sweetquantity, 10);
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
        });
      });

      const groupedData = Object.values(aggregatedData);
      // Sort by deliveryDate (assuming date is in ISO format yyyy-mm-dd)
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
            <TableCell sx={{ borderBottom: '1px solid #e0e0e0', padding: '8px', textAlign: 'left' }}>Delivery Date</TableCell>
            <TableCell sx={{ borderBottom: '1px solid #e0e0e0', padding: '8px', textAlign: 'left' }}>Sweet Name</TableCell>
            <TableCell sx={{ borderBottom: '1px solid #e0e0e0', padding: '8px', textAlign: 'left' }}>Total Kilograms</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {productionData.map((item, index) => (
            <TableRow key={index}>
              {index === 0 || productionData[index - 1].deliveryDate !== item.deliveryDate ? (
                <TableCell sx={{ borderBottom: '1px solid #e0e0e0', padding: '8px', textAlign: 'left' }} rowSpan={productionData.filter(data => data.deliveryDate === item.deliveryDate).length}>
                  {item.deliveryDate}
                </TableCell>
              ) : null}
              <TableCell sx={{ borderBottom: '1px solid #e0e0e0', padding: '8px', textAlign: 'left' }}>{item.sweetName}</TableCell>
              <TableCell sx={{ borderBottom: '1px solid #e0e0e0', padding: '8px', textAlign: 'left' }}>{item.totalKg.toFixed(2)} kg</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ProductionPage;
