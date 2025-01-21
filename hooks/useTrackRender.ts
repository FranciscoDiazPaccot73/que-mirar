import { useTrack } from "./useTrack";

const PAGE = "QPV";

export const useTrackRender = (p?: string) => {
  const { trackEvent } = useTrack();

  const page = p ?? PAGE;

  trackEvent("RENDER", { page });
};
