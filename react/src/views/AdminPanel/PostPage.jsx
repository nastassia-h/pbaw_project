import React from 'react'
import {data} from '../../data/postPageTabs'
import PageTabs from '../../components/PageTabs';
import { useParams } from 'react-router-dom';
import {Box, CircularProgress, useMediaQuery} from '@mui/material';
import axiosClient from '../../axios-client';
import { setNotification } from '../../store';
import {useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';

export default function PostPage() {
  const [post, setPost] = React.useState(null);
  let { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  React.useEffect(()=>{
    axiosClient.get(`/post/${id}`)
    .then(({ data }) => { 
      setPost(data);
    })
    .catch(() => {
      dispatch(setNotification('Post not found'))
      navigate('/adminpanel/posts');
    })
  },[])
  
  return (
    <Box 
    >
      {post 
      ? <PageTabs data={data} post={post}/> 
      : <CircularProgress/>
      }
    </Box>
  )
}
