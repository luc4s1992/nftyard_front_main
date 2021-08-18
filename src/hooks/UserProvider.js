import { useMemo } from "react";
import { Web3Provider } from "@ethersproject/providers";
import BurnerProvider from "burner-provider";
import { INFURA_ID } from "../constants";

const useUserProvider = (injectedProvider, localProvider) =>
    useMemo(() => {
      if (injectedProvider) {
        console.log("ü¶ä Using injected provider");
        return injectedProvider;
      }
      if (!localProvider) return undefined;

      let burnerConfig = {}

      if(window.location.pathname){
        if(window.location.pathname.indexOf("/pk")>=0){
          let incomingPK = window.location.hash.replace("#","")
          let rawPK
          if(incomingPK.length===64||incomingPK.length===66){
            console.log("üîë Incoming Private Key...");
            rawPK=incomingPK
            burnerConfig.privateKey = rawPK
            window.history.pushState({},"", "/");
            let currentPrivateKey = window.localStorage.getItem("metaPrivateKey");
            if(currentPrivateKey && currentPrivateKey!==rawPK){
              window.localStorage.setItem("metaPrivateKey_backup"+Date.now(),currentPrivateKey);
            }
            window.localStorage.setItem("metaPrivateKey",rawPK);
          }
        }
      }

      console.log("üî• Using burner provider",burnerConfig);
      if (localProvider.connection && localProvider.connection.url) {
        burnerConfig.rpcUrl = localProvider.connection.url
        return new Web3Provider(new BurnerProvider(burnerConfig));
      }else{
        // eslint-disable-next-line no-underscore-dangle
        const networkName = localProvider._network && localProvider._network.name;
        burnerConfig.rpcUrl = `https://${networkName || "mainnet"}.infura.io/v3/${INFURA_ID}`
        return new Web3Provider(new BurnerProvider(burnerConfig));
      }
    }, [injectedProvider, localProvider]);

export default useUserProvider;