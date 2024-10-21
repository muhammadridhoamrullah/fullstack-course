import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import instance from "../axiosInstance";
import CardCourse from "../components/CardCourse";
import { useDispatch, useSelector } from "react-redux";
import { getCoursesData } from "../store/courseSlice";

export default function Courses() {
  const data = useSelector((state) => {
    return state.courseSlice.data;
  });

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCoursesData());
  }, []);
  return (
    <>
      {/* Course */}
      <div className="container my-4">
        <h3 className="text-center my-4">List Hacktiv8 Courses</h3>
        <div className="row">
          {data.map((el) => {
            return <CardCourse key={el.id} course={el} />;
          })}
        </div>
      </div>
    </>
  );
}
