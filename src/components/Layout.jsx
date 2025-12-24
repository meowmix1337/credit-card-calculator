import React from "react";

const Layout = ({ children }) => {
  return (
    <div className="layout">
      <header>
        <h1>Credit Card Analyzer</h1>
      </header>
      <main className="grid-container">{children}</main>
    </div>
  );
};

export default Layout;
