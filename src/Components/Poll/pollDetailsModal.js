import React, { useEffect, useState }  from 'react';
import axios from 'axios';
import Modal from '@mui/material/Modal';
import { Button, Card, CardContent, CircularProgress, FormControlLabel, Radio, RadioGroup, TextField, Typography } from '@mui/material';
import { Snackbar } from '@mui/material';

const style = {
    position: 'absolute',
    top: '10vh',
    left: '50%',
    transform: 'translate(-50%, 0)',
    minWidth: 400,
    overflow: 'auto',
    bgcolor: '#fff',
    boxShadow: 24,
    borderRadius: '15px',
    p:4,
    outline:0
  
  };

export function PollDetailsModal({poll, opened}) {
  const [loading, setLoading] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [open, setOpen] = useState(opened);
  const handleClose= () => setOpen(false);
  useEffect(() => {
  }, [open]);
  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
        const post = await axios.put(`http://127.0.0.1:8000/voter/create-vote/`);
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
    <div>
      <Modal
        open={opened}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Card sx={{ maxWidth: 500, margin: '0 auto', marginTop: 5 }}>
        <CardContent>
          <Typography variant="h6" component="div" sx={{marginBottom:"0.3rem" }}>
            {poll.title}
          </Typography>
            
          <div style={{ textAlign: 'center', marginBottom: 5}}>
            <Typography variant="body3" color="text.secondary">
              Expiry Date: {poll.expiry_date}
            </Typography>
            <Typography variant="body2" color="text.secondary" >
            Status: {poll.is_expired ? 'Expired' : 'Active'}
            </Typography>
          </div>
          <TextField size = "small"  id="voter" label="Email" variant="outlined" sx={{width:"100%", margin:"8px 0"}}/>
          <RadioGroup>
          {poll.choices.map((choice) => (
            <FormControlLabel
              key={choice.id}
              value={choice.choice_text}
              label={choice.choice_text}
              control={<Radio disabled={poll.is_expired} />}
            />
          ))}
        </RadioGroup>
        <Button variant="contained" type = 'submit' sx={{marginRight:"1rem"}} disabled={loading}>
        {loading ? <CircularProgress sx={{width:"25px !important", height:"25px !important", color:"#FFF"}}/> : "Vote"}
        </Button>
        <Button variant="contained" color = "error" onClick={handleClose}>Cancel</Button>
        </CardContent>
      </Card>
      </Modal>
    </div>
  );
}