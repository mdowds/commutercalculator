import { getJSON } from "./utils";
import { JourneyResult, SelectedFilters, Station } from "./types";

export async function getDestinations(): Promise<Station[]> {
  return getJSON(process.env.REACT_APP_CCAPI_URL + "/destinations");
}

export async function getJourneys(
  originId: string,
  selectedFilters: SelectedFilters
): Promise<{ destination: Station; results: Array<JourneyResult> }> {
  const params: any = {};
  if (selectedFilters.minTime) params.min_time = selectedFilters.minTime;
  if (selectedFilters.maxTime) params.max_time = selectedFilters.maxTime;

  return getJSON(
    process.env.REACT_APP_CCAPI_URL + "/journeys/to/" + originId,
    params
  );
}
