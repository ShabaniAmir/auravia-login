import { type AppType } from "next/app";

import { api } from "~/utils/api";

import "~/styles/globals.css";
import { AuthProvider } from "~/components/Authentication";
import { TenantProvider } from "~/hooks/Tenant";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <AuthProvider>
      <TenantProvider>
        <Component {...pageProps} />
      </TenantProvider>
    </AuthProvider>
  );
};

export default api.withTRPC(MyApp);
