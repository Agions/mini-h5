import { Navbar } from "@taroify/core";
import { NavbarProps } from "@taroify/core/navbar/navbar";
import { ScrollView, View } from "@tarojs/components";
import { ReactNode } from "react";

interface INavProps extends NavbarProps {
  children: ReactNode;
}
const Index: React.FC<INavProps> = ({ title, children }) => {
  return (
    <View>
      <Navbar title={title} bordered placeholder></Navbar>
      <ScrollView>{children}</ScrollView>
    </View>
  );
};

export default Index;
