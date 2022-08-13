import React, { useState } from "react";
import TitleAndDescription from "../components/TitleAndDescription";
import Board from "../components/Board";
import { useNavigate } from "react-router-dom";
import classnames from "classnames";

const Intro = () => {
  const navigate = useNavigate();
  const [activeMenu, setActiveMenu] = useState("What is blockchain?");

  return (
    <>
      <TitleAndDescription 
        title={"Intro"}
        description={"The main goal of this lesson is that developers get the basics of the BlockChain as well as set up the environment for FileCoin and implement a very simple Block Explorer."}
        hasCbx={false}
      />
      <div className="inner_page_holder">
        <div className="left_board_holder">
          <div className={classnames({info_menu: true, active: activeMenu === "What is blockchain?"})} onClick={() => setActiveMenu("What is blockchain?")}>What is blockchain?</div>
          <div className={classnames({info_menu: true, active: activeMenu === "What is aBlock Explorer?"})} onClick={() => setActiveMenu("What is aBlock Explorer?")}>What is aBlock Explorer?</div>
          <div className={classnames({info_menu: true, active: activeMenu === "What is a  filecoin?"})} onClick={() => setActiveMenu("What is a  filecoin?")}>What is a  filecoin?</div>
          <div className="btn_holder_intro">
            <div className="main_btn" onClick={() => navigate("/firststep")}>Start</div>
          </div>
        </div>
        <div className="board_holder">
          <Board
            activeMenu={activeMenu}
          />
        </div>
      </div>
    </>
  );
};

export default Intro;
