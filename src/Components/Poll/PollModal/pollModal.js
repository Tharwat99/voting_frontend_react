import React, { useEffect, useState }  from 'react';
import axios from 'axios';
import Modal from '@mui/material/Modal';
import { Button, Card, CardContent, CircularProgress, FormControlLabel, Radio, RadioGroup, TextField, Typography } from '@mui/material';
import { Snackbar } from '@mui/material';
import { PollDetails } from './pollDetails';
import {ConfirmPollOtp} from './confirmPollOtp';
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

export function PollModal({poll, open, setOpen}) {

  const [renderedComponent, setRenderedComponent] = useState('details');
  const handleClose= () => setOpen(false);
  
  const [vote, setVote] = useState({});
  
  useEffect(() => {
  }, [open]);

  return (
    <div onClick={(e) => {e.stopPropagation()}}>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
      {renderedComponent === 'details' ? (
      <PollDetails poll={poll}
      setRenderedComponent={setRenderedComponent}
      setOpen={setOpen}
      setVote = {setVote}
      />)
     : renderedComponent === 'otp' ? (<ConfirmPollOtp setRenderedComponent={setRenderedComponent} setOpen={setOpen} vote = {vote}/>)
     : <></>}
      </Modal>
    </div>
  );
}