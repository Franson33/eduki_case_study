export const routeNames = {
  HOME: 'Home',
  DETAILS: 'Details',
} as const;

export type RootStackParams = {
  [routeNames.HOME]: undefined;
  [routeNames.DETAILS]: {
    item: any;
  };
};
