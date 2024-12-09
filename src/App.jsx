import React from "react";
import { Layout } from "antd";
import AppHeader from "./components/layouts/appheader";
import AppSider from "./components/layouts/AppSider";
import AppContent from "./components/layouts/AppContent";

export default function App() {
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
