import { Button } from 'antd';
import React from 'react';
import '../styles/footer.css';
import { RampInstantSDK } from '@ramp-network/ramp-instant-sdk';


function handleBuyClick() {
  let widget = new RampInstantSDK({
    hostAppName: 'NFT Yard',
    hostLogoUrl: 'https://nftyard.io/logo192.png',
    variant: 'auto',
    hostApiKey: "y78mkre3wnrj59dk3ypyhc5jwfrddeuaq3b46wbc",
    selectedCountryCode: 'BR',
    defaultAsset: 'MATIC'
  });
  widget.show();
}

export default function Footer({ showDrawer }) {
  return (
    <footer className="site-footer">
      <ul className="footer-nav">
        <li>
          <a
            href="https://t.me/nftyard"
            target="_blank"
            rel="noopener noreferrer"
          >
            Telegram
          </a>
        </li>
        <li>
          <Button type="link" onClick={showDrawer}>
            Help
          </Button>
        </li>
        <li>
          <Button type="link" href="/roadmap">
            Roadmap
          </Button>
        </li>
        <li>
          <Button type="link" onClick={() => handleBuyClick()}>
            BUY MATIC
          </Button>
        </li>
      </ul>
    </footer>
  );
}
