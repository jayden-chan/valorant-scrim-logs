export function groupBy(arr: any[], key: string): object {
  return arr.reduce((rv, x) => {
    (rv[x[key]] = rv[x[key]] || []).push(x);
    return rv;
  }, {});
}
