"use client";

import { InstructorService } from "@/actions/instructor/instructor-service";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { FC, useState } from "react";
import { InstructorModal } from "./instructor-modal";

export const InstructorsList: FC = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [instructorId, setInstructorId] = useState<string>("");

  const { data: instructors } = useQuery({
    queryKey: ["instructors"],
    queryFn: InstructorService.getAll,
  });

  return (
    <div className="flex items-center flex-wrap gap-20">
      <InstructorModal
        open={open}
        setOpen={setOpen}
        instructorId={instructorId}
      />

      {instructors?.map((instructor) => (
        <div
          onClick={() => {
            setOpen(true);
            setInstructorId(instructor.id);
          }}
          key={instructor.id}
          className=""
        >
          <Image
            src={instructor?.img ?? ""}
            alt="logo"
            width={1000}
            height={1000}
            className="w-[300px] h-[300px] border border-transparent hover:border-[--primary-red] transition duration-300 cursor-pointer"
          />

          <div className="capitalize flex items-center gap-2">
            <p>{instructor.firstName}</p>
            <p>{instructor.lastName}</p>
          </div>
        </div>
      ))}
    </div>
  );
};
