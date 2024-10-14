import prismaDB from '@/lib/prismaClient';
import { NextResponse } from 'next/server';

export async function PATCH(req: Request, { params }: { params: { storeCode: string; productCode: string } }) {
  try {
    if (!params.productCode) {
      return new NextResponse('Product code is required', { status: 400 });
    }

    const body = await req.json();
    const { name, price, brand, description, images, colorCode, sizeCode, categoryCode, isFeatured, isArchived } = body;

    // Ensure required fields are provided
    if (!name || !price || !colorCode || !sizeCode || !categoryCode || !images) {
      return new NextResponse('No fields provided for update', { status: 400 });
    }

    // Step 1: Fetch the current product and its images
    const existingProduct = await prismaDB.product.findUnique({
      where: {
        id: params.productCode,
        storeCode: params.storeCode,
      },
      include: { images: true },
    });

    if (!existingProduct) {
      return new NextResponse('Product not found', { status: 404 });
    }

    const existingImageUrls = existingProduct.images.map((img) => img.url);
    const newImageUrls = images.map((image: { url: string }) => image.url);

    // Step 2: Determine images to delete (those present in DB but not in the new update)
    const imagesToDelete = existingImageUrls.filter((url) => !newImageUrls.includes(url));

    // Step 3: Delete the removed images
    if (imagesToDelete.length > 0) {
      await prismaDB.image.deleteMany({
        where: {
          productCode: existingProduct.id,
          url: { in: imagesToDelete },
        },
      });
    }

    // Step 4: Add new images that don't already exist
    const imagesToAdd = newImageUrls.filter((url) => !existingImageUrls.includes(url));

    // Only create new images if there are any to add
    if (imagesToAdd.length > 0) {
      await prismaDB.image.createMany({
        data: imagesToAdd.map((url) => ({ url, productCode: existingProduct.id })),
      });
    }

    const updatedProduct = await prismaDB.product.update({
      where: {
        id: params.productCode,
        storeCode: params.storeCode,
      },
      data: {
        name,
        price,
        brand,
        description,
        colorCode,
        sizeCode,
        categoryCode,
        isFeatured,
        isArchived,
        updatedAt: new Date(),
      },
      include: { images: true },
    });

    return NextResponse.json(updatedProduct);
  } catch (error) {
    console.log('PRODUCT_PATCH', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
