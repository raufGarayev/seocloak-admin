export function cleanObject(obj: Record<string, any>): Record<string, any> {
    return Object.entries(obj)
      .filter(([_, value]) => value !== '' && value !== null && value !== undefined)
      .reduce((acc: any, [key, value]) => {
        acc[key] = value;
        return acc;
      }, {});
  }
  