import { useEffect, useState } from "react";

import { ActivityIndicator, FlatList, Text, View } from "react-native";

import { ProductCard } from "@/components/product-card";
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
        return (
            <View className="flex-1 items-center justify-center">
                <ActivityIndicator />
            </View>
        )
    }

    if (error) {
        return (
            <View className="flex-1 items-center justify-center">
                <Text>Error: {error}</Text>
            </View>
        )
    }

    return (
        <View className="flex-1">
            <FlatList
                data={products}
                keyExtractor={ item => item.id.toString() }
                renderItem={({ item }) => (
                    <ProductCard product={item} />
                )}
                contentContainerClassName="p-4 gap-3"
            />
        </View>
    )
}