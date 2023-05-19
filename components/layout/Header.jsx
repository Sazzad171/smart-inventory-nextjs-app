import React from 'react';

import Image from 'next/image';
import Link from 'next/link';

// img import
import Logo from "../../public/logo.png";

 const Header = () => {
  return (
    <header className='py-4 px-6 bg-gradient-to-r from-[#2B5876] to-[#464776]'>
      <Link href='/'>
        <Image src={Logo} alt='logo' className='inline-block' />
      </Link>
    </header>
  )
}

export default Header