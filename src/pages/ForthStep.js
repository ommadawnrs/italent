import React, { useState, useEffect } from "react";
import TitleAndDescription from "../components/TitleAndDescription";
import Board from "../components/Board";
import { useParams } from "react-router-dom";
import { LotusRPC } from "https://unpkg.com/@filecoin-shipyard/lotus-client-rpc?module";
import { BrowserProvider } from "https://unpkg.com/@filecoin-shipyard/lotus-client-provider-browser?module";
import { mainnet } from "https://unpkg.com/@filecoin-shipyard/lotus-client-schema?module";

const FourthStep = () => {
    const { token } = useParams();
    const endpointUrl = "ws://127.0.0.1:1234/rpc/v0";
    const provider = new BrowserProvider(endpointUrl);
    const client = new LotusRPC(provider, { schema: mainnet.fullNode });
    const [permission, setPermission] = useState("");
    const [currentHeight, setCurrentHeight] = useState(0);

    useEffect(() => {
        // run();
        getPermission();

        window.addEventListener("message", function (e) {
            const data = JSON.parse(e?.data);

            data?.chainHeight && setCurrentHeight(data.chainHeight);
        });
    }, []);

    const getPermission = async () => {
        const auth = await client.authVerify(token);
        setPermission(auth[auth.length - 1]);
    };

    // const run = async () => {
    //   while (true) {
    //     const { Blocks: blocks, Cids: cids, Height: height } = await client.chainHead(); // chain head
    //     setCurrentHeight(height);
    //     await new Promise((resolve) => {
    //       setTimeout(resolve, 1000);
    //     }); // refresh every second
    //   }
    // };

    return (
        <>
            <TitleAndDescription title={"Step 4"} description={"Chain Height"} hasCbx={true} />
            <div className="inner_page_holder">
                <div className="left_board_holder thirdstep_left_holder">
                    <div className="info_content">
                        <div className="info_title">Token:</div>
                        <div className="info_part">{token}</div>
                    </div>
                    <div className="info_content">
                        <div className="info_title">Lotus endpoint address:</div>
                        <div className="info_part">ws://127.0.0.1:1234/rpc/v0</div>
                    </div>
                    <div className="info_content">
                        <div className="info_title">Permission:</div>
                        <div className="info_part">{permission}</div>
                        <div className="info_title pt10">Current Height:</div>
                        <div className="info_part">{currentHeight}</div>
                    </div>
                </div>
                <div className="board_holder">
                    <Board activeMenu={""} tokenHtml={token} />
                </div>
            </div>
        </>
    );
};

export default FourthStep;
