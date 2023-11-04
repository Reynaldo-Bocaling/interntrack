import React, { useRef } from "react";
import { Student } from "../../components/dummyData/Data";
import {
  Card,
  Image,
  Text,
  Badge,
  Button,
  Table, // I-import ang Table component mula sa iyong UI library
} from "@mantine/core";
import { useReactToPrint } from "react-to-print";
// import logo from "../../assets/images/neustLogo.png";

const Home = () => {
  const student = Student;
  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <div>
      <button onClick={handlePrint} className="bg-red-500">Print</button>

      <div style={{ display: "nones" }}>
        <div ref={componentRef}>
          <h1>Hello from Print Content</h1>
          <Table data={student.attendance} columns={student.columns} />
        </div>
      </div>
    </div>
  );
};

export default Home;
