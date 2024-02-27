import React from "react";
import { useState } from "react";
import { Button, Form, Input, message, Spin } from "antd";
import { useNavigate } from "react-router-dom";

const CreateCategoryPage = () => {
  const [loading, setLoading] = useState(false);
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  //antd ile butona tıklandıktan sonra içini temizleme
  const [form] = Form.useForm();
  const navigate = useNavigate();

  //?bilgileri alma
  const onFinish = async (values) => {
    setLoading(true);
    try {
      const response = await fetch(`${apiUrl}/api/categories`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      if (response.ok) {
        message.success("Category is created successfully");
        //içini temizlemek için
        form.resetFields();
        navigate("/admin/categories");
      } else {
        message.error("There was an error creating category");
      }
    } catch (error) {
      console.log("Category create error", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Spin spinning={loading}>
      <Form form={form} name="basic" layout="vertical" onFinish={onFinish}>
        <Form.Item
          label="Category Name"
          name="name"
          rules={[
            {
              required: true,
              message: "Please input category name",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Category Image (Link)"
          name="img"
          rules={[
            {
              required: true,
              message: "Please input category image link",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Button type="primary" htmlType="submit">
          Create
        </Button>
      </Form>
    </Spin>
  );
};

export default CreateCategoryPage;
