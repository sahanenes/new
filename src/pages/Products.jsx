import { Box, Button, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DeleteIcon from "@mui/icons-material/Delete";
import UpgradeIcon from "@mui/icons-material/Upgrade";
import VerticalAlignBottomIcon from "@mui/icons-material/VerticalAlignBottom";

import useStockCalls from "../hooks/useStockCalls";
import { arrowStyle, btnHoverStyle, flexCenter } from "../styles/globalStyle";

const Products = () => {
  const { products } = useSelector((state) => state.stock);
  const { getBrands, getCategories, getProducts } = useStockCalls();
  const [open, setOpen] = useState(false);
  const [info, setInfo] = useState({
    name: "",
    phone: "",
    address: "",
    image: "",
  });

  const [sortedProducts, setSortedProducts] = useState(products);

  useEffect(() => {
    setSortedProducts(products);
  }, [products]);

  useEffect(() => {
    getBrands();
    getCategories();
    getProducts();
  }, []);
  const [toggle, setToggle] = useState({
    brand: 1,
    name: 1,
    stock: 1,
  });
  const handleSort = (arg, type) => {
    setToggle({ ...toggle, [arg]: toggle[arg] * -1 });
    setSortedProducts(
      sortedProducts
        ?.map((item) => item)
        .sort((a, b) => {
          if (type === "date") {
            return toggle[arg] * (new Date(a[arg]) - new Date(b[arg]));
          } else if (type === "number") {
            return toggle[arg] * (a[arg] - b[arg]);
          } else {
            if (toggle[arg] === 1) {
              return b[arg] > a[arg] ? 1 : b[arg] < a[arg] ? -1 : 0;
            } else {
              return a[arg] > b[arg] ? 1 : a[arg] < b[arg] ? -1 : 0;
            }
          }
        })
    );
  };

  return (
    <Box>
      <Typography variant="h4" color="error" mb={3}>
        Products
      </Typography>
      <Button variant="contained" onClick={() => setOpen(true)}>
        New Product
      </Button>
      {/* <ProductModal open={open} setOpen={setOpen} info={info} setInfo={setInfo} /> */}
      {sortedProducts?.length > 0 && (
        <TableContainer component={Paper} sx={{ mt: 3 }} elevation={10}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">*</TableCell>
                <TableCell align="center">Categories</TableCell>
                <TableCell align="center">
                  <Box
                    sx={arrowStyle}
                    onClick={() => handleSort("brand", "text")}
                  >
                    <div>Brand</div>
                    {toggle.brand === 1 && <UpgradeIcon />}
                    {toggle.brand !== 1 && <VerticalAlignBottomIcon />}
                  </Box>
                </TableCell>
                <TableCell align="center">
                  <Box
                    sx={arrowStyle}
                    onClick={() => handleSort("name", "text")}
                  >
                    <div>Name</div>
                    {toggle.name === 1 && <UpgradeIcon />}
                    {toggle.name !== 1 && <VerticalAlignBottomIcon />}
                  </Box>
                </TableCell>
                <TableCell align="center">
                  <Box
                    sx={arrowStyle}
                    onClick={() => handleSort("stock", "number")}
                  >
                    <div>Stock</div>
                    {toggle.stock === 1 && <UpgradeIcon />}
                    {toggle.stock !== 1 && <VerticalAlignBottomIcon />}
                  </Box>
                </TableCell>
                <TableCell align="center">Operation</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedProducts.map((product, index) => (
                <TableRow
                  key={product.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="center" component="th" scope="row">
                    {index + 1}
                  </TableCell>
                  <TableCell align="center">{product.category}</TableCell>
                  <TableCell align="center">{product.brand}</TableCell>
                  <TableCell align="center">{product.name}</TableCell>
                  <TableCell align="center">{product.stock}</TableCell>
                  <TableCell align="center">
                    <DeleteIcon sx={btnHoverStyle} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

export default Products;
