/* eslint-disable @typescript-eslint/no-unused-vars */
import { useRef, useState, useEffect } from "react";
import { usePreferences } from "../../contexts/Preferences.context";

function Home() {
  const { setIsLoading } = usePreferences();

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, [setIsLoading]);

  return <div style={{ display: "flex", flexDirection: "column" }}></div>;
}

export default Home;
