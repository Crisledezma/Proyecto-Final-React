import { VisibilityOff, Visibility } from "@mui/icons-material";
import { TextFieldProps, InputAdornment, IconButton } from "@mui/material";
import React from "react";
import { TextInput } from "./TextInput";


const PasswordInput: React.FC<TextFieldProps> = (props) => {

  const [showPassword, setShowPassword] = React.useState(false);

  return (
    <TextInput
      {...props}
      type={showPassword ? "text" : "password"}
      InputProps={{
        endAdornment: (
          <InputAdornment position='end'>
            <IconButton
              aria-label='toggle password visibility'
              edge="end"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  )
}

export default PasswordInput