import { create, useStore } from "zustand";
import { employeeData } from "../mock";

const initialState = {
  displayEdit: false,
  displayModalEdit: false,
  currentEmployeeData: {},
  employeeData,
};

export const useEmployeeStore = create((set) => ({
  displayEdit: initialState.displayEdit,
  displayModalEdit: initialState.displayModalEdit,
  currentEmployeeData: initialState.currentEmployeeData,
  employeeData: initialState.employeeData,
  showEdit: (currentEmployeeData) => {
    console.log({ currentEmployeeData });
    set((state) => {
      return {
        ...state,
        currentEmployeeData,
        displayEdit: true,
        displayModalEdit: false,
      };
    });
  },
  showModalEdit: (currentEmployeeData) => {
    set((state) => {
      return {
        ...state,
        currentEmployeeData,
        displayEdit: false,
        displayModalEdit: true,
      };
    });
  },
  resetState: () => {
    set((state) => {
      return {
        ...state,
        displayEdit: false,
        displayModalEdit: false,
        currentEmployeeData: {},
      };
    });
  },
  saveEditData: (empRecord) => {
    set((state) => {
      const updatedData = state.employeeData?.map((element) => {
        if (element.id === empRecord.id) {
          return empRecord;
        } else {
          return element;
        }
      });
      return {
        ...state,
        employeeData: updatedData,
        displayModalEdit: false,
        displayEdit: false,
      };
    });
  },
}));
