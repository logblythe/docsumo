export function getRandomColor(): string {
  // Generate random values for red, green, and blue components
  const r = Math.floor(Math.random() * 256); // Random number between 0 and 255
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);

  // Convert RGB to hexadecimal format
  const hexR = r.toString(16).padStart(2, "0"); // Convert to hexadecimal and ensure at least two digits
  const hexG = g.toString(16).padStart(2, "0");
  const hexB = b.toString(16).padStart(2, "0");

  // Concatenate the components to form the color code
  const color = `#${hexR}${hexG}${hexB}`;

  return color;
}
