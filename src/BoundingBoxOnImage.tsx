import React, { useRef, useEffect } from "react";
import SampleImage from "./assets/sample-image.jpg";
import { CoordinateWithColor } from "./types/CoordinateType";

const BoundingBoxOnImage: React.FC<{
  coordinates: CoordinateWithColor[];
  hoveredCoordinates: CoordinateWithColor | null;
}> = ({ coordinates, hoveredCoordinates }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Clear previous drawings
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw the image
    const img = new Image();
    img.src = SampleImage;
    img.onload = () => {
      // canvas.width = canvas.offsetWidth; // Set canvas width to its container's width
      // canvas.height = canvas.offsetHeight; // Set canvas height to its container's height
      // ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);

      if (hoveredCoordinates) {
        const { x, y, width, height, color } = hoveredCoordinates;
        // Set box background color and opacity
        ctx.fillStyle = color;
        ctx.globalAlpha = 0.4;
        ctx.fillRect(x, y, width - x, height - y);
      }
      // Draw the bounding box
      coordinates.forEach((coordinate) => {
        const { x, y, width, height, color } = coordinate;
        // Set box background color and opacity
        ctx.fillStyle = color;
        ctx.globalAlpha = 0.4;
        ctx.fillRect(x, y, width - x, height - y);
      });

      // Reset global alpha
      ctx.globalAlpha = 1;
    };
  }, [coordinates, hoveredCoordinates]);

  return <canvas ref={canvasRef} style={{ width: "100%", height: "100%" }} />;
};

export default BoundingBoxOnImage;
