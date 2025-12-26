export interface Routes {
  route_name: string;
  description?: string;
}

export interface RouteStops {
  stop_id: number[]; // IDs das paragens
  position:  number;
}
