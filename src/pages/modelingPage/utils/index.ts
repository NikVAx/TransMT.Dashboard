import { RouteModel } from "@/features/maps";

export const sum = (p: number, c: number) => p + c;

export function getPointOnRoute(routeModel: RouteModel, currentTime: number) {
  const route = routeModel.route;
  const segments = routeModel.getSegments();

  if (route.points.length < 2)
    throw new Error("Маршрут должен содержать как минимум две точки");

  const { index, info } = routeModel.getOptionsByTime(currentTime);

  switch (info?.type) {
    case "point":
      routeModel.setSpeed(0);
      routeModel.setStatus(info.status);
      return route.points[index].latlng();
    case "segment":
      routeModel.setSpeed(segments[index] ? segments[index].speed : 0);
      routeModel.setStatus(info.status);
      return segments[index].interpolate(info.fraction);
    default:
      routeModel.setSpeed(segments[index] ? segments[index].speed : 0);
      return route.points[route.points.length - 1].latlng();
  }
}
