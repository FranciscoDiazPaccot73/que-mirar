import { track } from "@amplitude/analytics-browser";

export const useTrack = () => {
  return {
    trackEvent: (event: string, data?: Record<string, any>) => {
      track(event, data);
    },
  };
}