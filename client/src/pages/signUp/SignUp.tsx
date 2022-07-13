import { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import serverAPI from "../../api/serverApi";
import { useUser } from "../../contexts/User.context";
import { usePreferences } from "../../contexts/Preferences.context";
import CustomInput from "../../components/customInput/CustomInput";
import { StyledForm } from "../../components/styledForm/StyledForm";
import { StyledButton } from "../../components/styledButton/StyledButton";
import { StyledRadioInput } from "./styledRadioInput";
import MapSearchInput from "../../components/mapSearchInput/MapSearchInput";
import { getGeocode, getLatLng } from "use-places-autocomplete";

interface signUpFields {
  name: string;
  email: string;
  password: string;
  helper: boolean;
}

function SignUp() {
  const { currentUser, setCurrentUser, setToken } = useUser();
  const [form, setForm] = useState<signUpFields>({
    name: "",
    email: "",
    password: "",
    helper: false,
  });
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [address, setAddress] = useState("");
  const { isLoading, setIsLoading, isLoaded } = usePreferences();

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
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
    if (form.password !== confirmPassword) {
      return setError("Passwords do not match!");
    }
    let errorOccured = false;
    let latitude = 0,
      longitude = 0;
    try {
      const results = await getGeocode({ address });
      const { lat, lng } = getLatLng(results[0]);
      latitude = lat;
      longitude = lng;
    } catch (err) {
      errorOccured = true;
      setError("Invalid Address!");
    }
    if (errorOccured) return;
    setIsLoading(true);
    try {
      const { data } = await serverAPI().post("/users/signUp", {
        ...form,
        coords: { lat: latitude, lng: longitude },
        address,
      });
      setCurrentUser(data.newUser);
      setToken(data.token);
      setForm({
        name: "",
        email: "",
        password: "",
        helper: false,
      });
      setConfirmPassword("");
      setError("");
    } catch (err: any) {
      console.log(err);
      setError(err.response.data.message || err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRadio = (e: any) => {
    let help = e.target.id === "helper" ? true : false;
    setForm((prev) => {
      return { ...prev, helper: help };
    });
  };

  if (currentUser && !isLoading) {
    return <Redirect to="/" />;
  }

  return (
    <>
      {!isLoading && isLoaded && (
        <StyledForm onSubmit={handleSubmit}>
          <h1>Register an account</h1>
          <CustomInput
            id={"name"}
            onChange={handleChange}
            type="text"
            value={form.name}
            inputLabel="Full Name"
            required={true}
          />
          <CustomInput
            id={"email"}
            onChange={handleChange}
            type="email"
            value={form.email}
            inputLabel="Email"
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
          <CustomInput
            id={"confirmPassword"}
            onChange={(e: any) => setConfirmPassword(e.target.value)}
            type="password"
            value={confirmPassword}
            inputLabel="Confirm Password"
            required={true}
          />
          <MapSearchInput sendValue={address} setSendValue={setAddress} />
          <h4>Account type</h4>
          <StyledRadioInput>
            <input
              onChange={handleRadio}
              name="accType"
              id="helper"
              type="radio"
              required
            />
            <label htmlFor="helper">Here to help</label>
            <input
              name="accType"
              onChange={handleRadio}
              id="helped"
              type="radio"
              required
            />
            <label htmlFor="helped">
              Here to <span>get</span> help
            </label>
          </StyledRadioInput>
          <StyledButton disabled={isLoading}>Submit</StyledButton>
          <div className="error">{error}</div>
        </StyledForm>
      )}
    </>
  );
}

export default SignUp;
