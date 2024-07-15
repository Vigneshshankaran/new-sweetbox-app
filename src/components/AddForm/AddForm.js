import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TextField, Button, Select, MenuItem, InputLabel, FormControl, Grid, IconButton } from '@mui/material';
import { AddCircleOutline, RemoveCircleOutline } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import data from '../../data'; // Assuming you have data imported with menu and sweet information

const AddForm = () => {
  const [formData, setFormData] = useState({
    cname: '',
    phone: '',
    ddate: '',
    odate: '',
    dtime: '',
    boxtype: '',
    boxquantity: '',
    sweetweight: '',
    sweet: [{ sweetname: '', sweetgram: '', sweetquantity: '1' }],
    cuboxtype: '',
    cusweetweight: '',
    isCustomEntry: false,
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (formData.boxtype && formData.sweetweight) {
      const selectedBox = data.find(
        (box) => box.boxtype === formData.boxtype && box.sweetweight === formData.sweetweight
      );
      if (selectedBox) {
        setFormData((prevFormData) => ({
          ...prevFormData,
          sweet: selectedBox.sweets.map((sweet) => ({
            sweetname: sweet.sweetname,
            sweetgram: sweet.sweetgram,
            sweetquantity: sweet.sweetquantity,
          })),
        }));
      } else {
        // If no matching box found, reset sweets
        setFormData((prevFormData) => ({
          ...prevFormData,
          sweet: [{ sweetname: '', sweetgram: '', sweetquantity: '1' }],
        }));
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData.boxtype, formData.sweetweight]);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
      isCustomEntry: formData.boxtype === 'customEntry' || formData.sweetweight === 'customWeight',
    }));
  };

  // Handle changes in individual sweet fields
  const handleSweetChange = (index, field, value) => {
    const newSweets = [...formData.sweet];
    newSweets[index][field] = value;
    setFormData((prevFormData) => ({
      ...prevFormData,
      sweet: newSweets,
    }));
  };

  // Add a new sweet field
  const handleAddSweetField = () => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      sweet: [...prevFormData.sweet, { sweetname: '', sweetgram: '', sweetquantity: '1' }],
    }));
  };

  // Remove a sweet field
  const handleRemoveSweetField = (index) => {
    const newSweets = [...formData.sweet];
    newSweets.splice(index, 1);
    setFormData((prevFormData) => ({
      ...prevFormData,
      sweet: newSweets,
    }));
  };

  // Submit form data
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'https://668bd3e40b61b8d23b0b5aef.mockapi.io/sweet/sweet',
        {
          cname: formData.cname,
          phone: formData.phone,
          ddate: formData.ddate,
          odate: formData.odate,
          dtime: formData.dtime,
          boxtype: formData.boxtype === 'customEntry' ? formData.cuboxtype : formData.boxtype,
          boxquantity: formData.boxquantity,
          sweetweight: formData.sweetweight === 'customWeight' ? formData.cusweetweight : formData.sweetweight,
          sweet: formData.sweet,
          isCustomEntry: formData.isCustomEntry,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      console.log('Response:', response.data);
      // Clear form data after successful submission
      setFormData({
        cname: '',
        phone: '',
        ddate: '',
        odate: '',
        dtime: '',
        boxtype: '',
        boxquantity: '',
        sweetweight: '',
        sweet: [{ sweetname: '', sweetgram: '', sweetquantity: '1' }],
        cuboxtype: '',
        cusweetweight: '',
        isCustomEntry: false,
      });
      // Notify user of successful data addition
      toast.success('Data added successfully!');
      // Navigate to customer details page after successful submission
      navigate('/customerdetails');
    } catch (error) {
      console.error('Error adding data:', error);
      // Notify user of error while adding data
      toast.error('Error adding data!');
    }
  };

  return (
    <form onSubmit={handleSubmit} autoComplete='on'>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            type="text"
            name="cname"
            value={formData.cname}
            onChange={handleChange}
            label="Customer Name"
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            type="number"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            label="Phone Number"
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            type="date"
            InputLabelProps={{ shrink: true }}
            name="odate"
            value={formData.odate}
            onChange={handleChange}
            label="Order Date"
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            type="date"
            name="ddate"
            InputLabelProps={{ shrink: true }}
            value={formData.ddate}
            onChange={handleChange}
            label="Delivery Date"
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            type="text"
            name="dtime"
            value={formData.dtime}
            onChange={handleChange}
            label="Delivery Time"
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            type="number"
            name="boxquantity"
            value={formData.boxquantity}
            onChange={handleChange}
            label="Box Quantity"
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel id="sweetweight-label">Sweet Weight</InputLabel>
            <Select
              labelId="sweetweight-label"
              id="sweetweight"
              name="sweetweight"
              value={formData.sweetweight}
              onChange={handleChange}
              label="Sweet Weight"
              required
            >
              <MenuItem value="1kg">1kg</MenuItem>
              <MenuItem value="500gm">500gm</MenuItem>
              <MenuItem value="250gm">250gm</MenuItem>
              <MenuItem value="customWeight">Custom Weight</MenuItem>
            </Select>
            {formData.sweetweight === 'customWeight' && (
              <TextField
                fullWidth
                id="cusweetweight"
                name="cusweetweight"
                value={formData.cusweetweight}
                onChange={handleChange}
                label="Custom Sweet Weight"
                required
              />
            )}
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel id="boxtype-label">Menu Type</InputLabel>
            <Select
              labelId="boxtype-label"
              id="boxtype"
              name="boxtype"
              value={formData.boxtype}
              onChange={handleChange}
              label="Menu Type"
              required
            >
              <MenuItem value="">Select Menu Type</MenuItem>
              <MenuItem value="Marvelous Menu">Marvelous Menu</MenuItem>
              <MenuItem value="VIP Menu">VIP Menu</MenuItem>
              <MenuItem value="Luxury Menu">Luxury Menu</MenuItem>
              <MenuItem value="Dry Fruit Delight">Dry Fruit Delight</MenuItem>
              <MenuItem value="customEntry">Custom Entry</MenuItem>
            </Select>
            {formData.boxtype === 'customEntry' && (
              <TextField
                fullWidth
                id="cuboxtype"
                name="cuboxtype"
                value={formData.cuboxtype}
                onChange={handleChange}
                label="Custom Menu Type"
                required
              />
            )}
          </FormControl>
        </Grid>
        {formData.sweet.map((sweet, index) => (
          <React.Fragment key={index}>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                type="text"
                name={`sweetname-${index}`}
                value={sweet.sweetname}
                onChange={(e) => handleSweetChange(index, 'sweetname', e.target.value)}
                label={`Sweet Name ${index + 1}`}
                required
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                type="text"
                name={`sweetgram-${index}`}
                value={sweet.sweetgram}
                onChange={(e) => handleSweetChange(index, 'sweetgram', e.target.value)}
                label={`Sweet Gram ${index + 1}`}
                required
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                fullWidth
                type="number"
                name={`sweetquantity-${index}`}
                value={sweet.sweetquantity}
                onChange={(e) => handleSweetChange(index, 'sweetquantity', e.target.value)}
                label={`Sweet Quantity ${index + 1}`}
                required
              />
            </Grid>
            <Grid item xs={12} sm={1}>
              <IconButton
                aria-label="remove"
                color="secondary"
                onClick={() => handleRemoveSweetField(index)}
              >
                <RemoveCircleOutline />
              </IconButton>
            </Grid>
          </React.Fragment>
        ))}
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddCircleOutline />}
            onClick={handleAddSweetField}
          >
            Add Sweet
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" color="primary" type="submit">
            Submit
          </Button>
        </Grid>
      </Grid>
      <ToastContainer />
    </form>
  );
};

export default AddForm;
