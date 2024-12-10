import { useState } from "react";
import {
  Select,
  Space,
  Divider,
  Form,
  Button,
  InputNumber,
  DatePicker,
  Result,
} from "antd";
import { useCrypto } from "../../context/crypto-context";
import CoinInfo from "../Coininfo";

const validateMessages = {
  required: "${label} is required!",
  types: {
    number: "${label} is not a valid number!",
  },
  number: {
    range: "${label} must be between ${min} and ${max}",
  },
};

export default function AddAssetForm({ onClose }) {
  const [form] = Form.useForm();
  const { crypto } = useCrypto();
  const [coin, setCoin] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    <Result
      status="success"
      title="New Asset Added"
      subTitle={`Added ${42} of ${coin.name} by price ${24}`}
      extra={[
        <Button type="primary" key="console" onClick={onClose}>
          Close
        </Button>,
      ]}
    />;
  }

  if (!coin) {
    return (
      <Select
        style={{ width: "100%" }}
        onSelect={(value) => setCoin(crypto.find((coin) => coin.id === value))}
        placeholder="Select Coin"
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
    );
  }

  function onFinish(values) {
    console.log("Success:", values);
    setSubmitted(true);
  }

  function handleAmountChange(value) {
    const price = form.getFieldValue("Price");
    form.setFieldsValue({
      total: +(value * price).toFixed(2),
    });
  }

  function handlePriceChange(value) {
    const amount = form.getFieldValue("amount");
    form.setFieldsValue({
      total: +(amount * value).toFixed(2),
    });
  }

  return (
    <Form
      form={form}
      name="basic"
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 10 }}
      style={{ maxWidth: 600 }}
      initialValues={{
        Price: +coin.price.toFixed(2),
      }}
      onFinish={onFinish}
      validateMessages={validateMessages}
    >
      <CoinInfo coin={coin}></CoinInfo>
      <Divider />

      <Form.Item
        label="Amount"
        name="amount"
        rules={[
          {
            required: true,
            type: "number",
            min: 0,
          },
        ]}
      >
        <InputNumber
          placeholder="Enter coin amount"
          onChange={handleAmountChange}
          style={{ width: "100%" }}
        />
      </Form.Item>

      <Form.Item label="Price" name="Price">
        <InputNumber onChange={handlePriceChange} style={{ width: "100%" }} />
      </Form.Item>

      <Form.Item label="Date & Time" name="date">
        <DatePicker showTime />
      </Form.Item>

      <Form.Item label="Total" name="total">
        <InputNumber disabled style={{ width: "100%" }} />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Add Asset
        </Button>
      </Form.Item>
    </Form>
  );
}
