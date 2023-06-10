import { Navbar, ConfigProvider } from "@taroify/core";
import { NavbarProps } from "@taroify/core/navbar/navbar";
import { ScrollView, View } from "@tarojs/components";
import { ReactNode } from "react";

interface INavProps extends NavbarProps {
  children: ReactNode;
}
const Index: React.FC<INavProps> = ({ title, children }) => {
  return (
    <View>
      <ConfigProvider
        theme={{
          navbarHeight: "60px"
          // navbarBackgroundColor: "#000",
          // navbarTitleColor: "#fff"
        }}
      >
        <Navbar
          title={title}
          fixed
          bordered
          placeholder
          safeArea="top"
        ></Navbar>
      </ConfigProvider>
      <ScrollView>{children}</ScrollView>
    </View>
  );
};

export default Index;
