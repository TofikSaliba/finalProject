import { useEffect } from "react";
import { usePreferences } from "../../contexts/Preferences.context";

function About() {
  const { setIsLoading } = usePreferences();

  useEffect(() => {
    setIsLoading(false);
  }, [setIsLoading]);

  return <div>About</div>;
}

export default About;
