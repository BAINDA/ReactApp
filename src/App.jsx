import React from "react";
import { CryptoProvider } from "./context/crypto-context";
import AppLayout from "./components/layouts/AppLayout";

export default function App() {
  return (
    <CryptoProvider>
      <AppLayout></AppLayout>
    </CryptoProvider>
  );
}
