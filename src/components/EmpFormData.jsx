import {
  Input,
  Button,
  Col,
  Row,
  Form,
  DatePicker,
  Select,
  InputNumber,
  Typography,
} from "antd";
import moment from "moment";
import { useEffect } from "react";
import { useEmployeeStore } from "../store";

const EmpFormData = () => {
  const { currentEmpData, saveEditData, resetState } = useEmployeeStore(
    (state) => {
      return {
        currentEmpData: state.currentEmployeeData,
        saveEditData: state.saveEditData,
        resetState: state.resetState,
      };
    }
  );

  const { joiningDate, ...employeeData } = currentEmpData;
  const [form] = Form.useForm();

  const onFinish = (values) => {
    const { joiningDate, ...rest } = values;
    saveEditData({
      ...rest,
      joiningDate: moment(joiningDate).format("DD-MM-YYYY"),
    });
  };

  useEffect(() => {
    form.setFieldsValue({
      joiningDate: moment(joiningDate, "DD-MM-YYYY"),
      ...employeeData,
    });
  }, [currentEmpData]);

  return (
    <div style={{ margin: "auto", width: "75vw" }}>
      <Form
        layout="vertical"
        initialValues={{
          joiningDate: moment(joiningDate),
          ...employeeData,
        }}
        form={form}
        onFinish={onFinish}
      >
        <Row gutter={48}>
          <Col xs={24} sm={5}>
            <Typography style={{ textAlign: "left" }}>
              <Typography.Title> Employee Details</Typography.Title>
            </Typography>
          </Col>
          <Col xs={24} sm={19}>
            <Row gutter={[16, 16]}>
              <Col span={4}>
                <Form.Item label="Id" name="id">
                  <Input placeholder="Id" disabled />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  label="Name"
                  name="name"
                  rules={[
                    {
                      required: true,
                      message: "Employee Name Cannot Be Empty!",
                    },
                  ]}
                >
                  <Input placeholder="Employee Name" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Email"
                  name="emailId"
                  rules={[
                    { required: true, message: "Email Cannot Be Empty!" },
                    {
                      type: "email",
                      message: `Please Enter Valid Email!`,
                    },
                  ]}
                >
                  <Input placeholder="Employee Email" />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  label="Aadhar"
                  name="aadharNumber"
                  rules={[
                    { required: true, message: "Aadhar Cannot Be Empty!" },
                    {
                      pattern: /^\d{10}$/,
                      message: "Aadhar should be of 10 digits",
                    },
                  ]}
                >
                  <InputNumber style={{ width: "100%" }} placeholder="Aadhar" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="PAN"
                  name="panNumber"
                  rules={[
                    { required: true, message: "PAN Number Cannot Be Empty!" },
                    {
                      pattern: /^[A-Za-z0-9]{10}$/,
                      message: "PAN number should only be an Alpha-Numeric",
                    },
                  ]}
                >
                  <Input placeholder="PAN" />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={[16]}>
              <Col span={12}>
                <Form.Item
                  rules={[
                    { required: true, message: "Please Select A Valid Date!" },
                  ]}
                  label="Joining Date"
                  name="joiningDate"
                >
                  <DatePicker
                    style={{ width: "100%" }}
                    format="DD-MM-YYYY"
                    disabledDate={(current) =>
                      current &&
                      current > moment(joiningDate, "DD-MM-YYYY").endOf("day")
                    }
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Emp Type"
                  name="employeeType"
                  rules={[
                    { required: true, message: `Please select at least one!` },
                  ]}
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
              </Col>
            </Row>
            <Row gutter={[16, 16]}>
              <Col span={3} offset={18}>
                <Form.Item>
                  <Button
                    block
                    type="primary"
                    shape="round"
                    onClick={resetState}
                  >
                    Cancel
                  </Button>
                </Form.Item>
              </Col>
              <Col span={3}>
                <Form.Item>
                  <Button block type="primary" shape="round" htmlType="submit">
                    Save
                  </Button>
                </Form.Item>
              </Col>
            </Row>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default EmpFormData;
