import React, { useEffect, useState } from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SweetBoxes = () => {
  const [sweetBoxes, setSweetBoxes] = useState([]);
  const [showNewMenuForm, setShowNewMenuForm] = useState(false);
  const [newMenuType, setNewMenuType] = useState("");
  const [newMenuWeight, setNewMenuWeight] = useState("");
  const [newSweetFields, setNewSweetFields] = useState([
    { sweetname: "", sweetquantity: "", sweetgram: "" },
    { sweetname: "", sweetquantity: "", sweetgram: "" },
    { sweetname: "", sweetquantity: "", sweetgram: "" }
  ]);

  const [filterMenu, setFilterMenu] = useState("Menu");
  const [filterBoxType, setFilterBoxType] = useState("Box Type");

  useEffect(() => {
    axios
      .get("https://sweets-admin-server-hh64.vercel.app/api/sweets/getdefaultsweet")
      .then((response) => {
        setSweetBoxes(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the sweet boxes!", error);
      });
  }, []);

  const handleUpdate = (boxId, updatedBox) => {
    axios
      .put(`https://sweets-admin-server-hh64.vercel.app/api/sweets/${boxId}`, updatedBox)
      .then((response) => {
        console.log("Sweet box updated:", response.data);
        setSweetBoxes(sweetBoxes.map(box => (box._id === boxId ? response.data : box)));
        toast.success("Sweet box updated successfully!");
      })
      .catch((error) => {
        console.error("Error updating sweet box:", error);
        toast.error("Failed to update sweet box.");
      });
  };

  const handleCreateNewMenu = () => {
    const newSweets = newSweetFields.map((sweet) => ({
      sweetname: sweet.sweetname,
      sweetquantity: sweet.sweetquantity,
      sweetgram: sweet.sweetgram,
    }));

    const newMenu = {
      boxtype: newMenuType,
      sweetweight: newMenuWeight,
      sweets: newSweets,
    };

    axios
      .post("https://sweets-admin-server-hh64.vercel.app/api/sweets/postdefaultsweet", newMenu)
      .then((response) => {
        console.log("Sweet box added:", response.data);
        setSweetBoxes([...sweetBoxes, response.data]);
        setNewMenuType("");
        setNewMenuWeight("");
        setNewSweetFields([
          { sweetname: "", sweetquantity: "", sweetgram: "" },
          { sweetname: "", sweetquantity: "", sweetgram: "" },
          { sweetname: "", sweetquantity: "", sweetgram: "" }
        ]);
        setShowNewMenuForm(false);
        toast.success("Sweet box added successfully!");
      })
      .catch((error) => {
        console.error("Error adding sweet box:", error);
        toast.error("Failed to add sweet box.");
      });
  };

  const handleChange = (boxIndex, sweetIndex, field, value) => {
    const updatedSweetBoxes = [...sweetBoxes];
    if (sweetIndex === null) {
      updatedSweetBoxes[boxIndex][field] = value;
    } else {
      updatedSweetBoxes[boxIndex].sweets[sweetIndex][field] = value;
    }
    setSweetBoxes(updatedSweetBoxes);
  };

  const handleAddNewSweetField = (boxIndex) => {
    const updatedFields = [...sweetBoxes];
    updatedFields[boxIndex].sweets.push({ sweetname: "", sweetquantity: "", sweetgram: "" });
    setSweetBoxes(updatedFields);
  };

  const handleDeleteSweetBox = (boxId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this sweet box?");
    if (confirmDelete) {
      axios
        .delete(`https://sweets-admin-server-hh64.vercel.app/api/sweets/${boxId}`)
        .then(() => {
          setSweetBoxes(sweetBoxes.filter(box => box._id !== boxId));
          toast.success("Sweet box deleted successfully!");
        })
        .catch((error) => {
          console.error("Error deleting sweet box:", error);
          toast.error("Failed to delete sweet box.");
        });
    }
  };

  const handleDeleteSweetItem = (boxIndex, sweetIndex) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this sweet item?");
    if (confirmDelete) {
      const updatedSweetBoxes = [...sweetBoxes];
      updatedSweetBoxes[boxIndex].sweets.splice(sweetIndex, 1);
      setSweetBoxes(updatedSweetBoxes);

      const updatedBox = updatedSweetBoxes[boxIndex];
      handleUpdate(updatedBox._id, updatedBox);
    }
  };

  const handleDeleteSweetItemForNewForm = (index) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this sweet item?");
    if (confirmDelete) {
      const updatedFields = [...newSweetFields];
      updatedFields.splice(index, 1);
      setNewSweetFields(updatedFields);
    }
  };

  const handleAddNewSweetFieldForNewForm = () => {
    setNewSweetFields([
      ...newSweetFields,
      { sweetname: "", sweetquantity: "", sweetgram: "" },
    ]);
  };

  const filteredSweetBoxes = sweetBoxes.filter((box) => {
    const filterMenuLower = filterMenu.toLowerCase();
    const filterBoxTypeLower = filterBoxType.toLowerCase();

    const boxMenuLower = box.boxtype ? box.boxtype.toLowerCase() : "";
    const boxBoxTypeLower = box.sweetweight ? box.sweetweight.toLowerCase() : "";

    if (filterMenu !== "Menu" && boxMenuLower !== filterMenuLower) {
      return false;
    }
    if (filterBoxType !== "Box Type" && boxBoxTypeLower !== filterBoxTypeLower) {
      return false;
    }
    return true;
  });

  const uniqueMenuTypes = Array.from(new Set(sweetBoxes.map((box) => box.boxtype ? box.boxtype.toLowerCase() : "")));
  const uniqueBoxTypes = Array.from(new Set(sweetBoxes.map((box) => box.sweetweight ? box.sweetweight.toLowerCase() : "")));

  return (
    <div>
      <ToastContainer />
      <h1>Sweet Menu</h1>

      <FormControl fullWidth sx={{ marginBottom: 2, ml: 4, width: 1 / 4 }}>
        <InputLabel id="menu-label">Menu</InputLabel>
        <Select
          labelId="menu-label"
          id="menu-select"
          value={filterMenu}
          onChange={(e) => setFilterMenu(e.target.value)}
          label="Menu"
        >
          <MenuItem value="Menu">Menu</MenuItem>
          {uniqueMenuTypes.map((menu, index) => (
            <MenuItem key={index} value={menu}>{menu}</MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl fullWidth sx={{ marginBottom: 2, width: 1 / 4, ml: 4 }}>
        <InputLabel id="boxtype-label">Box Type</InputLabel>
        <Select
          labelId="boxtype-label"
          id="boxtype-select"
          value={filterBoxType}
          onChange={(e) => setFilterBoxType(e.target.value)}
          label="Box Type"
        >
          <MenuItem value="Box Type">Box Type</MenuItem>
          {uniqueBoxTypes.map((type, index) => (
            <MenuItem key={index} value={type}>{type}</MenuItem>
          ))}
        </Select>
      </FormControl>

      {filteredSweetBoxes.length > 0 ? (
        filteredSweetBoxes.map((box, boxIndex) => (
          <div key={boxIndex}>
            <Box
              component="form"
              sx={{
                "& > :not(style)": { m: 1, width: "auto" },
              }}
              noValidate
              autoComplete="off"
            >
              <TextField
                label="Sweet Menu"
                variant="outlined"
                value={box.boxtype}
                onChange={(e) =>
                  handleChange(boxIndex, null, "boxtype", e.target.value)
                }
                fullWidth
              />
              <IconButton
                color="error"
                onClick={() => handleDeleteSweetBox(box._id)}
              >
                <RemoveCircleOutlineIcon />
              </IconButton>

              <TextField
                label="Box Weight"
                variant="outlined"
                value={box.sweetweight}
                onChange={(e) =>
                  handleChange(boxIndex, null, "sweetweight", e.target.value)
                }
                fullWidth
              />
            </Box>
            {box.sweets.map((sweet, sweetIndex) => (
              <div key={sweetIndex}>
                <Box
                  component="form"
                  sx={{
                    "& > :not(style)": { m: 1, width: "auto" },
                  }}
                  noValidate
                  autoComplete="off"
                >
                  <TextField
                    label="Sweet Name"
                    variant="outlined"
                    value={sweet.sweetname}
                    onChange={(e) =>
                      handleChange(
                        boxIndex,
                        sweetIndex,
                        "sweetname",
                        e.target.value
                      )
                    }
                    fullWidth
                  />
                  <IconButton
                    color="error"
                    onClick={() => handleDeleteSweetItem(boxIndex, sweetIndex)}
                  >
                    <RemoveCircleOutlineIcon />
                  </IconButton>

                  <TextField
                    label="Quantity"
                    variant="outlined"
                    value={sweet.sweetquantity}
                    onChange={(e) =>
                      handleChange(
                        boxIndex,
                        sweetIndex,
                        "sweetquantity",
                        e.target.value
                      )
                    }
                    fullWidth
                  />
                  <TextField
                    label="Sweet Gram"
                    variant="outlined"
                    value={sweet.sweetgram}
                    onChange={(e) =>
                      handleChange(
                        boxIndex,
                        sweetIndex,
                        "sweetgram",
                        e.target.value
                      )
                    }
                    fullWidth
                  />
                </Box>
              </div>
            ))}
            <Button
              variant="outlined"
              onClick={() => handleAddNewSweetField(boxIndex)}
            >
              Add New Sweet Item
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleUpdate(box._id, box)}
              sx={{ mt: 2 }}
            >
              Update
            </Button>
          </div>
        ))
      ) : (
        <div>No sweet boxes available</div>
      )}

      <Button
        variant="contained"
        color="primary"
        onClick={() => setShowNewMenuForm(!showNewMenuForm)}
        sx={{ mt: 2 }}
      >
        {showNewMenuForm ? "Cancel New Menu" : "Create New Menu"}
      </Button>

      {showNewMenuForm && (
        <div>
          <Box
            component="form"
            sx={{
              "& > :not(style)": { m: 1, width: "auto" },
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              label="Sweet Menu"
              variant="outlined"
              value={newMenuType}
              onChange={(e) => setNewMenuType(e.target.value)}
              fullWidth
            />
            <TextField
              label="Box Weight"
              variant="outlined"
              value={newMenuWeight}
              onChange={(e) => setNewMenuWeight(e.target.value)}
              fullWidth
            />
          </Box>
          {newSweetFields.map((sweet, index) => (
            <div key={index}>
              <Box
                component="form"
                sx={{
                  "& > :not(style)": { m: 1, width: "auto" },
                }}
                noValidate
                autoComplete="off"
              >
                <TextField
                  label="Sweet Name"
                  variant="outlined"
                  value={sweet.sweetname}
                  onChange={(e) => {
                    const updatedFields = [...newSweetFields];
                    updatedFields[index].sweetname = e.target.value;
                    setNewSweetFields(updatedFields);
                  }}
                  fullWidth
                />
                <IconButton
                  color="error"
                  onClick={() => handleDeleteSweetItemForNewForm(index)}
                >
                  <RemoveCircleOutlineIcon />
                </IconButton>

                <TextField
                  label="Quantity"
                  variant="outlined"
                  value={sweet.sweetquantity}
                  onChange={(e) => {
                    const updatedFields = [...newSweetFields];
                    updatedFields[index].sweetquantity = e.target.value;
                    setNewSweetFields(updatedFields);
                  }}
                  fullWidth
                />
                <TextField
                  label="Sweet Gram"
                  variant="outlined"
                  value={sweet.sweetgram}
                  onChange={(e) => {
                    const updatedFields = [...newSweetFields];
                    updatedFields[index].sweetgram = e.target.value;
                    setNewSweetFields(updatedFields);
                  }}
                  fullWidth
                />
              </Box>
            </div>
          ))}
          <Button
            variant="outlined"
            onClick={handleAddNewSweetFieldForNewForm}
          >
            Add New Sweet Item
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleCreateNewMenu}
            sx={{ mt: 2 }}
          >
            Create
          </Button>
        </div>
      )}
    </div>
  );
};

export default SweetBoxes;
