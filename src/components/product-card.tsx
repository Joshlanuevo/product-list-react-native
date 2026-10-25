import { Product } from "@/types/product";
import { Image, Text, View } from "react-native";


export function ProductCard({ product }: { product: Product }) {

    return (
        <View className="rounded-xl bg-white p-4 shadow-md">
            <Image
                source={{ uri: product.thumbnail }}
                className="h-40 w-full rounded-lg"
                resizeMode="cover"
            />
            <Text className="mt-2 text-lg font-bold">
                {product.title}
            </Text>

            <Text className="mt-1 text-sm text-gray-500">
                {product.description}
            </Text>

            <Text className="mt-2 text-lg font-bold text-pink-600">
                ${product.price}
            </Text>
        </View>
    )
}