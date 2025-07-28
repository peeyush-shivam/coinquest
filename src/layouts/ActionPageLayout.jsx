import React from "react";
import { Row, Col } from "antd";

const boxStyle = {
  flex: 1,
  // border: "2px solid #b06b3f",
  // borderRadius: 4,
  // background: "#fff",
};

const ActionPageLayout = ({ children, sidebarContent }) => {
  return (
    // full‑viewport height + auto scroll on overflow
    <div
      style={{
        height: "calc(100vh - 64px)", // Subtract header height (64px) and any other fixed elements
        overflow: "auto",
        padding: 16,
        boxSizing: "border-box",
        width: "100%",
        maxWidth: "1200px", // Add max-width for better centering
        margin: "0 auto", // Center the container
      }}
    >
      {/* Keep gutter for responsive breakpoints, fix centering with container */}
      <Row
        gutter={[16, 16]}
        style={{ height: "100%", width: "100%", margin: "0 auto" }}
      >
        {/* left side = 2/3 on md+, full‑width on sm/xs */}
        <Col
          xs={24}
          // md={16}
          lg={16}
          style={{
            display: "flex",
            flexDirection: "column",
            height: "100%",
            width: "100%",
            gap: "24px",
          }}
        >
          {Array.isArray(children) ? (
            children.map((child, index) => (
              <div
                key={index}
                style={{
                  flex: index === 0 ? 0.7 : 0.3,
                  minHeight: 0, // Allow flex items to shrink
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                {child}
              </div>
            ))
          ) : (
            <div
              style={{
                flex: 1,
                minHeight: 0, // Allow flex items to shrink
                display: "flex",
                flexDirection: "column",
              }}
            >
              {children}
            </div>
          )}
        </Col>

        {/* right side = 1/3 on md+, full‑width on sm/xs */}
        {sidebarContent && (
          <Col
            xs={24}
            // md={8}
            lg={8}
            style={{
              display: "flex",
              flexDirection: "column",
              height: "100%",
              gap: "24px",
              paddingLeft: "12px", // Add right padding for spacing
            }}
          >
            {Array.isArray(sidebarContent) ? (
              sidebarContent.map((item, index) => (
                <div
                  key={index}
                  style={{
                    ...boxStyle,
                    minHeight: 0, // Allow flex items to shrink
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  {item}
                </div>
              ))
            ) : (
              <div
                style={{
                  minHeight: 0, // Allow flex items to shrink
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                {sidebarContent}
              </div>
            )}
          </Col>
        )}
      </Row>
    </div>
  );
};

// Standard card styles for consistency
export const standardCardStyle = {
  borderRadius: "16px",
  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
  border: "none",
  height: "100%",
  overflow: "hidden",
};

export const standardCardBodyStyle = {
  padding: "24px",
};

export const standardButtonStyle = {
  background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  border: "none",
  borderRadius: "8px",
  height: "48px",
  fontSize: "16px",
  fontWeight: "600",
};

export const standardIconCircleStyle = {
  width: "80px",
  height: "80px",
  background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  borderRadius: "50%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  margin: "0 auto 16px",
};

export const standardStepNumberStyle = {
  width: "32px",
  height: "32px",
  background: "#e91e63",
  borderRadius: "50%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "white",
  fontSize: "14px",
  fontWeight: "bold",
};

export default ActionPageLayout;
