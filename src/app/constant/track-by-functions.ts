import { TrackByFunction } from '@angular/core';

const notFound = (item: any, property: string) =>
  console.warn(item, property);

const by = (property: string): TrackByFunction<any> => {
  return (_index: number, item: any) => {
    const id = item[property];

    if (!id) {
      notFound(item, property);
    }

    return id;
  };
};

const byMany: any = (properties: string[]) => {
  return (index: number, item: any) => properties.reduce((acc, prop) => `${acc}${by(prop)(index, item)}`, '');
};

export const trackByFunctions = {
  by,
  byMany,
  byIndex: (index: number) => index,
  byId: by('id'),
  byKey: by('key'),
  byValue: by('value'),
};
