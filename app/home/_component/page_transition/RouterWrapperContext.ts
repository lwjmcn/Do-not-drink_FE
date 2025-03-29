import { createContext, Dispatch, SetStateAction, useContext } from "react";

interface RouterWrapperContextType {
  isBack: boolean;
  setIsBack: Dispatch<SetStateAction<boolean>>;
  transitionDisable: boolean;
  setTransitionDisable: Dispatch<SetStateAction<boolean>>;
  previousPage: React.ReactNode;
  setPreviousPage: Dispatch<SetStateAction<React.ReactNode>>;
}

const RouterWrapperContext = createContext<RouterWrapperContextType>({
  isBack: false,
  setIsBack: () => {},
  transitionDisable: false,
  setTransitionDisable: () => {},
  previousPage: undefined,
  setPreviousPage: () => {},
});
export default RouterWrapperContext;

export const useRouterWrapper = () => {
  const context = useContext(RouterWrapperContext);
  if (!context) {
    throw new Error(
      "useRouterWrapper must be used within a RouterWrapperProvider"
    );
  }
  return context;
};
