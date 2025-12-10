import { useState } from 'react'

function ProductCard() {
  const [productId, setProductId] = useState(9);

  return (
    <>
      <h1>Product {productId}</h1>
    </>
  )
}

export default ProductCard
