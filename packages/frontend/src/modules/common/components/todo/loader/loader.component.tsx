import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { Backdrop } from '@mui/material';
import { COLORS } from '../../../../theme';

export const Loader = () => (
  <Backdrop sx={{ backgroundColor: COLORS.white, color: COLORS.blue, zIndex: 20 }} open>
    <CircularProgress color="inherit" />
  </Backdrop>
);
