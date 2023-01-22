import Bread from "components/bread";
import MemberData from "components/memberData";
import { getMember } from "lib/member";

export default function Page({ params: { id } }) {
  return (
    <>
      <MemberData memberId={id} />
    </>
  );
}
