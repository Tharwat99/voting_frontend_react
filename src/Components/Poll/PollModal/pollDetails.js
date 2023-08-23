import React, { useState }  from 'react';
import axios from 'axios';
import { Button, Card, CardContent, CircularProgress, FormControlLabel, Radio, RadioGroup, TextField, Typography } from '@mui/material';

export function PollDetails({poll, setRenderedComponent, setOpen, setVote, setErrMsg}) {
  const [loading, setLoading] = useState(false);
  const [radioValue, setRadioValue] = useState('');
  const [voterEmail, setVoterEmail] = useState('');
  const handleClose= () => setOpen(false);  
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!voterEmail.includes('@')) {
      setErrMsg('Please enter a valid email address');
      return;
    }
    setLoading(true)
    try {
        const vot_data = {
          voter: voterEmail,
          poll: poll.id,
          choice:radioValue.id
        }
        const response = await axios.post(`http://127.0.0.1:8000/voter/create-vote/`, vot_data);
        setVote(response.data)
        setRenderedComponent('otp')
      }
      catch (error) {
        if (error.response.status === 400){
          let error_msg = '';
          if (error?.response?.data?.hasOwnProperty('non_field_errors')){
            setErrMsg("Sorry, you voted this poll before.");
          }else{
            for (let key in error?.response?.data) {
              if (error?.response?.data?.hasOwnProperty(key)) {
                error_msg += key + ":";
                error_msg += error.response.data[key][0]
              }
            }
            setErrMsg(error_msg);
          }
          
        }else{
          setErrMsg('An error occurred while voting poll.');
        }
        
    }
    setLoading(false)
  }
  return (
    <Card sx={{ maxWidth: 500, margin: '0 auto', marginTop: 5 }}>
        <CardContent>
            <Typography variant="h6" component="div" sx={{marginBottom:"0.3rem" }}>
            {poll.title}
            </Typography>
            <form onSubmit={(e)=>handleSubmit(e)} >    
              <TextField size = "small"  id="voter" label="Email" variant="outlined" sx={{width:"100%", margin:"8px 0"}}
              value={voterEmail} onChange={(e)=>{
                setVoterEmail(e.target.value)
              }}
              required
              />
              <RadioGroup sx = {{marginBottom:"5px"}}>
              {poll.choices.map((choice) => (
              <FormControlLabel
                  key={choice.id}
                  value={choice.choice_text}
                  label={choice.choice_text}
                  control={<Radio disabled={poll.is_expired} checked = {radioValue === choice} onChange={() => {setRadioValue(choice)}}/>}
                  required
              />
              ))}
            </RadioGroup>
          <div style={{ textAlign: 'center', display: 'flex', flexWrap:'wrap', justifyContent:"space-between"}}>
            
            <Button variant="contained" type = 'submit' sx={{marginRight:"1rem"}} disabled={loading}>
            {loading ? <CircularProgress sx={{width:"25px !important", height:"25px !important", color:"#FFF"}}/> : "Vote"}
            </Button>
            <Button variant="contained" color = "error" onClick={handleClose}>Cancel</Button>
          </div>
          </form>
        </CardContent>
    </Card>
    
  );
}