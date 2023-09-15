import resetImg from '../../assets/forgot.png'
import styles from './auth.module.scss'
import { Link } from 'react-router-dom'
import Card from '../../components/card/Card'
import { toast } from 'react-toastify'
import { useState } from 'react'
import {  sendPasswordResetEmail } from "firebase/auth";
import { auth } from '../../firebase/config'
import Loader from "../../components/loader/Loader";
const Reset = () => {

  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
const resetPassword = (e) => {
  e.preventDefault();
  setIsLoading(true);
   sendPasswordResetEmail(auth, email)
  .then(() => {
    setIsLoading(false);
   toast.success("Email Sent for Password Reset")
  })
  .catch((error) => {
    setIsLoading(false);
    toast.error(error.message)
    // ..
  });
}
  return (
    <>
    {isLoading  && <Loader/>}
    <section className={` container ${styles.auth}`}>
      <div className={styles.img}>
        <img src={resetImg} alt="Register" width='400px' />
      </div>
      <Card>
        <div className={styles.form}>
          <h2> Reset Password </h2>
          <form  onSubmit={resetPassword}>
            <input type="email" placeholder='Email' required
                value={email}
                onChange={(e) => setEmail(e.target.value)} />

            <button type='submit' className='--btn --btn-primary --btn-block'> Reset Password</button>
            <span className={styles.register}>
           <p>
              <Link to="/login">- Login</Link>

           </p>
           <p>
              <Link to="/register">- Register</Link>

           </p>

            </span>
            
          </form>
        </div>
      </Card>

    </section>
    </>
  )
}

export default Reset