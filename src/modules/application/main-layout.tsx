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
  children
}) => {
  return (
    <div>
      <Header title={headerTitle} />
      <main>{children}</main>
      {actions && (
        <SoftwareKeys
          leftKey={"Left key"}
          centerKey={"Select"}
          rightKey="Right key"
        />
      )}

      <style jsx>{`
        div {
          height: 100vh;
          overflow: hidden;
          display: flex;
          flex-direction: column;
        }

        main {
          flex-grow: 1;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};
