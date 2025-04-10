import { Button } from "@/components/ui/button";
import { useAbility } from "@/context/AbilityContext";

type Props = {
  item: {
    id: number;
    name: string;
    status: string;
  };
};

export const ActionButtons = ({ item }: Props) => {
  const ability = useAbility();

  return (
    <div className="flex gap-2">
      {ability.can("update", "documents") && (
        <Button
          variant="outline"
          size="sm"
          onClick={() => alert("Edit " + item.name)}
        >
          Edit
        </Button>
      )}
      {ability.can("delete", "documents") && (
        <Button
          variant="destructive"
          size="sm"
          onClick={() => alert("Delete " + item.name)}
        >
          Delete
        </Button>
      )}
    </div>
  );
};
