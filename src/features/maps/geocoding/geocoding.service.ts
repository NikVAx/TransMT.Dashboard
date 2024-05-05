import { IGeoPoint } from "@/shared/types";
import axios from "axios";
import {
  IDadataSuggestionItemDto,
  IDadataSuggestionsDto,
  ISuggestion,
  ISuggestions,
} from "./geocoding.types";

export async function getAddressByGeopointFromDadataRequest(
  location: IGeoPoint
) {
  try {
    const api_key = import.meta.env.VITE_DADATA_API_KEY;
    const { data } = await axios.post<IDadataSuggestionsDto>(
      "http://suggestions.dadata.ru/suggestions/api/4_1/rs/geolocate/address",
      {
        lat: location.lat,
        lon: location.lng,
      },
      {
        headers: { Authorization: `Token ${api_key}` },
      }
    );

    const suggestions = data.suggestions.map<ISuggestion>((suggestion) => {
      const raw = {
        value: suggestion.value,
        unrestricted_value: suggestion.unrestricted_value,
        data: suggestion.data,
      } as IDadataSuggestionItemDto;

      return {
        address: raw.unrestricted_value,
        raw: raw,
      };
    });

    return [true, { suggestions } as ISuggestions ] ;
  } catch (error) {
    return [false, error];
  }
}
