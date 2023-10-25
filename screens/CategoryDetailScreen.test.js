import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import CategoryDetailScreen from "./CategoryDetailScreen";

//TODO: Save this mock as a separate file
jest.mock("../hooks/useFetchUsersBySkill", () => {
  return jest.fn(() => [
    { username: "user1", profileImage: "image1.jpg" },
    { username: "user2", profileImage: "image2.jpg" },
  ]);
});

const mockNavigation = {
  navigate: jest.fn(),
  goBack: jest.fn(),
};

test("renders CategoryDetailScreen correctly", () => {
  const route = { params: "some_skill" };

  const { getByText } = render(
    <CategoryDetailScreen route={route} navigation={mockNavigation} />
  );

  expect(getByText(`Username: user1`)).toBeTruthy();
  expect(getByText(`Username: user2`)).toBeTruthy();
});

test("navigates to UserDetailScreen on item press", () => {
  const route = { params: "some_skill" };

  const { getByText } = render(
    <CategoryDetailScreen route={route} navigation={mockNavigation} />
  );

  fireEvent.press(getByText("Username: user1"));

  expect(mockNavigation.navigate).toHaveBeenCalledWith(
    "UserDetailScreen",
    "user1"
  );
});

test('navigates back on "Go back" button press', () => {
  const route = { params: "some_skill" };

  const { getByText } = render(
    <CategoryDetailScreen route={route} navigation={mockNavigation} />
  );

  fireEvent.press(getByText("Go back"));

  expect(mockNavigation.goBack).toHaveBeenCalled();
});
