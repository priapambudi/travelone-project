// footer.spec.jsx
import React from "react";
import { render } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import Footer from "../../components/Footer";

describe("Footer component", () => {
  it("renders correctly", () => {
    const {} = render(
      <Router>
        <Footer />
      </Router>
    );

    // Test for elements within Footer
    // expect(getByText("Travelone")).toBeInTheDocument();
    // expect(getByText("Enjoying your trip with Travelone")).toBeInTheDocument();
    // expect(getByAltText("logo")).toBeInTheDocument();
  });
});
