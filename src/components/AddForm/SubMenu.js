// import React from 'react';
// import {
//   TextField,
//   Select,
//   MenuItem,
//   InputLabel,
//   FormControl,
//   Grid,
//   IconButton,
// } from '@mui/material';
// import { RemoveCircleOutline } from '@mui/icons-material';

// const SubMenu = ({
//   index,
//   formData,
//   handleChange,
//   handleSweetChange,
//   handleRemoveSweetField,
// }) => {
//   const {
//     boxquantity = '',
//     sweetweight = '',
//     cusweetweight = '',
//     boxtype = '',
//     cuboxtype = '',
//     sweet = [],
//   } = formData || {};

//   return (
//     <>
//       <Grid item xs={12} sm={6}>
//         <TextField
//           fullWidth
//           type="number"
//           name="boxquantity"
//           value={boxquantity}
//           onChange={handleChange}
//           label="Box Quantity"
//           required
//         />
//       </Grid>
//       <Grid item xs={12} sm={6}>
//         <FormControl fullWidth>
//           <InputLabel id="sweetweight-label">Sweet Weight</InputLabel>
//           <Select
//             labelId="sweetweight-label"
//             id="sweetweight"
//             name="sweetweight"
//             value={sweetweight}
//             onChange={handleChange}
//             label="Sweet Weight"
//             required
//           >
//             <MenuItem value="1kg">1kg</MenuItem>
//             <MenuItem value="500gm">500gm</MenuItem>
//             <MenuItem value="250gm">250gm</MenuItem>
//             <MenuItem value="customWeight">Custom Weight</MenuItem>
//           </Select>
//           {sweetweight === 'customWeight' && (
//             <TextField
//               fullWidth
//               id="cusweetweight"
//               name="cusweetweight"
//               value={cusweetweight}
//               onChange={handleChange}
//               label="Custom Sweet Weight"
//               required
//             />
//           )}
//         </FormControl>
//       </Grid>
//       <Grid item xs={12} sm={6}>
//         <FormControl fullWidth>
//           <InputLabel id="boxtype-label">Menu Type</InputLabel>
//           <Select
//             labelId="boxtype-label"
//             id="boxtype"
//             name="boxtype"
//             value={boxtype}
//             onChange={handleChange}
//             label="Menu Type"
//             required
//           >
//             <MenuItem value="">Select Menu Type</MenuItem>
//             <MenuItem value="Marvelous Menu">Marvelous Menu</MenuItem>
//             <MenuItem value="VIP Menu">VIP Menu</MenuItem>
//             <MenuItem value="Luxury Menu">Luxury Menu</MenuItem>
//             <MenuItem value="Dry Fruit Delight">Dry Fruit Delight</MenuItem>
//             <MenuItem value="customEntry">Custom Entry</MenuItem>
//           </Select>
//           {boxtype === 'customEntry' && (
//             <TextField
//               fullWidth
//               id="cuboxtype"
//               name="cuboxtype"
//               value={cuboxtype}
//               onChange={handleChange}
//               label="Custom Menu Type"
//               required
//             />
//           )}
//         </FormControl>
//       </Grid>
//       {sweet.map((sweetItem, sweetIndex) => (
//         <React.Fragment key={sweetIndex}>
//           <Grid item xs={12} sm={4}>
//             <TextField
//               fullWidth
//               type="text"
//               name={`sweetname-${sweetIndex}`}
//               value={sweetItem.sweetname}
//               onChange={(e) =>
//                 handleSweetChange(index, sweetIndex, 'weetname', e.target.value)
//               }
//               label={`Sweet Name ${sweetIndex + 1}`}
//               required
//             />
//           </Grid>
//           <Grid item xs={12} sm={4}>
//             <TextField
//               fullWidth
//               type="text"
//               name={`sweetgram-${sweetIndex}`}
//               value={sweetItem.sweetgram}
//               onChange={(e) =>
//                 handleSweetChange(index, sweetIndex, 'weetgram', e.target.value)
//               }
//               label={`Sweet Gram ${sweetIndex + 1}`}
//               required
//             />
//           </Grid>
//           <Grid item xs={12} sm={3}>
//             <TextField
//               fullWidth
//               type="number"
//               name={`sweetquantity-${sweetIndex}`}
//               value={sweetItem.sweetquantity}
//               onChange={(e) =>
//                 handleSweetChange(index, sweetIndex, 'weetquantity', e.target.value)
//               }
//               label={`Sweet Quantity ${sweetIndex + 1}`}
//               required
//             />
//           </Grid>
//           <Grid item xs={12} sm={1}>
//             <IconButton
//               aria-label="remove"
//               color="secondary"
//               onClick={() => handleRemoveSweetField(index, sweetIndex)}
//             >
//               <RemoveCircleOutline />
//             </IconButton>
//           </Grid>
//         </React.Fragment>
//       ))}
//     </>
//   );
// };

// export default SubMenu;