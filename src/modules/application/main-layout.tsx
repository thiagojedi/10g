import { FunctionComponent, h } from "preact";
import { Header } from "../../lib/components/header";
import { SoftwareKeys } from "../../lib/components/software-keys";

interface ActionProp {
  label: string;
  action: () => void;
}

interface MainLayoutProps {
  headerTitle: string;
  actions?: {
    right?: ActionProp;
    left?: ActionProp;
    center?: ActionProp;
  };
}

export const MainLayout: FunctionComponent<MainLayoutProps> = ({
  headerTitle,
  actions = null,
  children,
}) => {
  return (
    <div
      style={{
        height: "100vh",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Header title={headerTitle} />
      <main>{children}</main>
      {actions && (
        <SoftwareKeys
          centerKey={actions.center?.label}
          leftKey={actions.left?.label}
          onLeftKey={actions.left?.action}
          rightKey={actions.right?.label}
          onRightKey={actions.right?.action}
        />
      )}
    </div>
  );
};
