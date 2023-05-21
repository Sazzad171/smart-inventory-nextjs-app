import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import { useForm } from 'react-hook-form';

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
    minWidth: '40vw',
    maxHeight: '90vh',
    overflowY: 'auto',
    padding: '16px 30px 30px',
    background: '#F7F7FA'
  },
};

 const ModalAddProduct = () => {

  // context value
  const { prodCategory } = useProductContext();
  const { addProductModal, setAddProductModal } = useModalHandleContext();

  // local state
  const [prodList, setProdList] = useState([]);
  const [hasWarranty, setHasWarranty] = useState(false);
  const [formValues, setFormValues] = useState({});
  const [prodImg, setProdImg] = useState(null);

  // hook form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // close modal
  function closeModal() {
    setAddProductModal(false);
  }

  // handle form data change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  // handle img change
  const handleProdImg = (e) => {
    // setProdImg(URL.createObjectURL(e.target.files[0]));

    setProdImg(e.target.files[0]);
  }

  // update product field list
  useEffect(() => {
    prodCategory && prodCategory.map((item) => {
      formValues && item.name === formValues.categoryName ? 
        setProdList(item.products) 
        : (
          formValues.categoryName === '' ? setProdList([]) : ''
        )
    });
  }, [formValues.categoryName]);

  // add product form submit
  const addProductSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    // for values
    const productInfo = new Blob(
      [JSON.stringify(formValues)], {
        type: "application/json"
      }
    );
    formData.append('product', productInfo);

    // for image
    formData.append('productPhoto', prodImg);

    // post req
    try {
      const res = await axios.post(process.env.NEXT_PUBLIC_BASE_URL + '/products',
        formData, 
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            apiKey: process.env.NEXT_PUBLIC_API_KEY
          }
      });

      console.log(res);
    } catch (err) {
      console.log(err);
    }

  }

  return (
    <Modal
      isOpen={addProductModal}
      onRequestClose={closeModal}
      style={customStyles}
      ariaHideApp={false}
    >
      <h5 className='text-center font-semibold text-xl mb-7'>Add New Product</h5>

      <form onSubmit={addProductSubmit}>
        <div className="flex flex-wrap items-center mb-4">
          <label className="w-full md:w-1/3 text-sm text-form-label md:text-right pr-6">
            Category <span className='text-required-pink'>*</span>
          </label>
          <div className='w-full md:w-2/3'>
            <select name="categoryName" onChange={handleChange}  className="w-full px-3 py-2 border border-[#E0E0E0] text-sm
              focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
            ">
              <option value="">Select a Category</option>
              {
                prodCategory && prodCategory.map((item, i) => (
                  <option value={ item.name } key={i}>{ item.name }</option>
                ))
              }
            </select>
          </div>
        </div>

        <div className="flex flex-wrap items-center mb-4">
          <label className="w-full md:w-1/3 text-sm text-form-label md:text-right pr-6">
            Product Name <span className='text-required-pink'>*</span>
          </label>
          <div className='w-full md:w-2/3'>
            <select name="productName" onChange={handleChange}  className="w-full px-3 py-2 border border-[#E0E0E0] text-sm
              focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
            ">
              <option value="">Select a Product</option>
              {
                prodList && prodList.map((item, i) => (
                  <option value={ item.name } key={i}>{ item.name }</option>
                ))
              }
            </select>
          </div>
        </div>

        <div className="flex flex-wrap items-center mb-4">
          <label className="w-full md:w-1/3 text-sm text-form-label md:text-right pr-6">
            Serial Number
          </label>
          <div className='w-full md:w-2/3'>
            <input type="text" name='serialNumber' onChange={handleChange} className="w-full px-3 py-2 border border-[#E0E0E0] text-sm
              focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
            " />
          </div>
        </div>

        <div className="flex flex-wrap items-center mb-4">
          <label className="w-full md:w-1/3 text-sm text-form-label md:text-right pr-6">
            Purchase Price
          </label>
          <div className='w-full md:w-2/3'>
            <input type="text" name='purchasePrice' onChange={handleChange} className="w-full px-3 py-2 border border-[#E0E0E0] text-sm
              focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
            " />
          </div>
        </div>

        <div className="flex flex-wrap items-center mb-5">
          <label className="w-full md:w-1/3 text-sm text-form-label md:text-right pr-6">
            Purchase Date <span className='text-required-pink'>*</span>
          </label>
          <div className='w-full md:w-2/3'>
            <select name="purchaseDate" onChange={handleChange}  className="w-full px-3 py-2 border border-[#E0E0E0] text-sm
              focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
            ">
              <option value="">Select a Category</option>
              <option value="">Select a Category</option>
            </select>
          </div>
        </div>

        <div className="flex flex-wrap md:justify-end mb-3">
          <div className='w-full md:w-2/3'>
            <label className='text-sm'>
              <input type="checkbox" name="" onClick={() => setHasWarranty( !hasWarranty )} /> Has Warranty
            </label>
          </div>
        </div>

        {
          hasWarranty && <>
            <div className="flex flex-wrap items-center mb-5">
              <label className="w-full md:w-1/3 text-sm text-form-label md:text-right pr-6">
                Warranty <span className='text-required-pink'>*</span>
              </label>
              <div className='w-full md:w-2/3'>
                <select name="warrantyInYears" onChange={handleChange}  className="w-full px-3 py-2 border border-[#E0E0E0] text-sm
                  focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
                ">
                  <option value="">Select a Category</option>
                  <option value="">Select a Category</option>
                </select>
              </div>
            </div>
            
            <div className="flex flex-wrap items-center">
              <label className="w-full md:w-1/3 text-sm text-form-label md:text-right pr-6">
                Warranty Expire Date <span className='text-required-pink'>*</span>
              </label>
              <div className='w-full md:w-2/3'>
                <select name="warrantyExpireDate" onChange={handleChange}  className="w-full px-3 py-2 border border-[#E0E0E0] text-sm
                  focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
                ">
                  <option value="">Select a Category</option>
                  <option value="">Select a Category</option>
                </select>
              </div>
            </div>
          </>
        }


        <label className="block">
          <span className="block text-sm font-medium text-slate-700">Image *</span>
          <input type="file" name='productPhoto' onChange={handleProdImg} className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
            focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
            invalid:border-pink-500 invalid:text-pink-600
            focus:invalid:border-pink-500 focus:invalid:ring-pink-500
          "/>
        </label>
        <div className="flex justify-end gap-2">
          <button onClick={closeModal} className='cancel-btn'>Cancel</button>
          <button className='save-btn' type='submit'>Save</button>
        </div>
      </form>

      {/* img */}
      {/* <img src={prodImg} alt='product image' /> */}
    </Modal>
  )
}

export default ModalAddProduct