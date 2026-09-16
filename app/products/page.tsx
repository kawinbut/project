<<<<<<< HEAD
import { connectDB } from "@/lib/mongodb";
import Product from "@/models/Product";
import ProductCard from "@/components/ProductCard";
import Category from "@/models/Category";

export const dynamic = "force-dynamic";

export default async function ProductsPage() {
  await connectDB();

  const products = await Product.find({
    published: true,
  })
    .populate("category", "name slug")
    .sort({ createdAt: -1 })
    .lean();

  const serializedProducts = products.map((product) => ({
    _id: product._id.toString(),
    name: product.name,
    description: product.description,
    price: product.price,
    stock: product.stock,
    imageUrl: product.imageUrl,
    category:
      product.category &&
      typeof product.category === "object" &&
      "name" in product.category
        ? {
            _id:
              "_id" in product.category && product.category._id
                ? product.category._id.toString()
                : "",
            name: String(product.category.name),
          }
        : undefined,
  }));

  return (
    <main className="mx-auto max-w-7xl p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">
          สินค้าทั้งหมด
        </h1>

        <p className="mt-2 text-gray-600">
          เลือกสินค้าที่คุณสนใจ
        </p>
      </div>

      {serializedProducts.length === 0 ? (
        <div className="rounded-xl border p-10 text-center">
          ยังไม่มีสินค้า
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {serializedProducts.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
            />
          ))}
        </div>
      )}
    </main>
  );
=======
import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Product from "@/models/Product";
import Category from "@/models/Category";

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const searchParams = request.nextUrl.searchParams;

    const category = searchParams.get("category");
    const search = searchParams.get("search");
    const includeUnpublished =
      searchParams.get("includeUnpublished") === "true";

    const filter: Record<string, unknown> = {};

    if (!includeUnpublished) {
      filter.published = true;
    }

    if (category) {
      filter.category = category;
    }

    if (search) {
      filter.$or = [
        {
          name: {
            $regex: search,
            $options: "i",
          },
        },
        {
          description: {
            $regex: search,
            $options: "i",
          },
        },
      ];
    }

    const products = await Product.find(filter)
      .populate("category", "name slug")
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json({
      products,
    });
  } catch (error) {
    console.error("GET products error:", error);

    return NextResponse.json(
      { message: "ไม่สามารถโหลดสินค้าได้" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    await connectDB();

    const body = await request.json();

    const {
      name,
      slug,
      description,
      price,
      stock,
      category,
      imageUrl,
      imagePublicId,
      published,
    } = body;

    if (
      !name ||
      !slug ||
      !description ||
      price === undefined ||
      stock === undefined ||
      !category ||
      !imageUrl ||
      !imagePublicId
    ) {
      return NextResponse.json(
        { message: "กรุณากรอกข้อมูลสินค้าให้ครบ" },
        { status: 400 }
      );
    }

    const existingProduct = await Product.findOne({
      slug: String(slug).trim().toLowerCase(),
    });

    if (existingProduct) {
      return NextResponse.json(
        { message: "slug สินค้านี้มีอยู่แล้ว" },
        { status: 409 }
      );
    }

    const categoryExists = await Category.exists({
      _id: category,
    });

    if (!categoryExists) {
      return NextResponse.json(
        { message: "ไม่พบหมวดหมู่ที่เลือก" },
        { status: 400 }
      );
    }

    const product = await Product.create({
      name: String(name).trim(),
      slug: String(slug).trim().toLowerCase(),
      description: String(description).trim(),
      price: Number(price),
      stock: Number(stock),
      category,
      imageUrl,
      imagePublicId,
      published: published ?? true,
    });

    const populatedProduct = await Product.findById(product._id)
      .populate("category", "name slug")
      .lean();

    return NextResponse.json(
      {
        message: "เพิ่มสินค้าสำเร็จ",
        product: populatedProduct,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST product error:", error);

    return NextResponse.json(
      { message: "ไม่สามารถเพิ่มสินค้าได้" },
      { status: 500 }
    );
  }
>>>>>>> a7241388b495671ff166cda30d0bb823fba17ad3
}