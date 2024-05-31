import { Prisma } from "@prisma/client";

export type UserByEmail = Prisma.UserGetPayload<{
  include: {
    instructor: true;
  };
}>;

export type UserReservation = Prisma.UserGetPayload<{
  include: {
    reservation: {
      include: {
        category: true;
        lessons: true;
        instructor: {
          include: {
            car: true;
          };
        };
      };
    };
  };
}>;
