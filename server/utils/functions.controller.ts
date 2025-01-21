export default function handler<T>(param: T, fns: ((param: T) => void)[]) {
  for (const fn of fns) {
    fn(param);
  }
}
