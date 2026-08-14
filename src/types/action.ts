export interface ActionResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
}

export function serialize<T>(data: T): T {
  return JSON.parse(JSON.stringify(data));
}

