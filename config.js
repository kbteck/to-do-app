// App Configuration and Feature Flags
const APP_CONFIG = {
  version: '2.0.0',
  name: 'Taskra',
  
  // Monetization
  pricing: {
    oneTimePurchase: 4.99,
    currency: 'USD',
    productId: 'premium_unlock' // For Google Play Billing
  },
  
  // Feature limits
  features: {
    free: {
      maxTasksWithNotifications: 5,
      maxCategories: 3,
      themes: ['light', 'dark'],
      reminders: ['15min', 'due'],
      cloudSync: false,
      recurringTasks: false,
      dataExport: false,
      customThemes: false
    },
    premium: {
      maxTasksWithNotifications: Infinity,
      maxCategories: Infinity,
      themes: ['light', 'dark', 'blue', 'purple', 'green'],
      reminders: ['5min', '15min', '30min', '1hour', '1day', 'due'],
      cloudSync: true,
      recurringTasks: true,
      dataExport: true,
      customThemes: true
    }
  },
  
  // Onboarding
  onboarding: {
    enabled: true,
    screens: [
      {
        title: 'Welcome to Taskra',
        description: 'Your intelligent task manager with smart notifications',
        icon: '✨',
        image: 'icon-512.png'
      },
      {
        title: 'Never Miss a Deadline',
        description: 'Get reminded 15 minutes before and at due time',
        icon: '⏰',
        features: ['Smart notifications', 'Priority levels', 'Categories']
      },
      {
        title: 'Organize Effortlessly',
        description: 'Filter by status, category, priority, or search instantly',
        icon: '📊',
        features: ['Advanced filters', 'Quick search', 'Statistics dashboard']
      },
      {
        title: 'Works Everywhere',
        description: 'Offline-capable PWA that syncs across all your devices',
        icon: '🔄',
        features: ['Offline mode', 'Auto-sync', 'Cross-platform']
      }
    ]
  }
};

// Premium status management
class PremiumManager {
  constructor() {
    this.isPremium = this.checkPremiumStatus();
  }
  
  checkPremiumStatus() {
    // Check localStorage for premium status
    const premiumData = localStorage.getItem('premiumStatus');
    if (premiumData) {
      try {
        const data = JSON.parse(premiumData);
        return data.isPremium === true && this.validatePurchase(data);
      } catch (e) {
        return false;
      }
    }
    return false;
  }
  
  validatePurchase(data) {
    // Validate purchase data
    // In production, verify with Google Play Billing
    return data.purchaseToken && data.purchaseDate;
  }
  
  unlockPremium(purchaseToken) {
    const purchaseData = {
      isPremium: true,
      purchaseToken: purchaseToken,
      purchaseDate: new Date().toISOString(),
      productId: APP_CONFIG.pricing.productId
    };
    
    localStorage.setItem('premiumStatus', JSON.stringify(purchaseData));
    this.isPremium = true;
    
    console.log('✅ Premium unlocked!');
    return true;
  }
  
  getFeatures() {
    return this.isPremium ? APP_CONFIG.features.premium : APP_CONFIG.features.free;
  }
  
  canAddNotificationTask(currentCount) {
    const maxTasks = this.getFeatures().maxTasksWithNotifications;
    return currentCount < maxTasks;
  }
  
  getUpgradeMessage(feature) {
    const messages = {
      notifications: `Unlock unlimited tasks with notifications for just $${APP_CONFIG.pricing.oneTimePurchase}!`,
      categories: `Get unlimited categories with Premium for $${APP_CONFIG.pricing.oneTimePurchase}`,
      reminders: `Unlock custom reminder times (5min, 30min, 1hr, 1day) with Premium!`,
      themes: `Access beautiful custom themes with Premium!`,
      export: `Export your tasks to CSV/PDF with Premium!`,
      sync: `Sync across all devices with Premium Cloud Sync!`
    };
    
    return messages[feature] || `Upgrade to Premium for just $${APP_CONFIG.pricing.oneTimePurchase}!`;
  }
}

// Mock Google Play Billing (for testing)
// Replace with actual Google Play Billing Library in production
class PlayBilling {
  constructor() {
    this.isAvailable = this.checkAvailability();
  }
  
  checkAvailability() {
    // Check if running in Android app with Play Billing
    return typeof Android !== 'undefined' && Android.isPlayBillingAvailable;
  }
  
  async purchasePremium() {
    if (!this.isAvailable) {
      // Mock purchase for web testing
      console.log('🛒 Mock purchase initiated');
      return this.mockPurchase();
    }
    
    try {
      // Real Play Billing API call
      const result = await Android.purchaseProduct(APP_CONFIG.pricing.productId);
      return result;
    } catch (error) {
      console.error('Purchase failed:', error);
      throw error;
    }
  }
  
  mockPurchase() {
    // Simulate purchase for testing
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          purchaseToken: 'mock_token_' + Date.now(),
          productId: APP_CONFIG.pricing.productId
        });
      }, 1000);
    });
  }
  
  async restorePurchases() {
    if (!this.isAvailable) {
      console.log('📦 Restore not available in web version');
      return false;
    }
    
    try {
      const purchases = await Android.restorePurchases();
      return purchases;
    } catch (error) {
      console.error('Restore failed:', error);
      return false;
    }
  }
}

// Initialize global instances
const premiumManager = new PremiumManager();
const playBilling = new PlayBilling();

console.log('⚙️ Config loaded - Premium:', premiumManager.isPremium);
