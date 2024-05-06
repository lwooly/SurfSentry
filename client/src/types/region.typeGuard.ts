import { Option } from "@src/components/global/StyledSelect";
import { SelectPlaceholder } from "@src/components/pages/home/SelectForecastForm";
import { Region } from "@src/hooks/useRegions";

export default function isRegion(option: Option | SelectPlaceholder): option is Region {
    return (option as Region).region_type !== undefined;
  }