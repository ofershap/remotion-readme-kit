import React from "react";
import { COLORS, FONTS } from "../constants";

type CodeBlockProps = {
  code: string;
  showLineNumbers?: boolean;
  fontSize?: number;
  label?: string;
};

export const CodeBlock: React.FC<CodeBlockProps> = ({
  code,
  showLineNumbers = true,
  fontSize = 16,
  label,
}) => {
  const lines = code.split("\n");

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        borderRadius: 8,
        overflow: "hidden",
        height: "100%",
      }}
    >
      {label && (
        <div
          style={{
            backgroundColor: COLORS.surface,
            padding: "8px 16px",
            fontFamily: FONTS.sans,
            fontSize: 14,
            color: COLORS.subtext,
            borderBottom: `1px solid ${COLORS.overlay}`,
          }}
        >
          {label}
        </div>
      )}
      <div
        style={{
          flex: 1,
          backgroundColor: COLORS.terminalBg,
          padding: 16,
          fontFamily: FONTS.mono,
          fontSize,
          lineHeight: 1.7,
          overflow: "hidden",
        }}
      >
        {lines.map((line, i) => (
          <div key={i} style={{ display: "flex", whiteSpace: "pre" }}>
            {showLineNumbers && (
              <span
                style={{
                  color: COLORS.overlay,
                  width: 40,
                  textAlign: "right",
                  marginRight: 16,
                  flexShrink: 0,
                  userSelect: "none",
                }}
              >
                {i + 1}
              </span>
            )}
            <span style={{ color: COLORS.text }}>{line}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
