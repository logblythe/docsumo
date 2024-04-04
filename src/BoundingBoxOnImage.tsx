import { useRef, useEffect } from "react";
import SampleImage from "./assets/sample-image.jpg";
import { CoordinateWithColor } from "./types/CoordinateType";

type PropType = {
  coordinates: CoordinateWithColor[];
  hoveredCoordinates: CoordinateWithColor | null;
};

const BoundingBoxOnImage = ({ coordinates, hoveredCoordinates }: PropType) => {
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
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);

      if (hoveredCoordinates) {
        const { x, y, width, height, color } = hoveredCoordinates;
        ctx.fillStyle = color;
        ctx.globalAlpha = 0.4;
        ctx.fillRect(x, y, width - x, height - y);
      }
      coordinates.forEach((coordinate) => {
        const { x, y, width, height, color } = coordinate;
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
