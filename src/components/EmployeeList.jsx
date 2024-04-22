import { useState } from "react";
import {
  Table,
  Button,
  Form,
  Typography,
  Popconfirm,
  InputNumber,
  Input,
  DatePicker,
  Select,
} from "antd";
import "antd/dist/antd.css";
import moment from "moment";
import { useEmployeeStore } from "../store";

const formItemStyle = {
  marginBottom: 0,
};

const EmployeeList = () => {
  const {
    currentEmpData,
    employeeData,
    showEdit,
    showModalEdit,
    saveEditData,
  } = useEmployeeStore((state) => {
    return {
      currentEmpData: state.currentEmployeeData,
      employeeData: state.employeeData,
      showEdit: state.showEdit,
      showModalEdit: state.showModalEdit,
      saveEditData: state.saveEditData,
    };
  });
  const { joiningDate } = currentEmpData;
  const formattedJoiningDate = moment(joiningDate, "DD-MM-YYYY").toDate();

  const [currentRecordId, setCurrentRecordId] = useState("");
  const isEditing = (record) => record.id === currentRecordId;
  const [form] = Form.useForm();

  const edit = (record) => {
    const { joiningDate, ...rest } = record;
    form.setFieldsValue({
      joiningDate: moment(joiningDate, "DD-MM-YYYY"),
      ...rest,
    });
    setCurrentRecordId(record.id);
  };

  const cancel = () => {
    setCurrentRecordId("");
  };

  const onFinish = (values) => {
    const { joiningDate, ...rest } = values;
    saveEditData({
      ...rest,
      joiningDate: moment(joiningDate).format("DD-MM-YYYY"),
    });
    setCurrentRecordId("");
  };

  const columns = [
    {
      dataIndex: "id",
      title: "ID",
      width: "10%",
      render: (text, record) => {
        if (currentRecordId === record.id) {
          return (
            <Form.Item name="id" style={formItemStyle}>
              <Input disabled />
            </Form.Item>
          );
        } else {
          return <>{text}</>;
        }
      },
    },
    {
      dataIndex: "name",
      title: "Name",
      width: "15%",
      render: (text, record) => {
        if (currentRecordId === record.id) {
          return (
            <Form.Item
              name="name"
              shouldUpdate
              rules={[
                {
                  required: true,
                  message: "Name Cannot Be Empty!",
                },
              ]}
              style={formItemStyle}
            >
              <Input />
            </Form.Item>
          );
        } else {
          return <>{text}</>;
        }
      },
    },
    {
      dataIndex: "emailId",
      title: "Email",
      width: "15%",
      render: (text, record) => {
        if (currentRecordId === record.id) {
          return (
            <Form.Item
              name="emailId"
              rules={[
                {
                  required: true,
                  message: "Email Cannot Be Empty!",
                },
                {
                  type: "email",
                  message: `Please Enter Valid Email!`,
                },
              ]}
              style={formItemStyle}
            >
              <Input />
            </Form.Item>
          );
        } else {
          return <>{text}</>;
        }
      },
    },
    {
      dataIndex: "aadharNumber",
      title: "Aadhar",
      align: "center",
      width: "10%",
      render: (text, record) => {
        if (currentRecordId === record.id) {
          return (
            <Form.Item
              name="aadharNumber"
              rules={[
                { required: true, message: "Aadhar Cannot Be Empty!" },
                {
                  pattern: /^\d{10}$/,
                  message: "Aadhar should be of 10 digits",
                },
              ]}
              style={formItemStyle}
            >
              <InputNumber style={{ width: "100%" }} placeholder="Aadhar" />
            </Form.Item>
          );
        } else {
          return <>{text}</>;
        }
      },
    },
    {
      dataIndex: "panNumber",
      title: "PAN",
      align: "center",
      width: "10%",
      render: (text, record) => {
        if (currentRecordId === record.id) {
          return (
            <Form.Item
              name="panNumber"
              rules={[
                { required: true, message: "PAN Number Cannot Be Empty!" },
                {
                  pattern: /^[A-Za-z0-9]{10}$/,
                  message: "PAN number should only be an Alpha-Numeric",
                },
              ]}
              style={formItemStyle}
            >
              <Input placeholder="PAN" />
            </Form.Item>
          );
        } else {
          return <>{text}</>;
        }
      },
    },
    {
      dataIndex: "employeeType",
      title: "Emp Type",
      align: "center",
      width: "10%",
      render: (text, record) => {
        if (currentRecordId === record.id) {
          return (
            <Form.Item
              name="employeeType"
              rules={[
                { required: true, message: `Please select at least one!` },
              ]}
              style={formItemStyle}
            >
              <Select
                options={[
                  {
                    value: "Full-Time",
                    label: "Full-Time",
                  },
                  {
                    value: "Part-Time",
                    label: "Part-Time",
                  },
                ]}
              />
            </Form.Item>
          );
        } else {
          return <>{text}</>;
        }
      },
    },
    {
      dataIndex: "joiningDate",
      title: "Joining Date",
      align: "center",
      width: "10%",
      render: (text, record) => {
        if (currentRecordId === record.id) {
          return (
            <Form.Item
              rules={[
                { required: true, message: "Please Select A Valid Date!" },
              ]}
              name="joiningDate"
              style={formItemStyle}
            >
              <DatePicker
                format={"DD-MM-YYYY"}
                defaultValue={moment(formattedJoiningDate)}
                disabledDate={(current) =>
                  current &&
                  current >
                    moment(record.joiningDate, "DD-MM-YYYY").endOf("day")
                }
              />
            </Form.Item>
          );
        } else {
          return <>{text}</>;
        }
      },
    },
    {
      title: "Edit",
      dataIndex: "operation",
      align: "center",
      width: "10%",
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Button htmlType="submit" type="link">
              Save
            </Button>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <a>Cancel</a>
            </Popconfirm>
          </span>
        ) : (
          <Typography.Link
            disabled={currentRecordId !== ""}
            onClick={() => edit(record)}
          >
            Edit
          </Typography.Link>
        );
      },
    },
    {
      dataIndex: "formEdit",
      title: "Form Edit",
      align: "center",
      width: "10%",
      render: (text, record) => {
        return (
          <Button
            type="primary"
            size="small"
            shape="round"
            onClick={() => showEdit(record)}
          >
            Form Edit
          </Button>
        );
      },
    },
    {
      dataIndex: "modalEdit",
      title: "Modal Edit",
      align: "center",
      width: "10%",
      render: (text, record) => {
        return (
          <Button
            type="primary"
            size="small"
            shape="round"
            onClick={() => showModalEdit(record)}
          >
            Modal Edit
          </Button>
        );
      },
    },
  ];

  return (
    <div style={{ padding: 20 }}>
      <Form form={form} onFinish={onFinish}>
        <Table
          size="small"
          columns={columns}
          rowKey={(record) => record.id}
          dataSource={employeeData}
          bordered
          pagination={false}
        />
      </Form>
    </div>
  );
};

export default EmployeeList;
