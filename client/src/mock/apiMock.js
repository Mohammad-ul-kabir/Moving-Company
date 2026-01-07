
import { serviceAreas } from "./data";

const wait = (ms) => new Promise((r) => setTimeout(r, ms));

export async function getServiceAreas() {
  await wait(200);
  return serviceAreas;
}
