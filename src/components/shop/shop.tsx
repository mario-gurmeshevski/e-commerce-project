import { useEffect, useState } from "react";
import axios from "axios";
import { Honey } from "../../interfaces/honey";
import ShopItem from "./shopItem";
import Loader from "../common/Loader.tsx";

const Shop = () => {
  const [items, setItems] = useState<Honey[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get<Honey[]>("/api/honey", {
          signal: controller.signal,
        });
        setItems(data);
      } catch (error) {
        if (!axios.isCancel(error)) {
          console.error("Error fetching products:", error);
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchProducts().catch((error) => {
      if (!axios.isCancel(error)) {
        console.error("Fetch error:", error);
      }
    });
    return () => {
      controller.abort();
    };
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <main className="container mx-auto px-4 py-8 md:py-12">
      <h1 className="text-3xl md:text-4xl font-bold mb-8 text-gray-800">
        Продавница
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 px-2">
        {items.map((item) => (
          <ShopItem key={item.id} item={item} />
        ))}
      </div>
    </main>
  );
};

export default Shop;
