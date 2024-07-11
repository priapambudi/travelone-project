// hero.spec.jsx
import React from "react";
import { render, waitFor } from "@testing-library/react";
import axios from "axios";
import Hero from "../../components/Hero"; // Adjust this import path as per your project

jest.mock("axios"); // Automatically mocks axios module

describe("Hero Component", () => {
  it("renders hero component correctly", async () => {
    axios.get.mockResolvedValue({
      data: {
        data: [
          {
            id: 1,
            imageUrl: "https://example.com/image.jpg",
          },
        ],
      },
    });

    const { getByText, getByAltText } = render(<Hero />);

    // Wait for the API call to resolve
    await waitFor(() => {
      // Assert that the hero component renders correctly
      expect(getByText("Discover the Best Lovely Place")).toBeInTheDocument();
      expect(getByText("Plan and book your perfect trip")).toBeInTheDocument();
      expect(getByText("Get Started")).toBeInTheDocument();
      expect(getByAltText("Banner Image")).toBeInTheDocument();
    });
  });
});
