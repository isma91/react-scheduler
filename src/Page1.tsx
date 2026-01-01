import { Scheduler } from "./lib";
import { EVENTS } from "./events";
import { useCallback, useRef, useState } from "react";
import { SchedulerRef } from "./lib/types";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";

const events = EVENTS.slice(3, 6);

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
            ref={calendarRef}
            events={events}
            loading={loading}
            customHeaderContent={customHeader}
            stickyNavigation={true}
            stickyNavigationOffset={64}
            // events={generateRandomEvents(200)}
          />
        </div>
      </div>
    </>
  );
}

export default Page1;
