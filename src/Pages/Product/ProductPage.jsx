import { Suspense, lazy } from "react";
import { useLocation, useParams } from "react-router";
const ProductView = lazy(() => import("./ProductView"));

const ProductPage = () => {
  const { productName } = useParams();
  const location = useLocation();
  const productType = location?.state?.type;
  return (
    <div>
      <Suspense
        fallback={
          <p className="text-center text-red-400">Loading Product ....</p>
        }
      >
        <ProductView type={productType} urlKey={productName} />
      </Suspense>
    </div>
  );
};
export default ProductPage;
