import React, { Component } from "react";
import Image from "next/image";
import logoPic from "../public/img/logo_dark.png";

export default class logo extends Component {
  render() {
    return (
      <div>
        <Image src={logoPic} alt="Logo" width={300} height={100} priority />
      </div>
    );
  }
}
