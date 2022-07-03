import { Container } from "@mui/material";
import React, { useEffect, useState } from "react";
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
import { useNavigate,useParams } from "react-router-dom";
import * as axios from "axios";

function Detail() {
  const navigate = useNavigate();
  const {id} = useParams();
  const [data, setData] = useState({})
  const [row, setRow] = useState([])
  useEffect(() => {
    axios.get(`http://20.212.104.107:3001/phone/${id}`).then((res) => {
      setData(res.data.result);
      console.log(res.data.result);
    });
    axios.get(`http://20.212.104.107:3001/compare/${id}`).then((res) => {
      setRow(res.data.result);
      console.log(res.data.result);
    });
  },[])
  return (
    <>
      <Header />
      <Container maxWidth="xl">
        <div className="back" onClick={() => navigate("/")}>
          <ArrowBackIcon fontSize="15px" color="primary" />
          <div className="back-text">Quay lại</div>
        </div>
        <div className="title-product">
          <div>{data.name}</div>
        </div>
        <div className="product">
          <div className="image">
            <img className="img" src={data.image || Images.noImage} alt=""></img>
          </div>
          <div className="info">
            <div className="info-row">
              <div className="name">Hệ điều hành</div>
              <div className="value">{data.operating_system || "Không rõ"}</div>
            </div>
            <div className="info-row">
              <div className="name">RAM</div>
              <div className="value">{data.ram || "Null"} GB</div>
            </div>
            <div className="info-row">
              <div className="name">ROM</div>
              <div className="value">{data.rom || "Null"} GB</div>
            </div>
            <div className="info-row">
              <div className="name">Loại màn hình</div>
              <div className="value">{data.display_tech}</div>
            </div>
            <div className="info-row">
              <div className="name">Kích thước màn hình</div>
              <div className="value">{data.display_size || "Null"} inch</div>
            </div>
            <div className="info-row">
              <div className="name">Độ phân giải</div>
              <div className="value">{data.resolution}</div>
            </div>
            <div className="info-row">
              <div className="name">Tần số quét</div>
              <div className="value">{data.monitor_frequency || "Null"} Hz</div>
            </div>
            <div className="info-row">
              <div className="name">Loại CPU</div>
              <div className="value">{data.cpu_type}</div>
            </div>
            <div className="info-row">
              <div className="name">CPU</div>
              <div className="value">{data.cpu}</div>
            </div>
            <div className="info-row">
              <div className="name">Camera sau</div>
              <div className="value">{data.camera}</div>
            </div>
            <div className="info-row">
              <div className="name">Camera selfie</div>
              <div className="value">{data.camera_selfie}</div>
            </div>
            <div className="info-row">
              <div className="name">Camera selfie</div>
              <div className="value">{data.camera_selfie}</div>
            </div>
            <div className="info-row">
              <div className="name">Pin</div>
              <div className="value">{data.battery || "Null"} mAh</div>
            </div>
            <div className="info-row">
              <div className="name">Bluetooth</div>
              <div className="value">{data.bluetooth}</div>
            </div>
            <div className="info-row">
              <div className="name">Sim</div>
              <div className="value">{data.sim}</div>
            </div>
            <div className="info-row">
              <div className="name">Trọng lượng</div>
              <div className="value">{data.weight || "Null"} gram</div>
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
                    <TableCell>Url</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.map((row) => (
                    <TableRow
                      key={row.source}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {row.source}
                      </TableCell>
                      <TableCell>{row.price}</TableCell>
                      <TableCell><a href={row.url} target="_blank">{row.url}</a></TableCell>
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
