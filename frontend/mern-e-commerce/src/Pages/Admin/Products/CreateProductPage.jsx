import React from "react";
import { useState, useEffect } from "react";
import { Button, Form, Input, message, Spin, InputNumber, Select } from "antd";
// import { useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const CreateProductPage = () => {
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  //antd ile butona tıklandıktan sonra içini temizleme
  const [form] = Form.useForm();
  // const navigate = useNavigate();

  //?kategorileri çekme

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${apiUrl}/api/categories`);

        if (response.ok) {
          const data = await response.json();
          setCategories(data);
        } else {
          message.error("Çekme işlemi başarisiz");
        }
      } catch (error) {
        console.log("Çekme hatasi", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, [apiUrl]);
  // console.log(categories);

  //?bilgileri alma
  const onFinish = async (values) => {
    // console.log(values);
    //!modelde array olarak tanımladığımız linkleri,colorsları ve sizeleri ayırıp arraya atma ve aralarında boşluk varsa mapla boşlukları yok etme
    const imgLinks = values.img.split("\n").map((x) => x.trim());
    // console.log(imgLinks);
    const colors = values.colors.split("\n").map((x) => x.trim());
    // console.log(colors);
    const sizes = values.sizes.split("\n").map((x) => x.trim());
    // console.log(sizes);
    setLoading(true);
    try {
      const response = await fetch(`${apiUrl}/api/products`, {
        method: "POST",
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
        message.success("Product is created successfully");
        form.resetFields();
        // navigate("/admin/categories");
      } else {
        message.error("There was an error creating product");
      }
    } catch (error) {
      console.log("Product create error", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Spin spinning={loading}>
      <Form form={form} name="basic" layout="vertical" onFinish={onFinish}>
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
            {/* <Select.Option value="Smartphone" key={"Smartphone"}>
              Smartphone
            </Select.Option> bu manuel kategori girmeydi biz veritabanından maplayacağız*/}
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
          Create
        </Button>
      </Form>
    </Spin>
  );
};

export default CreateProductPage;
