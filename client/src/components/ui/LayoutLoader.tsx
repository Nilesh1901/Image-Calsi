import { Skeleton } from "./skeleton";

function LayoutLoader() {
  return (
    <>
      <div className="">
        <Skeleton className="h-16 w-full" />
      </div>
      <div className="mt-20 flex justify-center flex-col">
        <Skeleton className="h-4 w-3/4 mx-auto mb-2" />
        <Skeleton className="h-4 w-3/5 mx-auto mb-2" />
        <Skeleton className="h-4 w-3/5 mx-auto mb-2" />
        <Skeleton className="h-4 w-3/5 mx-auto mb-2" />
        <Skeleton className="h-4 w-2/5 mx-auto" />
      </div>
      <div className="mt-20 flex justify-center ">
        <Skeleton className="h-4 w-3/4 mx-auto mb-2" />
      </div>
      <div className="mt-20 flex justify-center ">
        <Skeleton className="h-24 w-1/3 mx-auto mb-2" />
      </div>
      <div className="flex justify-center">
        <div className="mt-4 w-1/3 flex justify-between ">
          <Skeleton className="h-10 w-[8rem] mb-2" />
          <Skeleton className="h-10 w-[8rem] mb-2" />
        </div>
      </div>
    </>
  );
}

export default LayoutLoader;
