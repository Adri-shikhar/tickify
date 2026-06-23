"use client";

import Marquee from "react-fast-marquee";

export default function LatestTicker() {
  return (
    <div className="surface-border flex overflow-hidden rounded-full border">
      <div className="flex shrink-0 items-center gap-2 bg-blue-600 px-5 py-3 text-sm font-bold text-white">
        📢 LATEST
      </div>

      <div className="surface text-body flex-1 overflow-hidden py-3 text-sm">
        <Marquee gradient={false} speed={35}>
          Tickify now supports instant ticket confirmation. • New bus routes added in Dhaka and Chattogram this week! • Book evening slots Sun–Thu — flexible times for working students.
        </Marquee>
      </div>
    </div>
  );
}
