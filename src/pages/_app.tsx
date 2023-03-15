import { type AppType } from "next/app";

import { api } from "~/utils/api";

import "~/styles/globals.css";
import { AuthProvider } from "~/components/Authentication";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
};

export default api.withTRPC(MyApp);
