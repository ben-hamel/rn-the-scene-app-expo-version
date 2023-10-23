import React from "react";
import { render } from "@testing-library/react-native";
import CategorySectionList from "./CategorySectionList";

jest.mock("@react-navigation/native", () => ({
  ...jest.requireActual("@react-navigation/native"),
  useNavigation: () => ({
    navigate: jest.fn(),
  }),
}));

describe("CategorySectionList", () => {
  const categories = [
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
  ];

  it("renders loading state correctly", () => {
    const { getByText } = render(
      <CategorySectionList categories={[]} loading={true} />
    );
    expect(getByText("Loading")).toBeDefined();
  });

  it("renders category sections correctly", () => {
    const { getByText, getByTestId } = render(
      <CategorySectionList categories={categories} loading={false} />
    );

    categories.forEach((category) => {
      // Check if section headers are rendered
      expect(getByText(category.title)).toBeDefined();

      category.data.forEach((item) => {
        // Check if item titles are rendered
        expect(getByText(item.title)).toBeDefined();

        // Check if item images are rendered
        expect(getByTestId(`item-image-${item.title}`)).toBeDefined();
      });
    });
  });

  it("matches snapshot", () => {
    const { toJSON } = render(
      <CategorySectionList categories={categories} loading={false} />
    );

    // Compare the rendered component with a snapshot
    expect(toJSON()).toMatchSnapshot();
  });
});
