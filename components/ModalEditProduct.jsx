import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import { useForm } from 'react-hook-form';

// react toastify
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// icons import
import { AiOutlineCamera } from 'react-icons/ai';
import { IoCloseSharp } from 'react-icons/io5';
import { BsPlus } from 'react-icons/bs';
import { GrClose } from 'react-icons/gr';

// context
import { useModalHandleContext } from '@/context/ModalHandleContext';
import { useProductContext } from '@/context/ProductContext';

// static date data
import { dayList, monthList, yearList, warYears } from '../data/d.m.y-data';

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

 const ModalEditProduct = () => {
  // context value
  const { setProducts, prodCategory, selectedProdEditId, setSelectedProdEditId } = useProductContext();
  const { editProductModal, setEditProductModal } = useModalHandleContext();

  // local state
  const [selectedCat, setSelectedCat] = useState('');
  const [prodList, setProdList] = useState([]);
  const [hasWarranty, setHasWarranty] = useState(true);
  const [tempProdImg, setTempProdImg] = useState(null);

  // hook form initiate
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm();

  // get id wise data for edit
  useEffect(() => {
    const getIdWiseData = async () => {
      try {
        const res = await axios.get(process.env.NEXT_PUBLIC_BASE_URL + `/products/${selectedProdEditId}`, {
            headers: {
              apiKey: process.env.NEXT_PUBLIC_API_KEY
            }
        });

        // set input field data
        setValue('categoryName', res.data.categoryName);
        setValue('serialNumber', res.data.serialNumber);
        setValue('purchasePrice', res.data.purchasePrice);
        setValue('purcDateDay', '1');
        setValue('purcDateMonth', '1');
        setValue('purcDateYear', '2022');
        setValue('warrantyInYears', res.data.warrantyInYears);
        setValue('warExpDay', '1');
        setValue('warExpMon', '1');
        setValue('warExpYear', '2023');
        setSelectedCat(res.data.categoryName);
        setTempProdImg(res.productPhoto.v50x50Path);

        console.log(res);
      } catch (err) {
        console.log(err);
      }
    }
    getIdWiseData();
  }, [selectedProdEditId]);

  // update category select value
  const handleCatChange = (e) => {
    setSelectedCat( e.target.value );
  }

  // update product field list when category select
  useEffect(() => {
    prodCategory && prodCategory.map((item) => {
      selectedCat && item.name === selectedCat ? 
        setProdList(item.products) 
        : (
          selectedCat === '' ? setProdList([]) : ''
        )
    });
  }, [selectedCat]);

  // handle img change
  const handleProdImg = (e) => {
    setTempProdImg({
      name: e.target.files[0].name,
      img: URL.createObjectURL(e.target.files[0]),
      type: e.target.files[0].type
    });
  }

  // add product form submit
  const addProductSubmit = async (data) => {

    const allowedFormats = ['image/jpg', 'image/png', 'image/jpeg'];

    // check image format is ok
    if ( tempProdImg && allowedFormats.includes(tempProdImg.type) ||
      tempProdImg === null
    ) {
      const formData = new FormData();

      // for values
      const productInfo = new Blob(
        [JSON.stringify({
          categoryName: data.categoryName,
          productName: data.productName,
          serialNumber: data.serialNumber,
          purchasePrice: data.purchasePrice,
          purchaseDate: `${data.purcDateYear}-${data.purcDateMonth}-${data.purcDateDay}`,
          warrantyInYears: data.warrantyInYears,
          warrantyExpireDate: `${data.warExpYear}-${data.warExpMon}-${data.warExpDay}`
        })], {
          type: "application/json"
        }
      );
      formData.append('product', productInfo);

      // for image
      formData.append('productPhoto', data.productPhoto[0]);

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

        closeModal();
        toast("Product edited successfully!");
        setProducts((prevProducts) => [ ...prevProducts, res.data ]);

      } catch (err) {
        toast("Product edit error! Please check data carefully");
        console.log(err);
      }
    }
    else {
      toast("invalid image!");
    }

  }

    // close modal
  function closeModal() {
    setEditProductModal(false);
    setSelectedProdEditId(null);

    // reset all field
    setValue('categoryName', '');
    setValue('serialNumber', '');
    setValue('purchasePrice', '');
    setValue('purcDateDay', '');
    setValue('purcDateMonth', '');
    setValue('purcDateYear', '');
    setValue('warrantyInYears', '');
    setValue('warExpDay', '');
    setValue('warExpMon', '');
    setValue('warExpYear', '');
    setSelectedCat('');
    setProdList([]);
    setHasWarranty(true);
    setTempProdImg(null);
  }
  
  return (
    <>
      <Modal
        isOpen={editProductModal}
        onRequestClose={closeModal}
        style={customStyles}
        ariaHideApp={false}
      >
        <h5 className='text-center font-semibold text-xl mb-7'>Add New Product</h5>

        <form onSubmit={handleSubmit(addProductSubmit)}>
          {/* category */}
          <div className="flex flex-wrap items-center mb-4">
            <label className="w-full md:w-1/3 text-sm text-form-label md:text-right pr-6">
              Category <span className='text-required-pink text-xl'>*</span>
            </label>
            <div className='w-full md:w-2/3'>
              <select {...register('categoryName', { required: true, onChange: handleCatChange })}
                className="w-full px-3 py-2 border border-[#E0E0E0] text-sm
                focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
              ">
                <option value="">Select a Category</option>
                {
                  prodCategory && prodCategory.map((item, i) => (
                    <option value={ item.name } key={i}>{ item.name }</option>
                  ))
                }
              </select>
              { errors.categoryName && <p className='text-sm text-required-pink'>Please select product category</p> }
            </div>
          </div>

          {/* product name */}
          <div className="flex flex-wrap items-center mb-4">
            <label className="w-full md:w-1/3 text-sm text-form-label md:text-right pr-6">
              Product Name <span className='text-required-pink text-xl'>*</span>
            </label>
            <div className='w-full md:w-2/3'>
              <select {...register('productName', { required: true })} className="w-full px-3 py-2 border border-[#E0E0E0] text-sm
                focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
              ">
                <option value="">Select a Product</option>
                {
                  prodList && prodList.map((item, i) => (
                    <option value={ item.name } key={i}>{ item.name }</option>
                  ))
                }
              </select>
              { errors.productName && <p className='text-sm text-required-pink'>Please select product name</p> }
            </div>
          </div>

          {/* serial number */}
          <div className="flex flex-wrap items-center mb-4">
            <label className="w-full md:w-1/3 text-sm text-form-label md:text-right pr-6">
              Serial Number
            </label>
            <div className='w-full md:w-2/3'>
              <input type="text" {...register('serialNumber', { required: true })} className="w-full px-3 py-2 border border-[#E0E0E0] text-sm
                focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
              " />
              { errors.serialNumber && <p className='text-sm text-required-pink'>Please input serial nubmer</p> }
            </div>
          </div>

          {/* purchase Price */}
          <div className="flex flex-wrap items-center mb-4">
            <label className="w-full md:w-1/3 text-sm text-form-label md:text-right pr-6">
              Purchase Price <span className='text-required-pink text-xl'>*</span>
            </label>
            <div className='w-full md:w-2/3'>
              <input type="text" {...register('purchasePrice', { required: true, pattern: /^(0|[1-9]\d*)(\.\d+)?$/ })} className="w-full px-3 py-2 border border-[#E0E0E0] text-sm
                focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
              " />
              { errors.purchasePrice && <p className='text-sm text-required-pink'>Please input valid price</p> }
            </div>
          </div>

          {/* purchase date */}
          <div className="flex flex-wrap items-center mb-5">
            <label className="w-full md:w-1/3 text-sm text-form-label md:text-right pr-6">
              Purchase Date <span className='text-required-pink text-xl'>*</span>
            </label>
            <div className='w-full md:w-2/3'>
              <div className="flex flex-wrap -mx-2">
                <div className='w-[30%] px-2'>
                  <select {...register('purcDateDay', { required: true })} className="w-full px-3 py-2 text-[#777] border border-[#E0E0E0] text-sm
                    focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
                  ">
                    <option value="">Date</option>
                    {
                      dayList && dayList.map((item, i) => (
                        <option value={ item } key={i}>{ item }</option>
                      ))
                    }
                  </select>
                </div>
                <div className='w-[35%] px-2'>
                  <select {...register('purcDateMonth', { required: true })} className="w-full px-3 py-2 text-[#777] border border-[#E0E0E0] text-sm
                    focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
                  ">
                    <option value="">Month</option>
                    {
                      monthList && monthList.map((item, i) => (
                        <option value={ item.no } key={i}>{ item.name }</option>
                      ))
                    }
                  </select>
                </div>
                <div className='w-[35%] px-2'>
                  <select {...register('purcDateYear', { required: true })} className="w-full px-3 py-2 text-[#777] border border-[#E0E0E0] text-sm
                    focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
                  ">
                    <option value="">Year</option>
                    {
                      yearList && yearList.map((item, i) => (
                        <option value={ item } key={i}>{ item }</option>
                      ))
                    }
                  </select>
                </div>
              </div>
              { (errors.purcDateDay ||
                errors.purcDateMonth ||
                errors.purcDateYear) &&
                <p className='text-sm text-required-pink'>Please select valid date</p> 
              }
            </div>
          </div>

          {/* has warranty cheq */}
          <div className="flex flex-wrap md:justify-end mb-3">
            <div className='w-full md:w-2/3'>
              <label className='text-sm'>
                <input type="checkbox" name="hasWarCheq" onChange={() => setHasWarranty( !hasWarranty )} defaultChecked="true" /> Has Warranty
              </label>
            </div>
          </div>

          {
            hasWarranty && <>
              {/* warranty years */}
              <div className="flex flex-wrap items-center mb-5">
                <label className="w-full md:w-1/3 text-sm text-form-label md:text-right pr-6">
                  Warranty <span className='text-required-pink text-xl'>*</span>
                </label>
                <div className='w-full md:w-2/3'>
                  <select {...register('warrantyInYears', hasWarranty && {
                    required: true
                  })} className="w-full px-3 py-2 text-[#777] border border-[#E0E0E0] text-sm
                    focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
                  ">
                    <option value="">Warranty in Years</option>
                    {
                      warYears && warYears.map((item, i) => (
                        <option value={ item } key={i}>{ item }</option>
                      ))
                    }
                  </select>
                  { errors.warrantyInYears && <p className='text-sm text-required-pink'>Please select warranty years</p>  }
                </div>
              </div>
              
              {/* warranty expires day */}
              <div className="flex flex-wrap items-center">
                <label className="w-full md:w-1/3 text-sm text-form-label md:text-right pr-6">
                  Warranty Expire Date <span className='text-required-pink text-xl'>*</span>
                </label>
                <div className='w-full md:w-2/3'>
                  <div className="flex flex-wrap -mx-2">
                    <div className='w-[30%] px-2'>
                      <select {...register('warExpDay', hasWarranty && {
                        required: true
                      })} className="w-full px-3 py-2 text-[#777] border border-[#E0E0E0] text-sm
                        focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
                      ">
                        <option value="">Date</option>
                        {
                          dayList && dayList.map((item, i) => (
                            <option value={ item } key={i}>{ item }</option>
                          ))
                        }
                      </select>
                    </div>
                    <div className='w-[35%] px-2'>
                      <select {...register('warExpMon', hasWarranty && {
                        required: true
                      })} className="w-full px-3 py-2 text-[#777] border border-[#E0E0E0] text-sm
                        focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
                      ">
                        <option value="">Month</option>
                        {
                          monthList && monthList.map((item, i) => (
                            <option value={ item.no } key={i}>{ item.name }</option>
                          ))
                        }
                      </select>
                    </div>
                    <div className='w-[35%] px-2'>
                      <select {...register('warExpYear', hasWarranty && {
                        required: true
                      })} className="w-full px-3 py-2 text-[#777] border border-[#E0E0E0] text-sm
                        focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
                      ">
                        <option value="">Year</option>
                        {
                          yearList && yearList.map((item, i) => (
                            <option value={ item } key={i}>{ item }</option>
                          ))
                        }
                      </select>
                    </div>
                  </div>
                  { (errors.warExpDay ||
                    errors.warExpMon ||
                    errors.warExpYear) &&
                    <p className='text-sm text-required-pink'>Please select valid warranty expire date</p> 
                  }
                </div>
              </div>
            </>
          }

          {/* add image */}
          <div className="flex flex-wrap md:justify-end mt-4 md:mt-7 mb-4 md:mb-20">
            <div className='w-full md:w-1/3'>
              <label htmlFor="fileUp" className='flex items-center gap-2 border border-[#BDBDBD] rounded-[4px] px-3 py-2 w-fit cursor-pointer mb-2'>
                <span className='bg-[#E0E0E0] rounded-full p-1'>
                  <AiOutlineCamera />
                </span>
                <span className='font-semibold'>Add Image</span> <span className='text-required-pink text-xl'>*</span>
                <input type="file" {...register('productPhoto', { onChange: handleProdImg })} id='fileUp' className='hidden' />
              </label>
              { tempProdImg &&
                <div className='flex items-center gap-1'>
                  <span className='font-semibold text-sm text-mid-blue'>{ tempProdImg.name } </span>
                  <button onClick={() => setTempProdImg(null)}>
                    <IoCloseSharp className='w-5 h-5 min-w-5 text-required-pink' />
                  </button>
                </div>
              }
            </div>
            <div className='w-full md:w-1/3'>
              {
                tempProdImg && 
                  <img src={tempProdImg.img} alt='product image' className='w-32 h-32 object-cover ml-auto' />
              }
            </div>
          </div>

          {/* add more product */}
          <div className="flex md:justify-end mb-4 md:mb-10">
            <div className='w-full md:w-1/3'>
              <button className='flex items-center ml-auto gap-1 cursor-pointer' disabled>
                <span className='bg-mid-blue rounded-full'>
                  <BsPlus className='text-white' />
                </span>
                <span className='text-mid-blue font-semibold text-sm'>Add more Product</span>
              </button>
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <button onClick={closeModal} className='cancel-btn'>Cancel</button>
            <button className='save-btn' type='submit'>Save</button>
          </div>
        </form>

        {/* close icon */}
        <button onClick={closeModal}><GrClose className='absolute top-4 right-6' /></button>
      </Modal>

      {/* for toastify */}
      <ToastContainer />
    </>
  )
}

export default ModalEditProduct