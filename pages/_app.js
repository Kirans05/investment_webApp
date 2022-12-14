// // import "../styles/globals.css";
// import { ThemeProvider } from "@mui/material";
// import { theme } from "../src/theme";
// import createEmotionCache from "../src/createEmotionCache";
// import { CacheProvider } from "@emotion/react";
// import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs'
// import { SessionContextProvider } from '@supabase/auth-helpers-react'
// import { useState } from "react";

// const clientSideEmotionCache = createEmotionCache();

// function MyApp({
//  Component,
//  emotionCache = clientSideEmotionCache,
//  pageProps,
// }) {

//   const [supabaseClient] = useState(() => createBrowserSupabaseClient())

//  return (
//    <CacheProvider value={emotionCache}>
//      <ThemeProvider theme={theme}>
//      <SessionContextProvider
//       supabaseClient={supabaseClient}
//       initialSession={pageProps.initialSession}
//     >
//        <Component {...pageProps} />
//     </SessionContextProvider>
//      </ThemeProvider>
//    </CacheProvider>
//  );
// }

// export default MyApp;

import supabase from "../src/Config/supaBaseClient";
import { createTheme, ThemeProvider } from "@mui/material";
// import { theme } from "../src/theme";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { useState } from "react";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import "../styles/globals.css";


function MyApp({ Component, pageProps }) {
  const [supabaseClient] = useState(() => createBrowserSupabaseClient());
  const theme = createTheme({
    palette: {
      primary: {
        // main: "#fcba03",
        main: "#2196f3",
      },
      typography: {
        // fontFamily: ['Poppins'].join(",")
      },
    },
   });

  return (
    <ThemeProvider theme={theme}>
        <SessionContextProvider
          supabaseClient={supabaseClient}
          initialSession={pageProps.initialSession}
        >
          <Component {...pageProps} />
        </SessionContextProvider>
    </ThemeProvider>
  );
}

export default MyApp;