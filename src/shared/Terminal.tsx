import React from "react";
import { COLORS, FONTS } from "../constants";

type TerminalProps = {
  title?: string;
  children: React.ReactNode;
  width?: number | string;
  height?: number | string;
};

export const Terminal: React.FC<TerminalProps> = ({
  title = "Terminal",
  children,
  width = "90%",
  height = "80%",
}) => {
  return (
    <div
      style={{
        width,
        height,
        display: "flex",
        flexDirection: "column",
        borderRadius: 12,
        overflow: "hidden",
        boxShadow: "0 25px 50px rgba(0, 0, 0, 0.5)",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          height: 44,
          backgroundColor: COLORS.terminalTitleBar,
          paddingLeft: 16,
          paddingRight: 16,
          flexShrink: 0,
        }}
      >
        <div style={{ display: "flex", gap: 8 }}>
          {[COLORS.terminalDot1, COLORS.terminalDot2, COLORS.terminalDot3].map(
            (color, i) => (
              <div
                key={i}
                style={{
                  width: 14,
                  height: 14,
                  borderRadius: 7,
                  backgroundColor: color,
                }}
              />
            ),
          )}
        </div>
        <div
          style={{
            flex: 1,
            textAlign: "center",
            fontFamily: FONTS.sans,
            fontSize: 13,
            color: COLORS.subtext,
            marginRight: 54,
          }}
        >
          {title}
        </div>
      </div>
      <div
        style={{
          flex: 1,
          backgroundColor: COLORS.terminalBg,
          padding: 24,
          fontFamily: FONTS.mono,
          fontSize: 18,
          lineHeight: 1.6,
          color: COLORS.text,
          overflow: "hidden",
        }}
      >
        {children}
      </div>
    </div>
  );
};
