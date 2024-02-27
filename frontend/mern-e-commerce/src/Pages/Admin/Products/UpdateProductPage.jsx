import React from "react";
import { useState, useEffect } from "react";
import { Button, Form, Input, message, Spin, InputNumber, Select } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const UpdateProductPage = () => {
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);

  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const params = useParams();
  const productId = params.id;

  // console.log(singleProduct);

  //?kategorileri çekme yine birden fazla istek atılcak ve promise kullanılacak

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [categoriesResponse, singleproductsResponse] = await Promise.all([
          fetch(`${apiUrl}/api/categories`),
          fetch(`${apiUrl}/api/products/${productId}`),
        ]);

        if (!categoriesResponse.ok || !singleproductsResponse.ok) {
          message.error("Çekme işlemi başarisiz");
          return;
        }
        const [categoriesData, singleproductData] = await Promise.all([
          categoriesResponse.json(),
          singleproductsResponse.json(),
        ]);

        setCategories(categoriesData);

        //forma dataları dolu halde getirme
        if (singleproductData) {
          form.setFieldsValue({
            name: singleproductData.name,
            current: singleproductData.price.current,
            discount: singleproductData.price.discount,
            description: singleproductData.description,
            img: singleproductData.img.join("\n"),
            colors: singleproductData.colors.join("\n"),
            sizes: singleproductData.sizes.join("\n"),
            category: singleproductData.category,
          });
        }
      } catch (error) {
        console.log("Çekme hatasi", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [apiUrl, productId, form]);

  //?bilgileri alma
  const onFinish = async (values) => {
    const imgLinks = values.img.split("\n").map((x) => x.trim());
    const colors = values.colors.split("\n").map((x) => x.trim());
    const sizes = values.sizes.split("\n").map((x) => x.trim());
    setLoading(true);
    try {
      const response = await fetch(`${apiUrl}/api/products/${productId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...values,
          price: {
            current: values.current,
            discount: values.discount,
          },

          colors,
          sizes,
          img: imgLinks,
        }),
      });
      if (response.ok) {
        message.success("Product is updated successfully");
        navigate("/admin/products");
      } else {
        message.error("There was an error updating product");
      }
    } catch (error) {
      console.log("Product update error", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Spin spinning={loading}>
      <Form form={form} name="basic" layout="vertical" onFinish={onFinish}>
        <Form.Item
          label="Product Name"
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
            {categories.map((category) => (
              <Select.Option value={category._id} key={category._id}>
                {category.name}
              </Select.Option>
            ))}
          </Select>
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
        <Button type="primary" htmlType="submit">
          Update
        </Button>
      </Form>
    </Spin>
  );
};

export default UpdateProductPage;
