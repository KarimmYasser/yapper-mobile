import { findNodeHandle, UIManager } from "react-native";

export type ImageOrigin = {
  x: number;
  y: number;
  width: number;
  height: number;
} | null;

export const measureComponentPosition = (
  ref: any,
  callback: (origin: ImageOrigin) => void
) => {
  const handle = findNodeHandle(ref.current);
  if (handle) {
    UIManager.measureInWindow(handle, (x, y, width, height) => {
      callback({ x, y, width, height });
    });
  }
};


export const openImageViewer = (
  ref: any,
  setOrigin: (origin: ImageOrigin) => void,
  setViewerOpen: (open: boolean) => void
) => {
  measureComponentPosition(ref, (origin) => {
    setOrigin(origin);
    setViewerOpen(true);
  });
};
