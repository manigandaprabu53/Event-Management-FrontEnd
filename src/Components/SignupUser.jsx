import React, { useState } from 'react'
import * as yup from 'yup';
import api from '../Services/ApiService'
import ApiRoutes from '../Utils/ApiRoutes';
import toast from 'react-hot-toast';
import {Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';

function SignupUser() {

  let navigate = useNavigate();

    let [initiate, setInitiate] = useState({
        name: '',
        email: '',
        password: ''
    })

    const userSchema = yup.object().shape({
        name: yup.string().required('Required'),
        email: yup.string().required('Required'),
        password: yup.string().required('Required')
    });

    const handleSignUp = async(values)=>{
      try {
        console.log("*******************")
          let response = await api.post(ApiRoutes.SignupUser.path, values, {authenticate: ApiRoutes.SignupUser.authenticate});
          console.log(response)
          toast.success(response.message);
          navigate('/login');
      } catch (error) {
          toast.error(error.response.data.message) || "Error Occured! Please Try Again"
      }
  }

  let formik = useFormik({
      initialValues: initiate,
      enableReinitialize: true,
      validationSchema: userSchema,
      onSubmit: (values) =>{
        handleSignUp(values);
      }
  })

  return <>
    <div className='cover'>
      <div className="login-container">
          <h1>Sign Up</h1>
          <p className='text-align-center'>Already have an account? <Link to='/login' className='url'>Login</Link></p>
          <form className='login-form' onSubmit={formik.handleSubmit}>
              <div className="form-group">
                  <label htmlFor="name">Name: </label>
                  <input type="text" id='name' name='name' value={formik.values.name} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
                  {formik.touched.name && formik.errors.name ? (<div style={{color: "red"}}>{formik.errors.name}</div>) : null}
              </div>

              <div className="form-group">
                  <label htmlFor="email">Email: </label>
                  <input type="email" id='email' name='email' value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
                  {formik.touched.email && formik.errors.email ? (<div style={{color: "red"}}>{formik.errors.email}</div>) : null}
              </div>

              <div className="form-group">
                  <label htmlFor="password">Password: </label>
                  <input type="password" id='password' name='password' value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
                  {formik.touched.password && formik.errors.password ? (<div style={{color: "red"}}>{formik.errors.password}</div>) : null}
              </div>
              <button type='submit'>Submit</button>
          </form>
      </div>
    </div>
  </>
}

export default SignupUser