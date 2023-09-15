import  { useState } from 'react'
import styles from './auth.module.scss'
import loginImg from '../../assets/login.png'
import { Link, useNavigate } from 'react-router-dom'
import { FaGoogle } from 'react-icons/fa'
import Card from '../../components/card/Card'
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../firebase/config";
import Loader from "../../components/loader/Loader";
import { toast } from "react-toastify";

const provider = new GoogleAuthProvider();

const Login = () => {


  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate(); // Add parentheses to useNavigate
  


  const loginUser = (e) => {
    e.preventDefault();
    setIsLoading(true);

    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        setIsLoading(false);
        toast.success("Login Successful...");
        navigate('/'); // Use navigate() as a function
      })
      .catch((error) => {
        setIsLoading(false);
        toast.error(error.message);
      });
  };
  const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then(() => {
        
        toast.success("Login Successfully With Google...");
        navigate('/'); // Use navigate() as a function

      }).catch((error) => {
        toast.error(error.message);
      });
  }
  

  return (
    <>

      {isLoading && <Loader />}
      <section className={` container ${styles.auth}`}>
        <div className={styles.img}>
          <img src={loginImg} alt="Login" width='400px' />
        </div>
        <Card>
          <div className={styles.form}>
            <h2> Login</h2>
            <form onSubmit={loginUser}>
              <input type="email" placeholder='Email' required
                value={email}
                onChange={(e) => setEmail(e.target.value)} />
              <input type="password" placeholder='Password' required
                value={password}
                onChange={(e) => setPassword(e.target.value)} />
              <button type='submit' className='--btn --btn-primary --btn-block'> Login</button>
              <div className={styles.links}>
                <Link to='/reset'> Reset Password</Link>
              </div>
              <p>-- or --</p>

              <button className='--btn --btn-danger --btn-block' onClick={signInWithGoogle} ><FaGoogle color='white' /> <p style={{ color: "white" }} > Login With Google</p></button>
              <span className={styles.register}>
                <p> Don`t have an account?</p>
                <Link to="/register">Register</Link>

               

              </span>
            </form>

          </div>
        </Card>
      </section>
    </>
  )
}

export default Login