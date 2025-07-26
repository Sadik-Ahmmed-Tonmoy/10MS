import MyLoading from "@/components/MyLoading";
import Footer from "@/components/shared/Footer/Footer";
import NavBar from "@/components/shared/NavBar/NavBar";

interface LayoutProps {
  children: React.ReactNode;
}
const layout = ({ children }: LayoutProps) => {
  return (
    <div className=" min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <MyLoading />
      <NavBar  />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default layout;
