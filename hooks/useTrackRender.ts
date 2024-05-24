import { useTrack } from "./useTrack";

export const useTrackRender = (page: string) => {
  const { trackEvent } = useTrack();

  trackEvent('RENDER', { page });
}