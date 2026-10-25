import { useEffect, useState } from "react";

import { Text, View } from "react-native";

import type { Product } from "@/types/product";

export default function HomeScreen() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const getProducts = async () => {
            try {
                const response = await fetch("https://dummyjson.com/products");

                if (!response.ok) {
                    throw new Error("Failed to fetch products");
                }

                const data = await response.json();
                setProducts(data.products);
            } catch(error) {
                setError(
                    error instanceof Error ? error.message : "Something went wrong"
                );
            } finally {
                setLoading(false);
            }
        }

        getProducts();
    }, []);

    if (loading) {
        return <Text>Loading products...</Text>
    }

    if (error) {
        return <Text>Error: {error}</Text>;
    }

    return (
        <View>
            <Text>Products: {products.length}</Text>
        </View>
    )
}