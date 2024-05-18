import React from 'react';
import axiosClient from '../../axios-client';
import EnhancedTable from '../../components/EnhancedTable';
import {Box, CircularProgress, Button } from '@mui/material'
import { userGridData } from '../../data/adminGridTables';
import { useDispatch } from 'react-redux';
import { setNotification } from '../../store';
import UserForm from '../widgets/AdminPanel/UserForm';

export default function UsersGrid() {
   const [rows, setRows] = React.useState([]);
   const [isFormOpen, setIsFormOpen] = React.useState(false);
   const [isLoaded, setIsLoaded] = React.useState(false);
   const dispatch = useDispatch();

   const setData = (data) => {
    setRows([
      ...rows,
      data
    ]);
    setIsFormOpen(false);
   }

   const fetchData = () => {
    axiosClient.get(`/user`)
     .then(({ data }) => { 
        setRows([...data]);
        setIsLoaded(true);
     })
     .catch(() => {
        setIsLoaded(true);
     })
   }

   const handleDataDelete = (id) => {
    axiosClient.delete(`/user/${id}`)
     .then(() => { 
       dispatch(setNotification(`User ${id} was successfully deleted`));
     })
     .catch(() => {
     })

     fetchData();
   }

   React.useEffect(()=>{
     fetchData();
   },[])
   
   return (
     <Box display="grid" 
     alignItems="center" 
     justifyContent="center"
     >
       {rows.length > 0 
       ? <Box display="grid" gap="1rem" >
          <Box>
            {isFormOpen 
            ? <Button color='error' variant='outlined' onClick={()=>setIsFormOpen(!isFormOpen)}>Back</Button>
            : <Button onClick={()=>setIsFormOpen(!isFormOpen)}>Create New User</Button>}
          </Box>
          {isFormOpen 
          ? <Box>
              <UserForm type="create" setData={setData}/>
            </Box>
          : <EnhancedTable data={userGridData} rows={rows} handleDataDelete={handleDataDelete}/>}
        </Box>
       : (!isLoaded ? <CircularProgress/> : <Box>No posts yet...</Box>)
       }
     </Box>
   )
}
