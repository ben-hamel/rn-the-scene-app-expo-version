import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import TsButton from "./";

describe("TsButton", () => {
  test("renders correctly", () => {
    const { getByText } = render(
      <TsButton onPress={() => {}} title="Test Button" />
    );

    const button = getByText("Test Button");

    expect(button).toBeDefined();
  });

  test("calls onPress when pressed", () => {
    const onPressMock = jest.fn();
    const { getByText } = render(
      <TsButton onPress={onPressMock} title="Test Button" />
    );

    const button = getByText("Test Button");
    fireEvent.press(button);

    expect(onPressMock).toHaveBeenCalled();
  });
});
