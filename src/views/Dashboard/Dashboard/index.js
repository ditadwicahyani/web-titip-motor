import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Flex, SimpleGrid, useColorModeValue, Text } from "@chakra-ui/react";
import { BsFillPeopleFill } from "react-icons/bs";
import { RiEBikeFill } from "react-icons/ri";
// Component
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import { CartIcon } from "components/Icons/Icons.js";
import MiniStatistics from "./components/MiniStatistics";
import ChartDonut from "./components/ChartDonut";
import Chart from 'react-apexcharts'
import moment from "moment";

export default function Dashboard() {
  const textColor = useColorModeValue("gray.700", "white");
  const iconBoxInside = useColorModeValue("white", "white");
  const [dataMotor, setDataMotor] = useState(0);
  const [dataCustomer, setDataCustomer] = useState(0);
  const [dataTransksi, setDataTransksi] = useState(0);
  const [labelMotor, setLabelMotor] = useState([]);
  const [motor, setMotor] = useState([]);
  const [labelCust, setLabelCust] = useState([]);
  const [customer, setCustomer] = useState([]);
  const [transaksi, setTransaksi] = useState([]);

  useEffect(() => {
    getListData();
    getDataChart();
  }, []);

  const getListData = () => {
    // axios get motor
    axios.get(`https://kel6nitipmotorapi.franciscusrangga.com/api/v1/dashboard/items`, {
      headers: { 'Accept': 'application/json' }
    }).then((res) => {
      // console.log('res mot =>', res.data)
      setDataMotor(res.data.data.total)
    }).catch((err) => {
      console.log('err cus =>', err)
    })

    // axios get customer
    axios.get(`https://kel6nitipmotorapi.franciscusrangga.com/api/v1/dashboard/customers`, {
      headers: { 'Accept': 'application/json' }
    }).then((res) => {
      // console.log('res Mo =>', res.data)
      setDataCustomer(res.data.data.total)
    }).catch((err) => {
      console.log('err Mo =>', err.response.data)
    })

    // axios get transaksi
    axios.get(`https://kel6nitipmotorapi.franciscusrangga.com/api/v1/dashboard/transactions`, {
      headers: { 'Accept': 'application/json' }
    }).then((res) => {
      // console.log('res Mo =>', res.data)
      setDataTransksi(res.data.data.total)
    }).catch((err) => {
      console.log('err Mo =>', err.response.data)
    })
  }

  const getDataChart = () => {
    // axios get motor
    axios.get(`https://kel6nitipmotorapi.franciscusrangga.com/api/v1/dashboard/transactions/grouped-item-brand`, {
      headers: { 'Accept': 'application/json' }
    }).then((res) => {
      // console.log('res mot =>', res.data)
      const filLabel = res.data.data?.map((val) => {
        return val.brand
      })
      const filData = res.data.data?.map((val) => {
        return val.total
      })
      setLabelMotor(filLabel)
      setMotor(filData)
    }).catch((err) => {
      console.log('err cus =>', err)
    })

    // axios get customer
    axios.get(`https://kel6nitipmotorapi.franciscusrangga.com/api/v1/dashboard/transactions/grouped-customer`, {
      headers: { 'Accept': 'application/json' }
    }).then((res) => {
      // console.log('res Cust =>', res.data)
      const filLabel = res.data.data?.map((val) => {
        return val.name
      })
      const filData = res.data.data?.map((val) => {
        return val.total
      })
      setLabelCust(filLabel)
      setCustomer(filData)
    }).catch((err) => {
      console.log('err cust =>', err.response.data)
    })

    // axios get transaksi
    axios.get(`https://kel6nitipmotorapi.franciscusrangga.com/api/v1/dashboard/transactions/monthly-date-come`, {
      headers: { 'Accept': 'application/json' }
    }).then((res) => {
      // console.log('res trans =>', res.data)
      const filData = res.data.data?.map((val) => {
        return val.total
      })
      setTransaksi(filData);
    }).catch((err) => {
      console.log('err trans =>', err.response.data)
    })
  }

  return (
    <Flex flexDirection='column' pt={{ base: "160px", md: "75px" }}>
      <SimpleGrid columns={{ sm: 1, md: 3, xl: 3 }} spacing='14px'>
        <MiniStatistics
          title={"Total Customer"}
          amount={dataMotor}
          icon={<BsFillPeopleFill size={20} color={iconBoxInside} />}
        />
        <MiniStatistics
          title={"Total kategori Motor"}
          amount={dataCustomer}
          icon={<RiEBikeFill size={21} color={iconBoxInside} />}
        />
        <MiniStatistics
          title={"Total Transaksi"}
          amount={dataTransksi}
          icon={<CartIcon h={"24px"} w={"24px"} color={iconBoxInside} />}
        />
      </SimpleGrid>
      <Flex direction={'row'} justifyContent={'space-between'}>
        <Flex marginTop={'20px'} style={{ width: '46%' }}>
          <Card p='16px' overflowX={{ sm: "scroll", xl: "hidden" }}>
            <CardHeader p='12px 0px 28px 0px'>
              <Flex direction='column'>
                <Text fontSize='lg' color={textColor} fontWeight='bold' pb='.5rem'>
                  Frekuensi Transaksi per Brand
                </Text>
              </Flex>
            </CardHeader>
            <Chart
              options={{
                chart: {
                  width: 300,
                  type: 'donut',
                },
                dataLabels: {
                  enabled: false
                },
                labels: labelMotor,
                responsive: [{
                  breakpoint: 480,
                  options: {
                    chart: {
                      width: 200
                    },
                    legend: {
                      show: false
                    }
                  }
                }],
                legend: {
                  position: 'right',
                  offsetY: 0,
                  height: 230,
                }
              }}
              series={motor}
              type="donut" />
          </Card>
        </Flex>
        <Flex marginTop={'20px'} style={{ width: '52%' }}>
          <Card p='16px' overflowX={{ sm: "scroll", xl: "hidden" }}>
            <CardHeader p='12px 0px 28px 0px'>
              <Flex direction='column'>
                <Text fontSize='lg' color={textColor} fontWeight='bold' pb='.5rem'>
                  Frekuensi Transaksi per Customer
                </Text>
              </Flex>
            </CardHeader>
            <Chart
              options={{
                xaxis: {
                  categories: labelCust
                }
              }}
              series={[{
                name: 'transaksi',
                data: customer
              }]}
              type="bar"
            />
          </Card>
        </Flex>
      </Flex>
      <Flex marginTop={'20px'}>
        <Card p='16px' overflowX={{ sm: "scroll", xl: "hidden" }}>
          <CardHeader p='12px 0px 20px 0px'>
            <Flex direction='column'>
              <Text fontSize='lg' color={textColor} fontWeight='bold' pb='.4rem'>
                Frekuensi Bulanan Transaksi Masuk
              </Text>
            </Flex>
          </CardHeader>
          <Chart
            options={{
              chart: {
                type: 'line',
                zoom: {
                  enabled: false
                }
              },
              dataLabels: {
                enabled: false
              },
              stroke: {
                curve: 'straight'
              },
              title: {
                text: '',
                align: 'left'
              },
              grid: {
                row: {
                  colors: ['#f3f3f3', 'transparent'],
                  opacity: 0.5
                },
              },
              xaxis: {
                categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Des'],
              }
            }}
            series={[{
              name: "Transaksi",
              data: transaksi
            }]}
            type="line" height={300}
          />
        </Card>
      </Flex>
    </Flex>
  );
}
