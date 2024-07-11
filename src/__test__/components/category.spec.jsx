import React from "react";
import { render, waitFor } from "@testing-library/react";
import axios from "axios";
import Category from "../../components/Category";

jest.mock("axios");

describe("Category Component", () => {
  it("renders categories correctly", async () => {
    const mockCategories = [
      { id: 1, name: "Beaches", imageUrl: "beach.jpg" },
      { id: 2, name: "Mountains", imageUrl: "mountain.jpg" },
    ];

    axios.get.mockResolvedValueOnce({ data: { data: mockCategories } });

    const { getByText, getAllByTestId } = render(<Category />);

    await waitFor(() => {
      expect(getByText("Category")).toBeInTheDocument();
      expect(getByText("Beaches")).toBeInTheDocument();
      expect(getByText("Mountains")).toBeInTheDocument();
      expect(getAllByTestId("category-item")).toHaveLength(2); // Assuming there are two categories in mock data
    });
  });

  it("handles API error gracefully", async () => {
    axios.get.mockRejectedValueOnce(new Error("API failed"));

    const { getByText } = render(<Category />);

    await waitFor(() => {
      expect(getByText("Category")).toBeInTheDocument();
      expect(getByText("Error fetching categories")).toBeInTheDocument();
    });
  });
});
