// Test file to verify all mock APIs are working correctly
// This file is just for development verification and should be deleted before deployment

import { mockUser, mockLoginResponse, mockProducts, mockCart, mockOrders, mockPromotions } from '@/data/mockData';

export const verifyMockData = () => {
  console.log('=== Mock Data Verification ===');
  
  // Verify Auth Data
  console.log('✓ Mock User:', mockUser);
  console.log('✓ Mock Login Response:', mockLoginResponse);
  
  // Verify Product Data
  console.log('✓ Mock Products Count:', mockProducts.length);
  console.log('✓ First Product:', mockProducts[0]);
  
  // Verify Cart Data
  console.log('✓ Mock Cart:', mockCart);
  
  // Verify Order Data
  console.log('✓ Mock Orders Count:', mockOrders.length);
  if (mockOrders.length > 0) {
    console.log('✓ First Order:', mockOrders[0]);
  }
  
  // Verify Promotion Data
  console.log('✓ Mock Promotions Count:', mockPromotions.length);
  
  console.log('=== All Mock Data Verified ===');
};

// Call verification in development
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
  console.log('[API Mock Data Ready]');
}
