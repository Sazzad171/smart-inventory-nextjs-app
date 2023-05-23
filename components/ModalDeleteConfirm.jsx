import React from 'react';
import Modal from 'react-modal';
import axios from 'axios';

// react toastify
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// icons import
import { BsTrash3 } from 'react-icons/bs';

// context
import { useModalHandleContext } from '@/context/ModalHandleContext';
import { useProductContext } from '@/context/ProductContext';

// modal props
const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    maxHeight: '90vh',
    overflowY: 'auto',
    padding: '20px 40px 30px',
  },
};

const ModalDeleteConfirm = () => {

  // context value
  const { deleteProductModal, setDeleteProductModal } = useModalHandleContext();
  const { selectedProdId, setSelectedProdId, products, setProducts } = useProductContext();

  // add product form submit
  const confirmDelete = async () => {
    try {
      const res = await axios.delete(process.env.NEXT_PUBLIC_BASE_URL + `/products/${selectedProdId}`, {
        headers: {
          'Content-Type': 'multipart/form-data',
          apiKey: process.env.NEXT_PUBLIC_API_KEY
        }
      });

      closeModal();
      toast("Product deleted successfully!");
      setSelectedProdId(null);

      // update product array
      const updatedItems = products.filter((item) => item.id !== selectedProdId);
      setProducts(updatedItems);

      console.log(res);
    } catch (err) {
      toast("Product delete failed!");
      console.log(err);
    }

  }

  // close modal
  function closeModal() {
    setDeleteProductModal(false);

    // reset field
    setSelectedProdId(null);
  }

  return (
    <>
      <Modal
        isOpen={deleteProductModal}
        onRequestClose={closeModal}
        style={customStyles}
        ariaHideApp={false}
      >
        <div className='text-center mb-2'>
          <span className='inline-block bg-[#EB57571A] rounded-full p-5'>
            <BsTrash3 className='text-light-red w-8 h-auto' />
          </span>
        </div>
        <h6 className='font-semibold text-[#2C3C51] text-center mb-6'>Are you sure you want to delete this Product ?</h6>
        <div className="flex justify-end gap-2">
          <button onClick={closeModal} className='no-btn'>No</button>
          <button onClick={confirmDelete} className='yes-btn' type='submit'>Yes</button>
        </div>
      </Modal>

      {/* for toastify */}
      <ToastContainer />
    </>
  )
}

export default ModalDeleteConfirm