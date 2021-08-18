import React from "react";
import { ethers } from "ethers";
import { Modal, notification } from "antd";
import { getSignature } from "./getSignature";
import { default as Transactor } from "./Transactor";

export async function transactionHandler(c) {
  try {
    function chainWarning(network, chainId) {
      if (network === "homestead") {
        network = "Ethereum Mainnet";
      }
      Modal.warning({
        title: "MetaMask Network Mismatch",
        content: (
          <>
          <p>You are using {network}</p>
            <p>
              NFT Yard is built on Polygon (Matic): please change your MetaMask Network to
              point to the{" "}
              <a href="https://docs.matic.network/docs/develop/metamask/config-matic/" target="_blank">
                Polygon Network
              </a>
            </p>
            <p>
              You will need to create a custom RPC with the following URL:{" "}
              <b>https://rpc-mainnet.maticvigil.com/.</b>
            </p>
          </>
        ),
      });
    }

    function showXDaiModal(network) {
      Modal.info({
        title: "You need at least 0.0008 MATIC to make this transaction!",
        content: (
          <span>
            <p>You are using {network}</p>
            {" "}
            NFT Yard runs on Polygon (Matic).{" "}
            <a target="_blank" href={"https://wallet.matic.network/"}>
              Take it to the bridge
            </a>{" "}
            (to transfer Matic from mainnet).{" "}
            <a
              target="_blank"
              href={"https://docs.matic.network/docs/develop/metamask/config-matic/"}
            >
              Learn more about using Matic
            </a>
          </span>
        ),
        onOk() {},
      });
    }

    let contractAddress = require("../contracts/" +
      c["contractName"] +
      ".address.js");
    let contractAbi = require("../contracts/" + c["contractName"] + ".abi.js");

    let balance = await c["localProvider"].getBalance(c["address"]);
    console.log("creator balance", balance);
    let injectedNetwork = await c["injectedProvider"].getNetwork();
    let localNetwork = await c["localProvider"].getNetwork();
    console.log("networkcomparison", injectedNetwork, localNetwork);

    if (
      c["payment"] &&
      parseFloat(ethers.utils.formatEther(balance)) <
        parseFloat(ethers.utils.formatEther(c["payment"]))
    ) {
      showXDaiModal(injectedNetwork.name);
      let m =
        "You need more than " +
        ethers.utils.formatEther(c["payment"]) +
        " MATIC to make this transaction";
      console.log(m);
      throw m;
    }

    if (parseFloat(ethers.utils.formatEther(balance)) > 0.0008) {
      if (injectedNetwork.chainId === localNetwork.chainId) {
        console.log(
          "Got Matic + on the right network, so kicking it old school"
        );

        let contract = new ethers.Contract(
          contractAddress,
          contractAbi,
          c["injectedProvider"].getSigner()
        );

        let metaData = {};




        metaData["gasPrice"] = c["gasPrice"];

        if (c["payment"]) {
          metaData["value"] = c["payment"];
        }
        //console.log('r w here?')
        let result = await contract[c["regularFunction"]](
          ...c["regularFunctionArgs"],
          metaData
        );
        //console.log("Regular RESULT!!!!!!", result);
        return result;
      } else {
        chainWarning(injectedNetwork.name, injectedNetwork.chainId);
        throw "Got Matic, but Metamask is on the wrong network";
      }
    } else if (process.env.REACT_APP_USE_GSN === "true") {
      if (
        c["signatureFunction"] &&
        c["signatureFunctionArgs"] &&
        c["getSignatureTypes"] &&
        c["getSignatureArgs"]
      ) {
        console.log("Doing it the chain-agnostic signature way!");
        let signature = await getSignature(
          c["injectedProvider"],
          c["address"],
          c["getSignatureTypes"],
          c["getSignatureArgs"]
        );

        console.log("Got signature: ", signature);

        let contract = new ethers.Contract(
          contractAddress,
          contractAbi,
          c["metaSigner"]
        );

        let result = await contract[c["signatureFunction"]](
          ...[...c["signatureFunctionArgs"], signature]
        );
        console.log("Fancy signature RESULT!!!!!!", result);
        return result;
      } else if (
        injectedNetwork.chainId === localNetwork.chainId &&
        ["injectedGsnSigner"] in c
      ) {
        console.log("Got a signer on the right network and GSN is go!");
        let contract = new ethers.Contract(
          contractAddress,
          contractAbi,
          c["injectedGsnSigner"]
        );
        let result = await contract[c["regularFunction"]](
          ...c["regularFunctionArgs"]
        );
        console.log("Regular GSN RESULT!!!!!!", result);
        return result;
      } else if (injectedNetwork.chainId !== localNetwork.chainId) {
        chainWarning();
        throw "Metamask is on the wrong network";
      }
    } else {
      showXDaiModal(injectedNetwork.name);
      throw "Need Matic";
    }
  } catch (e) {
    if (e.message.indexOf("Relay not ready") >= 0) {
      notification.open({
        message: "📛 Sorry! Transaction limit reached. 😅",
        description: "⏳ Please try again in a few seconds. 📡",
      });
    } else if (e.message.indexOf("Ping errors") >= 0) {
      notification.open({
        message: "📛 Sorry! 📡 Relay Error. 😅",
        description: "⏳ Please try again in a few seconds. 📡",
      });
    } else {
      notification.open({
        message: "📛 Transaction unsuccessful",
        description: e.message,
      });
    }
    throw e;
  }
}