import axios from "axios";
import { loginStart, loginSuccess } from "./AuthActions";
import Swal from "sweetalert2";

export const login = async (user, dispatch) => {
  dispatch(loginStart());
  try {
    const res = await axios.post("auth/login", user);
    dispatch(loginSuccess(res.data));
  } catch (err) {
    console.log("err response", err.response);
    Swal.fire({
      text: err.response.data,
      confirmButtonText: "OK",
      confirmButtonColor: "#f44336",
      width: "20rem",
    });
  }
};
