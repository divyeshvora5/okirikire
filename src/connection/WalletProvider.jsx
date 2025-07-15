"use client";

import { ThirdwebProvider } from "thirdweb/react";

const WalletProvider = ({ children }) => {
    return <ThirdwebProvider>{children}</ThirdwebProvider>;
};

export default WalletProvider;
