"use client";

import { FC, ReactNode, useEffect, useRef, useState } from "react";
import styles from "./styles.module.scss";
import StyledOption from "../StyledOption";
import { Region } from "@src/hooks/useRegions";
import { SurfSpot } from "@src/hooks/useSurfSpots";
import { SelectPlaceholder } from "@src/components/pages/home/SelectForecastForm";
import isRegion from "@src/types/region.typeGuard";
import isSurfSpot from "@src/types/spot.typeGuard";
import isPlaceholder from "@src/types/placeholder.typeGuard";

//handle both regions and spots
export type Option = Region | SurfSpot;

const checkCurrent = (option: Option, current: Option | SelectPlaceholder) => {
  if (current && isRegion(option) && !isSurfSpot(current)) {
    if (option?.region_name !== current?.region_name) {
      return true;
    }
  } else if (current && isSurfSpot(option)) {
    if((current)){
      if (isPlaceholder(current)) {
        return true
      }
      if (option?.spotname !== current?.spotname) {
        return true;
      }
    }

  }
  return false;
};



interface Props {
  options: Option[] | undefined;
  onChange: (option: Option ) => void;
  parent?: Region | SelectPlaceholder;
  current: Option | SelectPlaceholder;
}
const StyledSelect: FC<Props> = ({ options, onChange, parent, current }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

  const dropdownRef = useRef<HTMLUListElement>(null);

  const toggleDropdown = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setIsOpen(!isOpen);
  };

  const handleSelect = (
    e: React.MouseEvent<HTMLButtonElement>,
    item: Option
  ) => {
    e.preventDefault();
    // const id = isRegion(item) ? item.id : item.surfline_id;
    onChange(item);
    setIsOpen(false);
  };

  // allow user to click elsewhere to close dropdown and prevent more than one open
  useEffect(() => {
    const close = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      window.addEventListener("click", close);
    }

    return () => window.removeEventListener("click", close);
  }, [isOpen]);

  // find options where filtered by parent

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const dropDownOptions: Array<ReactNode> = [];
  options?.forEach((option, index) => {
    // do not include current selection in dropdown list
    if (checkCurrent(option, current)) {
      //parent present for region and subregion due to placeholders.
      if (parent) {
        // show options if contained by parent
        if (isRegion(parent) && option.lies_in && option?.lies_in.includes(parent.id)) {
          dropDownOptions.push(
            <li key={index}>
              <StyledOption
                handleClickFn={(e) => handleSelect(e, option)}
                option={option} 
              />
            </li>
          );
        }
      } else {
        // Drop down option button - no parent - country
        dropDownOptions.push(
          <li key={index}>
            <StyledOption
              handleClickFn={(e) => handleSelect(e, option)}
              option={option}
            />
          </li>
        );
      }
    }
  });

  useEffect(() => {
    if (dropDownOptions && dropDownOptions?.length > 0) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [dropDownOptions]);

  return (
    <div className={styles.selectContainer}>
      <div className={`${styles.dropdown} ${isOpen ? styles.open : ""}`}>
        {isDisabled ? (
          <StyledOption
            handleClickFn={() => {}}
            option={current}
            //  isDropdown
            isOpen={isOpen}
            disabled
          />
        ) : (
          <StyledOption
            handleClickFn={toggleDropdown}
            option={current}
            isDropdown
            isOpen={isOpen}
          />
        )}
        <ul ref={dropdownRef} className={styles.dropdownList} role="listbox">
          {dropDownOptions}
        </ul>
      </div>
    </div>
  );
};

export default StyledSelect;