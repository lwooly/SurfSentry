import { Option } from "@src/components/global/StyledSelect";
import { SelectPlaceholder } from "@src/components/pages/home/SelectForecastForm";

export default function isPlaceholder(option: Option | SelectPlaceholder): option is SelectPlaceholder {
    return !('region_type' in option) && 'region_name' in option;
  }