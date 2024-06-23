'use client'

import { useAppSelector } from '@/lib/hooks'
import { createTheme, ThemeProvider } from '@mui/material'
import { useMemo } from 'react'

interface IProps {
  children: React.ReactNode
}

function Theme({ children }: IProps) {

  const mode = useAppSelector(selector => selector.theme.mode)

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode]
  );

  return (
    <ThemeProvider theme={theme}>
      {children}
    </ThemeProvider>
  )
}

export default Theme