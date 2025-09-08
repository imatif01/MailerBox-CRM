import { StyledToastContainer } from './styles/App.styles';
import { BrowserRouter } from 'react-router-dom';
import GlobalStyles from './styles/GlobalStyles.styles';
import Router from './Router';
import { ThemeProvider } from 'styled-components/macro';
import { FiltersContextProvider } from './context/filtersContext';
import { SideNavContextProvider } from './context/sideNavContext';
import { LoadingContextProvider } from './context/loadingContext';
import { theme } from 'common/theme';
import { AuthContextProvider } from 'context/authContext';
import 'react-toastify/dist/ReactToastify.min.css';
import { GoogleMapsProvider } from './context/googleMapsContext';
import ScrollToTop from 'components/atoms/ScrollToTop';
<link
  href="https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;900&display=swap"
  rel="stylesheet"></link>;

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GoogleMapsProvider>
        <LoadingContextProvider>
          <SideNavContextProvider>
            <FiltersContextProvider>
              <GlobalStyles />
              <BrowserRouter>
                <ScrollToTop />
                <AuthContextProvider>
                  <Router />
                </AuthContextProvider>
              </BrowserRouter>
              <StyledToastContainer />
            </FiltersContextProvider>
          </SideNavContextProvider>
        </LoadingContextProvider>
      </GoogleMapsProvider>
    </ThemeProvider>
  );
}

export default App;
