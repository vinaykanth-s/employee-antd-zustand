import EmployeeList from "./components/EmployeeList";
import { Typography } from "antd";
import EditEmpData from "./components/EditEmpData";

const { Title } = Typography;

const App = () => {
  return (
    <>
      <Typography style={{ textAlign: "center" }}>
        <Title> Employee Data - Zustand Implementation</Title>
      </Typography>
      <EmployeeList />
      <EditEmpData />
    </>
  );
};

export default App;
