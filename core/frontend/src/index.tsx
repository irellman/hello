import App from "App";
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import { setupStore } from "context";
import { Provider } from "react-redux";

const container = document.getElementById("root");
const root = createRoot(container!);

const store = setupStore();

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
