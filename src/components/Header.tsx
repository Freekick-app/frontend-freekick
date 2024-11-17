/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import LoginButton from "./LoginButton";
import ConnectWallet from "./LoginWithTonButton";
import { useAppState } from "@/utils/appState";
export default function Header() {
  const { tgUserName } = useAppState();
  // console.log(username, "username");

  return (
    <header className="flex flex-row items-center justify-between px-2 h-[60px] z-50 bg-black text-white">
      <div className="flex items-center space-x-4">
        <div className="rounded-full w-8 h-8 bg-gray-500"></div>
        <span className="text-[12px]">Hello {tgUserName ?? "user"}👋</span>
      </div>
      <div className="flex ">
        {tgUserName ? <ConnectWallet /> : <LoginButton />}

        {/*  */}

        {/* <button className="text-3xl"><IoMdNotificationsOutline/></button>
        <button className="text-white text-2xl px-3 py-2 bg-slate-800 rounded-full"><BiWalletAlt /></button> */}
      </div>
    </header>
  );
}

{
  /* <TonProvider>
  <Component {...pageProps} />
</TonProvider> */
}
