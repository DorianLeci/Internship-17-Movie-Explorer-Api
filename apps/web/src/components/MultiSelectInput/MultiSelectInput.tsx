import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  type SelectProps,
} from '@mui/material';

interface Option {
  id: number;
  name: string;
}
type MultiSelectProps = SelectProps & {
  options: Option[];
};
const MultiSelectInput = ({ options, ...props }: MultiSelectProps) => {
  return (
    <FormControl fullWidth sx={{ m: 1 }}>
      <InputLabel sx={{ color: 'white', fontSize: '24px' }}>
        {props.label}
      </InputLabel>
      <Select
        {...props}
        multiple
        sx={{
          color: 'white',
          fontSize: '24px',
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: 'white',
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: 'var(--color-peach)',
            transition: 'border-color 0.2s ease',
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: 'var(--color-peach)',
            borderWidth: 2,
          },
        }}
      >
        {options.map((option) => (
          <MenuItem key={option.id} value={option.id}>
            {option.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default MultiSelectInput;
