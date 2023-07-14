import { useQuery } from "@tanstack/react-query"
import { useParams } from "react-router-dom"
import ProductForm from "../../../components/forms/ProductForm"
import { api } from "../../../utils/api"

const ProductUpdate = () => {
  const { data: response, isLoading } = useQuery({
    queryKey: ["categories", "all"],
    queryFn: api.categories.getAll,
  })

  const { id } = useParams()

  const { data: productResponse, isLoading: productIsLoading } = useQuery({
    queryKey: ["products", "single", id],
    queryFn: async () => await api.products.getOne({ id }),
  })

  return (
    <div>
      {!isLoading && !productIsLoading && productResponse && response && (
        <ProductForm
          product={productResponse?.data.product}
          categories={response?.data?.categories}
        />
      )}
    </div>
  )
}
export default ProductUpdate;
