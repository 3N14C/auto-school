"use client";

import { InstructorService } from "@/actions/instructor/instructor-service";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useQuery } from "@tanstack/react-query";
import { FC } from "react";
import { FormModalInstructor } from "./form-modal-instructor";
import { Instructor } from "@prisma/client";

interface IProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  instructorId: string;
}

export const InstructorModal: FC<IProps> = ({
  open,
  setOpen,
  instructorId,
}) => {
  const { data: instructor } = useQuery({
    queryKey: ["instructor-by-id", instructorId],
    queryFn: async () => await InstructorService.getById({ id: instructorId }),
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Инструктор {instructor?.firstName} {instructor?.lastName}
          </DialogTitle>
          <DialogDescription>Информация об инструкторе</DialogDescription>
        </DialogHeader>

        <div className="">
          <FormModalInstructor instructor={instructor ?? ({} as Instructor)} />
        </div>
      </DialogContent>
    </Dialog>
  );
};
