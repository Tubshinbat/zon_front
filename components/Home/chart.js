"use client";

import base from "lib/base";
import React, { use, useEffect, useRef, useState } from "react";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts/highstock";
import HighchartsExporting from "highcharts/modules/exporting";
import moment from "moment";
if (typeof Highcharts === "object") {
  HighchartsExporting(Highcharts);
}
import "react-toastify/dist/ReactToastify.css";
import { DatePicker, Select, Tooltip } from "antd";
import Link from "next/link";
import { getFilterCosts } from "lib/cost";
import { toastControl } from "lib/toastControl";
import { ToastContainer } from "react-toastify";

const Chart = ({ costs, initCosts, maxCosts, costTypes }) => {
  const { RangePicker } = DatePicker;
  const [seriesData, setSeriesData] = useState([]);
  const [costData, setCostData] = useState([]);
  const [lastYear, setLastYear] = useState("");
  const [types, setTypes] = useState([]);
  const [searchDatas, setSearchDatas] = useState();
  const chartRef = useRef();
  const options = { currency: "MNT" };
  const numberFormat = new Intl.NumberFormat("mn-MN", options);
  const configPrice = {
    chart: {
      type: "spline",
      height: 450,
    },
    xAxis: {
      type: "datetime",
    },

    rangeSelector: {
      enabled: false,
    },
    showInNavigator: false,
    legend: {
      enabled: true,
    },
    plotOptions: {
      series: {
        showInNavigator: false,
      },
      spline: {
        lineWidth: 2,
        states: {
          hover: {
            lineWidth: 4,
          },
        },
        marker: {
          enabled: false,
        },
        pointInterval: 3600000, // one hour
        pointStart: Date.UTC(2015, 4, 31, 0, 0, 0),
      },
    },

    title: {
      text: `Барилгын материалын үнэ`,
    },

    series: seriesData,
  };

  useEffect(() => {
    if (costTypes && costTypes.length > 0) {
      const arrTypes = costTypes.map((type) => {
        return {
          value: type._id,
          label: type.name,
        };
      });
      setTypes(arrTypes);
    }
  }, [costTypes]);

  useEffect(() => {
    if (maxCosts && maxCosts.length > 0) {
      setCostData(maxCosts);
      setLastYear(maxCosts[maxCosts.length - 1].date);
    }
  }, [maxCosts]);

  useEffect(() => {
    setSeriesData(initCosts);
  }, [initCosts]);

  useEffect(() => {
    const fetcherData = async (query) => {
      const { chartData } = await getFilterCosts(query);
      setSeriesData(chartData);
    };

    if (searchDatas) {
      const keys = Object.keys(searchDatas);
      const result = keys.map((key) => key + "=" + searchDatas[key]);
      fetcherData(result.toString().replaceAll(",", "&"));
    }
  }, [searchDatas]);

  const handleChangeType = (event) => {
    setSearchDatas((bs) => ({ ...bs, type: event }));
  };

  const handleDate = async (values, dateString) => {
    const selectRangeYear = parseInt(dateString[1]) - parseInt(dateString[0]);
    if (selectRangeYear > 1 || selectRangeYear < 0) {
      toastControl("error", "Та хамгийн ихдээ 1 жилээр хайлт хийх боломжтой ");
    } else {
      setSearchDatas((bs) => ({
        ...bs,
        yearMin: dateString[0],
        yearMax: dateString[1],
      }));
    }
  };

  return (
    <section className="section">
      <div className="container">
        <div className="section__title">
          <h2>Барилгын материалын үнийн мэдээлэл</h2>
          <div className="all__more">
            <Link href="/costs"> Дэлгэрэнгүй </Link>
          </div>
        </div>
        <div className="cost__filter_top">
          <p>
            {moment(lastYear).utcOffset("+0800").format("YYYY-MM-DD")} - ны
            байдлаар ерөнхий барилгын материалуудын үнэ.
          </p>
        </div>
        <div className="cost__items">
          <div className="row">
            {costData &&
              costData.map((cost, index) => (
                <div
                  className="col-xl-3 col-lg-3 col-md-4 col-sm-6 col-12"
                  data-aos="fade-down"
                  data-aos-duration={1000}
                >
                  <Tooltip
                    title={`${moment(cost.date)
                      .utcOffset("+0800")
                      .format("YYYY-MM-DD")} - ний байдлаар `}
                  >
                    <div className="cost__item">
                      <div className="cost__item_img">
                        {cost.picture ? (
                          <img src={`${base.cdnUrl}/${cost.picture}`} />
                        ) : (
                          cost.type[0] &&
                          cost.type[0].picture && (
                            <img
                              src={`${base.cdnUrl}/${cost.type[0].picture}`}
                            />
                          )
                        )}
                      </div>

                      <p>
                        {cost.name} {cost.mark}
                      </p>
                      <span>{numberFormat.format(cost.maxPrice)}₮</span>
                    </div>
                  </Tooltip>
                </div>
              ))}
          </div>
        </div>
        <div>
          <div className="cost__filter_top">
            <span> Хайлт хийх: </span>
            <Select
              showSearch
              options={types}
              placeholder="Төрлөөр хайх"
              onChange={handleChangeType}
              filterOption={(input, option) =>
                option.props.value.toLowerCase().indexOf(input.toLowerCase()) >=
                  0 ||
                option.props.label.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
              }
            />
            <RangePicker
              picker="year"
              placeholder={["Эхлэх огноо", "Дуусах огноо"]}
              onChange={handleDate}
            />
          </div>
          <HighchartsReact
            constructorType={"stockChart"}
            highcharts={Highcharts}
            options={configPrice}
            ref={chartRef}
          />
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </section>
  );
};

export default Chart;
