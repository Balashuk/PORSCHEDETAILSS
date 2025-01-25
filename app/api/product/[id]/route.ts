import { getCurrentUser } from "@/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from "@/libs/prismadb"; // Не забудьте подключить prisma

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return NextResponse.error(); // Возвращаем ошибку, если пользователь не авторизован
    }

    if (currentUser.role !== "ADMIN") {
        return NextResponse.error(); // Возвращаем ошибку, если пользователь не имеет роли ADMIN
    }

    try {
        const product = await prisma.product.delete({
            where: { id: params.id },
        });

        return NextResponse.json(product); // Возвращаем данные удаленного продукта
    } catch (error) {
        console.error("Error deleting product:", error);
        return NextResponse.error(); // Возвращаем ошибку, если не удалось удалить продукт
    }
}
