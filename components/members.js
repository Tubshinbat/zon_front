"use client";
import { Tree } from "antd";
import { getMemberTypes } from "lib/memberTypes";
import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { getMembers } from "lib/member";
import base from "lib/base";
import Pagination from "react-js-pagination";

export default ({ types, initPagination, members }) => {
  const [expandedKeys, setExpandedKeys] = useState();
  const [checkedKeys, setCheckedKeys] = useState();
  const [selectedKeys, setSelectedKeys] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [data, setData] = useState(members);
  const [autoExpandParent, setAutoExpandParent] = useState(true);
  const [treeData, setTreeData] = useState([]);
  const router = useRouter();
  const pathname = usePathname();

  const searchParams = useSearchParams();
  const urlParams = new URLSearchParams(`${searchParams.toString()}`);
  const [pagination, setPagination] = useState(initPagination);

  const queryBuild = (key, event) => {
    urlParams.set(key, event);
    router.push(`${pathname}?${urlParams}`);
  };

  const onExpand = (expandedKeysValue) => {
    setExpandedKeys(expandedKeysValue);
    setAutoExpandParent(false);
  };
  const onCheck = (checkedKeysValue) => {
    setCheckedKeys(checkedKeysValue);
  };
  const onSelect = (selectedKeysValue, info) => {
    setSelectedKeys(selectedKeysValue);
  };

  useEffect(() => {
    let data = [];
    data = types.map((type) => ({
      title: type.name,
      key: type._id,
    }));
    setTreeData(data);
  }, [types]);

  useEffect(() => {
    const fetchData = async () => {
      const { members, pagination } = await getMembers(searchParams.toString());
      setPagination(pagination);
      setData(members);
    };

    fetchData();
  }, [searchParams]);

  //-- PAGINATION

  const [activePage, setActivePage] = useState(1);
  const [limit, setLimit] = useState({});
  const [total, setTotal] = useState();

  const handlePageChange = (pageNumber) => {
    queryBuild("page", pageNumber);
    window.scrollTo(0, 0);
    setActivePage(pageNumber);
  };

  useEffect(() => {
    if (pagination) {
      setTotal(pagination.total);
      setLimit(pagination.limit);
    }
  }, [pagination]);

  useEffect(() => {
    if (checkedKeys && checkedKeys.length > 0) {
      const test = checkedKeys.map((check) => {
        let a = "";
        a += "type[]=" + check;
        return a;
      });
      const query = test.toString().replaceAll(",", "&");
      router.push(`${pathname}?${query}`);
    } else {
      router.push(`${pathname}`);
    }
  }, [checkedKeys]);

  return (
    <>
      <div className="seaction-top">
        <div className="container">
          <div className="page__content">
            <div className="row">
              <div className="col-lg-3">
                <div className="sides">
                  <div className="side">
                    <div className="side__search">
                      <input
                        type="text"
                        placeholder="Гишүүн хайх"
                        name="name"
                        onChange={(event) => setSearchName(event.target.value)}
                      />
                      <button
                        type="submit"
                        onClick={() => queryBuild("name", searchName)}
                      >
                        <i className="fa fa-search"> </i>
                      </button>
                    </div>
                  </div>
                  <div className="side">
                    <div className="list__members_type">
                      <Tree
                        checkable
                        onExpand={onExpand}
                        expandedKeys={expandedKeys}
                        autoExpandParent={autoExpandParent}
                        onCheck={onCheck}
                        checkedKeys={checkedKeys}
                        onSelect={onSelect}
                        selectedKeys={selectedKeys}
                        treeData={treeData}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-9">
                <div className="row members__list">
                  {data.map((member) => (
                    <div className="col-md-4">
                      <div className="member__box">
                        <div className="member__image">
                          <a href={`/members/${member._id}`}>
                            <img src={`${base.cdnUrl}/${member.pictures[0]}`} />
                          </a>
                        </div>
                        <div className="member__details">
                          <a href={`/members/${member._id}`}>
                            <h5>
                              {member.lastName}{" "}
                              <span> {member.firstName} </span>
                            </h5>
                          </a>
                          <p className="member__status">{member.position} </p>
                          <p className="member__type">
                            {member.status == true && "Жинхэнэ гишүүн"}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                  {data.length <= 0 && <h4> Илэрц олдсонгүй</h4>}
                </div>
                {total && data && data.length > 0 && (
                  <div className={`pagination__list`}>
                    <Pagination
                      activePage={parseInt(searchParams.get("page")) || 1}
                      itemClass={`page-item`}
                      linkClass={"page-link"}
                      itemsCountPerPage={limit}
                      totalItemsCount={total}
                      pageRangeDisplayed={5}
                      onChange={handlePageChange.bind()}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
