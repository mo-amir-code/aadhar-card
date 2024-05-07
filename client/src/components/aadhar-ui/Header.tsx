import satyamev from "../../assets/satyamev.png";
import aadhar from "../../assets/aadhar.png";
import flag from "../../assets/aadhar-flag.png";
import "../../aadhar.css";

const Header = () => {
  return (
    <div className="flex items-center justify-between py-1 px-4">
      <img src={satyamev} alt="sdsd" style={{ width: 20 }} />
      <img src={flag} alt="sdsd" style={{ width: 150 }} />
      <img src={aadhar} alt="sdsd" style={{ width: 40 }} />
    </div>
  );
};

export default Header;
