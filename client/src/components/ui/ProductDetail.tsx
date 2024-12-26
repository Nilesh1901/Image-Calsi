import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

function ProductDetail({ products, totalPrice }) {
  return (
    <div className="w-1/2 bg-white rounded-sm mb-10">
      <Table className="">
        <TableCaption>Here are your results</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="text-center">Product Name</TableHead>
            <TableHead className="text-center">Quantity</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product, idx) => (
            <TableRow key={idx}>
              <TableCell className="font-medium">
                {product.productName}
              </TableCell>
              <TableCell>{product.quantity}</TableCell>
              <TableCell className="text-right">
                ₹ {product.pricePerUnit}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={0}>Total</TableCell>
            <TableCell colSpan={2} className="text-right">
              {totalPrice}
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
}

export default ProductDetail;
