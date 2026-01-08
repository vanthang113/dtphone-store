'use client'

import { Provider } from 'react-redux'
import { store } from '@/store'
import { ThemeProvider } from "@/components/admin/ThemeProvider"
import { MenuProvider } from "@/context/MenuContext"

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem  
      disableTransitionOnChange
    >
      <Provider store={store}>
        <MenuProvider>
          {children}
        </MenuProvider>
      </Provider>
    </ThemeProvider>
  )
}
