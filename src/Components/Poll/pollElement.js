import { Card, CardContent, Typography } from '@mui/material';
import { PollModal } from './PollModal/pollModal';
import { useState } from 'react';

const PollElement = ({ poll }) => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose= () => setOpen(false);
    
    return (
      <div onClick={handleOpen}  style={{opacity: poll.is_expired ? "0.7" : "1"}} >
      <Card sx={{ maxWidth: 500, margin: '0 auto', marginTop: 5 }}>
        <CardContent>
          <Typography variant="h6" component="div" sx={{marginBottom:"0.3rem" }}>
            {poll.title}
          </Typography>
          <div style={{ textAlign: 'center', display: 'flex', flexWrap:'wrap', justifyContent:"space-between"}}>
            <Typography variant="body2" color="text.secondary">
              {poll.expiry_date}
            </Typography>
            <Typography variant="body2" color="text.secondary" >
              {poll.is_expired ? 'Expired' : 'Active'}
            </Typography>
          </div>
        </CardContent>
      </Card>
      {poll.is_expired === false&& <PollModal poll = {poll} open = {open} setOpen = {setOpen} onClose={handleClose}/>}
      </div>
    );
  };

  
export default PollElement;