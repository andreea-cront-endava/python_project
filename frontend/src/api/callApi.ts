// funcție generală care trimite cereri la API-ul tău matematic, cu date și autentificare, și întoarce rezultatul calculului. Simplifică tot procesul într-un singur loc.
import { API_URL, API_KEY } from "../config";

export async function callApi(
  endpoint: "fibonacci" | "factorial" | "pow",
  payload: object
) {
  const response = await fetch(`${API_URL}/${endpoint}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-API-Key": API_KEY,
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || "Request failed");
  }

  return response.json();
}
