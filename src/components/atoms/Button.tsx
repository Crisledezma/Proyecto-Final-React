import { Button } from '@mui/material';
import React from 'react';

export interface IButtonProps {
  value: string;
  className?: string;
  variant?: 'text' | 'outlined' | 'contained';
  color?: 'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning';
  onClick?: ()=> void;
}

export const ButtonElement: React.FC<IButtonProps> = (props) => {

  return (
    <Button
      {...props}
    >{ props.value }</Button>
  )
}
