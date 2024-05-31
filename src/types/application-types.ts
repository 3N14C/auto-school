import { Prisma } from "@prisma/client";

export type ApplicationByUserEmail = Prisma.ApplicationGetPayload<{
  include: {
    user: true;
  };
}>;
