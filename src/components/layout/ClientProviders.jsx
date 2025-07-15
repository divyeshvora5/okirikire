"use client";

import { Provider } from "react-redux";
import { ThirdwebProvider } from "thirdweb/react";
import { store } from "@/redux/store";

const ClientProviders = ({ children }) => {
    return (
        <ThirdwebProvider>
            <Provider store={store}>{children}</Provider>
        </ThirdwebProvider>
    );
};

export default ClientProviders;
