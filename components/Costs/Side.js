"use client";
import { Radio, Select, Slider, Space } from "antd";
import { useEffect, useState } from "react";

const CostSide = ({ costTypes }) => {
  const [types, setTypes] = useState([]);
  var currentTime = new Date();

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
    console.log(event.target.value);
  };

  return (
    <>
      {" "}
      <div className="sides ">
        <div className="side__item">
          <div className="side__filters">
            <div className="side__filter">
              <label> Барилгын материалын төрлүүд </label>
              <Space direction="vertical">
                <Radio.Group
                  options={types}
                  onChange={handleMat}
                  // value={types}
                  size="small"
                  style={{ fontSize: "12px" }}
                />
              </Space>
              {/* <Select
                showSearch
                placeholder="Төрлөөр хайх"
                optionFilterProp="children"
                options={types}
              /> */}
            </div>
            <div className="side__filter">
              <label> Үнийн төрлүүд </label>
              <Select
                showSearch
                placeholder="Үнийн төрөл"
                optionFilterProp="children"
                options={priceType}
              />
            </div>
            <div className="side__filter">
              <label> Жилээр </label>
              <Slider
                range
                defaultValue={[2000, currentTime.getFullYear()]}
                max={parseInt(currentTime.getFullYear())}
                min={2000}
              />
            </div>
          </div>
        </div>
      </div>{" "}
    </>
  );
};

export default CostSide;
