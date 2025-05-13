import { performance } from "perf_hooks";

export function timeTest(callback) {
  const start = performance.now();

  // Тестируемый код
  callback();

  const end = performance.now();

  console.log(`Выполнено за ${((end - start) / 1000).toFixed(3)} мс`);
}
