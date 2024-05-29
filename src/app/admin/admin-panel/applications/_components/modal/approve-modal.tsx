"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FC } from "react";

interface IProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  ticketId: string;
}

export const ApproveModal: FC<IProps> = ({ ticketId, open, setOpen }) => {
    

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Запись на занятие</DialogTitle>
          <DialogDescription>
            При записи пользователя на занятие, он получит доступ к аккаунту и
            списку занятий.
          </DialogDescription>
        </DialogHeader>

        <div className=""></div>
      </DialogContent>
    </Dialog>
  );
};
