"use client";

import { useDraftModeEnvironment } from "next-sanity/hooks";
import Link from "next/link";

export function DisableDraftMode() {
  const environment = useDraftModeEnvironment();

  // Only show the disable draft mode button when outside of Presentation Tool
  if (environment !== "live" && environment !== "unknown") {
    return null;
  }

  return (
    <Link
      href="/api/draft-mode/disable"
      className="fixed right-4 bottom-4 bg-gray-50 px-4 py-2"
    >
      Disable Draft Mode
    </Link>
  );
}
