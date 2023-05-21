import React from 'react';

import { useProductContext } from '@/context/ProductContext';

 const ProductTable = () => {

  // data from product context
  const { products } = useProductContext();

  return (
    <div className='max-w-full overflow-x-auto'>
      <table className='w-full'>
        <thead className='bg-[#CFD5DB]'>
          <tr>
            <th>
              <div className="tbl-item">SL</div>
            </th>
            <th>
              <div className="tbl-item">Asset No.</div>
            </th>
            <th>
              <div className="tbl-item">Category</div>
            </th>
            <th>
              <div className="tbl-item">Image</div>
            </th>
            <th>
              <div className="tbl-item">Product Name</div>
            </th>
            <th>
              <div className="tbl-item">Serial No.</div>
            </th>
            <th>
              <div className="tbl-item">Price</div>
            </th>
            <th>
              <div className="tbl-item">Warranty</div>
            </th>
            <th>
              <div className="tbl-item">Purchase Date</div>
            </th>
            <th>
              <div className="tbl-item">Action</div>
            </th>
          </tr>
        </thead>
        <tbody>
          {
            products.map((item, i) => (
              <tr key={i}>
                <td>
                  <div className="tbl-item">{ i+1 }</div>
                </td>
                <td>
                  <div className="tbl-item">{ item.assetNumber }</div>
                </td>
                <td>
                  <div className="tbl-item">{ item.categoryName }</div>
                </td>
                <td>
                  <div className="tbl-item">
                    <img src={ process.env.NEXT_PUBLIC_BASE_URL + '/' + item.productPhoto.v50x50Path } alt='product-img' />
                  </div>
                </td>
                <td>
                  <div className="tbl-item">{ item.productName }</div>
                </td>
                <td>
                  <div className="tbl-item">{ item.serialNumber }</div>
                </td>
                <td>
                  <div className="tbl-item">{ item.purchasePrice }</div>
                </td>
                <td>
                  <div className="tbl-item">{ item.warrantyInYears }</div>
                </td>
                <td>
                  <div className="tbl-item">{ item.purchaseDate }</div>
                </td>
                <td>
                  <div className="tbl-item"></div>
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