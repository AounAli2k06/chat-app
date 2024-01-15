import React from "react";
import{ BrowserRouter , Route , Routes} from "react-router-dom"
import Join, { user } from "./components/Join";
import Chat , {loader}from "./components/Chat";

const App = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Join/>}/>
      <Route path="/chat" element={<Chat/>} loader={loader}/>
    </Routes>
    </BrowserRouter>
  );
};

export default App;
