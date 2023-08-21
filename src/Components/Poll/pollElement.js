
import { Card, CardContent, FormControlLabel, Radio, RadioGroup, Typography } from '@mui/material';
import { PollDetailsModal } from './pollDetailsModal';
import { useEffect, useRef, useState } from 'react';

const PollElement = ({ poll }) => {
    const { title, description, expiry_date, is_expired, choices } = poll;
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose= () => setOpen(false);
    const parentRef = useRef(null);
    useEffect(() => {
      const handleClickOutside = (event) => {
        if (parentRef.current && !parentRef.current.contains(event.target)) {
          handleClose();
        }
      };
  
      document.addEventListener('click', handleClickOutside);
  
      return () => {
        document.removeEventListener('click', handleClickOutside);
      };
    }, []);
    return (
      <div ref={parentRef} onClick={handleOpen}>
      <Card sx={{ maxWidth: 500, margin: '0 auto', marginTop: 5 }}>
        <CardContent>
          <Typography variant="h6" component="div" sx={{marginBottom:"0.3rem" }}>
            {title}
          </Typography>
            
          <div style={{ textAlign: 'center', marginBottom: 5}}>
            <Typography variant="body3" color="text.secondary">
              Expiry Date: {expiry_date}
            </Typography>
            <Typography variant="body2" color="text.secondary" >
            Status: {is_expired ? 'Expired' : 'Active'}
            </Typography>
          </div>
        </CardContent>
      </Card>
      <PollDetailsModal poll = {poll} opened = {open} onClose={handleClose}/>
      </div>
    );
  };

  
export default PollElement;