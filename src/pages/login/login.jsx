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

const loginSchema = yup
  .object({
    login: yup.string().trim().required(),
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
      login: "",
      password: "",
    },
    resolver: yupResolver(loginSchema),
    reValidateMode: "onSubmit",
  });

  const onSubmit = ({ login, password }) => {
    dispatch(userLogin({ identifier: login, password }));
  };
  const navigate = useNavigate();

  return (
    <>
      <button onClick={() => navigate(-1)}>go back</button>
      <TitlePage content="Login" />
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box gap="20px" display="flex" flexDirection="column">
          <Controller
            render={({ field }) => (
              <TextField
                error={errors.login}
                fullWidth
                label="Login / E-mail"
                {...field}
              />
            )}
            name="login"
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
            <Button variant="contained" type="submit">
              Envoyer
            </Button>
          </Box>
        </Box>
      </form>
    </>
  );
};

export default LoginPage;
