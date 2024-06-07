import React, { useState } from "react";
import { Table, Popconfirm, Button, Modal, Form, Input } from "antd";
import { PlusOutlined } from "@ant-design/icons";

const { Column } = Table;
const { confirm } = Modal;

const initialUsers = [
  { id: 1, name: "syj", email: "syj@example.com" },
  { id: 2, name: "wjb", email: "wjb@example.com" },
];

const App = () => {
  const [users, setUsers] = useState(initialUsers);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [editID, setEditID] = useState();
  const [form] = Form.useForm();

  const handleAddEdit = (values) => {
    // console.log(values, "vvv");
    if (modalTitle === "新建用户") {
      setUsers([...users, { id: Date.now(), ...values }]);
    } else {
      setUsers(
        users.map((user) =>
          user.id === editID ? { ...values, id: editID } : user,
        ),
      );
    }
    setIsModalVisible(false);
  };

  const handleDelete = (id) => {
    confirm({
      title: "确定删除该用户?",
      onOk() {
        setUsers(users.filter((user) => user.id !== id));
      },
    });
  };

  const showModal = (title, record = null) => {
    // console.log(record, "vvv");
    record ? setEditID(record.id) : form.resetFields();
    form.setFieldsValue(record || {});
    setModalTitle(title);
    setIsModalVisible(true);
  };

  return (
    <div className="App">
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={() => showModal("新建用户")}
      >
        新建用户
      </Button>
      <Table dataSource={users}>
        <Column title="ID" dataIndex="id" key="id" />
        <Column title="姓名" dataIndex="name" key="name" />
        <Column title="邮箱" dataIndex="email" key="email" />
        <Column
          title="操作"
          key="action"
          render={(text, record) => (
            <>
              <Button onClick={() => showModal("编辑用户", record)}>
                编辑
              </Button>
              <Popconfirm
                title="确认删除?"
                onConfirm={() => handleDelete(record.id)}
              >
                <Button danger>删除</Button>
              </Popconfirm>
            </>
          )}
        />
      </Table>
      <Modal
        title={modalTitle}
        visible={isModalVisible}
        onOk={() => form.submit()}
        onCancel={() => setIsModalVisible(false)}
      >
        <Form form={form} layout="vertical" onFinish={handleAddEdit}>
          <Form.Item
            label="姓名"
            name="name"
            rules={[{ required: true, message: "请输入姓名!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="邮箱" name="email">
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default App;
