import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import { useParams, Link, useHistory } from "react-router-dom";
import { useQuery } from "react-apollo";
import { CREATORS_QUERY } from "./apollo/queries";
import { isBlocklisted } from "./helpers";
import { Row, Col, Divider, Button, Form, notification } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import Blockies from "react-blockies";
import { AddressInput, Loader } from "./components";

import {Helmet} from "react-helmet";

export default function Creator(props) {
  const { address } = useParams();
  const [nfts, setNfts] = useState([]);
  const [searchCreator] = Form.useForm();
  const history = useHistory();

  const { loading, error, data } = useQuery(CREATORS_QUERY, {
    variables: { address: address },
  });

  const search = async (values) => {
    try {
      const newAddress = ethers.utils.getAddress(values["address"]);
      setNfts([]);
      history.push("/accounts/" + newAddress);
    } catch (e) {
      console.log("not an address");
      notification.open({
        message: "📛 Not a valid address!",
        description: "Please try again",
      });
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const SearchForm = () => {
    return (
      <Row style={{ justifyContent: "center" }}>
        <Form
          form={searchCreator}
          layout={"inline"}
          name="searchCreator"
          onFinish={search}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            name="address"
            rules={[
              { required: true, message: "Search for an Address or ENS" },
            ]}
          >
            <AddressInput
              ensProvider={props.mainnetProvider}
              placeholder={"Search account"}
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" disabled={loading}>
              <SearchOutlined />
            </Button>
          </Form.Item>
        </Form>
      </Row>
    );
  };

  useEffect(() => {
    const getMetadata = async (jsonURL) => {
      const response = await fetch("https://ipfs.io/ipfs/" + jsonURL);
      const data = await response.json();
      return data;
    };

    const getNfts = (data) => {
      setNfts([]);
      data.forEach(async (nft) => {
        if (isBlocklisted(nft.jsonUrl)) return;
        let _nft = nft;
        _nft.metadata = await getMetadata(nft.jsonUrl);
        setNfts((nfts) => [...nfts, _nft]);
      });
    };

    data !== undefined && data.creators[0]
      ? getNfts(data.creators[0].nfts)
      : console.log("loading");
  }, [data]);

  if (loading) return <Loader />;
  if (error) return `Error! ${error.message}`;
 
  return (
    <div className="accountsCotent">
            <Helmet>
                <meta charSet="utf-8" />
                <title>NFT Yard: MY ASSETS</title>
                <link rel="canonical" href={window.location.href} />
                <meta name="description" content="NFT Factory and Marketplace built on Ethereum L2s where Gas prices are low" />
            </Helmet>
      <div>
        <Row style={{ textAlign: "center" }}>
          <Col span={12} offset={6}>
            <Blockies
              seed={address.toLowerCase()}
              size={25}
              className="creator_blockie"
            />
            <h2 style={{ margin: 10 }}><span style={{color: "rgb(108, 117, 125)"}}>Creator:</span> {address.slice(0, 12)}</h2>
            <Row>
              <Col span={12}>
                <p style={{ margin: 0 }}>
                  <b>Creations:</b>{" "}
                  {data.creators.length ? data.creators[0].nftCount : 0}
                </p>
              </Col>
              <Col span={12}>
                <p style={{ margin: 0 }}>
                  <b>Total Sales: </b> 
                  {nfts
                    .filter((nft) => nft.sales.length)
                    .map((nft) => nft.sales)
                    .map((e) => e.flatMap((e) => Number.parseInt(e.price, 0)))
                    .flatMap((e) => e)
                    .reduce((a, b) => a + b, 0) / 1e18}
                    <img
                    src="https://gateway.pinata.cloud/ipfs/QmbYA7QhqFTLzVSAzE9ymfVvdE1hwBskmXE4X4EK9FevMa"
                    alt="MATIC"
                    style={{ marginLeft: 5, width: 20 }}
                    />
                </p>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
      <Divider />
      <Row style={{ marginBottom: 20 }}>
        <Col span={24}>
          <SearchForm />
        </Col>
      </Row>
      <div className="nfts-grid">
        <ul style={{ padding: 0, textAlign: "center", listStyle: "none" }}>
          {nfts
            ? nfts.map((nft) => (
                <li
                  key={nft.id}
                  className="each-asset"
                  style={{
                    display: "inline-block",
                    verticalAlign: "top",
                    margin: 10,
                    padding: 10,
                    border: "1px solid #e5e5e6",
                    borderRadius: "10px",
                    fontWeight: "bold",
                    transition: 'box-shadow .3s',
                  }}
                >
                  <Link
                    to={{ pathname: "/assets/" + nft.id }}
                    style={{ color: "black" }}
                  >
                    <div className="assetImage" style={{
                        height: 150,
                        width: 150,
                        textAlign: 'center',
                      }}>
                      <img
                      src={nft.metadata.image}
                      alt={nft.metadata.name}
                      width="300"
                      style={{
                        objectFit: 'contain',
                        height: 'auto',
                        width: 'auto',
                        maxWidth: '100%',
                        maxHeight: '100%',
                        borderRadius: "10px"
                      }}
                    />
                    </div>
                    <h3
                      style={{ color: "white", margin: "10px 0px 5px 0px", fontWeight: "700", fontSize: 15, textTransform: 'uppercase' }}
                    >
                      {nft.metadata.name.length > 18
                        ? nft.metadata.name.slice(0, 10).concat("...")
                        : nft.metadata.name}
                    </h3>

                    <Row
                      align="middle"
                      style={{ textAlign: "center", justifyContent: "center" }}
                    >
                      {nft.mintPrice > 0 ? (
                        <>
                          <p
                            style={{
                              color: "#5e5e5e",
                              margin: "0",
                            }}
                          >
                            <b>{nft.mintPrice / 1e18} </b>
                          </p>

                          <img
                            src="https://gateway.pinata.cloud/ipfs/QmbYA7QhqFTLzVSAzE9ymfVvdE1hwBskmXE4X4EK9FevMa"
                            alt="MATIC"
                            style={{ marginLeft: 5, width: 20 }}
                          />
                        </>
                      ) : (
                        <>
                          <img
                            src="https://gateway.pinata.cloud/ipfs/QmbYA7QhqFTLzVSAzE9ymfVvdE1hwBskmXE4X4EK9FevMa"
                            alt="MATIC"
                            style={{ marginLeft: 5, width: 20, visibility: "hidden" }}
                          />
                        </>
                      )}
                    </Row>
                    <Divider style={{ margin: "8px 0px" }} />
                    <p style={{ color: "#5e5e5e", margin: "0", zoom: 0.8 }}>
                      {"Edition: " +
                        nft.count +
                        (nft.limit > 0 ? "/" + nft.limit : "")}
                    </p>
                  </Link>
                </li>
              ))
            : null}
        </ul>
      </div>
    </div>
  );
}
