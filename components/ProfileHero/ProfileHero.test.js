import React from "react";
import { render } from "@testing-library/react-native";
import ProfileHero from "./ProfileHero"; // Adjust the import path accordingly

describe("ProfileHero component", () => {
  it("displays the username when provided", () => {
    const username = "testUser";
    const { getByText } = render(
      <ProfileHero username={username} img="someImageURL" />
    );

    // Use a testID or other relevant attribute if necessary
    const usernameElement = getByText(username);

    // Assert that the username is displayed in the component
    expect(usernameElement).toBeTruthy();
  });

  it("does not display the username when not provided", () => {
    const { queryByText } = render(<ProfileHero img="someImageURL" />);

    // Use a testID or other relevant attribute if necessary
    const usernameElement = queryByText(/.*/); // Regular expression matching any text

    // Assert that the username is not found in the component
    expect(usernameElement).toBeNull();
  });
});
