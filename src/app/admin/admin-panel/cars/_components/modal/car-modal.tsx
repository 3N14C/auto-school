"use client";

import { getCarById } from "@/actions/car/get-by-id";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useMutation, useQuery } from "@tanstack/react-query";
import { FC } from "react";
import { FormCarModal } from "./form-car-modal";
import { Car } from "@prisma/client";
import { removeCarById } from "@/actions/car/remove-by-id";
import { toast } from "sonner";
import { Button } from "@/components/ui/button/button";
import { Loader2 } from "lucide-react";

interface IProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;

  carId: string;
}

export const CarModal: FC<IProps> = ({ open, setOpen, carId }) => {
  const { data: car } = useQuery({
    queryKey: ["car-by-id", carId],
    queryFn: async () => await getCarById({ id: carId }),
  });

  const { mutateAsync, isPending } = useMutation({
    mutationFn: removeCarById,
    onSuccess: () => {
      toast.success("Машина удалена");
      setOpen(false);
    },
    onError: () => {
      toast.error("Не удалось удалить машину");
    },
  });

  const handleRemoveCar = async () => {
    await mutateAsync({ id: carId });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {car?.brand} {car?.model}
          </DialogTitle>
          <DialogDescription>
            Вы можете отредактировать или удалить эту машину
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-3">
          <FormCarModal car={car ?? ({} as Car)} />

          <Button
            variant="border"
            onClick={handleRemoveCar}
            className="flex justify-center w-full"
          >
            {isPending ? <Loader2 className="animate-spin" /> : "Удалить"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
