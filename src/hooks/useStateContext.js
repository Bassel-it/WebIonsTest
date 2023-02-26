import React, { createContext, useContext, useState } from 'react';

const StateContext = createContext();




export const ContextProvider = ({ children }) => {

    const [loggedin,setLoggedin]=useState(localStorage.getItem('wasLoggedin')==='true'?true:false)
    const [user,setUser]=useState(
      localStorage.getItem('user')!=null?
      JSON.parse(localStorage.getItem('user')):{email:"",password:""})
    const [dialog, showDialog ] = useState(false);
    const [showCart,setShowCart]=useState(false)
    const [totalPay,setTotalPay]=useState(0);
    const [count,setCount]=useState([]);
    const [notify,showNotify]=useState('');
    const [notifyError,showNotifyError]=useState('');
    

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <StateContext.Provider value={{
      loggedin,setLoggedin ,user,setUser,notify,showNotify, notifyError,
      showNotifyError ,dialog, showDialog,showCart,setShowCart,
      totalPay,setTotalPay,count,setCount
    }}>
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
