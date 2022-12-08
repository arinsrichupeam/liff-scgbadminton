import React, { Component } from "react";
import Image from "next/image";

export default class logo extends Component {
  render() {
    return (
      <div>
        <Image
          src="/img/logo_dark.png"
          alt="Logo"
          width={300}
          height={100}
          priority
        />
      </div>
    );
  }
}
