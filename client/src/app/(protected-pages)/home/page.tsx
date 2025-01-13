import {
  checkUserInDbAction,
  CheckUserInDbActionType,
} from "@/actions/checkUserInDbAction";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Main from "./_components/Main";

async function HomePage() {
  const clerkUser = await currentUser();

  //! *** CHECK IF USER IS NEW OR EXISTS IN THE DATABASE ***
  const prismaUser: CheckUserInDbActionType = await checkUserInDbAction(
    clerkUser!
  );

  //! *** ACTION RETURNS USER BUT IF ANY ERROR RETURN NULL. IN THIS CASE REDIRECT TO HOME PAGE, SINCE THE USER IS AUTHENTICATED WITH CLERK,
  //! USER WILL BE REDIRECTED TO THIS PAGE AGAIN ***
  if (!prismaUser) {
    return redirect("/");
  }
  //! *******************************

  return (
    <>
      <Main />
    </>
  );
}
export default HomePage;
