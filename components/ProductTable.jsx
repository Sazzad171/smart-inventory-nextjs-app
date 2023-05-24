import React from 'react';

// react icon
import { BiEdit } from 'react-icons/bi';
import { BsTrash } from 'react-icons/bs';

import { useProductContext } from '@/context/ProductContext';
import { useModalHandleContext } from '@/context/ModalHandleContext';

 const ProductTable = () => {

  // data from product context
  const { products, setSelectedProdDelId, setSelectedProdEditId } = useProductContext();
  const { setDeleteProductModal, setEditProductModal } = useModalHandleContext();

  // onclick delete
  const handleDelete = (id) => {
    setSelectedProdDelId(id);
    setDeleteProductModal(true);
  }

  // onclick delete
  const handleEdit = (id) => {
    setSelectedProdEditId(id);
    setEditProductModal(true);
  }

  return (
    <div className='max-w-full overflow-x-auto'>
      <table className='w-full'>
        <thead className='bg-[#CFD5DB]'>
          <tr>
            <th className='font-semibold text-sm'>
              <div className="tbl-item">SL</div>
            </th>
            <th className='font-semibold text-sm'>
              <div className="tbl-item">Asset No.</div>
            </th>
            <th className='font-semibold text-sm'>
              <div className="tbl-item">Category</div>
            </th>
            <th className='font-semibold text-sm'>
              <div className="tbl-item">Image</div>
            </th>
            <th className='font-semibold text-sm'>
              <div className="tbl-item">Product Name</div>
            </th>
            <th className='font-semibold text-sm'>
              <div className="tbl-item">Serial No.</div>
            </th>
            <th className='font-semibold text-sm'>
              <div className="tbl-item">Price</div>
            </th>
            <th className='font-semibold text-sm'>
              <div className="tbl-item">Warranty</div>
            </th>
            <th className='font-semibold text-sm'>
              <div className="tbl-item">Purchase Date</div>
            </th>
            <th className='font-semibold text-sm'>
              <div className="tbl-item">Action</div>
            </th>
          </tr>
        </thead>
        <tbody>
          {
            products && products.map((item, i) => (
              <tr key={i}>
                <td className='text-sm text-center'>
                  <div className="tbl-item">{ i+1 }</div>
                </td>
                <td className='text-sm text-center'>
                  <div className="tbl-item">{ item.assetNumber }</div>
                </td>
                <td className='text-sm text-center'>
                  <div className="tbl-item">{ item.categoryName }</div>
                </td>
                <td>
                  <div className="tbl-item">
                    {
                      item.productPhoto && 
                      <img src={ process.env.BASE_URL + '/' + item.productPhoto.v50x50Path } alt='product-img'
                      className='w-8 h-8 rounded-full object-cover mx-auto' />
                    }
                  </div>
                </td>
                <td className='text-sm text-center'>
                  <div className="tbl-item">{ item.productName }</div>
                </td>
                <td className='text-sm text-center'>
                  <div className="tbl-item">{ item.serialNumber }</div>
                </td>
                <td className='text-sm text-center'>
                  <div className="tbl-item">{ item.purchasePrice }</div>
                </td>
                <td className='text-sm text-center'>
                  <div className="tbl-item">{ item.warrantyInYears ? item.warrantyInYears : 'No' }</div>
                </td>
                <td className='text-sm text-center'>
                  <div className="tbl-item">{ item.purchaseDate }</div>
                </td>
                <td className='text-center'>
                  <div className="tbl-item">
                    <button className='bg-[#eee] p-1 mr-[6px]' onClick={ () => handleEdit(item.id) }><BiEdit className='text-mid-blue' /></button>
                    <button className='bg-[#eee] p-1' onClick={ () => handleDelete(item.id) }><BsTrash className='text-required-pink' /></button>
                  </div>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  )
}

export default ProductTable