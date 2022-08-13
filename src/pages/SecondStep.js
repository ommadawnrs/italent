import React, { useState } from "react";
import TitleAndDescription from "../components/TitleAndDescription";
import Board from "../components/Board";
import CheckHolder from "../components/CheckHolder";
import { useNavigate } from "react-router-dom";

const SecondStep = () => {
  const navigate = useNavigate();
  const [isChecked, setIsChecked] = useState(false);

  return (
    <>
      <TitleAndDescription 
        title={"Step 2"}
        description={"API validation"}
        hasCbx={true}
      />
      <CheckHolder 
        isChecked={isChecked}
        setIsChecked={setIsChecked}
        text={"I have sucessfully generate my own token"}
      />
      <div className="inner_page_holder">
        <div className="left_board_holder first_step_holder">
          <div className="step2guy">
            { isChecked &&
                <div className="main_btn second_step_btn" onClick={() => navigate("/thirdstep")}>Next Step</div>
            }
            { !isChecked &&
              <div className="main_btn second_step_btn disabled_btn">Next Step</div>
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

export default SecondStep;
