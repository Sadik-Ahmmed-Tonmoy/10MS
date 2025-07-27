/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { cn } from "@/lib/utils";
import MediaGallery from "./MediaGallery";
import CTA from "./CTA";
import Checklist from "./Checklist";

const RightSide = ({ className, galleryMedia, productData }: any) => {
    return (
       <div className={cn("space-y-6", className)}>
           {galleryMedia.length > 0 && <MediaGallery media={galleryMedia} />}
     
           <CTA ctaText={productData.cta_text} price={1000} />
     
           {productData.checklist && productData.checklist.length > 0 && <Checklist items={productData.checklist} />}
         </div>
    );
};

export default RightSide;