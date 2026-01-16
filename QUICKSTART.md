# 🚀 Quick Start Guide - DTPhone Store Frontend

## What's Ready?

✅ **Full Mock Backend System**
- No actual backend server needed
- All APIs return realistic mock data
- Works perfectly for development and testing

---

## Getting Started

### 1. Start the Dev Server
```bash
npm run dev
```
Then open: **http://localhost:3000**

### 2. Test the Login System
- **URL**: http://localhost:3000/login
- **Email**: Any email (e.g., test@example.com)
- **Password**: Any password (e.g., password123)
- **Result**: ✅ Logs in successfully

### 3. Browse Products
- **Home Page**: See 6 sample products
- **Click Product**: View full product details
- **Add to Cart**: Add any product to cart
- **View Cart**: http://localhost:3000/cart

### 4. Create an Account
- **URL**: http://localhost:3000/register
- **Fill Form**: Any valid data
- **Verify Email**: http://localhost:3000/verify-email
- **Enter Code**: Use any 6-digit code
- **Login**: Use registered email

### 5. User Account
- **Logged In?**: Click your name in header
- **View Info**: http://localhost:3000/information
- **Order History**: See mock orders
- **Logout**: Click "Đăng xuất"

---

## What's Available

### Sample Products (6 total)
1. **Samsung Galaxy S24 FE** - 15,990,000đ
2. **Xiaomi Redmi Note 14** - 5,990,000đ
3. **iPhone 17 256GB** - 29,990,000đ
4. **Oppo Reno 12 5G** - 8,990,000đ
5. **Vivo V40 Pro** - 12,990,000đ
6. **Realme 13 Pro** - 8,490,000đ

### Mock User Account
- **Name**: Lộc Trần Trân
- **Email**: loc@example.com
- **Phone**: 0789999930

### Features Working
✅ Login/Register/Logout
✅ Product browsing
✅ Product search & filtering
✅ Add to cart
✅ Update quantities
✅ Checkout flow
✅ Order creation
✅ User information
✅ Responsive design

---

## File Structure

```
src/
├── data/
│   └── mockData.ts               ← All mock data here
├── store/
│   └── features/
│       ├── authApi.ts            ← Mock authentication
│       ├── productApi.ts         ← Mock products
│       ├── cartApi.ts            ← Mock cart
│       └── orderApi.ts           ← Mock orders
└── components/
    └── auth/
        └── LoginForm.tsx         ← Updated for mock
```

---

## Important Notes

### Session Data
- 💾 **Saved**: User login, tokens, cart items
- 🔄 **Resets on Page Refresh**: This is expected behavior
- ℹ️ **Solution**: Can be fixed with localStorage persistence if needed

### API Delays
- ⏱️ **Realistic Delays**: 300-500ms per request
- 💡 **Why**: Makes the mock feel like real API
- ⚙️ **Can be Removed**: Just delete the setTimeout lines

### No Backend Needed
- 🎯 **Perfect for**: Development, demos, testing
- 🚀 **Ready for**: Real backend integration anytime
- 🔧 **Easy Switch**: Just update API URL and remove queryFn override

---

## Common Tasks

### Test Login Flow
```bash
1. Go to http://localhost:3000/login
2. Enter any email and password
3. Click "Đăng nhập"
4. ✅ Should be logged in
```

### Test Shopping
```bash
1. Go to home page http://localhost:3000
2. Click any product
3. Click "Thêm vào giỏ hàng"
4. Go to http://localhost:3000/cart
5. ✅ Product should be in cart
```

### Test Logout
```bash
1. Click your name in header
2. Click "Đăng xuất"
3. ✅ Should redirect to login
```

### Clear Login State
```bash
1. Open browser DevTools (F12)
2. Go to Application → Cookies → Local Storage
3. Clear all items
4. Refresh page
5. ✅ You'll be logged out
```

---

## Troubleshooting

### "Port 3000 already in use"
```bash
# Kill process on port 3000 and try again
# Or use a different port:
npm run dev -- -p 3001
```

### "Module not found" errors
```bash
# Reinstall dependencies
rm -rf node_modules
npm install
npm run dev
```

### "Build errors"
```bash
# Clear Next.js cache
rm -rf .next
npm run dev
```

### Login doesn't work
- Check console (F12) for errors
- Try a different email/password combination
- Make sure localStorage is enabled

### Cart empties on refresh
- This is expected with mock data
- Real app will use database persistence
- Workaround: Use localStorage (optional enhancement)

---

## Next Steps

### For Development
✅ You're ready to start building features!
- All API endpoints are mocked
- No backend setup needed
- Full frontend development possible

### For Testing
✅ You can test all user flows!
- Login/register works
- Shopping works
- All navigation works

### For Presentations
✅ Ready for demos!
- Looks like a real app
- All flows work smoothly
- Professional appearance

### For Backend Integration
1. Get API endpoints from backend team
2. Update `NEXT_PUBLIC_API_URL` in `.env.local`
3. Change mock endpoints to real ones
4. Everything else stays the same!

---

## Documentation Available

- 📄 **STATUS.md** - Complete project summary
- 📄 **MOCK_API_IMPLEMENTATION.md** - Technical details
- 📄 **MOCK_API_USAGE_EXAMPLES.md** - Code examples
- 📄 **IMPLEMENTATION_CHECKLIST.md** - Detailed checklist
- 📄 **This file** - Quick start guide

---

## Useful Commands

```bash
# Start development server
npm run dev

# Check for errors
npm run lint

# Build for production
npm run build

# Format code
npm run format
```

---

## Need Help?

### Check Documentation
1. Open STATUS.md for overview
2. Check MOCK_API_USAGE_EXAMPLES.md for code examples
3. See MOCK_API_IMPLEMENTATION.md for technical details

### Check Browser Console
1. Press F12 to open DevTools
2. Go to Console tab
3. Look for any error messages
4. Check Network tab for API calls

### Common Solutions
- Refresh page (F5)
- Clear cache (Ctrl+Shift+Delete)
- Restart dev server
- Reinstall dependencies

---

## Summary

You now have a **fully functional DTPhone Store Frontend** with:
- ✅ Complete mock backend
- ✅ All user flows working
- ✅ No backend server needed
- ✅ Ready for testing/demos
- ✅ Easy to integrate with real backend

**Happy coding! 🎉**

---

For more detailed information, see:
- **STATUS.md** for full project status
- **MOCK_API_IMPLEMENTATION.md** for technical deep dive
- **IMPLEMENTATION_CHECKLIST.md** for complete feature list
