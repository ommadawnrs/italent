import React from "react";
import classnames from "classnames";

const CheckHolder = ({ isChecked, setIsChecked, text }) => {
  
  return (
    <div className="holder_check">
        <div className={classnames({
            checkbox: true,
            active: isChecked
        })} onClick={() => setIsChecked(!isChecked)}></div>
        <div className="checkbox_title">{text}</div>
    </div>
  );
};

export default CheckHolder;
