import { RouteModel } from "@/features/maps";

export const sum = (p: number, c: number) => p + c;

export function getPointOnRoute(routeModel: RouteModel, currentTime: number) {
  const route = routeModel.route;
  const segments = routeModel.getSegments();

  if (route.waypoints.length < 2)
    throw new Error("Маршрут должен содержать как минимум две точки");

  const { index, sumOfDistance, sumOfPassageTime, info } =
    routeModel.getOptionsByTime(currentTime);

  const sumOfDistanceNoLast = sumOfDistance - segments[index].getDistance();
  const sumOfTimeNoLast = sumOfPassageTime - segments[index].getTimeOfPassage();

  const targetDistance =
    index === routeModel.route.waypoints.length - 1
      ? routeModel.route.getDistance()
      : sumOfDistanceNoLast +
        ((currentTime - sumOfTimeNoLast) / 1000) * segments[index].speed;

  routeModel.setSpeed(segments[index] ? segments[index].speed : 0);

  if (index === route.waypoints.length - 1) {
    return route.waypoints[route.waypoints.length - 1].latlng();
  }

  if (info?.type === "point") {
    routeModel.setSpeed(0);
    return route.waypoints[index].latlng();
  }

  if (info?.type === "section") {
    return segments[index].interpolate(info.passagePercent);
  }

  if (sumOfDistance >= targetDistance) {
    const fraction =
      (targetDistance - sumOfDistanceNoLast) / segments[index].getDistance();

    return segments[index].interpolate(fraction);
  }
}
