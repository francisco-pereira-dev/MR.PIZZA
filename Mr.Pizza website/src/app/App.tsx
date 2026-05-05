import { useState, useMemo } from "react";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { PizzaCard } from "./components/PizzaCard";
import { BeverageCard } from "./components/BeverageCard";
import { ExtraProductCard } from "./components/ExtraProductCard";
import { DessertCard } from "./components/DessertCard";
import { PizzaCustomizer } from "./components/PizzaCustomizer";
import { Cart } from "./components/Cart";
import { Checkout, CheckoutData } from "./components/Checkout";
import { OrderTracking, Order } from "./components/OrderTracking";
import { SearchBar } from "./components/SearchBar";
import { ScrollToTop } from "./components/ScrollToTop";
import { StickyCartButton } from "./components/StickyCartButton";
import { FavoritesDialog } from "./components/FavoritesDialog";
import { OrderHistory } from "./components/OrderHistory";
import { Newsletter } from "./components/Newsletter";
import { Footer } from "./components/Footer";
import { ContactPage } from "./components/ContactPage";
import { RecruitmentPage } from "./components/RecruitmentPage";
import { FranchisingPage } from "./components/FranchisingPage";
import { AboutPage } from "./components/AboutPage";
import { StoresDialog } from "./components/StoresDialog";
import { LoginPage, UserData } from "./components/LoginPage";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./components/ui/tabs";
import { Pizza, CartItem, SimpleCartItem, Beverage, ExtraProduct } from "./types";
import { pizzas } from "./data/pizzas";
import { beverages } from "./data/beverages";
import { extraProducts } from "./data/extraProducts";
import { desserts, Dessert } from "./data/desserts";
import { toast, Toaster } from "sonner";
import { UtensilsCrossed, Cake, Coffee, Pizza as PizzaIcon } from "lucide-react";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { useDebounce } from "./hooks/useDebounce";

type PageView = "home" | "contactos" | "recrutamento" | "franchising" | "universo" | "login";

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageView>("home");
  const [selectedPizza, setSelectedPizza] = useState<Pizza | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [simpleCartItems, setSimpleCartItems] = useState<SimpleCartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [currentOrder, setCurrentOrder] = useState<Order | null>(null);
  const [isOrderTrackingOpen, setIsOrderTrackingOpen] = useState(false);
  const [isFavoritesOpen, setIsFavoritesOpen] = useState(false);
  const [isOrderHistoryOpen, setIsOrderHistoryOpen] = useState(false);
  const [isStoresOpen, setIsStoresOpen] = useState(false);
  const [isLoginPageOpen, setIsLoginPageOpen] = useState(false);

  // Search state
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearch = useDebounce(searchQuery, 300);

  // Favorites with localStorage
  const [favorites, setFavorites] = useLocalStorage<string[]>("fire-pizza-favorites", []);

  // Order history with localStorage
  const [orderHistory, setOrderHistory] = useLocalStorage<Order[]>("fire-pizza-orders", []);

  const categories = ["Todas", ...Array.from(new Set(pizzas.map((p) => p.category)))];
  const [activeCategory, setActiveCategory] = useState("Todas");

  const beverageCategories = Array.from(new Set(beverages.map((b) => b.category)));
  const [activeBeverageCategory, setActiveBeverageCategory] = useState(beverageCategories[0]);

  const dessertCategories = Array.from(new Set(desserts.map((d) => d.category)));
  const [activeDessertCategory, setActiveDessertCategory] = useState("Todos");

  // Filtered pizzas with search
  const filteredPizzas = useMemo(() => {
    let result = activeCategory === "Todas" ? pizzas : pizzas.filter((p) => p.category === activeCategory);
    
    if (debouncedSearch) {
      const query = debouncedSearch.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query)
      );
    }
    
    return result;
  }, [activeCategory, debouncedSearch]);

  const filteredBeverages = useMemo(() => {
    let result = beverages.filter((b) => b.category === activeBeverageCategory);
    
    if (debouncedSearch) {
      const query = debouncedSearch.toLowerCase();
      result = result.filter((b) => b.name.toLowerCase().includes(query));
    }
    
    return result;
  }, [activeBeverageCategory, debouncedSearch]);

  const filteredDesserts = useMemo(() => {
    let result = activeDessertCategory === "Todos" ? desserts : desserts.filter((d) => d.category === activeDessertCategory);
    
    if (debouncedSearch) {
      const query = debouncedSearch.toLowerCase();
      result = result.filter((d) => d.name.toLowerCase().includes(query));
    }
    
    return result;
  }, [activeDessertCategory, debouncedSearch]);

  const starterProducts = extraProducts.filter((p) => p.category === "starter");

  // Toggle favorite
  const toggleFavorite = (pizza: Pizza) => {
    setFavorites((prev) => {
      const isFavorite = prev.includes(pizza.id);
      if (isFavorite) {
        toast.info(`${pizza.name} removida dos favoritos`);
        return prev.filter((id) => id !== pizza.id);
      } else {
        toast.success(`${pizza.name} adicionada aos favoritos!`, { icon: "❤️" });
        return [...prev, pizza.id];
      }
    });
  };

  const favoritePizzas = useMemo(() => pizzas.filter((p) => favorites.includes(p.id)), [favorites]);

  const handleAddToCart = (item: CartItem) => {
    setCartItems([...cartItems, item]);
    toast.success(`${item.pizza.name} adicionada ao carrinho!`, {
      icon: "🍕",
    });
  };

  const handleAddBeverage = (beverage: Beverage) => {
    const newItem: SimpleCartItem = {
      product: beverage,
      quantity: 1,
      price: beverage.price,
      type: "beverage",
    };
    setSimpleCartItems([...simpleCartItems, newItem]);
    toast.success(`${beverage.name} adicionado ao carrinho!`);
  };

  const handleAddExtra = (extra: ExtraProduct) => {
    const newItem: SimpleCartItem = {
      product: extra,
      quantity: 1,
      price: extra.price,
      type: "extra",
    };
    setSimpleCartItems([...simpleCartItems, newItem]);
    toast.success(`${extra.name} adicionado ao carrinho!`);
  };

  const handleAddDessert = (dessert: Dessert) => {
    const newItem: SimpleCartItem = {
      product: dessert as any,
      quantity: 1,
      price: dessert.price,
      type: "extra",
    };
    setSimpleCartItems([...simpleCartItems, newItem]);
    toast.success(`${dessert.name} adicionado ao carrinho!`, {
      icon: "🍰",
    });
  };

  const handleRemoveFromCart = (index: number) => {
    const item = cartItems[index];
    setCartItems(cartItems.filter((_, i) => i !== index));
    toast.info(`${item.pizza.name} removida do carrinho`);
  };

  const handleRemoveSimpleItem = (index: number) => {
    const item = simpleCartItems[index];
    setSimpleCartItems(simpleCartItems.filter((_, i) => i !== index));
    toast.info(`${item.product.name} removido do carrinho`);
  };

  // Update quantity handlers
  const handleUpdateItemQuantity = (index: number, newQuantity: number) => {
    setCartItems((prev) => {
      const updated = [...prev];
      const item = updated[index];
      const basePrice = item.price / item.quantity;
      updated[index] = { ...item, quantity: newQuantity, price: basePrice * newQuantity };
      return updated;
    });
  };

  const handleUpdateSimpleItemQuantity = (index: number, newQuantity: number) => {
    setSimpleCartItems((prev) => {
      const updated = [...prev];
      const item = updated[index];
      const basePrice = item.price / item.quantity;
      updated[index] = { ...item, quantity: newQuantity, price: basePrice * newQuantity };
      return updated;
    });
  };

  const handleCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleConfirmOrder = (data: CheckoutData) => {
    setIsCheckoutOpen(false);
    setCartItems([]);
    setSimpleCartItems([]);

    // Create order for tracking
    const order: Order = {
      id: Math.random().toString(36).substr(2, 9).toUpperCase(),
      status: "confirmed",
      estimatedTime: data.deliveryType === "takeaway" ? 25 : 35,
      createdAt: new Date(),
    };

    setCurrentOrder(order);
    setIsOrderTrackingOpen(true);

    // Add to order history
    setOrderHistory((prev) => [order, ...prev]);

    const deliveryText = data.deliveryType === "delivery" ? "entregue" : "pronto para levantamento";
    toast.success(`Pedido #${order.id} confirmado! Será ${deliveryText} em breve. 🍕`, {
      duration: 5000,
    });

    // Simulate order status updates - 3 seconds each step
    // Step 1: Confirmed -> Preparing (3 seconds)
    setTimeout(() => {
      setCurrentOrder((prev) => (prev ? { ...prev, status: "preparing" } : null));
      setOrderHistory((prev) =>
        prev.map((o) => (o.id === order.id ? { ...o, status: "preparing" } : o))
      );
    }, 3000);

    // Step 2: Preparing -> On the way (6 seconds total)
    setTimeout(() => {
      setCurrentOrder((prev) => (prev ? { ...prev, status: "on-the-way" } : null));
      setOrderHistory((prev) =>
        prev.map((o) => (o.id === order.id ? { ...o, status: "on-the-way" } : o))
      );
    }, 6000);

    // Step 3: On the way -> Delivered (9 seconds total)
    setTimeout(() => {
      setCurrentOrder((prev) => (prev ? { ...prev, status: "delivered" } : null));
      setOrderHistory((prev) =>
        prev.map((o) => (o.id === order.id ? { ...o, status: "delivered" } : o))
      );
    }, 9000);
  };

  const handleNavigate = (section: string) => {
    if (section === "menu") {
      setCurrentPage("home");
      setTimeout(() => {
        const menuSection = document.getElementById("menu");
        menuSection?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else if (section === "home") {
      setCurrentPage("home");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (section === "favorites") {
      setIsFavoritesOpen(true);
    } else if (section === "orders") {
      setIsOrderHistoryOpen(true);
    } else if (section === "contactos") {
      setCurrentPage("contactos");
      // Scroll to top immediately after page change
      setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 50);
    } else if (section === "recrutamento") {
      setCurrentPage("recrutamento");
      setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 50);
    } else if (section === "franchising") {
      setCurrentPage("franchising");
      // Scroll to top immediately after page change
      setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 50);
    } else if (section === "universo") {
      setCurrentPage("universo");
      // Scroll to top immediately after page change
      setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 50);
    } else if (section === "lojas") {
      setIsStoresOpen(true);
    } else if (section === "login") {
      setIsLoginPageOpen(true);
    }
  };

  const totalItems = cartItems.length + simpleCartItems.length;
  const subtotal = cartItems.reduce((sum, item) => sum + item.price, 0) + simpleCartItems.reduce((sum, item) => sum + item.price, 0);
  const deliveryFee = 2.5;

  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster 
        position="top-center" 
        richColors 
        toastOptions={{
          className: 'mt-16 md:mt-0',
        }}
      />

      <Header
        cartItemsCount={totalItems}
        onCartClick={() => setIsCartOpen(true)}
        favoritesCount={favorites.length}
        onFavoritesClick={() => setIsFavoritesOpen(true)}
        onNavigate={handleNavigate}
        onStoresClick={() => setIsStoresOpen(true)}
        onLoginClick={() => setIsLoginPageOpen(true)}
      />

      {currentPage === "home" && <Hero onStoresClick={() => setIsStoresOpen(true)} />}

      {currentPage === "home" ? (
        <>
          <main className="container mx-auto px-3 sm:px-4 py-8 sm:py-10 md:py-12">
            {/* Search Bar */}
            <div className="mb-8 sm:mb-10 md:mb-12">
              <SearchBar value={searchQuery} onChange={setSearchQuery} placeholder="Procurar pizzas, doces, bebidas..." />
            </div>

            {/* Pizzas Section */}
            <section id="menu" className="mb-12 md:mb-20">
              <div className="text-center mb-8 md:mb-12 px-4">
                <div className="inline-flex items-center gap-2 bg-red-700 text-white px-3 py-1.5 md:px-4 md:py-2 rounded-full mb-3 md:mb-4">
                  <PizzaIcon className="h-4 w-4 md:h-5 md:w-5" />
                  <span className="font-bold uppercase text-xs md:text-sm tracking-wider">Menu de Pizzas</span>
                </div>
                <h2 className="text-2xl md:text-4xl font-black mb-2 md:mb-3 text-gray-900">
                  AS NOSSAS <span className="text-red-700">PIZZAS</span>
                </h2>
                <p className="text-sm md:text-base text-gray-600 max-w-2xl mx-auto px-4">
                  Pizzas artesanais feitas com ingredientes frescos e massa fermentada naturalmente durante 48 horas
                </p>
              </div>

              <Tabs value={activeCategory} onValueChange={setActiveCategory} className="mb-6 md:mb-8">
                <div className="w-full flex justify-center mb-6 md:mb-8">
                  <div className="bg-gray-100 p-1 rounded-lg flex flex-wrap justify-center gap-1 max-w-full">
                    {categories.map((category) => (
                      <button
                        key={category}
                        onClick={() => setActiveCategory(category)}
                        className={`
                          ${activeCategory === category ? 'bg-red-700 text-white' : 'bg-white text-gray-900'}
                          font-bold uppercase text-xs md:text-sm whitespace-nowrap px-3 md:px-4 py-2.5 rounded-md
                          transition-colors hover:bg-red-700 hover:text-white
                          w-[calc(33.333%-0.25rem)]
                          sm:w-auto
                        `}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>
                {categories.map((category) => (
                  <TabsContent key={category} value={category} className="mt-6 md:mt-8">
                    {filteredPizzas.length === 0 ? (
                      <div className="text-center py-8 md:py-12 text-gray-500 text-sm md:text-base px-4">
                        <p>Nenhuma pizza encontrada com "{searchQuery}"</p>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                        {filteredPizzas.map((pizza) => (
                          <PizzaCard
                            key={pizza.id}
                            pizza={pizza}
                            onAddToCart={(p) => setSelectedPizza(p)}
                            isFavorite={favorites.includes(pizza.id)}
                            onToggleFavorite={toggleFavorite}
                          />
                        ))}
                      </div>
                    )}
                  </TabsContent>
                ))}
              </Tabs>
            </section>

            {/* Desserts Section */}
            <section className="mb-12 md:mb-20 bg-gradient-to-br from-yellow-50 to-orange-50 -mx-4 px-4 py-12 md:py-16 md:-mx-12 md:px-12 rounded-3xl">
              <div className="text-center mb-8 md:mb-12">
                <div className="inline-flex items-center gap-2 bg-yellow-600 text-white px-3 py-1.5 md:px-4 md:py-2 rounded-full mb-3 md:mb-4">
                  <Cake className="h-4 w-4 md:h-5 md:w-5" />
                  <span className="font-bold uppercase text-xs md:text-sm tracking-wider">Doces Nutella®</span>
                </div>
                <h2 className="text-2xl md:text-4xl font-black mb-2 md:mb-3 text-gray-900">
                  DOCES <span className="text-yellow-700">NUTELLA®</span>
                </h2>
                <p className="text-sm md:text-base text-gray-600 max-w-2xl mx-auto px-4">
                  Parceria exclusiva Mr.Pizza® x Grupo Ferrero®. Cremosidade e tradição italiana a cada mordida!
                </p>
              </div>

              {filteredDesserts.length === 0 ? (
                <div className="text-center py-8 md:py-12 text-gray-500 text-sm md:text-base">
                  <p>Nenhum doce encontrado com "{searchQuery}"</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 max-w-5xl mx-auto">
                  {filteredDesserts.map((dessert) => (
                    <DessertCard key={dessert.id} dessert={dessert} onAdd={handleAddDessert} />
                  ))}
                </div>
              )}
            </section>

            {/* Beverages Section */}
            <section className="mb-12 md:mb-20">
              <div className="text-center mb-8 md:mb-12 px-4">
                <div className="inline-flex items-center gap-2 bg-blue-600 text-white px-3 py-1.5 md:px-4 md:py-2 rounded-full mb-3 md:mb-4">
                  <Coffee className="h-4 w-4 md:h-5 md:w-5" />
                  <span className="font-bold uppercase text-xs md:text-sm tracking-wider">Bebidas</span>
                </div>
                <h2 className="text-2xl md:text-4xl font-black mb-2 md:mb-3 text-gray-900">
                  BEBIDAS <span className="text-blue-600">REFRESCANTES</span>
                </h2>
                <p className="text-sm md:text-base text-gray-600 max-w-2xl mx-auto px-4">Acompanhe a sua pizza com as nossas bebidas geladas</p>
              </div>

              <Tabs value={activeBeverageCategory} onValueChange={setActiveBeverageCategory} className="mb-6 md:mb-8">
                <TabsList className="w-full justify-center bg-gray-100 p-1 h-auto mb-6 md:mb-8 overflow-x-auto flex-nowrap">
                  {beverageCategories.map((category) => (
                    <TabsTrigger
                      key={category}
                      value={category}
                      className="data-[state=active]:bg-blue-600 data-[state=active]:text-white font-bold uppercase text-xs md:text-sm whitespace-nowrap px-3 md:px-4 py-2.5 h-auto rounded-md"
                    >
                      {category}
                    </TabsTrigger>
                  ))}
                </TabsList>
                {beverageCategories.map((category) => (
                  <TabsContent key={category} value={category}>
                    {filteredBeverages.length === 0 ? (
                      <div className="text-center py-8 md:py-12 text-gray-500 text-sm md:text-base px-4">
                        <p>Nenhuma bebida encontrada com "{searchQuery}"</p>
                      </div>
                    ) : (
                      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3 md:gap-4">
                        {filteredBeverages.map((beverage) => (
                          <BeverageCard key={beverage.id} beverage={beverage} onAdd={handleAddBeverage} />
                        ))}
                      </div>
                    )}
                  </TabsContent>
                ))}
              </Tabs>
            </section>


          </main>

          {/* Newsletter */}
          <Newsletter />

          {/* Footer */}
          <Footer onNavigate={handleNavigate} />

          {/* Scroll to Top Button */}
          <ScrollToTop />

          {/* Sticky Cart Button (Mobile) */}
          <StickyCartButton itemCount={totalItems} total={subtotal} onClick={() => setIsCartOpen(true)} />

          {/* Dialogs and Modals */}
          <PizzaCustomizer pizza={selectedPizza} open={!!selectedPizza} onClose={() => setSelectedPizza(null)} onAddToCart={handleAddToCart} />

          <Cart
            open={isCartOpen}
            onClose={() => setIsCartOpen(false)}
            items={cartItems}
            simpleItems={simpleCartItems}
            onRemoveItem={handleRemoveFromCart}
            onRemoveSimpleItem={handleRemoveSimpleItem}
            onUpdateItemQuantity={handleUpdateItemQuantity}
            onUpdateSimpleItemQuantity={handleUpdateSimpleItemQuantity}
            onCheckout={handleCheckout}
          />

          <Checkout open={isCheckoutOpen} onClose={() => setIsCheckoutOpen(false)} subtotal={subtotal} deliveryFee={deliveryFee} onConfirm={handleConfirmOrder} />

          <OrderTracking open={isOrderTrackingOpen} onClose={() => setIsOrderTrackingOpen(false)} order={currentOrder} />

          <FavoritesDialog
            open={isFavoritesOpen}
            onClose={() => setIsFavoritesOpen(false)}
            favorites={favoritePizzas}
            onRemoveFavorite={toggleFavorite}
            onAddToCart={(pizza) => setSelectedPizza(pizza)}
          />

          <OrderHistory
            open={isOrderHistoryOpen}
            onClose={() => setIsOrderHistoryOpen(false)}
            orders={orderHistory}
            onClearHistory={() => {
              setOrderHistory([]);
              toast.success("Histórico limpo com sucesso!");
            }}
          />

          <StoresDialog open={isStoresOpen} onClose={() => setIsStoresOpen(false)} />

          <LoginPage 
            open={isLoginPageOpen} 
            onClose={() => setIsLoginPageOpen(false)} 
            onLogin={(userData: UserData) => {
              toast.success(`Bem-vindo, ${userData.name}!`);
              setIsLoginPageOpen(false);
            }} 
            onNavigate={handleNavigate}
          />
        </>
      ) : (
        <>
          {currentPage === "contactos" && <ContactPage />}
          {currentPage === "recrutamento" && <RecruitmentPage />}
          {currentPage === "franchising" && <FranchisingPage />}
          {currentPage === "universo" && <AboutPage onNavigate={handleNavigate} />}
          
          {/* Footer for institutional pages */}
          <Footer onNavigate={handleNavigate} />
        </>
      )}

      {/* Global Modals - Available on all pages */}
      <Cart
        open={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        simpleItems={simpleCartItems}
        onRemoveItem={handleRemoveFromCart}
        onRemoveSimpleItem={handleRemoveSimpleItem}
        onUpdateItemQuantity={handleUpdateItemQuantity}
        onUpdateSimpleItemQuantity={handleUpdateSimpleItemQuantity}
        onCheckout={handleCheckout}
      />

      <Checkout open={isCheckoutOpen} onClose={() => setIsCheckoutOpen(false)} subtotal={subtotal} deliveryFee={deliveryFee} onConfirm={handleConfirmOrder} />

      <OrderTracking open={isOrderTrackingOpen} onClose={() => setIsOrderTrackingOpen(false)} order={currentOrder} />

      <FavoritesDialog
        open={isFavoritesOpen}
        onClose={() => setIsFavoritesOpen(false)}
        favorites={favoritePizzas}
        onRemoveFavorite={toggleFavorite}
        onAddToCart={(pizza) => setSelectedPizza(pizza)}
      />

      <OrderHistory
        open={isOrderHistoryOpen}
        onClose={() => setIsOrderHistoryOpen(false)}
        orders={orderHistory}
        onClearHistory={() => {
          setOrderHistory([]);
          toast.success("Histórico limpo com sucesso!");
        }}
      />

      <StoresDialog open={isStoresOpen} onClose={() => setIsStoresOpen(false)} />

      <LoginPage 
        open={isLoginPageOpen} 
        onClose={() => setIsLoginPageOpen(false)} 
        onLogin={(userData: UserData) => {
          toast.success(`Bem-vindo, ${userData.name}!`);
          setIsLoginPageOpen(false);
        }} 
        onNavigate={handleNavigate}
      />

      {/* Pizza Customizer - Global */}
      <PizzaCustomizer
        open={!!selectedPizza}
        pizza={selectedPizza}
        onClose={() => setSelectedPizza(null)}
        onAddToCart={handleAddToCart}
      />
    </div>
  );
}