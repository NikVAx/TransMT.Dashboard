export interface ISuggestions {
  suggestions: ISuggestion[];
}

export interface ISuggestion {
  address: string;
  raw: any;
}

export interface IDadataSuggestionItemDto {
  value: string;
  unrestricted_value: string;
  data: any;
}

export interface IDadataSuggestionsDto {
  suggestions: IDadataSuggestionItemDto[];
}
