import React from "react";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

const LoadingSpinner = ({
  size = "large",
  text = "Loading...",
  fullScreen = false,
  style = {},
}) => {
  const antIcon = (
    <LoadingOutlined style={{ fontSize: 24, color: "#667eea" }} spin />
  );

  if (fullScreen) {
    return (
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "rgba(255, 255, 255, 0.9)",
          zIndex: 9999,
          ...style,
        }}
      >
        <Spin indicator={antIcon} size={size} />
        {text && (
          <div
            style={{
              marginTop: 16,
              color: "#6b7280",
              fontSize: 14,
              fontWeight: 500,
            }}
          >
            {text}
          </div>
        )}
      </div>
    );
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 32,
        ...style,
      }}
    >
      <Spin indicator={antIcon} size={size} />
      {text && (
        <div
          style={{
            marginTop: 16,
            color: "#6b7280",
            fontSize: 14,
            fontWeight: 500,
          }}
        >
          {text}
        </div>
      )}
    </div>
  );
};

export default LoadingSpinner;
