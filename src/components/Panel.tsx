'use client'

import { CssBaseline } from "@mui/material";
import Navbar from './Navbar';
import Theme from './Theme';

interface IProps {
  children: React.ReactNode
}

export default function Panel({ children }: IProps) {
  return (

    <Theme>
      <CssBaseline />
      <Navbar />
      <main style={{ padding: '24px 16px', flex: 1 }}>{children}</main>
    </Theme>
  )
}