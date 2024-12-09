import { useAppState } from "@/utils/appState";
import ConnectWallet from "./LoginWithTonButton";
import LoginButton from "./LoginButton";

export default function UnAuthorised() {
  const { tgUserName, tgUser } = useAppState();
  return (
    <div className="w-full pt-20 flex flex-col justify-center items-center ">
      <div className="p-10 rounded-md shadow-md">
        <h1 className="text-xl font-bold text-center">Unauthorised</h1>
        <p className="text-center">You are not authorised to view this page</p>
      </div>
      <div className="flex flex-col items-center gap-4">
        <div className="flex ">
          {tgUserName || tgUser?.id ? <ConnectWallet /> : <LoginButton />}
        </div>
      </div>
    </div>
  );
}
