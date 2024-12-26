export function parseTextAndCalculateTotal(extractedText) {
  const lines = extractedText.split("\n");

  const products = lines
    .map((line) => {
      const match = line.trim().match(/^(\w+)\s+(\d+)\s*x\s*(\d+)$/); 
      if (match) {
        return {
          productName: match[1], // Alphanumeric product name
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
