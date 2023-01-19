import Bread from "components/bread";
import Members from "components/members";
import { getMembers } from "lib/member";
import { getMemberTypes } from "lib/memberTypes";

export default async function Page() {
  const { types } = await getMemberTypes();
  const { members, pagination } = await getMembers();
  return (
    <div>
      <main>
        <Bread title="Жинхэнэ гишүүд" />
        <Members types={types} members={members} initPagination={pagination} />
      </main>
    </div>
  );
}
