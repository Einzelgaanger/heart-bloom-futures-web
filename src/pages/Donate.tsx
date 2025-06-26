
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Donate = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to the payment page
    navigate("/payment", { replace: true });
  }, [navigate]);

  return null;
};

export default Donate;
