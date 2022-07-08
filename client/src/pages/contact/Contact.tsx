import { useState } from "react";
import { StyledContactForm } from "./styledContactForm";
import CustomInput from "../../components/customInput/CustomInput";
import { StyledInputContainer } from "../../components/customInput/styledInputContainer";
import { StyledButton } from "../../components/styledButton/StyledButton";
import serverAPI from "../../api/serverApi";

function Contact() {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    subject: "",
    description: "",
  });
  const [submitMsg, setSubmitMsg] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e: any) => {
    setForm((prev) => {
      return { ...prev, [e.target.id]: e.target.value };
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await serverAPI().post("/contact/submit", form);
      setForm({
        fullName: "",
        subject: "",
        email: "",
        description: "",
      });
      setSubmitMsg("Success! we will get back to you soon.");
    } catch (err: any) {
      console.log(err.message);
      setSubmitMsg(err.response.data || err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <StyledContactForm onSubmit={handleSubmit}>
        <h1>Contact Us</h1>
        <CustomInput
          id="fullName"
          onChange={handleChange}
          type="text"
          value={form.fullName}
          inputLabel="Full Name"
          required={true}
        />
        <CustomInput
          id="email"
          onChange={handleChange}
          type="email"
          value={form.email}
          inputLabel="Email"
          required={true}
        />
        <CustomInput
          id="subject"
          onChange={handleChange}
          type="text"
          value={form.subject}
          inputLabel="Subject"
          required={true}
        />
        <StyledInputContainer>
          <textarea
            id="description"
            onChange={handleChange}
            value={form.description}
            required={true}
          />
          <label htmlFor="description">Description</label>
        </StyledInputContainer>
        <StyledButton disabled={submitting}>Submit</StyledButton>
        <div>{submitMsg}</div>
      </StyledContactForm>
    </>
  );
}

export default Contact;
