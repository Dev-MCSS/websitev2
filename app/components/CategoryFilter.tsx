"use client";

import styles from "./category-filter.module.css";

type FilterOption = { value: string; label: string };

export default function CategoryFilter({
  options,
  selected,
  onSelect,
  ariaLabel,
}: {
  options: FilterOption[];
  selected: string;
  onSelect: (value: string) => void;
  ariaLabel: string;
}) {
  return (
    <div className={styles.toolbar}>
      <div className={styles.filterGroup} role="group" aria-label={ariaLabel}>
        {options.map(({ value, label }) => (
          <button
            key={value}
            type="button"
            className={`${styles.filter} ${selected === value ? styles.filterActive : ""}`}
            aria-pressed={selected === value}
            onClick={() => onSelect(value)}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}
