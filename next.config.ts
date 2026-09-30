import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  turbopack: {
    root: path.resolve(__dirname),
  },
  async redirects() {
    return [
      // Old Wix site paths — kept alive so bookmarks, Google's index, and any
      // shared links to tknailsalon.com keep working once this domain takes over.
      { source: "/services", destination: "/#services", permanent: true },
      { source: "/aboutus", destination: "/#about", permanent: true },
      { source: "/contact-us-1", destination: "/#visit", permanent: true },
      { source: "/specials", destination: "/", permanent: true },
      { source: "/gift-certificate", destination: "/", permanent: true },
      {
        source: "/booking-calendar",
        destination: "https://booking.gocheckin.net/v2/4451",
        permanent: true,
      },
      {
        source: "/booking-form",
        destination: "https://booking.gocheckin.net/v2/4451",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
