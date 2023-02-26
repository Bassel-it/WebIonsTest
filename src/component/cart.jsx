import { ClearOutlined } from "@mui/icons-material";
import {
  Avatar,
  Box,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Slide,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import React from "react";
import { useStateContext } from "../hooks/useStateContext";
import { BASE_URL } from "../api";
import Counter from "./Counter";

function Cart(props) {
  //redux
  const { cart, removeFromCart} = props;
  //Hooks
  const { showCart, totalPay, setTotalPay,count } = useStateContext();


  return (
    <Slide in={showCart} direction="right">
      <Box
        sx={{
          position: "fixed",
          width: { xs: "100%", md: "50%" },
          height: "100%",
          backgroundColor: "rgb(5, 30, 52)",
          zIndex: 99,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <List>
          
          {cart.length !== 0  ? (
            cart.map((p, index) => (
              <MenuItem divider key={index}>
                <Stack width="100%" direction="row">
                  <ListItemAvatar>
                    <Avatar
                      sx={{ width:{ md:175,xs:75}, height:{ md:175,xs:75}, mr: 2 }}
                      alt={`${p.productId}`}
                      variant="square"
                      src={BASE_URL + p.image}
                    />
                  </ListItemAvatar>
                  <Stack direction="column">
                    <ListItemText
                      primary={p.name}
                      secondary={
                        <React.Fragment>
                          <Typography
                            sx={{ display: "inline" }}
                            component="span"
                            variant="body2"
                            color="text.primary"
                          >
                            {p.category}
                            <br />
                             Price:{p.price}
                            <br />
                          الكمية المتوفرة : {p.count}
                          </Typography>
                          {p.details}
                        </React.Fragment>
                      }
                    />
                    {/* products counter component */}
                    <Counter product={p} index={index}/>
                    {/* end poducts counter */}
                  </Stack>
                </Stack>
                <ListItemIcon
                  children={
                    <Tooltip arrow placement="right" title="remove from cart">
                      <IconButton
                        onClick={() => {
                          removeFromCart(p.productId);
                          setTotalPay((prev) => prev - p.price*count[index]);
                          count.splice(index,1)
                        }}
                        edge="end"
                      >
                        <ClearOutlined />
                      </IconButton>
                    </Tooltip>
                  }
                />
              </MenuItem>
            ))
          ) : (
            <ListItem alignItems="center">
              <ListItemText primary="لم تقم بإضافة منتجات جديدة...!" />
            </ListItem>
          )}
        </List>
        <Typography
          sx={{
            position: "fixed",
            width: "100%",
            bottom: 0,
            backgroundColor: "rgb(5, 30, 52)",
            borderColor: "white",
          }}
        >
          Total Payment : {totalPay}
        </Typography>
      </Box>
    </Slide>
  );
}

export default Cart;
