import { useEffect, useState } from "react";
import serverAPI from "../../api/serverApi";
import CustomInput from "../../components/customInput/CustomInput";
import { StyledInputContainer } from "../../components/customInput/styledInputContainer";
import { StyledButton } from "../../components/styledButton/StyledButton";
import { usePreferences } from "../../contexts/Preferences.context";
import { useUser } from "../../contexts/User.context";
import { headerOptions } from "../../types/types";
import { StyledForm } from "../../components/styledForm/StyledForm";
import { Redirect } from "react-router-dom";

function EditProfile() {
  const [form, setForm] = useState({
    name: "",
    img: "",
    age: "",
    bio: "",
    password: "",
  });
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [redirect, setRedirect] = useState(false);
  const { currentUser, setCurrentUser, token } = useUser();
  const { isLoading, setIsLoading } = usePreferences();

  useEffect(() => {
    if (currentUser) {
      setForm({
        name: currentUser.name,
        img: currentUser.img ?? "",
        age: currentUser.age ?? "",
        bio: currentUser.bio ?? "",
        password: "",
      });
      setIsLoading(false);
    }
  }, [currentUser, setIsLoading]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (form.password.length > 0 && form.password.length < 6) {
      return setError("Password must be at least 6 in length!");
    }
    if (form.password !== confirmPassword) {
      return setError("Passwords do not match!");
    }
    setIsLoading(true);
    const options: headerOptions = {
      headers: {
        Authorization: token!,
      },
    };
    try {
      const { data } = await serverAPI(options).patch(
        "/users/editProfile",
        form
      );
      setCurrentUser(data.updatedUser);
      setRedirect(true);
    } catch (err: any) {
      setIsLoading(false);
      console.log(err.message);
    }
  };

  const handleChange = (e: any) => {
    setForm((prev) => {
      return { ...prev, [e.target.id]: e.target.value };
    });
  };

  if (isLoading) return <></>;

  if (redirect) return <Redirect to="/profile" />;

  return (
    <StyledForm onSubmit={handleSubmit}>
      <h2>Edit Profile Info</h2>
      <CustomInput
        id={"name"}
        onChange={handleChange}
        type="text"
        value={form.name}
        inputLabel="Full Name"
        required={true}
      />
      <CustomInput
        id={"password"}
        onChange={handleChange}
        type="password"
        value={form.password}
        inputLabel="Password(optional)"
      />
      <CustomInput
        id={"confirmPassword"}
        onChange={(e: any) => setConfirmPassword(e.target.value)}
        type="password"
        value={confirmPassword}
        inputLabel="Confirm Password"
      />

      <CustomInput
        id={"img"}
        onChange={handleChange}
        type="URL"
        value={form.img}
        inputLabel="image URL"
      />
      <CustomInput
        id={"age"}
        onChange={handleChange}
        type="text"
        value={form.age}
        inputLabel="age"
      />
      <StyledInputContainer>
        <textarea onChange={handleChange} value={form.bio} id="bio" />
        <label className={form.bio && "filled"} htmlFor="description">
          Your bio here...
        </label>
      </StyledInputContainer>
      <StyledButton>Save</StyledButton>

      <div>{error}</div>
    </StyledForm>
  );
}

export default EditProfile;
