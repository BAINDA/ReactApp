import { Layout, Select, Space, Button, Modal } from "antd";
import { useCrypto } from "../../context/crypto-context";
import { useEffect, useState } from "react";
import CoinInfoModal from "../CoinInfoModal";

const headerStyle = {
  width: "100%",
  textAlign: "center",
  height: 60,
  padding: "1rem",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

export default function AppHeader() {
  const [selected, setSelected] = useState(false);
  const [modal, setModal] = useState(false);
  const [coin, setCoin] = useState(null);
  const [drower, setDrower] = useState(false);
  const { crypto } = useCrypto();

  useEffect(() => {
    function keypress(e) {
      if (e.key === "/") {
        setSelected((prev) => !prev);
      }
    }
    document.addEventListener("keypress", keypress);
    return () => document.removeEventListener("keypress", keypress);
  });

  function handleSelect(value) {
    setCoin(crypto.find((coin) => coin.id === value));
    setModal(true);
  }

  return (
    <Layout.Header style={headerStyle}>
      <Select
        open={selected}
        onSelect={handleSelect}
        onClick={() => setSelected((prev) => !prev)}
        style={{ width: 250 }}
        value="press / to open"
        options={crypto.map((coin) => ({
          label: coin.name,
          value: coin.id,
          icon: coin.icon,
        }))}
        optionRender={(option) => (
          <Space>
            <img
              style={{ width: 20 }}
              src={option.data.icon}
              alt={option.data.label}
            />
            {option.data.label}
          </Space>
        )}
      />

      <Button type="primary">Add asset text</Button>

      <Modal open={modal} onCancel={() => setModal(false)} footer={null}>
        <CoinInfoModal coin={coin}></CoinInfoModal>
      </Modal>
    </Layout.Header>
  );
}
