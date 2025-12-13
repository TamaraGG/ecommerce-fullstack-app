// ------------ ok ---------------

const URL = `http://localhost:8080/api/products`;

export async function getProducts(id) {
  // if (!id) {
  //   throw new Error("FRONTEND: Product Id cannot be null");
  // }

  // not found page in this case

  const response = await fetch(id ? URL + `/${id}` : "");

  if (!response.ok) {
    throw new Error(`BACKEND: ${response.status} - ${response.message}`);
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

  const response = await fetch(
    URL +
      url +
      `?` +
      String(filterParamName) +
      `=` +
      filter +
      `${sort ? `&sort=` + sort : ``}` +
      `${page ? `&page=${page - 1}` : ``}` +
      `${size ? `&size=` + size : ``}`
  );

  if (!response.ok) {
    throw new Error(`BACKEND: ${response.status} - ${response.message}`);
  }
  const data = await response.json();
  return data;
}

export async function getCategories() {
  const response = await fetch(URL + `/categories`);

  if (!response.ok) {
    throw new Error(`BACKEND: ${response.status} - ${response.message}`);
  }
  const data = await response.json();
  return data;
}
