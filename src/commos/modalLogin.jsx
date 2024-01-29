import React, { useState } from "react";
import axios from "axios";

import {
  Box,
  Modal,
  Alert,
  TextField,
  InputAdornment,
  Stack,
  Button,
  Typography,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CloseIcon from "@mui/icons-material/Close";
import { useFormik } from "formik";
import * as Yup from "yup";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { setModalState } from "../redux/modal.slice";
import { setModalRegisterState } from "../redux/modalRegister.slice";
import { setUser } from "../redux/user.slice";

function ModalLogin() {
  const modalOpen = useSelector((state) => state.modal).modalOpen;
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState("password");

  const handleShowPassword = () => {
    if (showPassword === "password") {
      setShowPassword("text");
    } else {
      setShowPassword("password");
    }
  };

  const handleModal = () => {
    dispatch(setModalState({ modalOpen: false }));
    singUpForm.resetForm();
    setErrorMessage("");
  };

  const handleModalRegister = () => {
    dispatch(setModalState({ modalOpen: false }));
    dispatch(setModalRegisterState({ modalOpen: true }));
  };

  const singUpForm = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("invalid email").required("email is required"),

      password: Yup.string().required("password is required"),
    }),

    onSubmit: (values) => {
      axios
        .post(
          "http://localhost:3000/api/user/login",
          {
            email: values.email,
            password: values.password,
          },
          { withCredentials: true }
        )

        .then((response) => {
          axios;
          dispatch(setUser(response.data.payload));

          return response.data.payload.email;
        })
        .then((email) => {
          axios
            .get(`http://localhost:3000/api/user/info/${email}`, {
              withCredentials: true,
            })
            .then((res) => {
              dispatch(setUser(res.data));
              toast.success("Login ok");
              singUpForm.resetForm();
              handleModal();
            });
        })

        .catch((error) => {
          const captureError =
            error.response.data.errors[0].msg ||
            error.response.data.errors ||
            "An error occurred during registration";
          setErrorMessage(captureError);

          console.log(error);
        });
    },
  });

  return (
    <Modal
      open={modalOpen}
      sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
    >
      <Box
        component="form"
        onSubmit={singUpForm.handleSubmit}
        sx={{
          backgroundColor: "#080f28",

          width: "30vw",
          height: "60vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between",
          borderRadius: "5%",
          "& .MuiInput-underline:before": {
            borderBottomColor: "white", // Cambia el color de la línea antes del input
          },
          "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
            borderBottomColor: "white", // Cambia el color de la línea cuando se pasa el ratón sobre el input
          },
          "& .MuiInput-underline:focus": {
            borderBottomColor: "white", // Cambia el color de la línea después del input
          },
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "end", width: "100%" }}>
          {" "}
          <CloseIcon
            onClick={handleModal}
            sx={{
              color: "white",
              marginTop: "1%",
              marginRight: "2%",
              "&:hover": { color: "red" },
            }}
          />
        </Box>

        <Typography variant="h4" sx={{ marginTop: "5%", color: "white" }}>
          TMDB
        </Typography>

        <Stack spacing={1} sx={{ width: "50%", marginTop: "5%" }}>
          <TextField
            label="Email"
            type="email"
            required
            value={singUpForm.values.email}
            onChange={singUpForm.handleChange}
            onBlur={singUpForm.handleBlur}
            placeholder=""
            id="email"
            variant="standard"
            fullWidth
            helperText={
              singUpForm.touched.email &&
              singUpForm.errors.email && (
                <p style={{ color: "red" }}>{singUpForm.errors.email}</p>
              )
            }
            InputProps={{
              style: { color: "white" },
              startAdornment: (
                <InputAdornment position="start"></InputAdornment>
              ),
            }}
            InputLabelProps={{
              style: {
                color: "white",
              },
            }}
          />
          <TextField
            label="Password"
            required
            type={showPassword}
            value={singUpForm.values.password}
            onChange={singUpForm.handleChange}
            onBlur={singUpForm.handleBlur}
            placeholder=""
            id="password"
            variant="standard"
            fullWidth
            helperText={
              singUpForm.touched.password &&
              singUpForm.errors.password && (
                <p style={{ color: "red" }}>{singUpForm.errors.password}</p>
              )
            }
            InputProps={{
              style: { color: "white" },
              startAdornment: (
                <InputAdornment position="start"></InputAdornment>
              ),
              endAdornment: <VisibilityIcon onClick={handleShowPassword} />,
            }}
            InputLabelProps={{
              style: {
                color: "white",
              },
            }}
          />
        </Stack>
        {errorMessage && (
          <Box sx={{ marginTop: 2 }}>
            <Alert
              severity="error"
              variant="outlined"
              sx={{ color: "#ea0505" }}
            >
              {errorMessage}
            </Alert>
          </Box>
        )}
        <Button
          type="submit"
          variant="contained"
          sx={{ margin: "5% 0", backgroundColor: "#ea0505" }}
        >
          Login
        </Button>
        <Button
          onClick={handleModalRegister}
          variant="text"
          sx={{ margin: "1% 0", marginBottom: "3%" }}
        >
          Singup
        </Button>
      </Box>
    </Modal>
  );
}

export default ModalLogin;
