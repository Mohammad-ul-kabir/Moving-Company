const USE_MOCK = import.meta.env.VITE_USE_MOCK === "true";

export async function fetchServiceAreas() {
  if (USE_MOCK) {
    const mock = await import("../mock/apiMock.js");
    return mock.getServiceAreas();
  }

  // Later (backend):
  // const res = await fetch(`${import.meta.env.VITE_API_URL}/api/areas`);
  // return res.json();

  return [];
}
