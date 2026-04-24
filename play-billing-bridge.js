/**
 * Google Play Billing Bridge for TWA
 * This replaces the mock PlayBilling class when app is packaged as TWA
 * 
 * Integration Steps:
 * 1. Add billing dependency to android/app/build.gradle
 * 2. Create BillingManager.java in Android project
 * 3. Inject JavaScript bridge in WebView
 * 4. Use this file instead of mock billing in config.js
 */

class PlayBillingTWA {
  constructor() {
    this.isInitialized = false;
    this.productId = 'premium_unlock';
    
    // Check if running in TWA with billing bridge
    this.isTWA = typeof AndroidBilling !== 'undefined';
    
    if (this.isTWA) {
      console.log('✅ Running in TWA with Play Billing support');
      this.initializeBilling();
    } else {
      console.warn('⚠️ Not in TWA environment - billing unavailable');
    }
  }

  async initializeBilling() {
    try {
      if (this.isTWA) {
        // Initialize connection to Google Play Billing
        const result = await AndroidBilling.initialize();
        this.isInitialized = result.success;
        console.log('Billing initialized:', this.isInitialized);
        
        // Check existing purchases
        await this.restorePurchases();
      }
    } catch (error) {
      console.error('Billing initialization failed:', error);
      this.isInitialized = false;
    }
  }

  async purchasePremium() {
    if (!this.isTWA) {
      alert('Play Billing only available in Play Store version.\n\nPlease download from Google Play Store to purchase premium.');
      return { success: false, error: 'Not in TWA' };
    }

    if (!this.isInitialized) {
      return { success: false, error: 'Billing not initialized' };
    }

    try {
      console.log('Starting purchase flow for:', this.productId);
      
      // Launch Google Play purchase dialog
      const result = await AndroidBilling.purchase(this.productId);
      
      if (result.success) {
        console.log('✅ Purchase successful!');
        
        // Verify and consume/acknowledge purchase
        const verified = await this.verifyPurchase(result.purchaseToken);
        
        if (verified) {
          // Unlock premium
          if (typeof premiumManager !== 'undefined') {
            premiumManager.unlockPremium(result.purchaseToken);
          }
          
          return {
            success: true,
            token: result.purchaseToken,
            orderId: result.orderId
          };
        }
      }
      
      return { success: false, error: result.error || 'Purchase failed' };
      
    } catch (error) {
      console.error('Purchase error:', error);
      return { success: false, error: error.message };
    }
  }

  async verifyPurchase(purchaseToken) {
    try {
      if (!this.isTWA) return false;
      
      // Verify purchase with Google Play
      const result = await AndroidBilling.verifyPurchase(purchaseToken);
      return result.verified === true;
      
    } catch (error) {
      console.error('Verification failed:', error);
      return false;
    }
  }

  async restorePurchases() {
    if (!this.isTWA) return [];
    
    try {
      console.log('Restoring purchases...');
      
      // Query existing purchases
      const result = await AndroidBilling.queryPurchases();
      
      if (result.success && result.purchases.length > 0) {
        console.log('Found existing purchases:', result.purchases.length);
        
        // Check for premium unlock
        const premiumPurchase = result.purchases.find(p => p.productId === this.productId);
        
        if (premiumPurchase && premiumPurchase.purchaseState === 1) {
          console.log('✅ Premium already purchased, restoring...');
          
          if (typeof premiumManager !== 'undefined') {
            premiumManager.unlockPremium(premiumPurchase.purchaseToken);
          }
          
          return [premiumPurchase];
        }
      }
      
      return [];
      
    } catch (error) {
      console.error('Restore purchases failed:', error);
      return [];
    }
  }

  async getProductDetails() {
    if (!this.isTWA) {
      return {
        productId: this.productId,
        price: '$4.99',
        currency: 'USD',
        title: 'Premium Unlock',
        description: 'Unlock unlimited tasks with notifications'
      };
    }

    try {
      const result = await AndroidBilling.getProductDetails([this.productId]);
      
      if (result.success && result.products.length > 0) {
        return result.products[0];
      }
      
      return null;
      
    } catch (error) {
      console.error('Failed to get product details:', error);
      return null;
    }
  }
}

// Export for use in config.js
if (typeof module !== 'undefined' && module.exports) {
  module.exports = PlayBillingTWA;
}
