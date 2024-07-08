import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Select, MenuItem, InputLabel, FormControl, Grid, IconButton } from '@mui/material';
import { AddCircleOutline, RemoveCircleOutline } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSweetChange = (index, field, value) => {
    const newSweets = [...formData.sweet];
    newSweets[index][field] = value;
    setFormData({
      ...formData,
      sweet: newSweets,
    });
  };

  const handleAddSweetField = () => {
    setFormData({
      ...formData,
      sweet: [...formData.sweet, { sweetname: '', sweetgram: '', sweetquantity: '1' }],
    });
  };

  const handleRemoveSweetField = (index) => {
    const newSweets = [...formData.sweet];
    newSweets.splice(index, 1);
    setFormData({
      ...formData,
      sweet: newSweets,
    });
  };

  const notify = () => toast.success("Data Added successfully!");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://668bd3e40b61b8d23b0b5aef.mockapi.io/sweet/sweet', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
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
      });
      notify(); // Call notify after successful submission
      navigate('/customerdetails');
    } catch (error) {
      console.error('Error adding data:', error);
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
            type="text"
            name="boxtype"
            value={formData.boxtype}
            onChange={handleChange}
            label="Box Type"
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
            </Select>
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
                type="number"
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
              {index === 0 ? (
                <IconButton
                  type="button"
                  onClick={handleAddSweetField}
                  color="primary"
                  aria-label="add"
                >
                  <AddCircleOutline />
                </IconButton>
              ) : (
                <IconButton
                  type="button"
                  onClick={() => handleRemoveSweetField(index)}
                  color="secondary"
                  aria-label="remove"
                >
                  <RemoveCircleOutline />
                </IconButton>
              )}
            </Grid>
          </React.Fragment>
        ))}
      </Grid>

      <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
        Add Sweetbox
      </Button>
      <ToastContainer />
    </form>
  );
};

export default AddForm;
