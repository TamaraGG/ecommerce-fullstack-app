const URL = `http://localhost:8080/api/reviews`;

export async function getReview(id) {
  // if (!id) {
  //   throw new Error("Review Id cannot be null");
  // }

  // not found page in this case

  const response = await fetch(id ? `${URL}?productId=${id}` : ``);

  if (!response.ok) {
    throw new Error(`BACKEND: ${response.status}`);
  }
  const data = await response.json();
  return data;
}

export async function getProductReviews(
  productId,
  sort = null,
  page = null,
  size = null
) {
  const response = await fetch(
    URL +
      `?productId=` +
      productId +
      `${sort ? `&sort=` + sort : ``}` +
      `${page ? `&page=${page - 1}` : ``}` +
      `${size ? `&size=` + size : ``}`
  );

  if (!response.ok) {
    throw new Error(`BACKEND: ${response.status}`);
  }
  const data = await response.json();
  return data;
}

export async function addReview(review) {
  const response = await fetch(URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(review),
  });

  if (!response.ok) {
    throw new Error(`BACKEND: ${response.status}`);
  }

  const data = await response.json();
  return data;
}
