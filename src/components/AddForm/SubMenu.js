import React, { useEffect, useState } from 'react';
import {
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  Button,
} from '@mui/material';
import { AddCircleOutline, RemoveCircleOutline } from '@mui/icons-material';
import data from '../../data';

const SubMenu = ({ subFormData, handleSubFormChange }) => {
  const [userEdited, setUserEdited] = useState(false); // Track if user has edited the sweet fields

  useEffect(() => {
    const menu = data.find(
      (m) =>
        m.sweetweight === subFormData.sweetweight &&
        m.boxtype === subFormData.boxtype
    );
    if (menu && subFormData.boxtype !== 'customEntry' && !userEdited) {
      handleSubFormChange({
        ...subFormData,
        sweet: menu.sweets.map((sweet) => ({
          sweetname: sweet.sweetname,
          sweetgram: sweet.sweetgram,
          sweetquantity: 1,
        })),
      });
    }
  }, [subFormData, userEdited, handleSubFormChange]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    handleSubFormChange({ ...subFormData, [name]: value });
    setUserEdited(false); // Reset userEdited flag when main form fields change
  };

  const handleSweetChange = (index, field, value) => {
    const newSweets = [...subFormData.sweet];
    newSweets[index][field] = value;
    handleSubFormChange({ ...subFormData, sweet: newSweets });
    setUserEdited(true); // Set userEdited flag when sweet fields are changed
  };

  const handleAddSweetField = () => {
    handleSubFormChange({
      ...subFormData,
      sweet: [
        ...subFormData.sweet,
        { sweetname: '', sweetgram: '', sweetquantity: '1' },
      ],
    });
    setUserEdited(true); // Set userEdited flag when a new sweet field is added
  };

  const handleRemoveSweetField = (index) => {
    const newSweets = [...subFormData.sweet];
    newSweets.splice(index, 1);
    handleSubFormChange({ ...subFormData, sweet: newSweets });
    setUserEdited(true); // Set userEdited flag when a sweet field is removed
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={4}>
        <TextField
          fullWidth
          type="number"
          name="boxquantity"
          value={subFormData.boxquantity}
          onChange={handleChange}
          label="Box Quantity"
          required
        />
      </Grid>
      <Grid item xs={12} sm={4}>
        <FormControl fullWidth>
          <InputLabel id="sweetweight-label">Sweet Weight</InputLabel>
          <Select
            labelId="sweetweight-label"
            id="sweetweight"
            name="sweetweight"
            value={subFormData.sweetweight}
            onChange={handleChange}
            label="Sweet Weight"
            required
          >
            {data.map((menu, index) => (
              <MenuItem key={index} value={menu.sweetweight}>
                {menu.sweetweight}
              </MenuItem>
            ))}
            <MenuItem value="customWeight">Custom Entry</MenuItem>
          </Select>
        </FormControl>
        {subFormData.sweetweight === 'customWeight' && (
          <TextField
            fullWidth
            type="text"
            name="cusweetweight"
            value={subFormData.cusweetweight}
            onChange={handleChange}
            label="Custom Sweet Weight"
            required
          />
        )}
      </Grid>
      <Grid item xs={12} sm={4}>
        <FormControl fullWidth>
          <InputLabel id="boxtype-label">Box Type</InputLabel>
          <Select
            labelId="boxtype-label"
            id="boxtype"
            name="boxtype"
            value={subFormData.boxtype}
            onChange={handleChange}
            label="Box Type"
            required
          >
            {data
              .filter((menu) => menu.sweetweight === subFormData.sweetweight)
              .map((menu, index) => (
                <MenuItem key={index} value={menu.boxtype}>
                  {menu.boxtype}
                </MenuItem>
              ))}
            <MenuItem value="customEntry">Custom Entry</MenuItem>
          </Select>
        </FormControl>
        {subFormData.boxtype === 'customEntry' && (
          <TextField
            fullWidth
            type="text"
            name="cuboxtype"
            value={subFormData.cuboxtype}
            onChange={handleChange}
            label="Custom Box Type"
            required
          />
        )}
      </Grid>

      <Grid item xs={12}>
        {subFormData.sweet.map((sweet, index) => (
          <Grid container spacing={2} key={index}>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                type="text"
                name="sweetname"
                value={sweet.sweetname}
                onChange={(e) =>
                  handleSweetChange(index, 'sweetname', e.target.value)
                }
                label="Sweet Name"
                required
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                type="number"
                name="sweetgram"
                value={sweet.sweetgram}
                onChange={(e) =>
                  handleSweetChange(index, 'sweetgram', e.target.value)
                }
                label="Sweet Gram"
                required
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                fullWidth
                type="number"
                name="sweetquantity"
                value={sweet.sweetquantity}
                onChange={(e) =>
                  handleSweetChange(index, 'sweetquantity', e.target.value)
                }
                label="Sweet Quantity"
                required
              />
            </Grid>
            <Grid item xs={12} sm={1}>
              <IconButton onClick={() => handleRemoveSweetField(index)}>
                <RemoveCircleOutline />
              </IconButton>
            </Grid>
          </Grid>
        ))}
        <Grid item xs={12}>
          <Button
            variant="outlined"
            color="primary"
            onClick={handleAddSweetField}
            startIcon={<AddCircleOutline />}
          >
            Add Sweet
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default SubMenu;
