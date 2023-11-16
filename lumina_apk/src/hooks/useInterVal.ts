import { useEffect, useRef } from "react";

function useInterval(callback: Function, delay: number | null, isStop: boolean, stopCallback?: Function) {
  const savedCallback: any = useRef();

  useEffect(() => {
    savedCallback.current = callback;
  });

  useEffect(() => {
    function tick() {
      savedCallback.current();
    }

    if (delay !== null) {
      let id = setInterval(tick, delay);
      if (isStop) {
        clearInterval(id);
        stopCallback?.();
      }
      return () => clearInterval(id);
    }
  }, [delay, isStop, stopCallback]);
}
export default useInterval;
