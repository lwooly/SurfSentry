"use client";

import { FC, useEffect, useRef, useState } from "react";
import styles from "./styles.module.scss";
import StyledOption from "../StyledOption";
import { Region } from "@src/hooks/useRegions";
import { SurfSpot } from "@src/hooks/useSurfSpots";
import { SelectProvider } from "@src/components/contexts/select.context";

//handle both regions and spots
type Option = Region | SurfSpot;

function isRegion(option: Option): option is Region {
  return (option as Region).region_name !== undefined;
}

interface Props {
  options: Option[] | undefined;
  onChange: (region: Region) => void;
  parent: Option | undefined;
  current: Option | undefined;
}
const StyledSelect: FC<Props> = ({ options, onChange, parent, current }) => {
  const [isOpen, setIsOpen] = useState(false);

  const dropdownRef = useRef<HTMLUListElement>(null);

  const toggleDropdown = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setIsOpen(!isOpen);
  };

  const handleSelect = (
    e: React.MouseEvent<HTMLButtonElement>,
    item: Region | SurfSpot
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

  return (
  <div className={styles.selectContainer}>
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
            if (
              option?.spotname !== current?.spotname ||
              option?.region_name !== current?.region_name
            ) {
              if (parent) {
                if (option.lies_in && option?.lies_in.includes(parent.id)) {
                  return (
                    <li key={index}>
                      <StyledOption
                        handleClickFn={(e) => handleSelect(e, option)}
                        option={option}
                      />
                    </li>
                  );
                }
              }
             else {
              return (
                <li key={index}>
                  <StyledOption
                    handleClickFn={(e) => handleSelect(e, option)}
                    option={option}
                  />
                </li>
              );
            }
          }
          })}
        </ul>
      </div>
  </div>
  );
};

export default StyledSelect;
