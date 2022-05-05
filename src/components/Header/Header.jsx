import Main from "../Main/Main";
import NavbarComp from "../NavbarComp";
import style from "./Header.module.scss";

const Header = () => {
  return (
    <>
      <div className="container">
        <NavbarComp />
        <Main />
      </div>
    </>
  );
};
export default Header;
