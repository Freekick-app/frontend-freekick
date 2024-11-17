import { Modal, Button } from "flowbite-react";
import { useState } from "react";
import { HiOutlineExclamationCircle } from "react-icons/hi";

type ConfirmationModalProps = {
  openModal: boolean;
  setOpenModal: (value: boolean) => void;
  successAction: (_amount: string) => void;
  processing?: boolean;
};
export default function DepositModal({
  openModal,
  setOpenModal,
  successAction,
  processing,
}: ConfirmationModalProps) {
  const [amount, setAmount] = useState<string>("0");

  return (
    <Modal
      show={openModal}
      size="md"
      onClose={() => {
        setAmount("0");
        setOpenModal(false);
      }}
      className="pt-[200px]"
      popup
      dismissible={!processing}
    >
      <Modal.Header>
        <div className="flex flex-row items-center gap-2">
          <HiOutlineExclamationCircle className="text-2xl " />
          <h1 className="text-lg font-semibold">Deposit Confirmation</h1>
        </div>
      </Modal.Header>
      <Modal.Body>
        <div className="text-center flex flex-col gap-3 text-black">
          <div className="flex flex-col gap-1 items-start">
            <p className="text-sm font-semibold">Enter Amount</p>
            <div className="flex flex-row gap-2 items-center w-full justify-center">
              <input
                type="number"
                placeholder="Enter amount"
                required
                onChange={(e) => setAmount(`${+e.target.value}`)}
                min={0}
                value={amount}
                className="border rounded-lg w-full border-black"
              />
              <p className="text-lg font-semibold w-fit ">USDT</p>
            </div>
          </div>
          <Button
            className="bg-[#5cf484] text-black hover:!bg-[#1ab643] hover:text-black"
            onClick={() => {
              if (amount !== "0") {
                successAction(amount);
              }
            }}
            // processingLabel="Processing"
          >
            {processing ? "Creating order..." : "Confirm"}
          </Button>
          <p
            className="text-xs text-gray-600 cursor-pointer w-fit text-center mx-auto"
            onClick={() => setOpenModal(false)}
          >
            Cancel
          </p>
          <p className="text-xs text-gray-600">
            Powered by{" "}
            <span
              className="text-black cursor-pointer"
              onClick={() => {
                window.open("https://aeon.xyz/", "_blank");
              }}
            >
              <img src="/aeon_logo.png" alt="Aeon" className="w-14 inline" />
            </span>
          </p>
        </div>
      </Modal.Body>
    </Modal>
  );
}
