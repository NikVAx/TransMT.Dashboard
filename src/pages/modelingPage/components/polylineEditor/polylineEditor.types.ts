import { ILatLng } from "@/shared/types";

export interface IPolylineOnChange {
  onChange: (args: { latlngs: ILatLng[] }) => void;
}
