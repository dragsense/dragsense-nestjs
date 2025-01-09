export enum PlatformType {
  NodeJS = 'nodejs',
  Laravel = 'laravel',
}

export interface Project {
  id: number;
  identifier: string;
  apiKey: string;
  name: string;
  desc: string;
  serverUrl: string;
  apiPrefix: string;
  apiVer: string;
  platform: PlatformType.NodeJS | PlatformType.Laravel;
  connected: boolean
}
