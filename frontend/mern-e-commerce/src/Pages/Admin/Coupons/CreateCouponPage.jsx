import React from "react";
import { useState } from "react";
import { Button, Form, Input, message, Spin, InputNumber } from "antd";
import { useNavigate } from "react-router-dom";

const CreateCouponPage = () => {
  const [loading, setLoading] = useState(false);
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const [form] = Form.useForm();
  const navigate = useNavigate();

  //?bilgileri alma
  const onFinish = async (values) => {
    setLoading(true);
    try {
      const response = await fetch(`${apiUrl}/api/coupons`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      if (response.ok) {
        message.success("Coupon code is created successfully");
        form.resetFields();
        navigate("/admin/coupons");
      } else {
        message.error("There was an error creating coupon code");
      }
    } catch (error) {
      console.log("Coupon code create error", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Spin spinning={loading}>
      <Form form={form} name="basic" layout="vertical" onFinish={onFinish}>
        <Form.Item
          label="Coupon Code"
          name="code"
          rules={[
            {
              required: true,
              message: "Please input coupon code",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Coupon Discount Percent"
          name="discountPercent"
          rules={[
            {
              required: true,
              message: "Please input coupon discount percent",
            },
          ]}
        >
          <InputNumber />
        </Form.Item>

        <Button type="primary" htmlType="submit">
          Create
        </Button>
      </Form>
    </Spin>
  );
};

export default CreateCouponPage;
