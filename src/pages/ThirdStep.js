import React from "react";
import TitleAndDescription from "../components/TitleAndDescription";
import Board from "../components/Board";

const ThirdStep = () => {
  
  return (
    <>
      <TitleAndDescription 
        title={"Step 3"}
        description={"API User permission"}
        hasCbx={true}
      />
      <div className="inner_page_holder">
        <div className="left_board_holder thirdstep_left_holder">
            <div className="list_title">There are different permissions to choose from:</div>
            <ul className="li_holder">
                <li>read - Read node state, no private data.</li>
                <li>write - Write to local store / chain, and read permissions.</li>
                <li>sign - Use private keys stored in wallet for signing, read and write permissions.</li>
                <li>admin - Manage permissions, read, write, and sign permissions.</li>
            </ul>
            <div className="board_title padd_title">Default Tokens</div>
            <ul className="li_holder">
                <li>Running lotus auth create-token is actually triggering a request to the API exposed by the Lotus daemon running in the background.</li>
            </ul>
            <div className="list_title">This request is no different but the Lotus application (as client) is using a default pre-generated API token that is available locally and located in</div>
            <div className="list_title bold">~/.lotus/token</div>
            <div  className="step3_config"></div>
        </div>
        <div className="board_holder">
          <Board activeMenu={""} />
        </div>
      </div>
    </>
  );
};

export default ThirdStep;
