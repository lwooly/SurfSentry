import { SelectPlaceholder } from "@src/components/pages/home/SelectForecastForm";
import styles from "./styles.module.scss";
import { Region } from "@src/hooks/useRegions";
import { SurfSpot } from "@src/hooks/useSurfSpots";
import isRegion from "@src/types/region.typeGuard";
import isSurfSpot from "@src/types/spot.typeGuard";

//handle both regions and spots
type Option = Region | SurfSpot;

const StyledOption = ({
  handleClickFn,
  option,
  isDropdown = false,
  isOpen,
  disabled,
}: {
  handleClickFn: (event: React.MouseEvent<HTMLButtonElement>) => void;
  option: Option | SelectPlaceholder | undefined;
  isDropdown?: boolean;
  isOpen?: boolean;
  disabled?:boolean
}) => {
  return (
    <button
      className={`${styles.optionBtn} ${isDropdown && styles.dropdownBtn} ${
        isOpen && styles.open
      } ${disabled && styles.disabled}`}
      onClick={handleClickFn}
      aria-haspopup={isDropdown ? "listbox" : undefined}
      aria-expanded={isDropdown ? isOpen : undefined}
      aria-current={isDropdown ? "true" : undefined}
      type="button"
      disabled={disabled && true}
    >
      {/* <span>{option.flag}</span> */}
      <span>
        {option
          ? isRegion(option)
            ? option.region_name
            : isSurfSpot(option) ? option.spotname : option.region_name
          : ""}
      </span>
      {isDropdown && (
        <img
          className={styles.btnArrow}
          src="/images/icons/Vectorarrow.svg"
          alt="arrow icon"
        />
      )}
    </button>
  );
};

export default StyledOption;
