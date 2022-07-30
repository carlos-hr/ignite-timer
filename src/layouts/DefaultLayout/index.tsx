import { Outlet } from "react-router-dom";
import { Header } from "../../components";
import { LayoutContainer } from "./styled";

const DefaultLayout = () => {
  return (
    <LayoutContainer>
      <Header />
      <Outlet />
    </LayoutContainer>
  );
};

export default DefaultLayout;
