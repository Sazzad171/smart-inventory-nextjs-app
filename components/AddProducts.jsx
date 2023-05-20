import React, { useState } from 'react';
import Modal from 'react-modal';
import axios from 'axios';

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
    overflowY: 'auto'
  },
};

 const AddProducts = () => {

  const [modalIsOpen, setIsOpen] = useState(false);
  const [formValues, setFormValues] = useState(null);
  const [prodImg, setProdImg] = useState(null);

  // on click add inventory
  const handleAdd = () => {
    setIsOpen(true);
  }

  // close modal
  function closeModal() {
    setIsOpen(false);
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

  // add product form submit
  const addProductSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    // for values
    console.log(formValues);
    formData.append('product', JSON.stringify(formValues));

    // for image
    console.log(prodImg);
    formData.append('productPhoto', prodImg, prodImg.name);

    // post req
    try {
      const res = await axios.post(process.env.NEXT_PUBLIC_BASE_URL + '/products', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          apiKey: '63wnV6D3nyXlW1oY2b2uCCkh18CDiOSMjPYsJ3tJdDQ='
        }
      });
  
      console.log(res);
    } catch (err) {
      console.log(err);
    }

  }

  return (
    <div className="flex flex-wrap gap-2 md:gap-0 -m-2 mb-7">
      <div className="w-full md:w-1/2 px-2">
        <button className='add-btn' onClick={handleAdd}>Add Inventory</button>
      </div>
      <div className="w-full md:w-1/2 px-2">
        search
      </div>

      {/* modal component */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        ariaHideApp={false}
      >
        <button onClick={closeModal} className='cancel-btn'>Cancel</button>
        <form onSubmit={addProductSubmit}>
          <label className="block">
            <span className="block text-sm font-medium text-slate-700">Category</span>
            <input type="text" name='categoryName' onChange={handleChange} className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
              focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
              invalid:border-pink-500 invalid:text-pink-600
              focus:invalid:border-pink-500 focus:invalid:ring-pink-500
            "/>
          </label>
          <label className="block">
            <span className="block text-sm font-medium text-slate-700">Product Name *</span>
            <input type="text" name='productName' onChange={handleChange} className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
              focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
              invalid:border-pink-500 invalid:text-pink-600
              focus:invalid:border-pink-500 focus:invalid:ring-pink-500
            "/>
          </label>
          <label className="block">
            <span className="block text-sm font-medium text-slate-700">Serial Number</span>
            <input type="text" name='serialNumber' onChange={handleChange} className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
              focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
              invalid:border-pink-500 invalid:text-pink-600
              focus:invalid:border-pink-500 focus:invalid:ring-pink-500
            "/>
          </label>
          <label className="block">
            <span className="block text-sm font-medium text-slate-700">Purchase Price *</span>
            <input type="text" name='purchasePrice' onChange={handleChange} className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
              focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
              invalid:border-pink-500 invalid:text-pink-600
              focus:invalid:border-pink-500 focus:invalid:ring-pink-500
            "/>
          </label>
          <label className="block">
            <span className="block text-sm font-medium text-slate-700">Purchase Date *</span>
            <input type="text" name='purchaseDate' onChange={handleChange} className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
              focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
              invalid:border-pink-500 invalid:text-pink-600
              focus:invalid:border-pink-500 focus:invalid:ring-pink-500
            "/>
          </label>
          <label className="block">
            <span className="block text-sm font-medium text-slate-700">Warranty *</span>
            <input type="text" name='warrantyInYears' onChange={handleChange} className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
              focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
              invalid:border-pink-500 invalid:text-pink-600
              focus:invalid:border-pink-500 focus:invalid:ring-pink-500
            "/>
          </label>
          <label className="block">
            <span className="block text-sm font-medium text-slate-700">Warranty Expire Date *</span>
            <input type="text" name='warrantyExpireDate' onChange={handleChange} className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
              focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
              invalid:border-pink-500 invalid:text-pink-600
              focus:invalid:border-pink-500 focus:invalid:ring-pink-500
            "/>
          </label>
          <label className="block">
            <span className="block text-sm font-medium text-slate-700">Image *</span>
            <input type="file" name='productPhoto' onChange={handleProdImg} className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
              focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
              invalid:border-pink-500 invalid:text-pink-600
              focus:invalid:border-pink-500 focus:invalid:ring-pink-500
            "/>
          </label>
          <button className='save-btn' type='submit'>Save</button>
        </form>

        {/* img */}
        {/* <img src={prodImg} alt='product image' /> */}
      </Modal>

    </div>
  )
}

export default AddProducts