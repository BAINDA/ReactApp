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

  function MapAssets(assets, result) {
    return assets.map((asset) => {
      const coin = result.find((coin) => coin.id === asset.id);
      return {
        grow: asset.price < coin.price,
        growPercent: percentDifference(asset.price, coin.price),
        totalAmount: asset.amount * coin.price,
        totalProfit: asset.amount * coin.price - asset.amount * asset.price,
        name: coin.name,
        ...asset,
      };
    });
  }

  useEffect(() => {
    async function preload() {
      setLoading(true);
      const { result } = await fakeFetchCrypto();
      const assets = await fetchAssets();
      setAssets(MapAssets(assets, result));
      setCrypto(result);
      setLoading(false);
    }
    preload();
  }, []);

  function addAsset(NewAsset) {
    setAssets((prev) => MapAssets([...prev, NewAsset], crypto));
  }

  return (
    <CryptoContext.Provider value={{ assets, crypto, loading, addAsset }}>
      {children}
    </CryptoContext.Provider>
  );
}

export default CryptoContext;

export function useCrypto() {
  return useContext(CryptoContext);
}
