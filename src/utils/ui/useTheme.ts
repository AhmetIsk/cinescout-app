import { useDispatch, useSelector } from 'react-redux';
import { selectThemeMode, toggleTheme, setTheme } from '@redux/themeSlice';
import { PaletteMode } from '@mui/material';

export const useTheme = () => {
  const dispatch = useDispatch();
  const mode = useSelector(selectThemeMode);

  return {
    mode,
    toggleTheme: () => dispatch(toggleTheme()),
    setTheme: (newMode: PaletteMode) => dispatch(setTheme(newMode))
  };
};

export default useTheme;