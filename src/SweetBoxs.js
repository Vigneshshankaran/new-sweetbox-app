// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import Button from "@mui/material/Button";
// import ButtonGroup from "@mui/material/ButtonGroup";
// import Box from "@mui/material/Box";
// import TextField from "@mui/material/TextField";
// import IconButton from "@mui/material/IconButton";
// import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
// import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
// import FormControl from "@mui/material/FormControl";
// import InputLabel from "@mui/material/InputLabel";
// import Select from "@mui/material/Select";
// import MenuItem from "@mui/material/MenuItem";
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const SweetBoxes = () => {
//   const [sweetBoxes, setSweetBoxes] = useState([]);
//   const [showNewMenuForm, setShowNewMenuForm] = useState(false); // State to control form visibility
//   const [newMenuType, setNewMenuType] = useState("");
//   const [newMenuWeight, setNewMenuWeight] = useState("");
//   const [newSweetFields, setNewSweetFields] = useState([
//     { sweetname: "", sweetquantity: "", sweetgram: "" },
//     { sweetname: "", sweetquantity: "", sweetgram: "" },
//     { sweetname: "", sweetquantity: "", sweetgram: "" }
//   ]);

//   const [filterMenu, setFilterMenu] = useState("Menu");
//   const [filterBoxType, setFilterBoxType] = useState("Box Type");

//   useEffect(() => {
//     axios
//       .get("http://localhost:5000/api/sweets/getdefaultsweet")
//       .then((response) => {
//         setSweetBoxes(response.data);
//       })
//       .catch((error) => {
//         console.error("There was an error fetching the sweet boxes!", error);
//       });
//   }, []);

//   const handleUpdate = (boxtype, sweetweight, updatedBox) => {
//     axios
//       .put(
//         `http://localhost:5000/sweetboxes/${boxtype}/${sweetweight}`,
//         updatedBox
//       )
//       .then((response) => {
//         console.log("Sweet box updated:", response.data);
//         const updatedSweetBoxes = sweetBoxes.map((box) => {
//           if (box.boxtype === boxtype && box.sweetweight === sweetweight) {
//             return response.data;
//           }
//           return box;
//         });
//         setSweetBoxes(updatedSweetBoxes);
//         toast.success("Sweet box updated successfully!");
//       })
//       .catch((error) => {
//         console.error("Error updating sweet box:", error);
//         toast.error("Failed to update sweet box.");
//       });
//   };

//   const handleCreateNewMenu = () => {
//     const newSweets = newSweetFields.map((sweet) => ({
//       sweetname: sweet.sweetname,
//       sweetquantity: sweet.sweetquantity,
//       sweetgram: sweet.sweetgram,
//     }));

//     const newMenu = {
//       boxtype: newMenuType,
//       sweetweight: newMenuWeight,
//       sweets: newSweets,
//     };

//     axios
//       .post("http://localhost:5000/sweetboxes", newMenu)
//       .then((response) => {
//         console.log("Sweet box added:", response.data);
//         setSweetBoxes([...sweetBoxes, response.data]);
//         setNewMenuType("");
//         setNewMenuWeight("");
//         setNewSweetFields([
//           { sweetname: "", sweetquantity: "", sweetgram: "" },
//           { sweetname: "", sweetquantity: "", sweetgram: "" },
//           { sweetname: "", sweetquantity: "", sweetgram: "" }
//         ]);
//         setShowNewMenuForm(false); // Hide the form after adding the menu
//         toast.success("Sweet box added successfully!");
//       })
//       .catch((error) => {
//         console.error("Error adding sweet box:", error);
//         toast.error("Failed to add sweet box.");
//       });
//   };

//   const handleChange = (boxIndex, sweetIndex, field, value) => {
//     const updatedSweetBoxes = [...sweetBoxes];
//     if (sweetIndex === null) {
//       updatedSweetBoxes[boxIndex][field] = value;
//     } else {
//       updatedSweetBoxes[boxIndex].sweets[sweetIndex][field] = value;
//     }
//     setSweetBoxes(updatedSweetBoxes);
//   };

//   const handleAddNewSweetField = (boxIndex) => {
//     const updatedFields = [...sweetBoxes];
//     updatedFields[boxIndex].sweets.push({ sweetname: "", sweetquantity: "", sweetgram: "" });
//     setSweetBoxes(updatedFields);
//   };

//   const handleDeleteSweetBox = (id) => {
//     const confirmDelete = window.confirm("Are you sure you want to delete this sweet box?");
//     if (confirmDelete) {
//       axios
//         .delete(`http://localhost:5000/api/sweets/${id}`)
//         .then((response) => {
//           console.log(response.data.message);
//           const updatedSweetBoxes = sweetBoxes.filter((box) => box._id !== id);

//           setSweetBoxes(updatedSweetBoxes);
//           toast.success("Sweet box deleted successfully!");
//         })
//         .catch((error) => {
//           console.error("Error deleting sweet box:", error);
//           toast.error("Failed to delete sweet box.");
//         });
//     }
//   };

//   const handleDeleteSweetItem = (boxIndex, sweetIndex) => {
//     const confirmDelete = window.confirm("Are you sure you want to delete this sweet item?");
//     if (confirmDelete) {
//       const updatedSweetBoxes = [...sweetBoxes];
//       updatedSweetBoxes[boxIndex].sweets.splice(sweetIndex, 1);
//       setSweetBoxes(updatedSweetBoxes);

//       // Optionally, update the server with the new state
//       const updatedBox = updatedSweetBoxes[boxIndex];
//       handleUpdate(updatedBox.boxtype, updatedBox.sweetweight, updatedBox);
//     }
//   };

//   // Filter sweet boxes based on selected menu and box type
//   const filteredSweetBoxes = sweetBoxes.filter((box) => {
//     const filterMenuLower = filterMenu.toLowerCase();
//     const filterBoxTypeLower = filterBoxType.toLowerCase();

//     const boxMenuLower = box.boxtype ? box.boxtype.toLowerCase() : ""; // Handle undefined or null
//     const boxBoxTypeLower = box.sweetweight ? box.sweetweight.toLowerCase() : ""; // Handle undefined or null

//     if (filterMenu !== "Menu" && boxMenuLower !== filterMenuLower) {
//       return false;
//     }
//     if (filterBoxType !== "Box Type" && boxBoxTypeLower !== filterBoxTypeLower) {
//       return false;
//     }
//     return true;
//   });

//   // Extract unique menu types and box types
//   const uniqueMenuTypes = Array.from(new Set(sweetBoxes.map((box) => box.boxtype ? box.boxtype.toLowerCase() : "")));
//   const uniqueBoxTypes = Array.from(new Set(sweetBoxes.map((box) => box.sweetweight ? box.sweetweight.toLowerCase() : "")));

//   return (
//     <div>
//       <ToastContainer />
//       <h1>Sweet Menu</h1>

//       <FormControl fullWidth sx={{ marginBottom: 2,ml:4,  width: 1/4}}>
//         <InputLabel id="menu-label">Menu</InputLabel>
//         <Select
//           labelId="menu-label"
//           id="menu-select"
//           value={filterMenu}
//           onChange={(e) => setFilterMenu(e.target.value)}
//           label="Menu"
//         >
//           <MenuItem value="Menu">Menu</MenuItem>
//           {uniqueMenuTypes.map((menu, index) => (
//             <MenuItem key={index} value={menu}>{menu}</MenuItem>
//           ))}
//         </Select>
//       </FormControl>

//       <FormControl fullWidth sx={{ marginBottom: 2,  width: 1/4, ml:4}}>
//         <InputLabel id="boxtype-label">Box Type</InputLabel>
//         <Select
//           labelId="boxtype-label"
//           id="boxtype-select"
//           value={filterBoxType}
//           onChange={(e) => setFilterBoxType(e.target.value)}
//           label="Box Type"
//         >
//           <MenuItem value="Box Type">Box Type</MenuItem>
//           {uniqueBoxTypes.map((type, index) => (
//             <MenuItem key={index} value={type}>{type}</MenuItem>
//           ))}
//         </Select>
//       </FormControl>

//       {filteredSweetBoxes.length > 0 ? (
//         filteredSweetBoxes.map((box, boxIndex) => (
//           <div key={boxIndex}>
//             <Box
//               component="form"
//               sx={{
//                 "& > :not(style)": { m: 1, width: "auto" },
//               }}
//               noValidate
//               autoComplete="off"
//             >
//               <TextField
//                 label="Sweet Menu"
//                 variant="outlined"
//                 value={box.boxtype}
//                 onChange={(e) =>
//                   handleChange(boxIndex, null, "boxtype", e.target.value)
//                 }
//                 fullWidth
//               />
//               <IconButton
//           type="button"
//           color="secondary"
//           aria-label="delete sweet box"
//           onClick={() => handleDeleteSweetBox(box._id)}
//         >
//           <RemoveCircleOutlineIcon />
//         </IconButton>
//             </Box>
//             <Box
//               sx={{
//                 "& > :not(style)": { m: 1, width: "auto" },
//               }}
//             >
//               <TextField
//                 label="Sweet Weight"
//                 variant="outlined"
//                 value={box.sweetweight}
//                 onChange={(e) =>
//                   handleChange(boxIndex, null, "sweetweight", e.target.value)
//                 }
//                 fullWidth
//               />
//             </Box>
//             {box.sweets.map((sweet, sweetIndex) => (
//               <div key={sweetIndex}>
//                 <Box
//                   component="form"
//                   sx={{
//                     "& > :not(style)": { m: 1, width: "auto", p: 1 },
//                   }}
//                   noValidate
//                   autoComplete="off"
//                 >
//                   <TextField
//                     id={`sweet-name-${sweetIndex}`}
//                     label="Sweet Name"
//                     variant="outlined"
//                     value={sweet.sweetname}
//                     onChange={(e) =>
//                       handleChange(
//                         boxIndex,
//                         sweetIndex,
//                         "sweetname",
//                         e.target.value
//                       )
//                     }
//                     fullWidth
//                   />
//                   <TextField
//                     id={`sweet-quantity-${sweetIndex}`}
//                     label="Sweet Quantity"
//                     variant="outlined"
//                     value={sweet.sweetquantity}
//                     onChange={(e) =>
//                       handleChange(
//                         boxIndex,
//                         sweetIndex,
//                         "sweetquantity",
//                         e.target.value
//                       )
//                     }
//                     fullWidth
//                   />
//                   <TextField
//                     id={`sweet-gram-${sweetIndex}`}
//                     label="Sweet Gram"
//                     variant="outlined"
//                     value={sweet.sweetgram}
//                     onChange={(e) =>
//                       handleChange(
//                         boxIndex,
//                         sweetIndex,
//                         "sweetgram",
//                         e.target.value
//                       )
//                     }
//                     fullWidth
//                   />
//                   <IconButton
//                     type="button"
//                     color="secondary"
//                     aria-label="remove sweet"
//                     onClick={() =>
//                       handleDeleteSweetItem(boxIndex, sweetIndex)
//                     }
//                   >
//                     <RemoveCircleOutlineIcon />
//                   </IconButton>
//                 </Box>
//               </div>
//             ))}
//             <IconButton
//               type="button"
//               color="primary"
//               aria-label="add sweet"
//               onClick={() => handleAddNewSweetField(boxIndex)}
//             >
//               <AddCircleOutlineIcon />
//             </IconButton>
//             <ButtonGroup
//               disableElevation
//               variant="contained"
//               aria-label="Update button group"
//               sx={{ ml: 1, mt: 1, mb: 1.5 }}
//             >
//               <Button
//                 onClick={() =>
//                   handleUpdate(box.boxtype, box.sweetweight, box)
//                 }
//               >
//                 Update
//               </Button>
//             </ButtonGroup>
//           </div>
//         ))
//       ) : (
//         <p>No sweet boxes available.</p>
//       )}

//       <div>
//         <Button
//           variant="contained"
//           color="primary"
//           onClick={() => setShowNewMenuForm(true)}
//         >
//           Add New Sweet Box
//         </Button>
//         {showNewMenuForm && (
//           <div>
//             <Box
//               component="form"
//               sx={{
//                 "& > :not(style)": { m: 1, width: "auto" },
//               }}
//               noValidate
//               autoComplete="off"
//             >
//               <TextField
//                 label="Sweet Menu"
//                 variant="outlined"
//                 value={newMenuType}
//                 onChange={(e) => setNewMenuType(e.target.value)}
//                 fullWidth
//               />
//             </Box>
//             <Box
//               sx={{
//                 "& > :not(style)": { m: 1, width: "auto" },
//               }}
//             >
//               <TextField
//                 label="Sweet Weight"
//                 variant="outlined"
//                 value={newMenuWeight}
//                 onChange={(e) => setNewMenuWeight(e.target.value)}
//                 fullWidth
//               />
//             </Box>
//             {newSweetFields.map((sweet, index) => (
//               <div key={index}>
//                 <Box
//                   component="form"
//                   sx={{
//                     "& > :not(style)": { m: 1, width: "auto", p: 1 },
//                   }}
//                   noValidate
//                   autoComplete="off"
//                 >
//                   <TextField
//                     id={`new-sweet-name-${index}`}
//                     label="Sweet Name"
//                     variant="outlined"
//                     value={sweet.sweetname}
//                     onChange={(e) =>
//                       setNewSweetFields((prevState) => {
//                         const newState = [...prevState];
//                         newState[index].sweetname = e.target.value;
//                         return newState;
//                       })
//                     }
//                     fullWidth
//                   />
//                   <TextField
//                     id={`new-sweet-quantity-${index}`}
//                     label="Sweet Quantity"
//                     variant="outlined"
//                     value={sweet.sweetquantity}
//                     onChange={(e) =>
//                       setNewSweetFields((prevState) => {
//                         const newState = [...prevState];
//                         newState[index].sweetquantity = e.target.value;
//                         return newState;
//                       })
//                     }
//                     fullWidth
//                   />
//                   <TextField
//                     id={`new-sweet-gram-${index}`}
//                     label="Sweet Gram"
//                     variant="outlined"
//                     value={sweet.sweetgram}
//                     onChange={(e) =>
//                       setNewSweetFields((prevState) => {
//                         const newState = [...prevState];
//                         newState[index].sweetgram = e.target.value;
//                         return newState;
//                       })
//                     }
//                     fullWidth
//                   />
//                 </Box>
//               </div>
//             ))}
//             <ButtonGroup
//               disableElevation
//               variant="contained"
//               aria-label="Add sweet button group"
//               sx={{ mt: 2 }}
//             >
//               <Button onClick={handleCreateNewMenu}>Add Sweet Box</Button>
//               <Button onClick={() => setShowNewMenuForm(false)}>Cancel</Button>
//             </ButtonGroup>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default SweetBoxes;


import React, { useEffect, useState } from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SweetBoxes = () => {
  const [sweetBoxes, setSweetBoxes] = useState([]);
  const [showNewMenuForm, setShowNewMenuForm] = useState(false); // State to control form visibility
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

  const handleUpdate = (boxtype, sweetweight, updatedBox) => {
    axios
      .put(
        `http://localhost:5000/sweetboxes/${boxtype}/${sweetweight}`,
        updatedBox
      )
      .then((response) => {
        console.log("Sweet box updated:", response.data);
        const updatedSweetBoxes = sweetBoxes.map((box) => {
          if (box.boxtype === boxtype && box.sweetweight === sweetweight) {
            return response.data;
          }
          return box;
        });
        setSweetBoxes(updatedSweetBoxes);
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
      .post("https://sweets-admin-server-hh64.vercel.app/api/sweets", newMenu)
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
        setShowNewMenuForm(false); // Hide the form after adding the menu
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

  const handleDeleteSweetBox = (boxtype, sweetweight) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this sweet box?");
    if (confirmDelete) {
      axios
        .delete(`http://localhost:5000/sweetboxes/${boxtype}/${sweetweight}`)
        .then((response) => {
          console.log(response.data.message);
          const updatedSweetBoxes = sweetBoxes.filter(
            (box) => !(box.boxtype === boxtype && box.sweetweight === sweetweight)
          );
          setSweetBoxes(updatedSweetBoxes);
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

      // Optionally, update the server with the new state
      const updatedBox = updatedSweetBoxes[boxIndex];
      handleUpdate(updatedBox.boxtype, updatedBox.sweetweight, updatedBox);
    }
  };

  // Filter sweet boxes based on selected menu and box type
  const filteredSweetBoxes = sweetBoxes.filter((box) => {
    const filterMenuLower = filterMenu.toLowerCase();
    const filterBoxTypeLower = filterBoxType.toLowerCase();

    const boxMenuLower = box.boxtype ? box.boxtype.toLowerCase() : ""; // Handle undefined or null
    const boxBoxTypeLower = box.sweetweight ? box.sweetweight.toLowerCase() : ""; // Handle undefined or null

    if (filterMenu !== "Menu" && boxMenuLower !== filterMenuLower) {
      return false;
    }
    if (filterBoxType !== "Box Type" && boxBoxTypeLower !== filterBoxTypeLower) {
      return false;
    }
    return true;
  });

  // Extract unique menu types and box types
  const uniqueMenuTypes = Array.from(new Set(sweetBoxes.map((box) => box.boxtype ? box.boxtype.toLowerCase() : "")));
  const uniqueBoxTypes = Array.from(new Set(sweetBoxes.map((box) => box.sweetweight ? box.sweetweight.toLowerCase() : "")));

  return (
    <div>
      <ToastContainer />
      <h1>Sweet Menu</h1>

      <FormControl fullWidth sx={{ marginBottom: 2,ml:4,  width: 1/4}}>
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

      <FormControl fullWidth sx={{ marginBottom: 2,  width: 1/4, ml:4}}>
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
                type="button"
                color="secondary"
                aria-label="delete sweet box"
                onClick={() =>
                  handleDeleteSweetBox(box.boxtype, box.sweetweight)
                }
              >
                <RemoveCircleOutlineIcon />
              </IconButton>
            </Box>
            <Box
              sx={{
                "& > :not(style)": { m: 1, width: "auto" },
              }}
            >
              <TextField
                label="Sweet Weight"
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
                    "& > :not(style)": { m: 1, width: "auto", p: 1 },
                  }}
                  noValidate
                  autoComplete="off"
                >
                  <TextField
                    id={`sweet-name-${sweetIndex}`}
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
                  <TextField
                    id={`sweet-quantity-${sweetIndex}`}
                    label="Sweet Quantity"
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
                    id={`sweet-gram-${sweetIndex}`}
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
                  <IconButton
                    type="button"
                    color="secondary"
                    aria-label="remove sweet"
                    onClick={() =>
                      handleDeleteSweetItem(boxIndex, sweetIndex)
                    }
                  >
                    <RemoveCircleOutlineIcon />
                  </IconButton>
                </Box>
              </div>
            ))}
            <IconButton
              type="button"
              color="primary"
              aria-label="add sweet"
              onClick={() => handleAddNewSweetField(boxIndex)}
            >
              <AddCircleOutlineIcon />
            </IconButton>
            <ButtonGroup
              disableElevation
              variant="contained"
              aria-label="Update button group"
              sx={{ ml: 1, mt: 1, mb: 1.5 }}
            >
              <Button
                onClick={() =>
                  handleUpdate(box.boxtype, box.sweetweight, box)
                }
              >
                Update
              </Button>
            </ButtonGroup>
          </div>
        ))
      ) : (
        <p>No sweet boxes available.</p>
      )}

      <div>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setShowNewMenuForm(true)}
        >
          Add New Sweet Box
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
            </Box>
            <Box
              sx={{
                "& > :not(style)": { m: 1, width: "auto" },
              }}
            >
              <TextField
                label="Sweet Weight"
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
                    "& > :not(style)": { m: 1, width: "auto", p: 1 },
                  }}
                  noValidate
                  autoComplete="off"
                >
                  <TextField
                    id={`new-sweet-name-${index}`}
                    label="Sweet Name"
                    variant="outlined"
                    value={sweet.sweetname}
                    onChange={(e) =>
                      setNewSweetFields((prevState) => {
                        const newState = [...prevState];
                        newState[index].sweetname = e.target.value;
                        return newState;
                      })
                    }
                    fullWidth
                  />
                  <TextField
                    id={`new-sweet-quantity-${index}`}
                    label="Sweet Quantity"
                    variant="outlined"
                    value={sweet.sweetquantity}
                    onChange={(e) =>
                      setNewSweetFields((prevState) => {
                        const newState = [...prevState];
                        newState[index].sweetquantity = e.target.value;
                        return newState;
                      })
                    }
                    fullWidth
                  />
                  <TextField
                    id={`new-sweet-gram-${index}`}
                    label="Sweet Gram"
                    variant="outlined"
                    value={sweet.sweetgram}
                    onChange={(e) =>
                      setNewSweetFields((prevState) => {
                        const newState = [...prevState];
                        newState[index].sweetgram = e.target.value;
                        return newState;
                      })
                    }
                    fullWidth
                  />
                </Box>
              </div>
            ))}
            <ButtonGroup
              disableElevation
              variant="contained"
              aria-label="Add sweet button group"
              sx={{ mt: 2 }}
            >
              <Button onClick={handleCreateNewMenu}>Add Sweet Box</Button>
              <Button onClick={() => setShowNewMenuForm(false)}>Cancel</Button>
            </ButtonGroup>
          </div>
        )}
      </div>
    </div>
  );
};

export default SweetBoxes;