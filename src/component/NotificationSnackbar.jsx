import { Alert, Slide, Snackbar } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import { useStateContext } from '../hooks/useStateContext'

function NotificationSnackbar() {
    const {notify,showNotify, notifyError,
        showNotifyError}=useStateContext()
  return (
    <Box >
        {notify !== "" && (
        <Snackbar
          open={notify === "" ? false : true}
          autoHideDuration={6000}
          TransitionComponent={(e) => <Slide {...e} direction="up" />}
          onClose={() => showNotify("")}
        >
          <Alert
            sx={{
              width: { xs: window.innerWidth, md: window.innerWidth * 0.5 },
            }}
            severity="success"
          >
            {notify}
          </Alert>
        </Snackbar>
      )}
      {notifyError !== "" && (
        <Snackbar
          open={notifyError === "" ? false : true}
          autoHideDuration={6000}
          TransitionComponent={(e) => <Slide {...e} direction="up" />}
          onClose={() => showNotifyError("")}
        >
          <Alert
            sx={{
              width: { xs: window.innerWidth, md: window.innerWidth * 0.5 },
            }}
            severity="error"
          >
            {notifyError}
          </Alert>
        </Snackbar>
      )}</Box>
  )
}

export default NotificationSnackbar