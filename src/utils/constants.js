export const ADDRESS_ZERO = "0x0000000000000000000000000000000000000000";
export const ZERO_TOKEN_ADDRESS = "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee";

export const OKIRIKIRI_CHAIN_ID = 97; // BSC TESTNET
export const USDT_TOKEN_DECIMALS = 18; // USDT has 18 decimals

export const MINI_PATH = 0;
export const STANDARD_PATH = 1;
export const DEFAULT_PATH = MINI_PATH;

export const CONTRACT_ADDRESS = {
    Marco: "0xDc923f000F8D20f4D9DF2700cFfd656c98D7E274",
    USDT: "0x59bC155805eA06fd96425A25ffDBE601D6622034",
    SwapRouter: "0xc1e6e5FF6548B8efbf8535182Eb2464212f677ff",
    okirikiriv2: "0x00EF6D68d1d461C5CA60F2FF2950C8718e2Ab4dC",
    Weth: "0x15A23DdC4D5360c97ab52F6047283ac14bce2290",
    SwapFactory: "0x979B98C6a303050BA238556Cb65C3C4d7C7FeD57",
};

export const NetworkParams = {
    //** Testnet */
    97: {
        chainId: 97,
        chainName: "BNB Smart Chain Testnet",
        nativeCurrency: {
            name: "Testnet BNB",
            symbol: "tBNB",
            decimals: 18,
        },
        rpcUrls: ["https://data-seed-prebsc-1-s1.binance.org:8545/"],
        blockExplorerUrls: ["https://testnet.bscscan.com"],
    },

    //** Mainnet */
    56: {
        chainId: 56,
        chainName: "Binance Smart Chain",
        nativeCurrency: {
            name: "BNB Chain Native Token",
            symbol: "BNB",
            decimals: 18,
        },
        rpcUrls: ["https://bsc-dataseed.binance.org"],
        blockExplorerUrls: ["https://bscscan.com"],
    },
};

export const CHAIN_NAME = {
    97: "BNB Smart Chain Testnet",
    56: "Binance Smart Chain",
};
export const RPC_URLS = {
    97: NetworkParams[97].rpcUrls[0],
    56: NetworkParams[56].rpcUrls[0],
};

export const BLOCK_EXPLORER_URL = {
    97: NetworkParams[97].blockExplorerUrls[0],
    56: NetworkParams[56].blockExplorerUrls[0],
};

export const PATH_WITH_LEVEL = {
    0: {
        name: "Mini",
        level: {
            0: { name: "Level 1", entryAmount: 25 },
            1: { name: "Level 2", entryAmount: 100 },
            2: { name: "Level 3", entryAmount: 500 },
            3: { name: "Level 4", entryAmount: 2500 },
        },
    },
    1: {
        name: "Standard",
        level: {
            0: { name: "Level 1", entryAmount: 250 },
            1: { name: "Level 2", entryAmount: 1000 },
            2: { name: "Level 3", entryAmount: 5000 },
            3: { name: "Level 4", entryAmount: 25000 },
        },
    },
};

export const PLATFORM_FEE = 10; // 10% fee for withdrawals without completing all levels

export const SLIPPAGE_CONSTANT = 1; // 1% slippage for swaps
