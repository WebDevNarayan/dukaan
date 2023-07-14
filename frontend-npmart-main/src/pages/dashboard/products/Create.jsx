import { useQuery } from "@tanstack/react-query";
import ProductForm from "../../../components/forms/ProductForm";
import { api } from "../../../utils/api";

const ProductCreate = () => {
    const {data: response, isLoading} = useQuery({
        queryKey: ["categories", "all"],
        queryFn: api.categories.getAll,
    })
  return <div>
    {!isLoading && response && (
        <ProductForm categories={response?.data?.categories} /> 
    )}
  </div>;
};
export default ProductCreate;