import React, { useState } from "react";
import { Button, notification, Badge } from "antd";
import { LikeTwoTone, LikeOutlined } from "@ant-design/icons";
import { useContractLoader, usePoller } from "./hooks";
import { transactionHandler } from "./helpers";

export default function LikeButton(props) {
  const [minting, setMinting] = useState(false);

  //const writeContracts = useContractLoader(props.signingProvider);
  const metaWriteContracts = useContractLoader(
    // props.metaProvider ? props.localProvider : props.metaProvider
      props.injectedProvider
  );
  const readContracts = useContractLoader(props.localProvider);

  const gasPrice = props.gasPrice;

  const [likes, setLikes] = useState();
  const [hasLiked, setHasLiked] = useState();

  let likeButton;

  let displayLikes;
  if (likes) {
    displayLikes = likes.toString();
  }

  usePoller(() => {
    const getLikeInfo = async () => {
      if (readContracts) {
        try {
          const newNftLikes = await readContracts["Liker"]["getLikesByTarget"](
            props.contractAddress,
            props.targetId
          );
          setLikes(newNftLikes);
          const newHasLiked = await readContracts["Liker"]["checkLike"](
            props.contractAddress,
            props.targetId,
            props.likerAddress
          );
          setHasLiked(newHasLiked);
        } catch (e) {
          console.log(e);
        }
      }
    };
    getLikeInfo();
  }, 2987);

  likeButton = (
    <>
      <Badge style={{ backgroundColor: "#2db7f5" }} count={displayLikes}>
        <Button
          onClick={async (e) => {
            e.preventDefault();
            debugger;
            if (!hasLiked && !minting) {
              setMinting(true);
              try {
                let contractAddress = props.contractAddress;
                let target = props.targetId;
                let liker = props.likerAddress;

                let contractName = "Liker";
                let regularFunction = "like";
                let regularFunctionArgs = [contractAddress, target, props.fileUrl];
                let signatureFunction = "likeWithSignature";
                let signatureFunctionArgs = [contractAddress, target, liker, props.fileUrl];
                let getSignatureTypes = [
                  "bytes",
                  "bytes",
                  "address",
                  "address",
                  "uint256",
                  "address",
                ];
                let getSignatureArgs = [
                  "0x19",
                  "0x0",
                  metaWriteContracts["Liker"].address,
                  contractAddress,
                  target,
                  liker,
                ];

                let likeConfig = {
                  ...props.transactionConfig,
                  contractName,
                  regularFunction,
                  regularFunctionArgs,
                  signatureFunction,
                  signatureFunctionArgs,
                  getSignatureTypes,
                  getSignatureArgs,
                  gasPrice,
                };

                console.log(likeConfig);

                let result = await transactionHandler(likeConfig);

                if (result) {
                  notification.open({
                    message: "You liked this nft!",
                    description: (
                      <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href={
                          process.env.REACT_APP_NETWORK_EXPLORER + "tx/" + result.hash
                        }
                      >
                        view transaction.
                      </a>
                    ),
                  });
                  setMinting(false);
                  console.log(result);
                }
              } catch (e) {
                setMinting(false);
                console.log(e.message);
              }
            }
            return false;
          }}
          loading={minting}
          shape={"circle"}
          type={hasLiked || minting ? "primary" : "secondary"}
          style={{
            zIndex: 99,
            cursor: "pointer",
            marginBottom: 12,
            boxShadow: "2px 2px 3px #d0d0d0",
          }}
        >
          {minting ? "" : hasLiked ? <LikeOutlined /> : <LikeTwoTone />}
        </Button>
      </Badge>
    </>
  );

  return likeButton;
}
