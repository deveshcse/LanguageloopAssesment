import { AclButton } from "@/components/AclButton";

type Props = {
  item: {
    id: number;
    name: string;
    status: string;
  };
};

export const ActionButtons = ({ item }: Props) => {
  return (
    <div className="flex gap-2">
      <AclButton
        action="update"
        subject="documents"
        variant="outline"
        size="sm"
        onClick={() => alert("Edit " + item.name)}
      >
        Edit
      </AclButton>
      <AclButton
        action="delete"
        subject="documents"
        variant="destructive"
        size="sm"
        onClick={() => alert("Delete " + item.name)}
      >
        Delete
      </AclButton>
    </div>
  );
};
