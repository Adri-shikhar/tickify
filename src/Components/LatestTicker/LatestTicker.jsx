"use client";

import Marquee from "react-fast-marquee";

export default function LatestTicker() {
  return (
    <div className="flex overflow-hidden rounded-full border border-default">
      <div className="flex shrink-0 items-center gap-2 bg-info px-5 py-3 text-sm font-bold text-on-accent">
        📢 LATEST
      </div>

      <div className="bg-surface text-body flex-1 overflow-hidden py-3 text-sm">
        <Marquee gradient={false} speed={35} pauseOnHover>
          Tickify now supports instant ticket confirmation. • New bus routes added in Dhaka and Chattogram this week! • Book evening slots Sun–Thu — flexible times for working students.
        </Marquee>
      </div>
    </div>
  );
}
