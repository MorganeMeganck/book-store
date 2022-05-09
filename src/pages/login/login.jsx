import { Box, Button, TextField } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRedirectLogUser } from "../../hooks/redirect-hook";
import { userClearError, userLogin } from "../../store/actions/UserAction";
import TitlePage from "../../components/TitlePage";
import NavbarComp from "../../components/NavbarComp/NavbarComp";
import Footer from "../../components/Footer/Footer";

const loginSchema = yup
  .object({
    email: yup.string().trim().required(),
    password: yup.string().required(),
  })
  .required();

const LoginPage = () => {
  useRedirectLogUser();

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(userClearError);
  }, []);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(loginSchema),
    reValidateMode: "onSubmit",
  });

  const onSubmit = ({ email, password }) => {
    dispatch(userLogin({ email, password }));
  };
  const navigate = useNavigate();

  return (
    <>
      <NavbarComp />
      <div className="boxGlass text-white container p-5">
        <TitlePage content="Login" />
        <form className="mt-3" onSubmit={handleSubmit(onSubmit)}>
          <Box gap="20px" display="flex" flexDirection="column">
            <Controller
              render={({ field }) => (
                <TextField
                  error={errors.email}
                  fullWidth
                  label="Login / E-mail"
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

            <Box alignSelf="flex-start">
              <button
                className="btn btn-light text-primary fw-bold"
                variant="contained"
                type="submit"
              >
                Envoyer
              </button>
            </Box>
          </Box>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default LoginPage;
