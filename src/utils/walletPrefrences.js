import { createThirdwebClient } from "thirdweb";
import { bsc, bscTestnet } from "thirdweb/chains";
import { createWallet, walletConnect } from "thirdweb/wallets";

export const client = createThirdwebClient({
    clientId: process.env.NEXT_PUBLIC_THIRD_WEB_CLIENTID,
    secretKey: process.env.NEXT_PUBLIC_THIRD_WEB_SECRETKEY,
});

export const SUPPORTED_CHAINS = [bscTestnet, bsc];

export const CHAIN_BY_ID = {
    97: bscTestnet,
    56: bsc,
};

export const WALLET_PREFERENCES = {
    "io.metamask": {
        id: "io.metamask",
        name: "Metamask",
        // icon: "/images/walletSvgs/MetaMask.svg",
    },
    walletConnect: {
        id: "walletConnect",
        name: "WalletConnect",
        // icon: "/images/walletSvgs/wc.svg",
    },
};

export const wallets = [createWallet("io.metamask"), walletConnect()];
