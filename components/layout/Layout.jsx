import React from 'react';

// components
import Meta from '../Meta';
import Header from './Header';
import Footer from './Footer';

// font
import { Open_Sans } from 'next/font/google';
const openSans = Open_Sans({
  weight: ['400', '600', '700'],
  subsets: ['latin'],
  variable: '--font-open-sans'
});

 const Layout = ({ children }) => {
  return (
    <div>
      <Meta />

      <Header />
        <main className={`${openSans.variable} font-openSans min-h-[calc(100vh-114px)] p-6`}>
          { children }
        </main>
      <Footer openSans={ openSans } />
    </div>
  )
}

export default Layout