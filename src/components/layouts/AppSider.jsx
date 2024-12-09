import { Layout, Card, Statistic, Typography, List, Spin } from "antd";
import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { fakeFetchCrypto, fetchAssets } from "./api";
import { percentDifference } from "../../utils";

const siderStyle = {
  padding: "1rem",
};

export default function AppSider() {
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

  if (loading) {
    return <Spin fullscreen />;
  }

  return (
    <Layout.Sider width="25%" style={siderStyle}>
      {assets.map((asset) => (
        <Card key={asset.id} style={{ marginBottom: "1rem" }}>
          <Statistic
            title={asset.id}
            value={asset.totalAmount}
            precision={2}
            valueStyle={{ color: asset.grow ? "#3f8600" : "#cf1322" }}
            prefix={asset.grow ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
            suffix="$"
          ></Statistic>
          <List
            size="small"
            dataSource={[
              { title: "Total Profit", value: asset.totalProfit },
              { title: "Asset Amount", value: asset.amount, isPlain: true },
              { title: "Difference", value: asset.growPercent },
            ]}
            renderItem={(item) => (
              <List.Item>
                <span>{item.title}</span>
                {item.isPlain && <span>{item.value}</span>}
                {!item.isPlain && (
                  <Typography.Text type={asset.grow ? "success" : "danger"}>
                    {item.value.toFixed(2)}$
                  </Typography.Text>
                )}
              </List.Item>
            )}
          ></List>
        </Card>
      ))}

      {/* <Card>
        <Statistic
          title="Idle"
          value={9.3}
          precision={2}
          valueStyle={{ color: "#cf1322" }}
          prefix={<ArrowDownOutlined />}
          suffix="%"
        ></Statistic>
      </Card> */}
    </Layout.Sider>
  );
}
