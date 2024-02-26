import { createRoot } from "react-dom/client";
import { App } from "./app/App";

const appElement = document.getElementById("app");

if (!appElement) throw new Error("error init react app");

const root = createRoot(appElement);
root.render(<App />);
