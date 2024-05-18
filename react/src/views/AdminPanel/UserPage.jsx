import React from 'react'
import {data} from '../../data/userPageTabs'
import PageTabs from '../../components/PageTabs';
import { useParams } from 'react-router-dom';
import {useNavigate} from 'react-router-dom'
import {Box, CircularProgress, useMediaQuery} from '@mui/material';
import axiosClient from '../../axios-client';
import { setNotification } from '../../store';
import {useDispatch} from 'react-redux';

export default function UserPage() {
  const [user, setUser] = React.useState(null);
  const [isEditMode, setIsEditMode] = React.useState(false)
  let { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  React.useEffect(()=>{
    axiosClient.get(`/user/${id}`)
    .then(({ data }) => { 
      setUser(data);
    })
    .catch(() => {
      dispatch(setNotification('User not found'))
      navigate('/adminpanel/users');
    })
  },[])
  
  return (
    <Box 
    >
      {user 
      ? <PageTabs data={data} user={user}/> 
      : <CircularProgress/>
      }
    </Box>
  )
}
