import {
  Button,
  Checkbox,
  Flex,
  Form,
  Input,
  Modal,
  Select,
  Space,
  Table,
} from "antd";
import Search from "antd/es/input/Search";
import { Fragment, useCallback, useEffect, useState } from "react";
import request from "../server";

const StudentsPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalLoading, setModalLoading] = useState(false);
  const [teachers, setTeachers] = useState();
  const [studentData, setStudentData] = useState([]);
  const [dataForId, setDataForId] = useState("");
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [teacherId, setTeacherId] = useState();

  const [id, setId] = useState(null);
  const [form] = Form.useForm();

  const handleChange = (value) => {
    setSelected(value);
    setTeacherId(value);
  };

  const showModal = () => {
    form.resetFields();
    setSelected(null);
    setIsModalOpen(true);
  };

  const getStudents = useCallback(async () => {
    try {
      setLoading(true);
      let { data } = await request.get(`teacher/${teacherId}/student`);
      setStudentData(data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }, [teacherId, search]);

  const handleOk = async () => {
    try {
      setModalLoading(true);
      let values = await form.validateFields();
      if (selected === null) {
        await request.post(`teacher/${id}/student`, values);
      } else {
        await request.put(`teacher/${id}/student/${selected}`, values);
      }
      getStudents();
      setIsModalOpen(false);
    } catch (err) {
      console.log(err);
    } finally {
      setModalLoading(false);
    }
  };

  useEffect(() => {
    const getTeachers = async () => {
      try {
        let { data } = await request.get(`teacher`);
        setTeachers(data);
        let { data: anotherData } = await request.get(
          `teacher?filter=${selected}`
        );
        setDataForId(anotherData);
      } catch (err) {
        console.log(err);
      }
    };

    getStudents();

    getTeachers();
  }, [selected, id, getStudents]);

  const editStudent = async (id) => {
    try {
      form.resetFields();
      setIsModalOpen(true);
      setSelected(id);
      let { data } = await request.get(`teacher/${id}/student/${id}`);
      form.setFieldsValue(data);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteStudent = (data) => {
    Modal.confirm({
      title: "Do you want to delete this student ?",
      onOk: async () => {
        await request.delete(`teacher/${id}/student/${data}`);
        getStudents();
      },
    });
  };

  let names = [];
  let ids = [];
  for (let i in teachers) {
    names.push(teachers[i].firstName);
    ids.push(teachers[i].id);
  }
  let options = names.map((name) => {
    return {
      label: name,
      value: id
    };
  });
  // options = ids.map((id) => {
  //   return {

  //     value: (id ? id : '9'),
  //   };
  // });

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const columns = [
    {
      title: "FirstName",
      dataIndex: "firstName",
      key: "firstName",
    },
    {
      title: "LastName",
      dataIndex: "lastName",
      key: "lastName",
    },

    {
      title: "Works ?",
      dataIndex: "isWork",
      key: "isWork",
      render: (data) => (data ? "Yes" : "No"),
    },
    {
      title: "Action",
      dataIndex: "id",
      key: "id",
      render: (data) => (
        <Space size="middle">
          <Button onClick={() => editStudent(data)} type="primary">
            Edit
          </Button>
          <Button onClick={() => deleteStudent(data)} danger type="primary">
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <Fragment>
      <Flex align="center" justify="space-between" gap={30}>
        <h1>Students</h1>
        <Search
          placeholder="Searching .."
          onChange={(e) => setSearch(e.target.value)}
          size="large"
        />
      </Flex>

      <Flex className="filter-box" align="center" justify="right" gap={20}>
        <Button
          onClick={showModal}
          className="modal-btn"
          type="primary"
          size="large"
        >
          Add student
        </Button>
        <Select
          defaultValue="Teachers ID"
          onChange={handleChange}
          options={options}
        />
      </Flex>
      <Table
        scroll={{
          x: 1000,
        }}
        dataSource={studentData}
        title={() => <Fragment></Fragment>}
        loading={loading}
        columns={columns}
        pagination={false}
      />
      <Modal
        title="Student Info"
        open={isModalOpen}
        confirmLoading={modalLoading}
        onOk={handleOk}
        okText={selected === null ? "Add student" : "Save student"}
        onCancel={closeModal}
        initialValues={{
          isMarried: false,
        }}
      >
        <Form
          form={form}
          className="modal-form"
          name="login"
          labelCol={{
            span: 24,
          }}
          wrapperCol={{
            span: 24,
          }}
          autoComplete="off"
        >
          <Form.Item
            className="form-item"
            label="First Name"
            name="firstName"
            rules={[
              {
                required: true,
                message: "Please input your firstname!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            className="form-item"
            label="Last Name"
            name="lastName"
            rules={[
              {
                required: true,
                message: "Please input your lastname!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            className="form-item"
            label="Mark"
            name="mark"
            rules={[
              {
                required: true,
                message: "Please input your mark!",
              },
            ]}
          >
            <Input type="number" />
          </Form.Item>

          <Form.Item
            className="form-item"
            label="Attendance"
            name="attendance"
            rules={[
              {
                required: true,
                message: "Please fill!",
              },
            ]}
          >
            <Input type="number" />
          </Form.Item>

          <Form.Item
            className="form-item"
            name="isWork"
            valuePropName="checked"
            wrapperCol={{
              offset: 0,
              span: 16,
            }}
          >
            <Checkbox>Works ?</Checkbox>
          </Form.Item>
        </Form>
      </Modal>
    </Fragment>
  );
};

export default StudentsPage;
