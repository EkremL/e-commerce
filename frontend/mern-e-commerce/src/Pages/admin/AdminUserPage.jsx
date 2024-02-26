import { Table, message, Button, Popconfirm } from "antd";
import { useCallback, useEffect, useState } from "react";

const AdminUserPage = () => {
  const [dataSource, setdataSource] = useState([]);
  const [loading, setLoading] = useState(false);
  const apiUrl = import.meta.env.VITE_API_BASE_URL;

  const columns = [
    {
      title: "Avatar",
      dataIndex: "avatar",
      key: "avatar",
      render: (imgSrc) => (
        <img
          src={imgSrc}
          alt="Avatar"
          style={{ width: "50px", height: "50px", borderRadius: "50%" }}
        />
      ),
    },
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
      //eğer kullanıyorsak text ile datayı kullanmıyosak _, record ile ise o objenin bilgilerini alabiliyoruz
      render: (_, record) => (
        <Popconfirm
          title="Delete the user"
          description="Are you sure to delete this user?"
          okText="Yes"
          cancelText="No"
          onConfirm={() => deleteUser(record.email)}
        >
          <Button type="primary" danger>
            Delete
          </Button>
        </Popconfirm>
      ),
    },
  ];

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(`${apiUrl}/api/users`);

      if (response.ok) {
        const data = await response.json();
        setdataSource(data);
      } else {
        message.error("Çekme işlemi başarisiz");
      }
    } catch (error) {
      console.log("Çekme hatasi", error);
    } finally {
      setLoading(false);
    }
  }, [apiUrl]);

  const deleteUser = async (userEmail) => {
    try {
      const response = await fetch(`${apiUrl}/api/users/${userEmail}`, {
        method: "DELETE",
      });

      if (response.ok) {
        message.success("Kullanıcı başarıyla silindi");
        fetchUsers();
      } else {
        message.error("Silme işlemi başarisiz");
      }
    } catch (error) {
      console.log("Silme hatasi", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]); //dependency olarak fetchUsers verdiğimizde sınırsız istek atmaya başlayacak, bunun için fetch fonksiyonuna usecallback ile sarmalatıyoruz ve dependency kısmına apiurlyi veriyoruz sürekli istek atmasının nedeni react referansının aynı olmadığını ve değiştiğini düşünerek sürekli istek atacaktır bunu usecallback ile çözüyoruz
  //uniqe key hatası için rowKey kullanıyoruz ve mongodbdeki idyi yani _id yi veriyoruz
  return (
    <Table
      dataSource={dataSource}
      columns={columns}
      rowKey={(record) => record._id}
      loading={loading} //buradaki loading tablenin özelliğidir istersek mui deki gibi spinnerli fonksiyon da yazabilirdik
    />
  );
};

export default AdminUserPage;
