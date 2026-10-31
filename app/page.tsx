import ScrollStory from "@/components/ScrollStory";
import Menu from "@/components/Menu";
import Info from "@/components/Info";
import CartSheet from "@/components/CartSheet";
import { CartProvider } from "@/components/CartProvider";

export default function Home() {
  return (
    <CartProvider>
      <ScrollStory />
      <div className="relative z-10 bg-[#12332a]">
        <Menu />
      </div>
      <Info />
      <CartSheet />
    </CartProvider>
  );
}