const coins = {
    btc: {
        id: "bitcoin",
        symbol: "btc",
        name: "Bitcoin",
    },
    eth: {
        id: "ethereum",
        symbol: "eth",
        name: "Ethereum",
    },
    bnb: {
        id: "binancecoin",
        symbol: "bnb",
        name: "Binance Coin",
    },
    sol: {
        id: "solana",
        symbol: "sol",
        name: "Solana",
    },
    wbtc: {
        id: "wrapped-bitcoin",
        symbol: "wbtc",
        name: "Wrapped Bitcoin",
    },
    uqc: {
        id: "uquid-coin",
        symbol: "uqc",
        name: "Uquid Coin",
    },
    fx: {
        id: "fx-coin",
        symbol: "fx",
        name: "FX Coin",
    },
    ygq: {
        id: "yield-guild-games",
        symbol: "ygg",
        name: "Yield Guild Games",
    },
    floki: {
        id: "floki-inu",
        symbol: "floki",
        name: "Floki Inu",
    },
    mvl: {
        id: "mass-vehicle-ledger",
        symbol: "mvl",
        name: "MVL",
    },
    metis: {
        id: "metis-token",
        symbol: "metis",
        name: "Metis",

    },
    ckb: {
        id: "nervos-network",
        symbol: "ckb",
        name: "Nervos Network",
    },
    dao: {
        id: "dao-maker",
        symbol: "dao",
        name: "DAO Maker",
    },
    ren: {
        id: "republic-protocol",
        symbol: "ren",
        name: "REN",
    },
    aca: {
        id: "acala",
        symbol: "aca",
        name: "Acala",
    },
    rly: {
        id: "rally-2",
        symbol: "rly",
        name: "Rally",
    },
    orbs: {
        id: "orbs",
        symbol: "orbs",
        name: "Orbs",
    },
    dome: {
        id: "everdome",
        symbol: "dome",
        name: "Everdome",
    },
    xno: {
        id: "nano",
        symbol: "xno",
        name: "Nano",
    },
    win: {
        id: "wink",
        symbol: "win",
        name: "WINkLink",
    },
    snt: {
        id: "status",
        symbol: "snt",
        name: "Status",
    },
    raca: {
        id: "radio-caca",
        symbol: "raca",
        name: "Radio Caca",
    },
    cvc: {
        id: "civic",
        symbol: "cvc",
        name: "Civic",
    },
    mx: {
        id: "mx-token",
        symbol: "mx",
        name: "MX",
    },
    med: {
        id: "medibloc",
        symbol: "med",
        name: "Medibloc",
    },
    gal: {
        id: "project-galaxy",
        symbol: "gal",
        name: "Project Galaxy",
    },
    nest: {
        id: "nest",
        symbol: "nest",
        name: "Nest Protocol",
    },
    eurs: {
        id: "stasis-eurs",
        symbol: "eurs",
        name: "STASIS EURO",
    },
    prom: {
        id: "prometeus",
        symbol: "prom",
        name: "Prom",
    },
    rsr: {
        id: "reserve-rights-token",
        symbol: "rsr",
        name: "Reserve Rights",
    },
    susd: {
        id: "nusd",
        symbol: "susd",
        name: "sUSD",
    },
    celr: {
        id: "celer-network",
        symbol: "celr",
        name: "Celer Network",
    },
    erg: {
        id: "ergo",
        symbol: "erg",
        name: "Ergo",
    },
    wrx: {
        id: "wazirx",
        symbol: "wrx",
        name: "WazirX",
    },
    kiro: {
        id: "kirobo",
        symbol: "kiro",
        name: "Kirobo",
    },
    ibeur: {
        id: "iron-bank-euro",
        symbol: "ibeur",
        name: "Iron Bank EURO",
    },
    coti: {
        id: "coti",
        symbol: "coti",
        name: "COTI",
    },
    xyo: {
        id: "xyo-network",
        symbol: "xyo",
        name: "XYO Network",
    },
    ardr: {
        id: "ardor",
        symbol: "ardr",
        name: "Ardor",
    },
    cfx: {
        id: "conflux-token",
        symbol: "cfx",
        name: "Conflux",
    },
    chr: {
        id: "chromaway",
        symbol: "chr",
        name: "Chromia",
    },
    stsol: {
        id: "lido-staked-sol",
        symbol: "stsol",
        name: "Lido Staked SOL",
    },
    nmr: {
        id: "numeraire",
        symbol: "nmr",
        name: "Numeraire",
    },
    api3: {
        id: "api3",
        symbol: "api3",
        name: "API3",
    },
    bnt: {
        id: "bancor",
        symbol: "bnt",
        name: "Bancor Network",
    },
    sys: {
        id: "syscoin",
        symbol: "sys",
        name: "Syscoin",
    },
    usdx: {
        id: "usdx",
        symbol: "usdx",
        name: "USDX",
    },
    ever: {
        id: "everscale",
        symbol: "ever",
        name: "Everscale",
    },
    powr: {
        id: "power-ledger",
        symbol: "powr",
        name: "Power Ledger",
    },
    dka: {
        id: "dkargo",
        symbol: "dka",
        name: "dKargo",
    },
    mbox: {
        id: "mobox",
        symbol: "mbox",
        name: "Mobox",
    },
    ogn: {
        id: "origin-protocol",
        symbol: "ogn",
        name: "Origin Protocol",
    },
    cet: {
        id: "coinex-token",
        symbol: "cet",
        name: "CoinEx",
    },
    titan: {
        id: "titanswap",
        symbol: "titan",
        name: "TitanSwap",
    },
    mlk: {
        id: "milk-alliance",
        symbol: "mlk",
        name: "MiL.k Alliance",
    },
    kunci: {
        id: "kunci-coin",
        symbol: "kunci",
        name: "Kunci Coin",
    },
    strax: {
        id: "stratis",
        symbol: "strax",
        name: "Stratis",
    },
    arrr: {
        id: "pirate-chain",
        symbol: "arrr",
        name: "Pirate Chain",
    },
    spell: {
        id: "spell-token",
        symbol: "spell",
        name: "Spell",
    },
    steem: {
        id: "steem",
        symbol: "steem",
        name: "Steem",
    },
    vgx: {
        id: "ethos",
        symbol: "vgx",
        name: "Voyager VGX"
    },
    keep: {
        id: "keep-network",
        symbol: "keep",
        name: "Keep Network",
    },
    bico: {
        id: "biconomy",
        symbol: "bico",
        name: "Biconomy",
    },
    pltc: {
        id: "platoncoin",
        symbol: "pltc",
        name: "PlatonCoin",
    },
    ray: {
        id: "raydium",
        symbol: "ray",
        name: "Raydium",
    },
    ewt: {
        id: "energy-web-token",
        symbol: "ewt",
        name: "Energy Web",
    },
    joe: {
        id: "joe",
        symbol: "joe",
        name: "JOE",
    },
    bsw: {
        id: "biswap",
        symbol: "bsw",
        name: "Biswap",
    },
    dent: {
        id: "dent",
        symbol: "dent",
        name: "Dent",
    },
    ctsi: {
        id: "cartesi",
        symbol: "ctsi",
        name: "Cartesi",
    },
    storj: {
        id: "storj",
        symbol: "storj",
        name: "Storj",
    },
    seth2: {
        id: "seth2",
        symbol: "seth2",
        name: "sETH2",
    },
    vtho: {
        id: "vethor-token",
        symbol: "vtho",
        name: "VeThor",
    },
    req: {
        id: "request-network",
        symbol: "req",
        name: "Request",
    },
    exrd: {
        id: "e-radix",
        symbol: "exrd",
        name: "e-Radix",
    },
    tel: {
        id: "telcoin",
        symbol: "tel",
        name: "Telcoin",
    },
    pyr: {
        id: "vulcan-forged",
        symbol: "pyr",
        name: "Vulcan Forged",
    },
    lyxe: {
        id: "lukso-token",
        symbol: "lyxe",
        name: "LUKSO",
    },
    rev: {
        id: "revain",
        symbol: "rev",
        name: "Revain",
    },
    plt: {
        id: "poollotto-finance",
        symbol: "plt",
        name: "Poollotto.finance",
    },
    aurora: {
        id: "aurora-near",
        symbol: "aurora",
        name: "Aurora",
    },
    rad: {
        id: "radicle",
        symbol: "rad",
        name: "Radicle",
    },
    mpl: {
        id: "maple",
        symbol: "mpl",
        name: "Maple",
    },
    ads: {
        id: "adshares",
        symbol: "ads",
        name: "Adshares",
    },
    sure: {
        id: "insure",
        symbol: "sure",
        name: "inSure DeFi",
    },
    vlx: {
        id: "velas",
        symbol: "vlx",
        name: "Velas",
    },
    savax: {
        id: "benqi-liquid-staked-avax",
        symbol: "savax",
        name: "BENQI Liquid Staked AVAX",
    },
    flm: {
        id: "flamingo-finance",
        symbol: "flm",
        name: "Flamingo Finance",
    },
    xprt: {
        id: "persistence",
        symbol: "xprt",
        name: "Persistence",
    },
    ton: {
        id: "tokamak-network",
        symbol: "ton",
        name: "Tokamak Network",
    },
    hxro: {
        id: "hxro",
        symbol: "hxro",
        name: "Hxro",
    },
    xido: {
        id: "xido-finance",
        symbol: "xido",
        name: "Xido Finance",
    },
    bdx: {
        id: "beldex",
        symbol: "bdx",
        name: "Beldex",
    },
    mtl: {
        id: "metal",
        symbol: "mtl",
        name: "Metal",
    },
    inj: {
        id: "injective-protocol",
        symbol: "inj",
        name: "Injective",
    },
    bfc: {
        id: "bifrost",
        symbol: "bfc",
        name: "Bifrost",
    },
    xsushi: {
        id: "xsushi",
        symbol: "xsushi",
        name: "xSUSHI",
    },
    c98: {
        id: "coin98",
        symbol: "c98",
        name: "Coin98",
    },
    wcfg: {
        id: "wrapped-centrifuge",
        symbol: "wcfg",
        name: "Wrapped Centrifuge",
    },
    btse: {
        id: "btse-token",
        symbol: "btse",
        name: "BTSE Token",
    },
    boba: {
        id: "boba-network",
        symbol: "boba",
        name: "Boba Network",
    },
    sprt: {
        id: "sportium",
        symbol: "sprt",
        name: "Sportium",
    },
    rgt: {
        id: "rari-governance-token",
        symbol: "rgt",
        name: "Rari Governance",
    },
    ark: {
        id: "ark",
        symbol: "ark",
        name: "Ark",
    },
    mdx: {
        id: "mdex",
        symbol: "mdx",
        name: "Mdex",
    }
}

export default coins;
