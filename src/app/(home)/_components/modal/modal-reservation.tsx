import { getCategoryById } from "@/actions/category/get-by-id";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { signUpSchema } from "@/validators/form-signup-validator";
import { useQuery } from "@tanstack/react-query";
import { Dispatch, FC, SetStateAction } from "react";
import { FormReservation } from "./form-reservation";

interface IProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  categoryId: string;
}

export const schemaWithoutPassword = signUpSchema.omit({ password: true });

export const ModalReservation: FC<IProps> = ({ open, setOpen, categoryId }) => {
  const { data: category } = useQuery({
    queryKey: ["category", categoryId],
    queryFn: async () => await getCategoryById({ id: categoryId }),
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Записаться на обучение</DialogTitle>
          <DialogDescription>{category?.name}</DialogDescription>
        </DialogHeader>

        <FormReservation categoryId={categoryId} />
      </DialogContent>
    </Dialog>
  );
};
