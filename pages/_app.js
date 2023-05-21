// main css file
import '@/styles/globals.css';

// components
import Layout from '@/components/layout/Layout';
import { ProductContextProvider } from '@/context/ProductContext';
import { ModalHandleContextProvider } from '@/context/ModalHandleContext';

export default function App({ Component, pageProps }) {
  return (
    <ProductContextProvider>
      <ModalHandleContextProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ModalHandleContextProvider>
    </ProductContextProvider>
  )
}