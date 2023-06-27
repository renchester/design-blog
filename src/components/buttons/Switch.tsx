'use client';

import './Switch.scss';

type SwitchProps = {
  id: string;
  isOn: boolean;
  handler?: (e?: any) => void;
  ariaLabel: string;
};

function Switch(props: SwitchProps) {
  const { id, isOn, handler, ariaLabel } = props;

  return (
    <div className="switch" data-status={isOn}>
      <label
        htmlFor={id}
        aria-hidden
        className="switch__tablet"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && handler) {
            handler();
          }
        }}
      >
        <input
          id={id}
          type="checkbox"
          aria-label={ariaLabel}
          onChange={handler}
          className="switch__input"
          checked={isOn}
        />
        <div aria-hidden className="switch__marker" />
      </label>
    </div>
  );
}
export default Switch;
