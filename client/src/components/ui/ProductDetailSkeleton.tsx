
import { Skeleton } from "./skeleton";

function ProductDetailSkeleton() {
  return (
    <div className="mt-6">
      <Skeleton className="h-6 w-3/4 mx-auto mb-2" />
      <Skeleton className="h-6 w-3/5 mx-auto mb-2" />
      <Skeleton className="h-6 w-3/5 mx-auto mb-2" />
      <Skeleton className="h-6 w-3/5 mx-auto mb-2" />
      <Skeleton className="h-6 w-2/5 mx-auto" />
    </div>
  );
}

export default ProductDetailSkeleton;
