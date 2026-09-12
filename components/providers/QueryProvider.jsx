'use client'

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { useState } from "react";

export default function QueryProvider({ children }) {

    const [queryClient] = useState(() => new QueryClient({
        defaultOptions: {
            qeueries: {
                staleTime: 1000 * 60 * 10,
                fefetchOnWindowFocus: false
            }   
        }
    }));


return <QueryClientProvider client={queryClient}>{children} 
  <ReactQueryDevtools
        initialIsOpen={false}
        buttonPosition="bottom-right"
      />
</QueryClientProvider>;

}

