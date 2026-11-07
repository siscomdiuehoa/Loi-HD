export type ErrorSeverity = 'critical' | 'warning' | 'info';

export interface ErrorCode {
  id: string;
  code: string;
  brandId: string;
  brandName: string;
  title: string;
  description: string;
  severity: ErrorSeverity;
  causes: string[];
  solutions: {
    step: number;
    action: string;
    detail?: string;
  }[];
  modelTypes?: string[]; // e.g. ["Inverter", "Multi-split", "VRV/VRF", "Treo tường"]
  relatedSensors?: string[];
  tags: string[];
  sources?: { title: string; url: string }[];
}

export interface SearchResult {
  item: ErrorCode;
  score?: number;
  matches?: any[];
}
