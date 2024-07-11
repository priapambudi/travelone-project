import React from "react";
import { render } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import Experience from "../../components/Experience";

describe("Experience component", () => {
  it("renders correctly", () => {
    const {} = render(
      <Router>
        <Experience />
      </Router>
    );
  });
});
