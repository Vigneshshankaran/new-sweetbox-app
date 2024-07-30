import React, { useEffect, useState } from 'react';
import {
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
} from '@mui/material';
import { AddCircleOutline, RemoveCircleOutline } from '@mui/icons-material';
import data from '../../data';

const SubMenu = ({ subFormData, handleSubFormChange, getUniqueSweetWeights }) => {
  const [userEdited, setUserEdited] = useState(false);

  useEffect(() => {
    const menu = data.find(m => m.sweetweight === subFormData.sweetweight && m.boxtype === subFormData.boxtype);
    if (menu && subFormData.boxtype !== 'customEntry' && !userEdited) {
      handleSubFormChange({
        ...subFormData,
        sweet: menu.sweets.map(sweet => ({ ...sweet, sweetquantity: 1 }))
      });
    }
  }, [subFormData, userEdited, handleSubFormChange]); // Included subFormData in the dependency array
  
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    handleSubFormChange({ ...subFormData, [name]: value });
    setUserEdited(false);
  };

  const handleSweetChange = (index, field, value) => {
    const newSweets = [...subFormData.sweet];
    newSweets[index][field] = value;
    handleSubFormChange({ ...subFormData, sweet: newSweets });
    setUserEdited(true);
  };

  const handleAddSweetField = () => {
    handleSubFormChange({
      ...subFormData,
      sweet: [
        ...subFormData.sweet,
        { sweetname: '', sweetgram: '', sweetquantity: '1' },
      ],
    });
    setUserEdited(true);
  };

  const handleRemoveSweetField = (index) => {
    const newSweets = [...subFormData.sweet];
    newSweets.splice(index, 1);
    handleSubFormChange({ ...subFormData, sweet: newSweets });
    setUserEdited(true);
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
            {getUniqueSweetWeights().map((weight, index) => (
              <MenuItem key={index} value={weight}>
                {weight}
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
          <Grid container spacing={2} key={index}> {/* Align items to center */}
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                type="text"
                name="sweetname"
                value={sweet.sweetname || ''} // Add default value here
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
                value={sweet.sweetgram || 0} // Add default value here
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
                value={sweet.sweetquantity || 1} // Add default value here
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
        <Grid item xs={12}> {/* Align button to the right */}
      
          <IconButton
            onClick={handleAddSweetField}>
            <AddCircleOutline />
              </IconButton>
          
        </Grid>
      </Grid>
    </Grid>
  );
};

export default SubMenu;
