import {
  Container,
  Autocomplete,
  TextField,
  InputAdornment,
  Checkbox,
  FormControlLabel,
  Button,
  Pagination,
  Switch,
  Backdrop,
  CircularProgress,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import "./home.scss";
import Product from "../components/Product";
import * as axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { updateState } from "../App";

function Home() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalPage, setTotalPage] = useState(1);
  const [filterOption, setFilterOption] = useState({});
  const selectedRam = useSelector((state) => state.product.selectedRam);
  const selectedRom = useSelector((state) => state.product.selectedRom);
  const selectedDisplaySize = useSelector(
    (state) => state.product.selectedDisplaySize
  );
  const selectedBattery = useSelector((state) => state.product.selectedBattery);
  const selectedCpuType = useSelector((state) => state.product.selectedCpuType);
  const searchValue = useSelector((state) => state.product.searchValue);
  const [hasImage, setHasImage] = useState(true);
  const page = useSelector(state => state.product.page);
  const dispatch = useDispatch();
  useEffect(() => {
    const filter = {
      ram: filterOption.ram?.filter((e, i) => selectedRam[i]),
      rom: filterOption.rom?.filter((e, i) => selectedRom[i]),
      battery: filterOption.battery?.filter((e, i) => selectedBattery[i]),
      display_size: filterOption.display_size?.filter(
        (e, i) => selectedDisplaySize[i]
      ),
      searchValue,
      hasImage,
      page
    };
    setLoading(true)
    axios.post("http://20.212.104.107:3001/phone", filter).then((res) => {
      setData(res.data.result.data);
      setTotalPage(res.data.result.pagination.lastPage);
      setLoading(false)
    });
    axios.get("http://20.212.104.107:3001/filter").then((res) => {
      const data = res.data.result;
      setFilterOption(data);
      if (selectedRam.length !== data.ram?.length) {
        dispatch(updateState({ selectedRam: data.ram?.map(() => false) }));
      }
      if (selectedRom.length !== data.rom?.length) {
        dispatch(updateState({ selectedRom: data.rom?.map(() => false) }));
      }
      if (selectedDisplaySize.length !== data.display_size?.length) {
        dispatch(
          updateState({ selectedDisplaySize: data.rom?.map(() => false) })
        );
      }
      if (selectedBattery.length !== data.battery?.length) {
        dispatch(
          updateState({ selectedBattery: data.battery?.map(() => false) })
        );
      }
      if (selectedCpuType.length !== data.cpu_type?.length) {
        dispatch(
          updateState({ selectedCpuType: data.cpu_type?.map(() => false) })
        );
      }
    });
  }, [page]);
  const search = () => {
    setLoading(true)
    const filter = {
      ram: filterOption.ram.filter((e, i) => selectedRam[i]),
      rom: filterOption.rom.filter((e, i) => selectedRom[i]),
      battery: filterOption.battery.filter((e, i) => selectedBattery[i]),
      display_size: filterOption.display_size.filter(
        (e, i) => selectedDisplaySize[i]
      ),
      searchValue,
      hasImage,
      page: 1
    };
    axios.post("http://20.212.104.107:3001/phone", filter).then((res) => {
      dispatch(updateState({ page: 1 }));
      setData(res.data.result.data);
      setTotalPage(res.data.result.pagination.lastPage);
      setLoading(false);
    });
  };
  return (
    <>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
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
                  value={searchValue}
                  onChange={(e) => {
                    dispatch(updateState({ searchValue: e.target.value }));
                  }}
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
            {/* <div>
              <div className="title">Kích thước màn hình</div>
              <div className="check-box-container">
                <div className="left">
                  {filterOption.display_size &&
                    filterOption.display_size.map((e, i) => {
                      if (i % 2 === 0) {
                        return (
                          <FormControlLabel
                            key={i}
                            control={<Checkbox checked={selectedDisplaySize[i]} onChange={() => {
                              const temp =  [...selectedDisplaySize];
                              temp[i] = !temp[i]
                              dispatch(updateState({selectedDisplaySize: temp}))
                            }}/>}
                            label={e}
                          />
                        );
                      } else return undefined;
                    })}
                </div>
                <div className="right">
                  {filterOption.display_size &&
                    filterOption.display_size.map((e, i) => {
                      if (i % 2 !== 0) {
                        return (
                          <FormControlLabel
                            key={i}
                            control={<Checkbox checked={selectedDisplaySize[i]} onChange={() => {
                              const temp =  [...selectedDisplaySize];
                              temp[i] = !temp[i];
                              dispatch(updateState({selectedDisplaySize: temp}))
                            }}/>}
                            label={e}
                          />
                        );
                      } else return undefined;
                    })}
                </div>
              </div>
            </div> */}
            <div>
              <div className="title">Có ảnh</div>
              <div className="check-box-container">
                <Switch
                  checked={hasImage}
                  onChange={(e, v) => {
                    setHasImage(v);
                  }}
                />
              </div>
            </div>
            <div>
              <div className="title">RAM</div>
              <div className="check-box-container">
                <div className="left">
                  {filterOption.ram &&
                    filterOption.ram.map((e, i) => {
                      if (i % 2 === 0) {
                        return (
                          <FormControlLabel
                            key={i}
                            control={
                              <Checkbox
                                checked={selectedRam[i]}
                                onChange={() => {
                                  const temp = [...selectedRam];
                                  temp[i] = !temp[i];
                                  dispatch(updateState({ selectedRam: temp }));
                                }}
                              />
                            }
                            label={`${e}GB`}
                          />
                        );
                      } else return undefined;
                    })}
                </div>
                <div className="right">
                  {filterOption.ram &&
                    filterOption.ram.map((e, i) => {
                      if (i % 2 !== 0) {
                        return (
                          <FormControlLabel
                            key={i}
                            control={
                              <Checkbox
                                checked={selectedRam[i]}
                                onChange={() => {
                                  const temp = [...selectedRam];
                                  temp[i] = !temp[i];
                                  dispatch(updateState({ selectedRam: temp }));
                                }}
                              />
                            }
                            label={`${e}GB`}
                          />
                        );
                      } else return undefined;
                    })}
                </div>
              </div>
            </div>
            <div>
              <div className="title">ROM</div>
              <div className="check-box-container">
                <div className="left">
                  {filterOption.rom &&
                    filterOption.rom.map((e, i) => {
                      if (i % 2 === 0) {
                        return (
                          <FormControlLabel
                            key={i}
                            control={
                              <Checkbox
                                checked={selectedRom[i]}
                                onChange={() => {
                                  const temp = [...selectedRom];
                                  temp[i] = !temp[i];
                                  dispatch(updateState({ selectedRom: temp }));
                                }}
                              />
                            }
                            label={`${e}GB`}
                          />
                        );
                      } else return undefined;
                    })}
                </div>
                <div className="right">
                  {filterOption.rom &&
                    filterOption.rom.map((e, i) => {
                      if (i % 2 !== 0) {
                        return (
                          <FormControlLabel
                            key={i}
                            control={
                              <Checkbox
                                checked={selectedRom[i]}
                                onChange={() => {
                                  const temp = [...selectedRom];
                                  temp[i] = !temp[i];
                                  dispatch(updateState({ selectedRom: temp }));
                                }}
                              />
                            }
                            label={`${e}GB`}
                          />
                        );
                      } else return undefined;
                    })}
                </div>
              </div>
            </div>
            {/* <div>
              <div className="title">Pin</div>
              <div className="check-box-container">
                <div className="left">
                  {filterOption.battery &&
                    filterOption.battery.map((e, i) => {
                      if (i % 2 === 0) {
                        return (
                          <FormControlLabel
                            key={i}
                            control={
                              <Checkbox
                                checked={selectedBattery[i]}
                                onChange={() => {
                                  const temp = [...selectedBattery];
                                  temp[i] = !temp[i];
                                  dispatch(
                                    updateState({ selectedBattery: temp })
                                  );
                                }}
                              />
                            }
                            label={`${e}mAh`}
                          />
                        );
                      } else return undefined;
                    })}
                </div>
                <div className="right">
                  {filterOption.battery &&
                    filterOption.battery.map((e, i) => {
                      if (i % 2 !== 0) {
                        return (
                          <FormControlLabel
                            key={i}
                            control={
                              <Checkbox
                                checked={selectedBattery[i]}
                                onChange={() => {
                                  const temp = [...selectedBattery];
                                  temp[i] = !temp[i];
                                  dispatch(
                                    updateState({ selectedBattery: temp })
                                  );
                                }}
                              />
                            }
                            label={`${e}mAh`}
                          />
                        );
                      } else return undefined;
                    })}
                </div>
              </div>
            </div> */}
            <div>
              <div className="button">
                <Button variant="contained" onClick={search}>
                  Áp dụng
                </Button>
                <Button
                  className="button-cancel"
                  variant="outlined"
                  onClick={() => {
                    dispatch(
                      updateState({
                        selectedDisplaySize: selectedDisplaySize.map(
                          () => false
                        ),
                        selectedRam: selectedRam.map(() => false),
                        selectedRom: selectedRom.map(() => false),
                        selectedBattery: selectedBattery.map(() => false),
                        searchValue: "",
                      })
                    );
                  }}
                >
                  Hủy bỏ
                </Button>
              </div>
            </div>
          </div>
          <div className="right-page">
            <div className="product">
              {data.map((e, i) => (
                <Product key={i} {...e} />
              ))}
            </div>
            <div className="page">
              <Pagination
                count={totalPage}
                page={page}
                onChange={(e, v) => {
                  dispatch(updateState({ page: v }));
                }}
                color="primary"
              />
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}

export default Home;
