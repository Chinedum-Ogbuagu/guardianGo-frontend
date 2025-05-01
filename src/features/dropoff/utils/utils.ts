import { IDropSession } from "../types/types.dropoff";

function getTotalDropOffs(data: IDropSession[] | undefined) {
  let totalDropOffs = 0;
  if (data && Array.isArray(data)) {
    for (const session of data) {
      if (session.drop_offs && Array.isArray(session.drop_offs)) {
        totalDropOffs += session.drop_offs.length;
      }
    }
  }
  return totalDropOffs;
}

function getTotalDropOffsForCompletedSessions(
  data: IDropSession[] | undefined
) {
  let grandTotalDropOffs = 0;

  if (data && Array.isArray(data)) {
    for (const session of data) {
      if (session.pickup_status === "completed") {
        if (session.drop_offs && Array.isArray(session.drop_offs)) {
          grandTotalDropOffs += session.drop_offs.length;
        }
      }
    }
  }

  return grandTotalDropOffs;
}

function getTotalDropOffsForAwaitingSessions(data: IDropSession[] | undefined) {
  let grandTotalDropOffs = 0;

  if (data && Array.isArray(data)) {
    for (const session of data) {
      if (session.pickup_status === "awaiting") {
        if (session.drop_offs && Array.isArray(session.drop_offs)) {
          grandTotalDropOffs += session.drop_offs.length;
        }
      }
    }
  }

  return grandTotalDropOffs;
}

export {
  getTotalDropOffs,
  getTotalDropOffsForCompletedSessions,
  getTotalDropOffsForAwaitingSessions,
};
