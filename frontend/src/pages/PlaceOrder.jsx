import React, { useContext, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Title from '../components/Title';
import CartTotal from '../components/CartTotal';
import { assets } from '../assets/assets';
import { ShopContext } from '../context/ShopContext';

const PlaceOrder = () => {
  const { navigate } = useContext(ShopContext);
  const [method, setMethod] = useState('cod');

  // Yup validation schema
  const validationSchema = Yup.object({
    firstName: Yup.string().required('First name is required'),
    lastName: Yup.string().required('Last name is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    street: Yup.string().required('Street is required'),
    city: Yup.string().required('City is required'),
    state: Yup.string().required('State is required'),
    zipcode: Yup.number().required('Zipcode is required'),
    country: Yup.string().required('Country is required'),
    phone: Yup.string().required('Phone number is required'),
  });

  return (
    <Formik
      initialValues={{
        firstName: '',
        lastName: '',
        email: '',
        street: '',
        city: '',
        state: '',
        zipcode: '',
        country: '',
        phone: '',
      }}
      validationSchema={validationSchema}
      onSubmit={(values, { resetForm }) => {
        console.log(values)
        fetch('http://localhost:5001/api/sendForm', { 
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(values),
        })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          console.log('Email sent successfully:', data);
          resetForm();
          navigate('/orders');
        })
        .catch((error) => {
          console.error('Error sending email:', error);
          alert('Failed to send the email. Please try again later.');
        });
      }}
    >
      {({ handleSubmit }) => (
        <Form className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t'>
          <div className='flex flex-col gap-4 w-full sm:max-w-[480px]'>
            <div className='text-xl sm:text-2xl my-3'>
              <Title text1={'DELIVERY'} text2={'INFORMATION'} />
            </div>
            <div className='flex gap-3'>
              <div className='w-full'>
                <Field
                  name="firstName"
                  className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
                  placeholder='First name'
                />
                <ErrorMessage name="firstName" component="div" className='text-red-500 text-sm' />
              </div>
              <div className='w-full'>
                <Field
                  name="lastName"
                  className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
                  placeholder='Last name'
                />
                <ErrorMessage name="lastName" component="div" className='text-red-500 text-sm' />
              </div>
            </div>
            <Field
              name="email"
              className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
              type='email'
              placeholder='Email Address'
            />
            <ErrorMessage name="email" component="div" className='text-red-500 text-sm' />
            <Field
              name="street"
              className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
              placeholder='Street'
            />
            <ErrorMessage name="street" component="div" className='text-red-500 text-sm' />
            <div className='flex gap-3'>
              <Field
                name="city"
                className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
                placeholder='City'
              />
              <ErrorMessage name="city" component="div" className='text-red-500 text-sm' />
              <Field
                name="state"
                className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
                placeholder='State'
              />
              <ErrorMessage name="state" component="div" className='text-red-500 text-sm' />
            </div>
            <div className='flex gap-3'>
              <Field
                name="zipcode"
                className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
                type='number'
                placeholder='Zipcode'
              />
              <ErrorMessage name="zipcode" component="div" className='text-red-500 text-sm' />
              <Field
                name="country"
                className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
                placeholder='Country'
              />
              <ErrorMessage name="country" component="div" className='text-red-500 text-sm' />
            </div>
            <Field
              name="phone"
              className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
              type='number'
              placeholder='Phone Number'
            />
            <ErrorMessage name="phone" component="div" className='text-red-500 text-sm' />
          </div>

          {/* Right side */}
          <div className='mt-8'>
            <div className='mt-8 min-w-80'>
              <CartTotal />
            </div>
            <div className='mt-12'>
              <Title text1={'PAYMENT'} text2={'METHOD'} />
              <div className='flex gap-3 flex-col lg:flex-row'>
                <div
                  onClick={() => setMethod('stripe')}
                  className='flex items-center gap-3 border p-2 px-3 cursor-pointer'
                >
                  <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'stripe' ? 'bg-green-400' : ''}`}></p>
                  <img className='h-5 mx-4' src={assets.stripe_logo} alt="Stripe logo" />
                </div>
                <div
                  onClick={() => setMethod('razorpay')}
                  className='flex items-center gap-3 border p-2 px-3 cursor-pointer'
                >
                  <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'razorpay' ? 'bg-green-400' : ''}`}></p>
                  <img className='h-5 mx-4' src={assets.razorpay_logo} alt="Razorpay logo" />
                </div>
                <div
                  onClick={() => setMethod('cod')}
                  className='flex items-center gap-3 border p-2 px-3 cursor-pointer'
                >
                  <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'cod' ? 'bg-green-400' : ''}`}></p>
                  <p className='text-gray-500 text-sm font-medium mx-4'>CASH ON DELIVERY</p>
                </div>
              </div>
              <div className='w-full text-end mt-8'>
                <button
                  type="submit"
                  className='bg-black text-white px-16 py-3 text-sm'
                >
                  PLACE ORDER
                </button>
              </div>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default PlaceOrder;
