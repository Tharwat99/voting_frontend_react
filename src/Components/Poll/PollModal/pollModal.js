import React, { useState }  from 'react';
import Modal from '@mui/material/Modal';
import { PollDetails } from './pollDetails';
import {ConfirmPollOtp} from './confirmPollOtp';
import { Snackbar } from '@mui/material';

export function PollModal({poll, open, setOpen}) {
  const [errMsg, setErrMsg] = useState("");
  const [renderedComponent, setRenderedComponent] = useState('details');
  const handleClose= () => {setRenderedComponent('details');setOpen(false)};
  
  const [vote, setVote] = useState({});
  
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
      setErrMsg = {setErrMsg}
      />)
     : renderedComponent === 'otp' ? (<ConfirmPollOtp setRenderedComponent={setRenderedComponent} setOpen={setOpen} vote = {vote} setErrMsg = {setErrMsg}/>)
     : <></>}
      </Modal>
      <Snackbar
      open={!!errMsg}
      autoHideDuration={3000}
      onClose={() => {setErrMsg("")}}
      message={errMsg}
      />
    </div>
  );
}