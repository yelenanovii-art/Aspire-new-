// Whether a pop-up has been closed recently, and recording that it has.
//
// Both pop-ups used to show on every single load. That was deliberate once,
// and it is the single most irritating thing a pop-up can do: closing it is a
// clear answer, and asking again on the next page treats it as noise.
//
// Every access is wrapped. A private window, cleared site data or a browser
// set to block storage all throw on read, and a pop-up that cannot remember
// being dismissed is still better than a page that throws trying to find out.
export function dismissedRecently(key) {
  try {
    const until = Number(window.localStorage.getItem(key))
    return Number.isFinite(until) && until > Date.now()
  } catch {
    return false
  }
}

export function recordDismissal(key, days) {
  if (!days) return
  try {
    window.localStorage.setItem(key, String(Date.now() + days * 86400000))
  } catch {
    /* Nothing to do: it shows again next time, which is the safe failure. */
  }
}
