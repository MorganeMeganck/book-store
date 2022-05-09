import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Stack, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useNavigate } from "react-router-dom";
import * as yup from "yup";
import Footer from "../../components/Footer/Footer";
import NavbarComp from "../../components/NavbarComp/NavbarComp";
import TitlePage from "../../components/TitlePage";
import { useRedirectLogUser } from "../../hooks/redirect-hook";
import { userRegister } from "../../store/actions/UserAction";

const registerSchema = yup
  .object({
    email: yup.string().trim().email().required(),
    password: yup.string().required(),
    passwordConfirm: yup
      .string()
      .required()
      .oneOf([yup.ref("password")]),
  })
  .required();

const RegisterPage = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
      passwordConfirm: "",
    },
    resolver: yupResolver(registerSchema),
    reValidateMode: "onSubmit",
  });

  const onSubmit = ({ email, password }) => {
    dispatch(userRegister({ email, password }));
    location.href = "/login";
  };

  return (
    <>
      <NavbarComp />
      <div className="boxGlass text-white container p-5">
        <TitlePage content="Register" />
        <form className="mt-3" onSubmit={handleSubmit(onSubmit)}>
          <Stack gap="20px">
            <Controller
              render={({ field }) => (
                <TextField
                  error={errors.email}
                  fullWidth
                  label="Email"
                  {...field}
                />
              )}
              name="email"
              control={control}
              defaultValue=""
            />
            <Controller
              render={({ field }) => (
                <TextField
                  error={errors.password}
                  fullWidth
                  label="Password"
                  type="password"
                  {...field}
                />
              )}
              name="password"
              control={control}
              defaultValue=""
            />
            <Controller
              render={({ field }) => (
                <TextField
                  error={errors.passwordConfirm}
                  fullWidth
                  label="Confirmation"
                  type="password"
                  {...field}
                />
              )}
              name="passwordConfirm"
              control={control}
              defaultValue=""
            />

            <Box alignSelf="flex-start">
              <button
                className="btn btn-light text-primary fw-bold"
                variant="contained"
                type="submit"
              >
                Envoyer
              </button>
            </Box>
          </Stack>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default RegisterPage;
