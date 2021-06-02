import React, { useState, useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { ErrorHandler } from "./services";
import { getInstagramMedia, refreshToken } from "./services/instagram";
import { AppContext } from "./contexts";
const App = () => {
  const [instaData, setInstaData] = useState();
  const [masterClasses, setMasterClasses] = useState();

  const handleInstaMedia = async () => {
    try {
      const {
        data: { data: instaData },
      } = await getInstagramMedia();
      const mcs = instaData.filter(({ caption }) =>
        caption.includes("мк_артстудиянакотовского")
      );
      setInstaData(instaData);
      setMasterClasses(mcs);
      console.log(instaData, mcs);
    } catch (error) {
      ErrorHandler({ moduleName: "App", cameFrom: "handleInstaMedia", error });
    }
  };

  useEffect(handleInstaMedia, []);
  return (
    <AppContext.Provider value={{ instaData, masterClasses }}>
      <Router>
        <div>Hi! I am your app!</div>
      </Router>
    </AppContext.Provider>
  );
};

export default App;
