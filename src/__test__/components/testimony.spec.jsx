import React from "react";
import { render } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import Testimony from "../../components/Testimony";

describe("Testimony component", () => {
  it("renders correctly", () => {
    const {} = render(
      <Router>
        <Testimony />
      </Router>
    );
  });
});
