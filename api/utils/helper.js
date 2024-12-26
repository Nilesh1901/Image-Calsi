export function parseTextAndCalculateTotal(extractedText) {
  const lines = extractedText.split("\n");

  const products = lines
    .map((line) => {
      // Updated regex to capture products with more flexible handling of spaces and special characters
      const match = line.trim().match(/^([a-zA-Z0-9\s]+)\s+(\d+)\s*x\s*(\d+)$/);
      if (match) {
        return {
          productName: match[1].trim(), // Trim to remove any extra spaces
          quantity: parseInt(match[2], 10), // Quantity
          pricePerUnit: parseInt(match[3], 10), // Price per unit
        };
      }
      return null;
    })
    .filter(Boolean);

  const totalPrice = products.reduce(
    (sum, product) => sum + product.quantity * product.pricePerUnit,
    0
  );

  return { products, totalPrice };
}
