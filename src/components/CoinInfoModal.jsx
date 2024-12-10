import { Divider, Tag, Typography } from "antd";
import CoinInfo from "./Coininfo";

export default function CoinInfoModal({ coin }) {
  return (
    <>
      <CoinInfo coin={coin} withSymbol></CoinInfo>
      <Divider />
      <Typography.Paragraph>
        <Typography.Text strong>1 hour:</Typography.Text>
        <Tag color={coin.priceChange1h > 0 ? "green" : "red"}>
          {coin.priceChange1h}%
        </Tag>
        <Typography.Text strong>1 day:</Typography.Text>
        <Tag color={coin.priceChange1h > 0 ? "green" : "red"}>
          {coin.priceChange1h}%
        </Tag>
        <Typography.Text strong>1 week:</Typography.Text>
        <Tag color={coin.priceChange1h > 0 ? "green" : "red"}>
          {coin.priceChange1h}%
        </Tag>
        <Typography.Paragraph>
          <Typography.Text strong>
            Price: {coin.price.toFixed(2)}$
          </Typography.Text>
        </Typography.Paragraph>
      </Typography.Paragraph>
      <Typography.Paragraph>
        <Typography.Text strong>Price BTC: {coin.priceBtc} </Typography.Text>
      </Typography.Paragraph>
      <Typography.Paragraph>
        <Typography.Text strong>Market Cap: {coin.marketCap}$</Typography.Text>
      </Typography.Paragraph>
      {coin.contractAddress && (
        <Typography.Paragraph>
          <Typography.Text strong>
            Contract Address: {coin.contractAddress}
          </Typography.Text>
        </Typography.Paragraph>
      )}
    </>
  );
}
