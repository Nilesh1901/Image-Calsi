export function parseTextAndCalculateTotal(extractedText) {
  // Split the text into lines and parse each line
  const lines = extractedText.split("\n");

  const products = lines
    .map((line) => {
      // Match: product name, quantity, pricePerUnit
      const match = line.match(/(.+?)\s+(\d+)\s*x\s*(\d+)/);
      if (match) {
        return {
          productName: match[1].trim(), // Product name
          quantity: parseInt(match[2]), // Quantity
          pricePerUnit: parseInt(match[3]), // Price per unit
        };
      }
      return null; // Ignore invalid lines
    })
    .filter(Boolean); // Remove null values

  // Calculate the total price
  const totalPrice = products.reduce(
    (sum, product) => sum + product.quantity * product.pricePerUnit,
    0
  );

  return { products, totalPrice };
}
