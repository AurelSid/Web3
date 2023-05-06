import { ethers } from "ethers";
import { useEffect } from "react";
import { useState } from "react";

function MyComponent() {
  const [balance, setBalance] = useState("");
  const [result, setResult] = useState(false);
  const [address, setAddress] = useState("");

  const handleClick = () => {
    setResult(true);
    setAddress("");
    if (address === "") {
      setBalance(0);
      alert("Please enter an address");
    }
  };
  const handleAddressChange = (event) => {
    setAddress(event.target.value);
  };

  useEffect(() => {
    async function fetchBalance() {
      const provider = new ethers.providers.JsonRpcProvider(
        "https://mainnet.infura.io/v3/6c564c5487fb4a4796c22c2e60e9289a"
      );
      const balance = await provider.getBalance(address);
      const balanceInEther = ethers.utils.formatEther(balance);
      setBalance(balanceInEther);
    }

    if (address !== "") {
      fetchBalance();
    }
  }, [address]);

  return (
    <div className="w-full items-center justify-center h-screen flex">
      <div className="m-auto justify-center items-center bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg md:p-16 rounded-3xl  ">
        <div className="w-80 h-80 m-auto ">
          <img
            src="https://static.vecteezy.com/system/resources/previews/010/841/683/original/3d-illustration-ethereum-logo-png.png"
            alt=""
            className=""
          />
        </div>
        <div className="m-3">
          <div className="flex m-auto ">
            <input
              placeholder="Insert ETH Adress"
              className=" w-full p-3 rounded-lg "
              type="text"
              value={address}
              onChange={handleAddressChange}
            />
          </div>
        </div>

        <div className="m-3">
          <button
            className="text-center w-full m-auto bg-gradient-to-r from-sky-500 to-cyan-400 p-2 rounded-xl  "
            onClick={handleClick}
          >
            Fetch Balance
          </button>
        </div>
        <div className="m-3">
          {result && (
            <div className="text-center md:text-3xl text-lg  text-sky-200 m-2  ">
              Balance: {balance}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MyComponent;
