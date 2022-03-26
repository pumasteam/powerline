import { UserProvider } from "@auth0/nextjs-auth0";
import theme from "@hackclub/theme";
import { ThemeProvider, Container } from "theme-ui";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/globals.css";

const App = ({ Component, pageProps }) => {
  return (
    <UserProvider>
      <ThemeProvider theme={theme}>
        <Container>
          <Header />
          <Component {...pageProps} />
          <Footer />
        </Container>
      </ThemeProvider>
    </UserProvider>
  );
};

export default App;
