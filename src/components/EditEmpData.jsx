import { Modal } from "antd";
import "antd/dist/antd.css";
import EmpFormData from "./EmpFormData";
import { useEmployeeStore } from "../store";

const EditEmpData = () => {
  const { resetState, displayEdit, displayModalEdit } = useEmployeeStore(
    (state) => {
      return {
        resetState: state.resetState,
        displayEdit: state.displayEdit,
        displayModalEdit: state.displayModalEdit,
      };
    }
  );

  return (
    <>
      {displayEdit && <EmpFormData />}
      <Modal
        open={displayModalEdit}
        onCancel={resetState}
        footer={null}
        width={"90vw"}
        centered
      >
        <EmpFormData />
      </Modal>
    </>
  );
};

export default EditEmpData;
