import Bread from "components/bread";
import MemberData from "components/memberData";
import { getMember } from "lib/member";
import { use } from "react";

export default  function Page({ params: { id } }) {
  const { member } = use(getMember(id));
  return (
    <>

      <Bread title={member && member.lastName + " " + member.firstName} back={true}/>
      <MemberData  member={member}/>
      
    </>
  );
}
