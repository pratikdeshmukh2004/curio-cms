import "@/styles/globals.css";
import "@fortawesome/fontawesome-svg-core/styles.css";
// Prevent fontawesome from adding its CSS since we did it manually above:
import { config } from "@fortawesome/fontawesome-svg-core";
import { Toaster } from "react-hot-toast";
import { useEffect } from "react";
config.autoAddCss = false; /* eslint-disable import/first */

export default function App({ Component, pageProps }) {
  useEffect(()=>{
    document.title = "CurIo CMS"
  }, [])
  return (
    <div>
      <Toaster position="top-right" />
      <Component {...pageProps} />
    </div>
  );
}
