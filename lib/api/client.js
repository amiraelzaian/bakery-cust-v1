
const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "http://localhost:4000/api/v1"

console.log("API URL:", API_URL)

export async function apiClient(endpoint, options = {}) {
  const token =
    typeof window !== "undefined"
      ? localStorage.getItem("token")
      : null

  const res = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token && {
        Authorization: `Bearer ${token}`,
      }),
      ...options.headers,
    },
  })

  if (res.status === 204) {
    return null
  }

  const data = await res.json().catch(() => null)

  if (!res.ok) {
    throw new Error(
      data?.message ||
        `API request failed with status ${res.status}`
    )
  }

  return data
}

