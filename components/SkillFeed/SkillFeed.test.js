import React from "react";
import { render, fireEvent, screen } from "@testing-library/react-native";
import { NavigationContainer } from "@react-navigation/native";
import SkillFeed from "./SkillFeed"; // Adjust the import path accordingly

//TODO: Save this mock as a separate file
// jest.mock("@react-navigation/native", () => ({
//   ...jest.requireActual("@react-navigation/native"),
//   useNavigation: () => ({
//     navigate: jest.fn(),
//   }),
// }));

describe("SkillFeed component", () => {
  const users = [
    { username: "user1", profileImage: "image1.jpg" },
    { username: "user2", profileImage: "image2.jpg" },
  ];

  test("renders a FlatList with pressable items", async () => {
    render(
      <NavigationContainer>
        <SkillFeed users={users} />
      </NavigationContainer>
    );

    // Assert that each user is rendered in the list
    users.forEach((user) => {
      const usernameElement = screen.getByText(`Username: ${user.username}`);
      expect(usernameElement).toBeTruthy();
    });
  });

  test("does not render the username when not provided", async () => {
    render(<SkillFeed />);

    users.forEach((user) => {
      const usernameElement = screen.queryByText(`Username: ${user.username}`);
      expect(usernameElement).toBeNull();
    });
  });

  test("should call onItemPress when an item is pressed", () => {
    const onItemPressMock = jest.fn();

    render(<SkillFeed users={users} onItemPress={onItemPressMock} />);

    users.forEach((user) => {
      const usernameElement = screen.queryByText(`Username: ${user.username}`);
      fireEvent.press(usernameElement);

      expect(onItemPressMock).toHaveBeenCalledWith(user);
    });
  });
});
