import styles from "./styles.module.scss";
import { Option } from "../StyledSelect";
import { Region } from "@src/hooks/useRegions";
import { SurfSpot } from "@src/hooks/useSurfSpots";

//handle both regions and spots
type Option = Region | SurfSpot;

function isRegion(option: Option): option is Region {
  return (option as Region).region_name !== undefined;
}

const StyledOption = ({
  handleClickFn,
  option,
  isDropdown = false,
  isOpen,
  disabled,
}: {
  handleClickFn: (event: React.MouseEvent<HTMLButtonElement>) => void;
  option: Option | undefined;
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
            : option.spotname
          : ""}
      </span>
      {isDropdown && (
        <img
          className={styles.btnArrow}
          src="/src/assets/images/icons/Vectorarrow.svg"
          alt="arrow icon"
        />
      )}
    </button>
  );
};

export default StyledOption;
