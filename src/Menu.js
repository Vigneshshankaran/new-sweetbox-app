// import React, { useState, useEffect } from "react";
// import Box from "@mui/material/Box";
// import TextField from "@mui/material/TextField";
// import ButtonGroup from "@mui/material/ButtonGroup";
// import Button from "@mui/material/Button";
// import Grid from "@mui/material/Grid";
// import IconButton from "@mui/material/IconButton";
// import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
// import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";

// const Menu = () => {
//   const [menus, setMenus] = useState([
//     {
//       name: "Marvelous",
//       items: [
//         { name: "Almond Mysorebagu", kg1: 50, kg05: 50, kg025: 50 },
//         { name: "Ghee Mysorebagh", kg1: 50, kg05: "", kg025: "nil" },
//         { name: "Almond Mart", kg1: 80, kg05: 40, kg025: 40 },
//         { name: "Almond bowl", kg1: 80, kg05: 40, kg025: "nil" },
//         { name: "Ghee Laddu", kg1: 80, kg05: 40, kg025: "nil" },
//         { name: "chota burpees", kg1: 80, kg05: 40, kg025: 40 },
//         { name: "Nagpur Zone", kg1: 50, kg05: "", kg025: "nil" },
//         { name: "Bombay Alva", kg1: 50, kg05: "nil", kg025: 50 },
//         { name: "Milk Burpee", kg1: 70, kg05: 35, kg025: "nil" },
//         { name: "Goa Puri", kg1: 50, kg05: "", kg025: "nil" },
//         { name: "Horlicks Burpee", kg1: 70, kg05: 70, kg025: 35 },
//         { name: "Chaco Chip Zone", kg1: 80, kg05: 40, kg025: 40 },
//         { name: "Special Milk Cake", kg1: 50, kg05: 50, kg025: "nil" },
//         { name: "Balaji Laddu", kg1: 40, kg05: "", kg025: "nil" },
//         { name: "Milk fig roll", kg1: 60, kg05: 40, kg025: "nil" },
//         { name: "Parichai Alva", kg1: 50, kg05: 50, kg025: "nil" },
//       ],
//     },
//     {
//       name: "VIP",
//       items: [
//         { name: "Almond Mysorebagu", kg1: 50, kg05: "", kg025: "nil" },
//         { name: "Milk Mysorebagu", kg1: 50, kg05: 50, kg025: "nil" },
//         { name: "Khaji Plover", kg1: 40, kg05: 40, kg025: 40 },
//         { name: "Ghee Laddu", kg1: 40, kg05: 40, kg025: 40 },
//         { name: "Fig King", kg1: 60, kg05: 30, kg025: "nil" },
//         { name: "Mawa Bite", kg1: 40, kg05: "", kg025: "nil" },
//         { name: "Bombay Alva", kg1: 50, kg05: "nil", kg025: "nil" },
//         { name: "Dry Fruit Alva", kg1: 50, kg05: 50, kg025: "nil" },
//         { name: "Nagpur Sonpapti", kg1: 50, kg05: "", kg025: "nil" },
//         { name: "Carrot Sonpapti", kg1: 80, kg05: 40, kg025: 40 },
//         { name: "Horlicks Burpee", kg1: 70, kg05: 35, kg025: "nil" },
//         { name: "Milk fig roll", kg1: 80, kg05: 40, kg025: "nil" },
//         { name: "Geer Katham", kg1: 80, kg05: 40, kg025: 40 },
//         { name: "Kaj kathli", kg1: 40, kg05: 20, kg025: 20 },
//         { name: "Kesar Almond Burpee", kg1: 80, kg05: 40, kg025: 40 },
//         { name: "Almond Latte", kg1: 80, kg05: 40, kg025: "nil" },
//         { name: "Chota burpee", kg1: 80, kg05: 40, kg025: 40 },
//       ],
//     },
//     {
//       name: "Luxury",
//       items: [
//         { name: "Anjeer King", kg1: 60, kg05: 60, kg025: 30 },
//         { name: "Khaji Strawberry", kg1: 80, kg05: 40, kg025: "nil" },
//         { name: "Ghazi Katli", kg1: 40, kg05: 40, kg025: 40 },
//         { name: "Mawa Bite", kg1: 40, kg05: 40, kg025: "nil" },
//         { name: "Pistachio Latte", kg1: 80, kg05: "nil", kg025: 40 },
//         { name: "Kajee Rangeela Roll", kg1: 40, kg05: 40, kg025: 20 },
//         { name: "Cashew Mysore", kg1: 100, kg05: 50, kg025: "nil" },
//         { name: "Ghee laddus", kg1: 80, kg05: 40, kg025: "nil" },
//         { name: "Chota burpee", kg1: 80, kg05: 40, kg025: 40 },
//         { name: "Chaco Chip Zone", kg1: 80, kg05: 40, kg025: 40 },
//         { name: "Mango Bite", kg1: 80, kg05: 40, kg025: "nil" },
//         { name: "Almond Burpee", kg1: 70, kg05: 35, kg025: "nil" },
//         { name: "Cashew Alva", kg1: 100, kg05: 50, kg025: 50 },
//         { name: "Rose Dryfruit Burpee", kg1: 80, kg05: "nil", kg025: "nil" },
//       ],
//     },
//     {
//       name: "Dry Fruit Delight",
//       items: [
//         { name: "Horlicks Mysore", kg1: 100, kg05: 50, kg025: "nil" },
//         { name: "Mathura laddu", kg1: 80, kg05: 40, kg025: "nil" },
//         { name: "Dry Fruit Bite", kg1: 80, kg05: 40, kg025: "nil" },
//         { name: "Dry Fruit Alva", kg1: 100, kg05: 50, kg025: 50 },
//         { name: "Kasur Biscuits", kg1: 60, kg05: 30, kg025: 30 },
//         { name: "Besal Almond Alva", kg1: 40, kg05: 20, kg025: "nil" },
//         { name: "The cognate bite", kg1: 80, kg05: 40, kg025: 40 },
//         { name: "Rose Dryfruit Burpee", kg1: 60, kg05: 30, kg025: 30 },
//         { name: "American Chuck Burberry", kg1: 70, kg05: 35, kg025: 35 },
//         { name: "Mango Bite", kg1: 80, kg05: 40, kg025: 40 },
//         { name: "Dry Fruit Weber", kg1: 80, kg05: 40, kg025: 50 },
//         { name: "Pomelo Latte", kg1: 100, kg05: 50, kg025: "nil" },
//         { name: "Cocoa Burpee", kg1: 80, kg05: 40, kg025: "nil" },
//       ],
//     },
//   ]);

//   const [totals, setTotals] = useState([]);

//   // Calculate totals for each menu
//   useEffect(() => {
//     const calculateTotals = () => {
//       const newTotals = menus.map((menu) => ({
//         kg1: menu.items.reduce(
//           (acc, item) => acc + (parseInt(item.kg1) || 0),
//           0
//         ),
//         kg05: menu.items.reduce(
//           (acc, item) => acc + (parseInt(item.kg05) || 0),
//           0
//         ),
//         kg025: menu.items.reduce(
//           (acc, item) => acc + (parseInt(item.kg025) || 0),
//           0
//         ),
//       }));
//       setTotals(newTotals);
//     };
//     calculateTotals();
//   }, [menus]);

//   const addNewMenu = () => {
//     const newMenu = {
//       name: "",
//       items: [{ name: "", kg1: "", kg05: "", kg025: "" }],
//     };
//     setMenus([...menus, newMenu]);
//   };

//   const handleMenuNameChange = (index, value) => {
//     const updatedMenus = [...menus];
//     updatedMenus[index].name = value;
//     setMenus(updatedMenus);
//   };

//   const handleInputChange = (menuIndex, itemIndex, field, value) => {
//     const updatedMenus = [...menus];
//     updatedMenus[menuIndex].items[itemIndex][field] = value;
//     setMenus(updatedMenus);
//   };

//   const handleAddSweetField = (menuIndex) => {
//     const updatedMenus = [...menus];
//     updatedMenus[menuIndex].items.push({
//       name: "",
//       kg1: "",
//       kg05: "",
//       kg025: "",
//     });
//     setMenus(updatedMenus);
//   };

//   const handleRemoveSweetField = (menuIndex, itemIndex) => {
//     const confirmed = window.confirm(
//       "Are you sure you want to remove this sweet field?"
//     );
//     if (confirmed) {
//       const updatedMenus = [...menus];
//       updatedMenus[menuIndex].items.splice(itemIndex, 1);
//       setMenus(updatedMenus);
//     }
//   };

//   const handleRemoveMenu = (menuIndex) => {
//     const confirmed = window.confirm(
//       "Are you sure you want to remove this menu?"
//     );
//     if (confirmed) {
//       const updatedMenus = [...menus];
//       updatedMenus.splice(menuIndex, 1);
//       setMenus(updatedMenus);
//     }
//   };

//   return (
//     <div style={{ margin: "10px" }}>
//       <div>
//         <h1>Sweets Menu</h1>
//       </div>
//       {menus.map((menu, menuIndex) => (
//         <Box key={menuIndex} sx={{ mt: menuIndex > 0 ? 3 : 0 }}>
//           <Box display="flex" alignItems="center">
//             <TextField
//               id={menu-name-${menuIndex}}
//               label="Menu Name"
//               value={menu.name}
//               onChange={(e) => handleMenuNameChange(menuIndex, e.target.value)}
//               fullWidth
//               sx={{ mb: 1, width: "25ch", mr: 1 }}
//             />
//             <IconButton
//               type="button"
//               onClick={() => handleRemoveMenu(menuIndex)}
//               color="secondary"
//               aria-label="remove menu"
//             >
//               <RemoveCircleOutlineIcon />
//             </IconButton>
//           </Box>
//           <Box
//             component="form"
//             sx={{
//               "& .MuiTextField-root": { m: 0.5, width: "25ch" },
//             }}
//           >
//             <Grid container spacing={2}>
//               {menu.items.map((sweet, itemIndex) => (
//                 <Grid item xs={12} key={itemIndex}>
//                   <Box display="flex" alignItems="center">
//                     <TextField
//                       id={sweet-name-${menuIndex}-${itemIndex}}
//                       label="Sweet Name"
//                       value={sweet.name}
//                       onChange={(e) =>
//                         handleInputChange(
//                           menuIndex,
//                           itemIndex,
//                           "name",
//                           e.target.value
//                         )
//                       }
//                       sx={{ mr: 1 }}
//                     />
//                     <TextField
//                       id={sweet-quantity-1kg-${menuIndex}-${itemIndex}}
//                       label="1KG Quantity"
//                       value={sweet.kg1}
//                       onChange={(e) =>
//                         handleInputChange(
//                           menuIndex,
//                           itemIndex,
//                           "kg1",
//                           e.target.value
//                         )
//                       }
//                       sx={{ mr: 1 }}
//                     />
//                     <TextField
//                       id={sweet-quantity-500g-${menuIndex}-${itemIndex}}
//                       label="500g Quantity"
//                       value={sweet.kg05 || "nil"}
//                       onChange={(e) =>
//                         handleInputChange(
//                           menuIndex,
//                           itemIndex,
//                           "kg05",
//                           e.target.value
//                         )
//                       }
//                       sx={{ mr: 1 }}
//                     />
//                     <TextField
//                       id={sweet-quantity-250g-${menuIndex}-${itemIndex}}
//                       label="250g Quantity"
//                       value={sweet.kg025 || "nil"}
//                       onChange={(e) =>
//                         handleInputChange(
//                           menuIndex,
//                           itemIndex,
//                           "kg025",
//                           e.target.value
//                         )
//                       }
//                     />
//                     <IconButton
//                       type="button"
//                       onClick={() =>
//                         handleRemoveSweetField(menuIndex, itemIndex)
//                       }
//                       color="secondary"
//                       aria-label="remove sweet"
//                     >
//                       <RemoveCircleOutlineIcon />
//                     </IconButton>
//                   </Box>
//                 </Grid>
//               ))}
//               <Grid item xs={12} sm={1}>
//                 <IconButton
//                   type="button"
//                   onClick={() => handleAddSweetField(menuIndex)}
//                   color="primary"
//                   aria-label="add sweet"
//                 >
//                   <AddCircleOutlineIcon />
//                 </IconButton>
//               </Grid>
//               <Grid item xs={12}>
//                 <Box display="flex" alignItems="center">
//                   <TextField
//                     required
//                     id="outlined-required"
//                     defaultValue="Total weight"
//                     InputProps={{
//                       readOnly: true,
//                     }}
//                     sx={{ mr: 1 }}
//                   />
//                   <TextField
//                     id={total-1kg-${menuIndex}}
//                     label="Total 1KG"
//                     value={totals[menuIndex]?.kg1 || 0}
//                     InputProps={{
//                       readOnly: true,
//                     }}
//                     sx={{ mr: 1 }}
//                   />
//                   <TextField
//                     id={total-500g-${menuIndex}}
//                     label="Total 500g"
//                     value={totals[menuIndex]?.kg05 || 0}
//                     InputProps={{
//                       readOnly: true,
//                     }}
//                     sx={{ mr: 1 }}
//                   />
//                   <TextField
//                     id={total-250g-${menuIndex}}
//                     label="Total 250g"
//                     value={totals[menuIndex]?.kg025 || 0}
//                     InputProps={{
//                       readOnly: true,
//                     }}
//                   />
//                 </Box>
//               </Grid>
//             </Grid>
//           </Box>
//         </Box>
//       ))}
//       <ButtonGroup
//         disableElevation
//         variant="contained"
//         aria-label="Disabled button group"
//         sx={{ ml: 1, mt: 1 }}
//       >
//         <Button onClick={addNewMenu}>Add New Menu</Button>
//       </ButtonGroup>
//     </div>
//   );
// };

// export default Menu;