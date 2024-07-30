

import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  TextField,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Grid,
  IconButton,
  Box,
  CircularProgress,
} from "@mui/material";
import { AddCircleOutline, RemoveCircleOutline } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import data from "../../data";
import SubMenu from "./SubMenu";

const AddForm = () => {
  const [formData, setFormData] = useState({
    cname: "", // Initialize with empty string
    phone: "", // Initialize with empty string
    mplant: "", // Initialize with empty string
    dunit: "", // Initialize with empty string
    ddate: "", // Initialize with empty string
    odate: "", // Initialize with empty string
    dtime: "", // Initialize with empty string
    boxtype: "", // Initialize with empty string
    boxquantity: "", // Initialize with empty string
    sweetweight: "", // Initialize with empty string
    sweet: [{ sweetname: "", sweetgram: "", sweetquantity: "1" }], // Initial sweets
    subForms: [], // Initialize with an empty array
    cuboxtype: "", // Initialize with empty string
    cusweetweight: "", // Initialize with empty string
    isCustomEntry: false,
  });
  const [subForms, setSubForms] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const getUniqueSweetWeights = () => {
    const sweetWeights = data.map((menu) => menu.sweetweight);
    return [...new Set(sweetWeights)];
  };


  useEffect(() => {
    if (formData.boxtype && formData.sweetweight) {
      const selectedBox = data.find(
        (box) =>
          box.boxtype === formData.boxtype &&
          box.sweetweight === formData.sweetweight
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
          sweet: [{ sweetname: "", sweetgram: "", sweetquantity: "1" }],
        }));
      }
    }
  }, [formData.boxtype, formData.sweetweight]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
      isCustomEntry:
        formData.boxtype === "customEntry" ||
        formData.sweetweight === "customWeight",
    }));
  };

  const handleSweetChangeMain = (index, field, value) => {
    const newSweets = [...formData.sweet];
    newSweets[index][field] = value;
    setFormData((prevFormData) => ({
      ...prevFormData,
      sweet: newSweets,
    }));
  };

  const handleAddSweetFieldMain = () => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      sweet: [
        ...prevFormData.sweet,
        { sweetname: "", sweetgram: "", sweetquantity: "1" },
      ],
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
        boxtype: "",
        boxquantity: "",
        sweetweight: "",
        sweet: [{ sweetname: "", sweetgram: "", sweetquantity: "1" }],
        cuboxtype: "",
        cusweetweight: "",
      },
    ]);
  };

  const handleSubFormChange = (index, updatedSubFormData) => {
    setSubForms((prevSubForms) =>
      prevSubForms.map((subForm, i) =>
        i === index ? updatedSubFormData : subForm
      )
    );
  };

  const handleRemoveSubForm = (index) => {
    setSubForms((prevSubForms) => {
      const newSubForms = [...prevSubForms];
      newSubForms.splice(index, 1);
      return newSubForms;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);

      const formattedSubForms = subForms.map((subForm) => ({
        boxtype:
          subForm.boxtype === "customEntry"
            ? subForm.cuboxtype
            : subForm.boxtype,
        boxquantity: subForm.boxquantity,
        sweetweight:
          subForm.sweetweight === "customWeight"
            ? subForm.cusweetweight
            : subForm.sweetweight,
        sweet: subForm.sweet,
      }));

      const response = await axios.post(
        "https://sweets-admin-server-hh64.vercel.app/api/mainsweet/postmainsweet",
        {
          ...formData,
          subForms: formattedSubForms,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Response:", response.data);
      setFormData({
        cname: "",
        phone: "",
        ddate: "",
        odate: "",
        dtime: "",
        boxtype: "",
        boxquantity: "",
        sweetweight: "",
        sweet: [{ sweetname: "", sweetgram: "", sweetquantity: "1" }],
        cuboxtype: "",
        cusweetweight: "",
        isCustomEntry: false,
      });
      setSubForms([]);
      toast.success("Data added successfully!");
      setTimeout(() => {
        navigate("/customerdetails");
      }, 2000);
    } catch (error) {
      setIsLoading(false);
      console.error("Error adding data:", error);
      toast.error("Error adding data!");
    }
  };

  return (
    <form onSubmit={handleSubmit} autoComplete="on">
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
        label="Delivery Units"
        required
      />
    </Grid>
    <Grid item xs={12} sm={6}>
      <TextField
        fullWidth
        type="text"
        name="mplant"
        value={formData.mplant}
        label="Manufacturing Unit"
        onChange={handleChange}
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
          {getUniqueSweetWeights().map((weight, index) => (
            <MenuItem key={index} value={weight}>
              {weight}
            </MenuItem>
          ))}
          <MenuItem value="customWeight">Custom Entry</MenuItem>
        </Select>
      </FormControl>
      {formData.sweetweight === "customWeight" && (
        <TextField
          fullWidth
          type="text"
          name="cusweetweight"
          value={formData.cusweetweight}
          onChange={handleChange}
          label="Custom Sweet Weight"
          required
        />
      )}
    </Grid>
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
          {data
            .filter((menu) => menu.sweetweight === formData.sweetweight)
            .map((menu, index) => (
              <MenuItem key={index} value={menu.boxtype}>
                {menu.boxtype}
              </MenuItem>
            ))}
          <MenuItem value="customEntry">Custom Entry</MenuItem>
        </Select>
      </FormControl>
      {formData.boxtype === "customEntry" && (
        <TextField
          fullWidth
          type="text"
          name="cuboxtype"
          value={formData.cuboxtype}
          onChange={handleChange}
          label="Custom Box Type"
          required
        />
      )}
    </Grid>

    <Grid item xs={12} >
        <h3>Main Menu</h3>
        {formData.sweet.map((sweet, index) => (
          <Grid container spacing={2} key={index} > 
            {/* Add alignItems="center" to the Grid container */}
            <Grid item xs={12} sm={4} >
              <TextField
                fullWidth
                type="text"
                name="sweetname"
                value={sweet.sweetname}
                onChange={(e) =>
                  handleSweetChangeMain(index, "sweetname", e.target.value)
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
                  handleSweetChangeMain(index, "sweetgram", e.target.value)
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
                  handleSweetChangeMain(
                    index,
                    "sweetquantity",
                    e.target.value
                  )
                }
                label="Sweet Quantity"
                required
              />
            </Grid>
            {/* Fixed bracket placement below */}
            <Grid item xs={12} sm={1}>
              <Box display="flex">
                <IconButton onClick={() => handleRemoveSweetFieldMain(index)}>
                  <RemoveCircleOutline />
                </IconButton>
                {/* Conditional Add button (only for the last row) */}
                {index === formData.sweet.length - 1 && (
                  <IconButton onClick={handleAddSweetFieldMain}>
                    <AddCircleOutline />
                  </IconButton>
                )}
              </Box>
            </Grid> 
          </Grid> // <-- This was incorrectly placed
        ))}
      </Grid>
    <Grid item xs={12}>
      <h3>Sub Menus</h3>
      <Box display="flex" flexDirection="column" gap={2}>
        {subForms.map((subForm, index) => (
          <Box
            key={index}
            border={1}
            borderColor="lightgray"
            borderRadius={2}
            p={2}
          >
            <Grid container alignItems="center" justifyContent="space-between">
              <SubMenu
                getUniqueSweetWeights={getUniqueSweetWeights}
                subFormData={subForm}
                handleSubFormChange={(updatedSubFormData) =>
                  handleSubFormChange(index, updatedSubFormData)
                }
              />
              <Button 
              
              variant="contained"
              color="primary"
              onClick={() => handleRemoveSubForm(index)}
              >          
             
              Remove SubMenu
              </Button>
            </Grid>
          </Box>
        ))}
      </Box>
      <Box display="flex" gap={2} alignItems="center" mt={2}>
        <Button variant="contained" color="primary" onClick={handleAddSubForm}>
          Add SubMenu
        </Button>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={isLoading}
        >
          {isLoading ? <CircularProgress size={24} /> : "Submit"}
        </Button>
      </Box>
    </Grid>
  </Grid>
  <ToastContainer />
</form>

  );
};

export default AddForm;
