import { createContext, useState, useEffect } from "react";
import { fakeFetchCrypto, fetchAssets } from "../components/layouts/api";
import { percentDifference } from "../utils";
import { useContext } from "react";

const CryptoContext = createContext({
  assets: [],
  crypto: [],
  loading: false,
});

export function CryptoProvider({ children }) {
  const [loading, setLoading] = useState(false);
  const [crypto, setCrypto] = useState([]);
  const [assets, setAssets] = useState([]);

  useEffect(() => {
    async function preload() {
      setLoading(true);
      const { result } = await fakeFetchCrypto();
      const assets = await fetchAssets();
      setAssets(
        assets.map((asset) => {
          const coin = result.find((coin) => coin.id === asset.id);

          return {
            id: asset.id,
            grow: asset.price < coin.price,
            growPercent: percentDifference(asset.price, coin.price),
            totalAmount: asset.amount * coin.price,
            totalProfit: asset.amount * coin.price - asset.amount * asset.price,
            amount: asset.amount,
          };
        })
      );
      setCrypto(result);
      setLoading(false);
    }
    preload();
  }, []);

  return (
    <CryptoContext.Provider value={{ assets, crypto, loading }}>
      {children}
    </CryptoContext.Provider>
  );
}

export default CryptoContext;

export function useCrypto() {
  return useContext(CryptoContext);
}
