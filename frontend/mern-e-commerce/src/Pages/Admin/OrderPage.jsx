import { Table, message, Spin } from "antd";
import { useEffect, useState } from "react";

const OrderPage = () => {
  const [dataSource, setdataSource] = useState([]);
  const [loading, setLoading] = useState(false);

  // const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const MY_STRIPE_SECRET_KEY = import.meta.env.VITE_API_STRIPE_SECRET_KEY;

  const columns = [
    {
      title: "Customer Email",
      dataIndex: "receipt_email",
    },
    {
      title: "Order Price",
      dataIndex: "amount",
      render: (record) => <b>${(record / 100).toFixed(2)}</b>,
    },
  ];

  useEffect(() => {
    //stripe.com/docs/api de payment kısmından linke istek atıyoruz
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://api.stripe.com/v1/payment_intents`,
          {
            method: "GET",
            headers: {
              //bearerin içindeki key secret keyimiz
              Authorization: `Bearer ${MY_STRIPE_SECRET_KEY}`,
            },
          }
        );

        if (response.ok) {
          const { data } = await response.json();
          setdataSource(data); //datasource içindeki data
        } else {
          message.error("Çekme işlemi başarisiz");
        }
      } catch (error) {
        console.log("Çekme hatasi", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [MY_STRIPE_SECRET_KEY]);

  // console.log(dataSource);

  return (
    <Spin spinning={loading}>
      <Table
        rowKey={(record) => record.id}
        dataSource={dataSource}
        columns={columns}
        loading={loading}
      />
    </Spin>
  );
};

export default OrderPage;
