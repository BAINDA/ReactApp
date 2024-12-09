import { Layout } from "antd";

const headerStyle = {
  textAlign: "center",
  color: "#fff",
  height: 60,
  paddingInline: 48,
  lineHeight: "64px",
  background: "#4096FF",
};

export default function AppHeader() {
  return <Layout.Header style={headerStyle}>Header</Layout.Header>;
}
