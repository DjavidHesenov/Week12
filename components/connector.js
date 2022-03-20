import { InjectedConnector } from '@web3-react/injected-connector';

export const metamask = new InjectedConnector({
    supportedChainIds: [
        97, //  bnb testnet
        3, //  ropsten
    ]
})