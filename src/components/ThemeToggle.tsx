import { IconButton } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Brightness4, Brightness7 } from '@mui/icons-material';

interface IProps {
  toggleTheme: () => void
}

export default function ThemeToggle({ toggleTheme }: IProps) {
  const theme = useTheme();
  return (
    <IconButton onClick={toggleTheme} color="inherit">
      {theme.palette.mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
    </IconButton>
  );
};