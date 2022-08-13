import React, { useState, memo } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import MonacoEditor from 'react-monaco-editor';
import classnames from 'classnames';
import { LotusRPC } from '@filecoin-shipyard/lotus-client-rpc';
import { BrowserProvider } from '@filecoin-shipyard/lotus-client-provider-browser';
import { mainnet } from '@filecoin-shipyard/lotus-client-schema';
import getHtml from '../helpers/htmlEditor';
import { CopyToClipboard } from 'react-copy-to-clipboard';

const Board = ({ activeMenu, tokenHtml }) => {
  const endpointUrl = 'ws://127.0.0.1:3453/rpc/v0';
  const provider = new BrowserProvider(endpointUrl);
  const client = new LotusRPC(provider, { schema: mainnet.fullNode });
  const path = useLocation();
  const pathname = path.pathname;
  const navigate = useNavigate();
  const [token, setToken] = useState("");
  const html = getHtml(tokenHtml);
  const [code, setCode] = useState(html);
  const [response, setResponse] = useState("");
  const [copied, setCopied] = useState(false);

    const copy = () => {
        setCopied(true);
        setTimeout(() => {
            setCopied(false);
        }, 1500)
    }

  const validateToken = async () => {
    if ( token !== "" ) {
        try {
            const auth = await client.authVerify(token);
            setResponse("success");
        } catch (e) {
            setResponse("failed");
        }
    }
  }

  return (
    <div  className={classnames({ board: true, editor_holder: pathname.includes("/fourthstep") })}>
        <div className="inner_board">
            { pathname === "/" && activeMenu === "What is blockchain?" &&
                <ul className="li_holder">
                    <li>The blockchain is a distributed database that is shared among the nodes of a computer network.</li>
                    <li>As a database, a blockchain stores information electronically in digital format. Blockchains are best known for their crucial role in cryptocurrency systems, such as Bitcoin, for maintaining a secure and decentralized record of transactions.</li>
                    <li>A blockchain collects information together in groups, known as blocks, that hold sets of information. Blocks have certain storage capacities and, when filled, are closed and linked to the previously filled block, forming a chain of data known as the blockchain.</li>
                    <li>All new information that follows that freshly added block is compiled into a newly formed block that will then also be added to the chain once filled</li>
                </ul>

            }
            { pathname === "/" && activeMenu === "What is aBlock Explorer?" &&
                <ul className="li_holder">
                    <li>A block explorer is an online tool that enables you to search for real-time and historical information about a blockchain, including data related to blocks, transactions, addresses, and more.</li>
                    <li>Every block explorer contains information about one particular blockchain — you cannot use a single explorer to retrieve information about Bitcoin and Ethereum; you’d need a Bitcoin block explorer and Ethereum block explorer, respectively. However, some sites host block explorers for multiple blockchains. Popular block explorer providers for Bitcoin and Ethereum include etherscan.io, blockstream.info, blockchain.com, and CoinMarketCap, among others.</li>
                </ul>
            }
            { pathname === "/" && activeMenu === "What is a  filecoin?" &&
                <ul className="li_holder">
                    <li>Filecoin is a peer-to-peer network that stores files, with built-in economic incentives to ensure files are stored reliably over time.</li>
                    <li>In Filecoin, users pay to store their files on storage providers. Storage providers are computers responsible for storing files and proving they have stored the files correctly over time.</li>
                    <li>Anyone who wants to store their files or get paid for storing other users’ files can join Filecoin. Available storage, and the price of that storage, is not controlled by any single company. Instead, Filecoin facilitates open markets for storing and retrieving files that anyone can participate in. More about Filecoin <a className="white_a" href="src/components/Board#system-specific" target="_blank" rel="noreferrer">here</a>.</li>
                </ul>
            }
            { pathname === "/firststep" &&
                <>
                    <div className="list_title">Operativni sistem: Linux</div>
                    <ul className="li_holder">
                        <li>Install from source: <a className="main_a" href="src/components/Board#system-specific" target="_blank" rel="noreferrer">https://lotus.filecoin.io/lotus/install/linux/#system-specific</a></li>
                        <li>If all steps from the link above are successfully done, the version check: lotus –version should return the version</li>
                    </ul>
                </>
            }
            { pathname === "/secondstep" &&
                <>
                    <div className="board_title">Enable API Access</div>
                        <ul className="li_holder">
                            <li>You can connect to a Lotus node using the build in Lotus API. There is some preparation you need to do first on the node that you want to connect to. You must also generate an API key to use in order to connect to the Lotus node. </li>
                        </ul>
                        <div className="board_title padd_title">Setting up the listening interface</div>
                        <ul className="li_holder">
                            <li>By default, the API listens on the local loopback interface 127.0.0.1, port 3453. This is configured in the config.toml file:</li>
                            <li>Config file:</li>
                        </ul>
                    <CopyToClipboard
                        text="gedit ~/.lotus/config.toml"
                        onCopy={copy}>
                        <div>
                            <div className="config_terminal"></div>
                        </div>
                    </CopyToClipboard>
                    {copied ? <div className="copied_msg">Copied to clipboard &#10004;</div> : null}

                        <div className="config_code"></div>
                        <ul className="li_holder">
                            <li>By this, we set the local loopback to the localhost, port 3453. After listening configuration is done, restart of the affected processes is highly required! </li>
                        </ul>
                        <div className="board_title padd_title">API Tokens</div>
                        <ul className="li_holder">
                            <li>Any client wishing to talk to the API endpoints, exposed by either the Lotus Node or the Lotus Miner, will need a token. Tokens can be obtained as follows.</li>
                            <li>For the Lotus Node:</li>
                        </ul>
                    <CopyToClipboard
                        text="lotus auth create-token --perm-admin"
                        onCopy={copy}>
                        <div>
                            <div className="lotus_config"></div>
                        </div>
                    </CopyToClipboard>
                    {copied ? <div className="copied_msg">Copied to clipboard &#10004;</div> : null}
                        <div className="list_title">Note that the Lotus daemon has to be running in the background!</div>
                </>
            }
            { pathname === "/thirdstep" &&
                <>
                    <div className="form_title token_padd">Token:</div>
                    <div className="input_holder">
                        <input type="text" className="main_input" placeholder="Enter token here..." value={token} onChange={(e) => setToken(e.target.value)} />
                        { (response === "" || response === "failed") &&
                            <div className="main_btn validate_btn" onClick={() => validateToken()}>Validate</div>
                        }
                        { response === "success" &&
                            <div className="main_btn validate_btn" onClick={() => navigate("/fourthstep/"+token)}>Next Step</div>
                        }
                    </div>
                    <div className="form_title">Results:</div>
                    { response === "success" &&
                        <>
                            <div className="result_info">Great! Lotus is successfully installed! Now let's start it and sync the chain.</div>
                            <div className="success_guy"></div>
                        </>
                    }
                    { response === "failed" &&
                        <>
                            <div className="result_info">Error! Try again.</div>
                            <div className="failed_guy"></div>
                        </>
                    }
                </>
            }
            { pathname.includes("/fourthstep") &&
                <>
                   <MonacoEditor
                        width="100%"
                        height="475"
                        language="html"
                        options={{
                            selectOnLineNumbers: true,
                            roundedSelection: false,
                            cursorStyle: 'line',
                            automaticLayout: false,
                            theme: 'vs-dark',
                          }}
                        value={code}
                        onChange={setCode}
                    />
                </>
            }
        </div>
    </div>
  );
};

export default memo(Board);
