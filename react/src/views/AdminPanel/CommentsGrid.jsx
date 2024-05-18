import React from 'react';
import axiosClient from '../../axios-client';
import EnhancedTable from '../../components/EnhancedTable';
import {Box, Button } from '@mui/material'
import { commentGridData } from '../../data/adminGridTables';
import { useDispatch} from 'react-redux';
import { setNotification } from '../../store';

export default function CommentsGrid(props) {
   const [rows, setRows] = React.useState([]);
   const dispatch = useDispatch()

   const setData = (data) => {
    setRows([
      ...rows,
      data
    ]);
   }

   const handleDataDelete = (id) => {
    axiosClient.delete(`/comment/${id}`)
     .then(() => { 
      dispatch(setNotification(`Comment ${id} was successfully deleted`));
     })
     .catch(() => {
     })

     fetchData();
   }

   React.useEffect(()=>{
    console.log(props.post.comments)
      setRows(props.post.comments)
   },[])
   
   return (
     <Box display="grid" 
     alignItems="center" 
     justifyContent="center"
     >
       {rows.length > 0 
       ? <Box display="grid" gap="1rem">
           <EnhancedTable data={commentGridData} rows={rows} handleDataDelete={handleDataDelete}/>
         </Box>
       : <Box>No comments yet...</Box>
       }
     </Box>
   )
}
