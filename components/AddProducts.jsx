import React, { useState } from 'react';
import Modal from 'react-modal';

// modal props
const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

 const AddProducts = () => {

  const [modalIsOpen, setIsOpen] = useState(false);
  const [formValues, setFormValues] = useState(null);

  // on click add inventory
  const handleAdd = () => {
    setIsOpen(true);
  }

  // close modal
  function closeModal() {
    setIsOpen(false);
  }

  // handle change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  // add product form submit
  const addProductSubmit = (e) => {
    e.preventDefault();
    console.log(formValues);
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
        <button onClick={closeModal} className='close-btn'>close</button>
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
            {/* <input type="file" name='productPhoto' className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
              focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
              invalid:border-pink-500 invalid:text-pink-600
              focus:invalid:border-pink-500 focus:invalid:ring-pink-500
            "/> */}
          </label>
          <button className='save-btn' type='submit'>Save</button>
        </form>
      </Modal>

    </div>
  )
}

export default AddProducts