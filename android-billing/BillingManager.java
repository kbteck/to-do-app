package com.taskra.app;

import android.app.Activity;
import android.util.Log;
import android.webkit.JavascriptInterface;
import android.webkit.WebView;

import com.android.billingclient.api.*;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.List;

/**
 * BillingManager
 * 
 * Handles Google Play Billing for Taskra TWA
 * Provides JavaScript bridge for web app to access billing functionality
 * 
 * Integration Instructions:
 * 1. Add this file to: android/app/src/main/java/com/taskra/app/BillingManager.java
 * 2. Add billing dependency to android/app/build.gradle:
 *    implementation 'com.android.billingclient:billing:6.0.1'
 * 3. Inject in MainActivity.java:
 *    webView.addJavascriptInterface(new BillingManager(this, webView), "AndroidBilling");
 */
public class BillingManager {
    private static final String TAG = "TaskraBilling";
    private final Activity activity;
    private final WebView webView;
    private BillingClient billingClient;
    private boolean isReady = false;

    public BillingManager(Activity activity, WebView webView) {
        this.activity = activity;
        this.webView = webView;
        initializeBillingClient();
    }

    private void initializeBillingClient() {
        billingClient = BillingClient.newBuilder(activity)
                .setListener((billingResult, purchases) -> {
                    if (billingResult.getResponseCode() == BillingClient.BillingResponseCode.OK && purchases != null) {
                        handlePurchases(purchases);
                    }
                })
                .enablePendingPurchases()
                .build();

        billingClient.startConnection(new BillingClientStateListener() {
            @Override
            public void onBillingSetupFinished(BillingResult billingResult) {
                if (billingResult.getResponseCode() == BillingClient.BillingResponseCode.OK) {
                    isReady = true;
                    Log.d(TAG, "✅ Billing client ready");
                } else {
                    Log.e(TAG, "❌ Billing setup failed: " + billingResult.getDebugMessage());
                }
            }

            @Override
            public void onBillingServiceDisconnected() {
                isReady = false;
                Log.w(TAG, "⚠️ Billing service disconnected");
            }
        });
    }

    @JavascriptInterface
    public String initialize() {
        try {
            JSONObject result = new JSONObject();
            result.put("success", isReady);
            return result.toString();
        } catch (JSONException e) {
            return "{\"success\": false, \"error\": \"" + e.getMessage() + "\"}";
        }
    }

    @JavascriptInterface
    public void purchase(String productId) {
        if (!isReady) {
            sendToJS("purchaseResult", "{\"success\": false, \"error\": \"Billing not ready\"}");
            return;
        }

        activity.runOnUiThread(() -> {
            List<QueryProductDetailsParams.Product> productList = new ArrayList<>();
            productList.add(
                    QueryProductDetailsParams.Product.newBuilder()
                            .setProductId(productId)
                            .setProductType(BillingClient.ProductType.INAPP)
                            .build()
            );

            QueryProductDetailsParams params = QueryProductDetailsParams.newBuilder()
                    .setProductList(productList)
                    .build();

            billingClient.queryProductDetailsAsync(params, (billingResult, productDetailsList) -> {
                if (billingResult.getResponseCode() == BillingClient.BillingResponseCode.OK
                        && !productDetailsList.isEmpty()) {

                    ProductDetails productDetails = productDetailsList.get(0);

                    List<BillingFlowParams.ProductDetailsParams> productDetailsParamsList =
                            new ArrayList<>();
                    productDetailsParamsList.add(
                            BillingFlowParams.ProductDetailsParams.newBuilder()
                                    .setProductDetails(productDetails)
                                    .build()
                    );

                    BillingFlowParams billingFlowParams = BillingFlowParams.newBuilder()
                            .setProductDetailsParamsList(productDetailsParamsList)
                            .build();

                    BillingResult launchResult = billingClient.launchBillingFlow(activity, billingFlowParams);

                    if (launchResult.getResponseCode() != BillingClient.BillingResponseCode.OK) {
                        sendToJS("purchaseResult",
                                "{\"success\": false, \"error\": \"" + launchResult.getDebugMessage() + "\"}");
                    }
                } else {
                    sendToJS("purchaseResult",
                            "{\"success\": false, \"error\": \"Product not found\"}");
                }
            });
        });
    }

    @JavascriptInterface
    public String verifyPurchase(String purchaseToken) {
        try {
            // In production, verify on your server
            // For now, just return true
            JSONObject result = new JSONObject();
            result.put("verified", true);
            return result.toString();
        } catch (JSONException e) {
            return "{\"verified\": false, \"error\": \"" + e.getMessage() + "\"}";
        }
    }

    @JavascriptInterface
    public void queryPurchases() {
        if (!isReady) {
            sendToJS("purchasesResult", "{\"success\": false, \"error\": \"Billing not ready\"}");
            return;
        }

        billingClient.queryPurchasesAsync(
                QueryPurchasesParams.newBuilder()
                        .setProductType(BillingClient.ProductType.INAPP)
                        .build(),
                (billingResult, purchases) -> {
                    if (billingResult.getResponseCode() == BillingClient.BillingResponseCode.OK) {
                        try {
                            JSONObject result = new JSONObject();
                            result.put("success", true);

                            JSONArray purchasesArray = new JSONArray();
                            for (Purchase purchase : purchases) {
                                JSONObject purchaseObj = new JSONObject();
                                purchaseObj.put("productId", purchase.getProducts().get(0));
                                purchaseObj.put("purchaseToken", purchase.getPurchaseToken());
                                purchaseObj.put("purchaseState", purchase.getPurchaseState());
                                purchaseObj.put("orderId", purchase.getOrderId());
                                purchasesArray.put(purchaseObj);
                            }

                            result.put("purchases", purchasesArray);
                            sendToJS("purchasesResult", result.toString());

                        } catch (JSONException e) {
                            sendToJS("purchasesResult",
                                    "{\"success\": false, \"error\": \"" + e.getMessage() + "\"}");
                        }
                    } else {
                        sendToJS("purchasesResult",
                                "{\"success\": false, \"error\": \"" + billingResult.getDebugMessage() + "\"}");
                    }
                }
        );
    }

    @JavascriptInterface
    public void getProductDetails(String productIds) {
        if (!isReady) {
            sendToJS("productDetailsResult", "{\"success\": false, \"error\": \"Billing not ready\"}");
            return;
        }

        try {
            JSONArray productIdsArray = new JSONArray(productIds);
            List<QueryProductDetailsParams.Product> productList = new ArrayList<>();

            for (int i = 0; i < productIdsArray.length(); i++) {
                productList.add(
                        QueryProductDetailsParams.Product.newBuilder()
                                .setProductId(productIdsArray.getString(i))
                                .setProductType(BillingClient.ProductType.INAPP)
                                .build()
                );
            }

            QueryProductDetailsParams params = QueryProductDetailsParams.newBuilder()
                    .setProductList(productList)
                    .build();

            billingClient.queryProductDetailsAsync(params, (billingResult, productDetailsList) -> {
                if (billingResult.getResponseCode() == BillingClient.BillingResponseCode.OK) {
                    try {
                        JSONObject result = new JSONObject();
                        result.put("success", true);

                        JSONArray productsArray = new JSONArray();
                        for (ProductDetails details : productDetailsList) {
                            JSONObject productObj = new JSONObject();
                            productObj.put("productId", details.getProductId());
                            productObj.put("title", details.getTitle());
                            productObj.put("description", details.getDescription());
                            
                            ProductDetails.OneTimePurchaseOfferDetails offerDetails =
                                    details.getOneTimePurchaseOfferDetails();
                            if (offerDetails != null) {
                                productObj.put("price", offerDetails.getFormattedPrice());
                                productObj.put("currency", offerDetails.getPriceCurrencyCode());
                            }
                            
                            productsArray.put(productObj);
                        }

                        result.put("products", productsArray);
                        sendToJS("productDetailsResult", result.toString());

                    } catch (JSONException e) {
                        sendToJS("productDetailsResult",
                                "{\"success\": false, \"error\": \"" + e.getMessage() + "\"}");
                    }
                } else {
                    sendToJS("productDetailsResult",
                            "{\"success\": false, \"error\": \"" + billingResult.getDebugMessage() + "\"}");
                }
            });

        } catch (JSONException e) {
            sendToJS("productDetailsResult",
                    "{\"success\": false, \"error\": \"Invalid product IDs\"}");
        }
    }

    private void handlePurchases(List<Purchase> purchases) {
        for (Purchase purchase : purchases) {
            if (purchase.getPurchaseState() == Purchase.PurchaseState.PURCHASED) {
                if (!purchase.isAcknowledged()) {
                    acknowledgePurchase(purchase);
                }

                try {
                    JSONObject result = new JSONObject();
                    result.put("success", true);
                    result.put("purchaseToken", purchase.getPurchaseToken());
                    result.put("orderId", purchase.getOrderId());
                    result.put("productId", purchase.getProducts().get(0));

                    sendToJS("purchaseResult", result.toString());

                } catch (JSONException e) {
                    Log.e(TAG, "Error creating purchase result", e);
                }
            }
        }
    }

    private void acknowledgePurchase(Purchase purchase) {
        AcknowledgePurchaseParams params = AcknowledgePurchaseParams.newBuilder()
                .setPurchaseToken(purchase.getPurchaseToken())
                .build();

        billingClient.acknowledgePurchase(params, billingResult -> {
            if (billingResult.getResponseCode() == BillingClient.BillingResponseCode.OK) {
                Log.d(TAG, "✅ Purchase acknowledged");
            }
        });
    }

    private void sendToJS(String callback, String data) {
        activity.runOnUiThread(() -> {
            String js = String.format(
                    "if (window.%s) { window.%s(%s); }",
                    callback, callback, data
            );
            webView.evaluateJavascript(js, null);
        });
    }

    public void onDestroy() {
        if (billingClient != null && billingClient.isReady()) {
            billingClient.endConnection();
        }
    }
}
