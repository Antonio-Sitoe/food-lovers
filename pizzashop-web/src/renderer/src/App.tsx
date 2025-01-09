import { RoutesProvider } from './routes'
import { Toaster } from 'sonner'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from './lib/react-query'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import { ThemeProvider } from '@/components/theme/theme-provider'

export function App(): JSX.Element {
  return (
    <HelmetProvider>
      <Helmet titleTemplate="%s | pizza.shop" />
      <QueryClientProvider client={queryClient}>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <RoutesProvider />
          <Toaster richColors />
        </ThemeProvider>
      </QueryClientProvider>
    </HelmetProvider>
  )
}
