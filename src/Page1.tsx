import { Scheduler } from "./lib";
import { EVENTS } from "./events";
import { useCallback, useRef, useState } from "react";
import { SchedulerRef } from "./lib/types";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";

function Page1() {
  const calendarRef = useRef<SchedulerRef>(null);
  const [loading, setLoading] = useState(false);

  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  const customHeader = useCallback(
    () => <Button onClick={handleRefresh}>{loading ? "LOADING..." : "Refresh"}</Button>,
    [loading, handleRefresh]
  );

  return (
    <>
      <div style={{ height: "200vh" }}>
        <div>
          <Link to="/">Go to home</Link>
          <button onClick={() => setLoading((prev) => !prev)}>
            Toggle Loading ({loading ? "ON" : "OFF"})
          </button>
        </div>

        <div style={{ marginTop: "50px" }}>
          <Scheduler
            day={{
              startHour: 0,
              endHour: 24,
              step: 60,
              navigation: true,
            }}
            week={{
              weekDays: [0, 1, 2, 3, 4, 5, 6],
              weekStartOn: 1,
              startHour: 0,
              endHour: 24,
              step: 60,
              navigation: true,
              disableGoToDay: true,
            }}
            ref={calendarRef}
            events={EVENTS}
            loading={loading}
            customHeaderContent={customHeader}
            stickyNavigation={true}
            stickyNavigationOffset={64}
            currentTimeBarColor="#ff00c3ff"
            // events={generateRandomEvents(200)}
          />
        </div>
      </div>
    </>
  );
}

export default Page1;
