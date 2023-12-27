import React from "react";
import {
  render,
  fireEvent,
  waitFor,
  act,
  screen,
} from "@testing-library/react-native";
import ProfileScreen from "./ProfileScreen";
// import { getUserWithEmail } from "../firebase/firestore";

const userData = {
  profileImage: "mockImageUrl",
  bio: "Test bio",
  username: "testUser",
};

const imageData = [
  {
    id: "1",
    uri: "https://example.com/image1.jpg",
  },
  {
    id: "2",
    uri: "https://example.com/image2.jpg",
  },
];

const videoData = [
  {
    id: "1",
    mediaUrl: "https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4",
  },
  {
    id: "2",
    mediaUrl: "https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4",
  },
];

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

jest.mock("../firebase/firestore", () => ({
  getUserWithEmail: jest.fn((username, callback) => {
    // Mock implementation, you can customize based on your needs
    callback({
      profileImage: "mockImageUrl",
      bio: "Test bio",
      username: "testUser",
    });
    return () => {}; // Mock unsubscribe function
  }),
  // getUserImages: jest.fn(() => Promise.resolve(imageData)),
  getUserImages: jest.fn((username, callback) => {
    // Mock implementation, you can customize based on your needs
    callback(imageData);
    return () => {}; // Mock unsubscribe function
  }),
  // getUserVideos: jest.fn(() => Promise.resolve(videoData)),
  getUserVideos: jest.fn((username, callback) => {
    // Mock implementation, you can customize based on your needs
    callback(videoData);
    return () => {}; // Mock unsubscribe function
  }),
}));

// In your test file where you mock the firestore module
// jest.mock("../firebase/firestore", () => ({
//   // getUserWithUsername: jest.fn((username, callback) => {
//   //   // Mock implementation, you can customize based on your needs
//   //   callback({
//   //     profileImage: "mockImageUrl",
//   //     bio: "Test bio",
//   //     username: "testUser",
//   //   });
//   //   return () => {}; // Mock unsubscribe function
//   // }),
//   getUserWithEmail: jest.fn((email, setUserData) => {
//     // Mock implementation
//     // const unsubscribe = jest.fn(() => Promise.resolve(userData));

//     // return unsubscribe;

//     callback({
//       profileImage: "mockImageUrl",
//       bio: "Test bio",
//       username: "testUser",
//     });
//     return () => {}; // Mock unsubscribe function
//   }),
//   // Other mocked functions
//   getUserImages: jest.fn(() => Promise.resolve(imageData)),
//   getUserVideos: jest.fn(() => Promise.resolve(videoData)),
// }));

describe("ProfileScreen", () => {
  it("renders correctly", async () => {
    const { getByText, getByTestId } = render(
      <ProfileScreen navigation={mockNavigation} />
    );

    expect(getByText("Edit Profile")).toBeTruthy();
    expect(getByText("Test bio")).toBeTruthy();

    await waitFor(() => {
      imageData.forEach((image) => {
        const imageElement = getByTestId(`image-${image.id}`);
        expect(imageElement).toBeTruthy();
        expect(imageElement.props.source.uri).toBe(image.url);
      });

      videoData.forEach((video) => {
        const videoElement = getByTestId(`video-${video.id}`);
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
      const videoElementOne = getByTestId("video-1");
      const videoElementTwo = getByTestId("video-2");

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
