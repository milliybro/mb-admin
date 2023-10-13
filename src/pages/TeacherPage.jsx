import {
  Button,
  Checkbox,
  Flex,
  Form,
  Image,
  Input,
  Modal,
  Pagination,
  Space,
  Table,
} from "antd";
import Search from "antd/es/input/Search";
import { useEffect, useState } from "react";
import { useCallback } from "react";
import { Fragment } from "react";
import { Link } from "react-router-dom";
import { LIMIT } from "../const";
import request from "../server";

const TeacherPage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoding] = useState(false);
  const [error, setError] = useState(null);
  const [form] = Form.useForm();
  const [selected, setSelected] = useState(null);
  const [modalLoading, setModalLoading] = useState(false);
  const [activePage, setActivePage] = useState(1)
  const [total, setTotal] = useState(1)
  const [search, setSearch] = useState("");

console.log(search);

  const getData = useCallback(async () => {
    try {
      setLoding(true);
      let params={
        page: activePage,
        limit: LIMIT,
      }
      let { data } = await request.get("teacher", {params});
      let { data: totalData } = await request.get("teacher");
      setTotal(totalData.length);
      data = data.map((el)=>{
        el.key = el.id
        return el
      })
      setData(data);
    } catch (err) {
      setError(err);
    } finally {
      setLoding(false);
    }
  }, [activePage])

  useEffect(() => {
    getData();
  }, [getData]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    form.resetFields()
    setSelected(null)
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    try {
      setModalLoading(true)
      let values = await form.validateFields();
      if(selected === null){
        await request.post("teacher", values);
      }
      else{
        await request.put(`teacher/${selected}`, values)
      }
      getData();
      setIsModalOpen(false);
    } catch (err) {
      console.log(err);
    } finally{
      setModalLoading(false)
    }
  };

  const close = () => {
    setIsModalOpen(false);
  };
  const editTeacher = async(id) => {
    try{
      setIsModalOpen(true)
      setSelected(id)
      let {data} = await request.get(`teacher/${id}`);
      form.setFieldsValue(data)
    }
    catch(err){
      console.log(err);
    }
  }
  const deleteTeacher = async(id) => {
    Modal.confirm({
      title: "Do you want to delete this teacher?",
      onOk: async () => {
        await request.delete(`teacher/${id}`);
        getData();
      },
    });
   
  }
  console.log(error);
  const columns = [
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (data) => {
        return <Image height={50} src={data} />;
      },
    },
    {
      title: "First Name",
      dataIndex: "firstName",
      key: "firstName",
    },
    {
      title: "Last Name",
      dataIndex: "lastName",
      key: "lastName",
    },
    {
      title: "Phone Number",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Is married",
      dataIndex: "isMarried",
      key: "isMarried",
      render: (data) => (data ? "Yes" : "No"),
    },

    {
      title: "Action",
      key: "id",
      dataIndex:"id",
      render: (data) => (
        <Space size="middle">
          <Button onClick={()=>editTeacher(data)} type="primary">Edit</Button>
          <Button onClick={()=>deleteTeacher(data)} danger type="primary">
            Delete
          </Button>
          <Link to={`/teachers/${data}`} type="primary">
            See Students
          </Link>
        </Space>
      ),
    },
  ];
  const onSearch = (value) => {
    setSearch(value);
  };
  return (
    <Fragment>
      <Table
        scroll={{
          x: 1000,
        }}
        title={() => (
          <Flex justify="space-between" align="center">
            <h1>Teachers ({total})</h1>
            <Flex align="center">
            <Search
              placeholder="Searching .."
              // enterButton="Search"
              onSearch={onSearch}
              onChange={(e) => setSearch(e.target.value)}
              size="large"
              // style={{padding: "0px 250px"}}
            />
            <Button onClick={showModal} type="dashed">
              Add teacher
            </Button>
            </Flex>
          </Flex>
        )}
        loading={loading}
        dataSource={data}
        columns={columns}
        pagination={false}
      /><Pagination current={activePage} total={total} onChange={(page)=> setActivePage(page)}></Pagination>
      
      <Modal
        title="Teacher Data"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={close}
        okText={selected === null ? "Add teacher" : "Save teacher"}
        confirmLoading={modalLoading}
        initialValues={{ isMarried: false }}
      >
        <Form
          form={form}
          name="basic"
          labelCol={{
            span: 24,
          }}
          wrapperCol={{
            span: 24,
          }}
          autoComplete="off"
        >
          <Form.Item
            label="First Name"
            name="firstName"
            rules={[
              {
                required: true,
                message: "Please fill!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Last Name"
            name="lastName"
            rules={[
              {
                required: true,
                message: "Please fill!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Phone Number"
            name="phoneNumber"
            rules={[
              {
                required: true,
                message: "Please fill!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: "Please fill!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Image URL"
            name="image"
            rules={[
              {
                required: true,
                message: "Please fill!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="isMarried"
            valuePropName="checked"
            wrapperCol={{
              span: 24,
            }}
          >
            <Checkbox>Is married</Checkbox>
          </Form.Item>
        </Form>
      </Modal>
    </Fragment>
  );
};

export default TeacherPage;
