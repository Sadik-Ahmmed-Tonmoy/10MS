import CourseDetails from "@/components/CourseDetails";
import CourseFeatures from "@/components/CourseFeatures";
import ExclusiveFeature from "@/components/ExclusiveFeature";
import FAQ from "@/components/FAQ"; // New import
import Instructors from "@/components/Instructors";
import LeadMagnetCard from "@/components/LeadMagnetCard"; // New import
import Pointers from "@/components/Pointers";
import RightSide from "@/components/RightSide";
import Testimonials from "@/components/Testimonials"; // New import
import Title from "@/components/Title";
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
    console.log(productData);
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

    const instructors = productData.sections?.filter((section) => section.type === "instructors") || [];
    const features = productData.sections?.filter((section) => section.type === "features") || [];
    const pointers = productData.sections?.filter((section) => section.type === "pointers") || [];
    const exclusiveFeature = productData.sections?.filter((section) => section.type === "feature_explanations") || [];
    const aboutSections = productData.sections?.filter((section) => section.type === "about") || [];
    const groupJoinEngagement = productData.sections?.filter((section) => section.type === "group_join_engagement") || []; // New filter
    const testimonials = productData.sections?.filter((section) => section.type === "testimonials") || []; // New filter
    const faq = productData.sections?.filter((section) => section.type === "faq") || []; // New filter

    // Filter media for gallery
    const galleryMedia =
      productData.media?.filter((item) => item.name === "preview_gallery" || item.name === "thumbnail" || item.name === "sqr_img") || [];

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-6 sm:space-y-8">
              <Title title={productData.title} description={productData.description} />
              <RightSide galleryMedia={galleryMedia} productData={productData} className="block lg:hidden" />
              {/* {productData.description && <Description description={productData.description} />} */}
              {instructors.length > 0 && <Instructors instructors={instructors} />}
              {features.length > 0 && <CourseFeatures features={features} />}
              {pointers.length > 0 && <Pointers pointers={pointers} />}
              {exclusiveFeature.length > 0 && <ExclusiveFeature instructors={exclusiveFeature} />}
              {groupJoinEngagement.length > 0 && <LeadMagnetCard engagement={groupJoinEngagement} />}
              {aboutSections.length > 0 && <CourseDetails aboutSections={aboutSections} />}
              {testimonials.length > 0 && <Testimonials testimonials={testimonials} />}
              {faq.length > 0 && <FAQ faqs={faq} />}
            </div>

            {/* Right Column for pc */}
            <RightSide galleryMedia={galleryMedia} productData={productData} className="hidden lg:block" />
          </div>
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
