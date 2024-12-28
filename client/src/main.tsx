import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router";
import { Provider } from "react-redux";
import store, { persistor } from "./app/store.ts";
import { PersistGate } from "redux-persist/integration/react";
import { Suspense } from "react";
import LayoutLoader from "./components/ui/LayoutLoader.tsx";

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <BrowserRouter>
        {/* Wrap App in Suspense */}
        <Suspense fallback={<LayoutLoader />}>
          <App />
        </Suspense>
      </BrowserRouter>
    </PersistGate>
  </Provider>
);
