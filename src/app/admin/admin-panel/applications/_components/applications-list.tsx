"use client";

import { getAllApplications } from "@/actions/application/get-all";
import { Button } from "@/components/ui/button";
import { Title } from "@/components/ui/title";
import { useQuery } from "@tanstack/react-query";
import { FC, useState } from "react";
import { ApproveModal } from "./modal/approve-modal";
import { UserCardModal } from "./modal/user-card-modal";

export const ApplicationsList: FC = () => {
  const [email, setEmail] = useState<string>("");
  const [openUserCard, setOpenUserCard] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [ticketId, setTicketId] = useState<string>("");

  const { data: applications } = useQuery({
    queryKey: ["all-applications"],
    queryFn: getAllApplications,
    refetchInterval: 2000
  });

  const pendingApplications = applications?.filter(
    (application) => application.applicationStatus === "PENDING"
  );

  const approvedApplications = applications?.filter(
    (application) => application.applicationStatus === "APPROVED"
  );

  return (
    <div className="">
      <UserCardModal
        email={email}
        open={openUserCard}
        setOpen={setOpenUserCard}
      />
      <ApproveModal open={open} setOpen={setOpen} ticketId={ticketId} />

      <div className="flex flex-col gap-3">
        <Title title="Необработанные заявки" />
        {pendingApplications?.map((application) => (
          <div key={application.id} className="flex items-center h-fit">
            <div className="border border-[--primary-red] max-w-fit rounded-l-lg p-4">
              <p className="text-xl">
                Почта пользователя:{" "}
                <span className="">{application.email}</span>
              </p>
              <p className="text-xl">
                Имя пользователя:{" "}
                <span className="capitalize">{application.name}</span>
              </p>
              <p className="text-xl">
                Телефон пользователя: {application.phone}
              </p>
            </div>

            <Button
              onClick={() => {
                setOpen(true);
                setTicketId(application.id);
              }}
              className="h-[118px] rounded-r-lg rounded-l-none bg-[--primary-red] hover:bg-red-500 transition duration-300"
            >
              Записать
            </Button>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-3 mt-20">
        <Title title="Обработанные заявки" />

        {approvedApplications?.map((application) => (
          <div
            onClick={() => {
              setOpenUserCard(true);
              setEmail(application.email);
            }}
            key={application.id}
            className="flex items-center h-fit"
          >
            <div className="border border-[--primary-red] max-w-fit rounded-lg p-4 hover:shadow-[0_0_10px_0_rgba(255,0,0,0.5)] cursor-pointer transition duration-300">
              <p className="text-xl">
                Почта пользователя:{" "}
                <span className="">{application.email}</span>
              </p>
              <p className="text-xl">
                Имя пользователя:{" "}
                <span className="capitalize">{application.name}</span>
              </p>
              <p className="text-xl">
                Телефон пользователя: {application.phone}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
