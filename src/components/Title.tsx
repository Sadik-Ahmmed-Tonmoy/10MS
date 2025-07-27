/* eslint-disable @typescript-eslint/no-explicit-any */

interface TitleProps {
  title: string | { name?: string; value?: string } | any;
  description: string | { name?: string; value?: string } | any;
}

const renderText = (text: any): string => {
  if (typeof text === "string") {
    return text;
  }
  if (typeof text === "object" && text !== null) {
    if (text.name) return text.name;
    if (text.value) return text.value;
    if (text.title) return text.title;
    return JSON.stringify(text);
  }
  return String(text || "");
};

// Server Component - Rendered on the server
export default function Title({ title, description }: TitleProps) {
  const descriptionText = renderText(description);
  return (
    <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl shadow-2xl p-6 sm:p-8 text-white relative overflow-hidden animate-fade-in">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute -top-4 -right-4 w-24 h-24 bg-white rounded-full"></div>
        <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-white rounded-full"></div>
      </div>

      <div className="relative z-10">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight">{renderText(title)}</h1>

        {/* <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-blue-100">
          <div className="flex items-center space-x-2">
            <Star className="w-4 h-4 sm:w-5 sm:h-5 fill-yellow-400 text-yellow-400" />
            <span className="text-sm sm:text-base font-medium">4.9/5 Rating</span>
          </div>
          <div className="flex items-center space-x-2">
            <Users className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="text-sm sm:text-base font-medium">32,995+ Students</span>
          </div>
          <div className="flex items-center space-x-2">
            <Clock className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="text-sm sm:text-base font-medium">50+ Hours Content</span>
          </div>
        </div> */}
        <div className="prose prose-gray prose-sm sm:prose-base max-w-none leading-relaxed" dangerouslySetInnerHTML={{ __html: descriptionText }} />
      </div>
    </div>
  );
}
