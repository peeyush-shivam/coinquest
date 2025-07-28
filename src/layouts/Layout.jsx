import { Outlet } from "react-router-dom";
import { Layout } from "antd";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "../components/Header";

const { Content } = Layout;

export default function MainLayout() {
  return (
    <Layout style={{ background: "#f5f5f5", minHeight: "100vh" }}>
      <Layout.Header
        style={{
          background: "#fff",
          padding: 0,
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          height: "64px",
        }}
      >
        <Header />
      </Layout.Header>
      <Layout.Content style={{ marginTop: "64px" }}>
        <div
          style={{
            width: "100%",
            maxWidth: "1200px",
            margin: "auto",
            // height: "85vh",
            // paddingTop: "16px",
          }}
        >
          <Outlet />
        </div>
      </Layout.Content>

      {/* Toast Container */}
      <ToastContainer
        position="top-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        style={{ zIndex: 9999 }}
      />
    </Layout>
  );
}
