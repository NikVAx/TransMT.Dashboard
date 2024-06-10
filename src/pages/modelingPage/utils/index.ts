import { RouteModel } from "@/features/maps";

export const sum = (p: number, c: number) => p + c;

function getIndex(time: number, routeModel: RouteModel) {
  const route = routeModel.route;
  const delays = route.getDelays();
  const segments = routeModel.getSegments();

  let totalDelay = 0;
  let totalPassage = 0;
  for (let i = 0; i < route.waypoints.length - 1; i++) {
    //const p0 = totalPassage + totalDelay; // время входа в точку
    //const p1 = p0 + delays[i]; // время выхода из точки и входа на отрезок
    //const p2 = p1 + segments[i].getTimeOfPassage(); // время выхода с отрезка

    totalDelay += delays[i];
    totalPassage += segments[i].getTimeOfPassage();

    // let isPoint = true;

    // if (p0 <= time && time < p1) {
    // }

    // if (p1 <= time && time < p2) {
    //   isPoint = false;
    // }

    if (time <= totalDelay + totalPassage) {
      return {
        //time: isPoint ? p0 : time - totalDelay,
        index: i,
      };
    }
  }

  return {
    // time: routeModel
    //   .getSegments()
    //   .map((x) => x.getTimeOfPassage())
    //   .reduce(sum, 0),
    index: route.waypoints.length - 1,
  };
}

export function getPointOnRoute(routeModel: RouteModel, time: number) {
  const route = routeModel.route;

  if (route.waypoints.length < 2)
    throw new Error("Маршрут должен содержать как минимум две точки");

  const { index } = getIndex(time, routeModel);

  const segments = routeModel.getSegments();

  const targetDistance = routeModel.getTargetDistance(index, time);
  routeModel.setSpeed(segments[index] ? segments[index].speed : 0);

  let accumulatedDistance = 0;

  for (let i = 0; i < route.waypoints.length - 1; i++) {
    if (accumulatedDistance + segments[i].getDistance() >= targetDistance) {
      const fraction =
        (targetDistance - accumulatedDistance) / segments[i].getDistance();

      return segments[i].interpolate(fraction);
    }
    accumulatedDistance += segments[i].getDistance();
  }

  return route.waypoints[route.waypoints.length - 1].latlng();
}
