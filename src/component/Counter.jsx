import { IconButton, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import React from 'react'
import { useStateContext } from '../hooks/useStateContext'
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";


function Counter({product,index}) {
    const { setTotalPay,count,setCount,showNotifyError } = useStateContext();

  return (
    <Stack direction="row">
                      <IconButton
                        onClick={() =>{
                          if(count[index]!==0){
                         setCount( count.fill(count[index]-1,index,index+1))
                         setTotalPay(prev=>prev-product.price)
                          }}
                        }
                      >
                        <RemoveIcon />
                      </IconButton>
                      <Typography
                        sx={{
                          backgroundColor: "rgb(102, 157, 246)",
                          p: "0px 20px",
                          borderRadius: "15%",
                        }}
                        variant="h5"
                      >
                        {count[index]}
                      </Typography>
                      <IconButton
                      onClick={() =>{
                        if(count[index]<product.count){
                       setCount( count.fill(count[index]+1,index,index+1));
                       setTotalPay(prev=>prev+product.price)
                        }else showNotifyError("لا يوجد كمية إضافية")}
                      }
                      >
                        <AddIcon />
                      </IconButton>
                    </Stack>
  )
}

export default Counter