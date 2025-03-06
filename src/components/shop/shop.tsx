import { useEffect, useState } from "react";
import axios from "axios";
import { Honey } from "../../interfaces/honey";
import ShopItem from "./shopItem";

const Shop = () => {
    const [items, setItems] = useState<Honey[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const { data } = await axios.get<Honey[]>("/api/honey");
                setItems(data);
            } catch (error) {
                console.error("Error fetching products:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[50vh]">
                <div className="text-center">Loading products...</div>
            </div>
        );
    }

    return (
        <main className="container mx-auto px-4 py-8 md:py-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-8 text-gray-800">
                Продавница
            </h1>

            <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-2">
                {items.map((item) => (
                    <ShopItem key={item.id} item={item} />
                ))}
            </div>
        </main>
    );
};

export default Shop;
