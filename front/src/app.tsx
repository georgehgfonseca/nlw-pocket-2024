import { Dialog } from "./components/ui/dialog";
import { CreateGoal } from "./components/create-goal";
import WeeklySummary from "./components/weekly-summary";
import { EmptyGoals } from "./components/empty-goals";
import { useQuery } from "@tanstack/react-query";
import getWeeklySummary from "./http/get-weekly-summary";

export function App() {
  // const [weeklySummary, setWeeklySummary] = useState<IWeeklySummary>();

  // useEffect(() => {
  //   fetch("http://localhost:3333/week-summary")
  //     .then((response) => {
  //       return response.json();
  //     })
  //     .then((data) => {
  //       setWeeklySummary(data.summary);
  //     })
  //     .catch(() => {});
  // }, []);

  // const {
  //   isPending,
  //   error,
  //   data: weeklySummary,
  // } = useQuery<IWeeklySummary>({
  //   queryKey: ["week-summary"],
  //   queryFn: () =>
  //     fetch("http://localhost:3333/week-summary")
  //       .then((response) => {
  //         return response.json();
  //       })
  //       .then((data) => {
  //         return data.summary;
  //       })
  //       .catch(() => {}),
  // });

  const {
    isPending,
    error,
    data: weeklySummary,
  } = useQuery({
    queryKey: ["week-summary"],
    queryFn: getWeeklySummary,
    staleTime: 60 * 1000,
  });

  return (
    <Dialog>
      {isPending && <p>Carregando...</p>}
      {error && (
        <p>
          {error.message} {error.message}
        </p>
      )}
      {weeklySummary && weeklySummary.total > 0 ? (
        <WeeklySummary />
      ) : (
        <EmptyGoals />
      )}
      <CreateGoal />
    </Dialog>
  );
}
