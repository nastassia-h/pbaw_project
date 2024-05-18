import React from 'react';
import axiosClient from '../../axios-client';
import EnhancedTable from '../../components/EnhancedTable';
import {Box, CircularProgress} from '@mui/material'
import { postGridData } from '../../data/adminGridTables';
import { useDispatch} from 'react-redux';
import { setNotification } from '../../store';


export default function PostsGrid(props) {
   const {user} = props
   const [rows, setRows] = React.useState([]);
   const [isLoaded, setIsLoaded] = React.useState(false);
   const dispatch = useDispatch()

   const setData = (data) => {
    setRows([
      ...rows,
      data
    ]);
   }

   const fetchData = () => {
    axiosClient.get(user?.id ? `/posts/${user.id}` : `/post`)
     .then(({ data }) => { 
        setRows([...data.data]);
        setIsLoaded(true)
     })
     .catch(() => {
      setIsLoaded(true)
     })
   }

   const handleDataDelete = (id) => {
    axiosClient.delete(`/post/${id}`)
     .then(() => { 
      dispatch(setNotification(`Post ${id} was successfully deleted`));
     })
     .catch(() => {
     })

     fetchData();
   }

   React.useEffect(()=>{
    fetchData();
    },[])
   
   return (
     <Box 
       display="grid" 
       alignItems="center" 
       justifyContent="center"
     >
       {rows.length > 0 
       ? <EnhancedTable data={postGridData} rows={rows} handleDataDelete={handleDataDelete}/>
       : (!isLoaded ? <CircularProgress/> : <Box>No posts yet...</Box>)
       }
     </Box>
   )
}
