import "./subscribe.scss";
import { useLocation, useNavigate } from "react-router-dom";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../../authContext/AuthContext";

const Subscribe = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const movie = location.state;
  const { dispatch } = useContext(AuthContext);

  console.log(location, movie);

  const onToken = (token) => {
    console.log(token);
    const makeRequest = async () => {
      try {
        const res = await axios.post(
          "/payment",
          {
            source: token.id,
            amount: 10000,
          },
          {
            headers: {
              token:
                "Bearer " +
                JSON.parse(localStorage.getItem("user")).accessToken,
            },
          }
        );
        navigate("/watch", { state: movie });
      } catch (err) {
        console.log("err", err);
      }
    };
    makeRequest();
  };
  return (
    <>
      <div className="subscribe_wrapper">
        <img
          className="bg-image"
          src="https://img.freepik.com/free-vector/realistic-film-strip-with-popcorn-movie-ticket_1017-38430.jpg?t=st=1656950633~exp=1656951233~hmac=aeba901e92d63b333b42ab8af00079dbeb9fe5396c9b1b7fcdd6f305aa516500&w=1380"
          alt=""
        />
        <h1 className="main_propmt">Your subscribtion has expired!</h1>
        <div className="directions">
          <h2 className="secondary_propmt">
            In order to continue, you need to renew you subscribtion
          </h2>
          <StripeCheckout
            name="Movie Mania"
            image="https://raw.githubusercontent.com/youssefwt/Movie-Mania/main/logo.png"
            description="Subscribe for 1 month"
            amount={10000}
            token={onToken}
            stripeKey="pk_test_51KhzxNEHwj20Yn6RZTOFDxaHP3m22XbpDuDywMsZthUWTOyKJtEvTpOxcAL7FfeC4uOlucTXQ39azat1SDexH3D200Amtv1A4z"
            email="Movie_mania@mmania.com"
          ></StripeCheckout>
        </div>
      </div>
    </>
  );
};

export default Subscribe;
