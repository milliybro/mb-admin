import { Fragment, useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { LIMIT } from "../const";
import request from "../server";
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
 
 
 const TeachersStudent = () => {
    const {teachersId} = useParams();
   const [isModalOpen, setIsModalOpen] = useState(false);
   const [students, setStudents] = useState([]);
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState(false);
   const [selected, setSelected] = useState(null);
   const [modalLoading, setModalLoading] = useState(false);
   const [activePage, setActivePage] = useState(1);
   const [total, setTotal] = useState(0);
   const [search, setSearch] = useState("");
   const [name, setName] = useState([]);
   const [form] = Form.useForm();
 
   const { Search } = Input;
 console.log(error);
 
 
 
   const getStudents = useCallback(async () => {
     try {
       setLoading(true);
       let params = {
         page: activePage,
         limit: LIMIT,
         firstName: search,
       };
       let { data } = await request.get(`teacher/${teachersId}/student`, {
         params,
       });
       let {data: teacherName} = await request.get(`teacher/${teachersId}`);
       setName(teacherName);
       let { data: totalData } = await request.get(
         `teacher/${teachersId}/student?firstName=${search}`
       );
       setTotal(totalData.length);
       data = data.map((el) => {
         el.key = el.id;
         return el;
       });
       setStudents(data);
     } catch (err) {
       setError(err);
     } finally {
       setLoading(false);
     }
   }, [activePage, search, teachersId]);
 
   useEffect(() => {
     getStudents();
   }, [getStudents]);
 
   const showModal = () => {
     form.resetFields();
     setSelected(null);
     setIsModalOpen(true);
   };
 
   const handleOk = async () => {
     try {
       setModalLoading(true);
       let values = await form.validateFields();
       if (selected === null) {
         await request.post(`teacher/${teachersId}/student`, values);
       } else {
         console.log(selected);
         await request.put(`teacher/${teachersId}/student/${selected}`, values);
       }
       getStudents();
       setIsModalOpen(false);
     } catch (err) {
       console.log(err);
     } finally {
       setModalLoading(false);
     }
   };
 
   const closeModal = () => {
     setIsModalOpen(false);
   };
 
   const editStudent = async (id) => {
     try {
       setIsModalOpen(true);
       setSelected(id);
       let { data } = await request.get(`teacher/${teachersId}/student/${id}`);
       form.setFieldsValue(data);
     } catch (err) {
       console.log(err);
     }
   };
 
   const deleteStudent = (id) => {
     console.log(id);
     Modal.confirm({
       title: "Do you want to delete this student ?",
       onOk: async () => {
         await request.delete(`teacher/${teachersId}/student/${id}`);
         getStudents();
       },
     });
   };
 
 
   const onSearch = (value) => {
     setSearch(value);
   };
 
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
        title: "isWork",
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
       <Table
         scroll={{
           x: 1000,
         }}
         title={() => (
           <Fragment>
             <Flex align="center" justify="space-between">
               <h1>Students({total})</h1>
               <Search
               placeholder="Search .."
               onSearch={onSearch}
               onChange={(e) => setSearch(e.target.value)}
               size="large"
               style={{
                  padding: "0px 20px"
               }}
             />
               <Button
                 onClick={showModal}
                 className="modal-btn"
                 type="dashed"
                 size="large"
               >
                 Add student
               </Button>
             </Flex>
             
            <h3>{name.firstName} {name.lastName}</h3>
           </Fragment>
         )}
         loading={loading}
         dataSource={students}
         columns={columns}
         pagination={false}
       />
       <Pagination
         onChange={(page) => setActivePage(page)}
         current={activePage}
         total={total}
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
          name="form"
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
                message: "Please fill!",
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
            className="form-item"
            name="isWork"
            valuePropName="checked"
            wrapperCol={{
              offset: 0,
              span: 16,
            }}
          >
            <Checkbox>isWork</Checkbox>
          </Form.Item>
        </Form>
       </Modal>
     </Fragment>
   );
 };
 
 export default TeachersStudent;