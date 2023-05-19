// main css file
import '@/styles/globals.css';

// components
import Layout from '@/components/layout/Layout';
import { ProductContextProvider } from '@/context/ProductContext';

export default function App({ Component, pageProps }) {
  return (
    <ProductContextProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ProductContextProvider>
  )
}