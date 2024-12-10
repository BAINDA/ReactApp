import { Layout, Spin } from "antd";
import AppHeader from "./appheader";
import AppSider from "./AppSider";
import AppContent from "./AppContent";
import { useContext } from "react";
import CryptoContext from "../../context/crypto-context";

const spinStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
  backgroundColor: "#001529", // Set the desired background color
};

export default function AppLayout() {
  useContext(CryptoContext);

  const { loading } = useContext(CryptoContext);

  if (loading) {
    return (
      <div style={spinStyle}>
        <Spin size="large" />
      </div>
    );
  }
  return (
    <Layout>
      <AppHeader></AppHeader>
      <Layout>
        <AppSider></AppSider>
        <AppContent></AppContent>
      </Layout>
    </Layout>
  );
}
