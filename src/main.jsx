import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import store from "./redux/store/index.js";
import "./index.css";
import App from "./App.jsx";
import { ApolloProvider } from "@apollo/client";
import client from "./utils/apolloClient";
import { registerSW } from 'virtual:pwa-register'

// Register the service worker
const updateSW = registerSW({
  onNeedRefresh() {
    // Show user a notification about new content
    console.log('New content available – prompt user to refresh');
    
    // You can show a toast/modal here
    // Example: Display a button to reload
    if (confirm('New content available! Click OK to refresh.')) {
      updateSW(true);
    }
  },
  onOfflineReady() {
    console.log('App ready for offline use');
    
    // Optional: Show a toast notification
    // toast.success('App is ready to work offline!');
  },
  onRegistered(registration) {
    console.log('SW Registered:', registration);
  },
  onRegisterError(error) {
    console.error('SW registration error:', error);
  },
  immediate: true, // Register SW immediately
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </Provider>
  </StrictMode>
);