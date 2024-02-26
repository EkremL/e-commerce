import React from "react";
import { useState } from "react";
import { Button, Form, Input, message, Spin, InputNumber, Select } from "antd";
import { useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const CreateProductPage = () => {
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
        message.success("Categorie is created successfully");
        //içini temizlemek için
        form.resetFields();
        navigate("/admin/categories");
      } else {
        message.error("There was an error creating");
      }
    } catch (error) {
      console.log("Categorie create error", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Spin spinning={loading}>
      <Form name="basic" layout="vertical" onFinish={onFinish}>
        <Form.Item
          label="Product Name"
          //nameler database ile aynı isimde olmali
          name="name"
          rules={[
            {
              required: true,
              message: "Please input product name",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Price"
          name="current"
          rules={[
            {
              required: true,
              message: "Please input product price",
            },
          ]}
        >
          <InputNumber />
        </Form.Item>
        <Form.Item
          label="Discount"
          name="discount"
          rules={[
            {
              required: true,
              message: "Please input product discount percent",
            },
          ]}
        >
          <InputNumber />
        </Form.Item>
        <Form.Item
          label="Description"
          name="description"
          rules={[
            {
              required: true,
              message: "Please enter product description",
            },
          ]}
        >
          <ReactQuill theme="snow" style={{ backgroundColor: "white" }} />
        </Form.Item>

        <Form.Item
          label="Product Images (Links)"
          name="img"
          rules={[
            {
              required: true,
              message: "Please input at least 4 product image links",
            },
          ]}
        >
          <Input.TextArea
            placeholder="Enter each image link on a new line"
            autoSize={{ minRows: 4 }}
          />
        </Form.Item>
        <Form.Item
          label="Product Colors (RGB Codes)"
          name="colors"
          rules={[
            {
              required: true,
              message: "Please input at least 1 product color",
            },
          ]}
        >
          <Input.TextArea
            placeholder="Enter each image link on a new line"
            autoSize={{ minRows: 4 }}
          />
        </Form.Item>
        <Form.Item
          label="Product Body Sizes "
          name="sizes"
          rules={[
            {
              required: true,
              message: "Please input at least 1 product body size",
            },
          ]}
        >
          <Input.TextArea
            placeholder="Enter each body size on a new line"
            autoSize={{ minRows: 4 }}
          />
        </Form.Item>
        <Form.Item
          label="Product Category "
          name="category"
          rules={[
            {
              required: true,
              message: "Please select  1 product category",
            },
          ]}
        >
          <Select>
            <Select.Option value="Smartphone" key={"Smartphone"}>
              Smartphone
            </Select.Option>
          </Select>
        </Form.Item>

        <Button type="primary" htmlType="submit">
          Create
        </Button>
      </Form>
    </Spin>
  );
};

export default CreateProductPage;
