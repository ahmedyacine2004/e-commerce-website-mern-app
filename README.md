
```
e-commerce-website-mern-app
├─ admin
│  ├─ .env
│  ├─ eslint.config.js
│  ├─ index.html
│  ├─ package-lock.json
│  ├─ package.json
│  ├─ postcss.config.js
│  ├─ public
│  │  ├─ fonts
│  │  │  ├─ Roboto-Black.ttf
│  │  │  ├─ Roboto-BlackItalic.ttf
│  │  │  ├─ Roboto-Bold.ttf
│  │  │  ├─ Roboto-BoldItalic.ttf
│  │  │  ├─ Roboto-ExtraBold.ttf
│  │  │  ├─ Roboto-ExtraBoldItalic.ttf
│  │  │  ├─ Roboto-ExtraLight.ttf
│  │  │  ├─ Roboto-ExtraLightItalic.ttf
│  │  │  ├─ Roboto-Italic.ttf
│  │  │  ├─ Roboto-Light.ttf
│  │  │  ├─ Roboto-LightItalic.ttf
│  │  │  ├─ Roboto-Medium.ttf
│  │  │  ├─ Roboto-MediumItalic.ttf
│  │  │  ├─ Roboto-Regular.ttf
│  │  │  ├─ Roboto-SemiBold.ttf
│  │  │  ├─ Roboto-SemiBoldItalic.ttf
│  │  │  ├─ Roboto-Thin.ttf
│  │  │  └─ Roboto-ThinItalic.ttf
│  │  └─ images
│  │     ├─ 3d-Store.png
│  │     ├─ logo.png
│  │     └─ pfp-placeholder.png
│  ├─ README.md
│  ├─ src
│  │  ├─ App.jsx
│  │  ├─ assets
│  │  │  ├─ lottie
│  │  │  │  ├─ 404.json
│  │  │  │  ├─ Loading animation blue.json
│  │  │  │  ├─ Login.json
│  │  │  │  └─ spinner.json
│  │  │  └─ svgs
│  │  │     ├─ box.svg
│  │  │     ├─ gift.svg
│  │  │     ├─ money.svg
│  │  │     └─ revenue.svg
│  │  ├─ Components
│  │  │  ├─ Animated
│  │  │  │  ├─ Bars
│  │  │  │  │  └─ inedx.jsx
│  │  │  │  ├─ Cells
│  │  │  │  │  └─ index.jsx
│  │  │  │  ├─ Lines
│  │  │  │  │  └─ index.jsx
│  │  │  │  └─ Pie
│  │  │  │     └─ index.jsx
│  │  │  ├─ Charts
│  │  │  │  ├─ Bar
│  │  │  │  ├─ Line
│  │  │  │  │  ├─ ChartFilters.jsx
│  │  │  │  │  ├─ ChartView.jsx
│  │  │  │  │  ├─ CustomLegend.jsx
│  │  │  │  │  ├─ CustomTooltip.jsx
│  │  │  │  │  ├─ index.jsx
│  │  │  │  │  └─ useChartData.jsx
│  │  │  │  └─ Pie
│  │  │  ├─ DashboardBoxes
│  │  │  │  ├─ BoxCard.jsx
│  │  │  │  ├─ ChartWrapper.jsx
│  │  │  │  ├─ data.jsx
│  │  │  │  ├─ index.jsx
│  │  │  │  └─ style.css
│  │  │  ├─ Header
│  │  │  │  ├─ Header.jsx
│  │  │  │  ├─ HeaderButtons.jsx
│  │  │  │  ├─ index.jsx
│  │  │  │  ├─ style.css
│  │  │  │  └─ StyledBadge.jsx
│  │  │  ├─ LoadingSpinner
│  │  │  │  └─ index.jsx
│  │  │  ├─ ProtectedRoute
│  │  │  │  └─ index.jsx
│  │  │  ├─ SearchBox
│  │  │  │  └─ index.jsx
│  │  │  ├─ Sidebar
│  │  │  │  └─ index.jsx
│  │  │  ├─ StatusBadge
│  │  │  │  └─ index.jsx
│  │  │  └─ Table
│  │  │     ├─ CategoryMenu.jsx
│  │  │     ├─ FiltersMenu.jsx
│  │  │     ├─ GenericTable.jsx
│  │  │     ├─ index.jsx
│  │  │     ├─ TableActions
│  │  │     │  └─ index.jsx
│  │  │     ├─ TableBodyRows.jsx
│  │  │     └─ TableHeader.jsx
│  │  ├─ constants
│  │  │  └─ tableColumns.jsx
│  │  ├─ Contexts
│  │  │  ├─ AdminContext.js
│  │  │  ├─ OrdersContext.js
│  │  │  └─ SalesContext.js
│  │  ├─ data
│  │  │  ├─ adminMenu.json
│  │  │  ├─ products.json
│  │  │  └─ sales.json
│  │  ├─ hooks
│  │  │  └─ useProducts.js
│  │  ├─ index.css
│  │  ├─ main.jsx
│  │  ├─ Pages
│  │  │  ├─ Categories
│  │  │  │  └─ index.jsx
│  │  │  ├─ Dashboard
│  │  │  │  └─ index.jsx
│  │  │  ├─ Login
│  │  │  │  ├─ EmailPasswordStep.jsx
│  │  │  │  ├─ index.jsx
│  │  │  │  ├─ OTPStep.jsx
│  │  │  │  └─ PasswordStep.jsx
│  │  │  ├─ NotFound
│  │  │  │  └─ index.jsx
│  │  │  ├─ Orders
│  │  │  │  └─ index.jsx
│  │  │  ├─ Products
│  │  │  │  └─ index.jsx
│  │  │  ├─ ProductsEdit
│  │  │  │  └─ index.jsx
│  │  │  ├─ ProductsUpload
│  │  │  │  ├─ BasicInfo.jsx
│  │  │  │  ├─ Card.jsx
│  │  │  │  ├─ Characteristics.jsx
│  │  │  │  ├─ ColorsSizes.jsx
│  │  │  │  ├─ Description.jsx
│  │  │  │  ├─ index.jsx
│  │  │  │  ├─ MediaUpload.jsx
│  │  │  │  ├─ PricingAndAdditionalInfo.jsx
│  │  │  │  ├─ Tags.jsx
│  │  │  │  └─ Variants.jsx
│  │  │  ├─ Slides
│  │  │  │  └─ index.jsx
│  │  │  └─ Users
│  │  │     └─ index.jsx
│  │  ├─ Providers
│  │  │  ├─ AdminProvider.jsx
│  │  │  ├─ OrdersProvider.jsx
│  │  │  └─ SalesProvider.jsx
│  │  ├─ services
│  │  │  └─ product.service.js
│  │  └─ utils
│  │     ├─ adapters
│  │     │  └─ productAdapter.js
│  │     ├─ Export
│  │     │  └─ exportToCSV.jsx
│  │     ├─ LineChart
│  │     │  └─ index.js
│  │     └─ Table
│  │        ├─ productAdapter.jsx
│  │        ├─ tableFilters.jsx
│  │        └─ tableUtils.jsx
│  ├─ tailwind.config.js
│  └─ vite.config.js
├─ client
│  ├─ .env
│  ├─ eslint.config.js
│  ├─ index.html
│  ├─ package-lock.json
│  ├─ package.json
│  ├─ postcss.config.js
│  ├─ public
│  │  ├─ fonts
│  │  │  ├─ Roboto-Black.ttf
│  │  │  ├─ Roboto-BlackItalic.ttf
│  │  │  ├─ Roboto-Bold.ttf
│  │  │  ├─ Roboto-BoldItalic.ttf
│  │  │  ├─ Roboto-ExtraBold.ttf
│  │  │  ├─ Roboto-ExtraBoldItalic.ttf
│  │  │  ├─ Roboto-ExtraLight.ttf
│  │  │  ├─ Roboto-ExtraLightItalic.ttf
│  │  │  ├─ Roboto-Italic.ttf
│  │  │  ├─ Roboto-Light.ttf
│  │  │  ├─ Roboto-LightItalic.ttf
│  │  │  ├─ Roboto-Medium.ttf
│  │  │  ├─ Roboto-MediumItalic.ttf
│  │  │  ├─ Roboto-Regular.ttf
│  │  │  ├─ Roboto-SemiBold.ttf
│  │  │  ├─ Roboto-SemiBoldItalic.ttf
│  │  │  ├─ Roboto-Thin.ttf
│  │  │  └─ Roboto-ThinItalic.ttf
│  │  ├─ images
│  │  │  ├─ BannerBoxV2
│  │  │  │  ├─ 01.jpg
│  │  │  │  ├─ 02.jpg
│  │  │  │  └─ 03.avif
│  │  │  ├─ HomeAdsBanners
│  │  │  │  ├─ banner1.jpg
│  │  │  │  ├─ banner2.jpg
│  │  │  │  ├─ banner3.jpg
│  │  │  │  ├─ banner4.jpg
│  │  │  │  ├─ banner5.jpg
│  │  │  │  └─ banner6.jpg
│  │  │  ├─ HomeCatSlider
│  │  │  │  ├─ dress.png
│  │  │  │  ├─ gadgets.png
│  │  │  │  ├─ handbag.png
│  │  │  │  ├─ jewelry.png
│  │  │  │  ├─ makeup.png
│  │  │  │  ├─ meditation.png
│  │  │  │  ├─ shopping-bag.png
│  │  │  │  └─ sneakers.png
│  │  │  ├─ HomeSlider
│  │  │  │  ├─ 1.jpg
│  │  │  │  ├─ 10.jpg
│  │  │  │  ├─ 2.jpg
│  │  │  │  ├─ 3.jpg
│  │  │  │  ├─ 4.jpg
│  │  │  │  ├─ 5.jpg
│  │  │  │  ├─ 6.jpg
│  │  │  │  ├─ 7.jpg
│  │  │  │  ├─ 8.jpg
│  │  │  │  └─ 9.jpg
│  │  │  ├─ HomeSliderV2
│  │  │  │  ├─ 01.jpg
│  │  │  │  └─ 02.jpg
│  │  │  ├─ logo.png
│  │  │  ├─ PaymentMethods
│  │  │  │  ├─ egold.png
│  │  │  │  ├─ maestro.png
│  │  │  │  ├─ mastercard.png
│  │  │  │  ├─ paypal.png
│  │  │  │  └─ visa.png
│  │  │  └─ pfp-placeholder.png
│  │  └─ svgs
│  ├─ README.md
│  ├─ src
│  │  ├─ api
│  │  │  └─ products.api.js
│  │  ├─ App.jsx
│  │  ├─ assets
│  │  │  └─ lottie
│  │  │     ├─ 404.json
│  │  │     └─ shield.json
│  │  ├─ components
│  │  │  ├─ AdsBannerSlider
│  │  │  │  ├─ index.jsx
│  │  │  │  └─ style.css
│  │  │  ├─ AdsBannerSliderV2
│  │  │  │  ├─ index.jsx
│  │  │  │  └─ style.css
│  │  │  ├─ BannerBox
│  │  │  │  └─ index.jsx
│  │  │  ├─ BannerBoxV2
│  │  │  │  └─ index.jsx
│  │  │  ├─ BlogItem
│  │  │  │  └─ index.jsx
│  │  │  ├─ CartDrawer
│  │  │  │  ├─ CartHeader.jsx
│  │  │  │  ├─ CartItem.jsx
│  │  │  │  ├─ CartList.jsx
│  │  │  │  ├─ CartSummary.jsx
│  │  │  │  └─ index.jsx
│  │  │  ├─ ClientPrivateRoute
│  │  │  │  └─ index.jsx
│  │  │  ├─ Footer
│  │  │  │  ├─ Footer.jsx
│  │  │  │  ├─ FooterBottom.jsx
│  │  │  │  ├─ FooterContact.jsx
│  │  │  │  ├─ FooterFeatures.jsx
│  │  │  │  ├─ FooterLinks.jsx
│  │  │  │  ├─ FooterMain.jsx
│  │  │  │  ├─ FooterNewsletter.jsx
│  │  │  │  ├─ index.jsx
│  │  │  │  └─ style.css
│  │  │  ├─ Header
│  │  │  │  ├─ Header.jsx
│  │  │  │  ├─ HeaderActions.jsx
│  │  │  │  ├─ HeaderMain.jsx
│  │  │  │  ├─ HeaderTop.jsx
│  │  │  │  ├─ Index.jsx
│  │  │  │  ├─ Navigation
│  │  │  │  │  ├─ CategoryPanel.jsx
│  │  │  │  │  ├─ index.jsx
│  │  │  │  │  └─ styles.css
│  │  │  │  └─ UserMenu.jsx
│  │  │  ├─ HomeCatSlider
│  │  │  │  ├─ index.jsx
│  │  │  │  └─ style.css
│  │  │  ├─ HomeSlider
│  │  │  │  ├─ index.jsx
│  │  │  │  └─ styles.css
│  │  │  ├─ HomeSliderV2
│  │  │  │  ├─ index.jsx
│  │  │  │  └─ style.css
│  │  │  ├─ Modal
│  │  │  │  └─ index.jsx
│  │  │  ├─ OtpBox
│  │  │  │  └─ index.jsx
│  │  │  ├─ ProductDetailsComponent
│  │  │  │  ├─ index.jsx
│  │  │  │  ├─ ProductActions.jsx
│  │  │  │  ├─ ProductDetails.jsx
│  │  │  │  ├─ ProductHeader.jsx
│  │  │  │  ├─ ProductOptions.jsx
│  │  │  │  └─ ProductPrice.jsx
│  │  │  ├─ ProductItem
│  │  │  │  ├─ index.jsx
│  │  │  │  ├─ ProductActionsHover.jsx
│  │  │  │  ├─ ProductImage.jsx
│  │  │  │  ├─ ProductInfo.jsx
│  │  │  │  ├─ ProductItem.jsx
│  │  │  │  └─ style.css
│  │  │  ├─ ProductItemListView
│  │  │  │  ├─ index.jsx
│  │  │  │  ├─ ProductItemListView.jsx
│  │  │  │  ├─ ProductListActions.jsx
│  │  │  │  ├─ ProductListImage.jsx
│  │  │  │  ├─ ProductListInfo.jsx
│  │  │  │  └─ style.css
│  │  │  ├─ ProductsSlider
│  │  │  │  └─ index.jsx
│  │  │  ├─ ProductZoom
│  │  │  │  ├─ index.jsx
│  │  │  │  └─ style.css
│  │  │  ├─ ProfileSidebar
│  │  │  │  └─ index.jsx
│  │  │  ├─ QtyBox
│  │  │  │  └─ index.jsx
│  │  │  ├─ Search
│  │  │  │  ├─ index.jsx
│  │  │  │  └─ style.css
│  │  │  ├─ Sidebar
│  │  │  │  ├─ CheckboxList.jsx
│  │  │  │  ├─ FilterSection.jsx
│  │  │  │  ├─ index.jsx
│  │  │  │  ├─ PriceFilter.jsx
│  │  │  │  ├─ RatingFilter.jsx
│  │  │  │  ├─ Sidebar.jsx
│  │  │  │  └─ style.css
│  │  │  ├─ StatusBadge
│  │  │  │  └─ index.jsx
│  │  │  └─ Toast
│  │  │     └─ index.jsx
│  │  ├─ Contexts
│  │  │  ├─ DrawerContext.js
│  │  │  ├─ ListContext.js
│  │  │  ├─ ModalContext.js
│  │  │  ├─ OrdersContext.js
│  │  │  ├─ ThemeContext.js
│  │  │  ├─ ToastContext.js
│  │  │  └─ UserContext.js
│  │  ├─ data
│  │  │  ├─ adsBanners.json
│  │  │  ├─ adsBannersV2.json
│  │  │  ├─ blogs.json
│  │  │  ├─ categoriesData.json
│  │  │  ├─ menuData.json
│  │  │  ├─ oldOrders.json
│  │  │  ├─ orders.json
│  │  │  ├─ products.json
│  │  │  ├─ sliderData.json
│  │  │  └─ slides.json
│  │  ├─ hooks
│  │  │  └─ useProducts.js
│  │  ├─ index.css
│  │  ├─ main.jsx
│  │  ├─ Pages
│  │  │  ├─ Blog
│  │  │  │  └─ index.jsx
│  │  │  ├─ Cart
│  │  │  │  ├─ CartItem.jsx
│  │  │  │  ├─ CartTotals.jsx
│  │  │  │  ├─ ColorMenu.jsx
│  │  │  │  ├─ index.jsx
│  │  │  │  ├─ SizeMenu.jsx
│  │  │  │  └─ StyledMenu.jsx
│  │  │  ├─ Checkout
│  │  │  │  ├─ BillingForm.jsx
│  │  │  │  ├─ index.jsx
│  │  │  │  └─ OrderSummary.jsx
│  │  │  ├─ ClientLogin
│  │  │  │  └─ index.jsx
│  │  │  ├─ ClientSignup
│  │  │  │  └─ index.jsx
│  │  │  ├─ ForgotPassword
│  │  │  │  └─ index.jsx
│  │  │  ├─ Home
│  │  │  │  ├─ index.jsx
│  │  │  │  └─ style.css
│  │  │  ├─ List
│  │  │  │  ├─ index.jsx
│  │  │  │  ├─ ProductRow.jsx
│  │  │  │  └─ StyledMenu.jsx
│  │  │  ├─ NotFound
│  │  │  │  └─ index.jsx
│  │  │  ├─ Orders
│  │  │  │  ├─ index.jsx
│  │  │  │  ├─ OrderRow.jsx
│  │  │  │  └─ ProductRow.jsx
│  │  │  ├─ ProductDetails
│  │  │  │  ├─ index.jsx
│  │  │  │  ├─ RelatedProducts.jsx
│  │  │  │  ├─ style.css
│  │  │  │  └─ Tabs
│  │  │  │     ├─ DescriptionTab.jsx
│  │  │  │     ├─ DetailsTab.jsx
│  │  │  │     └─ ReviewsTab.jsx
│  │  │  ├─ ProductListing
│  │  │  │  ├─ index.jsx
│  │  │  │  ├─ ProductGrid.jsx
│  │  │  │  ├─ ProductList.jsx
│  │  │  │  ├─ SortMenu.jsx
│  │  │  │  └─ ViewToggle.jsx
│  │  │  ├─ Profile
│  │  │  │  └─ index.jsx
│  │  │  ├─ Store
│  │  │  │  └─ index.jsx
│  │  │  └─ Verify
│  │  │     └─ index.jsx
│  │  ├─ Providers
│  │  │  ├─ DrawerProvider.jsx
│  │  │  ├─ ListProvider.jsx
│  │  │  ├─ ModalProvider.jsx
│  │  │  ├─ OrdersProvider.jsx
│  │  │  ├─ ThemeProvider.jsx
│  │  │  ├─ ToastProvider.jsx
│  │  │  └─ UserProvider.jsx
│  │  └─ utils
│  │     ├─ clientAuthApi.js
│  │     └─ toastUtils.js
│  ├─ tailwind.config.js
│  └─ vite.config.js
└─ server
   ├─ .env
   ├─ app.js
   ├─ config
   │  ├─ db.js
   │  └─ smtp.js
   ├─ controllers
   │  ├─ clientAuthController.js
   │  └─ product.controller.js
   ├─ index.js
   ├─ middlewares
   │  ├─ clientAuthMiddleware.js
   │  ├─ errorMiddleware.js
   │  └─ uploadMiddleware.js
   ├─ models
   │  ├─ clientModel.js
   │  └─ Product.js
   ├─ package-lock.json
   ├─ package.json
   ├─ routes
   │  ├─ auth.js
   │  ├─ clientAuthRoutes.js
   │  └─ product.routes.js
   └─ utils
      ├─ clientTokenUtils.js
      └─ otp.js

```