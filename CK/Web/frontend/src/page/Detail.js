import { Container } from "@mui/material";
import React from "react";
import Header from "../components/Header";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import "./detail.scss";
import Images from "../image/Image";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useNavigate } from "react-router-dom";



const rows = [
  {
    name: "Thế giới di động",
    price: 2000000,
  },
  {
    name: "Sendo",
    price: 2000000,
  },
];

function Detail() {
  const navigate = useNavigate();
  return (
    <>
      <Header />
      <Container maxWidth="xl">
        <div className="back" onClick={() => navigate("/")}>
          <ArrowBackIcon fontSize="15px" color="primary" />
          <div className="back-text">Quay lại</div>
        </div>
        <div className="title-product">
          <div>Iphone 8</div>
        </div>
        <div className="product">
          <div className="image">
            <img className="img" src={Images.noImage} alt=""></img>
          </div>
          <div className="info">
            <div className="info-row">
              <div className="name">Hệ điều hành</div>
              <div className="value">IOS</div>
            </div>
            <div className="info-row">
              <div className="name">RAM</div>
              <div className="value">2GB</div>
            </div>
            <div className="info-row">
              <div className="name">ROM</div>
              <div className="value">32GB</div>
            </div>
            <div className="info-row">
              <div className="name">Màn hình</div>
              <div className="value">OLED</div>
            </div>
            <div className="info-row">
              <div className="name">Pin</div>
              <div className="value">3000mAh</div>
            </div>
          </div>
        </div>
        <div className="compare">
          <div className="title-1">So sánh giữa các cửa hàng</div>
          <div className="table">
            <TableContainer component={Paper}>
              <Table
                sx={{ minWidth: 650 }}
                size="small"
              >
                <TableHead>
                  <TableRow>
                    <TableCell>Cửa hàng</TableCell>
                    <TableCell>Giá</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <TableRow
                      key={row.name}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {row.name}
                      </TableCell>
                      <TableCell>{row.price}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </div>
      </Container>
    </>
  );
}

export default Detail;
