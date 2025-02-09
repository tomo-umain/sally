import React from "react";
import ReactDOM from "react-dom/client";
import AllySidebar from "./AllySidebar";

let sidebarRoot: ReactDOM.Root | null = null;

// eslint-disable-next-line no-undef
chrome.runtime.onMessage.addListener((request) => {
  if (request.action === "toggleSidebar") toggleSidebar();
});

// auto open sidebar on page load
toggleSidebar();

export function toggleSidebar() {
  if (sidebarRoot) {
    sidebarRoot.unmount();
    const sidebarElement = document.getElementById(
      "accessibility-sidebar-root"
    );
    if (sidebarElement) {
      sidebarElement.remove();
    }
    sidebarRoot = null;
  } else {
    const sidebarContainer = document.createElement("div");
    sidebarContainer.id = "accessibility-sidebar-root";

    document.body.appendChild(sidebarContainer);
    sidebarRoot = ReactDOM.createRoot(sidebarContainer);
    sidebarRoot.render(
      <React.StrictMode>
        <AllySidebar />
      </React.StrictMode>
    );
  }
}
