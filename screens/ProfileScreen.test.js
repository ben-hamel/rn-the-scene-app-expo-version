import React from "react";
import {
  render,
  fireEvent,
  waitFor,
  act,
  screen,
} from "@testing-library/react-native";
import ProfileScreen from "./ProfileScreen";

const mockNavigation = {
  navigate: jest.fn(),
};

//TODO: Save this mock as a separate file
jest.mock("../firebase/auth", () => ({
  useAuth: jest.fn(() => ({
    username: "testUser",
    authUser: { uid: "testUid" },
  })),
}));

const imageData = [
  {
    id: "image1",
    uri: "https://example.com/image1.jpg",
  },
  {
    id: "image2",
    uri: "https://example.com/image2.jpg",
  },
];

const videoData = [
  {
    id: "video1",
    mediaUrl: "https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4",
  },
  {
    id: "video2",
    mediaUrl: "https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4",
  },
];

jest.mock("../firebase/firestore", () => ({
  getUserWithUsername: jest.fn((username, callback) => {
    // Mock implementation, you can customize based on your needs
    callback({
      profileImage: "mockImageUrl",
      bio: "Test bio",
    });
    return () => {}; // Mock unsubscribe function
  }),
  getUserImages: jest.fn(() => Promise.resolve(imageData)),
  getUserVideos: jest.fn(() => Promise.resolve(videoData)),
}));

describe("ProfileScreen", () => {
  it("renders correctly", async () => {
    const { getByText, getByTestId } = render(
      <ProfileScreen navigation={mockNavigation} />
    );

    expect(getByText("Edit Profile")).toBeTruthy();
    expect(getByText("Test bio")).toBeTruthy();

    await waitFor(() => {
      imageData.forEach((image) => {
        const imageElement = getByTestId(image.id);
        expect(imageElement).toBeTruthy();
        expect(imageElement.props.source.uri).toBe(image.url);
      });

      videoData.forEach((video) => {
        const videoElement = getByTestId(video.id);
        expect(videoElement).toBeTruthy();
        expect(videoElement.props.uri).toBe(video.url);
      });
    });
  });

  it("navigates to EditProfileScreen on button press", async () => {
    const { getByText } = render(<ProfileScreen navigation={mockNavigation} />);

    await act(async () => {
      fireEvent.press(getByText("Edit Profile"));
    });

    expect(mockNavigation.navigate).toHaveBeenCalledWith("EditProfileScreen");
  });

  it("one video plays at a time", async () => {
    const { getByTestId } = render(
      <ProfileScreen navigation={mockNavigation} />
    );

    await waitFor(() => {
      const videoElementOne = getByTestId("video1");
      const videoElementTwo = getByTestId("video2");

      expect(videoElementOne).toBeTruthy();
      expect(videoElementTwo).toBeTruthy();

      fireEvent(videoElementOne, "onPlaybackStatusUpdate", { isPlaying: true });
      expect(videoElementOne.props.status.shouldPlay).toBeTruthy();
      expect(videoElementTwo.props.status.shouldPlay).toBeFalsy();

      fireEvent(videoElementTwo, "onPlaybackStatusUpdate", { isPlaying: true });

      expect(videoElementTwo.props.status.shouldPlay).toBeTruthy();
      expect(videoElementOne.props.status.shouldPlay).toBeFalsy();
    });
  });
});
