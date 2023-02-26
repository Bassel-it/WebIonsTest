import * as React from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import ListSubheader from "@mui/material/ListSubheader";
import IconButton from "@mui/material/IconButton";
import InfoIcon from "@mui/icons-material/Info";
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import ProductionQuantityLimitsOutlinedIcon from '@mui/icons-material/ProductionQuantityLimitsOutlined';
import { BASE_URL, createAPIEndpoint } from "../api";
import { Badge, Tooltip } from "@mui/material";
import { useStateContext } from "../hooks/useStateContext";
import { useState } from "react";
import defaultProductImage from "../Images/defaultProductImage.png";
import ProductDialog from "./ProductDetailsDialog";
import Cart from "../container/cartContainer";
import LoginSwitch from "./LoginSwitch";

export default function Product(props) {
  const { addToCart,cart } = props;
  const [products, setProducts] = useState([]);
  const [product, showProduct] = useState({});
  const { dialog, showDialog, setShowCart, setTotalPay,count,setCount,showNotifyError} = useStateContext();

  React.useLayoutEffect(() => {
    createAPIEndpoint("Product")
      .fetch()
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      {dialog && product !== {} && <ProductDialog Product={product} />}
<LoginSwitch/>
<Cart />


      <ImageList sx={{ width: "100%", height: "100%" ,mt:0}}>
        <ImageListItem key="Subheader" cols={2}>
          <ListSubheader component="div">Products</ListSubheader>
        </ImageListItem>
        {products.length !== 0 &&
          products.map((item, index) => (
            <ImageListItem key={index}>
              {item.image === "" ? (
                <img
                  style={{ borderRadius: "12px" }}
                  src={defaultProductImage}
                  srcSet={`${
                    BASE_URL + item.image
                  }?w=248&fit=crop&auto=format&dpr=2 2x`}
                  alt={item.name}
                  loading="lazy"
                />
              ) : (
                <img
                  style={{ borderRadius: "12px" }}
                  src={`${BASE_URL + item.image}?w=248&fit=crop&auto=format`}
                  srcSet={`${
                    BASE_URL + item.image
                  }?w=248&fit=crop&auto=format&dpr=2 2x`}
                  alt={item.name}
                  loading="lazy"
                />
              )}
              <ImageListItemBar
                position="top"
                sx={{
                  borderRadius: "12px",
                  background:
                    "linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, " +
                    "rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)",
                }}
                title={item.name}
                subtitle={item.price + " S.Y.P"}
              />
              <ImageListItemBar
                sx={{
                  borderRadius: "12px",
                  background:
                    "linear-gradient(to top, rgba(0,0,0,0.7) 0%, " +
                    "rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)",
                }}
                // subtitle={item.details}
                actionIcon={
                  <div>
                    {item.available?(
                      <Tooltip title="Add to Cart">
                        <IconButton
                          sx={{ color: "rgba(255, 255, 255, 0.54)" }}
                          onClick={() => {
                            if(cart.find(x=>x.productId===item.productId))
                            showNotifyError("المنتج موجود مسبقا في سلة المشتريات"); else{
                            setTotalPay(prev=>prev+item.price)
                            setCount([...count,1])
                            addToCart(item);}
                          }}
                        >
                          <AddShoppingCartIcon />
                        </IconButton>
                      </Tooltip>):(
                      <Tooltip title="Not available">
                        <IconButton
                          sx={{ color: "rgba(255, 255, 255, 0.54)" }}
                          onClick={() => {
                            
                            showNotifyError("المنتج غير متوفر حالياً"); 
                           
                          }}
                        >
                          <ProductionQuantityLimitsOutlinedIcon sx={{color:"red"}} />
                        </IconButton>
                      </Tooltip>)
                    }

                    <Tooltip title="details">
                      <IconButton
                        sx={{ color: "rgba(255, 255, 255, 0.54)" }}
                        onClick={() => {
                          showProduct(item);
                          showDialog(true);
                        }}
                      >
                        <InfoIcon />
                      </IconButton>
                    </Tooltip>
                  </div>
                }
              />
            </ImageListItem>
          ))}
      </ImageList>

      <Tooltip title="Shopping Cart">
        <IconButton
          sx={{
            color: "rgba(255, 255, 255, 0.54)",
            position: "fixed",
            zIndex: 100,
            right: "7%",
            bottom: "7%",
          }}
          onClick={() => {
            setShowCart((prev) => !prev);
          }}
        >
          <Badge badgeContent={cart.length} color="warning">
          <ShoppingCartOutlinedIcon sx={{ fontSize: 60 ,color:"cyan"}} />
          </Badge>
        </IconButton>
      </Tooltip>
    </>
  );
}
