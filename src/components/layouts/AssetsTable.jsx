import { Table, Typography } from "antd";
import { useCrypto } from "../../context/crypto-context";

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    onFilter: (value, record) => record.name.indexOf(value) === 0,
    sorter: (a, b) => a.name.length - b.name.length,
    sortDirections: ["descend"],
  },
  {
    title: "Price, $",
    dataIndex: "amount",
    defaultSortOrder: "descend",
    sorter: (a, b) => a.amount - b.amount,
  },
  {
    title: "Amount",
    dataIndex: "amount",
    onFilter: (value, record) => record.address.indexOf(value) === 0,
  },
];

const onChange = (pagination, filters, sorter, extra) => {
  console.log("params", pagination, filters, sorter, extra);
};

export default function AssetsTable() {
  const { assets } = useCrypto();

  const data = assets.map((asset) => ({
    key: asset.id,
    name: asset.name,
    price: asset.price,
    amount: asset.amount,
  }));

  return (
    <div style={{ backgroundColor: "#f0f2f5", padding: "1rem" }}>
      {data.length === 0 ? (
        <Typography.Text type="secondary">
          Add Assets to see data!
        </Typography.Text>
      ) : (
        <Table
          pagination={false}
          columns={columns}
          dataSource={data}
          onChange={onChange}
          showSorterTooltip={{
            target: "sorter-icon",
          }}
        />
      )}
    </div>
  );
}
