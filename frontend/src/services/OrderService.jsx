const URL = `http://localhost:8080/api/orders`;

export async function addOrder(order) {
  const response = await fetch(URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(order),
  });

  if (!response.ok) {
    const errorData = await response.json();
    const errorMessage =
      `${errorData.message}. ${errorData.details}` || response.statusText;
    throw new Error(`BACKEND: ${errorMessage}`);
  }

  const data = await response.json();
  return data;
}
