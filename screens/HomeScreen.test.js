import React from "react";
import { render } from "@testing-library/react-native";
import { HomeScreen } from "./HomeScreen"; // Adjust the import path accordingly

jest.mock("@react-navigation/native", () => ({
  ...jest.requireActual("@react-navigation/native"),
  useNavigation: () => ({
    navigate: jest.fn(),
  }),
}));

// Mock the useFetchCategories hook
jest.mock("../hooks/useFetchCategories", () => ({
  __esModule: true,
  default: jest.fn(() => ({
    categories: [
      {
        title: "Category 1",
        data: [
          { title: "Item 1", uri: "https://example.com/item1.jpg" },
          { title: "Item 2", uri: "https://example.com/item2.jpg" },
        ],
      },
      {
        title: "Category 2",
        data: [
          { title: "Item 3", uri: "https://example.com/item3.jpg" },
          { title: "Item 4", uri: "https://example.com/item4.jpg" },
        ],
      },
    ],
    loading: false,
  })),
}));

describe("<HomeScreen />", () => {
  it("has 1 child", () => {
    const tree = render(<HomeScreen />).toJSON();
    expect(tree.children.length).toBe(1);
  });
});
