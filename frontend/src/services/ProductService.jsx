// ------------ ok ---------------

const URL = `http://localhost:8080/api/products`;

export async function getProducts(id) {
  // if (!id) {
  //   throw new Error("FRONTEND: Product Id cannot be null");
  // }

  // not found page in this case

  const response = await fetch(id ? URL + `/${id}` : "");

  if (!response.ok) {
    const errorData = await response.json();
    const errorMessage =
      `${errorData.message}. ${errorData.details}` || response.statusText;
    throw new Error(`BACKEND: ${errorMessage}`);
  }
  const data = await response.json();
  return data;
}

export async function getSortedPaginatedProducts(
  url,
  filterParamName,
  [filter, sort = null, page = null, size = null]
) {
  // if (filterParamName && !filter) {
  //   throw new Error(`FRONTEND: ${filterParamName} cannot be null`);
  // }

  // in this case it will be just not found page

  const params = new URLSearchParams();
  params.append(filterParamName, filter);
  if (sort) params.append("sort", sort);
  if (page) params.append("page", page - 1);
  if (size) params.append("size", size);

  const response = await fetch(`${URL}${url}?${params.toString()}`);

  if (!response.ok) {
    const errorData = await response.json();
    const errorMessage =
      `${errorData.message}. ${errorData.details}` || response.statusText;
    throw new Error(`BACKEND: ${errorMessage}`);
  }
  const data = await response.json();
  return data;
}

export async function getCategories() {
  const response = await fetch(URL + `/categories`);

  if (!response.ok) {
    const errorData = await response.json();
    const errorMessage =
      `${errorData.message}. ${errorData.details}` || response.statusText;
    throw new Error(`BACKEND: ${errorMessage}`);
  }
  const data = await response.json();
  return data;
}
