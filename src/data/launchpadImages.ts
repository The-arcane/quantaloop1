export interface LaunchPadImage {
  id: number;
  title: string;
  previewUrl: string;
  downloadUrl: string;
  filename: string;
  alt: string;
}

export const launchPadImages: LaunchPadImage[] = [
  {
    id: 1,
    title: "LaunchPad Event Creative 1",
    previewUrl: "/launchpad/image1",
    downloadUrl: "/launchpad/image1",
    filename: "launchpad-event-image-1.png",
    alt: "LaunchPad Series 2026 event creative",
  },
  {
    id: 2,
    title: "LaunchPad Event Creative 2",
    previewUrl: "/launchpad/image2",
    downloadUrl: "/launchpad/image2",
    filename: "launchpad-event-image-2.png",
    alt: "LaunchPad LinkedIn and GitHub session creative",
  },
  {
    id: 3,
    title: "LaunchPad Event Creative 3",
    previewUrl: "/launchpad/image3",
    downloadUrl: "/launchpad/image3",
    filename: "launchpad-event-image-3.png",
    alt: "LaunchPad Vibe Coding workshop creative",
  },
];
