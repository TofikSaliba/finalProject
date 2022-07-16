const size = {
  mobileS: "320px",
  mobileM: "375px",
  mobileL: "485px",
  custom1: "550px",
  tablet: "772px",
  custom2: "890px",
  laptop: "1024px",
  custom3: "1224px",
  laptopL: "1440px",
  desktop: "2560px",
};

const device = {
  mobileS: `(max-width: ${size.mobileS})`,
  mobileM: `(max-width: ${size.mobileM})`,
  mobileL: `(max-width: ${size.mobileL})`,
  custom1: `(max-width: ${size.custom1})`,
  customHeight: `(max-height: ${size.tablet})`,
  customHeight2: `(max-height: ${size.custom1})`,
  tablet: `(max-width: ${size.tablet})`,
  custom2: `(max-width: ${size.custom2})`,
  laptop: `(max-width: ${size.laptop})`,
  custom3: `(max-width: ${size.custom3})`,
  laptopL: `(max-width: ${size.laptopL})`,
  desktop: `(max-width: ${size.desktop})`,
};

export default device;
