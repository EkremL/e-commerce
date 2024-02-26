import React from "react";
import { useCallback, useState, useEffect } from "react";
import { Button, Form, Input, message, Spin } from "antd";
import { useParams, useNavigate } from "react-router-dom";

const UpdateCategoryPage = () => {
  const [loading, setLoading] = useState(false);
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  //?formun içini doldurmak için;
  const [form] = Form.useForm();
  const params = useParams();
  //?urldeki idyi almak için
  const categoryId = params.id;
  console.log(categoryId);

  const navigate = useNavigate();

  //?bilgileri alma
  const onFinish = async (values) => {
    setLoading(true);
    try {
      const response = await fetch(`${apiUrl}/api/categories/${categoryId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      if (response.ok) {
        message.success("Categorie is updated successfully");
        navigate("/admin/categories");
      } else {
        message.error("There was an error updating");
      }
    } catch (error) {
      console.log("Categorie update error", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchSingleCategory = useCallback(async () => {
    setLoading(true);
    try {
      //idye ulaşmak icin useparams kullandık
      const response = await fetch(`${apiUrl}/api/categories/${categoryId}`);
      //farklı bir hata yazdırma işlemi
      if (!response.ok) {
        throw new Error("Verileri getirme hatası");
      }
      const data = await response.json();
      //eğer data geliyorsa ve sorun yoksa formun içini dolduruyoruz
      if (data) {
        form.setFieldsValue({
          name: data.name,
          img: data.img,
        });
      }
    } catch (error) {
      console.log("Çekme hatasi", error);
    } finally {
      setLoading(false);
    }
  }, [apiUrl, form, categoryId]);

  useEffect(() => {
    fetchSingleCategory();
  }, [fetchSingleCategory]);

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
          Update
        </Button>
      </Form>
    </Spin>
  );
};

export default UpdateCategoryPage;
