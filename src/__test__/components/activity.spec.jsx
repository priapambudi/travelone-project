// activity.spec.jsx
import React from "react";
import { render, waitFor } from "@testing-library/react";
import axios from "axios";
import Activity from "../../components/Activity"; // Adjust path as per your project structure
import { MemoryRouter } from "react-router-dom"; // To wrap components using Link

jest.mock("axios");

describe("Activity Component", () => {
  it("renders activities correctly", async () => {
    const mockActivities = [
      {
        id: 1,
        title: "Hiking Adventure",
        imageUrls: "hiking.jpg",
        city: "Mountain City",
        province: "Highlands",
        price: 250000,
      },
      {
        id: 2,
        title: "Beach Volleyball",
        imageUrls: "beach-volleyball.jpg",
        city: "Coastal Beach",
        province: "Seashore",
        price: 150000,
      },
    ];

    axios.get.mockResolvedValueOnce({ data: { data: mockActivities } });

    const { getByText, getAllByTestId } = render(
      <MemoryRouter>
        <Activity />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(getByText("Find The Best Activities")).toBeInTheDocument();
      expect(getByText("Hiking Adventure")).toBeInTheDocument();
      expect(getByText("Beach Volleyball")).toBeInTheDocument();
      expect(getAllByTestId("activity-item")).toHaveLength(2); // Assuming there are two activities in mock data
    });
  });

  it("handles API error gracefully", async () => {
    axios.get.mockRejectedValueOnce(new Error("API failed"));

    const { getByText } = render(
      <MemoryRouter>
        <Activity />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(getByText("Find The Best Activities")).toBeInTheDocument();
      expect(getByText("Error fetching activities")).toBeInTheDocument();
    });
  });
});
