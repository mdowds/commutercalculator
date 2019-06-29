import { getJSON } from "./utils";

const apiUrl = "https://mdowds.com/nearbyhouseprices/api/";

export async function getPrices(outcode: string) {
  const res = await getJSON(apiUrl + "prices/outcode/" + outcode);
  return res.averagePrice as number;
}
