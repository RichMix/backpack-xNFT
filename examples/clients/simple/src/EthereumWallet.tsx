import React, { FC } from "react";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { WagmiConfig, createClient } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";
import { getDefaultProvider } from "ethers";

const client = createClient({
  autoConnect: true,
  provider: getDefaultProvider(),
});

export const EthereumWallet: FC = ({
  children,
}: {
  children?: React.ReactNode;
}) => {
  return (
    <WagmiConfig client={client}>
      <Profile children={children} />
    </WagmiConfig>
  );
};

function Profile({ children }: { children: React.ReactNode }) {
  const { address, isConnected } = useAccount();
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  });
  const { disconnect } = useDisconnect();

  if (isConnected) {
    return (
      <div>
        <div>Connected to {address}</div>
        <div style={{ marginTop: "8px" }}>
          <button onClick={() => disconnect()}>Disconnect</button>
        </div>
        {children}
      </div>
    );
  }
  return <button onClick={() => connect()}>Connect Wallet</button>;
}
