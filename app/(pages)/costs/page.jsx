import CostList from "components/Costs/List";
import { getCosts, getCostTypes, getInitCosts, getTableDatas } from "lib/cost";
import { use } from "react";

export default async function Page() {
  const { costTypes } = await getCostTypes();
  const { initCosts, maxCosts } = await getInitCosts();
  const { costs, pagination } = await getCosts();
  const { tableDatas, tableDates } = await getTableDatas();
  return (
    <>
      <section className="section">
        <div className="container">
          <CostList
            initCosts={initCosts}
            costs={maxCosts}
            costTypes={costTypes}
            initPagination={pagination}
            tableDatas={tableDatas}
            tableDates={tableDates}
          />
        </div>
      </section>
    </>
  );
}
