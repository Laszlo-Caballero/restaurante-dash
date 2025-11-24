export interface Subscribes<T = any> {
  destination: string;
  callback: (message: T) => void;
  initialLoad?: boolean;
}

export interface OnConnect {
  onConnectCallback?: () => void;
  subscribes?: Subscribes<any>[];
}
