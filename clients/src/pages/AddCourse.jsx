import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import instance from "../axiosInstance";
import { useNavigate, useParams } from "react-router-dom";

export default function AddCourse() {
  const navigate = useNavigate();
  const [addCourse, setAddCourse] = useState([]);

  const changeHandler = (e) => {
    const params = useParams();
    const { name, value } = e.target;

    setAddCourse({
      ...addCourse,
      [name]: value,
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const { data } = await instance.post(
        `/mycourses/${params.id}`,
        addCourse,
        {
          headers: {
            Authorization: `Bearer ${localStorage.access_token}`,
          },
        }
      );

      //   console.log(params.id, "params");
      setAddCourse(data);
      navigate("/mycourses");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.response.data.message,
      });
    }
  };

  async function getCourse() {
    try {
      const { data } = await instance.get("/courses", {
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });

      setAddCourse(data);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.response.data.message,
      });
    }
  }

  useEffect(() => {
    getCourse();
  }, []);
  return (
    <>
      {/* Form Add Course */}
      <div className="container mt-5">
        <div className="border w-50 p-5 mx-auto">
          <h2 className="text-center mb-3">Select Course</h2>
          <form onSubmit={submitHandler}>
            <div className="mb-3">
              <label htmlFor="course" className="form-label">
                Course Name
              </label>

              <select
                className="form-select"
                id="course"
                name="course"
                value={addCourse.course}
                onChange={changeHandler}
              >
                {addCourse.map((option) => (
                  <option value={option.id}>{option.title}</option>
                ))}
              </select>
            </div>
            <div className="mb-3">
              <button className="btn btn-primary" type="submit">
                Enroll
              </button>
            </div>
          </form>
        </div>
      </div>
      {/* End Form Add Course */}
    </>
  );
}
