import { useTrack } from ".";

export const useTrackRender = (page: string) => {
  const { trackEvent } = useTrack();

  trackEvent('RENDER', { page });
}