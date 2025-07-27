import Product from "@/components/pages/product/product";
import { fetchProductData } from "@/lib/api";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const { locale } = resolvedParams;

  if (!["en", "bn"].includes(locale)) {
    return {
      title: "Product Not Found",
      description: "The requested product could not be found.",
    };
  }

  try {
    const response = await fetchProductData(locale);
    const productData = response?.data;
    const seoTitle = productData.seo?.title || productData.title || "IELTS Course";
    const seoDescription =
      productData.seo?.description ||
      (productData.description ? productData.description.replace(/<[^>]*>/g, "").substring(0, 160) : "Complete IELTS preparation course");

    const seoKeywords = Array.isArray(productData.seo?.keywords)
      ? productData.seo.keywords
      : ["IELTS", "English", "Course", "Preparation", "Online Learning", "10 Minute School"];

    const imageUrl = productData.media?.find((m) => m.resource_type === "image")?.resource_value || "/placeholder.svg";

    const productSlug = productData.slug || "ielts-course";

    return {
      title: seoTitle,
      description: seoDescription,
      keywords: seoKeywords,
      authors: [{ name: "10 Minute School" }],
      creator: "10 Minute School",
      publisher: "10 Minute School",
      robots: {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          "max-video-preview": -1,
          "max-image-preview": "large",
          "max-snippet": -1,
        },
      },
      openGraph: {
        title: seoTitle,
        description: seoDescription,
        url: `https://10minuteschool.com/${locale}/product/${productSlug}`,
        siteName: "10 Minute School",
        images: [
          {
            url: imageUrl,
            width: 1200,
            height: 630,
            alt: seoTitle,
          },
        ],
        locale: locale === "bn" ? "bn_BD" : "en_US",
        type: "website",
      },
      twitter: {
        card: "summary_large_image",
        title: seoTitle,
        description: seoDescription,
        images: [imageUrl],
        site: "@10minuteschool", // Add your actual handle if you have one
      },
      alternates: {
        canonical: `https://10minuteschool.com/${locale}/product/${productSlug}`,
        languages: {
          en: "https://10minuteschool.com/en/product",
          bn: "https://10minuteschool.com/bn/product",
        },
      },
    };
  } catch {
    return {
      title: "IELTS Course - 10 Minute School",
      description: "Complete IELTS preparation course with expert instructors",
    };
  }
}

// Server Component - No client-side JavaScript needed for initial render
export default async function ProductPage({ params }: PageProps) {
  const resolvedParams = await params;
  const { locale } = resolvedParams;

  if (!["en", "bn"].includes(locale)) {
    notFound();
  }

  try {
    const response = await fetchProductData(locale);
    const productData = response.data;
 
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <Product productData={productData} />
        </div>
      </div>
    );
  } catch {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="text-center p-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Error Loading Course</h1>
          <p className="text-gray-600">Please try again later.</p>
        </div>
      </div>
    );
  }
}

// export async function generateStaticParams() {
//   return [{ locale: "en" }, { locale: "bn" }];
// }
