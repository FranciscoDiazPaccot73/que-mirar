import ReactGA from 'react-ga';

export const trackView = (path: string) => ReactGA.pageview(path);

export const trackEvent = (category: string, action: string, value = 0) => ReactGA.event({ category, action, value });

export default [trackView, trackEvent];
