"use client";

import { FC, useEffect, useRef, useState } from "react";

import styles from "./styles.module.scss";
import StyledOption from "../StyledOption";
import { Region } from "@src/hooks/useRegions";
import { SurfSpot } from "@src/hooks/useSurfSpots";


//handle both regions and spots
type Option = Region | SurfSpot;

function isRegion(option: Option): option is Region {
  return (option as Region).region_name !== undefined;
}

interface Props {
  options: Option[];
}
const StyledSelect: FC<Props> = ({options, onChange}) => {
  const [current, setCurrent] = useState<Option | undefined>(options?.length > 0 ? options[0] : undefined);
  const [isOpen, setIsOpen] = useState(false);

  const dropdownRef = useRef<HTMLUListElement>(null);

  const toggleDropdown = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setIsOpen(!isOpen);
  };

  const handleSelect = (item: Region | SurfSpot) => {
    const id = isRegion(item) ? item.id : item.surfline_id
    onChange(id)
    setIsOpen(false);
    setCurrent(item);
    
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

  return (
    <div className={`${styles.dropdown} ${isOpen ? styles.open : ""}`}>
      <StyledOption
        handleClickFn={toggleDropdown}
        option={current}
        isDropdown
        isOpen={isOpen}
      />
      <ul ref={dropdownRef} className={styles.dropdownList} role="listbox">
        {options?.map((option, index) => {
          // do not include current selection in dropdown list
          if (option?.spotname !== current?.spotname || option?.region_name !== current?.region_name) {
            return (
              <li key={index}>
                <StyledOption
                  handleClickFn={() => {
                    handleSelect(option);
                  }}
                  option={option}
                />
              </li>
            );
          }
        })}
      </ul>
    </div>
  );
};

export default StyledSelect;
