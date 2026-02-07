const { google } = require("googleapis");
const User = require("../models/User");

const androidpublisher = google.androidpublisher("v3");

const authClient = new google.auth.GoogleAuth({
  keyFile: "playstore-key.json", // Google Service Account
  scopes: ["https://www.googleapis.com/auth/androidpublisher"],
});

exports.verifyPlayStorePurchase = async (req, res) => {
  const { purchaseToken, productId } = req.body;

  const auth = await authClient.getClient();

  const response = await androidpublisher.purchases.subscriptions.get({
    auth,
    packageName: "com.adiyogi.app",
    subscriptionId: productId,
    token: purchaseToken,
  });

  if (response.data.paymentState !== 1) {
    return res.status(400).json({ message: "Payment not completed" });
  }

  const user = await User.findById(req.user.userId);
  user.isPremium = true;
  user.plan = productId;
  user.premiumUntil = new Date(
    Number(response.data.expiryTimeMillis)
  );

  await user.save();

  res.json({ success: true });
};