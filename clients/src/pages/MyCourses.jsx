import { useEffect, useState } from "react";
import instance from "../axiosInstance";
import CardMyCourse from "../components/CardMyCourse";
import Swal from "sweetalert2";

export default function MyCourses() {
  const [myCourse, setMyCourse] = useState([]);

  async function getMyCourse() {
    try {
      const { data } = await instance.get("/mycourses", {
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });

      setMyCourse(data);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.response.data.message,
      });
    }
  }

  useEffect(() => {
    getMyCourse();
  }, []);
  return (
    <>
      {/* My Course */}
      <div className="container my-4">
        <h3 className="text-center my-4">My Courses</h3>
        <div className="row">
          {myCourse.map((el) => {
            return <CardMyCourse key={el.id} myCourse={el} />;
          })}
        </div>
      </div>
    </>
  );
}
