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
  domain: string;
  apiPrefix: string;
  apiVersion: string;
  platform: PlatformType.NodeJS | PlatformType.Laravel;
}
