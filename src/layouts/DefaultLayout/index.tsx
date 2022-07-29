import { Outlet } from "react-router-dom";
import { LayoutContainer } from "./styled";

const DefaultLayout = () => {
  return (
    <LayoutContainer>
      <Outlet />
    </LayoutContainer>
  );
};

export default DefaultLayout;
