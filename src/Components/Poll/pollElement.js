
import { Card, CardContent, FormControlLabel, Radio, RadioGroup, Typography } from '@mui/material';

const PollElement = ({ poll }) => {
    const { title, description, expiry_date, is_expired, choices } = poll;
  
    return (
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
          
          <RadioGroup>
          {choices.map((choice) => (
            <FormControlLabel
              key={choice.id}
              value={choice.choice_text}
              label={choice.choice_text}
              control={<Radio disabled={is_expired} />}
            />
          ))}
        </RadioGroup>
        </CardContent>
      </Card>
    );
  };

  
export default PollElement;