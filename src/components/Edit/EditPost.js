import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  TextField,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Grid,
  IconButton,
  CircularProgress
} from '@mui/material';
import { AddCircleOutline, RemoveCircleOutline } from '@mui/icons-material';
import { useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import data from '../../data';
import EditSubPost from './EditSubPost';

const EditPost = () => {
  const [formData, setFormData] = useState({
    cname: '',
    phone: '',
    mplant: '',
    dunit: '',
    ddate: '',
    odate: '',
    dtime: '',
    boxtype: '',
    boxquantity: '',
    sweetweight: '',
    sweet: [{ sweetname: '', sweetgram: '', sweetquantity: '1' }],
    subForms: [],
    cuboxtype: '',
    cusweetweight: '',
    isCustomEntry: false,
    userEdited: false
  });

  const [subForms, setSubForms] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

    useEffect(() => {
    setSubForms((prevSubForms) =>
      prevSubForms.map(subForm => ({
        ...subForm,
        sweet: formData.sweet, // Update sweet details in sub-forms
      }))
    );
  }, [formData.sweet]); 

  useEffect(() => {
    const fetchOrderData = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`https://sweets-admin-server-hh64.vercel.app/api/mainsweet/${id}`);
        const orderData = response.data;
        setFormData({
          ...orderData,
          isCustomEntry: orderData.boxtype === 'customEntry' || orderData.sweetweight === 'customWeight',
          userEdited: false,
          // ddate: new Date(orderData.ddate), // Create Date object from string
        });
        setSubForms(orderData.subForms || []);
      } catch (error) {
        console.error('Error fetching order data:', error);
        toast.error('Error fetching order data!');
      } finally {
        setIsLoading(false);
      }
    };
    fetchOrderData();
  }, [id]);

  useEffect(() => {
    if (formData.boxtype && formData.sweetweight && !formData.userEdited) {
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
        setFormData((prevFormData) => ({
          ...prevFormData,
          sweet: [{ sweetname: '', sweetgram: '', sweetquantity: '1' }],
        }));
      }
    }
  }, [formData.boxtype, formData.sweetweight, formData.userEdited]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
      isCustomEntry: formData.boxtype === 'customEntry' || formData.sweetweight === 'customWeight',
    }));
  };

  const handleSweetChangeMain = (index, field, value) => {
    const newSweets = [...formData.sweet];
    newSweets[index][field] = value;
    setFormData((prevFormData) => ({
      ...prevFormData,
      sweet: newSweets,
      userEdited: true
    }));
  };

  const handleAddSweetFieldMain = () => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      sweet: [...prevFormData.sweet, { sweetname: '', sweetgram: '', sweetquantity: '1' }],
    }));
  };

  const handleRemoveSweetFieldMain = (index) => {
    const newSweets = [...formData.sweet];
    newSweets.splice(index, 1);
    setFormData((prevFormData) => ({
      ...prevFormData,
      sweet: newSweets,
    }));
  };

  const handleAddSubForm = () => {
    setSubForms((prev) => [
      ...prev,
      {
        boxtype: '',
        boxquantity: '',
        sweetweight: '',
        sweet: [{ sweetname: '', sweetgram: '', sweetquantity: '1' }],
        cuboxtype: '',
        cusweetweight: '',
      },
    ]);
  };

  const handleSubFormChange = (index, updatedSubFormData) => {
    setSubForms((prevSubForms) =>
      prevSubForms.map((subForm, i) => (i === index ? updatedSubFormData : subForm))
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);

      const formattedSubForms = subForms.map((subForm) => ({
        boxtype: subForm.boxtype === 'customEntry' ? subForm.cuboxtype : subForm.boxtype,
        boxquantity: subForm.boxquantity,
        sweetweight: subForm.sweetweight === 'customWeight' ? subForm.cusweetweight : subForm.sweetweight,
        sweet: subForm.sweet,
      }));

      const response = await axios.put(
        `https://sweets-admin-server-hh64.vercel.app/api/mainsweet/${id}`,
        {
          ...formData,
          subForms: formattedSubForms,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      console.log('Response:', response.data);
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
        userEdited: false
      });
      setSubForms([]);
      toast.success('Data added successfully!');
      setTimeout(() => {
        navigate('/customerdetails');
      }, 2000);
    } catch (error) {
      setIsLoading(false);
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
            name="dunit"
            value={formData.dunit}
            onChange={handleChange}
            label="D Name"
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            type="text"
            name="mplant"
            value={formData.mplant}
            onChange={handleChange}
            label="mplant Name"
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
              {data.map((menu, index) => (
                <MenuItem key={index} value={menu.sweetweight}>
                  {menu.sweetweight}
                </MenuItem>
              ))}
              <MenuItem value="customWeight">Custom Weight</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        {formData.sweetweight === 'customWeight' && (
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              type="text"
              name="cusweetweight"
              value={formData.cusweetweight}
              onChange={handleChange}
              label="Custom Sweet Weight"
              required
            />
          </Grid>
        )}
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel id="boxtype-label">Box Type</InputLabel>
            <Select
              labelId="boxtype-label"
              id="boxtype"
              name="boxtype"
              value={formData.boxtype}
              onChange={handleChange}
              label="Box Type"
              required
            >
              {data.map((menu, index) => (
                <MenuItem key={index} value={menu.boxtype}>
                  {menu.boxtype}
                </MenuItem>
              ))}
              <MenuItem value="customEntry">Custom Entry</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        {formData.boxtype === 'customEntry' && (
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              type="text"
              name="cuboxtype"
              value={formData.cuboxtype}
              onChange={handleChange}
              label="Custom Box Type"
              required
            />
          </Grid>
        )}
        {formData.sweet.map((sweet, index) => (
          <React.Fragment key={index}>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                type="text"
                name={`sweetname-${index}`}
                value={sweet.sweetname}
                onChange={(e) => handleSweetChangeMain(index, 'sweetname', e.target.value)}
                label="Sweet Name"
                required
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                type="text"
                name={`sweetgram-${index}`}
                value={sweet.sweetgram}
                onChange={(e) => handleSweetChangeMain(index, 'sweetgram', e.target.value)}
                label="Sweet Gram"
                required
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                fullWidth
                type="number"
                name={`sweetquantity-${index}`}
                value={sweet.sweetquantity}
                onChange={(e) => handleSweetChangeMain(index, 'sweetquantity', e.target.value)}
                label="Sweet Quantity"
                required
              />
            </Grid>
            <Grid item xs={12} sm={1}>
              <IconButton
                aria-label="remove sweet"
                onClick={() => handleRemoveSweetFieldMain(index)}
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
            onClick={handleAddSweetFieldMain}
            startIcon={<AddCircleOutline />}
          >
            Add Sweet
          </Button>
        </Grid>
        {subForms.map((subForm, index) => (
  <EditSubPost
    key={index}
    index={index}
    subFormData={subForm}
    handleSubFormChange={(updatedSubFormData) => handleSubFormChange(index, updatedSubFormData)}
  />
))}

        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddSubForm}
            startIcon={<AddCircleOutline />}
          >
            Add Sub Form
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary" disabled={isLoading}>
            {isLoading ? <CircularProgress size={24} /> : 'Submit'}
          </Button>
        </Grid>
      </Grid>
      <ToastContainer />
    </form>
  );
};

export default EditPost;
