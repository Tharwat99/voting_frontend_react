import React, { useState }  from 'react';
import axios from 'axios';
import { Button, Card, CardContent, CircularProgress, TextField } from '@mui/material';


export function ConfirmPollOtp({setRenderedComponent, setOpen, vote, setErrMsg}) {
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState('');
  
  const handleClose= () => setOpen(false);
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
        const response = await axios.put(`http://127.0.0.1:8000/voter/validate-vote-otp/${vote.id}/`, {
          otp: otp
        });
        setRenderedComponent('details');
        handleClose();
      }
      catch (error) {
        if (error.response.status === 400){
          let error_msg = '';
          for (let key in error.response.data) {
            if (error.response.data.hasOwnProperty(key)) {
              error_msg += key + ":";
              error_msg += error.response.data[key][0]
            }
          }
          setErrMsg(error_msg);
        }else{
          setErrMsg('An error occurred while editing employee.');
        }
        
    }
    setLoading(false)
  }
  return (
    <Card sx={{ maxWidth: 500, margin: '0 auto', marginTop: 5 }}>
        <CardContent>
          <form onSubmit={(e)=>handleSubmit(e)} >    
            <h2 style = {{marginTop:'0', textAlign:'center'}} >Confirm Vote</h2>
            <TextField size = "small"  id="voter" label="Type received OTP" variant="outlined" sx={{width:"100%", margin:"8px 0"}} value={otp} onChange={(e)=>{
              setOtp(e.target.value)
            }}/>
            <div style={{ textAlign: 'center', display: 'flex', flexWrap:'wrap', justifyContent:"space-between"}}>
          
              <Button variant="contained" type = 'submit' sx={{marginRight:"1rem"}} disabled={loading}>
              {loading ? <CircularProgress sx={{width:"25px !important", height:"25px !important", color:"#FFF"}}/> : "Confirm"}
              </Button>
              <Button variant="contained" color = "error" onClick={handleClose}>Cancel</Button>
            </div>
          </form>
        </CardContent>
    </Card>
  );
}