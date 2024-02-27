import React from "react";
import { useCallback, useState, useEffect } from "react";
import { Button, Form, Input, message, Spin, InputNumber } from "antd";
import { useParams, useNavigate } from "react-router-dom";

const UpdateCouponPage = () => {
  const [loading, setLoading] = useState(false);
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  //?formun içini doldurmak için;
  const [form] = Form.useForm();
  const params = useParams();
  //?urldeki idyi almak için
  const couponId = params.id;
  // console.log(couponId);

  const navigate = useNavigate();

  //?bilgileri alma
  const onFinish = async (values) => {
    setLoading(true);
    try {
      const response = await fetch(`${apiUrl}/api/coupons/${couponId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      if (response.ok) {
        message.success("Coupon is updated successfully");
        navigate("/admin/coupons");
      } else {
        message.error("There was an error updating coupon");
      }
    } catch (error) {
      console.log("Coupon update error", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchSingleCoupon = useCallback(async () => {
    setLoading(true);
    try {
      //idye ulaşmak icin useparams kullandık
      const response = await fetch(`${apiUrl}/api/coupons/${couponId}`);
      //farklı bir hata yazdırma işlemi
      if (!response.ok) {
        throw new Error("Verileri getirme hatası");
      }
      const data = await response.json();
      //eğer data geliyorsa ve sorun yoksa formun içini dolduruyoruz
      if (data) {
        form.setFieldsValue({
          code: data.code,
          discountPercent: data.discountPercent,
        });
      }
    } catch (error) {
      console.log("Çekme hatasi", error);
    } finally {
      setLoading(false);
    }
  }, [apiUrl, form, couponId]);

  useEffect(() => {
    fetchSingleCoupon();
  }, [fetchSingleCoupon]);

  return (
    <Spin spinning={loading}>
      <Form
        form={form}
        name="basic"
        layout="vertical"
        autoComplete="off"
        onFinish={onFinish}
      >
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
          Update
        </Button>
      </Form>
    </Spin>
  );
};

export default UpdateCouponPage;
