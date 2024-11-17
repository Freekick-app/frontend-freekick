/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { FaMoneyBill } from "react-icons/fa";
import { useEffect, useState } from "react";
// import axiosInstance from "@/utils/axios";
import { AuthService } from "@/services/auth";
import {
  deposit,
  getProfile,
  queryOrder,
  requestWithdrawal,
} from "@/api/blockchain";
import { IoAddCircleOutline, IoArrowUpCircleOutline } from "react-icons/io5";
import { useTonAddress } from "@tonconnect/ui-react";
import { Web3AuthService } from "@/services/web3Auth";
import DepositModal from "../components/DepositModal";
import toast from "react-hot-toast";
import { SlRefresh } from "react-icons/sl";
import WithdrawModal from "@/components/WithdrawModal";
import { Tooltip } from "flowbite-react";
import { useAppState } from "@/utils/appState";
import UnAuthorised from "@/components/UnAuthorised";

const MyWallet = () => {
  const { user, refreshProfile, tgUserName } = useAppState();
  const userFriendlyAddress = useTonAddress();
  const [wallet_address, setWalletAddress] = useState<string | null>(null);
  const [openModal, setOpenModal] = useState<string | null>(null);
  const [processing, setProcessing] = useState<string | null>(null);


  // useEffect(() => {
  //   fetchApiData();
  // }, []);

  useEffect(() => {
    if (userFriendlyAddress || tgUserName) {
      setWalletAddress(userFriendlyAddress ?? tgUserName);
      return;
    }
    setWalletAddress(null);
  }, [userFriendlyAddress, tgUserName]);

  useEffect(() => {
    const initializeWallet = async () => {
      const token = AuthService.getAccessToken();
      if (token && !tgUserName) {
        try {
          const web3Auth = Web3AuthService.getInstance();
          const address = await web3Auth.getCurrentWalletAddress();
          if (address) setWalletAddress(address);
        } catch (error) {
          console.error("Failed to fetch wallet address:", error);
          // setError('Failed to fetch wallet address.');
        }
      }
    };

    initializeWallet();
  }, [tgUserName]);

  async function handleDeposit(amount: string) {
    try {
      setProcessing("deposit");
      if (!user?.address) {
        console.error("Missing wallet address");
        setProcessing(null);
        return;
      }

      const modal = tgUserName ? "tg" : "order";
      const data = await deposit(amount, modal);
      // console.log(data);
      const payload = data?.payload;
      if (payload?.success) {
        window.open(payload?.model.webUrl, "_self");
      }
      setProcessing(null);
      setOpenModal(null);
    } catch (error) {
      console.error("Failed to create order:", error);
      setProcessing(null);
    } finally {
      setProcessing(null);
    }
  }

  async function handleWithdrawalRequest(address: string, amount: string) {
    try {
      setProcessing("withdraw");
      if (!address || !amount) {
        console.error("Missing wallet address");
        setProcessing(null);
        return;
      }

      const data = await requestWithdrawal(address, amount);
      // console.log(data);
      toast.success("Withdrawal requested, will be proceed after verification");
      setProcessing(null);
    } catch (error) {
      console.error("Failed to request for withdrawal", error);
      setProcessing(null);
    } finally {
      setProcessing(null);
    }
  }

  async function handleQueryRefresh() {
    try {
      setProcessing("query");
      const data = await queryOrder();
      // console.log(data);
      if (data?.status == "success") {
        await refreshProfile();
      }
    } catch (error) {
      console.error(error);
    } finally {
      setProcessing(null);
    }
  }

  const shortAddress = (address: string = "") => {
    return `${address?.slice(0, 4)}...${address?.slice(-4)}`;
  };

  const copyAddress = async (address: string) => {
    try {
      await navigator.clipboard.writeText(address);

      toast.success("Address copied to clipboard");
    } catch (error) {
      console.error("Failed to copy address to clipboard:", error);
    }
  };

  if (!user?.address) {
    return <UnAuthorised />;
  }

  return (
    <div className="bg-black min-h-screen text-white p-2 ">
      <div className="bg-blue-600 p-2 flex flex-col gap-7 rounded-xl text-center pb-5">
        <div className="text-2xl font-bold text-white">
          <p className="text-xl font-bold text-gray-300">Wallet</p>
          <p
            className="text-xs font-bold text-white cursor-pointer"
            onClick={() => copyAddress(user?.address ?? wallet_address)}
          >
            {user?.address || wallet_address
              ? shortAddress(user?.address ?? wallet_address)
              : ""}
          </p>
        </div>
        <div className="flex flex-col gap-1 items-center">
          <p className="text-gray-300 text-lg">Balance</p>
          <h1 className="text-xl font-bold flex items-center justify-center gap-2 flex-row">
            <FaMoneyBill className="text-4xl" />{" "}
            {!isNaN(user?.balance) ? Math.round(user?.balance).toFixed(2) : 0.0}{" "}
            USDT
            <span
              className={`cursor-pointer ${
                processing == "query" ? "animate-spin" : ""
              }`}
              onClick={handleQueryRefresh}
            >
              <SlRefresh />
            </span>
          </h1>
        </div>
        {/* <p className="text-[#CEFF00] text-xs mt-1">+4.34%, 24 September 2024</p> */}

        <div className=" flex justify-evenly items-center space-x-2">
          <div
            className="text-white flex flex-col items-center font-semibold cursor-pointer"
            onClick={() => setOpenModal("deposit")}
          >
            <IoAddCircleOutline className="text-4xl" />
            <span>Deposit</span>
          </div>
          <Tooltip content="Withdrawal will be available soon!">
            <div
              className="text-white/70 flex flex-col items-center font-semibold cursor-not-allowed"
              // onClick={() => setOpenModal("withdraw")}
            >
              <IoArrowUpCircleOutline className="text-4xl" />
              <span>Send</span>
            </div>
          </Tooltip>
        </div>
      </div>
      <DepositModal
        openModal={openModal == "deposit"}
        setOpenModal={() => {
          setOpenModal(null);
        }}
        successAction={async (amount: string) => {
          await handleDeposit(amount);
          // setOpenModal(null);
        }}
        processing={processing == "deposit"}
      />
      <WithdrawModal
        openModal={openModal == "withdraw"}
        setOpenModal={() => {
          setOpenModal(null);
        }}
        successAction={async (address: string, amount: string) => {
          await handleWithdrawalRequest(address, amount);
          setOpenModal(null);
        }}
        processing={processing == "withdraw"}
      />
    </div>
  );
};

export default MyWallet;
