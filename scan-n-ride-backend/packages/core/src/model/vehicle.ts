export interface Vehicle {
  id: number;
  line: string;
  vehicleNumber: string;
  position: Position;
}

export interface Position {
  latitude: number;
  longitude: number;
}