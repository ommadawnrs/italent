import React, { useState } from "react";
import TitleAndDescription from "../components/TitleAndDescription";
import Board from "../components/Board";
import CheckHolder from "../components/CheckHolder";
import { useNavigate } from "react-router-dom";

const FirstStep = () => {
  const navigate = useNavigate();
  const [isChecked, setIsChecked] = useState(false);

  return (
    <>
      <TitleAndDescription 
        title={"Step 1"}
        description={"Install and launch a Lotus node"}
        hasCbx={true}
      />
      <CheckHolder 
        isChecked={isChecked}
        setIsChecked={setIsChecked}
        text={"I have sucessfully generate my own token"}
      />
      <div className="inner_page_holder">
        <div className="left_board_holder first_step_holder">
          <div className="step1_guy">
            { isChecked &&
                <div className="main_btn first_step_btn" onClick={() => navigate("/secondstep")}>Next Step</div>
            }
            { !isChecked &&
              <div className="main_btn first_step_btn disabled_btn">Next Step</div>
            }
          </div>
        </div>
        <div className="board_holder">
          <Board activeMenu={""} />
        </div>
      </div>
    </>
  );
};

export default FirstStep;
