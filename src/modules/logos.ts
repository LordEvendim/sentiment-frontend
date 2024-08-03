import GoogleLogo from "#assets/integrations/google.png";
import MetaLogo from "#assets/integrations/meta.png";
import { ReportMetricSource } from "#types/report";

export const dataSourcesLogos: Record<ReportMetricSource, string> = {
  "google-ads": GoogleLogo,
  "google-analytics": GoogleLogo,
  "meta-ads": MetaLogo,
  "meta-insights": MetaLogo,
};
