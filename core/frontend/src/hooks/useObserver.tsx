import {useEffect, useRef} from "react";

export default function useObserver(ref: any, isLoading: boolean, canLoad: boolean, callback: () => void) {
  const observer = useRef<any>();

  useEffect(() => {
    if (isLoading) return;
    if (!ref.current) return;
    if (observer.current) observer.current.disconnect();

    let cb = function(entries: any, observer: any) {
      if (entries[0].isIntersecting && canLoad) {
        callback();
      }
    }

    observer.current = new IntersectionObserver(cb);
    observer.current.observe(ref.current);
  }, [isLoading]);
}
