import ReactDOM from "react-dom";

import { BrowserRouter } from "react-router-dom/dist";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
console.log(process.env);
console.log(process.env.NODE_ENV);

if (process.env.NODE_ENV === "production") {
  console.log("App running in production mode");
}

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
