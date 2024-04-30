import { useAuth0 } from "@auth0/auth0-react";
import { getForecasts } from "@src/api/forecasts";
import { useCallback, useEffect, useState } from "react";

interface WaveAttributes {
    humanRelation: string;
    maxHeight: number;
    minHeight: number;
    observation: string;
    occasionalHeight: number | null;
    plus: boolean;
    rating: string | null;
    timestamp: number;
}

interface DailyForecast {
    forecastDay: string;
    forecaster: string | null;
    human: boolean;
    observation: string;
    timestamp: number; // This could be the timestamp indicating the start of the forecast day
    utcOffset: number;
    am: WaveAttributes;
    pm: WaveAttributes;
}

export interface Forecast {
    forecast: DailyForecast[];
    spot_id: string;
}





const useForecasts = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isServerError, setIsServerError] = useState<boolean>(false);
  const [forecasts, setForecasts] = useState<Forecast[] | null>(null);

  const { getAccessTokenSilently } = useAuth0();

  const fetchForecasts = useCallback(async () => {
    try {
      setIsServerError(false);
      setIsLoading(true);
      // get access token for api call
      const accessToken = await getAccessTokenSilently();
      if (!accessToken) {
        throw new Error("Access token not found");
      }

      //TODO - filter forecasts by user subscription
      const res = await getForecasts(accessToken);
      console.log("forecasts fetched successfully", res);
      setForecasts(res.data);
    } catch (err) {
      console.error("Failed to fetch forecasts", err);
      setIsServerError(true);
    } finally {
      setIsLoading(false);
    }
  }, [getAccessTokenSilently]);

  useEffect(() => {
    fetchForecasts();
  }, [fetchForecasts]);

  const refetch = () => {
    fetchForecasts();
  };

  return {
    forecasts,
    isLoading,
    isServerError,
    refetch,
  };
};

export default useForecasts;
