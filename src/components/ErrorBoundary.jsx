import React from "react";
import { Result, Button } from "antd";
import { ReloadOutlined, HomeOutlined } from "@ant-design/icons";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log error to console for debugging
    console.error("Error caught by boundary:", error, errorInfo);

    // Update state with error details
    this.setState({
      error: error,
      errorInfo: errorInfo,
    });

    // In a real app, you might want to log this to an error reporting service
    // logErrorToService(error, errorInfo);
  }

  handleReload = () => {
    window.location.reload();
  };

  handleGoHome = () => {
    window.location.href = "/";
  };

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#f5f5f5",
          }}
        >
          <Result
            status="error"
            title="Something went wrong"
            subTitle="We're sorry, but something unexpected happened. Please try refreshing the page or go back to the home page."
            extra={[
              <Button
                type="primary"
                icon={<ReloadOutlined />}
                onClick={this.handleReload}
                key="reload"
                style={{ marginRight: 8 }}
              >
                Reload Page
              </Button>,
              <Button
                icon={<HomeOutlined />}
                onClick={this.handleGoHome}
                key="home"
              >
                Go Home
              </Button>,
            ]}
          />
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
