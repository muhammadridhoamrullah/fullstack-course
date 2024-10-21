import Swal from "sweetalert2";
import instance from "../axiosInstance";

// const { createSlice } = require("@reduxjs/toolkit");

import { createSlice } from "@reduxjs/toolkit";

const courseSlice = createSlice({
  name: "course",
  initialState: {
    data: [],
  },
  reducers: {
    fetchDataCourse: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { fetchDataCourse } = courseSlice.actions;

export function getCoursesData() {
  return async function (dispatch) {
    try {
      const { data } = await instance.get("/courses", {
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });

      dispatch(fetchDataCourse(data));
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.response.data.message,
      });
    }
  };
}

export default courseSlice.reducer;
