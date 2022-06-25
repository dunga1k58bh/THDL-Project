import {
  Container,
  Autocomplete,
  TextField,
  InputAdornment,
  Checkbox,
  FormControlLabel,
  Button,
  Pagination
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import React from "react";
import Header from "../components/Header";
import "./home.scss";
import Product from "../components/Product";

function Home() {
  return (
    <>
      <Header />
      <Container maxWidth="xl">
        <div className="home">
          <div className="filter">
            <Autocomplete
              freeSolo
              className="search"
              disableClearable
              options={[]}
              size="small"
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Tìm kiếm"
                  InputProps={{
                    ...params.InputProps,
                    type: "search",
                    endAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              )}
            />
            <div>
              <div className="title">Hãng sản xuất</div>
              <div className="check-box-container">
                <div className="left">
                  <FormControlLabel
                    control={<Checkbox defaultChecked />}
                    label="Apple"
                  />
                </div>
                <div className="right">
                  <FormControlLabel
                    control={<Checkbox defaultChecked />}
                    label="Nokia"
                  />
                </div>
              </div>
            </div>
            <div>
              <div className="title">Hệ điều hành</div>
              <div className="check-box-container">
                <div className="left">
                  <FormControlLabel
                    control={<Checkbox defaultChecked />}
                    label="Android"
                  />
                </div>
                <div className="right">
                  <FormControlLabel
                    control={<Checkbox defaultChecked />}
                    label="Ios"
                  />
                </div>
              </div>
            </div>
            <div>
              <div className="title">RAM</div>
              <div className="check-box-container">
                <div className="left">
                  <FormControlLabel
                    control={<Checkbox defaultChecked />}
                    label="2GB"
                  />
                </div>
                <div className="right">
                  <FormControlLabel
                    control={<Checkbox defaultChecked />}
                    label="4GB"
                  />
                </div>
              </div>
            </div>
            <div>
              <div className="title">ROM</div>
              <div className="check-box-container">
                <div className="left">
                  <FormControlLabel
                    control={<Checkbox defaultChecked />}
                    label="32GB"
                  />
                </div>
                <div className="right">
                  <FormControlLabel
                    control={<Checkbox defaultChecked />}
                    label="64GB"
                  />
                </div>
              </div>
            </div>
            <div>
              <div className="button">
                <Button variant="contained">Áp dụng</Button>
                <Button className="button-cancel" variant="outlined">
                  Hủy bỏ
                </Button>
              </div>
            </div>
          </div>
          <div className="right-page">
            <div className="product">
              <Product />
              <Product />
              <Product />
              <Product />
              <Product />
              <Product />
              <Product />
            </div>
            <div className="page">
                <Pagination count={10} color="primary"/>
            </div>
            
          </div>
        </div>
      </Container>
    </>
  );
}

export default Home;
