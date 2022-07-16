import { useState, useEffect } from "react";
import serverAPI from "../../api/serverApi";
import { useUser } from "../../contexts/User.context";
import { usePreferences } from "../../contexts/Preferences.context";
import CustomInput from "../../components/customInput/CustomInput";
import { StyledForm } from "../../components/styledForm/StyledForm";
import { StyledButton } from "../../components/styledButton/StyledButton";

interface LoginFields {
  email: string;
  password: string;
}

function Login() {
  const { setCurrentUser, setToken } = useUser();
  const [form, setForm] = useState<LoginFields>({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const { isLoading, setIsLoading } = usePreferences();

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, [setIsLoading]);

  const handleChange = (e: any) => {
    setForm((prev) => {
      return { ...prev, [e.target.id]: e.target.value };
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (form.password.length < 6) {
      return setError("Password length must be at least 6");
    }
    setIsLoading(true);
    try {
      const { data } = await serverAPI().post("/users/login", form);
      setCurrentUser(data.user);
      setToken(data.token);
      setForm({
        email: "",
        password: "",
      });
      setError("");
    } catch (err: any) {
      console.log(err);
      setError(err.response.data.message || err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {!isLoading && (
        <StyledForm onSubmit={handleSubmit}>
          <h1>Login</h1>
          <CustomInput
            id={"email"}
            onChange={handleChange}
            type="email"
            value={form.email}
            inputLabel="email"
            required={true}
          />
          <CustomInput
            id={"password"}
            onChange={handleChange}
            type="password"
            value={form.password}
            inputLabel="password"
            required={true}
          />
          <StyledButton disabled={isLoading}>Submit</StyledButton>
          <div className="error">{error}</div>
        </StyledForm>
      )}
    </>
  );
}

export default Login;
