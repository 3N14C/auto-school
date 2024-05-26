import { schemaWithoutPassword } from "@/app/(home)/_components/modal/modal-reservation";
import { z } from "zod";

export type SchemaReservation = z.infer<typeof schemaWithoutPassword> & {
  userId: string;
  categoryId: string;
  dateTime: Date;
};
