import React from "react";
import { Row } from "components/Layout";
import { AddressListWrapper } from "./style";
import { Image } from "components/Image";
import remove from "assets/images/189690.png";
import { alignItems, justifyItems } from "styled-system";

export default function index({ data, handleRemove }) {
  return (
    <AddressListWrapper>
      <Row flexDirection="column" gap={5} className="itemContainer">
        {data.map((item, index) => (
          <div key={index} className="addressitem">
            {/* <div>{index + 1}</div> */}
            {item.split(",")[0].substring(0, 6) +
              "......" +
              item.split(",")[0].substring(10, 16) +
              ", " +
              item.split(",")[1]}
            <span className="cross">
              <Image
                onClick={() => handleRemove(item)}
                src={remove}
                width={25}
                height={25}
              ></Image>
            </span>
          </div>
        ))}
      </Row>
    </AddressListWrapper>
  );
}
