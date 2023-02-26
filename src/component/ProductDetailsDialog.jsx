import React from "react";
import IconButton from "@mui/material/IconButton";
import InfoIcon from "@mui/icons-material/Info";
import { BASE_URL } from "../api";
import { Tooltip, Typography } from "@mui/material";
import { useStateContext } from "../hooks/useStateContext";
import Slide from "@mui/material/Slide";
import CardMedia from "@mui/material/CardMedia";
import Dialog from "@mui/material/Dialog";
import { useState } from "react";
import Box from "@mui/material/Box";
import Grow from "@mui/material/Grow";

function ProductDialog({ Product }) {
  const { dialog, showDialog } = useStateContext();

  const [details, showDetails] = useState(true);

  return (
    <>
      <Dialog
        maxWidth="true"
        sx={{
          letterSpacing: "0.19em",
          fontWeight: 550,
        }}
        onClose={() => {
          showDialog(false);
        }}
        open={dialog}
      >
        <>
          {/* Mobile */}
          <Box
            sx={{
              maxWidth: "999px",
              display: { xs: "flex", md: "none" },
              flexDirection: "column",
            }}
          >
            <CardMedia
              component="img"
              width="443"
              image={BASE_URL+ Product.image}
              alt="Product image"
            />

            <Slide in={details} direction="up" mountOnEnter unmountOnExit>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  //   , backgroundColor:"#121212bd"

                  p: "12px",
                  justifyContent: "space-between",
                }}
              >
                <Grow
                  in={details}
                  style={{ transformOrigin: "0 0 0" }}
                  {...(details ? { timeout: 1000 } : {})}
                >
                  <span>Product Name : {Product.name}</span>
                </Grow>
                {/* Conditionally applies the timeout prop to change the entry speed.  */}
                <Grow
                  in={details}
                  style={{ transformOrigin: "0 0 0" }}
                  {...(details ? { timeout: 1500 } : {})}
                >
                  <Typography>
                    <span>Category : {Product.category}</span>
                    <br />
                    <span>Price : {Product.price} SYP</span>
                    <br />
                    <span>Count : {Product.count} Pieces</span>
                    <br />
                    <span>Available : {Product.avialable ? "Yes" : "No"}</span>
                    <br />
                    <span>Details : {Product.details}</span>
                    <br />
                  </Typography>
                </Grow>
              </Box>
            </Slide>
          </Box>

          {/* Desktop */}
          <Box
            sx={{
              maxWidth: "999px",
              display: { xs: "none", md: "flex" },
              flexDirection: "row",
            }}
          >
            <CardMedia
              component="img"
              height="543"
              image={BASE_URL + Product.image}
              alt="Product image"
            />

            <Slide in={details} direction="left" mountOnEnter unmountOnExit>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  //   , backgroundColor:"#121212bd"

                  width: "444px",
                  p: "12px",
                }}
              >
                <Grow
                  in={details}
                  style={{ transformOrigin: "0 0 0" }}
                  {...(details ? { timeout: 1000 } : {})}
                >
                  <span><h4>Product Name :   {Product.name}</h4></span>
                </Grow>
                {/* Conditionally applies the timeout prop to change the entry speed.  */}
                <Grow
                  in={details}
                  style={{ transformOrigin: "0 0 0" }}
                  {...(details ? { timeout: 1500 } : {})}
                >
                  <Typography>
                    <span><h4>Category : {Product.category}</h4></span>
                    
                    <span><h4>Price : {Product.price} SYP</h4></span>
                    
                    <span><h4>Count : {Product.count} Pieces</h4></span>
                    
                    <span><h4>Available : {Product.avialable ? "Yes" : "No"}</h4></span>
                  
                    <span><h4>Details : {Product.details}</h4></span>
                    
                  </Typography>
                </Grow>
              </Box>
            </Slide>
          </Box>
        </>
      </Dialog>

      {/* navigation */}
      <Box
        sx={{
          display: "flex",
          transform: "translateZ(0px)",
          flexGrow: 1,
          flexDirection: "row",
          position: "fixed",
          bottom: { md: "5%", xs: "88%" },
          zIndex: "9999",
          width: "100%",
          justifyContent: "center",
        }}
      >
        <Tooltip title="show Datails" placement="bottom">
          <IconButton onClick={() => showDetails(!details)}>
            <InfoIcon sx={{ fontSize: 35 }} />
          </IconButton>
        </Tooltip>
      </Box>
    </>
  );
}

export default ProductDialog;
