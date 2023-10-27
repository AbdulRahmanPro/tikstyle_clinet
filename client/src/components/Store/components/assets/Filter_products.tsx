import { useState, useEffect,useCallback } from 'react';
// useCallback
import { useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
// import { additem } from '../../../../redux/Silce/CartSilce';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import AxiosDataBase from '../../../../Axios/AxiosDataBase';
import { Box } from '@mui/material'; // أضفت Box هنا
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { additem } from '../../../../redux/Silce/CartSilce';

function Filter_products() {
  const [data, setdata] = useState<any>({ type: '', Category: '' });
  const dispatch = useDispatch()
  const nagitve = useNavigate()
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  // const dispatch = useDispatch();
  const filter = useSelector((state: any) => state.filter.mark);
  const handleTypeChange = (event: any) => {
    setdata({ ...data, [event.target.name]: event.target.value });
  };
  const type = queryParams.get('type');
  const Category = queryParams.get('Category');
  const cart = useSelector((state: any) => state.cart.items);
  console.log(cart);
  const [products, setproducts] = useState<any[]>([]);
  // تحسين الأداء باستخدام useCallback
  // const addcartChange = useCallback((shoe: any) => {
  //   try {
  //     const modifiedProduct = { ...shoe, count: 1 };
  //     const existingProduct = JSON.parse(sessionStorage.getItem("cart") || "[]");
  //     if (existingProduct.length === 0) {
  //       sessionStorage.setItem("cart", JSON.stringify([modifiedProduct]));
  //       dispatch(additem(modifiedProduct));
  //       console.log(cart);

  //     } else if (existingProduct.length > 0) {
  //       const finditems = existingProduct.find((item: any) => item._id === shoe._id);
  //       if (!finditems) {
  //         existingProduct.push(modifiedProduct);
  //         sessionStorage.setItem("cart", JSON.stringify(existingProduct));
  //         dispatch(additem(modifiedProduct));
  //         console.log(cart);


  //       } else {
  //         finditems.count++;
  //         sessionStorage.setItem("cart", JSON.stringify(existingProduct));
  //         dispatch(additem(modifiedProduct));
  //         console.log(cart);

  //       }
  //     }

  //   } catch (error) {
  //     console.error(error)
  //   }
  // }, [dispatch, additem, cart]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response;
        if (data.type !== '' && data.Category !== '') {
          response = await AxiosDataBase.axiosLogin.get(
            `/product/filter?type=${data.type}&Category=${data.Category}`
          );
          console.log(1);
          setproducts(response.data.result);
        } else if (type !== null && Category === null) {
          response = await AxiosDataBase.axiosLogin.get(`/product/filter?type=${type}`);
          console.log(2);
          setproducts(response.data.result);
        } else {
          response = await AxiosDataBase.axiosLogin.get(
            `/product/filter?type=${'null'}&Category=${'null'}`
          );
          console.log(3);
          setproducts(response.data.result);
        }
        const result = response.data.result;
        setproducts(result);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData(); // استدعاء الوظيفة المساعدة للحصول على البيانات
  }, [data]);
  const movenextpage = (e: React.MouseEvent<HTMLElement>) => {
    const customValue = e.currentTarget.getAttribute('id');
    nagitve(`/product/${customValue}`)
    // or e.currentTarget.id directly
  }
  const addcartChange = useCallback((shoe: any) => {
    try {
      const modifiedProduct = { ...shoe, count: 1 };
      const existingProduct = JSON.parse(sessionStorage.getItem("cart") || "[]");
      if (existingProduct.length === 0) {
        sessionStorage.setItem("cart", JSON.stringify([modifiedProduct]));
        dispatch(additem(modifiedProduct));
        console.log(cart);

      } else if (existingProduct.length > 0) {
        const finditems = existingProduct.find((item: any) => item._id === shoe._id);
        if (!finditems) {
          existingProduct.push(modifiedProduct);
          sessionStorage.setItem("cart", JSON.stringify(existingProduct));
          dispatch(additem(modifiedProduct));
          console.log(cart);


        } else {
          finditems.count++;
          sessionStorage.setItem("cart", JSON.stringify(existingProduct));
          dispatch(additem(modifiedProduct));
          console.log(cart);

        }
      }

    } catch (error) {
      console.error(error)
    }
  }, [dispatch, additem, cart]);

  return (
    <div className='grid grid-rows-1 grid-cols-1 lg:grid-cols-3 gap-4 p-4'>
      <div className='lg:col-span-1  h-96 bg-white border-4 border-gray-300 p-4 rounded-lg'>
        <h1 className='text-3xl text-center mb-4 font-semibold'>فلترة المنتجات</h1>
        <div className='mb-6'>
          <h2 className='text-xl mb-2 font-semibold'>السعر</h2>
        </div>
        <div className='mb-6'>
          <h2 className='text-xl mb-2 font-semibold'>الماركة</h2>
          <TextField
            id='outlined-select-currency'
            select
            label='الماركة'
            value={data.type}
            name='type'
            onChange={handleTypeChange}
            className='w-full'
            variant='outlined'
          >
            {filter.map((option:any) => (
              <MenuItem key={option.name} value={option.name}>
                {option.name}
              </MenuItem>
            ))}
          </TextField>
        </div>
        <div className='mb-6'>
          <h2 className='text-xl mb-2 font-semibold'>تصنيف المنتج</h2>
          <TextField
            select
            label='تصنيف المنتج'
            variant='outlined'
            value={data.Category}
            name='Category'
            onChange={handleTypeChange}
            className='w-full'
          >
            {data.type === 'Nike' || data.type === 'Converse' ? (
              filter.map((option:any) => (
                option.name === data.type ? (
                  option.Category.map((option:any) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))
                ) : null
              ))
            ) : (
              <MenuItem key={data.type} value={data.type}>
                {data.type}
              </MenuItem>
            )}
          </TextField>
        </div>
      </div>
     <Box className="col-span-2  gap-10">
     <Box
      className=' grid grid-cols-3 grid-rows-2   relative mt-10 '
      sx={{
        gridTemplateColumns: { xs: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' },

      }}
      >
        {
        products.map((shoe: any) => (
          <Box key={shoe._id}
            sx={{
              width: { xs: '100%', md: '80%', xl:"40%" },
            }}
            className='w-64 h-[360px] grid grid-cols-2 grid-rows-2 rounded-md bg-white shadow-xl m-5 '>
            <Box
            sx={{
              height: {xs:"80%"}
            }}
            className='iamge col-span-2 row-span-3 flex items-center justify-center w-full'>
              <img
                onClick={movenextpage}
                id={shoe._id}
                className="w-full h-[250px] rounded-t-md shadow-md transform scale-100 transition-transform hover:scale-110"
                src={`${shoe.mainImage.linkimage}`}
                alt=""
              />
            </Box>
            <div className=' relative top-10 col-span-2 flex flex-col justify-center items-end ml-5 h-1/2'>
              <p className='text-2xl text-center'>{shoe.name}</p>
              <p className='text-4xl text-center'>${shoe.price}</p>
            </div>
            <div onClick={addcartChange} className=' relative bottom-10 right-5 col-span-3 bg-red-600 w-10 h-8 flex justify-center items-center rounded-lg  cursor-pointer'>
              <FontAwesomeIcon icon={faPlus} style={{ color: "white" }} />
            </div>
          </Box>
        ))
      }
    </Box >
     </Box>
    </div>
  );
}

export default Filter_products;
