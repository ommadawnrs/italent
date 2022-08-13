import React from "react";
import classnames from "classnames";

const TitleAndDescription = ({ title, description, hasCbx }) => {
  
  return (
    <>
        <div className="logo_holder">
          <div className="logo"></div>
        </div>
        <div className="main_title">{title}
        </div>
        <div className={classnames({
            main_description: true,
            smaller_margin_decription: hasCbx
        })}>{description}</div>
    </>
  );
};

export default TitleAndDescription;
