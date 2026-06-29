import React from "react";

import LogoIcon from "@/assets/icons/logo.svg";
import Link from "next/link";

const Logo = () => {
  return (
    <Link href="/">
      <LogoIcon width={105} height={45} />
    </Link>
  );
};

export default Logo;
