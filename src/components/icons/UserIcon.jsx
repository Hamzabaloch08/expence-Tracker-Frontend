import React from "react";
import Svg, { G, Path, Defs, ClipPath, Rect } from "react-native-svg";

const UserIcon = ({ color = "#AAAAAA", size = 26 }) => (
  <Svg width={size} height={size} viewBox="0 0 36 36" fill="none">
    <G clipPath="url(#clip0)">
      <Path
        d="M18 22.5C22.9706 22.5 27 18.4706 27 13.5C27 8.52944 22.9706 4.5 18 4.5C13.0294 4.5 9 8.52944 9 13.5C9 18.4706 13.0294 22.5 18 22.5Z"
        stroke={color}
        strokeWidth="2.25"
        strokeMiterlimit="10"
      />
      <Path
        d="M4.35938 30.375C5.74163 27.9804 7.72992 25.9918 10.1244 24.6092C12.5188 23.2266 15.2351 22.4987 18 22.4987C20.7649 22.4987 23.4812 23.2266 25.8756 24.6092C28.2701 25.9918 30.2584 27.9804 31.6406 30.375"
        stroke={color}
        strokeWidth="2.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </G>
    <Defs>
      <ClipPath id="clip0">
        <Rect width="36" height="36" fill="white" />
      </ClipPath>
    </Defs>
  </Svg>
);

export default UserIcon;
