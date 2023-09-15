import { useState, useEffect } from 'react'
import styles from '../header/Header.module.scss';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaTimes, FaUserCircle } from 'react-icons/fa'
import { HiOutlineMenuAlt3 } from 'react-icons/hi'
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from '../../firebase/config';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { SET_ACTIVE_USER , REMOVE_ACTIVE_USER  } from '../../redux/slice/authSlice';
import ShowOnLogin from '../hiddenLink/hideenLink';
import { ShowOnLogout } from '../hiddenLink/hideenLink';
const logo = (<div className={styles.logo}>
  <Link to="/" >
    <h2>e<span>Shop</span>.</h2>

  </Link>
</div>)

const cart = (
  <span className={styles.cart} >
    <Link to='/cart'>Cart
      <FaShoppingCart size={19} />
      <p>29</p>
    </Link>
  </span>
)
const activeLink = (({ isActive }) =>
  (isActive ? `${styles.active}` : ""))

export const Header = () => {

  const [showMenu, setShowMenu] = useState(false)
  const [displayName, setDisplayName] = useState("")
  const navigate = useNavigate();

  const dispatch = useDispatch();

  useEffect(() => {

    onAuthStateChanged(auth, (user) => {
      if (user) {
        // console.log(user)
        if(user.displayName== null) {
          // const u1 = user.email.slice(0,-10); remove last 10 digit
          const u1 = user.email.substring(0 , user.email.indexOf("@"));
            const uName = u1.charAt(0).toLocaleUpperCase() 
            + u1.slice(1)

         setDisplayName(uName);

        }
        else {
          setDisplayName(user.displayName);

        }


        dispatch(SET_ACTIVE_USER({
          email: user.email,
          userName: user.displayName ? user.displayName : displayName,
          userID: user.uid,
        }))
      } else {
        setDisplayName("");
        dispatch(REMOVE_ACTIVE_USER());

      }
    });

  }, [dispatch, displayName ])
  const toggleMenu = () => {
    setShowMenu(!showMenu)
  }
  const hideMenu = () => {
    setShowMenu(false)
  }

  const logoutUser = () => {
    signOut(auth).then(() => {
      toast.success("Logout Successfully")
      navigate('/')
    }).catch((error) => {
      toast.error(error.message)
    });

  }
  return (
    <header>
      <div className={styles.header}>
        {logo}
        <nav
          className={
            showMenu ? `${styles["show-nav"]}` : `${styles["hide-nav"]}`
          }
        >
          <div
            className={
              showMenu
                ? `${styles["nav-wrapper"]} ${styles["show-nav-wrapper"]}`
                : `${styles["nav-wrapper"]}`
            }
            onClick={hideMenu}
          ></div>
          <ul onClick={hideMenu}>
            <li className={styles['logo-mobile']}>
              <Link to="/"  >
                {logo}
                <FaTimes size={22} color='white' onClick={hideMenu} />
              </Link>
            </li>
            <li>
              <NavLink to="/"
                className={activeLink} >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/contact" className={activeLink} >
                Contact Us
              </NavLink>
            </li>
          </ul>
          <div className={styles["header-right"]} onClick={hideMenu}>
            <span className={styles.links}>
              <ShowOnLogout>
              <NavLink className={activeLink} to='/login'>Login</NavLink>
              </ShowOnLogout>
              <ShowOnLogin>
              <a href="#" style={{color:"#ff7722"}}><FaUserCircle size={16} /> Hi {displayName} </a>
              </ShowOnLogin>
              <ShowOnLogout>
              <NavLink className={activeLink} to='/register'>Register</NavLink>
              </ShowOnLogout>
              <ShowOnLogin>
              <NavLink className={activeLink} to='/order-history'>My Orders</NavLink>
              </ShowOnLogin>
              <ShowOnLogin>
              <NavLink to='/' onClick={logoutUser}>Logout</NavLink>
              </ShowOnLogin> 
            </span>
            {cart}
          </div>
        </nav>
        <div className={styles['menu-icon']}>
          {cart}
          <HiOutlineMenuAlt3 size={28}
            onClick={toggleMenu}
          />
        </div>
      </div>
    </header>
  )
}
