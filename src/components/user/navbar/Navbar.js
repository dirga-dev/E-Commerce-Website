import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import logo1 from "../../../assets/icons/icon-images/logo-1.png";
import { ProfileIcon } from "../../../assets/icons/icon-svg/iconSvg";
import { logoutUser } from "../../../features/product/productSlice";

const Navbar = () => {
  const { amount, login } = useSelector((store) => store.product);
  const location = useLocation().pathname;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const hamburger = document.querySelector("#hamburger");
  const navMenu = document.querySelector("#nav-menu");
  const amountLogin = amount.length !== 0 ? amount.find((item) => item.idUser === login.id) : null;

  useEffect(() => {
    const profileClick = document.querySelector("#profileClick");
    const profile = document.querySelector("#profile");
    if (hamburger) {
      window.addEventListener("click", function (e) {
        if (e.target !== hamburger && e.target !== navMenu) {
          hamburger.classList.remove("hamburger-active");
          navMenu.classList.add("hidden");
        }
      });
    }

    if (profile) {
      window.addEventListener("click", function (e) {
        if (e.target !== profileClick && e.target !== profile) {
          profile.classList.add("hidden");
        }
      });
    }
  });

  const hamburgerCLick = () => {
    const hamburger = document.querySelector("#hamburger");
    const navMenu = document.querySelector("#nav-menu");
    // Hamburger
    hamburger.classList.toggle("hamburger-active");
    navMenu.classList.toggle("hidden");
  };

  const handleProfile = () => {
    const profile = document.querySelector("#profile");
    profile.classList.toggle("hidden");
  };

  const topFunction = () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  };

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/");
  };

  return (
    <header className="bg-white bg-opacity-50 fixed top-0 left-0 w-full flex items-center z-10 " style={{ backdropFilter: `blur(5px)` }}>
      <div className="container">
        <div className="flex items-center justify-between relative">
          <div className="px-4">
            {location === "/" ? (
              <a href="#home" className="font-bold text-lg text-primary block py-3 lg:py-3">
                <img src={logo1} alt="" className="w-10 lg:w-16" />
              </a>
            ) : (
              <NavLink to="/" onClick={topFunction} className="font-bold text-lg text-primary block py-3 lg:py-3">
                <img src={logo1} alt="" className="w-10 lg:w-16" />
              </NavLink>
            )}
          </div>
          <div className="flex items-center px-4">
            <button id="hamburger" name="hamburger" type="button" onClick={hamburgerCLick} className="block absolute right-4 lg:hidden">
              <span className="hamburger-line origin-top-left transition duration-300"></span>
              <span className="hamburger-line transition duration-300"></span>
              <span className="hamburger-line origin-bottom-left transition duration-300"></span>
            </button>

            <nav id="nav-menu" className="hidden absolute py-5 lg:py-2 bg-white shadow-lg text-primary rounded-lg max-w-[250px] w-full right-4 top-full lg:block lg:static lg:bg-transparent lg:max-w-full lg:shadow-none lg:rounded-none">
              <div className="block lg:flex lg:items-center">
                <ul className="block lg:flex lg:justify-center lg:items-center">
                  <li className="group lg:hidden">
                    <h1 className="text-base text-center py-3 mx-6 mb-3 font-quicksand font-bold border-b-2 capitalize">{login.user}</h1>
                  </li>
                  <li className="group lg:flex">
                    {location === "/" ? (
                      <a href="#home" className="text-base py-2 mx-6 font-quicksand font-semibold group-hover:text-secondary">
                        Home
                        <span className="block h-0.5 w-0 group-hover:w-full transition-all duration-500  bg-secondary"></span>
                      </a>
                    ) : (
                      <NavLink to="/" onClick={() => window.scrollTo(0, 0)} className="text-base py-2 mx-6 font-quicksand font-semibold group-hover:text-secondary">
                        Home
                        <span className="block h-0.5 w-0 group-hover:w-full transition-all duration-500  bg-secondary"></span>
                      </NavLink>
                    )}
                  </li>
                  <li className="group lg:flex">
                    {location === "/" ? (
                      <a href="#category" className="text-base py-2 mx-6 font-quicksand font-semibold group-hover:text-secondary">
                        Category
                        <span className="block h-0.5 w-0 group-hover:w-full transition-all duration-500  bg-secondary"></span>
                      </a>
                    ) : (
                      <NavLink to="/#category" onClick={() => window.scrollTo(0, 792)} className="text-base py-2 mx-6 font-quicksand font-semibold group-hover:text-secondary">
                        Category
                        <span className="block h-0.5 w-0 group-hover:w-full transition-all duration-500  bg-secondary"></span>
                      </NavLink>
                    )}
                  </li>
                  {login.id && (
                    <li className="group lg:flex relative">
                      <NavLink to="/cart" onClick={() => window.scrollTo(0, 0)} className="z-20 text-base py-2 mx-6 font-quicksand font-semibold group-hover:text-secondary">
                        Cart
                        <span className="block h-0.5 w-0 group-hover:w-full transition-all duration-500  bg-secondary"></span>
                      </NavLink>
                      <div className="flex absolute top-0 left-16 lg:-right-1 justify-center items-center">
                        <span className=" bg-secondary rounded-full text-primary text-xs font-semibold px-2 py-1">{amountLogin ? amountLogin.amount : 0}</span>
                      </div>
                    </li>
                  )}
                  {login.id && (
                    <li className="group lg:flex relative">
                      <NavLink to="/wishlist" onClick={() => window.scrollTo(0, 0)} className="z-20 text-base py-2 mx-6 font-quicksand font-semibold group-hover:text-secondary">
                        Wishlist
                        <span className="block h-0.5 w-0 group-hover:w-full transition-all duration-500  bg-secondary"></span>
                      </NavLink>
                    </li>
                  )}
                  {!login.id ? (
                    <li className="group lg:flex">
                      <Link to="/login" className="lg:hidden bg-blueButton shadow-md rounded-full text-primaryLight text-base py-1 px-6 mx-6 font-quicksand font-semibold group-hover:brightness-110">
                        Login
                      </Link>
                    </li>
                  ) : (
                    <div className="group lg:flex">
                      <button
                        className="lg:hidden outline-1 shadow-md rounded-full text-primary text-base py-1 px-6 mx-6 font-quicksand font-semibold transition ease-in-out duration-200 group-hover:brightness-110 hover:bg-blueButton hover:text-primaryLight"
                        onClick={handleLogout}
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </ul>
                {/* <form onSubmit={handleSubmit} className="mx-6 flex">
                  <input type="text" onChange={searchChange} className="text-base border border-primary border-opacity-50 rounded-lg mr-3 px-2 w-1/2" />
                  <button className="py-1 px-3 w-1/2 md:w-1/3 bg-primary rounded-lg text-secondary transition duration-200 hover:opacity-80">Search</button>
                </form> */}
              </div>
            </nav>
          </div>
          {!login.id ? (
            <div className="hidden group lg:flex">
              <Link to="/login" className="bg-blueButton shadow-md rounded-full text-primaryLight text-base py-1 px-6 mx-6 font-quicksand font-semibold transition ease-in-out duration-200 group-hover:brightness-110">
                Login
              </Link>
            </div>
          ) : (
            <div className="hidden group pr-5 lg:flex lg:justify-center ">
              <div className="w-full">
                <button id="profileClick" className="[&>*]:mr-2 flex justify-center items-center capitalize transition duration-200 ease-in-out hover:text-secondary" onClick={handleProfile}>
                  <ProfileIcon />
                  {login.user}
                </button>
              </div>
              <div id="profile" className="hidden bg-white absolute py-5 mt-10 rounded-lg shadow-sm">
                <button
                  className="outline-1 shadow-md rounded-lg text-primary text-base py-1 px-6 mx-6 font-quicksand font-semibold transition ease-in-out duration-200 group-hover:brightness-110 hover:bg-blueButton hover:text-primaryLight"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
