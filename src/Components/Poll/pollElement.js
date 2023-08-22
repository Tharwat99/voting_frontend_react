import { Card, CardContent, Typography } from '@mui/material';
import { PollModal } from './PollModal/pollModal';
import { useState } from 'react';

const PollElement = ({ poll }) => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose= () => setOpen(false);
    
    return (
      <div onClick={handleOpen}>
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
        </CardContent>
      </Card>
      <PollModal poll = {poll} open = {open} setOpen = {setOpen} onClose={handleClose}/>
      </div>
    );
  };

  
export default PollElement;