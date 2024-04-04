import React, { useRef, useEffect } from "react";
import SampleImage from "./assets/sample-image.jpg";

interface Coordinates {
  x: number;
  y: number;
  width: number;
  height: number;
}

const BoundingBoxOnImage: React.FC<{ coordinates: Coordinates[] }> = ({
  coordinates,
}) => {
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

      // Set box background color and opacity
      ctx.fillStyle = "red";
      ctx.globalAlpha = 0.4;

      // Draw the bounding box
      coordinates.forEach((coordinate) => {
        const { x, y, width, height } = coordinate;
        ctx.fillRect(x, y, width - x, height - y);
      });

      // Reset global alpha
      ctx.globalAlpha = 1;
    };
  }, [coordinates]);

  return <canvas ref={canvasRef} style={{ width: "100%", height: "100%" }} />;
};

export default BoundingBoxOnImage;
