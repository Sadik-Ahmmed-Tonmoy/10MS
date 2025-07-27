'use client';
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
import { ProductData } from "@/types/product";

const Product = ({productData}:  {productData: ProductData}) => {

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
  );
};

export default Product;
