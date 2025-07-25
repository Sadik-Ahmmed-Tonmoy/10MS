/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Layout from "@/components/Layout";
import Title from "@/components/Title";
import Description from "@/components/Description";
import MediaGallery from "@/components/MediaGallery";
import Instructors from "@/components/Instructors";
import Checklist from "@/components/Checklist";
import CourseFeatures from "@/components/CourseFeatures";
import Pointers from "@/components/Pointers";
import ExclusiveFeature from "@/components/ExclusiveFeature";
import CourseDetails from "@/components/CourseDetails";
import CTA from "@/components/CTA";
import Testimonials from "@/components/Testimonials"; // New import
import FAQ from "@/components/FAQ"; // New import
import CountdownTimer from "@/components/CountdownTimer"; // New import
import LeadMagnetCard from "@/components/LeadMagnetCard"; // New import
import { fetchProductData } from "@/lib/api";
import { cn } from "@/lib/utils";

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
    const productData = response.data;

    // Extract SEO data
    const seoTitle = productData.seo?.title || productData.title || "IELTS Course";
    const seoDescription =
      productData.seo?.description ||
      (productData.description ? productData.description.replace(/<[^>]*>/g, "").substring(0, 160) : "Complete IELTS preparation course");

    return {
      title: seoTitle,
      description: seoDescription,
      keywords: "IELTS, English, Course, Preparation, Online Learning, 10 Minute School",
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
        url: `https://10minuteschool.com/${locale}/product`,
        siteName: "10 Minute School",
        images: [
          {
            url: productData.media?.find((m) => m.resource_type === "image")?.resource_value || "/placeholder.svg",
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
        images: [productData.media?.find((m) => m.resource_type === "image")?.resource_value || "/placeholder.svg"],
      },
      alternates: {
        canonical: `https://10minuteschool.com/${locale}/product`,
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
    const offers = productData.sections?.filter((section) => section.type === "offers") || []; // New filter
    const groupJoinEngagement = productData.sections?.filter((section) => section.type === "group_join_engagement") || []; // New filter
    const testimonials = productData.sections?.filter((section) => section.type === "testimonials") || []; // New filter
    const faq = productData.sections?.filter((section) => section.type === "faq") || []; // New filter

    // Filter media for gallery
    const galleryMedia =
      productData.media?.filter((item) => item.name === "preview_gallery" || item.name === "thumbnail" || item.name === "sqr_img") || [];

    return (
      <Layout locale={locale}>
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
              {/* Left Column */}
              <div className="lg:col-span-2 space-y-6 sm:space-y-8">
                <Title title={productData.title} />
                <RightSide galleryMedia={galleryMedia} productData={productData} className="block lg:hidden" />
                {productData.description && <Description description={productData.description} />}
                {offers.length > 0 && <CountdownTimer offers={offers} />} 
                {instructors.length > 0 && <Instructors instructors={instructors} />}
                {features.length > 0 && <CourseFeatures features={features} />}
                {pointers.length > 0 && <Pointers pointers={pointers} />}
                {groupJoinEngagement.length > 0 && <LeadMagnetCard engagement={groupJoinEngagement} />} 
                {exclusiveFeature.length > 0 && <ExclusiveFeature instructors={exclusiveFeature} />}
                {aboutSections.length > 0 && <CourseDetails aboutSections={aboutSections} />}
                {testimonials.length > 0 && <Testimonials testimonials={testimonials} />} 
                {faq.length > 0 && <FAQ faqs={faq} />} 
              </div>

              {/* Right Column */}
              <RightSide galleryMedia={galleryMedia} productData={productData} className="hidden lg:block" />
            </div>
          </div>
        </div>
      </Layout>
    );
  } catch {
    return (
      <Layout locale={locale}>
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
          <div className="text-center p-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Error Loading Course</h1>
            <p className="text-gray-600">Please try again later.</p>
          </div>
        </div>
      </Layout>
    );
  }
}

const RightSide = ({ className, galleryMedia, productData }: any) => {
  return (
    <div className={cn("space-y-6", className)}>
      {galleryMedia.length > 0 && <MediaGallery media={galleryMedia} />}

      <CTA ctaText={productData.cta_text} price={1000} />

      {productData.checklist && productData.checklist.length > 0 && <Checklist items={productData.checklist} />}
    </div>
  );
};

export async function generateStaticParams() {
  return [{ locale: "en" }, { locale: "bn" }];
}
