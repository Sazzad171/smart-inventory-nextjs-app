import React from 'react';

// react icon
import { AiOutlineSearch } from 'react-icons/ai';

// modal component
import ModalAddProduct from './ModalAddProduct';

// context
import { useModalHandleContext } from '@/context/ModalHandleContext';

 const AddProducts = () => {

  // context value
  const { setAddProductModal } = useModalHandleContext();

  // on click add inventory
  const handleAdd = () => {
    setAddProductModal(true);
  }

  return (
    <div className="flex flex-wrap gap-2 md:gap-0 -m-2 mb-7">
      <div className="w-full md:w-1/2 px-2">
        <button className='add-btn' onClick={handleAdd}>Add Inventory</button>
      </div>
      <div className="w-full md:w-1/2 px-2">
        <div className="text-right">
          <div className='relative inline-block'>
            <input type="text" placeholder='Search here' className='text-base pl-5 pr-8 py-2 border border-[#828D9980] rounded-[5px]' />
            <AiOutlineSearch className='absolute top-[14px] right-4 text-[#2E3A59] w-5 h-5' />
          </div>
        </div>
      </div>

      {/* modal component */}
      <ModalAddProduct />
    </div>
  )
}

export default AddProducts