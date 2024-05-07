import FooterWithUID from "../components/aadhar-ui/FooterWithUID";
import Header from "../components/aadhar-ui/Header";
import person from "../assets/person.png";
import qr from "../assets/qr.jpg";
import "../aadhar.css";
import { useMyContext } from "../context/contextAPI";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Aadhar = () => {
  const { isUserLoggedIn, userInfo } = useMyContext();
  const navigate = useNavigate();

  useEffect(() => {

    if(!isUserLoggedIn || !userInfo){
      navigate("/");
    }

  }, [isUserLoggedIn, userInfo]);

  return (
    <main className="min-h-screen form-max-width flex items-center justify-center mx-auto flex items-center">
      <div className="flex-col flex">
        <article
          style={{ width: 360, height: 200 }}
          className="shadow-lg mx-4 my-2 bg-white round-lg"
        >
          <Header />
          <div className="flex justify-between pt-4 px-2">
            <div style={{ width: 80 }} className="round-lg overflow-hidden">
              <img src={person} alt="" width={80} />
            </div>
            <div
              style={{ fontSize: 10 }}
              className="flex-grow font-semibold flex flex-col justify-between"
            >
              <div className="pl-6">
                <span>Name: {userInfo?.name}</span>
                <br />
                <span>DOB: {userInfo?.dob}</span>
              </div>
            </div>
            <div style={{ width: 80 }} className="overflow-hidden pr-2 pt-4">
              <img src={qr} alt="" width={80} />
            </div>
          </div>
          <FooterWithUID uid={userInfo?.uid || ""} />
        </article>

        {/* End aadhar ui */}

        {/* Aadhar back side ui */}

        <article
          style={{ width: 360, height: 200 }}
          className="shadow-lg mx-4 bg-white round-lg"
        >
          <Header />
          <div className="flex justify-between pt-4 px-2">
            <div style={{ fontSize: 9 }} className="flex-grow font-semibold">
              <div>
                <span>Address</span>
                <br />
                <span className="text-wrap">
                  {userInfo?.address}
                </span>
                <br />
                <span>Mobile No: {userInfo?.phone}</span>
              </div>
            </div>
            <div className="rounded-lg overflow-hidden pr-2 pt-4">
              <img src={qr} alt="" width={80} />
            </div>
          </div>
          <FooterWithUID uid={userInfo?.uid || ""} />
        </article>
      </div>
    </main>
  );
};

export default Aadhar;
