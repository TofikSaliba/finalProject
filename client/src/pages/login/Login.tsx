import { useState, useEffect } from "react";
import serverAPI from "../../api/serverApi";
import { useUser } from "../../contexts/User.context";
import CustomInput from "../../components/customInput/CustomInput";
import { StyledForm } from "../../components/styledForm/StyledForm";
import { StyledButton } from "../../components/styledButton/StyledButton";

function Login() {
  const { currentUser, setCurrentUser, setToken } = useUser();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

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
    setSubmitting(true);
    try {
      const { data } = await serverAPI().post("/users/login", form);
      console.log(data);
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
      setSubmitting(false);
    }
  };

  return (
    <>
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
        <StyledButton disabled={submitting}>Submit</StyledButton>
        <div>{error}</div>
      </StyledForm>
    </>
  );
}

export default Login;
