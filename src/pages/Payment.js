import { useLocation } from "react-router-dom";

const Payment = () => {
  const location = useLocation();
  const { title } = location.state;

  return <span>{title}</span>;
};

export default Payment;
