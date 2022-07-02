import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";

const Subscribe = () => {
  const navigate = useNavigate();

  const [stripeToken, setStripeToken] = useState(null);

  const onToken = (token) => {
    setStripeToken(token);
    const makeRequest = async () => {
      try {
        const res = await axios.post(
          "/payment",
          {
            source: stripeToken.id,
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
        navigate(-1);
      } catch (err) {
        console.log(err);
      }
    };
    makeRequest();
  };
  console.log(stripeToken);
  return (
    <>
      <div className="container">
        <h1>in order to continue you need to subscribe</h1>
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
    </>
  );
};

export default Subscribe;
