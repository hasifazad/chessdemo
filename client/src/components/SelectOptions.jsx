import React from 'react';
import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft';
import FormatAlignCenterIcon from '@mui/icons-material/FormatAlignCenter';
import FormatAlignRightIcon from '@mui/icons-material/FormatAlignRight';
import FormatAlignJustifyIcon from '@mui/icons-material/FormatAlignJustify';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { Typography } from '@mui/material';
const a = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6s8SUWJ9Vr681FKY0JlN1ve-CV13jYvEAZQ&usqp=CAU'

export default function ToggleButtons() {
  const [alignment, setAlignment] = React.useState('left');

  const handleAlignment = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  return (
    <ToggleButtonGroup
      color='success'
      value={alignment}
      exclusive
      onChange={handleAlignment}
      aria-label="text alignment"
      fullWidth
      sx={{margin:'20px 0'}}
    >
      <ToggleButton value="left" aria-label="left aligned">
        <Typography>WHITE</Typography>
      </ToggleButton>
      <ToggleButton value="center" aria-label="centered">
        <Typography>RANDOM</Typography>
      </ToggleButton>
      <ToggleButton value="right" aria-label="right aligned">
        <Typography>BLACK</Typography>
      </ToggleButton>
    </ToggleButtonGroup>
  );
}