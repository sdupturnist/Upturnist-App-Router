import NoInternetConnection from "@/components/NoConnection";
import "../../public/styles/globals.min.css";
import { ModalContextProvider } from "@/context/modalContext";
import { ThemeProvider } from "@/context/themeContext";
import { SiteProvider } from "@/context/siteContext";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com"></link>
        <link rel="preconnect" href="https://fonts.gstatic.com" ></link>
        <link rel="preload" as="style" href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&family=Bebas+Neue&display=swap" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&family=Bebas+Neue&display=swap" rel="stylesheet" media="print" onload="this.onload=null;this.media='all';"></link>
        <link rel="stylesheet" href="path-to-slick.css" media="print" onload="this.onload=null;this.media='all';"></link>
        <link rel="stylesheet" href="path-to-slick-theme.css" media="print" onload="this.onload=null;this.media='all';"></link>
      </head>
      <body>
        <ThemeProvider>
          <SiteProvider>
            <ModalContextProvider>
              <NoInternetConnection />
              {children}
            </ModalContextProvider>
          </SiteProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
