import Swal from "sweetalert2";
import instance from "../axiosInstance";

export function loginSlice(loginForm, navigate) {
  return async function () {
    try {
      const { data } = await instance.post("/login", loginForm);

      localStorage.access_token = data.access_token;

      navigate("/");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.response.data.message,
      });
    }
  };
}
