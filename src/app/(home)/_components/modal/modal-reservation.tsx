import { getCategoryById } from "@/actions/category/get-by-id";
import { createReservation } from "@/actions/reservation/create-reservation";
import { Button } from "@/components/ui/button/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { InputValidated } from "@/components/ui/input/validated-input";
import { useCurrentSession } from "@/hooks/use-current-session";
import { signUpSchema } from "@/validators/form-signup-validator";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { Dispatch, FC, SetStateAction, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

interface IProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  categoryId: string;
}

export const schemaWithoutPassword = signUpSchema.omit({ password: true });

export const ModalReservation: FC<IProps> = ({ open, setOpen, categoryId }) => {
  const router = useRouter();
  const { user } = useCurrentSession();
  const currentDate = new Date();
  const [date, setDate] = useState<Date | null>(null);

  const { data: category } = useQuery({
    queryKey: ["category", categoryId],
    queryFn: async () => await getCategoryById({ id: categoryId }),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof schemaWithoutPassword>>({
    resolver: zodResolver(schemaWithoutPassword),
    values: {
      name: user?.name || "",
      phoneNumber: user?.phone || "",
    },
  });

  const { mutateAsync, isPending } = useMutation({
    mutationFn: createReservation,
    onSuccess: () => {
      toast.success("Запись на обучение создана!");
      router.push(`/profile/${user?.id}`);
    },
    onError: () => {
      toast.error("Не удалось создать запись на обучение");
    },
  });

  const handleOnSubmit = async (
    data: z.infer<typeof schemaWithoutPassword>
  ) => {
    if (!date || date < currentDate) {
      toast.error("Неверная дата");
      return;
    }

    await mutateAsync({
      name: data.name,
      phoneNumber: data.phoneNumber,
      categoryId: categoryId,
      userId: user?.id!,
      dateTime: date,
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Записаться на обучение</DialogTitle>
          <DialogDescription>{category?.name}</DialogDescription>
        </DialogHeader>

        <form
          onSubmit={handleSubmit(handleOnSubmit)}
          className="flex flex-col items-center gap-5"
        >
          <InputValidated
            placeholder="Введите ваше имя"
            errors={errors.name}
            {...register("name")}
          />
          <InputValidated
            placeholder="+7 (___) ___-__-__"
            errors={errors.phoneNumber}
            {...register("phoneNumber")}
          />

          <input
            type="date"
            className="focus:outline-none w-full py-3"
            onChange={(e) => setDate(new Date(e.target.value))}
          />

          <Button
            disabled={isPending}
            className="text-white w-full"
            type="submit"
          >
            {isPending ? <Loader2 className="animate-spin" /> : "Записаться"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
