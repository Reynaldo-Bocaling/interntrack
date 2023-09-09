import React, { useEffect, useState } from "react";
import CompanyView from "../../components/Company-info/index";
import { useLocation, useNavigate } from "react-router-dom";
const ViewCompany = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [data, setData] = useState([]);

  useEffect(() => {
    if (location.state != null) {
      setData(location.state);
    } else {
      navigate("/companies");
    }
  }, []);

  return <div> {data != null && <CompanyView data={data} />} </div>;
};

export default ViewCompany;
