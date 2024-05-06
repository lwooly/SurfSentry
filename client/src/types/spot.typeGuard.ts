import { Option } from "@src/components/global/StyledSelect";
import { SelectPlaceholder } from "@src/components/pages/home/SelectForecastForm";
import { SurfSpot } from "@src/hooks/useSurfSpots";

export default function isSurfSpot(option: Option | SelectPlaceholder): option is SurfSpot {
    return (option as SurfSpot).spotname !== undefined;
  }