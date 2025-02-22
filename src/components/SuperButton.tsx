import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { ForwardedRef, ReactNode } from "react";

interface SuperButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  loadingText?: string;
  spinnerClassName?: string;
}

function SuperButton({
  isLoading = false,
  loadingText = "",
  children,
  spinnerClassName = "",
  disabled,
  ...rest
}: SuperButtonProps) {
  return (
    <button disabled={isLoading || disabled} {...rest}>
      {isLoading ? (
        <>
          <FontAwesomeIcon
            icon={faCircleNotch}
            spin
            className={["spinner-border-sm", spinnerClassName].join(" ")}
          />{" "}
          {loadingText}
        </>
      ) : (
        <>{children}</>
      )}
    </button>
  );
}

export default React.memo(SuperButton);
