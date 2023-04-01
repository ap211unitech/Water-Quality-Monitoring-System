import '@/styles/globals.css'
import Layout from '../components/Layout';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { red } from '@mui/material/colors'

export const theme = createTheme({
  palette: {
    primary: {
      main: red[400],
    },
  },
});

export default function App({ Component, pageProps }) {
  return (

    <ThemeProvider theme={theme}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  )
}
