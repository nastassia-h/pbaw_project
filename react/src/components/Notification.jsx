import React, { useState } from 'react';
import { Snackbar, SnackbarContent, IconButton } from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import { useSelector, useDispatch } from 'react-redux'
import { setNotification } from '../store';

const Notification = () => {
   const dispatch = useDispatch();
  const message = useSelector(state => state.message)
  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={!!message}
      autoHideDuration={3000} // Adjust as needed
      onClose={()=>dispatch(setNotification(''))}
    >
      <SnackbarContent
        message={message}
        action={
          <IconButton size="small" color="inherit" onClick={()=>dispatch(setNotification(''))}>
            <CloseIcon fontSize="small" />
          </IconButton>
        }
      />
    </Snackbar>
  );
};

export default Notification;
