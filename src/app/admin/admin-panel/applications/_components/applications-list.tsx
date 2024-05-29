"use client";

import { approveApplicationById } from "@/actions/application/approve";
import { getAllApplications } from "@/actions/application/get-all";
import { sendToEmail } from "@/actions/email-send/create";
import { Button } from "@/components/ui/button";
import { Title } from "@/components/ui/title";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { FC, useState } from "react";
import { toast } from "sonner";
import { ApproveModal } from "./modal/approve-modal";

export const ApplicationsList: FC = () => {
  const [open, setOpen] = useState<boolean>(false);

  const { data: applications } = useQuery({
    queryKey: ["all-applications"],
    queryFn: getAllApplications,
    // refetchInterval: 1000,
  });

  const { mutateAsync: approveApplication } = useMutation({
    mutationFn: approveApplicationById,
    onSuccess: () => {
      toast.success("Заявка одобрена");
    },
    onError: () => {
      toast.error("Произошла ошибка");
    },
  });

  const { mutateAsync: sendEmail, isPending } = useMutation({
    mutationFn: sendToEmail,
    onSuccess: async () => {
      toast.success("Письмо отправлено!");
    },
    onError: () => {
      toast.error("Письмо не отправлено!");
    },
  });

  const pendingApplications = applications?.filter(
    (application) => application.applicationStatus === "PENDING"
  );

  const approvedApplications = applications?.filter(
    (application) => application.applicationStatus === "APPROVED"
  );

  const handleSendToEmail = async (data: {
    email: string;
    password: string;
    phone: string;

    idApplication: string;
  }) => {
    await sendEmail({
      ...data,
    });

    await approveApplication({
      id: data.idApplication,
      password: data.password,
    });
  };

  return (
    <div className="">
      <div className="flex flex-col gap-3">
        <Title title="Необработанные заявки" />
        {pendingApplications?.map((application) => (
          <div key={application.id} className="flex items-center h-fit">
            <ApproveModal
              open={open}
              setOpen={setOpen}
              ticketId={application.id}
            />
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
              // onClick={() => setOpen(true)}
              onClick={async () =>
                await handleSendToEmail({
                  email: application.email,
                  password: "123456",
                  phone: application.phone,
                  idApplication: application.id,
                })
              }
              className="h-[118px] rounded-r-lg rounded-l-none bg-[--primary-red] hover:bg-red-500 transition duration-300"
            >
              {isPending ? <Loader2 className="animate-spin" /> : "Записать"}
            </Button>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-3 mt-20">
        <Title title="Обработанные заявки" />

        {approvedApplications?.map((application) => (
          <div key={application.id} className="flex items-center h-fit">
            <ApproveModal
              open={open}
              setOpen={setOpen}
              ticketId={application.id}
            />
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
              onClick={() => setOpen(true)}
              // onClick={async () =>
              //   await handleSendToEmail({
              //     email: application.email,
              //     password: "123456",
              //     phone: application.phone,
              //     idApplication: application.id,
              //   })
              // }
              className="h-[118px] rounded-r-lg rounded-l-none bg-[--primary-red] hover:bg-red-500 transition duration-300"
            >
              {isPending ? <Loader2 className="animate-spin" /> : "Записать"}
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};
