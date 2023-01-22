import Bread from "components/bread";
import MemberData from "components/memberData";
import { getMember } from "lib/member";

export default async function Page({ params: { id } }) {
  const { member } = await getMember(id);
  return (
    <>

      <Bread title={'a'} back={true}/>
      <MemberData  member={member}/>
      
    </>
  );
}
