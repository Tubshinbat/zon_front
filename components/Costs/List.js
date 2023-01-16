"use client";

import base from "lib/base";
import React, { use, useEffect, useRef, useState } from "react";
import HighchartsReact from "highcharts-react-official";
import Highcharts, { chart } from "highcharts/highstock";
import HighchartsExporting from "highcharts/modules/exporting";
import moment from "moment";
if (typeof Highcharts === "object") {
  HighchartsExporting(Highcharts);
}

import { DatePicker, Radio, Select, Slider, Space, Table, Tooltip } from "antd";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { getCosts, getFilterCosts, getTableDatas } from "lib/cost";
import Link from "next/link";
import { getPageFull, getPages } from "lib/page";

const CostList = ({
  initCosts,
  costs,
  initPagination,
  costTypes,
  tableDates,
  tableDatas,
}) => {
  const [seriesData, setSeriesData] = useState(initCosts);
  const [dataSource, setDataSource] = useState([]);
  const [data, setDatas] = useState(costs);
  const [dates, setDates] = useState([]);
  const { RangePicker } = DatePicker;
  const [pages, setPages] = useState([]);
  const chartRef = useRef();
  const options = { currency: "MNT" };
  const numberFormat = new Intl.NumberFormat("mn-MN", options);
  const pathname = usePathname();
  const [costType, setCostType] = useState("maxPrice");

  useEffect(() => {
    const fetchData = async () => {
      const { pages } = await getPageFull(`status=true&choiseModal=costs`);
      setPages(pages);
    };
    fetchData();
  }, []);

  useEffect(() => {
    tableBuild(tableDatas);
  }, [tableDatas]);

  const handleDateTable = async (event) => {
    const { tableDatas } = await getTableDatas(`date=${event}`);
    tableBuild(tableDatas);
  };

  const tableBuild = (tableDatas) => {
    const refData = [];

    tableDatas.length > 0 &&
      tableDatas.map((el) => {
        const key = el._id;
        delete el._id;
        el.maxPrice = parseInt(el.maxPrice);
        el.minPrice = parseInt(el.minPrice);
        el.averagePrice = parseInt(el.averagePrice);
        el.priceNotNoat = parseInt(el.priceNotNoat);
        el.date = moment(el.date).utcOffset("+0800").format("YYYY-MM-DD");
        el.type = el.type[0].name;

        refData.push({
          dataIndex: key,
          key,

          ...el,
          minPrice: numberFormat.format(el.minPrice),
          maxPrice: numberFormat.format(el.maxPrice),
          averagePrice: numberFormat.format(el.averagePrice),
          priceNotNoat: numberFormat.format(el.priceNotNoat),
        });
      });
    setDataSource(refData);
  };

  const configPrice = {
    chart: {
      type: "spline",
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
    series: seriesData,
  };
  const [types, setTypes] = useState([]);
  var currentTime = new Date();

  const queryBuild = (key, event) => {
    urlParams.set(key, event);
    router.push(`${pathname}?${urlParams}`);
  };

  const priceType = [
    {
      label: "НӨАТ орсон дундаж үнэ",
      value: "averagePrice",
    },
    {
      label: "НӨАТ-гүй үнэ",
      value: "priceNotNoat",
    },
    {
      label: "Дээд үнэ (НӨАТ)-тэй",
      value: "maxPrice",
    },
    {
      label: "Доод үнэ (НӨАТ)-тэй",
      value: "minPrice",
    },
  ];

  useEffect(() => {
    if (costTypes) {
      setTypes(
        costTypes.map((type) => ({
          value: type._id,
          label: type.name,
        }))
      );
    }
  }, [costTypes]);

  const handleMat = (event) => {
    queryBuild("type", event);
  };

  const handlePriceType = (event) => {
    queryBuild("pricetype", event);
    setCostType(event);
  };

  const handleSlider = (event) => {
    queryBuild("yearMin", event[0]);
    queryBuild("yearMax", event[1]);
  };

  const handleDate = async (values, dateString) => {
    const selectRangeYear = parseInt(dateString[1]) - parseInt(dateString[0]);
    if (selectRangeYear > 1 || selectRangeYear < 0) {
      toastControl("error", "Та хамгийн ихдээ 1 жилээр хайлт хийх боломжтой ");
    } else {
      queryBuild("yearMin", dateString[0]);
      queryBuild("yearMax", dateString[1]);
    }
  };

  const [pagination, setPagination] = useState(initPagination);
  const [loading, setLoading] = useState(false);
  const [querys, setQuerys] = useState(``);

  //-- PAGINATION

  const [activePage, setActivePage] = useState(1);
  const [limit, setLimit] = useState({});
  const [total, setTotal] = useState();
  const searchParams = useSearchParams();
  const urlParams = new URLSearchParams(`${searchParams.toString()}`);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const { costs, pagination } = await getCosts(searchParams.toString());
      const { chartData } = await getFilterCosts(searchParams.toString());
      setPagination(pagination);
      setSeriesData(chartData);
    };
    fetchData();
  }, [searchParams]);

  useEffect(() => {
    if (tableDates) {
      const dt = tableDates.map((date) => {
        return {
          value: date,
          label: date,
        };
      });
      setDates(dt.reverse());
    }
  }, [tableDates]);

  const columns = [
    {
      title: "Материалын нэр",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Марк",
      dataIndex: "mark",
      key: "mark",
    },
    {
      title: "Хэмжих нэгж",
      dataIndex: "unit",
      key: "unit",
    },
    {
      title: "Төрөл",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Доод үнэ",
      dataIndex: "minPrice",
      key: "minPrice",
    },
    {
      title: "Дээд үнэ",
      dataIndex: "maxPrice",
      key: "maxPrice",
    },
    {
      title: "Дундаж үнэ",
      dataIndex: "averagePrice",
      key: "averagePrice",
    },
    {
      title: "НӨАТ-гүй үнэ",
      dataIndex: "priceNotNoat",
      key: "priceNotNoat",
    },
    {
      title: "Огноо",
      dataIndex: "date",
      key: "date",
    },
  ];

  return (
    <>
      <div className="row">
        <div className="col-lg-3">
          <div className="charts__filters">
            <span> Хайлт хийх: </span>
            <div className="chart__filter">
              <Select
                showSearch
                options={types}
                style={{ width: "100%" }}
                onChange={handleMat}
                value={searchParams.get("type") || "Төрлөөр хайх"}
                placeholder="Төрлөөр хайх"
                filterOption={(input, option) =>
                  option.props.value
                    .toLowerCase()
                    .indexOf(input.toLowerCase()) >= 0 ||
                  option.props.label
                    .toLowerCase()
                    .indexOf(input.toLowerCase()) >= 0
                }
              />
            </div>
            <div className="chart__filter">
              <Select
                showSearch
                style={{ width: "100%" }}
                placeholder="Үнийн төрөл"
                optionFilterProp="children"
                options={priceType}
                value={searchParams.get("pricetype") || "Үнийн төрөл"}
                onChange={(event) => handlePriceType(event)}
                filterOption={(input, option) =>
                  option.props.value
                    .toLowerCase()
                    .indexOf(input.toLowerCase()) >= 0 ||
                  option.props.label
                    .toLowerCase()
                    .indexOf(input.toLowerCase()) >= 0
                }
              />
            </div>
            <div className="chart__filter">
              <RangePicker
                picker="year"
                placeholder={["Эхлэх огноо", "Дуусах огноо"]}
                onChange={handleDate}
              />
            </div>
          </div>
        </div>
        <div className="col-lg-9">
          <div className="charts__box">
            {" "}
            <HighchartsReact
              constructorType={"stockChart"}
              highcharts={Highcharts}
              options={configPrice}
              ref={chartRef}
            />{" "}
          </div>{" "}
          <div className="section_sub_title">
            <h4>Жагсаалтаар</h4>
          </div>
          <div className="filters__table">
            <Select
              options={dates}
              placeholder="Огноо сонгоно уу"
              onChange={handleDateTable}
            />
          </div>
          <Table dataSource={dataSource} columns={columns} />
          <div className="section_sub_title">
            <h4>
              Барилгад хэрэглэгдэх гол нэр төрлийн барилгын материалын үнэ
            </h4>
          </div>
          <div className="cost__items">
            <div className="row">
              {data &&
                data.map((cost) => (
                  <div className="col-xl-3 col-lg-3 col-md-4 col-sm-6 col-12">
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
                        <span>{numberFormat.format(cost[costType])}₮</span>
                      </div>
                    </Tooltip>
                  </div>
                ))}
            </div>
          </div>
          <div className="section_sub_title">
            <h4>Холбоотой хуудсууд</h4>
          </div>
          <div className="row grid__contents">
            {pages &&
              pages.length > 0 &&
              pages.map((el) => (
                <div className="col-xl-4 col-lg-4 col-md-6 col-12">
                  <div className="grid__item">
                    <div className="grid__item_img">
                      <Link href={`/page_data/${el._id}`}>
                        {el.pictures && el.pictures.length > 0 ? (
                          <img src={`${base.cdnUrl}/450/${el.pictures[0]}`} />
                        ) : (
                          <img src={`/images/img_notfound.jpg`} />
                        )}
                      </Link>
                    </div>
                    <div className="gird__content">
                      <Link href={`/page_data/${el._id}`}>
                        {el.name.length > 90
                          ? el.name.substr(0, 90) + "..."
                          : el.name}
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default CostList;
