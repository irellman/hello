import {useState} from "react";

export default function useFetching (callback: () => void) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const fetching = async () => {
    try {
      setIsLoading(true)
      await callback()
    } catch (e) {
      setError(e.message);
    } finally {
      setIsLoading(false)
    }
  }

  return [
    fetching,
    isLoading,
    error
  ]
}
