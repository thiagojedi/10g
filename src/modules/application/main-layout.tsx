import { FunctionComponent, h } from "preact";
import { Header } from "../../lib/components/header";
import { SoftwareKeys } from "../../lib/components/software-keys";

interface MainLayoutProps {
  headerTitle: string;
  actions?: boolean;
}

export const MainLayout: FunctionComponent<MainLayoutProps> = ({
  headerTitle,
  actions = false,
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
          leftKey={"Left key"}
          centerKey={"Select"}
          rightKey="Right key"
          onLeftKey={() => console.log("Left!")}
          onRightKey={() => console.log("Right!")}
        />
      )}
    </div>
  );
};
