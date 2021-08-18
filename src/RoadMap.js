import React from 'react'
import { CheckCircleFilled,ClockCircleFilled } from "@ant-design/icons";
import { VerticalTimeline, VerticalTimelineElement }  from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import FadeIn from 'react-fade-in';

function RoadMap() {

    return (
        <>
        <br></br>
        <h1 style={{color: 'white'}}> <center>
        <FadeIn
        transitionDuration="1200">
            <div>NFT YARD ROADMAP</div>
        </FadeIn>
            </center></h1>   <br></br>
<VerticalTimeline>
  <VerticalTimelineElement
    className="vertical-timeline-element--work"
    contentStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
    contentArrowStyle={{ borderRight: '7px solid  rgb(33, 150, 243)' }}
    date="2021 Q1"
    iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
  >
    <h3 className="vertical-timeline-element-title">1st Quarter</h3>
    <p><CheckCircleFilled /> Idealization of the NFT Yard Platform
    </p>
    <p><CheckCircleFilled />  Creation and development of the Brand</p>
    <p><CheckCircleFilled />  Proof of Concept Development</p>
    <p><CheckCircleFilled />  NFT Yard Polygon Testnet Launch</p>
  </VerticalTimelineElement>
  <VerticalTimelineElement
    className="vertical-timeline-element--work"
    contentStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
    contentArrowStyle={{ borderRight: '7px solid  rgb(33, 150, 243)' }}
    date="2021 Q2"
    iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
  >
    <h3 className="vertical-timeline-element-title">2nd Quarter</h3>
    <p><CheckCircleFilled /> Formation of the NFT Yard work team
    </p>
    <p><CheckCircleFilled />  Website Development</p>
    <p><CheckCircleFilled />  Start Community Building</p>
    <p><CheckCircleFilled />  Polygon -> Ethereum ERC721 Bridge Testing and Development</p>
    <p><ClockCircleFilled />  Mainnet Launch Campaign Development</p>
    <p><ClockCircleFilled />  NFT Yard Polygon Mainnet Launch</p>
    <p><ClockCircleFilled />  ERC20 Token Development</p>
    <p><ClockCircleFilled />  Development of the Farming Platform</p>
    
  </VerticalTimelineElement>
  <VerticalTimelineElement
    className="vertical-timeline-element--work"
    contentStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
    contentArrowStyle={{ borderRight: '7px solid  rgb(33, 150, 243)' }}
    date="2021 Q3"
    iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
  >
    <h3 className="vertical-timeline-element-title">3rd Quarter</h3>
    <p><ClockCircleFilled /> Development of the innovative Likes Ranking system</p>
    <p><ClockCircleFilled /> ERC20 Token Launch</p>
    <p><ClockCircleFilled /> Implementation of the Pool and Farm Platform</p>
    <p><ClockCircleFilled /> Ranking System Implementation</p>
  </VerticalTimelineElement>
  <VerticalTimelineElement
    className="vertical-timeline-element--work"
    contentStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
    contentArrowStyle={{ borderRight: '7px solid  rgb(33, 150, 243)' }}
    date="2021 Q4"
    iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
  >
    <h3 className="vertical-timeline-element-title">4th Quarter</h3>
    <p><ClockCircleFilled /> Implementation of the crosschain Bridge with the Ethereum Network</p>
    <p><ClockCircleFilled /> Development of the online store for NFT Yard physical items </p>
    <p><ClockCircleFilled /> Implementation of the Pool and Farm Platform</p>
    <p><ClockCircleFilled /> Deploy NFT Yard on other EVM Compatible Blockchains</p>
  </VerticalTimelineElement>
  <VerticalTimelineElement
    className="vertical-timeline-element--education"
    contentStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
    contentArrowStyle={{ borderRight: '7px solid  rgb(33, 150, 243)' }}
    date="2022 Q1"
    iconStyle={{ background: 'rgb(233, 30, 99)', color: '#fff' }}
  >
    <h3 className="vertical-timeline-element-title">MUSIC INDUSTRY NFTS</h3>
    <p>
      TBD
    </p>
  </VerticalTimelineElement>
  </VerticalTimeline>
</>
    )
}

export default RoadMap
