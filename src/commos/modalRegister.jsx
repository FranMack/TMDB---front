import React, { useState } from "react";
import axios from "axios";

import {
  Box,
  Modal,
  FormControl,
  FormHelperText,
  Alert,
  TextField,
  InputAdornment,
  Stack,
  Button,
  Avatar,
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
import ModalImageTooLarge from "./ModalImageTooLarge";

function ModalRegister() {
  const modalOpen = useSelector((state) => state.modalRegister).modalOpen;
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState("password");
  const [url_img, setUrl_img] = useState("");
  const [showModal, setShowModal] = useState(false);

  const handleShowPassword = () => {
    if (showPassword === "password") {
      setShowPassword("text");
    } else {
      setShowPassword("password");
    }
  };

  const handleModal = () => {
    dispatch(setModalRegisterState({ modalOpen: false }));
    singUpForm.resetForm();
    setErrorMessage("");
    setUrl_img("");
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const maxSizeInBytes = 1024 * 60;

    if (file && file.size > maxSizeInBytes) {
      setShowModal(true);
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setUrl_img(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const singUpForm = useFormik({
    initialValues: {
      name: "",
      lastname: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      url_img: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .min(1, "firstname minimum 1 character")
        .required("firstname is required"),
      lastname: Yup.string()
        .min(1, "lastname minimum 1 character")
        .required("lastname is required"),
      email: Yup.string().email("invalid email").required("email is required"),
      username: Yup.string()
        .min(4, "username minimum 4 characters")
        .required("username is required"),
      password: Yup.string()
        .min(8, "password minimum 8 characters")
        .matches(
          /^(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
          "password must contain at least one special character"
        )
        .matches(/\d/, "password must contain at least one number")
        .matches(/[a-z]/, "password must contain at least one lowercase letter")
        .matches(/[A-Z]/, "password must contain at least one capital letter")
        .required("password is required"),

      confirmPassword: Yup.string().required("password is required"),
    }),

    onSubmit: (values) => {
      if (values.confirmPassword !== values.password) {
        setErrorMessage("Wrong confirmed password");

        return;
      }

      axios
        .post("http://localhost:3000/api/user/register", {
          name: values.name,
          lastname: values.lastname,
          username: values.username,
          email: values.email,
          password: values.password,
          url_img: url_img,
        })

        .then((res) => {
          console.log(res);
          singUpForm.resetForm();
          toast.success("User created succesfully");
          handleModal();

          dispatch(setModalState({ modalOpen: true }));
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
          display: "flex",
          borderRadius: "5%",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between",
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
        <ModalImageTooLarge
          showModal={showModal}
          handleCloseModal={handleCloseModal}
        />
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

        <Typography variant="h4" sx={{ margin: "5% 0", color: "white" }}>
          Register
        </Typography>

        <input
          id="user_image"
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          onChange={handleImageUpload}
        />
        <label htmlFor="user_image">
          {url_img ? (
            <Avatar
              src={url_img}
              sx={{ height: 110, width: 110, margin: "5% 0" }}
            ></Avatar>
          ) : singUpForm.values.name && singUpForm.values.lastname ? (
            <Avatar sx={{ height: 120, width: 120, margin: "5% 0" }}>
              {`${singUpForm.values.name[0]}${singUpForm.values.lastname[0]}`}
            </Avatar>
          ) : (
            <Avatar sx={{ height: 110, width: 110, margin: "5% 0" }}></Avatar>
          )}
        </label>
        <Stack spacing={1} sx={{ width: "50%", marginTop: "5%" }}>
          <TextField
            label="Name"
            type="text"
            required
            value={singUpForm.values.name}
            onChange={singUpForm.handleChange}
            onBlur={singUpForm.handleBlur}
            placeholder=""
            id="name"
            variant="standard"
            fullWidth
            helperText={
              singUpForm.touched.name &&
              singUpForm.errors.name && (
                <p style={{ color: "red" }}>{singUpForm.errors.name}</p>
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
            label="Lastname"
            type="text"
            required
            value={singUpForm.values.lastname}
            onChange={singUpForm.handleChange}
            onBlur={singUpForm.handleBlur}
            placeholder=""
            id="lastname"
            variant="standard"
            fullWidth
            helperText={
              singUpForm.touched.lastname &&
              singUpForm.errors.lastname && (
                <p style={{ color: "red" }}>{singUpForm.errors.lastname}</p>
              )
            }
            InputProps={{
              style: { color: "white" },
              startAdornment: (
                <InputAdornment position="start"></InputAdornment>
              ),
            }}
          />
          <TextField
            label="Username"
            type="text"
            required
            value={singUpForm.values.username}
            onChange={singUpForm.handleChange}
            onBlur={singUpForm.handleBlur}
            placeholder=""
            id="username"
            variant="standard"
            fullWidth
            helperText={
              singUpForm.touched.username &&
              singUpForm.errors.username && (
                <p style={{ color: "red" }}>{singUpForm.errors.username}</p>
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
          <TextField
            label="Confirm password"
            required
            type="password"
            placeholder=""
            value={singUpForm.values.confirmPassword}
            onChange={singUpForm.handleChange}
            onBlur={singUpForm.handleBlur}
            id="confirmPassword"
            variant="standard"
            fullWidth
            helperText={
              errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>
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
        </Stack>
        {errorMessage && (
          <Box sx={{ marginTop: 2 }}>
            <Alert severity="error" variant="outlined">
              {errorMessage}
            </Alert>
          </Box>
        )}
        <Button
          type="submit"
          variant="contained"
          sx={{ margin: "5% 0", backgroundColor: "#ea0505" }}
        >
          Submit
        </Button>
      </Box>
    </Modal>
  );
}

export default ModalRegister;
