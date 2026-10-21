"use client";

import { Icon } from "./Icon";

export function QuantityControl({
  value,
  onChange,
}: {
  value: number;
  onChange: (value: number) => void;
}) {
  return (
    <div className="quantity">
      <button onClick={() => onChange(Math.max(1, value - 1))} aria-label="Decrease quantity">
        <Icon name="minus" size={14} />
      </button>
      <span>{value}</span>
      <button onClick={() => onChange(value + 1)} aria-label="Increase quantity">
        <Icon name="plus" size={14} />
      </button>
    </div>
  );
}
